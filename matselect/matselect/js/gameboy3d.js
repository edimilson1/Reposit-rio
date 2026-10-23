/* MATBOY 3D (Three.js / WebGL) - cena em tela cheia.
   - Gameboy grande e clicavel (ids up, dn, lf, rt, bA, bB, sel, sta, mi, mp = mesmos controles do modo classico).
   - Modulo de informacoes: so e desenhado ao tocar em MODULO; encaixa na lateral e a camera se aproxima.
   - Modulo de foto: preso atras; ao pedir a foto o console gira 1080 graus, a camera se aproxima e o modulo desdobra (tela dobravel) por cima.
   - Painel de busca: laptop guardado atras; ao tocar em PAINEL gira 1080 graus, sai de tras e abre a 130 graus (campos, teclado e resultados).
   Todo o estado fica no DOM (formulario, #feed, #mod, #photo), por isso 2D e 3D ficam sincronizados. Depende de three.min.js. */
(function(){
if(!window.THREE)return;
var $=function(i){return document.getElementById(i)},stage=$("stage"),cv=$("gb3d");
if(!stage||!cv)return;
var R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
R.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(35,1,.1,100);C.position.set(0,0,9);
S.add(new THREE.AmbientLight(0xffffff,.8));var DL=new THREE.DirectionalLight(0xffffff,.8);DL.position.set(4,6,8);S.add(DL);
var PL=new THREE.PointLight(0x5aa0d3,.9,40);PL.position.set(-5,-3,7);S.add(PL);
var PD=15,rig=new THREE.Group(),dev=new THREE.Group(),gb=new THREE.Group(),rigL=new THREE.Group(),devL=new THREE.Group();S.add(rig);rig.add(dev);dev.add(gb);S.add(rigL);rigL.add(devL);rigL.position.y=-PD;

/* ---------- helpers ---------- */
function M(c,r,m){return new THREE.MeshStandardMaterial({color:c,roughness:r==null?.5:r,metalness:m||0})}
function tex(c){var t=new THREE.CanvasTexture(c);t.anisotropy=4;return t}
function cnv(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
function rr(w,h,a,b,c,d){var s=new THREE.Shape(),x=w/2,y=h/2,P=Math.PI;s.moveTo(-x+d,-y);s.lineTo(x-c,-y);s.absarc(x-c,-y+c,c,-P/2,0,false);s.lineTo(x,y-b);s.absarc(x-b,y-b,b,0,P/2,false);s.lineTo(-x+a,y);s.absarc(-x+a,y-a,a,P/2,P,false);s.lineTo(-x,-y+d);s.absarc(-x+d,-y+d,d,P,P*1.5,false);return s}
function ex(shape,depth,bevel){var g=new THREE.ExtrudeGeometry(shape,{depth:depth,bevelEnabled:!!bevel,bevelThickness:bevel||0,bevelSize:bevel||0,bevelSegments:3,curveSegments:14});g.translate(0,0,-depth/2);return g}
function box(w,h,d,mat,x,y,z){var m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);return m}
function plane(w,h,map,x,y,z){var m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:map,transparent:true}));m.position.set(x,y,z);return m}
function rp(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function wrap(x,t,X,Y,mw,lh){var w=String(t).split(" "),l="";w.forEach(function(wd){var tt=l?l+" "+wd:wd;if(x.measureText(tt).width>mw&&l){x.fillText(l,X,Y);Y+=lh;l=wd}else l=tt});x.fillText(l,X,Y);return Y+lh}
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
function clamp(v){return Math.max(0,Math.min(1,v))}
function go(p,t,s){return p<t?Math.min(t,p+s):Math.max(t,p-s)}

/* ---------- gameboy: corpo, moldura, visor ---------- */
gb.add(new THREE.Mesh(ex(rr(3,4.8,.22,.22,.9,.22),.5,.06),M(0x2d628c,.45,.1)));
var bz=new THREE.Mesh(ex(rr(2.7,2.2,.12,.12,.6,.12),.04),M(0x0f2a40,.6));bz.position.set(0,.95,.33);gb.add(bz);
var sc=cnv(660,522),sx=sc.getContext("2d"),sTex=tex(sc);
var scr=new THREE.Mesh(new THREE.PlaneGeometry(2.15,1.7),new THREE.MeshBasicMaterial({map:sTex}));scr.position.set(0,1.05,.352);gb.add(scr);
var bt=cnv(640,100),bx=bt.getContext("2d");bx.font="italic 700 56px Arial,sans-serif";bx.fillStyle="#fff";bx.fillText("MATBOY",6,70);bx.fillStyle="#8fc4ec";bx.fillText("COLOR",6+bx.measureText("MATBOY ").width,70);
gb.add(plane(1.8,.28,tex(bt),-.2,-.5,.325));

/* ---------- botoes ---------- */
var clk3=[],keys={},DK=M(0x0f2a40,.45,.2);
function reg(k,m){m.userData.key=k;m.userData.base=m.position.z;keys[k]=m;clk3.push(m);gb.add(m)}
gb.add(box(.34,.34,.14,DK,-.85,-1.35,.38));
reg("up",box(.32,.32,.14,DK,-.85,-1.03,.38));reg("dn",box(.32,.32,.14,DK,-.85,-1.67,.38));reg("lf",box(.32,.32,.14,DK,-1.17,-1.35,.38));reg("rt",box(.32,.32,.14,DK,-.53,-1.35,.38));
function round(k,ch,x,y){var m=new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.14,28),DK),c=cnv(128,128),g=c.getContext("2d");g.fillStyle="#cfe6f7";g.font="700 88px Arial,sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(ch,64,70);
 m.rotation.x=Math.PI/2;m.position.set(x,y,.38);var l=new THREE.Mesh(new THREE.CircleGeometry(.2,24),new THREE.MeshBasicMaterial({map:tex(c),transparent:true}));l.rotation.x=-Math.PI/2;l.position.y=.072;m.add(l);reg(k,m)}
