"""Ferramentas de seguranca do MatSelect.

  python python/seguranca.py hash          recalcula o SHA-256 do banco e grava em js/data.js
                                           (rode sempre que editar RAW em js/data.js)
  python python/seguranca.py sri ARQUIVO   gera o atributo integrity (SRI sha384) de um arquivo,
                                           ex.: o three.min.js baixado em js/vendor/
"""
import base64, hashlib, os, re, sys

RAIZ = os.path.join(os.path.dirname(__file__), "..")
DATA = os.path.join(RAIZ, "js", "data.js")

if len(sys.argv) >= 2 and sys.argv[1] == "hash":
    s = open(DATA, encoding="utf-8").read()
    raw = re.search(r'var RAW="(.*?)";\nvar DB', s, re.S).group(1).replace('"\n+"', "")
    h = hashlib.sha256(raw.encode("utf-8")).hexdigest()
    s = re.sub(r'var RAW_SHA256="[0-9a-f]*";', f'var RAW_SHA256="{h}";', s)
    open(DATA, "w", encoding="utf-8").write(s)
    print("SHA-256 atualizado:", h)
elif len(sys.argv) == 3 and sys.argv[1] == "sri":
    d = hashlib.sha384(open(sys.argv[2], "rb").read()).digest()
    print('integrity="sha384-' + base64.b64encode(d).decode() + '" crossorigin="anonymous"')
else:
    print(__doc__)
