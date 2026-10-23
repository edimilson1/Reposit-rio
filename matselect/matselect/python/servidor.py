"""Servidor local simples: python python/servidor.py  ->  http://localhost:8000"""
import http.server, os, socketserver

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
with socketserver.TCPServer(("", 8000), http.server.SimpleHTTPRequestHandler) as s:
    print("Site em http://localhost:8000  (Ctrl+C para sair)")
    s.serve_forever()