round("bB","B",.55,-1.55);round("bA","A",1.1,-1.3);
var PM=M(0x8fc4ec,.4,.1),PX={sel:-.8,sta:-.3,mi:.2,mp:.7};
Object.keys(PX).forEach(function(k){var m=box(.44,.16,.08,PM,PX[k],-2.0,.35);m.rotation.z=.35;reg(k,m)});
var lb=cnv(1000,64),lx=lb.getContext("2d");lx.fillStyle="#cfe6f7";lx.font="700 26px monospace";lx.textAlign="center";
[["SELECT","sel"],["START","sta"],["MÓDULO","mi"],["PAINEL","mp"]].forEach(function(p){lx.fillText(p[0],(PX[p[1]]+1.25)/2.5*1000,40)});
gb.add(plane(2.5,.16,tex(lb),-.05,-2.24,.318));

/* ---------- modulo de foto (tela dobravel presa atras, dobradica no topo) ---------- */
var hinge=new THREE.Group(),pc=cnv(780,540),pTex=tex(pc);hinge.position.set(0,2.46,-.4);gb.add(hinge);
hinge.add(box(3.1,2.15,.08,M(0x0f2a40,.5,.2),0,-1.075,0));
var pScr=new THREE.Mesh(new THREE.PlaneGeometry(3,2.05),new THREE.MeshBasicMaterial({map:pTex}));pScr.rotation.x=Math.PI;pScr.position.set(0,-1.075,-.042);hinge.add(pScr);
var bar=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,3.1,16),M(0xd4af37,.3,.8));bar.rotation.z=Math.PI/2;hinge.add(bar);

/* ---------- modulo de informacoes (so existe na cena quando solicitado) ---------- */
var inf=new THREE.Group(),GOLD=M(0xd4af37,.3,.8),ic=cnv(440,840),iTex=tex(ic);
inf.add(new THREE.Mesh(ex(rr(2.4,4.4,.1,.25,.25,.1),.4,0),M(0x1b4467,.5,.1)));
for(var i=0;i<10;i++)inf.add(box(.06,.14,.1,GOLD,-1.23,-1.35+i*.3,0));
inf.add(plane(2.2,4.2,iTex,0,0,.201));gb.add(inf);

