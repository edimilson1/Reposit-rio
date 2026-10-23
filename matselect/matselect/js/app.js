/* Interface MATBOY, filtros e ranking. Depende de data.js */
var $=function(i){return document.getElementById(i)},sel=new Set(["M","P","C","K"]);
$("n").textContent=DB.length;
$("cats").innerHTML=Object.keys(CN).map(function(k,i){return '<div class="card"><div class="num">'+(i+1)+'</div><h3>'+CN[k]+' · '+DB.filter(function(m){return m.c===k}).length+'</h3><p>'+CD[k]+'</p></div>'}).join("");
var po='<option value="">—</option>'+P.map(function(p){return '<option value="'+p[0]+'">'+p[1]+' ('+p[2]+')</option>'}).join("");
var mo='<option value=">=">≥ mínimo</option><option value="<=">≤ máximo</option><option value="+">maior é melhor</option><option value="-">menor é melhor</option>';
$("crits").innerHTML=[0,1,2].map(function(i){return '<div class="crit"><div><label>Propriedade '+(i+1)+'</label><select id="p'+i+'">'+po+'</select></div><div><label>Requisito</label><select id="m'+i+'">'+mo+'</select></div><div><label>Valor (opcional)</label><input id="v'+i+'" type="text" inputmode="decimal" autocomplete="off" placeholder="ex.: 2.7"></div><div><label>Peso</label><select id="w'+i+'"><option>1</option><option>2</option><option>3</option></select></div></div>'}).join("");
[0,1,2].forEach(function(i){$("v"+i).addEventListener("input",function(){this.value=this.value.replace(",",".").replace(/[^0-9.\-]/g,"")})});
function cleanV(v){v=String(v).replace(",",".");return isNaN(parseFloat(v))?"":v}
$("chips").innerHTML=Object.keys(CN).map(function(k){return '<button class="chip on" data-k="'+k+'">'+CN[k]+'</button>'}).join("");
$("chips").onclick=function(e){var k=e.target.dataset.k;if(!k)return;sel.has(k)?sel["delete"](k):sel.add(k);e.target.classList.toggle("on")};
var PRE=[["Cenário 1 · Suporte mecânico leve",[["d","-","",3],["s",">=","300",2],["T",">=","100",1]]],["Cenário 2 · Isolante para alta temperatura",[["k","-","",3],["T",">=","1000",2]]],["Cenário 3 · Sem solução (teste)",[["d","<=","1",1],["s",">=","1500",1]]]];
$("presets").innerHTML=PRE.map(function(p,i){return '<button class="chip" data-i="'+i+'">'+p[0]+'</button>'}).join("");
$("presets").onclick=function(e){var i=e.target.dataset.i;if(i==null)return;var cs=PRE[i][1];for(var j=0;j<3;j++){var c=cs[j]||["","<=","",1];$("p"+j).value=c[0];$("m"+j).value=c[1];$("v"+j).value=c[2];$("w"+j).value=c[3]}run()};
function f(x){return x==null?"–":(x>=100?Math.round(x):+x.toPrecision(3))}
var cur=[],idx=0,pi=0,crs=[],inPhoto=false,modOpen=false,step=0,armed=false,armT;
function slug(n){return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function openPhoto(){if(!cur.length)return;var m=cur[idx].m,s=slug(m.n),im=$("photo");$("pn").textContent=m.n.toUpperCase();$("cap").textContent=CN[m.c];
$("pp").textContent=P.map(function(p){var l=p[1].slice(0,15),v=f(m.v[p[0]])+" "+p[2];return l+" "+".".repeat(Math.max(2,32-l.length-v.length))+" "+v}).join("\n");$("pf").textContent="Fonte: "+m.src;var sc=cur[idx].sc,pd=function(s,n){s=String(s);return s+" ".repeat(Math.max(1,n-s.length))};
$("pt1").textContent=sc!=null?"SEU RESULTADO ESTÁ PRONTO":"MATSELECT · COMPROVANTE";$("pz").textContent=sc!=null?"PONTUAÇÃO +"+Math.round(sc*100)+"%":"";$("pk").textContent="";$("pq").textContent="";
if(sc!=null&&cur.length>1){var o=cur[idx===0?1:0];$("pk").textContent="UM OLHAR MAIS DE PERTO · vs "+(idx===0?"2º":"1º")+": "+o.m.n;
$("pq").textContent=pd("",13)+pd("ESTE",9)+"OUTRO\n"+crs.map(function(k){var p=P.filter(function(x){return x[0]===k})[0];return pd(p[1].slice(0,12),13)+pd(f(m.v[k]),9)+f(o.m.v[k])}).join("\n")+"\n"+pd("Pontuação",13)+pd(Math.round(sc*100)+"%",9)+Math.round(o.sc*100)+"%"}
if(sc!=null)setStep(3);
im.onload=function(){$("cap").textContent=CN[m.c]+(/\.svg$/.test(im.src)?" · ilustração":" · foto")};im.onerror=function(){im.onerror=null;im.src="img/ilustracoes/"+s+".svg"};im.src="img/fotos/"+s+".jpg";
$("feed").classList.add("open");inPhoto=true;setTimeout(function(){$("feed").scrollIntoView({behavior:"smooth",block:"center"})},150)}
function closePhoto(){$("feed").classList.remove("open");inPhoto=false}
function fillMod(){var m=cur.length?cur[idx].m:null,t=m&&INFO[slug(m.n)];if(!t){$("mname").textContent="Sem material";$("mdl").innerHTML="";return}$("mname").textContent=m.n;
$("mdl").innerHTML=[["🧪","O que é",t[0]],["📅","Descoberta",t[1]],["🛠","Uso principal",t[2]],["💡","Curiosidade",t[3]],["🏷","Classe",CN[m.c]]].map(function(r){return "<dt>"+r[0]+" "+r[1]+"</dt><dd>"+r[2]+"</dd>"}).join("")}
function toggleMod(on){modOpen=on==null?!modOpen:on;$("mod").classList.toggle("open",modOpen);$("mi").classList.toggle("on",modOpen);if(modOpen){fillMod();setTimeout(function(){$("mod").scrollIntoView({behavior:"smooth",block:"nearest"})},650)}}
function art(cv,m){var x=cv.getContext("2d"),Pl=["#9bbc0f","#8bac0f","#306230","#0f380f"],h=0,i,a,b;for(i=0;i<m.n.length;i++)h=(h*31+m.n.charCodeAt(i))>>>0;var rnd=function(){h=(h*1664525+1013904223)>>>0;return h/4294967296};x.fillStyle=Pl[0];x.fillRect(0,0,64,48);
if(m.c==="M"){x.fillStyle=Pl[1];x.fillRect(8,14,48,24);x.fillStyle=Pl[0];x.fillRect(8,14,48,4);x.fillStyle=Pl[2];for(i=0;i<30;i++)x.fillRect(8+rnd()*40|0,18+rnd()*18|0,4+rnd()*10|0,1);x.fillStyle=Pl[3];x.fillRect(8,38,48,3);x.fillRect(8,14,48,1)}
else if(m.c==="P"){for(i=0;i<12;i++){var cx=8+rnd()*48,cy=8+rnd()*32,r=4+rnd()*4;x.beginPath();x.arc(cx,cy,r,0,7);x.fillStyle=Pl[1];x.fill();x.strokeStyle=Pl[3];x.stroke();x.fillStyle=Pl[0];x.fillRect(cx-r/2|0,cy-r/2|0,2,2)}}
else if(m.c==="C"){for(i=0;i<5;i++){var bx=7+i*11+rnd()*3,t=8+rnd()*18;x.beginPath();x.moveTo(bx-6,44);x.lineTo(bx,t);x.lineTo(bx,44);x.fillStyle=Pl[1];x.fill();x.beginPath();x.moveTo(bx,t);x.lineTo(bx+6,44);x.lineTo(bx,44);x.fillStyle=Pl[2];x.fill();x.beginPath();x.moveTo(bx-6,44);x.lineTo(bx,t);x.lineTo(bx+6,44);x.strokeStyle=Pl[3];x.stroke()}}
else{for(a=0;a<12;a++)for(b=0;b<9;b++){x.fillStyle=Pl[3];x.fillRect(a*5+2,b*5+2,5,5);x.fillStyle=(a+b)%2?Pl[1]:Pl[2];if((a+b)%2)x.fillRect(a*5+2,b*5+3,5,3);else x.fillRect(a*5+3,b*5+2,3,5)}}}
function draw(){if(modOpen)fillMod();var rs=$("list").querySelectorAll(".r"),L=$("list");rs.forEach(function(e,i){e.classList.toggle("s",i===idx)});if(rs[idx])L.scrollTop=rs[idx].offsetTop-L.clientHeight/2;
if(!cur.length){$("info").innerHTML=step?"Sem material.":"Pressione A para começar.";var q=$("art").getContext("2d");q.fillStyle="#9bbc0f";q.fillRect(0,0,64,48);return}
var m=cur[idx].m;art($("art"),m);$("info").innerHTML="<b>"+m.n+"</b><br>"+CN[m.c]+"<br>"+P.map(function(p){return (crs.indexOf(p[0])>-1?"★ ":"")+p[1]+": "+f(m.v[p[0]])+" "+p[2]}).join("<br>")+"<br>Fonte: "+m.src+'<br><a href="#" class="ph" role="button">Ver foto real ▶</a>'}
function show(rows,head){renderOut(rows,head);closePhoto();cur=rows;idx=0;$("list").innerHTML='<div class="stp">'+dots()+'</div><div style="font-weight:700">'+head+"</div>"+rows.map(function(r,i){return '<div class="r" data-i="'+i+'">'+(i<9?"0":"")+(i+1)+" "+r.m.n+(r.sc!=null?" · "+Math.round(r.sc*100)+"%":"")+"</div>"}).join("");draw()}
function run(){var cr=[];for(var i=0;i<3;i++){var p=$("p"+i).value;if(p)cr.push({p:p,m:$("m"+i).value,v:cleanV($("v"+i).value),w:+$("w"+i).value})}crs=cr.map(function(c){return c.p});
if(cr.length<2||new Set(crs).size<cr.length){step=1;show([],"Escolha 2 ou 3 propriedades diferentes no cartucho.");return}
var pool=DB.filter(function(m){return sel.has(m.c)&&cr.every(function(c){var x=m.v[c.p];if(x==null)return false;if(c.v===""||c.m==="+"||c.m==="-")return true;return c.m===">="?x>=+c.v:x<=+c.v})});
if(!pool.length){step=1;show([],"NENHUM MATERIAL ATENDE AOS REQUISITOS.");return}
cr.forEach(function(c){var vs=pool.map(function(m){return m.v[c.p]});c.lo=Math.min.apply(0,vs);c.hi=Math.max.apply(0,vs)});var W=cr.reduce(function(a,c){return a+c.w},0);
var rows=pool.map(function(m){return{m:m,sc:cr.reduce(function(a,c){var r=c.hi===c.lo?1:(m.v[c.p]-c.lo)/(c.hi-c.lo);if(c.m==="-"||c.m==="<=")r=1-r;return a+r*c.w},0)/W}}).sort(function(a,b){return b.sc-a.sc});step=2;show(rows,rows.length+" ACHADO(S) · RANKING")}
function all(){crs=[];show(DB.filter(function(m){return sel.has(m.c)}).map(function(m){return{m:m}}),"BANCO DE DADOS")}
function mv(d){if(inPhoto)return;idx=Math.max(0,Math.min(cur.length-1,idx+d));draw()}
function applyPre(i){var cs=PRE[i][1];for(var j=0;j<3;j++){var c=cs[j]||["","<=","",1];$("p"+j).value=c[0];$("m"+j).value=c[1];$("v"+j).value=c[2];$("w"+j).value=c[3]}run()}
$("go").onclick=run;$("all").onclick=all;$("bA").onclick=pressA;$("bB").onclick=pressB;$("back").onclick=closePhoto;$("info").onclick=function(e){if(e.target.classList.contains("ph")){e.preventDefault();openPhoto()}};$("up").onclick=function(){mv(-1)};$("dn").onclick=function(){mv(1)};$("lf").onclick=function(){mv(-5)};$("rt").onclick=function(){mv(5)};
$("sel").onclick=function(){pi=(pi+1)%3;applyPre(pi)};$("sta").onclick=openPhoto;$("mp").onclick=function(){$("crits").scrollIntoView({behavior:"smooth",block:"center"})};$("mi").onclick=function(){toggleMod()};$("mclose").onclick=function(){toggleMod(false)};$("list").onclick=function(e){var i=e.target.dataset.i;if(i!=null){idx=+i;draw()}};welcome();

function dots(){return "●".repeat(step)+"○".repeat(4-step)+" PASSO "+step+"/4"}
function setStep(n){step=n;var e=document.querySelector(".stp");if(e)e.textContent=dots()}
function welcome(){if($("out"))$("out").innerHTML="";step=0;crs=[];cur=[];idx=0;$("list").innerHTML='<div class="stp">'+dots()+'</div><div style="font-weight:700">MATSELECT · CALCULADORA</div><div>Escolha o material certo,</div><div>calculado a partir dos dados.</div><div>&nbsp;</div><div>▶ Pressione A (ACEITAR)</div>';draw()}
function pressA(){if(inPhoto){closePhoto();return}
 if(step===0){step=1;show([],"DEFINA AS PROPRIEDADES NO CARTUCHO E APERTE A");$("crits").scrollIntoView({behavior:"smooth",block:"center"});return}
 if(step===1||!cur.length){run();return}openPhoto()}
function disarm(){armed=false;clearTimeout(armT);$("pwr").textContent="● BATERIA"}
function pressB(){if(inPhoto){closePhoto();return}if(!armed){armed=true;$("pwr").textContent="← CONFIRMAR RESET (B)";armT=setTimeout(disarm,3500);return}disarm();resetAll()}
function resetAll(){for(var j=0;j<3;j++){$("p"+j).value="";$("v"+j).value="";$("m"+j).selectedIndex=0;$("w"+j).selectedIndex=0}Object.keys(CN).forEach(function(k){sel.add(k)});document.querySelectorAll("#chips .chip").forEach(function(e){e.classList.add("on")});toggleMod(false);closePhoto();pi=0;welcome()}

function renderOut(rows,head){var o=$("out");if(!o)return;
 if(!rows.length){o.innerHTML=/^NENHUM/.test(head)?'<div class="msg bad"><b>Nenhum material atende aos requisitos definidos.</b> Relaxe algum limite, troque de categoria ou reduza as exigências.</div>':(/^Escolha/.test(head)?'<div class="msg bad">Selecione duas ou três propriedades diferentes.</div>':"");return}
 var rk=rows[0].sc!=null,cols=rk?crs.map(function(k){return P.filter(function(p){return p[0]===k})[0]}):P;
 o.innerHTML='<div class="msg"><b>'+rows.length+'</b> '+(rk?'material(is) atendem. Ranking por média ponderada das propriedades normalizadas.':'materiais no banco de dados.')+'</div><div class="wrap"><table><thead><tr>'+(rk?'<th>#</th>':'')+'<th>Material</th><th>Categoria</th>'+cols.map(function(p){return '<th>'+p[1]+' ('+p[2]+')</th>'}).join("")+(rk?'<th>Pontuação</th>':'')+'<th>Fonte</th></tr></thead><tbody>'+
 rows.map(function(r,i){var m=r.m;return '<tr data-i="'+i+'" style="cursor:pointer">'+(rk?'<td>'+(i+1)+'</td>':'')+'<td><b>'+m.n+'</b></td><td>'+CN[m.c]+'</td>'+cols.map(function(p){return '<td>'+f(m.v[p[0]])+'</td>'}).join("")+(rk?'<td><div class="bar"><i style="width:'+Math.round(r.sc*100)+'%"></i></div>'+Math.round(r.sc*100)+'%</td>':'')+'<td class="note">'+m.src+'</td></tr>'}).join("")+'</tbody></table></div>'}
$("out").onclick=function(e){var t=e.target.closest?e.target.closest("tr"):null;if(t&&t.dataset.i!=null){idx=+t.dataset.i;draw()}};
