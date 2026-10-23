/* Titulo em canvas: letras normais; sob o mouse, uma lente de 200 px de diametro mostra as letras como circuito impresso. */
(function(){
var cv=document.getElementById("ttl");if(!cv)return;
var LENS_D=200; /* diametro da lente em pixels (altere aqui) */
var x=cv.getContext("2d"),TXT=cv.getAttribute("data-t"),dpr=Math.min(window.devicePixelRatio||1,3);
var FONT="-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",base,circ,W,H,fs,lines,r=0,tr=0,mx=0,my=0,run=false;
function layout(){
 W=Math.min(cv.parentNode.clientWidth||800,900);fs=Math.max(30,Math.min(innerWidth*.06,64));
 var o=document.createElement("canvas").getContext("2d");o.font="700 "+fs+"px "+FONT;lines=[];var ln="";
 TXT.split(" ").forEach(function(w){var t=ln?ln+" "+w:w;if(o.measureText(t).width>W&&ln){lines.push(ln);ln=w}else ln=t});lines.push(ln);
 H=Math.ceil(lines.length*fs*1.15+fs*.2);cv.style.width=W+"px";cv.style.height=H+"px";cv.width=W*dpr;cv.height=H*dpr;build();paint();
}
function mask(c,col){c.setTransform(dpr,0,0,dpr,0,0);c.font="700 "+fs+"px "+FONT;c.textBaseline="top";c.fillStyle=col;lines.forEach(function(l,i){c.fillText(l,0,i*fs*1.15+fs*.1)})}
function rng(s){return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function traces(c){
 var R=rng(7),p=4,D=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],n=Math.round(W*H/130);
 c.strokeStyle="#e9c46a";c.fillStyle="#e9c46a";c.lineWidth=1.3;c.lineJoin="round";c.lineCap="round";
 for(var i=0;i<n;i++){
  var px=Math.floor(R()*W/p)*p,py=Math.floor(R()*H/p)*p,d=Math.floor(R()*8),len=6+Math.floor(R()*26);
  c.beginPath();c.moveTo(px,py);
  for(var s=0;s<len;s++){if(R()<.22)d=(d+(R()<.5?1:7))%8;px+=D[d][0]*p;py+=D[d][1]*p;c.lineTo(px,py)}
  c.stroke();
  c.beginPath();c.arc(px,py,1.9,0,7);c.fill();c.fillStyle="#0c5a34";c.beginPath();c.arc(px,py,.8,0,7);c.fill();c.fillStyle="#e9c46a";
 }
}
function build(){
 base=document.createElement("canvas");base.width=cv.width;base.height=cv.height;mask(base.getContext("2d"),"#fff");
 circ=document.createElement("canvas");circ.width=cv.width;circ.height=cv.height;var c=circ.getContext("2d");
 c.setTransform(dpr,0,0,dpr,0,0);c.fillStyle="#0c5a34";c.fillRect(0,0,W,H);traces(c);
 c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation="destination-in";c.drawImage(base,0,0);c.globalCompositeOperation="source-over";
}
function paint(){
 x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);x.drawImage(base,0,0);
 if(r>.3){x.save();x.beginPath();x.arc(mx*dpr,my*dpr,r*dpr,0,7);x.clip();x.clearRect(0,0,cv.width,cv.height);x.drawImage(circ,0,0);x.restore();
}
}
function tick(){r+=(tr-r)*.3;paint();if(Math.abs(tr-r)>.05){requestAnimationFrame(tick)}else{run=false;r=tr;paint()}}
function go(){if(!run){run=true;requestAnimationFrame(tick)}}
var zone=document.querySelector(".hero")||cv,cx=-1e4,cy=-1e4;
function over(){var b=zone.getBoundingClientRect();return cx>=b.left&&cx<=b.right&&cy>=b.top&&cy<=b.bottom}
function place(){var b=cv.getBoundingClientRect();mx=cx-b.left;my=cy-b.top}
function off(){tr=0;go()}
addEventListener("scroll",function(){if(over()){place();go()}else off()},{passive:true});
document.documentElement.addEventListener("mouseleave",off);addEventListener("blur",off);
zone.addEventListener("pointermove",function(e){cx=e.clientX;cy=e.clientY;place();tr=LENS_D/2;go()});
zone.addEventListener("pointerleave",function(){cx=-1e4;cy=-1e4;off()});
addEventListener("resize",layout);layout();
})();