/* ---------- laptop (painel de busca): guardado atras, abre a 130 graus ---------- */
var lap=new THREE.Group(),lidP=new THREE.Group(),dkc=cnv(1024,676),lc=cnv(1024,676),dkTex=tex(dkc),lcTex=tex(lc);
lap.add(box(5,.12,3.3,M(0x16344f,.5,.3),0,0,0));
var deckTop=new THREE.Mesh(new THREE.PlaneGeometry(4.9,3.2),new THREE.MeshBasicMaterial({map:dkTex}));deckTop.rotation.x=-Math.PI/2;deckTop.position.y=.062;deckTop.userData.ui="deck";lap.add(deckTop);
lidP.position.set(0,.06,-1.65);lap.add(lidP);lidP.add(box(5,.1,3.3,M(0x16344f,.5,.3),0,.05,1.65));
var lidScr=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3.15),new THREE.MeshBasicMaterial({map:lcTex}));lidScr.rotation.x=Math.PI/2;lidScr.position.set(0,-.002,1.65);lidScr.userData.ui="lid";lidP.add(lidScr);
lap.rotation.x=.7;devL.add(lap);

/* ---------- texturas dinamicas (espelham o DOM e as variaveis do app) ---------- */
var lastStep=null,spinT=1,spinL=1,lidT=0,lidHide=false,lastSig="",ec=0,ecS=0,focus=0,rg={deck:[],lid:[]};
function drawScreen(){
 sx.fillStyle="#9bbc0f";sx.fillRect(0,0,660,522);sx.fillStyle="#0f380f";sx.textBaseline="alphabetic";
 var L=$("list"),kids=[].slice.call(L.children),rows=kids.filter(function(e){return e.classList.contains("r")}),oth=kids.filter(function(e){return !e.classList.contains("r")}),y=28;
 var st=/PASSO (\d)/.exec(L.textContent);if(st){var n=+st[1];if(lastStep!==null&&n!==lastStep){if(n===1)goPanel()}lastStep=n}
 var sig=(L.children[1]?L.children[1].textContent:"")+"|"+rows.length;if(sig!==lastSig){lastSig=sig;lidHide=false}lidT=rows.length>0?1:0;
 oth.slice(0,6).forEach(function(e,i){var s=e.classList.contains("stp");sx.font=(s?"20px":(i===1?"bold 27px":"26px"))+" 'Courier New',monospace";sx.fillText(e.textContent.slice(0,s?40:36),14,y);y+=s?26:36});
 var si=Math.max(0,rows.findIndex(function(e){return e.classList.contains("s")})),a=Math.max(0,Math.min(si-2,rows.length-5));
 rows.slice(a,a+5).forEach(function(e){var s=e.classList.contains("s");if(s){sx.fillRect(6,y-28,648,40);sx.fillStyle="#9bbc0f"}sx.font="26px 'Courier New',monospace";sx.fillText(e.textContent.slice(0,38),14,y);sx.fillStyle="#0f380f";y+=42});
 sx.fillRect(0,316,660,4);sx.imageSmoothingEnabled=false;sx.drawImage($("art"),12,330,180,135);sx.strokeStyle="#0f380f";sx.lineWidth=3;sx.strokeRect(12,330,180,135);
 var inf2=($("info").innerHTML||"").replace(/<br\s*\/?>/g,"\n").replace(/<[^>]+>/g,"").replace(/★ /g,"").split("\n");sx.font="20px 'Courier New',monospace";
 inf2.slice(0,8).forEach(function(l,i){sx.fillText(l.slice(0,36),204,350+i*24)});sTex.needsUpdate=true}
