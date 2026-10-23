/* Verifica a integridade do banco de dados com SHA-256 (Web Crypto) e exibe o resultado no rodape. */
(function(){
var el=document.getElementById("integ");if(!el)return;
if(!(window.crypto&&crypto.subtle)){el.textContent="verificação SHA-256 indisponível (abra via HTTPS ou localhost)";return}
crypto.subtle.digest("SHA-256",new TextEncoder().encode(RAW)).then(function(b){
 var h=Array.prototype.map.call(new Uint8Array(b),function(v){return v.toString(16).padStart(2,"0")}).join("");
 el.textContent=h===RAW_SHA256?"🔒 banco íntegro · SHA-256 "+h.slice(0,16)+"…":"⚠ banco alterado: rode python/seguranca.py hash";
});
})();
