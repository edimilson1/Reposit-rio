"""MatSelect - versao em linha de comando (Python 3, sem dependencias).

Le data/materiais.csv, filtra por requisitos e ranqueia pelo mesmo metodo do site:
filtro -> normalizacao min-max -> media ponderada -> ordenacao.

Exemplo (suporte leve, resistente e que aguenta >= 100 C):
  python python/selecao.py -c densidade_g_cm3:menor:3 -c resistencia_MPa:min=300:2 -c temp_max_servico_C:min=100:1
Formato de -c:  coluna:requisito:peso
  requisito = min=VALOR | max=VALOR | maior | menor
"""
import argparse, csv, os

CSV = os.path.join(os.path.dirname(__file__), "..", "data", "materiais.csv")


def carregar():
    with open(CSV, encoding="utf-8", newline="") as f:
        linhas = list(csv.DictReader(f))
    for m in linhas:
        for k, v in m.items():
            if k not in ("categoria", "nome", "fonte"):
                m[k] = float(v) if v != "" else None
    return linhas


def selecionar(db, criterios, categorias=None):
    """criterios: lista de (coluna, modo, valor, peso). Retorna [(pontuacao, material)]."""
    pool = []
    for m in db:
        if categorias and m["categoria"] not in categorias:
            continue
        ok = True
        for col, modo, val, _ in criterios:
            x = m[col]
            if x is None or (modo == "min" and x < val) or (modo == "max" and x > val):
                ok = False
                break
        if ok:
            pool.append(m)
    if not pool:
        return []
    peso_total = sum(c[3] for c in criterios)
    limites = {c[0]: (min(m[c[0]] for m in pool), max(m[c[0]] for m in pool)) for c in criterios}
    ranking = []
    for m in pool:
        total = 0
        for col, modo, _, peso in criterios:
            lo, hi = limites[col]
            r = 1 if hi == lo else (m[col] - lo) / (hi - lo)
            if modo in ("menor", "max"):
                r = 1 - r
            total += r * peso
        ranking.append((total / peso_total, m))
    return sorted(ranking, key=lambda t: -t[0])


def main():
    ap = argparse.ArgumentParser(description="Selecao de materiais")
    ap.add_argument("-c", "--criterio", action="append", required=True)
    ap.add_argument("--categoria", action="append", help="Metálico, Polimérico, Cerâmico, Compósito")
    a = ap.parse_args()
    crit = []
    for t in a.criterio:
        col, req, peso = (t.split(":") + ["1"])[:3]
        modo, _, val = req.partition("=")
        crit.append((col, modo, float(val) if val else None, float(peso)))
    if not 2 <= len(crit) <= 3:
        ap.error("use 2 ou 3 criterios")
    res = selecionar(carregar(), crit, a.categoria)
    if not res:
        print("Nenhum material atende aos requisitos definidos.")
        return
    for i, (sc, m) in enumerate(res, 1):
        vals = ", ".join(f"{c[0]}={m[c[0]]:g}" for c in crit)
        print(f"{i:2d}. {m['nome']:<30} {m['categoria']:<12} {sc*100:5.1f}%  {vals}  [{m['fonte']}]")


if __name__ == "__main__":
    main()