function paintPhoto(useImg){var c=cnv(780,540),x=c.getContext("2d"),ph=$("photo"),src=useImg?ph:$("art"),sw=useImg?ph.naturalWidth:64,sh=useImg?ph.naturalHeight:48,k=Math.max(780/sw,370/sh),w=sw*k,h=sh*k;
 x.fillStyle="#0b1b2b";x.fillRect(0,0,780,540);x.save();x.beginPath();x.rect(0,0,780,370);x.clip();x.imageSmoothingEnabled=useImg;x.drawImage(src,(780-w)/2,(370-h)/2,w,h);x.restore();
 if(useImg){try{x.getImageData(0,0,1,1)}catch(e){return paintPhoto(false)}}
 x.fillStyle="#fff";x.font="700 34px Arial,sans-serif";x.fillText($("pn").textContent.slice(0,30),20,412);x.fillStyle="#8fc4ec";x.font="22px Arial,sans-serif";x.fillText($("cap").textContent,20,442);
 x.fillStyle="#cfe6f7";x.font="17px 'Courier New',monospace";$("pp").textContent.split("\n").forEach(function(l,i){x.fillText(l,i<3?20:400,(i<3?474+i*24:474+(i-3)*24))});return c}
function drawPhoto(){var ph=$("photo");pTex.image=paintPhoto(ph.complete&&ph.naturalWidth>0);pTex.needsUpdate=true}
function drawMod(){var x=ic.getContext("2d"),g=x.createLinearGradient(0,0,440,840);g.addColorStop(0,"#1b4467");g.addColorStop(1,"#0f2a40");x.fillStyle=g;x.fillRect(0,0,440,840);
 x.fillStyle="#8fc4ec";x.font="700 17px monospace";x.fillText("MÓDULO · INFO",22,34);x.fillStyle="#fff";x.font="700 32px Arial,sans-serif";var y=wrap(x,$("mname").textContent,22,84,396,38);
 var k=[].slice.call($("mdl").children);for(var i=0;i+1<k.length;i+=2){y+=6;x.fillStyle="#8fc4ec";x.font="700 17px Arial,sans-serif";x.fillText(k[i].textContent.toUpperCase(),22,y);y+=24;x.fillStyle="#cfe6f7";x.font="22px Arial,sans-serif";y=wrap(x,k[i+1].textContent,22,y,396,28)}iTex.needsUpdate=true}
function keyIn(k){var v=$("v"+focus),s=v.value;
 if(k==="C")s="";else if(k==="⌫")s=s.slice(0,-1);else if(k==="."){if(s.indexOf(".")<0)s=(s===""||s==="-"?s+"0":s)+"."}else if(k==="±")s=s.charAt(0)==="-"?s.slice(1):"-"+s;else if(/^\d$/.test(k)&&s.length<9)s+=k;
 v.value=s}
function cyc(s){return function(){s.selectedIndex=(s.selectedIndex+1)%s.options.length}}
function drawDeck(){var c=dkc.getContext("2d"),regs=[];c.fillStyle="#0f2a40";c.fillRect(0,0,1024,676);c.textBaseline="middle";
 function B(x,y,w,h,t,bg,fn,fs,fg){c.fillStyle=bg;rp(c,x,y,w,h,12);c.fill();c.fillStyle=fg||"#fff";c.font="700 "+(fs||22)+"px Arial,sans-serif";c.textAlign="center";c.fillText(t,x+w/2,y+h/2+2);if(fn)regs.push({x:x,y:y,w:w,h:h,fn:fn})}
 c.fillStyle="#8fc4ec";c.font="700 20px monospace";c.textAlign="left";c.fillText("PAINEL DE BUSCA · toque nos campos",16,26);c.textAlign="right";c.fillText("PASSO "+step+"/4",1008,26);
 for(var i=0;i<3;i++)(function(i){var p=$("p"+i),m=$("m"+i),v=$("v"+i),w=$("w"+i),y=64+i*74,t=function(s){return s.options[s.selectedIndex].text};
  B(16,y,360,58,p.selectedIndex?t(p):"— propriedade "+(i+1)+" —","#1b4467",cyc(p),21,p.selectedIndex?"#fff":"#8fa9bf");B(386,y,210,58,t(m),"#1b4467",cyc(m),19);
  B(606,y,170,58,v.value||"valor",focus===i?"#2d628c":"#1b4467",function(){focus=i},24,v.value?"#fff":"#8fa9bf");B(786,y,110,58,"Peso "+w.value,"#1b4467",cyc(w),19);
  B(906,y,102,58,"limpar","#33281f",function(){p.selectedIndex=0;v.value=""},18)})(i);
 Object.keys(CN).forEach(function(k,i){B(16+i*250,290,240,44,(sel.has(k)?"● ":"○ ")+CN[k],sel.has(k)?"#2d628c":"#1b4467",function(){var e=document.querySelector('#chips .chip[data-k="'+k+'"]');if(e)e.click()},20)});
 B(16,350,220,56,"BUSCAR","#1f8a5b",function(){$("go").click()},26);B(246,350,190,56,"BANCO","#1b4467",function(){$("all").click()},22);
 for(var j=0;j<3;j++)(function(j){B(450+j*190,350,178,56,"Cenário "+(j+1),"#1b4467",function(){var e=document.querySelector('#presets .chip[data-i="'+j+'"]');if(e)e.click()},20)})(j);
 var K=["1","2","3","4","5","6","7","8","9","0",".","±","⌫","C","↵"];
 K.forEach(function(k,i){B(16+(i%8)*80,430+Math.floor(i/8)*78,72,66,k,k==="↵"?"#1f8a5b":"#1b4467",k==="↵"?function(){$("go").click()}:function(){keyIn(k)},28)});
 c.fillStyle="#8fa9bf";c.font="20px Arial,sans-serif";c.textAlign="left";c.fillText("Toque em VALOR e digite.",670,452);c.fillText("O teclado do notebook também digita.",670,482);c.fillText("Tab troca de campo · Enter busca.",670,512);
 rg.deck=regs;dkTex.needsUpdate=true}
function drawLid(){var c=lc.getContext("2d"),regs=[],rows=window.cur||[];c.fillStyle="#0b1b2b";c.fillRect(0,0,1024,676);c.textBaseline="middle";c.textAlign="left";
 var head=$("list").children[1];c.fillStyle="#8fc4ec";c.font="700 22px monospace";c.fillText("RESULTADOS · "+(head?head.textContent.slice(0,46):""),20,30);c.fillStyle="#25384a";rp(c,880,6,134,40,10);c.fill();c.fillStyle="#fff";c.textAlign="center";c.font="700 18px Arial,sans-serif";c.fillText("✕ fechar",947,27);regs.push({x:880,y:6,w:134,h:40,fn:function(){lidHide=true}});
 if(!rows.length){c.textAlign="center";c.fillStyle="#cfe6f7";c.font="700 30px Arial,sans-serif";c.fillText(step?"Defina os campos e toque em BUSCAR":"Aperte A no gameboy para começar",512,330);lcTex.needsUpdate=true;rg.lid=regs;return}
 var cs=crs.slice(0,3),px=[560,690,820];c.textAlign="left";c.fillStyle="#8fa9bf";c.font="700 14px Arial,sans-serif";c.fillText("#",20,76);c.fillText("MATERIAL",64,76);c.fillText("CATEGORIA",404,76);
 cs.forEach(function(k,i){var p=P.filter(function(q){return q[0]===k})[0];c.fillText(p[1].split(" ")[0].slice(0,9).toUpperCase()+" "+p[2],px[i],76)});c.fillText("NOTA",890,76);
 var a=Math.max(0,Math.min(idx-4,rows.length-10));
 rows.slice(a,a+10).forEach(function(r,i){var y=92+i*56,m=r.m,sel2=a+i===idx;if(sel2){c.fillStyle="#1b4467";rp(c,8,y,1008,50,10);c.fill()}
  c.fillStyle="#fff";c.font="20px Arial,sans-serif";c.textAlign="left";c.fillText(String(a+i+1),20,y+26);c.font="700 22px Arial,sans-serif";c.fillText(m.n.slice(0,24),64,y+26);c.font="19px Arial,sans-serif";c.fillStyle="#cfe6f7";c.fillText(CN[m.c],404,y+26);
  cs.forEach(function(k,j){c.fillText(f(m.v[k]),px[j],y+26)});
  if(r.sc!=null){c.fillStyle="#25384a";rp(c,890,y+18,70,14,7);c.fill();c.fillStyle="#1f8a5b";rp(c,890,y+18,Math.max(8,70*r.sc),14,7);c.fill();c.fillStyle="#fff";c.font="15px Arial,sans-serif";c.textAlign="right";c.fillText(Math.round(r.sc*100)+"%",1012,y+26)}
  regs.push({x:8,y:y,w:1008,h:50,fn:function(){var e=$("list").querySelectorAll(".r")[a+i];if(e)e.click()}})});
 if(rows.length>10){c.fillStyle="#25384a";c.fillRect(1018,92,4,560);var th=560*10/rows.length;c.fillStyle="#8fc4ec";c.fillRect(1018,92+(560-th)*(a/(rows.length-10)),4,th)}
 rg.lid=regs;lcTex.needsUpdate=true}

/* ---------- observadores do DOM (estado unico, 2D e 3D sincronizados) ---------- */
var sched=false;function later(){if(sched)return;sched=true;requestAnimationFrame(function(){sched=false;drawScreen();drawLid();drawDeck()})}
function mo(el,fn,o){if(el)new MutationObserver(fn).observe(el,o)}
var photoT=0,infoT=0;
mo($("list"),later,{childList:true,subtree:true,attributes:true,characterData:true});mo($("info"),later,{childList:true,subtree:true});
mo($("feed"),function(){photoT=$("feed").classList.contains("open")?1:0;if(photoT)drawPhoto()},{attributes:true,attributeFilter:["class"]});
mo($("mod"),function(){infoT=$("mod").classList.contains("open")?1:0},{attributes:true,attributeFilter:["class"]});
mo($("mname"),drawMod,{childList:true,subtree:true,characterData:true});mo($("mdl"),drawMod,{childList:true,subtree:true});
$("photo").addEventListener("load",function(){if(photoT)drawPhoto()});
function goPanel(){if(!document.body.classList.contains("mode3d"))return;window.scrollTo({top:stage.getBoundingClientRect().top+window.scrollY+(stage.offsetHeight-innerHeight)*.95,behavior:"smooth"})}
$("mp").onclick=function(){if(document.body.classList.contains("mode3d"))goPanel();else $("crits").scrollIntoView({behavior:"smooth",block:"center"})};

/* ---------- interacao: botoes 3D, campos do laptop e arrastar para girar ---------- */
var ray=new THREE.Raycaster(),v2=new THREE.Vector2(),mx=0,my=0,dragX=0,dragY=0,down=null,dragging=false,lx=0,ly=0,until={},lapP=0,infoP=0,photoP=0;
function press(k){until[k]=performance.now()+170}
Object.keys(keys).forEach(function(k){var b=$(k);if(b)b.addEventListener("click",function(){press(k)})});
function pick(e){var r=cv.getBoundingClientRect();v2.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));ray.setFromCamera(v2,C);
 var L=clk3.slice();if(ec>.5){L.push(deckTop);if(lapP>.9)L.push(lidScr)}var h=ray.intersectObjects(L,true);
 for(var i=0;i<h.length;i++){var o=h[i].object;if(o.userData.ui&&h[i].uv){var rs=rg[o.userData.ui],u=h[i].uv.x*1024,w=(1-h[i].uv.y)*676;for(var j=0;j<rs.length;j++){var g=rs[j];if(u>=g.x&&u<=g.x+g.w&&w>=g.y&&w<=g.y+g.h)return{fn:g.fn}}return null}
  while(o&&!(o.userData&&o.userData.key))o=o.parent;if(o)return{key:o.userData.key}}return null}
cv.addEventListener("pointerdown",function(e){down={x:e.clientX,y:e.clientY};dragging=false;lx=e.clientX;ly=e.clientY;try{cv.setPointerCapture(e.pointerId)}catch(_){}});
cv.addEventListener("pointermove",function(e){var r=cv.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*2-1;my=(e.clientY-r.top)/r.height*2-1;
 if(down&&(dragging||Math.abs(e.clientX-down.x)+Math.abs(e.clientY-down.y)>6)){dragging=true;dragY=Math.max(-1.4,Math.min(1.4,dragY+(e.clientX-lx)*.01));dragX=Math.max(-.7,Math.min(.7,dragX+(e.clientY-ly)*.006))}
 lx=e.clientX;ly=e.clientY;cv.style.cursor=dragging?"grabbing":(pick(e)?"pointer":"grab")});
cv.addEventListener("pointerup",function(e){if(down&&!dragging){var k=pick(e);if(k){if(k.key){var b=$(k.key);if(b)b.click()}else if(k.fn){k.fn();later()}}}down=null;dragging=false});
cv.addEventListener("pointerleave",function(){mx=0;my=0});
$("stBack").onclick=function(){if(photoT)$("back").click();else if(infoT)$("mclose").click();else if(lockedNow())lidHide=true;else window.scrollTo({top:stage.getBoundingClientRect().top+window.scrollY,behavior:"smooth"})};

/* ---------- travamento da pagina (tela do painel aberta) e teclado fisico ---------- */
function lockedNow(){return document.body.classList.contains("mode3d")&&ec>.5&&lidT&&!lidHide&&lapP>.3}
var acc=0,ty0=0;
function stepRes(d){var rows=$("list").querySelectorAll(".r");if(!rows.length)return;var n=Math.max(0,Math.min(rows.length-1,idx+d));if(rows[n])rows[n].click()}
addEventListener("wheel",function(e){if(!lockedNow())return;e.preventDefault();acc+=e.deltaY*(e.deltaMode===1?33:1);if(Math.abs(acc)>=50){stepRes(Math.round(acc/50));acc=0}},{passive:false});
addEventListener("touchstart",function(e){ty0=e.touches[0].clientY},{passive:true});
addEventListener("touchmove",function(e){if(!lockedNow())return;e.preventDefault();var y=e.touches[0].clientY;acc+=ty0-y;ty0=y;if(Math.abs(acc)>=40){stepRes(Math.round(acc/40));acc=0}},{passive:false});
addEventListener("keydown",function(e){var tg=e.target&&e.target.tagName;if(tg==="INPUT"||tg==="SELECT"||tg==="TEXTAREA"||e.ctrlKey||e.metaKey||e.altKey)return;
 if(!document.body.classList.contains("mode3d")||ec<=.5)return;
 var k=e.key,lk=lockedNow(),h=true;
 if(lk&&k==="ArrowDown")stepRes(1);else if(lk&&k==="ArrowUp")stepRes(-1);else if(lk&&k==="PageDown")stepRes(10);else if(lk&&k==="PageUp")stepRes(-10);else if(lk&&k==="Home")stepRes(-9999);else if(lk&&k==="End")stepRes(9999);else if(lk&&k===" "){}
 else if(/^\d$/.test(k))keyIn(k);else if(k==="."||k===",")keyIn(".");else if(k==="-")keyIn("±");else if(k==="Backspace")keyIn("⌫");else if(k==="Delete")keyIn("C");else if(k==="Enter")$("go").click();
 else if(k==="Tab")focus=(focus+(e.shiftKey?2:1))%3;else if(k==="Escape"&&lk)lidHide=true;else h=false;
 if(h){e.preventDefault();later()}});

/* ---------- laco de animacao: a rolagem leva a camera do gameboy ao painel ---------- */
var clock=new THREE.Clock(),vis=true,smX=0,smY=0,prevP=0,prevL=0,hintT="";
function fit(W,H){return Math.max(H/(.63*.94),W/(.63*C.aspect*.94))}
function tick(){requestAnimationFrame(tick);if(!vis||!document.body.classList.contains("mode3d"))return;
 var dt=Math.min(clock.getDelta(),.05),t=clock.elapsedTime,now=performance.now();
 var r=stage.getBoundingClientRect(),sp=clamp(-r.top/Math.max(1,r.height-innerHeight));ecS+=(ease(clamp((sp-.35)/.3))-ecS)*Math.min(1,dt*6);ec=ecS;
 var pE=photoT?1:0,iE=(infoT&&!pE)?1:0,lE=(lidT&&!lidHide)?1:0;
 if(pE&&!prevP)spinT=0;if(lE&&!prevL)spinL=0;prevP=pE;prevL=lE;
 photoP=go(photoP,pE,dt/2.4);infoP=go(infoP,iE,dt/1.1);lapP=go(lapP,lE,dt/1.6);
 var eP=ease(photoP),eI=ease(infoP),ld=ease(lapP),hg=ease(clamp((photoP-.45)/.55));
 hinge.visible=photoP>.001;inf.visible=infoP>.001;lidP.visible=lapP>.001;
 hinge.rotation.x=Math.PI*hg;
 inf.position.set(7+(2.76-7)*eI,2*(1-eI),-3*(1-eI));inf.rotation.y=(1-eI)*-1.3;inf.scale.setScalar(.3+.7*eI);
 lidP.rotation.x=-130*Math.PI/180*ld;
 var sG=0,aG=0,sL=0,aL=0;
 if(spinT<1){spinT=Math.min(1,spinT+dt/2.4);sG=ease(spinT)*Math.PI*6;aG=Math.sin(Math.PI*spinT)}
 if(spinL<1){spinL=Math.min(1,spinL+dt/2.4);sL=ease(spinL)*Math.PI*6;aL=Math.sin(Math.PI*spinL)}
 rig.rotation.y=sG;rig.position.set(-1.2*eI,-2.3*eP,0);rigL.rotation.y=sL;rigL.position.set(0,-PD-1.68*ld,0);
 var zG=fit(3.4+2.6*eI,4.9+.3*eP)*(1-.14*eP)-1.5*aG,zL=fit(5.2,2.6+2.9*ld)-1.5*aL,z=zG+(zL-zG)*ec;
 C.position.y=-PD*ec;C.position.z+=(z-C.position.z)*Math.min(1,dt*5);
 var ty=mx*.35+dragY,tx=-my*.18+dragX;smY+=(ty-smY)*Math.min(1,dt*6);smX+=(tx-smX)*Math.min(1,dt*6);
 dev.rotation.y=smY;dev.rotation.x=smX;devL.rotation.y=smY;devL.rotation.x=smX*.5;dev.position.y=Math.sin(t*1.2)*.05;
 if(!dragging){dragY-=dragY*dt*.8;dragX-=dragX*dt*.8}
 PL.position.x=-5+mx*3;PL.position.y=-3-PD*ec;
 Object.keys(keys).forEach(function(k){var m=keys[k];m.position.z=m.userData.base-((until[k]||0)>now?.05:0)});
 var lk=lockedNow(),ht=(pE||iE)?"":(lk?"↑↓ ou role para navegar nos resultados · ✕ ou Esc fecha a tela":(ec<.5?"↓ role para o painel de busca":"↑ role para voltar ao gameboy"));cv.style.touchAction=lk?"none":"pan-y";if(ht!==hintT){hintT=ht;$("hint3").textContent=ht}
 stage.classList.toggle("act",!!(pE||iE||ec>.5));R.render(S,C)}
window.GB3D={state:function(){return{ec:ec,lid:lapP,photo:photoP,info:infoP}}};

/* ---------- tamanho, visibilidade e alternancia 3D/classico ---------- */
function size(){var pn=cv.parentNode,w=pn.clientWidth,h=pn.clientHeight;if(!w||!h)return;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()}
window.addEventListener("resize",size);if(window.ResizeObserver)new ResizeObserver(size).observe(cv.parentNode);
if(window.IntersectionObserver)new IntersectionObserver(function(en){vis=en[0].isIntersecting}).observe(stage);
function sync(){photoT=$("feed").classList.contains("open")?1:0;infoT=$("mod").classList.contains("open")?1:0;if(photoT)drawPhoto();photoP=photoT;infoP=infoT&&!photoT?1:0;prevP=photoT;spinT=1;spinL=1;lapP=(lidT&&!lidHide)?1:0;prevL=lapP}
function mode(on){document.body.classList.toggle("mode3d",on);if(on){size();sync();later();drawMod()}}
$("v3d").onclick=function(){mode(true)};$("vcl").onclick=function(){mode(false)};
document.body.classList.add("has3d");mode(true);drawScreen();drawLid();drawDeck();drawMod();tick();
})();
