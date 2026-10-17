(()=>{(function(n){"use strict";let t=(i,s,r)=>{let a=document.createElement(i);return s&&(a.className=s),r!=null&&(a.innerHTML=r),a};function e(i){let s=typeof i.root=="string"?document.querySelector(i.root):i.root||document.getElementById("menu");if(!s)throw new Error("GameMenu: falta #menu");let r=i.storeKey||(i.id||"juego")+"_menu_opts",a=i.inApp!=null?!!i.inApp:!!window.AndroidKb||/; wv\)/.test(navigator.userAgent)||!!window.Android,o=null;addEventListener("beforeinstallprompt",B=>{B.preventDefault(),o=B});let l={},c=B=>(B||[]).forEach(N=>{N&&(N.sino&&(l[N.sino]=N.def!=null?N.def:!1,N.vol&&(l[N.vol]=N.volDef!=null?N.volDef:1)),N.choice&&(l[N.choice]=N.def!=null?N.def:N.opts[0][0]),N.items&&c(N.items))});c(Array.isArray(i.options)?i.options:[]);for(let B in i.screens||{}){let N=i.screens[B];N&&Array.isArray(N.options)&&c(N.options),Array.isArray(N)&&N.forEach(P=>P&&Array.isArray(P.options)&&c(P.options))}Object.assign(l,i.defaults||{});let h={};try{h=JSON.parse(localStorage.getItem(r)||"{}")||{}}catch{h={}}let d=Object.assign({},l,h),u=()=>{try{localStorage.setItem(r,JSON.stringify(d))}catch{}},f=B=>{if(i.store){let N=i.store.get(B);if(N!==void 0)return N}return d[B]},_=(B,N,P)=>{d[B]=N,i.store&&i.store.set(B,N)!==!1||u(),!P&&i.onOption&&i.onOption(B,N,d)};if(i.theme)for(let B in i.theme)s.style.setProperty(B.startsWith("--")?B:"--m-"+B,i.theme[B]);if(i.fp&&(i.fp.bg&&s.style.setProperty("--fp-bg",i.fp.bg),i.fp.mark&&s.style.setProperty("--fp-mark",i.fp.mark),i.fp.img&&(s.style.setProperty("--fp-img",`url("${i.fp.img}")`),s.classList.add("fpimg"))),i.autoVertical!==!1){let B=()=>document.documentElement.classList.toggle("vertical",innerWidth<innerHeight);addEventListener("resize",B),B()}let S=()=>{try{i.sound&&i.sound(i.sounds&&i.sounds.tap||"tap")}catch{}},m=(B,...N)=>typeof B=="function"?B(...N):B;function p(B,N,P,G,ot){let rt=t("button","mbtn "+(P||""));if(rt.innerHTML=`<span class="fp"></span><span>${B}${N?`<small>${N}</small>`:""}</span>`,ot){let Pt=t("img","mmini");Pt.src=ot,Pt.alt="",rt.prepend(Pt)}return rt.onclick=Pt=>{Pt.stopPropagation(),S(),G&&G()},rt}function w(B,N){let P=t("button","tbtn back",N||i.text&&i.text.back||"\u27F5 Volver");return P.onclick=G=>{G.stopPropagation(),S(),V(B)},P}let L=B=>{let N=t("h2");return N.textContent=B,N};function y(B,N,P){let G=t("button","tbtn"+(N?" sel":""),B);return G.onclick=ot=>{ot.stopPropagation(),S(),P&&P(G)},G}function b(B){let N=t("div","orow");B.id&&(N.id=B.id);let P=t("label");P.textContent=m(B.label);let G=t("button"),ot=i.text&&i.text.yes||"S\xED",rt=i.text&&i.text.no||"No",Pt=()=>{G.className="tbtn"+(f(B.sino)?" sel":""),G.textContent=f(B.sino)?ot:rt};if(G.onclick=Ft=>{Ft.stopPropagation(),_(B.sino,!f(B.sino)),Pt(),S(),B.onChange&&B.onChange(f(B.sino),X)},Pt(),N.append(P,G),B.vol){let Ft=t("input");Ft.type="range",Ft.min="0",Ft.max="100",Ft.value=String(Math.round((f(B.vol)!=null?f(B.vol):1)*100)),Ft.oninput=()=>_(B.vol,+Ft.value/100),Ft.onchange=()=>{S(),B.onVol&&B.onVol(f(B.vol),X)},N.append(Ft)}return N}function M(B){let N=t("div","orow"+(B.wrap?" orow-wrap":""));B.id&&(N.id=B.id);let P=t("label");P.textContent=m(B.label),N.append(P);for(let[G,ot]of m(B.opts)){let rt=t("button","tbtn"+(String(f(B.choice))===String(G)?" sel":""),ot);rt.dataset.v=G,rt.onclick=Pt=>{Pt.stopPropagation(),S(),_(B.choice,G),N.querySelectorAll("button").forEach(Ft=>Ft.classList.toggle("sel",Ft.dataset.v===String(G))),B.onChange&&B.onChange(G,X)},N.append(rt)}return N}function A(B){let N=t("div","orow"),P=t("label");P.textContent=B.label||"\u26F6 Pantalla completa",N.append(P);let G=t("button","tbtn"+(document.fullscreenElement?" sel":""),document.fullscreenElement?"Salir":"Activar");return G.onclick=async ot=>{ot.stopPropagation(),S();try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen({navigationUI:"hide"})}catch{}setTimeout(()=>V(O),300)},a&&(G.disabled=!0,G.textContent="Siempre (app)"),N.append(G),N}function x(B,N){for(let P of B||[])if(P)if(P.sino)N.append(b(P));else if(P.choice)N.append(M(P));else if(P.fullscreen)N.append(A(P));else if(P.field){let G=t("div","orow ofield"),ot=t("label");ot.textContent=m(P.label);let rt=t("input","otext");rt.type="text",rt.maxLength=P.max||24,rt.placeholder=m(P.placeholder)||"",rt.value=f(P.field)||"",rt.onchange=()=>{_(P.field,rt.value.trim()),P.onChange&&P.onChange(rt.value.trim(),X)},rt.onpointerup=Pt=>Pt.stopPropagation(),rt.onkeydown=Pt=>Pt.stopPropagation(),G.append(ot,rt),N.append(G)}else if("block"in P||P.fold){let G=t("div","ocustom"+(P.fold?" ofold":"")+(P.cls?" "+P.cls:""));P.id&&(G.id=P.id);let ot=t("div","olabel");if(ot.textContent=P.block||P.fold,ot.textContent&&G.append(ot),P.fold){let rt="__fold_"+(P.id||P.fold);E[rt]&&G.classList.add("open"),ot.onclick=Pt=>{Pt.stopPropagation(),S(),E[rt]=G.classList.toggle("open")}}if(P.name){let rt=t("div","oname",m(P.name));G.append(rt)}if(x(P.items,G),P.btns){let rt=t("div","orow obtns");for(let Pt of P.btns)rt.append(y(Pt.label,m(Pt.sel),()=>Pt.run(X)));G.append(rt)}P.note&&G.append(t("p","onote",P.note)),P.small&&G.append(t("p","onote small",P.small)),N.append(G)}else if(P.note)N.append(t("p","mtext",m(P.note)));else if(P.fps){let G=t("p","mtext");G.textContent=`Rendimiento actual: ${Math.round(m(P.fps)||0)} fps. ${P.hint||"Si el juego va lento en tu m\xF3vil, elige calidad \xABBaja\xBB."}`,N.append(G)}else P.el?N.append(P.el(X)):C([P],N)}let E={};function C(B,N){for(let P of B||[])if(P)if(P.btn!=null){if(P.install){if(a)continue;N.append(p(P.btn,P.sub,"inst",()=>J()));continue}let G=P.go?()=>V(P.go):P.launch?()=>F(P.launch,P.arg):()=>P.run&&P.run(X),ot=p(m(P.btn),m(P.sub),P.cls,G,P.mini);P.id&&(ot.id=P.id),N.append(ot)}else if(P.h2)N.append(L(m(P.h2)));else if(P.back)N.append(w(P.back,P.label));else if(P.themes){let G=t("div","themes"),ot=P.key||"tema",rt=f(ot)!=null?f(ot):P.def||m(P.themes)[0].id;for(let Pt of m(P.themes))G.append(y(`<span>${Pt.emoji}</span>${Pt.name}`,Pt.id===rt,()=>{_(ot,Pt.id),P.onPick&&P.onPick(Pt,X),V(O)}));N.append(G)}else if(P.row){let G=t("div","mrow");for(let ot of P.row)G.append(ot.back?w(ot.back):y(m(ot.tbtn),m(ot.sel),()=>{ot.run&&ot.run(X)}));N.append(G)}else if(P.monolist){let G=t("div","monolist");for(let ot of m(P.monolist)){let rt=y(`<span>${ot.emoji||""}</span><b></b><small>${ot.sub||""}</small>`,!1,()=>F(ot.launch||P.launch,ot.arg));rt.querySelector("b").textContent=ot.title,G.append(rt)}N.append(G)}else if(P.text){let G=t("div","mtext",m(P.text));N.append(G)}else P.options?x(m(P.options,X),N):P.el&&N.append(P.el(X))}function I(B){let N=m(i.logo,X),P;return N instanceof HTMLElement?P=N.tagName==="IMG"?N.cloneNode():N:(P=t("img"),P.src=N,P.alt=i.name||"",P.draggable=!1),P.className=B,P}let O="title";function V(B="main"){if(O=B,s.classList.remove("hidden"),s.innerHTML="",i.onEnter&&i.onEnter(B,X),B==="title"){let Pt=t("div","title"),Ft=i.title||{},Kt=t("div","tsub");Kt.textContent=Ft.sub!=null?Ft.sub:"El juego";let et=t("div","ttap");et.textContent=Ft.tap||"Toca para empezar";let at=t("div","twrap");at.append(I("tlogo")),Pt.append(at,Kt,et),s.append(Pt);let yt=Dt=>{Dt.stopPropagation&&Dt.stopPropagation(),s.removeEventListener("pointerup",yt),removeEventListener("keydown",yt);try{i.sound&&i.sound(i.sounds&&i.sounds.start||"start")}catch{}i.onTitleTap&&i.onTitleTap(X),V("main")};s.addEventListener("pointerup",yt),addEventListener("keydown",yt);return}let N=t("div","mbox"),P=t("div","logo");P.append(I("mlogo"));let G=t("div","mtag");G.textContent=m(i.tag,X)||"EL JUEGO \xB7 3D",P.append(G);let ot=t("div","col ui"),rt=(i.screens||{})[B];if(rt?typeof rt=="function"?rt(ot,X):Array.isArray(rt)?C(rt,ot):rt.text!=null?(ot.classList.add("text"),ot.append(w(rt.back||"main"),L(m(rt.title)),t("div","mtext",m(rt.text,X)))):(rt.options&&ot.classList.add("opts"),rt.title&&ot.append(L(m(rt.title))),C(rt.items,ot),rt.options&&x(m(rt.options,X),ot),rt.back!==!1&&ot.append(w(rt.back||"main"))):ot.append(L(B),w("main")),N.append(P,ot),s.append(N),i.version){let Pt=t("div","mver");Pt.textContent=i.version,s.append(Pt)}}function F(B,N){H(),i.launch&&i.launch(B,N,X)}function H(){s.classList.add("hidden"),s.innerHTML=""}function J(){let B=t("div","modal ui"),N=matchMedia("(display-mode: standalone), (display-mode: fullscreen)").matches,P=i.install||{};B.innerHTML=`<div class="mcard"><h2>Instalar ${i.name||""}</h2>
        ${N?"<p>\u2705 Ya est\xE1s usando la app instalada.</p>":(o?'<p><button class="mbtn gold" id="instNow">\u{1F4F2} Instalar ahora</button></p>':"")+"<p><b>Android (Chrome):</b> men\xFA \u22EE \u2192 \xABInstalar aplicaci\xF3n\xBB o \xABA\xF1adir a pantalla de inicio\xBB.</p><p><b>iPhone/iPad (Safari):</b> bot\xF3n Compartir \u2192 \xABA\xF1adir a pantalla de inicio\xBB.</p><p><b>PC (Chrome/Edge):</b> icono de instalar \u2295 en la barra de direcciones.</p>"}
        ${P.apk?`<p><a class="mbtn gold" href="${P.apk}" download>\u2B07\uFE0F Descargar APK para Android</a></p><p style="font-size:13px;opacity:.85">El APK se instala en Android permitiendo \xABinstalar apps de origen desconocido\xBB.</p>`:""}
        <button class="tbtn back" id="instClose">Cerrar</button></div>`,s.append(B),B.querySelector("#instClose").onclick=ot=>{ot.stopPropagation(),B.remove()};let G=B.querySelector("#instNow");G&&(G.onclick=async ot=>{ot.stopPropagation(),o.prompt(),await o.userChoice,o=null,B.remove()}),B.onclick=ot=>ot.stopPropagation()}let X={go:V,hide:H,launch:F,opts:d,get:f,set:_,save:u,btn:p,back:w,h2:L,tbtn:y,rowSino:b,rowChoice:M,items:C,optionItems:x,get current(){return O},inApp:a,root:s,cfg:i};return X}n.GameMenu={create:e,version:"1.0"}})(typeof window!="undefined"?window:globalThis);var ei=[];function $e(n){return ei.push(n),n}var Ls={vaquilla:"\u{1F42E} Con vaquilla",fisica:"\u{1F4AA} F\xEDsicas",piscina:"\u{1F3CA} Piscina",yincana:"\u{1F3C3} Yincanas",saber:"\u{1F9E0} Conocimiento",especial:"\u2B50 Especiales"},ne=(n,t)=>n+Math.random()*(t-n);var Et={sky(n,t,e,i="#7ec8ff",s="#d8f1ff"){let r=n.createLinearGradient(0,0,0,e);r.addColorStop(0,i),r.addColorStop(1,s),n.fillStyle=r,n.fillRect(0,0,t,e)},water(n,t,e,i,s,r){let a=n.createLinearGradient(0,e,0,e+s);a.addColorStop(0,"#2ec4e8"),a.addColorStop(1,"#0a6fb0"),n.fillStyle=a,n.fillRect(t,e,i,s),n.strokeStyle="#ffffff66",n.lineWidth=2;for(let o=0;o<4;o++){n.beginPath();for(let l=0;l<=i;l+=20){let c=e+12+o*s/4+Math.sin(l/30+r*2+o)*4;l?n.lineTo(t+l,c):n.moveTo(t+l,c)}n.stroke()}},sand(n,t,e,i,s){let r=n.createLinearGradient(0,e,0,e+s);r.addColorStop(0,"#f2d38a"),r.addColorStop(1,"#d9a85a"),n.fillStyle=r,n.fillRect(t,e,i,s)},person(n,t,e,i,s,r={}){n.save(),n.translate(t,e),n.scale(i,i),r.rot&&n.rotate(r.rot),n.fillStyle="#00000033",n.beginPath(),n.ellipse(0,2,16,5,0,0,7),n.fill(),n.strokeStyle="#333",n.lineWidth=5,n.lineCap="round";let a=r.run?Math.sin(r.run)*9:0;n.beginPath(),n.moveTo(-5,-22),n.lineTo(-7-a,0),n.moveTo(5,-22),n.lineTo(7+a,0),n.stroke(),n.fillStyle=s,n.beginPath(),n.roundRect(-11,-50,22,30,6),n.fill(),n.strokeStyle="#f1c6a0",n.beginPath(),n.moveTo(-10,-45),n.lineTo(-18,r.armsUp?-66:-28+a),n.moveTo(10,-45),n.lineTo(18,r.armsUp?-66:-28-a),n.stroke(),n.fillStyle="#f1c6a0",n.beginPath(),n.arc(0,-60,10,0,7),n.fill(),n.fillStyle=s,n.beginPath(),n.arc(0,-63,10.5,Math.PI,0),n.fill(),n.restore()},vaca(n,t,e,i,s=0,r=1,a=!1){n.save(),n.translate(t,e),n.scale(i*r,i),n.fillStyle="#00000033",n.beginPath(),n.ellipse(0,4,34,7,0,0,7),n.fill();let o=Math.sin(s*14)*6;n.strokeStyle="#3b2412",n.lineWidth=6,n.lineCap="round",n.beginPath(),n.moveTo(-20,-10),n.lineTo(-22+o,2),n.moveTo(-8,-10),n.lineTo(-6-o,2),n.moveTo(12,-10),n.lineTo(10+o,2),n.moveTo(22,-10),n.lineTo(24-o,2),n.stroke(),n.fillStyle=a?"#f6c431":"#7a4a22",n.beginPath(),n.ellipse(0,-22,30,15,0,0,7),n.fill(),n.fillStyle=a?"#fff1a8":"#f4ede2",n.beginPath(),n.ellipse(-8,-24,9,6,.4,0,7),n.fill(),n.fillStyle=a?"#f6c431":"#7a4a22",n.beginPath(),n.ellipse(32,-32,12,10,.3,0,7),n.fill(),n.fillStyle="#f2b8a8",n.beginPath(),n.ellipse(41,-28,6,5,0,0,7),n.fill(),n.strokeStyle="#f4ede2",n.lineWidth=4,n.beginPath(),n.moveTo(28,-40),n.quadraticCurveTo(24,-52,30,-54),n.moveTo(36,-40),n.quadraticCurveTo(40,-52,34,-55),n.stroke(),n.fillStyle="#111",n.beginPath(),n.arc(35,-35,2.2,0,7),n.fill(),n.strokeStyle=a?"#f6c431":"#7a4a22",n.lineWidth=3,n.beginPath(),n.moveTo(-30,-24),n.quadraticCurveTo(-42,-20+o,-40,-8),n.stroke(),n.restore()},text(n,t,e,i,s=28,r="#fff",a="center"){n.font=`900 ${s}px Arial, Roboto, sans-serif`,n.textAlign=a,n.textBaseline="middle",n.lineWidth=Math.max(3,s/7),n.strokeStyle="#000a",n.strokeText(t,e,i),n.fillStyle=r,n.fillText(t,e,i)},btn(n,t,e,i,s,r,a="#ffd21a",o=!1){n.fillStyle=o?"#fff":a,n.strokeStyle="#fff",n.lineWidth=3,n.beginPath(),n.roundRect(t,e,i,s,s/2),n.fill(),n.stroke(),Et.text(n,r,t+i/2,e+s/2,Math.min(26,s*.45),"#3a1a00")}};function Hr(n,t){return new Promise(e=>{let i=document.getElementById("mg"),s=i.getContext("2d");i.classList.remove("hidden");let r=Math.min(devicePixelRatio||1,t.lowres?1:1.5),a=0,o=0,l=()=>{a=innerWidth,o=innerHeight,i.width=a*r,i.height=o*r,s.setTransform(r,0,0,r,0,0)};l(),addEventListener("resize",l);let c=t.fast?6:1,h={c:s,get W(){return a},get H(){return o},t:0,dt:0,opts:t,def:n,col:t.color||"#1f6fe0",rcol:t.rivalColor||"#ffd21a",level:t.level||"normal",vaca:!!t.vaca,bot:!!t.bot,ended:!1,score:0,timeLeft:n.dur||0,taps:[],down:!1,px:0,py:0,onTap:null,onRelease:null,onDown:null,swipe:null,hud(x){if(s.fillStyle="#000a",s.fillRect(0,0,a,44),Et.text(s,n.name,a/2,22,20,"#ffd21a"),n.dur){let E=Math.ceil(Math.max(0,h.timeLeft));s.fillStyle="#1f4fc8",s.beginPath(),s.roundRect(8,50,118,38,19),s.fill(),s.strokeStyle="#ffd21a",s.lineWidth=3,s.stroke(),Et.text(s,"\u{1F552} "+String(Math.floor(E/60)).padStart(2,"0")+":"+String(E%60).padStart(2,"0"),67,69,20,E<6?"#ff6b5b":"#fff")}Et.text(s,`${x!=null?x:h.score} ${n.unit||""} \xB7 Rival: ${t.rivalScore} `,a-170,22,18,"#fff","right")},end(x){h.ended||(h.ended=!0,h.score=x!=null?x:h.score,setTimeout(A,t.fast?150:1300))}},d={on:!1,x:0,t0:0,next:ne(4,8)},u=x=>{let E=i.getBoundingClientRect();return[x.clientX-E.left,x.clientY-E.top]},f=0,_=0,S=x=>{x.preventDefault(),[h.px,h.py]=u(x),f=h.px,_=h.py,h.down=!0,h.onDown&&h.onDown(h.px,h.py)},m=x=>{[h.px,h.py]=u(x),h.onMove&&h.onMove(h.px,h.py)},p=x=>{let[E,C]=u(x);h.down=!1;let I=E-f,O=C-_;Math.hypot(I,O)>40&&h.swipe?h.swipe(Math.abs(I)>Math.abs(O)?I>0?"r":"l":O>0?"d":"u",I,O):h.onTap&&h.onTap(E,C),h.onRelease&&h.onRelease(E,C)};i.addEventListener("pointerdown",S),i.addEventListener("pointermove",m),i.addEventListener("pointerup",p);let w=0,L=performance.now(),y=t.fast?.2:2.2;function b(x){w=requestAnimationFrame(b);let E=Math.min(.05,(x-L)/1e3)*c;if(L=x,y>0){y-=E,M();return}h.dt=E,h.t+=E,n.dur&&!h.ended&&(h.timeLeft-=E,h.timeLeft<=0&&(h.timeLeft=0,h.end())),h.vaca&&!h.ended&&(d.next-=E,!d.on&&d.next<=0&&(d.on=!0,d.x=-80),d.on&&(d.x+=E*a*.45,Math.abs(d.x-a/2)<8&&h.bump&&h.bump(),d.x>a+80&&(d.on=!1,d.next=ne(5,9)))),h.bot&&!h.ended&&n.bot&&n.bot(h),n.frame(h),d.on&&(Et.vaca(s,d.x,o*.62,1.6,h.t,1,t.etapa&&t.etapa.vaquilla==="botarga"&&t.dorada),Et.text(s,"\xA1LA VAQUILLA!",d.x,o*.62-110,24,"#ffd21a")),h.ended&&(s.fillStyle="#0008",s.fillRect(0,o/2-50,a,100),Et.text(s,`${h.score} ${n.unit||""}`,a/2,o/2-12,40,"#ffd21a"),Et.text(s,h.score>t.rivalScore?"\xA1Ganas la prueba!":h.score===t.rivalScore?"\xA1Empate!":"Gana el rival",a/2,o/2+28,24))}function M(){Et.sky(s,a,o,"#0a2a6a","#1f6fe0"),Et.text(s,Ls[n.cat]||"",a/2,o*.22,22,"#9fd0ff"),Et.text(s,n.name,a/2,o*.36,Math.min(56,a/12),"#ffd21a"),Et.text(s,n.how,a/2,o*.52,Math.min(22,a/34)),Et.text(s,`Rival: ${t.rivalScore} ${n.unit||""} \u2014 \xA1sup\xE9ralo!`,a/2,o*.66,22,"#fff"),h.vaca&&Et.text(s,"\u{1F42E} \xA1El rival te ha soltado la vaquilla!",a/2,o*.78,22,"#ff9b6b")}function A(){cancelAnimationFrame(w),removeEventListener("resize",l),i.removeEventListener("pointerdown",S),i.removeEventListener("pointermove",m),i.removeEventListener("pointerup",p),i.classList.add("hidden"),e({you:h.score,rival:t.rivalScore})}n.start(h),w=requestAnimationFrame(b)})}var tn={facil:.7,normal:1,dificil:1.25};var qc=[["\xBFCu\xE1ntas patas tiene una ara\xF1a?",["Seis","Ocho","Diez"],1],["\xBFQu\xE9 r\xEDo pasa por Sevilla?",["Ebro","Tajo","Guadalquivir"],2],["\xBFCu\xE1l es la capital de Portugal?",["Oporto","Lisboa","Co\xEDmbra"],1],["\xBFQu\xE9 planeta es el m\xE1s grande del sistema solar?",["J\xFApiter","Saturno","Marte"],0],["\xBFEn qu\xE9 estaci\xF3n caen las hojas?",["Primavera","Oto\xF1o","Verano"],1],["\xBFCu\xE1ntos minutos tiene una hora?",["60","100","30"],0],["\xBFDe qu\xE9 color es la clorofila?",["Roja","Azul","Verde"],2],["\xBFQu\xE9 animal es el m\xE1s r\xE1pido en tierra?",["Guepardo","Le\xF3n","Caballo"],0],["\xBFQu\xE9 se celebra el 6 de enero en Espa\xF1a?",["San Juan","Reyes","Navidad"],1],["\xBFCu\xE1l es el oc\xE9ano m\xE1s grande?",["Atl\xE1ntico","\xCDndico","Pac\xEDfico"],2],["\xBFQu\xE9 instrumento tiene teclas blancas y negras?",["Piano","Viol\xEDn","Trompeta"],0],["\xBFCu\xE1ntos lados tiene un hex\xE1gono?",["Cinco","Seis","Ocho"],1],["\xBFDe qu\xE9 fruta se hace el gazpacho principalmente?",["Tomate","Mel\xF3n","Manzana"],0],["\xBFQu\xE9 gas respiramos para vivir?",["Helio","Ox\xEDgeno","Nitr\xF3geno"],1],["\xBFEn qu\xE9 continente est\xE1 Egipto?",["Asia","Europa","\xC1frica"],2],["\xBFQu\xE9 ave no puede volar?",["Ping\xFCino","Gaviota","Paloma"],0],["\xBFCu\xE1ntos jugadores tiene un equipo de f\xFAtbol en el campo?",["Nueve","Once","Doce"],1],["\xBFCu\xE1l es la comunidad con m\xE1s islas?",["Galicia","Canarias","Murcia"],1],["\xBFQu\xE9 mes tiene 28 o 29 d\xEDas?",["Febrero","Abril","Junio"],0],["\xBFQu\xE9 metal es l\xEDquido a temperatura ambiente?",["Hierro","Mercurio","Cobre"],1]],Yc=[["Botijo",["Vasija de barro que enfr\xEDa el agua","Zapato de esparto","Sombrero de paja"],0],["Alf\xE9izar",["Tipo de pan","Parte baja de la ventana","Baile andaluz"],1],["Zascandil",["Persona inquieta y enredadora","Tipo de pez","Herramienta de campo"],0],["Ababol",["Juguete de madera","Amapola","Postre de leche"],1],["Ga\xF1\xE1n",["Mozo de labranza","P\xE1jaro cantor","Tela fina"],0],["Sobremesa",["Mantel grande","Tiempo tras la comida charlando","Mueble de cocina"],1],["Cachivache",["Trasto in\xFAtil","Cr\xEDa de vaca","Guiso de patata"],0],["Morri\xF1a",["Nostalgia de la tierra","Lluvia fina","Queso curado"],0],["Chisc\xF3n",["Habitaci\xF3n muy peque\xF1a","Charco grande","Pan dulce"],0],["Birlar",["Cantar en voz baja","Quitar algo con disimulo","Saltar a la pata coja"],1],["Tarambana",["Persona alocada","Instrumento de cuerda","Fruta tropical"],0],["Pelele",["Mu\xF1eco de paja","Piedra pulida","Cesta de mimbre"],0]];var Ne=n=>Math.round(n);$e({id:"pichichi",name:"La vaca pichichi",cat:"vaquilla",unit:"goles",dur:0,how:"Toca para chutar cuando la flecha apunte al hueco. \xA1La vaquilla es la portera! 6 tiros.",ai:n=>Ne(ne(1.5,3.8)*tn[n]),start(n){n.s={shots:6,ang:0,ball:null,keeper:0,msg:""},n.onTap=()=>{let t=n.s;t.ball||n.ended||!t.shots||(t.ball={t:0,tx:Math.sin(t.ang)},t.shots--)}},bot(n){!n.s.ball&&Math.abs(Math.sin(n.s.ang)- -Math.sin(n.t*1.3)*.5)>.6&&Math.random()<.08&&n.onTap()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),t.fillStyle="#4caf50",t.fillRect(0,i*.5,e,i*.5);let r=e/2,a=i*.42,o=e*.5,l=i*.22;t.strokeStyle="#fff",t.lineWidth=8,t.strokeRect(r-o/2,a-l,o,l),t.fillStyle="#ffffff22",t.fillRect(r-o/2,a-l,o,l),s.keeper=Math.sin(n.t*1.3*(n.level==="dificil"?1.5:1))*.5,Et.vaca(t,r+s.keeper*o*.8,a,1.5,n.t,s.keeper>0?-1:1),s.ang=Math.sin(n.t*2.2)*.75;let c=r,h=i*.88;s.ball||(t.strokeStyle="#ffd21a",t.lineWidth=6,t.beginPath(),t.moveTo(c,h),t.lineTo(c+Math.sin(s.ang)*o*.7,h-i*.3),t.stroke());let d=c,u=h;if(s.ball){s.ball.t+=n.dt*1.8;let f=Math.min(1,s.ball.t);if(d=c+s.ball.tx*o*.66*f,u=h-(h-(a-l/2))*f,f>=1&&!s.ball.done){s.ball.done=1;let _=s.ball.tx*.66/.5*.5,S=Math.abs(s.ball.tx*.66-s.keeper*.8*1)<.22,m=Math.abs(s.ball.tx)>.74;s.msg=m?"\xA1Fuera!":S?"\xA1Para la vaquilla!":"\xA1GOOOL!",!m&&!S&&n.score++,setTimeout(()=>{s.ball=null,s.msg="",s.shots||n.end()},700)}}Et.person(t,c-30,h+20,1.3,n.col),t.fillStyle="#fff",t.beginPath(),t.arc(d,u,12,0,7),t.fill(),t.strokeStyle="#000",t.lineWidth=2,t.stroke(),s.msg&&Et.text(t,s.msg,e/2,i*.55,44,"#ffd21a"),n.hud(),Et.text(t,"Tiros: "+s.shots,12,104,18,"#fff","left")}});$e({id:"regadores",name:"Los regadores",cat:"vaquilla",unit:"litros",dur:35,how:"Mant\xE9n pulsado para correr con el cubo hasta la tinaja. \xA1Suelta cuando la vaquilla mire!",ai:n=>Ne(ne(14,26)*tn[n]),start(n){n.s={x:0,dir:1,water:10,look:!1,lt:ne(2,4),hit:0}},bot(n){n.down=!n.s.look&&!(n.s.lt<.35)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),Et.sand(t,0,i*.55,e,i*.45),s.lt-=n.dt,s.lt<=0&&(s.look=!s.look,s.lt=s.look?ne(1,2):ne(1.5,3.5));let r=n.down&&!n.ended&&s.hit<=0;s.hit>0&&(s.hit-=n.dt),r&&(s.x+=s.dir*n.dt*.32,s.look&&(s.hit=1.2,s.water=Math.max(0,s.water-5))),s.x>=1&&(s.x=1,s.dir=-1,n.score+=s.water,s.water=0),s.x<=0&&s.dir<0&&(s.x=0,s.dir=1,s.water=10);let a=e*.1,o=e*.85,l=a+(o-a)*s.x,c=i*.82;t.fillStyle="#2b88d8",t.fillRect(a-50,c-40,40,40),Et.text(t,"POZO",a-30,c-50,14),t.fillStyle="#8a5a2a",t.fillRect(o+10,c-70,50,70),t.fillStyle="#2ec4e8";let h=Math.min(1,n.score/40);t.fillRect(o+14,c-4-62*h,42,62*h),Et.text(t,"TINAJA",o+35,c-82,14),Et.vaca(t,e*.5,i*.58,1.4,s.look?n.t:0,s.look?1:-1),Et.text(t,s.look?"\u{1F440} \xA1QUIETO!":"Corre\u2026",e*.5,i*.4,26,s.look?"#ff5b4b":"#fff"),Et.person(t,l,c,1.4,n.col,{run:r?n.t*14:0,rot:s.hit>0?1.2:0}),t.fillStyle="#9aa",t.fillRect(l+14,c-50,16,18),t.fillStyle="#2ec4e8",t.fillRect(l+15,c-49+17*(1-s.water/10),14,17*s.water/10),Et.btn(t,e-190,i-80,170,60,n.down?"CORRIENDO":"MANT\xC9N","#ffd21a",n.down),n.hud()}});$e({id:"huevos",name:"Huevos fritos",cat:"vaquilla",unit:"huevos",dur:30,how:"Desliza o toca a izquierda/derecha para cambiar de carril. Coge huevos y esquiva a la vaquilla.",ai:n=>Ne(ne(8,15)*tn[n]),start(n){n.s={lane:1,items:[],next:0,hit:0};let t=e=>{n.s.lane=Math.max(0,Math.min(2,n.s.lane+e))};n.onTap=e=>t(e<n.W/2?-1:1),n.swipe=e=>t(e==="l"?-1:e==="r"?1:0)},bot(n){let t=n.s;t.items.find(i=>i.y>.55&&i.y<.8&&i.lane===t.lane&&i.vaca)&&Math.random()<.2&&n.onTap(t.lane===0?n.W:t.lane===2||Math.random()<.5?0:n.W)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),Et.sand(t,0,i*.3,e,i*.7);let r=(o,l)=>e/2+(o-1)*e*(.12+.18*l),a=o=>i*.3+o*i*.7;t.strokeStyle="#fff8",t.lineWidth=3;for(let o of[.5,1.5])t.beginPath(),t.moveTo(r(o,0),a(0)),t.lineTo(r(o,1),a(1)),t.stroke();s.next-=n.dt,s.next<=0&&!n.ended&&(s.next=ne(.45,.9),s.items.push({lane:Ne(ne(-.49,2.49)),y:0,vaca:Math.random()<.38})),s.hit>0&&(s.hit-=n.dt);for(let o of s.items){o.y+=n.dt*(.45+n.t*.01),!o.done&&o.y>.82&&o.y<.95&&o.lane===s.lane&&(o.done=1,o.vaca?(s.hit=1,n.score=Math.max(0,n.score-2)):n.score++);let l=.4+o.y;o.done&&!o.vaca||(o.vaca?Et.vaca(t,r(o.lane,o.y),a(o.y),l,n.t):(t.fillStyle="#fff",t.beginPath(),t.ellipse(r(o.lane,o.y),a(o.y)-10*l,14*l,18*l,0,0,7),t.fill(),t.strokeStyle="#ccc",t.stroke()))}s.items=s.items.filter(o=>o.y<1.1),Et.person(t,r(s.lane,.9),a(.9),1.5,n.col,{run:n.t*12,rot:s.hit>0?Math.sin(n.t*30)*.5:0}),t.fillStyle="#333",t.beginPath(),t.ellipse(r(s.lane,.9)+26,a(.9)-60,18,6,0,0,7),t.fill(),n.hud()}});$e({id:"rampa",name:"La rampa",cat:"fisica",unit:"subidas",dur:30,how:"Toca muy r\xE1pido para subir la rampa enjabonada y tocar la campana. \xA1Si paras, resbalas!",ai:n=>Ne(ne(3,6)*tn[n]),start(n){n.s={y:0,v:0,ring:0},n.onTap=()=>{n.ended||(n.s.v+=.065)},n.onDown=n.onTap,n.onTap=null},bot(n){Math.random()<.42&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),s.v-=n.dt*.55,s.v*=.96,s.y=Math.max(0,s.y+s.v*n.dt*10),s.y===0&&(s.v=Math.max(0,s.v)),s.y>=1&&(n.score++,s.y=0,s.v=0,s.ring=1),s.ring>0&&(s.ring-=n.dt);let r=e*.15,a=i*.9,o=e*.8,l=i*.25;t.fillStyle="#e8f6ff",t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.lineTo(o,a),t.fill(),t.strokeStyle="#3aa0ff",t.lineWidth=6,t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.stroke();for(let c=0;c<12;c++)t.fillStyle="#ffffffaa",t.beginPath(),t.arc(r+(o-r)*((c*.083+n.t*.02)%1),a+(l-a)*((c*.083+n.t*.02)%1)-8,5+c%3*2,0,7),t.fill();t.fillStyle="#ffd21a",t.beginPath(),t.arc(o+20,l-30,18+(s.ring>0?Math.sin(n.t*50)*4:0),0,7),t.fill(),Et.person(t,r+(o-r)*s.y,a+(l-a)*s.y,1.3,n.col,{run:s.v>.02?n.t*18:0,rot:-.6}),s.ring>0&&Et.text(t,"\u{1F514} \xA1DING!",e/2,i*.2,40,"#ffd21a"),Et.text(t,"\u{1F446} \xA1TOCA R\xC1PIDO!",e*.3,i*.3,26),n.hud()}});$e({id:"rompepuertas",name:"Rompepuertas",cat:"fisica",unit:"paredes",dur:30,how:"Elige una puerta: dos son de papel y una es de verdad. \xA1Atraviesa todas las paredes que puedas!",ai:n=>Ne(ne(5,9)*tn[n]),start(n){let t=n.s={solid:Ne(ne(-.49,2.49)),anim:0,pick:-1,bad:0};n.onTap=(e,i)=>{if(t.anim>0||n.ended)return;let s=Math.floor(e/(n.W/3));t.pick=s,t.anim=.6,t.bad=s===t.solid}},bot(n){n.s.anim<=0&&Math.random()<.05&&n.onTap(ne(0,n.W),200)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i,"#ffb36b","#ffe3b8"),t.fillStyle="#c8a070",t.fillRect(0,i*.8,e,i*.2),s.anim>0&&(s.anim-=n.dt,s.anim<=0&&(s.bad||n.score++,s.solid=Ne(ne(-.49,2.49)),s.pick=-1));for(let r=0;r<3;r++){let a=e/6+r*e/3,o=e/4.2,l=i*.55,c=i*.8-l,h=s.pick===r&&!s.bad&&s.anim>0,d=s.pick>=0&&s.anim>0;t.fillStyle=d&&r===s.solid?"#7a4a22":["#ff6b6b","#6bc5ff","#8ee86b"][r],h?(t.strokeStyle="#fff",t.setLineDash([8,8]),t.strokeRect(a-o/2,c,o,l),t.setLineDash([])):(t.fillRect(a-o/2,c,o,l),t.strokeStyle="#fff",t.lineWidth=4,t.strokeRect(a-o/2,c,o,l)),Et.text(t,["A","B","C"][r],a,c+l/2,48)}if(s.pick>=0){let r=e/6+s.pick*e/3,a=1-Math.max(0,s.anim)/.6;Et.person(t,r,i*.95-a*30,1.6+a*.4,n.col,{rot:s.bad&&a>.5?-1.4:0,armsUp:!s.bad}),s.bad&&a>.5&&Et.text(t,"\xA1PUM! \xA1Era de madera!",e/2,i*.25,30,"#ff5b4b"),!s.bad&&a>.3&&Et.text(t,"\xA1CRASH!",e/2,i*.25,40,"#ffd21a")}n.hud()}});function vd(n,t,e,i,s,r){n.save(),n.translate(t,e),n.rotate(s?1.35:Math.sin(r*3+t)*.05),n.scale(i,i),n.fillStyle="#00000033",n.beginPath(),n.ellipse(0,2,22,6,0,0,7),n.fill(),n.fillStyle="#fff",n.beginPath(),n.moveTo(-20,0),n.bezierCurveTo(-28,-40,-10,-60,-12,-80),n.bezierCurveTo(-16,-100,-10,-118,0,-120),n.bezierCurveTo(10,-118,16,-100,12,-80),n.bezierCurveTo(10,-60,28,-40,20,0),n.closePath(),n.fill(),n.save(),n.clip(),n.fillStyle="#ffd21a",n.fillRect(-30,-130,18,140),n.fillRect(12,-130,18,140),n.fillStyle="#fff",n.fillRect(-30,-86,60,8),n.restore(),n.fillStyle="#f1c6a0",n.beginPath(),n.arc(0,-98,7,0,7),n.fill(),n.restore()}function Zc(n,t,e,i,s){let r=["#fff","#ffd21a","#fff","#3a9aff","#fff","#ff5a3a"];for(let a=0;a<6;a++)n.fillStyle=r[a],n.beginPath(),n.moveTo(t,e),n.arc(t,e,i,s+a*Math.PI/3,s+(a+1)*Math.PI/3),n.fill();n.strokeStyle="#0003",n.lineWidth=2,n.beginPath(),n.arc(t,e,i,0,7),n.stroke()}function $c(n,t,e){let i=n.createLinearGradient(0,0,t,0);i.addColorStop(0,"#ff5ab4"),i.addColorStop(.5,"#8fd0ff"),i.addColorStop(1,"#ff5ab4"),n.fillStyle=i,n.fillRect(0,0,t,e*.55);let s=["#f6c43a","#f08a3a","#9a6ad8","#f27ab0","#c7a6f0"];for(let a=0;a<7;a++){let o=a*t/6-30,l=t/8,c=e*(.28+a%3*.05);n.fillStyle=s[a%5],n.fillRect(o,e*.55-c,l,c),n.fillStyle="#a8402a",n.beginPath(),n.moveTo(o-8,e*.55-c),n.lineTo(o+l/2,e*.55-c-30),n.lineTo(o+l+8,e*.55-c),n.fill(),n.fillStyle="#3a6ad8";for(let h=0;h<2;h++)for(let d=0;d<2;d++)n.fillRect(o+10+d*l/2,e*.55-c+14+h*44,l/2-20,30)}let r=n.createLinearGradient(0,e*.55,0,e);r.addColorStop(0,"#8ad8f4"),r.addColorStop(1,"#c8f2ff"),n.fillStyle=r,n.fillRect(0,e*.55,t,e*.45),n.fillStyle="#4fe0e8",n.fillRect(0,e*.55,t,6)}$e({id:"bolera",name:"Los superbolos",cat:"fisica",unit:"bolos",dur:30,how:"Empuja el bal\xF3n gigante colgado de la cuerda: toca cuando vuelva a tus manos para que salga hacia los bolos. \xA1Tira todos los que puedas!",ai:n=>Ne(ne(6,11)*tn[n]),start(n){let t=n.s={a:-1,va:0,held:!0,pins:[0,1,2,3,4].map(e=>({x:.58+e*.085,dn:0}))};n.onDown=()=>{t.held&&!n.ended&&(t.held=!1,t.va=2.6+Math.random()*.3)}},bot(n){n.s.held&&Math.random()<.05&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;$c(t,e,i),t.fillStyle="#2a5ad8",t.fillRect(e*.5,i*.78,e*.48,i*.1),t.fillStyle="#e2321e",t.fillRect(e*.54,i*.72,e*.44,i*.07);let r=e*.45,a=0,o=i*.78;s.held||(s.va+=-Math.sin(s.a)*3.2*n.dt,s.a+=s.va*n.dt,s.a<-.95&&s.va<0&&(s.held=!0,s.a=-1,s.va=0));let l=r+Math.sin(s.a)*o,c=a+Math.cos(s.a)*o,h=Math.min(e,i)*.07;s.pins.forEach(d=>{d.dn>0?d.dn-=n.dt:!s.held&&Math.abs(l-d.x*e)<h+12&&c>i*.55&&(d.dn=2.2,n.score++),vd(t,d.x*e,i*.74,Math.min(1,i/520),d.dn>0,n.t)}),t.strokeStyle="#ddd",t.lineWidth=2,t.beginPath(),t.moveTo(r,a),t.lineTo(l,c),t.stroke(),Zc(t,l,c,h,s.a*3),Et.person(t,r+Math.sin(-1)*o-10,i*.9,1.4,n.col,{armsUp:s.held}),s.held&&Et.text(t,"\u{1F446} \xA1EMPUJA!",e*.2,i*.35,28,"#ffd21a"),n.hud()}});$e({id:"pinguipato",name:"Tiro al ping\xFCi-pato",cat:"fisica",unit:"puntos",dur:30,how:"Patos y ping\xFCinos desfilan bajo el toldo. Toca uno para lanzarle el bal\xF3n de la cuerda. Pato 1 punto, ping\xFCino 2. \xA1Al \xE1rbitro no!",ai:n=>Ne(ne(9,16)*tn[n]),start(n){let t=n.s={list:[],next:0,shot:null};n.onDown=e=>{t.shot||n.ended||(t.shot={tx:e,t:0})}},bot(n){let t=n.s.list.find(e=>!e.hit&&!e.ref&&e.x>.25&&e.x<.75);t&&!n.s.shot&&Math.random()<.08&&n.onDown(t.x*n.W+t.v*n.W*.45)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;$c(t,e,i);for(let h=0;h<12;h++)t.fillStyle=h%2?"#fff":"#e2321e",t.beginPath(),t.moveTo(h*e/12,0),t.lineTo((h+1)*e/12,0),t.lineTo((h+1)*e/12,i*.12),t.lineTo(h*e/12,i*.12),t.fill();if(s.next-=n.dt,s.next<=0&&!n.ended){s.next=ne(.7,1.3);let h=Math.random();s.list.push({x:-.06,v:ne(.14,.24),kind:h<.12?"ref":h<.45?"pen":"pato",hit:0})}let r=i*.82;for(let h of s.list){h.x+=h.v*n.dt;let d=h.x*e,u=Math.min(1.2,i/450);if(t.save(),t.translate(d,r),h.hit&&t.rotate(Math.min(1.4,h.hit*4)),t.scale(u,u),h.kind==="ref"){t.restore(),Et.person(t,d,r,1.3*u,"#111"),Et.text(t,"\xC1RBITRO",d,r-100*u,13);continue}let f=h.kind==="pen"?"#222":"#ffd21a";t.fillStyle=f,t.beginPath(),t.ellipse(0,-40,26,40,0,0,7),t.fill(),t.beginPath(),t.arc(0,-92,18,0,7),t.fill(),h.kind==="pen"&&(t.fillStyle="#fff",t.beginPath(),t.ellipse(0,-36,15,28,0,0,7),t.fill()),t.fillStyle="#ff8a1a",t.beginPath(),t.moveTo(10,-94),t.lineTo(30,-88),t.lineTo(10,-84),t.fill(),t.fillRect(-14,-4,10,5),t.fillRect(4,-4,10,5),t.fillStyle="#111",t.beginPath(),t.arc(6,-98,3,0,7),t.fill(),t.restore(),h.hit&&(h.hit+=n.dt)}s.list=s.list.filter(h=>h.x<1.1);let a=e/2,o=r-60,l=a,c=o*.35;if(s.shot){s.shot.t+=n.dt*2;let h=Math.min(1,s.shot.t);if(l=a+(s.shot.tx-a)*h,c=o*.35+(r-60-o*.35)*Math.sin(h*Math.PI/2),h>=1&&!s.shot.done){s.shot.done=1;let d=s.list.find(u=>!u.hit&&Math.abs(u.x*e-l)<40);d&&(d.hit=.01,n.score=Math.max(0,n.score+(d.kind==="ref"?-3:d.kind==="pen"?2:1))),setTimeout(()=>{s.shot=null},350)}}t.strokeStyle="#ddd",t.lineWidth=2,t.beginPath(),t.moveTo(a,i*.12),t.lineTo(l,c),t.stroke(),Zc(t,l,c,26,n.t*4),n.hud()}});$e({id:"troncos",name:"Los troncos locos",cat:"piscina",unit:"metros",dur:30,how:"Cruza la piscina sobre el tronco que gira. Toca a izquierda o derecha para no caerte al agua.",ai:n=>Ne(ne(14,24)*tn[n]),start(n){n.s={tilt:0,vt:0,x:0,fall:0},n.onDown=t=>{n.s.vt+=(t<n.W/2?-1:1)*.5}},bot(n){Math.random()<.25&&n.onDown(n.s.tilt>0?0:n.W)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),Et.water(t,0,i*.6,e,i*.4,n.t),s.fall>0?(s.fall-=n.dt,s.fall<=0&&(s.tilt=0,s.vt=0)):n.ended||(s.vt+=(Math.sin(n.t*1.7)*.9+Math.sin(n.t*3.1)*.5+s.tilt*2.4)*n.dt*(1+n.t/40),s.vt*=.97,s.tilt+=s.vt*n.dt,Math.abs(s.tilt)>1?(s.fall=1.5,n.score=Math.max(0,n.score-2)):s.x+=n.dt*.9,n.score=Math.max(n.score,Ne(s.x)));let r=i*.6;t.fillStyle="#8a5a2a",t.beginPath(),t.roundRect(-20,r-22,e+40,34,17),t.fill(),t.strokeStyle="#5a3a1a",t.lineWidth=3;for(let a=0;a<e;a+=40){let o=(a-n.t*120)%e+(a-n.t*120<0?e:0);t.beginPath(),t.moveTo(o,r-20),t.lineTo(o+10,r+10),t.stroke()}if(s.fall>0){Et.text(t,"\xA1AL AGUA! \u{1F4A6}",e/2,i*.35,40,"#fff"),t.fillStyle="#fff";for(let a=0;a<8;a++)t.beginPath(),t.arc(e/2+ne(-60,60),r+30+ne(-10,10),ne(4,10),0,7),t.fill()}else Et.person(t,e/2,r-20,1.6,n.col,{rot:s.tilt*.9,armsUp:!0});t.fillStyle="#0006",t.fillRect(e/2-100,i-40,200,14),t.fillStyle=Math.abs(s.tilt)>.7?"#ff5b4b":"#8eff8e",t.fillRect(e/2+s.tilt*100-6,i-44,12,22),Et.text(t,"\u25C0",40,i*.5,50),Et.text(t,"\u25B6",e-40,i*.5,50),n.hud()}});$e({id:"salta",name:"\xA1Salta!",cat:"piscina",unit:"saltos",dur:30,how:"Una barra gigante gira sobre la piscina. Toca para saltar justo cuando llegue a tus pies.",ai:n=>Ne(ne(9,16)*tn[n]),start(n){n.s={a:0,jump:0,fall:0,sp:1.6},n.onDown=()=>{n.s.jump<=0&&n.s.fall<=0&&(n.s.jump=.7)}},bot(n){(n.s.a%(Math.PI*2)+Math.PI*2)%(Math.PI*2)>Math.PI*2-.55&&Math.random()<.5&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),Et.water(t,0,i*.7,e,i*.3,n.t);let r=e/2,a=i*.62,o=Math.min(e*.4,i*.5);t.fillStyle="#ddd",t.beginPath(),t.ellipse(r,a,o,o*.3,0,0,7),t.fill(),t.fillStyle="#e23a2a",t.beginPath(),t.arc(r,a,16,0,7),t.fill();let l=s.a;n.ended||(s.sp=1.6+n.t*.05,s.a+=n.dt*s.sp);let c=Math.PI/2;Math.floor((l-c)/(Math.PI*2))!==Math.floor((s.a-c)/(Math.PI*2))&&s.fall<=0&&!n.ended&&(s.jump>.12&&s.jump<.62?n.score++:s.fall=1.3),s.jump>0&&(s.jump-=n.dt),s.fall>0&&(s.fall-=n.dt);let d=r+Math.cos(s.a)*o,u=a+Math.sin(s.a)*o*.3,f=a+o*.3-Math.max(0,Math.sin(Math.max(0,s.jump)/.7*Math.PI))*80,_=Math.sin(s.a)<0,S=()=>{t.strokeStyle="#ff9b1a",t.lineWidth=14,t.lineCap="round",t.beginPath(),t.moveTo(r,a),t.lineTo(d,u),t.stroke(),t.fillStyle="#ffd21a",t.beginPath(),t.arc(d,u,16,0,7),t.fill()};_&&S(),s.fall>0?Et.text(t,"\xA1PLAF! \u{1F4A6}",r,a+o*.3,36,"#fff"):Et.person(t,r,f,1.4,n.col,{armsUp:s.jump>0}),_||S(),n.hud()}});$e({id:"cocos",name:"Los recoge-cocos",cat:"piscina",unit:"cocos",dur:30,how:"Arrastra la barca por la piscina y recoge los cocos que caen de la palmera.",ai:n=>Ne(ne(10,18)*tn[n]),start(n){n.s={x:.5,items:[],next:0},n.onMove=t=>{n.down&&(n.s.x=Math.max(.08,Math.min(.92,t/n.W)))},n.onDown=t=>{n.s.x=Math.max(.08,Math.min(.92,t/n.W))}},bot(n){let t=n.s.items.filter(e=>!e.done&&e.y<.85).sort((e,i)=>i.y-e.y)[0];t&&(n.s.x+=Math.sign(t.x-n.s.x)*Math.min(Math.abs(t.x-n.s.x),n.dt*.9))},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i),Et.water(t,0,i*.78,e,i*.22,n.t),t.fillStyle="#2f8a3a";for(let o=0;o<5;o++)t.beginPath(),t.ellipse(e*(.1+o*.2),60,e*.12,30,Math.sin(o)*.3,0,7),t.fill();s.next-=n.dt,s.next<=0&&!n.ended&&(s.next=ne(.5,1),s.items.push({x:ne(.08,.92),y:.08,v:ne(.25,.4),bomb:Math.random()<.15}));for(let o of s.items)o.done||(o.y+=n.dt*o.v,o.v+=n.dt*.08,o.y>.78&&o.y<.84&&Math.abs(o.x-s.x)<.08&&(o.done=1,n.score+=o.bomb?-2:1,n.score=Math.max(0,n.score)),t.fillStyle=o.bomb?"#e23a2a":"#6a4520",t.beginPath(),t.arc(o.x*e,o.y*i,16,0,7),t.fill(),o.bomb&&Et.text(t,"\u{1F345}",o.x*e,o.y*i,20));s.items=s.items.filter(o=>o.y<1.05&&!o.done);let r=s.x*e,a=i*.82;t.fillStyle=n.col,t.beginPath(),t.moveTo(r-60,a-10),t.lineTo(r+60,a-10),t.lineTo(r+42,a+16),t.lineTo(r-42,a+16),t.fill(),Et.person(t,r,a-8,1.1,n.col,{armsUp:!0}),n.hud()}});$e({id:"tomatazos",name:"Tomatazos",cat:"piscina",unit:"blancos",dur:25,how:"Toca los blancos que pasan sobre la piscina para lanzarles un tomate. \xA1No le des al \xE1rbitro!",ai:n=>Ne(ne(12,20)*tn[n]),start(n){let t=n.s={tg:[],next:0,sp:[]};n.onDown=(e,i)=>{if(!n.ended){for(let s of t.tg)if(!s.hit&&Math.hypot(s.x*n.W-e,s.y*n.H-i)<46){s.hit=1,n.score+=s.ref?-3:1,n.score=Math.max(0,n.score),t.sp.push({x:e,y:i,t:.5});return}}}},bot(n){let t=n.s.tg.find(e=>!e.hit&&!e.ref&&e.x>.1&&e.x<.9);t&&Math.random()<.07&&n.onDown(t.x*n.W,t.y*n.H)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;if(Et.sky(t,e,i),Et.water(t,0,i*.7,e,i*.3,n.t),s.next-=n.dt,s.next<=0&&!n.ended){s.next=ne(.4,.8);let r=Math.random()<.5;s.tg.push({x:r?-.05:1.05,y:ne(.25,.62),v:(r?1:-1)*ne(.2,.38),ref:Math.random()<.14})}for(let r of s.tg)r.x+=r.v*n.dt,!r.hit&&(r.ref?(Et.person(t,r.x*e,r.y*i+40,1.1,"#111"),Et.text(t,"\xC1RBITRO",r.x*e,r.y*i-40,12)):(t.fillStyle="#fff",t.beginPath(),t.arc(r.x*e,r.y*i,36,0,7),t.fill(),t.fillStyle="#e23a2a",t.beginPath(),t.arc(r.x*e,r.y*i,24,0,7),t.fill(),t.fillStyle="#fff",t.beginPath(),t.arc(r.x*e,r.y*i,10,0,7),t.fill()));s.tg=s.tg.filter(r=>r.x>-.1&&r.x<1.1);for(let r of s.sp){r.t-=n.dt,t.fillStyle="#d42a1a";for(let a=0;a<6;a++)t.beginPath(),t.arc(r.x+Math.cos(a)*(1-r.t)*40,r.y+Math.sin(a*2)*(1-r.t)*40,8,0,7),t.fill()}s.sp=s.sp.filter(r=>r.t>0),n.hud()}});$e({id:"sandia",name:"La sand\xEDa",cat:"yincana",unit:"rondas",dur:0,how:"Mira el orden en que se iluminan las casetas y rep\xEDtelo. Cada ronda, una m\xE1s.",ai:n=>Ne(ne(3,6)*tn[n]),start(n){let t=n.s={seq:[],show:0,idx:0,input:0,flash:-1,ft:0,wait:1,fail:0};t.add=()=>{t.seq.push(Ne(ne(-.49,3.49))),t.show=1,t.idx=0,t.ft=0,t.input=0},n.onDown=(e,i)=>{if(!t.input||n.ended)return;let s=(e<n.W/2?0:1)+(i<n.H*.58?0:2);t.flash=s,t.ft=.25,s===t.seq[t.idx]?(t.idx++,t.idx===t.seq.length&&(n.score++,t.input=0,t.wait=.9)):(t.fail=1,t.input=0,n.end())}},bot(n){let t=n.s;if(t.input&&Math.random()<.08){let e=Math.random()<.9?t.seq[t.idx]:0;n.onDown((e%2?.75:.25)*n.W,(e<2?.4:.8)*n.H)}},frame(n){let{c:t,W:e,H:i}=n,s=n.s;if(Et.sky(t,e,i),Et.sand(t,0,i*.2,e,i*.8),s.wait>0&&(s.wait-=n.dt,s.wait<=0&&s.add()),s.show){s.ft+=n.dt;let o=Math.floor(s.ft/.7);s.flash=s.ft%.7<.45?s.seq[o]:-1,o>=s.seq.length&&(s.show=0,s.input=1,s.flash=-1)}else s.ft>0&&(s.ft-=n.dt,s.ft<=0&&(s.flash=-1));let r=["\u{1F349}","\u{1F353}","\u{1F33D}","\u{1F34B}"],a=["#2fb84a","#e23a2a","#ffb31a","#ffe14a"];for(let o=0;o<4;o++){let l=o%2*e/2+20,c=56+(o<2?0:(i-56)/2),h=e/2-40,d=(i-56)/2-20;t.fillStyle=s.flash===o?"#fff":a[o],t.globalAlpha=s.flash===o?1:.75,t.beginPath(),t.roundRect(l,c,h,d,20),t.fill(),t.globalAlpha=1,Et.text(t,r[o],l+h/2,c+d/2,60)}Et.text(t,s.show?"Mira\u2026":s.input?"\xA1Tu turno!":s.fail?"\xA1Fallo!":"\xA1Bien!",e/2,i*.58,30,"#fff"),n.hud()}});function Jc(n,t,e,i,s,r){return $e({id:n,name:t,cat:"saber",unit:i,dur:0,how:e,ai:a=>Ne(ne(2,4.5)*tn[a]),start(a){let o=a.s={q:s.slice().sort(()=>Math.random()-.5).slice(0,6),i:0,sel:-1,st:0,fuse:12,boom:0};o.cur=()=>r(o.q[o.i]),a.onDown=(l,c)=>{if(o.sel>=0||a.ended||o.boom)return;let h=o.cur().opts;for(let d=0;d<h.length;d++){let u=a.H*.45+d*a.H*.15;c>u&&c<u+a.H*.12&&(o.sel=d,o.st=.9,d===o.cur().ok&&a.score++)}}},bot(a){if(a.s.sel<0&&!a.s.boom&&Math.random()<.03){let o=Math.random()<.7?a.s.cur().ok:0;a.onDown(a.W/2,a.H*.45+o*a.H*.15+5)}},frame(a){let{c:o,W:l,H:c}=a,h=a.s;if(Et.sky(o,l,c,"#0a1a4a","#22408a"),n==="patata"){if(h.sel<0&&!h.boom&&!a.ended&&(h.fuse-=a.dt,h.fuse<=0&&(h.boom=1.2)),h.boom&&(h.boom-=a.dt,h.boom<=0))return h.boom=0,a.end(),a.hud();let u=h.fuse<4?Math.sin(a.t*40)*4:0;o.fillStyle=h.boom?"#ff5b1a":"#c08a3a",o.beginPath(),o.ellipse(l-80+u,110,40,28,.3,0,7),o.fill(),Et.text(o,h.boom?"\u{1F4A5}":Math.ceil(h.fuse)+"",l-80,110,26)}if(h.st>0&&(h.st-=a.dt,h.st<=0)){let u=h.sel===h.cur().ok;if(h.sel=-1,h.i++,n==="patata"&&(h.fuse=u?Math.max(5,h.fuse+2):h.fuse-3),h.i>=h.q.length)return a.end()}let d=h.cur();if(!d)return a.hud();o.fillStyle="#000a",o.beginPath(),o.roundRect(l*.06,c*.16,l*.88,c*.24,16),o.fill(),bd(o,d.q,l/2,c*.28,l*.8,Math.min(26,l/30)),d.opts.forEach((u,f)=>{let _=c*.45+f*c*.15,S=h.sel>=0,m=S&&f===d.ok?"#2fb84a":S&&f===h.sel?"#e23a2a":"#1f6fe0";o.fillStyle=m,o.strokeStyle="#ffd21a",o.lineWidth=3,o.beginPath(),o.roundRect(l*.12,_,l*.76,c*.12,30),o.fill(),o.stroke(),Et.text(o,u,l/2,_+c*.06,Math.min(22,l/36))}),a.hud(),Et.text(o,`Pregunta ${Math.min(h.i+1,h.q.length)}/${h.q.length}`,12,64,16,"#fff","left")}})}function bd(n,t,e,i,s,r){n.font=`900 ${r}px Arial`;let a=t.split(" "),o=[],l="";for(let c of a)n.measureText(l+c).width>s&&(o.push(l),l=""),l+=c+" ";o.push(l),o.forEach((c,h)=>Et.text(n,c.trim(),e,i+(h-(o.length-1)/2)*r*1.2,r))}Jc("patata","La patata caliente","El alcalde contesta antes de que explote la patata. Acertar da tiempo; fallar lo quita.","aciertos",qc,n=>n&&{q:n[0],opts:n[1],ok:n[2]});Jc("diccionario","El diccionario","El padrino elige la definici\xF3n correcta de cada palabra rara.","aciertos",Yc,n=>n&&{q:"\xBFQu\xE9 significa \xAB"+n[0]+"\xBB?",opts:n[1],ok:n[2]});$e({id:"capitanes",name:"Pasi\xF3n de capitanes",cat:"especial",unit:"puntos",dur:0,how:"Duelo de capitanes: toca en cuanto el sem\xE1foro se ponga VERDE. Al mejor de 5. \xA1Se juega la Vaquilla dorada!",ai:()=>2,start(n){let t=n.s={r:0,st:"wait",t:ne(1.2,3),you:0,riv:0,msg:"",rt:0};n.onDown=()=>{if(!n.ended){if(t.st==="wait")t.msg="\xA1Te has adelantado!",t.riv++,t.st="res",t.t=1.2;else if(t.st==="go"){let e=t.rt,i=ne(.28,.55);e<i?(t.you++,t.msg=`\xA1Ganas! ${Math.round(e*1e3)} ms`):(t.riv++,t.msg=`M\xE1s r\xE1pido el rival (${Math.round(i*1e3)} ms)`),t.st="res",t.t=1.3}}}},bot(n){n.s.st==="go"&&n.s.rt>.3&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;Et.sky(t,e,i,"#1a0a3a","#4a1a6a"),n.ended||(s.st==="go"?s.rt+=n.dt:s.t-=n.dt,s.st==="wait"&&s.t<=0&&(s.st="go",s.rt=0),s.st==="go"&&s.rt>1&&(s.riv++,s.msg="Demasiado lento\u2026",s.st="res",s.t=1.2),s.st==="res"&&s.t<=0&&(s.you>=3||s.riv>=3?(n.score=s.you,n.opts.rivalScore=s.riv,n.end(s.you)):(s.st="wait",s.t=ne(1.2,3),s.msg=""))),t.fillStyle="#222",t.beginPath(),t.roundRect(e/2-60,i*.2,120,200,20),t.fill(),["#e23a2a","#ffb31a","#2fb84a"].forEach((r,a)=>{let o=s.st==="go"&&a===2||s.st==="wait"&&a===0;t.fillStyle=o?r:"#444",t.beginPath(),t.arc(e/2,i*.2+36+a*64,26,0,7),t.fill()}),Et.person(t,e*.2,i*.9,2,n.col,{armsUp:s.st==="res"&&s.msg.startsWith("\xA1Ganas")}),Et.person(t,e*.8,i*.9,2,n.rcol),Et.vaca(t,e/2,i*.95,1.2,0,1,!0),Et.text(t,"VAQUILLA DORADA",e/2,i*.97-90,14,"#ffd21a"),Et.text(t,`${s.you} - ${s.riv}`,e/2,i*.14,36,"#ffd21a"),s.msg&&Et.text(t,s.msg,e/2,i*.7,28),n.hud(`${s.you}`)}});var mi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},gi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ah=0,Ul=1,Rh=2;var Sr=1,Ja=2,bs=3,_i=0,ke=1,Ge=2,On=0,Ss=1,Mr=2,Fl=3,Ol=4,Ch=5;var Fi=100,Ph=101,Ih=102,Lh=103,Dh=104,Nh=200,Uh=201,Fh=202,Oh=203,Bl=204,zl=205,Bh=206,zh=207,kh=208,Gh=209,Vh=210,Hh=211,Wh=212,Xh=213,qh=214,pa=0,ma=1,ga=2,os=3,_a=4,xa=5,ya=6,va=7,kl=0,Yh=1,Zh=2,An=0,Gl=1,Vl=2,Hl=3,Er=4,Wl=5,Xl=6,ql=7;var Yl=300,xi=301,Oi=302,Ka=303,ja=304,Tr=306,ls=1e3,Dn=1001,ba=1002,Fe=1003,$h=1004;var wr=1005;var Be=1006,Qa=1007;var yi=1008;var nn=1009,Zl=1010,$l=1011,Ms=1012,to=1013,Rn=1014,_n=1015,Cn=1016,eo=1017,no=1018,Es=1020,Jl=35902,Kl=35899,jl=1021,Ql=1022,xn=1023,Nn=1026,vi=1027,io=1028,so=1029,bi=1030,ro=1031;var ao=1033,Ar=33776,Rr=33777,Cr=33778,Pr=33779,oo=35840,lo=35841,co=35842,ho=35843,uo=36196,fo=37492,po=37496,mo=37488,go=37489,Ir=37490,_o=37491,xo=37808,yo=37809,vo=37810,bo=37811,So=37812,Mo=37813,Eo=37814,To=37815,wo=37816,Ao=37817,Ro=37818,Co=37819,Po=37820,Io=37821,Lo=36492,Do=36494,No=36495,Uo=36283,Fo=36284,Lr=36285,Oo=36286;var Ws=2300,Sa=2301,da=2302,El=2303,Tl=2400,wl=2401,Al=2402;var Jh=3200;var Bo=0,Kh=1,$n="",Re="srgb",Xs="srgb-linear",qs="linear",he="srgb";var fa=7680;var jh=519,Qh=512,tu=513,eu=514,zo=515,nu=516,iu=517,ko=518,su=519,ru=35044;var tc="300 es",Tn=2e3,cs=2001;function Sd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Md(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ys(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function au(){let n=Ys("canvas");return n.style.display="block",n}var Kc={},hs=null;function ec(...n){let t="THREE."+n.shift();hs?hs("log",t,...n):console.log(t,...n)}function ou(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xt(...n){n=ou(n);let t="THREE."+n.shift();if(hs)hs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function qt(...n){n=ou(n);let t="THREE."+n.shift();if(hs)hs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Ii(...n){let t=n.join(" ");t in Kc||(Kc[t]=!0,Xt(...n))}function lu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var cu={[pa]:ma,[ga]:ya,[_a]:va,[os]:xa,[ma]:pa,[ya]:ga,[va]:_a,[xa]:os},wn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jc=1234567,ks=Math.PI/180,us=180/Math.PI;function Bi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]).toLowerCase()}function Qt(n,t,e){return Math.max(t,Math.min(e,n))}function nc(n,t){return(n%t+t)%t}function Ed(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Td(n,t,e){return n!==t?(e-n)/(t-n):0}function Gs(n,t,e){return(1-e)*n+e*t}function wd(n,t,e,i){return Gs(n,t,1-Math.exp(-e*i))}function Ad(n,t=1){return t-Math.abs(nc(n,t*2)-t)}function Rd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Cd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Pd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Id(n,t){return n+Math.random()*(t-n)}function Ld(n){return n*(.5-Math.random())}function Dd(n){n!==void 0&&(jc=n);let t=jc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Nd(n){return n*ks}function Ud(n){return n*us}function Fd(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Od(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Bd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function zd(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),d=r((t-i)/2),u=a((t-i)/2),f=r((i-t)/2),_=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*d,l*u,o*c);break;case"YZY":n.set(l*u,o*h,l*d,o*c);break;case"ZXZ":n.set(l*d,l*u,o*h,o*c);break;case"XZX":n.set(o*h,l*_,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*_,o*c);break;case"ZYZ":n.set(l*_,l*f,o*h,o*c);break;default:Xt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Je(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ic={DEG2RAD:ks,RAD2DEG:us,generateUUID:Bi,clamp:Qt,euclideanModulo:nc,mapLinear:Ed,inverseLerp:Td,lerp:Gs,damp:wd,pingpong:Ad,smoothstep:Rd,smootherstep:Cd,randInt:Pd,randFloat:Id,randFloatSpread:Ld,seededRandom:Dd,degToRad:Nd,radToDeg:Ud,isPowerOfTwo:Fd,ceilPowerOfTwo:Od,floorPowerOfTwo:Bd,setQuaternionFromProperEuler:zd,normalize:Je,denormalize:rs},cc=class cc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};cc.prototype.isVector2=!0;var gt=cc,hn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],f=r[a+1],_=r[a+2],S=r[a+3];if(d!==S||l!==u||c!==f||h!==_){let m=l*u+c*f+h*_+d*S;m<0&&(u=-u,f=-f,_=-_,S=-S,m=-m);let p=1-o;if(m<.9995){let w=Math.acos(m),L=Math.sin(w);p=Math.sin(p*w)/L,o=Math.sin(o*w)/L,l=l*p+u*o,c=c*p+f*o,h=h*p+_*o,d=d*p+S*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+_*o,d=d*p+S*o;let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],_=r[a+3];return t[e]=o*_+h*d+l*f-c*u,t[e+1]=l*_+h*u+c*d-o*f,t[e+2]=c*_+h*f+o*u-l*d,t[e+3]=h*_-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),d=o(r/2),u=l(i/2),f=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"YXZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"ZXY":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"ZYX":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"YZX":this._x=u*h*d+c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d-u*f*_;break;case"XZY":this._x=u*h*d-c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d+u*f*_;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},hc=class hc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Qc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return tl.copy(this).projectOnVector(t),this.sub(tl)}reflect(t){return this.sub(tl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};hc.prototype.isVector3=!0;var z=hc,tl=new z,Qc=new hn,uc=class uc{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],_=i[8],S=s[0],m=s[3],p=s[6],w=s[1],L=s[4],y=s[7],b=s[2],M=s[5],A=s[8];return r[0]=a*S+o*w+l*b,r[3]=a*m+o*L+l*M,r[6]=a*p+o*y+l*A,r[1]=c*S+h*w+d*b,r[4]=c*m+h*L+d*M,r[7]=c*p+h*y+d*A,r[2]=u*S+f*w+_*b,r[5]=u*m+f*L+_*M,r[8]=u*p+f*y+_*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,_=e*d+i*u+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/_;return t[0]=d*S,t[1]=(s*c-h*i)*S,t[2]=(o*i-s*a)*S,t[3]=u*S,t[4]=(h*e-s*l)*S,t[5]=(s*r-o*e)*S,t[6]=f*S,t[7]=(i*l-c*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ii("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(el.makeScale(t,e)),this}rotate(t){return Ii("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(el.makeRotation(-t)),this}translate(t,e){return Ii("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(el.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};uc.prototype.isMatrix3=!0;var $t=uc,el=new $t,th=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eh=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kd(){let n={enabled:!0,workingColorSpace:Xs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===he&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===he&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===$n?qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ii("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ii("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Xs]:{primaries:t,whitePoint:i,transfer:qs,toXYZ:th,fromXYZ:eh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:i,transfer:he,toXYZ:th,fromXYZ:eh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),n}var se=kd();function Yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function as(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Xi,Ma=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Xi===void 0&&(Xi=Ys("canvas")),Xi.width=t.width,Xi.height=t.height;let s=Xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Xi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Ys("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Yn(e[i]/255)*255):e[i]=Yn(e[i]);return{data:e,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Gd=0,ds=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Bi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nl(s[a].image)):r.push(nl(s[a]))}else r=nl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function nl(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Ma.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var Vd=0,il=new z,Ke=class n extends wn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Dn,s=Dn,r=Be,a=yi,o=xn,l=nn,c=n.DEFAULT_ANISOTROPY,h=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Bi(),this.name="",this.source=new ds(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(il).x}get height(){return this.source.getSize(il).y}get depth(){return this.source.getSize(il).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Xt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ls:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ls:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Yl;Ke.DEFAULT_ANISOTROPY=1;var dc=class dc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],_=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-S)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+S)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let L=(c+1)/2,y=(f+1)/2,b=(p+1)/2,M=(h+u)/4,A=(d+S)/4,x=(_+m)/4;return L>y&&L>b?L<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(L),s=M/i,r=A/i):y>b?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=M/s,r=x/s):b<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),i=A/r,s=x/r),this.set(i,s,r,e),this}let w=Math.sqrt((m-_)*(m-_)+(d-S)*(d-S)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(d-S)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};dc.prototype.isVector4=!0;var be=dc,Ea=class extends wn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new Ke(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Be,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ds(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},en=class extends Ea{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Zs=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ta=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var $a=class $a{constructor(t,e,i,s,r,a,o,l,c,h,d,u,f,_,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,d,u,f,_,S,m)}set(t,e,i,s,r,a,o,l,c,h,d,u,f,_,S,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=_,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $a().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/qi.setFromMatrixColumn(t,0).length(),r=1/qi.setFromMatrixColumn(t,1).length(),a=1/qi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=a*h,f=a*d,_=o*h,S=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+_*c,e[5]=u-S*c,e[9]=-o*l,e[2]=S-u*c,e[6]=_+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,_=c*h,S=c*d;e[0]=u+S*o,e[4]=_*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-_,e[6]=S+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,_=c*h,S=c*d;e[0]=u-S*o,e[4]=-a*d,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*h,e[9]=S-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,_=o*h,S=o*d;e[0]=l*h,e[4]=_*c-f,e[8]=u*c+S,e[1]=l*d,e[5]=S*c+u,e[9]=f*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,_=o*l,S=o*c;e[0]=l*h,e[4]=S-u*d,e[8]=_*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+_,e[10]=u-S*d}else if(t.order==="XZY"){let u=a*l,f=a*c,_=o*l,S=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+S,e[5]=a*h,e[9]=f*d-_,e[2]=_*d-f,e[6]=o*h,e[10]=S*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hd,t,Wd)}lookAt(t,e,i){let s=this.elements;return an.subVectors(t,e),an.lengthSq()===0&&(an.z=1),an.normalize(),ni.crossVectors(i,an),ni.lengthSq()===0&&(Math.abs(i.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ni.crossVectors(i,an)),ni.normalize(),Wr.crossVectors(an,ni),s[0]=ni.x,s[4]=Wr.x,s[8]=an.x,s[1]=ni.y,s[5]=Wr.y,s[9]=an.y,s[2]=ni.z,s[6]=Wr.z,s[10]=an.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],_=i[2],S=i[6],m=i[10],p=i[14],w=i[3],L=i[7],y=i[11],b=i[15],M=s[0],A=s[4],x=s[8],E=s[12],C=s[1],I=s[5],O=s[9],V=s[13],F=s[2],H=s[6],J=s[10],X=s[14],B=s[3],N=s[7],P=s[11],G=s[15];return r[0]=a*M+o*C+l*F+c*B,r[4]=a*A+o*I+l*H+c*N,r[8]=a*x+o*O+l*J+c*P,r[12]=a*E+o*V+l*X+c*G,r[1]=h*M+d*C+u*F+f*B,r[5]=h*A+d*I+u*H+f*N,r[9]=h*x+d*O+u*J+f*P,r[13]=h*E+d*V+u*X+f*G,r[2]=_*M+S*C+m*F+p*B,r[6]=_*A+S*I+m*H+p*N,r[10]=_*x+S*O+m*J+p*P,r[14]=_*E+S*V+m*X+p*G,r[3]=w*M+L*C+y*F+b*B,r[7]=w*A+L*I+y*H+b*N,r[11]=w*x+L*O+y*J+b*P,r[15]=w*E+L*V+y*X+b*G,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],_=t[3],S=t[7],m=t[11],p=t[15],w=l*f-c*u,L=o*f-c*d,y=o*u-l*d,b=a*f-c*h,M=a*u-l*h,A=a*d-o*h;return e*(S*w-m*L+p*y)-i*(_*w-m*b+p*M)+s*(_*L-S*b+p*A)-r*(_*y-S*M+m*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],_=t[12],S=t[13],m=t[14],p=t[15],w=e*o-i*a,L=e*l-s*a,y=e*c-r*a,b=i*l-s*o,M=i*c-r*o,A=s*c-r*l,x=h*S-d*_,E=h*m-u*_,C=h*p-f*_,I=d*m-u*S,O=d*p-f*S,V=u*p-f*m,F=w*V-L*O+y*I+b*C-M*E+A*x;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/F;return t[0]=(o*V-l*O+c*I)*H,t[1]=(s*O-i*V-r*I)*H,t[2]=(S*A-m*M+p*b)*H,t[3]=(u*M-d*A-f*b)*H,t[4]=(l*C-a*V-c*E)*H,t[5]=(e*V-s*C+r*E)*H,t[6]=(m*y-_*A-p*L)*H,t[7]=(h*A-u*y+f*L)*H,t[8]=(a*O-o*C+c*x)*H,t[9]=(i*C-e*O-r*x)*H,t[10]=(_*M-S*y+p*w)*H,t[11]=(d*y-h*M-f*w)*H,t[12]=(o*E-a*I-l*x)*H,t[13]=(e*I-i*E+s*x)*H,t[14]=(S*L-_*b-m*w)*H,t[15]=(h*b-d*L+u*w)*H,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,_=r*d,S=a*h,m=a*d,p=o*d,w=l*c,L=l*h,y=l*d,b=i.x,M=i.y,A=i.z;return s[0]=(1-(S+p))*b,s[1]=(f+y)*b,s[2]=(_-L)*b,s[3]=0,s[4]=(f-y)*M,s[5]=(1-(u+p))*M,s[6]=(m+w)*M,s[7]=0,s[8]=(_+L)*A,s[9]=(m-w)*A,s[10]=(1-(u+S))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=qi.set(s[0],s[1],s[2]).length(),o=qi.set(s[4],s[5],s[6]).length(),l=qi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Sn.copy(this);let c=1/a,h=1/o,d=1/l;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,e.setFromRotationMatrix(Sn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=Tn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),_,S;if(l)_=r/(a-r),S=a*r/(a-r);else if(o===Tn)_=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===cs)_=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Tn,l=!1){let c=this.elements,h=2/(e-t),d=2/(i-s),u=-(e+t)/(e-t),f=-(i+s)/(i-s),_,S;if(l)_=1/(a-r),S=a/(a-r);else if(o===Tn)_=-2/(a-r),S=-(a+r)/(a-r);else if(o===cs)_=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};$a.prototype.isMatrix4=!0;var me=$a,qi=new z,Sn=new me,Hd=new z(0,0,0),Wd=new z(1,1,1),ni=new z,Wr=new z,an=new z,nh=new me,ih=new hn,Zn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ih.setFromEuler(this),this.setFromQuaternion(ih,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zn.DEFAULT_ORDER="XYZ";var $s=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Xd=0,sh=new z,Yi=new hn,Vn=new me,Xr=new z,Ds=new z,qd=new z,Yd=new hn,rh=new z(1,0,0),ah=new z(0,1,0),oh=new z(0,0,1),lh={type:"added"},Zd={type:"removed"},Zi={type:"childadded",child:null},sl={type:"childremoved",child:null},Me=class n extends wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new z,e=new Zn,i=new hn,s=new z(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new $t}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(rh,t)}rotateY(t){return this.rotateOnAxis(ah,t)}rotateZ(t){return this.rotateOnAxis(oh,t)}translateOnAxis(t,e){return sh.copy(t).applyQuaternion(this.quaternion),this.position.add(sh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rh,t)}translateY(t){return this.translateOnAxis(ah,t)}translateZ(t){return this.translateOnAxis(oh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xr.copy(t):Xr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Ds,Xr,this.up):Vn.lookAt(Xr,Ds,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lh),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zd),sl.child=t,this.dispatchEvent(sl),sl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lh),Zi.child=t,this.dispatchEvent(Zi),Zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,qd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Yd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Me.DEFAULT_UP=new z(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ue=class extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}},$d={type:"move"},fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let S of t.hand.values()){let m=e.getJointPose(S,i),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($d)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ue;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},qr={h:0,s:0,l:0};function rl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=i,se.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=se.workingColorSpace){if(t=nc(t,1),e=Qt(e,0,1),i=Qt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=rl(a,r,t+1/3),this.g=rl(a,r,t),this.b=rl(a,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Re){function i(r){r!==void 0&&parseFloat(r)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){let i=hu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=as(t.r),this.g=as(t.g),this.b=as(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return se.workingToColorSpace(We.copy(this),t),Math.round(Qt(We.r*255,0,255))*65536+Math.round(Qt(We.g*255,0,255))*256+Math.round(Qt(We.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(We.copy(this),e);let i=We.r,s=We.g,r=We.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=Re){se.workingToColorSpace(We.copy(this),t);let e=We.r,i=We.g,s=We.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(qr);let i=Gs(ii.h,qr.h,e),s=Gs(ii.s,qr.s,e),r=Gs(ii.l,qr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},We=new Jt;Jt.NAMES=hu;var Js=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Jt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ks=class extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Mn=new z,Hn=new z,al=new z,Wn=new z,$i=new z,Ji=new z,ch=new z,ol=new z,ll=new z,cl=new z,hl=new be,ul=new be,dl=new be,oi=class n{constructor(t=new z,e=new z,i=new z){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Mn.subVectors(t,e),s.cross(Mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Mn.subVectors(s,e),Hn.subVectors(i,e),al.subVectors(t,e);let a=Mn.dot(Mn),o=Mn.dot(Hn),l=Mn.dot(al),c=Hn.dot(Hn),h=Hn.dot(al),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,_=(a*h-o*l)*u;return r.set(1-f-_,_,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wn.x),l.addScaledVector(a,Wn.y),l.addScaledVector(o,Wn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return hl.setScalar(0),ul.setScalar(0),dl.setScalar(0),hl.fromBufferAttribute(t,e),ul.fromBufferAttribute(t,i),dl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(hl,r.x),a.addScaledVector(ul,r.y),a.addScaledVector(dl,r.z),a}static isFrontFacing(t,e,i,s){return Mn.subVectors(i,e),Hn.subVectors(t,e),Mn.cross(Hn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),Mn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;$i.subVectors(s,i),Ji.subVectors(r,i),ol.subVectors(t,i);let l=$i.dot(ol),c=Ji.dot(ol);if(l<=0&&c<=0)return e.copy(i);ll.subVectors(t,s);let h=$i.dot(ll),d=Ji.dot(ll);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector($i,a);cl.subVectors(t,r);let f=$i.dot(cl),_=Ji.dot(cl);if(_>=0&&f<=_)return e.copy(r);let S=f*c-l*_;if(S<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(i).addScaledVector(Ji,o);let m=h*_-f*d;if(m<=0&&d-h>=0&&f-_>=0)return ch.subVectors(r,s),o=(d-h)/(d-h+(f-_)),e.copy(s).addScaledVector(ch,o);let p=1/(m+S+u);return a=S*p,o=u*p,e.copy(i).addScaledVector($i,a).addScaledVector(Ji,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Un=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,En):En.fromBufferAttribute(r,a),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Yr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Yr.copy(i.boundingBox)),Yr.applyMatrix4(t.matrixWorld),this.union(Yr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ns),Zr.subVectors(this.max,Ns),Ki.subVectors(t.a,Ns),ji.subVectors(t.b,Ns),Qi.subVectors(t.c,Ns),si.subVectors(ji,Ki),ri.subVectors(Qi,ji),wi.subVectors(Ki,Qi);let e=[0,-si.z,si.y,0,-ri.z,ri.y,0,-wi.z,wi.y,si.z,0,-si.x,ri.z,0,-ri.x,wi.z,0,-wi.x,-si.y,si.x,0,-ri.y,ri.x,0,-wi.y,wi.x,0];return!fl(e,Ki,ji,Qi,Zr)||(e=[1,0,0,0,1,0,0,0,1],!fl(e,Ki,ji,Qi,Zr))?!1:($r.crossVectors(si,ri),e=[$r.x,$r.y,$r.z],fl(e,Ki,ji,Qi,Zr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Xn=[new z,new z,new z,new z,new z,new z,new z,new z],En=new z,Yr=new Un,Ki=new z,ji=new z,Qi=new z,si=new z,ri=new z,wi=new z,Ns=new z,Zr=new z,$r=new z,Ai=new z;function fl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ai.fromArray(n,r);let o=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),l=t.dot(Ai),c=e.dot(Ai),h=i.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var we=new z,Jr=new gt,Jd=0,cn=class extends wn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Jd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ru,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Jr.fromBufferAttribute(this,e),Jr.applyMatrix3(t),this.setXY(e,Jr.x,Jr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=rs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Je(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),i=Je(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),i=Je(i,this.array),s=Je(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Je(e,this.array),i=Je(i,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var js=class extends cn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Qs=class extends cn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var oe=class extends cn{constructor(t,e,i){super(new Float32Array(t),e,i)}},Kd=new Un,Us=new z,pl=new z,li=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Kd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Us.subVectors(t,this.center);let e=Us.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Us,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Us.copy(t.center).add(pl)),this.expandByPoint(Us.copy(t.center).sub(pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},jd=0,gn=new me,ml=new Me,ts=new z,on=new Un,Fs=new Un,Ue=new z,ze=class n extends wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sd(t)?Qs:js)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,i){return gn.makeTranslation(t,e,i),this.applyMatrix4(gn),this}scale(t,e,i){return gn.makeScale(t,e,i),this.applyMatrix4(gn),this}lookAt(t){return ml.lookAt(t),ml.updateMatrix(),this.applyMatrix4(ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Fs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ue.addVectors(on.min,Fs.min),on.expandByPoint(Ue),Ue.addVectors(on.max,Fs.max),on.expandByPoint(Ue)):(on.expandByPoint(Fs.min),on.expandByPoint(Fs.max))}on.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ue));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ue.fromBufferAttribute(o,c),l&&(ts.fromBufferAttribute(t,c),Ue.add(ts)),s=Math.max(s,i.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new cn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new z,l[x]=new z;let c=new z,h=new z,d=new z,u=new gt,f=new gt,_=new gt,S=new z,m=new z;function p(x,E,C){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,E),d.fromBufferAttribute(i,C),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,E),_.fromBufferAttribute(r,C),h.sub(c),d.sub(c),f.sub(u),_.sub(u);let I=1/(f.x*_.y-_.x*f.y);isFinite(I)&&(S.copy(h).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(I),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-_.x).multiplyScalar(I),o[x].add(S),o[E].add(S),o[C].add(S),l[x].add(m),l[E].add(m),l[C].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let x=0,E=w.length;x<E;++x){let C=w[x],I=C.start,O=C.count;for(let V=I,F=I+O;V<F;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let L=new z,y=new z,b=new z,M=new z;function A(x){b.fromBufferAttribute(s,x),M.copy(b);let E=o[x];L.copy(E),L.sub(b.multiplyScalar(b.dot(E))).normalize(),y.crossVectors(M,E);let I=y.dot(l[x])<0?-1:1;a.setXYZW(x,L.x,L.y,L.z,I)}for(let x=0,E=w.length;x<E;++x){let C=w[x],I=C.start,O=C.count;for(let V=I,F=I+O;V<F;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new z,r=new z,a=new z,o=new z,l=new z,c=new z,h=new z,d=new z;if(t)for(let u=0,f=t.count;u<f;u+=3){let _=t.getX(u+0),S=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,_=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?f=l[S]*o.data.stride+o.offset:f=l[S]*h;for(let p=0;p<h;p++)u[_++]=c[f++]}return new cn(u,h,d)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var gl=new z,Qd=new z,tf=new $t,ln=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=gl.subVectors(i,e).cross(Qd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(gl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||tf.getNormalMatrix(t),s=this.coplanarPoint(gl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},ef=0,ci=class extends wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=Ss,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bl,this.blendDst=zl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fa,this.stencilZFail=fa,this.stencilZPass=fa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Xt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Xt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Jt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new ln().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var qn=new z,_l=new z,Kr=new z,jr=new z,ps=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){_l.copy(t).add(e).multiplyScalar(.5),Kr.copy(e).sub(t).normalize(),jr.copy(this.origin).sub(_l);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Kr),o=jr.dot(this.direction),l=-jr.dot(Kr),c=jr.lengthSq(),h=Math.abs(1-a*a),d,u,f,_;if(h>0)if(d=a*l-o,u=a*o-l,_=r*h,d>=0)if(u>=-_)if(u<=_){let S=1/h;d*=S,u*=S,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-_?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=_?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_l).addScaledVector(Kr,u),f}intersectSphere(t,e){if(t.radius<0)return null;qn.subVectors(t.center,this.origin);let i=qn.dot(this.direction),s=qn.dot(qn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,_=e.x-a.x,S=e.y-a.y,m=e.z-a.z,p=i.x-a.x,w=i.y-a.y,L=i.z-a.z,y=Math.abs(l),b=Math.abs(c),M=Math.abs(h),A,x,E,C,I,O,V,F,H,J,X,B;if(y>=b&&y>=M?(E=l,O=d,H=_,B=p,l>=0?(A=c,x=h,C=u,I=f,V=S,F=m,J=w,X=L):(A=h,x=c,C=f,I=u,V=m,F=S,J=L,X=w)):b>=M?(E=c,O=u,H=S,B=w,c>=0?(A=h,x=l,C=f,I=d,V=m,F=_,J=L,X=p):(A=l,x=h,C=d,I=f,V=_,F=m,J=p,X=L)):(E=h,O=f,H=m,B=L,h>=0?(A=l,x=c,C=d,I=u,V=_,F=S,J=p,X=w):(A=c,x=l,C=u,I=d,V=S,F=_,J=w,X=p)),E===0)return null;let N=A/E,P=x/E,G=1/E,ot=C-N*O,rt=I-P*O,Pt=V-N*H,Ft=F-P*H,Kt=J-N*B,et=X-P*B,at=Kt*Ft-et*Pt,yt=ot*et-rt*Kt,Dt=Pt*rt-Ft*ot;if(s){if(at<0||yt<0||Dt<0)return null}else if((at<0||yt<0||Dt<0)&&(at>0||yt>0||Dt>0))return null;let At=at+yt+Dt;if(At===0)return null;let Ht=G*(at*O+yt*H+Dt*B);return(At>0?Ht<0:Ht>0)?null:this.at(Ht/At,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ae=class extends ci{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},hh=new me,Ri=new ps,Qr=new li,uh=new z,ta=new z,ea=new z,na=new z,xl=new z,ia=new z,dh=new z,sa=new z,Oe=class extends Me{constructor(t=new ze,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ia.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(xl.fromBufferAttribute(d,t),a?ia.addScaledVector(xl,h):ia.addScaledVector(xl.sub(e),h))}e.add(ia)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(r),Ri.copy(t.ray).recast(t.near),!(Qr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Qr,uh)===null||Ri.origin.distanceToSquared(uh)>(t.far-t.near)**2))&&(hh.copy(r).invert(),Ri.copy(t.ray).applyMatrix4(hh),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ri)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){let m=u[_],p=a[m.materialIndex],w=Math.max(m.start,f.start),L=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,b=L;y<b;y+=3){let M=o.getX(y),A=o.getX(y+1),x=o.getX(y+2);s=ra(this,p,t,i,c,h,d,M,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),S=Math.min(o.count,f.start+f.count);for(let m=_,p=S;m<p;m+=3){let w=o.getX(m),L=o.getX(m+1),y=o.getX(m+2);s=ra(this,a,t,i,c,h,d,w,L,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){let m=u[_],p=a[m.materialIndex],w=Math.max(m.start,f.start),L=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,b=L;y<b;y+=3){let M=y,A=y+1,x=y+2;s=ra(this,p,t,i,c,h,d,M,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let m=_,p=S;m<p;m+=3){let w=m,L=m+1,y=m+2;s=ra(this,a,t,i,c,h,d,w,L,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function nf(n,t,e,i,s,r,a,o){let l;if(t.side===ke?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===_i,o),l===null)return null;sa.copy(o),sa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(sa);return c<e.near||c>e.far?null:{distance:c,point:sa.clone(),object:n}}function ra(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,ta),n.getVertexPosition(l,ea),n.getVertexPosition(c,na);let h=nf(n,t,e,i,ta,ea,na,dh);if(h){let d=new z;oi.getBarycoord(dh,ta,ea,na,d),s&&(h.uv=oi.getInterpolatedAttribute(s,o,l,c,d,new gt)),r&&(h.uv1=oi.getInterpolatedAttribute(r,o,l,c,d,new gt)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,d,new z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new z,materialIndex:0};oi.getNormal(ta,ea,na,u.normal),h.face=u,h.barycoord=d}return h}var tr=class extends Ke{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Fe,h=Fe,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var er=class extends cn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},es=new me,fh=new me,aa=[],ph=new Un,sf=new me,Os=new Oe,Bs=new li,Fn=class extends Oe{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new er(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,sf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Un),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,es),ph.copy(t.boundingBox).applyMatrix4(es),this.boundingBox.union(ph)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,es),Bs.copy(t.boundingSphere).applyMatrix4(es),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(i),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,es),fh.multiplyMatrices(i,es),Os.matrixWorld=fh,Os.raycast(t,aa);for(let a=0,o=aa.length;a<o;a++){let l=aa[a];l.instanceId=r,l.object=this,e.push(l)}aa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new er(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new tr(new Float32Array(s*this.count),s,this.count,io,_n));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ci=new li,rf=new gt(.5,.5),oa=new z,ms=class{constructor(t=new ln,e=new ln,i=new ln,s=new ln,r=new ln,a=new ln){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Tn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],_=r[8],S=r[9],m=r[10],p=r[11],w=r[12],L=r[13],y=r[14],b=r[15];if(s[0].setComponents(c-a,f-h,p-_,b-w).normalize(),s[1].setComponents(c+a,f+h,p+_,b+w).normalize(),s[2].setComponents(c+o,f+d,p+S,b+L).normalize(),s[3].setComponents(c-o,f-d,p-S,b-L).normalize(),i)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,f-u,p-m,b-y).normalize();else if(s[4].setComponents(c-l,f-u,p-m,b-y).normalize(),e===Tn)s[5].setComponents(c+l,f+u,p+m,b+y).normalize();else if(e===cs)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(t){Ci.center.set(0,0,0);let e=rf.distanceTo(t.center);return Ci.radius=.7071067811865476+e,Ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(oa.x=s.normal.x>0?t.max.x:t.min.x,oa.y=s.normal.y>0?t.max.y:t.min.y,oa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var nr=class extends Ke{constructor(t=[],e=xi,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},hi=class extends Ke{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ui=class extends Ke{constructor(t,e,i=Rn,s,r,a,o=Fe,l=Fe,c,h=Nn,d=1){if(h!==Nn&&h!==vi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ds(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},wa=class extends ui{constructor(t,e=Rn,i=xi,s,r,a=Fe,o=Fe,l,c=Nn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ir=class extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},jt=class n extends ze{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;_("z","y","x",-1,-1,i,e,t,a,r,0),_("z","y","x",1,-1,i,e,-t,a,r,1),_("x","z","y",1,1,t,i,e,s,a,2),_("x","z","y",1,-1,t,i,-e,s,a,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(d,2));function _(S,m,p,w,L,y,b,M,A,x,E){let C=y/A,I=b/x,O=y/2,V=b/2,F=M/2,H=A+1,J=x+1,X=0,B=0,N=new z;for(let P=0;P<J;P++){let G=P*I-V;for(let ot=0;ot<H;ot++){let rt=ot*C-O;N[S]=rt*w,N[m]=G*L,N[p]=F,c.push(N.x,N.y,N.z),N[S]=0,N[m]=0,N[p]=M>0?1:-1,h.push(N.x,N.y,N.z),d.push(ot/A),d.push(1-P/x),X+=1}}for(let P=0;P<x;P++)for(let G=0;G<A;G++){let ot=u+G+H*P,rt=u+G+H*(P+1),Pt=u+(G+1)+H*(P+1),Ft=u+(G+1)+H*P;l.push(ot,rt,Ft),l.push(rt,Pt,Ft),B+=6}o.addGroup(f,B,E),f+=B,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Li=class n extends ze{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,_=i*2+r,S=s+1,m=new z,p=new z;for(let w=0;w<=_;w++){let L=0,y=0,b=0,M=0;if(w<=i){let E=w/i,C=E*Math.PI/2;y=-h-t*Math.cos(C),b=t*Math.sin(C),M=-t*Math.cos(C),L=E*d}else if(w<=i+r){let E=(w-i)/r;y=-h+E*e,b=t,M=0,L=d+E*u}else{let E=(w-i-r)/i,C=E*Math.PI/2;y=h+t*Math.sin(C),b=t*Math.cos(C),M=t*Math.sin(C),L=d+u+E*d}let A=Math.max(0,Math.min(1,L/f)),x=0;w===0?x=.5/s:w===_&&(x=-.5/s);for(let E=0;E<=s;E++){let C=E/s,I=C*Math.PI*2,O=Math.sin(I),V=Math.cos(I);p.x=-b*V,p.y=y,p.z=b*O,o.push(p.x,p.y,p.z),m.set(-b*V,M,b*O),m.normalize(),l.push(m.x,m.y,m.z),c.push(C+x,A)}if(w>0){let E=(w-1)*S;for(let C=0;C<s;C++){let I=E+C,O=E+C+1,V=w*S+C,F=w*S+C+1;a.push(I,O,V),a.push(O,F,V)}}}this.setIndex(a),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Di=class n extends ze{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new z,h=new gt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=i+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(o,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},xe=class n extends ze{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],_=0,S=[],m=i/2,p=0;w(),a===!1&&(t>0&&L(!0),e>0&&L(!1)),this.setIndex(h),this.setAttribute("position",new oe(d,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(f,2));function w(){let y=new z,b=new z,M=0,A=(e-t)/i;for(let x=0;x<=r;x++){let E=[],C=x/r,I=C*(e-t)+t;for(let O=0;O<=s;O++){let V=O/s,F=V*l+o,H=Math.sin(F),J=Math.cos(F);b.x=I*H,b.y=-C*i+m,b.z=I*J,d.push(b.x,b.y,b.z),y.set(H,A,J).normalize(),u.push(y.x,y.y,y.z),f.push(V,1-C),E.push(_++)}S.push(E)}for(let x=0;x<s;x++)for(let E=0;E<r;E++){let C=S[E][x],I=S[E+1][x],O=S[E+1][x+1],V=S[E][x+1];(t>0||E!==0)&&(h.push(C,I,V),M+=3),(e>0||E!==r-1)&&(h.push(I,O,V),M+=3)}c.addGroup(p,M,0),p+=M}function L(y){let b=_,M=new gt,A=new z,x=0,E=y===!0?t:e,C=y===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*C,0),u.push(0,C,0),f.push(.5,.5),_++;let I=_;for(let O=0;O<=s;O++){let F=O/s*l+o,H=Math.cos(F),J=Math.sin(F);A.x=E*J,A.y=m*C,A.z=E*H,d.push(A.x,A.y,A.z),u.push(0,C,0),M.x=H*.5+.5,M.y=J*.5*C+.5,f.push(M.x,M.y),_++}for(let O=0;O<s;O++){let V=b+O,F=I+O;y===!0?h.push(F,F+1,V):h.push(F+1,F,V),x+=3}c.addGroup(p,x,y===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},un=class n extends xe{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],u=i[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new gt:new z);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new z,s=[],r=[],a=[],o=new z,l=new me;for(let f=0;f<=t;f++){let _=f/t;s[f]=this.getTangentAt(_,new z)}r[0]=new z,a[0]=new z;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let _=Math.acos(Qt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,_))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Qt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],f*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},gs=class extends dn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new gt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Aa=class extends gs{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function sc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var mh=new z,gh=new z,yl=new sc,vl=new sc,bl=new sc,Ra=class extends dn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new z){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(gh.subVectors(s[0],s[1]).add(s[0]),c=gh);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(mh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=mh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,_=Math.pow(c.distanceToSquared(d),f),S=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);S<1e-4&&(S=1),_<1e-4&&(_=S),m<1e-4&&(m=S),yl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,_,S,m),vl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,_,S,m),bl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,_,S,m)}else this.curveType==="catmullrom"&&(yl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),vl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),bl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(yl.calc(l),vl.calc(l),bl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function _h(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function af(n,t){let e=1-n;return e*e*t}function of(n,t){return 2*(1-n)*n*t}function lf(n,t){return n*n*t}function Vs(n,t,e,i){return af(n,t)+of(n,e)+lf(n,i)}function cf(n,t){let e=1-n;return e*e*e*t}function hf(n,t){let e=1-n;return 3*e*e*n*t}function uf(n,t){return 3*(1-n)*n*n*t}function df(n,t){return n*n*n*t}function Hs(n,t,e,i,s){return cf(n,t)+hf(n,e)+uf(n,i)+df(n,s)}var sr=class extends dn{constructor(t=new gt,e=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new gt){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ca=class extends dn{constructor(t=new z,e=new z,i=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new z){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Hs(t,s.x,r.x,a.x,o.x),Hs(t,s.y,r.y,a.y,o.y),Hs(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},rr=class extends dn{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pa=class extends dn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ar=class extends dn{constructor(t=new gt,e=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new gt){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Vs(t,s.x,r.x,a.x),Vs(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ia=class extends dn{constructor(t=new z,e=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new z){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Vs(t,s.x,r.x,a.x),Vs(t,s.y,r.y,a.y),Vs(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},or=class extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(_h(o,l.x,c.x,h.x,d.x),_h(o,l.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new gt().fromArray(s))}return this}},Rl=Object.freeze({__proto__:null,ArcCurve:Aa,CatmullRomCurve3:Ra,CubicBezierCurve:sr,CubicBezierCurve3:Ca,EllipseCurve:gs,LineCurve:rr,LineCurve3:Pa,QuadraticBezierCurve:ar,QuadraticBezierCurve3:Ia,SplineCurve:or}),La=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rl[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Rl[s.type]().fromJSON(s))}return this}},lr=class extends La{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new rr(this.currentPoint.clone(),new gt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new ar(this.currentPoint.clone(),new gt(t,e),new gt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new sr(this.currentPoint.clone(),new gt(t,e),new gt(i,s),new gt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new or(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new gs(t,e,i,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},_s=class extends lr{constructor(t){super(t),this.uuid=Bi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new lr().fromJSON(s))}return this}};function ff(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=uu(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=xf(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let h=o,d=l;for(let u=e;u<s;u+=e){let f=n[u],_=n[u+1];f<o&&(o=f),_<l&&(l=_),f>h&&(h=f),_>d&&(d=_)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return cr(r,a,e,o,l,c,0),a}function uu(n,t,e,i,s){let r;if(s===Cf(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=xh(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=xh(a/i|0,n[a],n[a+1],r);return r&&xs(r,r.next)&&(ur(r),r=r.next),r}function Ni(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(xs(e,e.next)||Se(e.prev,e,e.next)===0)){if(ur(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function cr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Mf(n,i,s,r);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?mf(n,i,s,r):pf(n)){t.push(l.i,n.i,c.i),ur(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=gf(Ni(n),t),cr(n,t,e,i,s,r,2)):a===2&&_f(n,t,e,i,s,r):cr(Ni(n),t,e,i,s,r,1);break}}}function pf(n){let t=n.prev,e=n,i=n.next;if(Se(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c),_=i.next;for(;_!==t;){if(_.x>=h&&_.x<=u&&_.y>=d&&_.y<=f&&zs(s,o,r,l,a,c,_.x,_.y)&&Se(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function mf(n,t,e,i){let s=n.prev,r=n,a=n.next;if(Se(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),_=Math.min(h,d,u),S=Math.max(o,l,c),m=Math.max(h,d,u),p=Cl(f,_,t,e,i),w=Cl(S,m,t,e,i),L=n.prevZ,y=n.nextZ;for(;L&&L.z>=p&&y&&y.z<=w;){if(L.x>=f&&L.x<=S&&L.y>=_&&L.y<=m&&L!==s&&L!==a&&zs(o,h,l,d,c,u,L.x,L.y)&&Se(L.prev,L,L.next)>=0||(L=L.prevZ,y.x>=f&&y.x<=S&&y.y>=_&&y.y<=m&&y!==s&&y!==a&&zs(o,h,l,d,c,u,y.x,y.y)&&Se(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;L&&L.z>=p;){if(L.x>=f&&L.x<=S&&L.y>=_&&L.y<=m&&L!==s&&L!==a&&zs(o,h,l,d,c,u,L.x,L.y)&&Se(L.prev,L,L.next)>=0)return!1;L=L.prevZ}for(;y&&y.z<=w;){if(y.x>=f&&y.x<=S&&y.y>=_&&y.y<=m&&y!==s&&y!==a&&zs(o,h,l,d,c,u,y.x,y.y)&&Se(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function gf(n,t){let e=n;do{let i=e.prev,s=e.next.next;!xs(i,s)&&fu(i,e,e.next,s)&&hr(i,s)&&hr(s,i)&&(t.push(i.i,e.i,s.i),ur(e),ur(e.next),e=n=s),e=e.next}while(e!==n);return Ni(e)}function _f(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&wf(a,o)){let l=pu(a,o);a=Ni(a,a.next),l=Ni(l,l.next),cr(a,t,e,i,s,r,0),cr(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function xf(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=uu(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Tf(c))}s.sort(yf);for(let r=0;r<s.length;r++)e=vf(s[r],e);return e}function yf(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function vf(n,t){let e=bf(n,t);if(!e)return t;let i=pu(e,n);return Ni(i,i.next),Ni(e,e.next)}function bf(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(xs(n,e))return e;do{if(xs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&du(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let d=Math.abs(s-e.y)/(i-e.x);hr(e,n)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&Sf(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function Sf(n,t){return Se(n.prev,n,t.prev)<0&&Se(t.next,n,n.next)<0}function Mf(n,t,e,i){let s=n;do s.z===0&&(s.z=Cl(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Ef(s)}function Ef(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Cl(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Tf(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function du(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function zs(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&du(n,t,e,i,s,r,a,o)}function wf(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Af(n,t)&&(hr(n,t)&&hr(t,n)&&Rf(n,t)&&(Se(n.prev,n,t.prev)||Se(n,t.prev,t))||xs(n,t)&&Se(n.prev,n,n.next)>0&&Se(t.prev,t,t.next)>0)}function Se(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function xs(n,t){return n.x===t.x&&n.y===t.y}function fu(n,t,e,i){let s=ca(Se(n,t,e)),r=ca(Se(n,t,i)),a=ca(Se(e,i,n)),o=ca(Se(e,i,t));return!!(s!==r&&a!==o||s===0&&la(n,e,t)||r===0&&la(n,i,t)||a===0&&la(e,n,i)||o===0&&la(e,t,i))}function la(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ca(n){return n>0?1:n<0?-1:0}function Af(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&fu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function hr(n,t){return Se(n.prev,n,n.next)<0?Se(n,t,n.next)>=0&&Se(n,n.prev,t)>=0:Se(n,t,n.prev)<0||Se(n,n.next,t)<0}function Rf(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function pu(n,t){let e=Pl(n.i,n.x,n.y),i=Pl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function xh(n,t,e,i){let s=Pl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ur(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Pl(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Cf(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Il=class{static triangulate(t,e,i=2){return ff(t,e,i)}},Pi=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];yh(t),vh(i,t);let a=t.length;e.forEach(yh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,vh(i,e[l]);let o=Il.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function yh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function vh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var dr=class n extends ze{constructor(t=new _s([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:f-.1,S=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:Pf,L,y=!1,b,M,A,x;if(p){L=p.getSpacedPoints(h),y=!0,u=!1;let st=p.isCatmullRomCurve3?p.closed:!1;b=p.computeFrenetFrames(h,st),M=new z,A=new z,x=new z}u||(m=0,f=0,_=0,S=0);let E=o.extractPoints(c),C=E.shape,I=E.holes;if(!Pi.isClockWise(C)){C=C.reverse();for(let st=0,ut=I.length;st<ut;st++){let dt=I[st];Pi.isClockWise(dt)&&(I[st]=dt.reverse())}}function V(st){let dt=10000000000000001e-36,R=st[0];for(let Z=1;Z<=st.length;Z++){let mt=Z%st.length,ht=st[mt],ft=ht.x-R.x,Tt=ht.y-R.y,U=ft*ft+Tt*Tt,Wt=Math.max(Math.abs(ht.x),Math.abs(ht.y),Math.abs(R.x),Math.abs(R.y)),Yt=dt*Wt*Wt;if(U<=Yt){st.splice(mt,1),Z--;continue}R=ht}}V(C),I.forEach(V);let F=I.length,H=C;for(let st=0;st<F;st++){let ut=I[st];C=C.concat(ut)}function J(st,ut,dt){return ut||qt("ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(ut,dt)}let X=C.length;function B(st,ut,dt){let R,Z,mt,ht=st.x-ut.x,ft=st.y-ut.y,Tt=dt.x-st.x,U=dt.y-st.y,Wt=ht*ht+ft*ft,Yt=ht*U-ft*Tt;if(Math.abs(Yt)>Number.EPSILON){let T=Math.sqrt(Wt),g=Math.sqrt(Tt*Tt+U*U),W=ut.x-ft/T,$=ut.y+ht/T,K=dt.x-U/g,xt=dt.y+Tt/g,vt=((K-W)*U-(xt-$)*Tt)/(ht*U-ft*Tt);R=W+ht*vt-st.x,Z=$+ft*vt-st.y;let it=R*R+Z*Z;if(it<=2)return new gt(R,Z);mt=Math.sqrt(it/2)}else{let T=!1;ht>Number.EPSILON?Tt>Number.EPSILON&&(T=!0):ht<-Number.EPSILON?Tt<-Number.EPSILON&&(T=!0):Math.sign(ft)===Math.sign(U)&&(T=!0),T?(R=-ft,Z=ht,mt=Math.sqrt(Wt)):(R=ht,Z=ft,mt=Math.sqrt(Wt/2))}return new gt(R/mt,Z/mt)}let N=[];for(let st=0,ut=H.length,dt=ut-1,R=st+1;st<ut;st++,dt++,R++)dt===ut&&(dt=0),R===ut&&(R=0),N[st]=B(H[st],H[dt],H[R]);let P=[],G,ot=N.concat();for(let st=0,ut=F;st<ut;st++){let dt=I[st];G=[];for(let R=0,Z=dt.length,mt=Z-1,ht=R+1;R<Z;R++,mt++,ht++)mt===Z&&(mt=0),ht===Z&&(ht=0),G[R]=B(dt[R],dt[mt],dt[ht]);P.push(G),ot=ot.concat(G)}let rt;if(m===0)rt=Pi.triangulateShape(H,I);else{let st=[],ut=[];for(let dt=0;dt<m;dt++){let R=dt/m,Z=f*Math.cos(R*Math.PI/2),mt=_*Math.sin(R*Math.PI/2)+S;for(let ht=0,ft=H.length;ht<ft;ht++){let Tt=J(H[ht],N[ht],mt);yt(Tt.x,Tt.y,-Z),R===0&&st.push(Tt)}for(let ht=0,ft=F;ht<ft;ht++){let Tt=I[ht];G=P[ht];let U=[];for(let Wt=0,Yt=Tt.length;Wt<Yt;Wt++){let T=J(Tt[Wt],G[Wt],mt);yt(T.x,T.y,-Z),R===0&&U.push(T)}R===0&&ut.push(U)}}rt=Pi.triangulateShape(st,ut)}let Pt=rt.length,Ft=_+S;for(let st=0;st<X;st++){let ut=u?J(C[st],ot[st],Ft):C[st];y?(A.copy(b.normals[0]).multiplyScalar(ut.x),M.copy(b.binormals[0]).multiplyScalar(ut.y),x.copy(L[0]).add(A).add(M),yt(x.x,x.y,x.z)):yt(ut.x,ut.y,0)}for(let st=1;st<=h;st++)for(let ut=0;ut<X;ut++){let dt=u?J(C[ut],ot[ut],Ft):C[ut];y?(A.copy(b.normals[st]).multiplyScalar(dt.x),M.copy(b.binormals[st]).multiplyScalar(dt.y),x.copy(L[st]).add(A).add(M),yt(x.x,x.y,x.z)):yt(dt.x,dt.y,d/h*st)}for(let st=m-1;st>=0;st--){let ut=st/m,dt=f*Math.cos(ut*Math.PI/2),R=_*Math.sin(ut*Math.PI/2)+S;for(let Z=0,mt=H.length;Z<mt;Z++){let ht=J(H[Z],N[Z],R);yt(ht.x,ht.y,d+dt)}for(let Z=0,mt=I.length;Z<mt;Z++){let ht=I[Z];G=P[Z];for(let ft=0,Tt=ht.length;ft<Tt;ft++){let U=J(ht[ft],G[ft],R);y?yt(U.x,U.y+L[h-1].y,L[h-1].x+dt):yt(U.x,U.y,d+dt)}}}Kt(),et();function Kt(){let st=s.length/3;if(u){let ut=0,dt=X*ut;for(let R=0;R<Pt;R++){let Z=rt[R];Dt(Z[2]+dt,Z[1]+dt,Z[0]+dt)}ut=h+m*2,dt=X*ut;for(let R=0;R<Pt;R++){let Z=rt[R];Dt(Z[0]+dt,Z[1]+dt,Z[2]+dt)}}else{for(let ut=0;ut<Pt;ut++){let dt=rt[ut];Dt(dt[2],dt[1],dt[0])}for(let ut=0;ut<Pt;ut++){let dt=rt[ut];Dt(dt[0]+X*h,dt[1]+X*h,dt[2]+X*h)}}i.addGroup(st,s.length/3-st,0)}function et(){let st=s.length/3,ut=0;at(H,ut),ut+=H.length;for(let dt=0,R=I.length;dt<R;dt++){let Z=I[dt];at(Z,ut),ut+=Z.length}i.addGroup(st,s.length/3-st,1)}function at(st,ut){let dt=st.length;for(;--dt>=0;){let R=dt,Z=dt-1;Z<0&&(Z=st.length-1);for(let mt=0,ht=h+m*2;mt<ht;mt++){let ft=X*mt,Tt=X*(mt+1),U=ut+R+ft,Wt=ut+Z+ft,Yt=ut+Z+Tt,T=ut+R+Tt;At(U,Wt,Yt,T)}}}function yt(st,ut,dt){l.push(st),l.push(ut),l.push(dt)}function Dt(st,ut,dt){Ht(st),Ht(ut),Ht(dt);let R=s.length/3,Z=w.generateTopUV(i,s,R-3,R-2,R-1);Zt(Z[0]),Zt(Z[1]),Zt(Z[2])}function At(st,ut,dt,R){Ht(st),Ht(ut),Ht(R),Ht(ut),Ht(dt),Ht(R);let Z=s.length/3,mt=w.generateSideWallUV(i,s,Z-6,Z-3,Z-2,Z-1);Zt(mt[0]),Zt(mt[1]),Zt(mt[3]),Zt(mt[1]),Zt(mt[2]),Zt(mt[3])}function Ht(st){s.push(l[st*3+0]),s.push(l[st*3+1]),s.push(l[st*3+2])}function Zt(st){r.push(st.x),r.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return If(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Rl[s.type]().fromJSON(s)),new n(i,t.options)}},Pf={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new gt(r,a),new gt(o,l),new gt(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],d=t[i*3+2],u=t[s*3],f=t[s*3+1],_=t[s*3+2],S=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new gt(a,1-l),new gt(c,1-d),new gt(u,1-_),new gt(S,1-p)]:[new gt(o,1-l),new gt(h,1-d),new gt(f,1-_),new gt(m,1-p)]}};function If(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var fr=class n extends ze{constructor(t=[new gt(0,-.5),new gt(.5,0),new gt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Qt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new z,u=new gt,f=new z,_=new z,S=new z,m=0,p=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,S.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(S.x,S.y,S.z);break;default:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.x+=S.x,f.y+=S.y,f.z+=S.z,f.normalize(),l.push(f.x,f.y,f.z),S.copy(_)}for(let w=0;w<=e;w++){let L=i+w*h*s,y=Math.sin(L),b=Math.cos(L);for(let M=0;M<=t.length-1;M++){d.x=t[M].x*y,d.y=t[M].y,d.z=t[M].x*b,a.push(d.x,d.y,d.z),u.x=w/e,u.y=M/(t.length-1),o.push(u.x,u.y);let A=l[3*M+0]*y,x=l[3*M+1],E=l[3*M+0]*b;c.push(A,x,E)}}for(let w=0;w<e;w++)for(let L=0;L<t.length-1;L++){let y=L+w*t.length,b=y,M=y+t.length,A=y+t.length+1,x=y+1;r.push(b,M,x),r.push(A,x,M)}this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("uv",new oe(o,2)),this.setAttribute("normal",new oe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var Ce=class n extends ze{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],_=[],S=[],m=[];for(let p=0;p<h;p++){let w=p*u-a;for(let L=0;L<c;L++){let y=L*d-r;_.push(y,-w,0),S.push(0,0,1),m.push(L/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){let L=w+c*p,y=w+c*(p+1),b=w+1+c*(p+1),M=w+1+c*p;f.push(L,y,M),f.push(y,b,M)}this.setIndex(f),this.setAttribute("position",new oe(_,3)),this.setAttribute("normal",new oe(S,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var je=class n extends ze{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new z,u=new z,f=[],_=[],S=[],m=[];for(let p=0;p<=i;p++){let w=[],L=p/i,y=a+L*o,b=t*Math.cos(y),M=Math.sqrt(t*t-b*b),A=0;p===0&&a===0?A=.5/e:p===i&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let E=x/e,C=s+E*r;d.x=-M*Math.cos(C),d.y=b,d.z=M*Math.sin(C),_.push(d.x,d.y,d.z),u.copy(d).normalize(),S.push(u.x,u.y,u.z),m.push(E+A,1-L),w.push(c++)}h.push(w)}for(let p=0;p<i;p++)for(let w=0;w<e;w++){let L=h[p][w+1],y=h[p][w],b=h[p+1][w],M=h[p+1][w+1];(p!==0||a>0)&&f.push(L,y,M),(p!==i-1||l<Math.PI)&&f.push(y,b,M)}this.setIndex(f),this.setAttribute("position",new oe(_,3)),this.setAttribute("normal",new oe(S,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var pr=class n extends ze{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new z,f=new z,_=new z;for(let S=0;S<=i;S++){let m=a+S/i*o;for(let p=0;p<=s;p++){let w=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(w),f.y=(t+e*Math.cos(m))*Math.sin(w),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(w),u.y=t*Math.sin(w),_.subVectors(f,u).normalize(),h.push(_.x,_.y,_.z),d.push(p/s),d.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){let p=(s+1)*S+m-1,w=(s+1)*(S-1)+m-1,L=(s+1)*(S-1)+m,y=(s+1)*S+m;l.push(p,w,y),l.push(w,L,y)}this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function zi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(bh(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(bh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function qe(n){let t={};for(let e=0;e<n.length;e++){let i=zi(n[e]);for(let s in i)t[s]=i[s]}return t}function bh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Lf(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function rc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}var mu={clone:zi,merge:qe},Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fn=class extends ci{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=Nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zi(t.uniforms),this.uniformsGroups=Lf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Jt().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new z().fromArray(s.value);break;case"v4":this.uniforms[i].value=new be().fromArray(s.value);break;case"m3":this.uniforms[i].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[i].value=new me().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Da=class extends fn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ui=class extends ci{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bo,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Na=class extends ci{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ua=class extends ci{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ns(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Sl(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var di=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Fa=class extends di{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tl,endingEnd:Tl}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case wl:r=t,o=2*e-i;break;case Al:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case wl:a=t,l=2*i-e;break;case Al:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,_=(i-e)/(s-e),S=_*_,m=S*_,p=-u*m+2*u*S-u*_,w=(1+u)*m+(-1.5-2*u)*S+(-.5+u)*_+1,L=(-1-f)*m+(1.5+f)*S+.5*_,y=f*m-f*S;for(let b=0;b!==o;++b)r[b]=p*a[h+b]+w*a[c+b]+L*a[l+b]+y*a[d+b];return r}},Oa=class extends di{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Ba=class extends di{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},za=class extends di{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let _=(i-e)/(s-e),S=1-_;for(let m=0;m!==o;++m)r[m]=a[c+m]*S+a[l+m]*_;return r}let u=o*2,f=t-1;for(let _=0;_!==o;++_){let S=a[c+_],m=a[l+_],p=f*u+_*2,w=d[p],L=d[p+1],y=t*u+_*2,b=h[y],M=h[y+1],A=Ff(i,e,w,b,s);r[_]=gu(A,S,L,M,m)}return r}};function gu(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Uf(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function Ff(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=gu(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Uf(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var pn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ns(e,this.TimeBufferType),this.values=ns(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ns(t.times,Array),values:ns(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Sl(t.settings)&&(i.settings={inTangents:ns(t.settings.inTangents,Array),outTangents:ns(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ba(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Fa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new za(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ws:e=this.InterpolantFactoryMethodDiscrete;break;case Sa:e=this.InterpolantFactoryMethodLinear;break;case da:e=this.InterpolantFactoryMethodSmooth;break;case El:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Xt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ws;case this.InterpolantFactoryMethodLinear:return Sa;case this.InterpolantFactoryMethodSmooth:return da;case this.InterpolantFactoryMethodBezier:return El}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Sl(this.settings)&&(Sh(this.settings.inTangents,t),Sh(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){qt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){qt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Md(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){qt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===da,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,u=d-i,f=d+i;for(let _=0;_!==i;++_){let S=e[d+_];if(S!==e[u+_]||S!==e[f+_]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,u=a*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Sl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Sh(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Sa;var fi=class extends pn{constructor(t,e,i){super(t,e,i)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=Ws;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends pn{constructor(t,e,i,s){super(t,e,i,s)}};ka.prototype.ValueTypeName="color";var Ga=class extends pn{constructor(t,e,i,s){super(t,e,i,s)}};Ga.prototype.ValueTypeName="number";var Va=class extends di{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)hn.slerpFlat(r,0,a,c-o,a,c,l);return r}},mr=class extends pn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Va(this.times,this.values,this.getValueSize(),t)}};mr.prototype.ValueTypeName="quaternion";mr.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends pn{constructor(t,e,i){super(t,e,i)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Ws;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ha=class extends pn{constructor(t,e,i,s){super(t,e,i,s)}};Ha.prototype.ValueTypeName="vector";var Wa=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],_=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_u=new Wa,Xa=class{constructor(t){this.manager=t!==void 0?t:_u,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Xa.DEFAULT_MATERIAL_NAME="__DEFAULT";var gr=class extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},_r=class extends gr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Ml=new me,Mh=new z,Eh=new z,qa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ms,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Mh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mh),Eh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Eh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Ml.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Ml,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===cs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Ml)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ha=new z,ua=new hn,Ln=new z,xr=class extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(ha,ua,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,ua,Ln.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(ha,ua,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,ua,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ai=new z,Th=new gt,wh=new gt,Xe=class extends xr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=us*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return us*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ai.x,ai.y).multiplyScalar(-t/ai.z),ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ai.x,ai.y).multiplyScalar(-t/ai.z)}getViewSize(t,e){return this.getViewBounds(t,Th,wh),e.subVectors(wh,Th)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ks*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var ys=class extends xr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ll=class extends qa{constructor(){super(new ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yr=class extends gr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new Ll}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var is=-90,ss=1,Ya=class extends Me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xe(is,ss,t,e);s.layers=this.layers,this.add(s);let r=new Xe(is,ss,t,e);r.layers=this.layers,this.add(r);let a=new Xe(is,ss,t,e);a.layers=this.layers,this.add(a);let o=new Xe(is,ss,t,e);o.layers=this.layers,this.add(o);let l=new Xe(is,ss,t,e);l.layers=this.layers,this.add(l);let c=new Xe(is,ss,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===cs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}},Za=class extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var ac="\\[\\]\\.:\\/",Of=new RegExp("["+ac+"]","g"),oc="[^"+ac+"]",Bf="[^"+ac.replace("\\.","")+"]",zf=/((?:WC+[\/:])*)/.source.replace("WC",oc),kf=/(WCOD+)?/.source.replace("WCOD",Bf),Gf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oc),Vf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oc),Hf=new RegExp("^"+zf+kf+Gf+Vf+"$"),Wf=["material","materials","bones","map"],Dl=class{constructor(t,e,i){let s=i||ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ve=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Of,"")}static parseTrackName(t){let e=Hf.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Wf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ve.Composite=Dl;ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ve.prototype.GetterByBindingType=[ve.prototype._getValue_direct,ve.prototype._getValue_array,ve.prototype._getValue_arrayElement,ve.prototype._getValue_toArray];ve.prototype.SetterByBindingTypeAndVersioning=[[ve.prototype._setValue_direct,ve.prototype._setValue_direct_setNeedsUpdate,ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_array,ve.prototype._setValue_array_setNeedsUpdate,ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_arrayElement,ve.prototype._setValue_arrayElement_setNeedsUpdate,ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ve.prototype._setValue_fromArray,ve.prototype._setValue_fromArray_setNeedsUpdate,ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var lx=new Float32Array(1);var vr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Xt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},vs=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var fc=class fc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};fc.prototype.isMatrix2=!0;var Nl=fc;var br=class extends wn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function lc(n,t,e,i){let s=Xf(i);switch(e){case jl:return n*t;case io:return n*t/s.components*s.byteLength;case so:return n*t/s.components*s.byteLength;case bi:return n*t*2/s.components*s.byteLength;case ro:return n*t*2/s.components*s.byteLength;case Ql:return n*t*3/s.components*s.byteLength;case xn:return n*t*4/s.components*s.byteLength;case ao:return n*t*4/s.components*s.byteLength;case Ar:case Rr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Cr:case Pr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case lo:case ho:return Math.max(n,16)*Math.max(t,8)/4;case oo:case co:return Math.max(n,8)*Math.max(t,8)/2;case uo:case fo:case mo:case go:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case po:case Ir:case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case vo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case bo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case So:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case To:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case wo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Co:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Po:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Lo:case Do:case No:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Uo:case Fo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Lr:case Oo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Xf(n){switch(n){case nn:case Zl:return{byteLength:1,components:1};case Ms:case $l:case Cn:return{byteLength:2,components:1};case eo:case no:return{byteLength:2,components:4};case Rn:case to:case _n:return{byteLength:4,components:1};case Jl:case Kl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zu(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Yf(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<d.length;f++){let _=d[u],S=d[f];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,d[u]=S)}d.length=u+1;for(let f=0,_=d.length;f<_;f++){let S=d[f];n.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$f=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,np=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ip=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ap=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,op=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,_p=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,vp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,kp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$p=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Kp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,om=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_m=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ym=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Em=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Dm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Um=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Om=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,km=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Zm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$m=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Km=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,e0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,n0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,i0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,f0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,m0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,g0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,y0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,w0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:Zf,alphahash_pars_fragment:$f,alphamap_fragment:Jf,alphamap_pars_fragment:Kf,alphatest_fragment:jf,alphatest_pars_fragment:Qf,aomap_fragment:tp,aomap_pars_fragment:ep,batching_pars_vertex:np,batching_vertex:ip,begin_vertex:sp,beginnormal_vertex:rp,bsdfs:ap,iridescence_fragment:op,bumpmap_pars_fragment:lp,clipping_planes_fragment:cp,clipping_planes_pars_fragment:hp,clipping_planes_pars_vertex:up,clipping_planes_vertex:dp,color_fragment:fp,color_pars_fragment:pp,color_pars_vertex:mp,color_vertex:gp,common:_p,cube_uv_reflection_fragment:xp,defaultnormal_vertex:yp,displacementmap_pars_vertex:vp,displacementmap_vertex:bp,emissivemap_fragment:Sp,emissivemap_pars_fragment:Mp,colorspace_fragment:Ep,colorspace_pars_fragment:Tp,envmap_fragment:wp,envmap_common_pars_fragment:Ap,envmap_pars_fragment:Rp,envmap_pars_vertex:Cp,envmap_physical_pars_fragment:kp,envmap_vertex:Pp,fog_vertex:Ip,fog_pars_vertex:Lp,fog_fragment:Dp,fog_pars_fragment:Np,gradientmap_pars_fragment:Up,lightmap_pars_fragment:Fp,lights_lambert_fragment:Op,lights_lambert_pars_fragment:Bp,lights_pars_begin:zp,lights_toon_fragment:Gp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Hp,lights_phong_pars_fragment:Wp,lights_physical_fragment:Xp,lights_physical_pars_fragment:qp,lights_fragment_begin:Yp,lights_fragment_maps:Zp,lights_fragment_end:$p,lightprobes_pars_fragment:Jp,logdepthbuf_fragment:Kp,logdepthbuf_pars_fragment:jp,logdepthbuf_pars_vertex:Qp,logdepthbuf_vertex:tm,map_fragment:em,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:am,morphinstance_vertex:om,morphcolor_vertex:lm,morphnormal_vertex:cm,morphtarget_pars_vertex:hm,morphtarget_vertex:um,normal_fragment_begin:dm,normal_fragment_maps:fm,normal_pars_fragment:pm,normal_pars_vertex:mm,normal_vertex:gm,normalmap_pars_fragment:_m,clearcoat_normal_fragment_begin:xm,clearcoat_normal_fragment_maps:ym,clearcoat_pars_fragment:vm,iridescence_pars_fragment:bm,opaque_fragment:Sm,packing:Mm,premultiplied_alpha_fragment:Em,project_vertex:Tm,dithering_fragment:wm,dithering_pars_fragment:Am,roughnessmap_fragment:Rm,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Pm,shadowmap_pars_vertex:Im,shadowmap_vertex:Lm,shadowmask_pars_fragment:Dm,skinbase_vertex:Nm,skinning_pars_vertex:Um,skinning_vertex:Fm,skinnormal_vertex:Om,specularmap_fragment:Bm,specularmap_pars_fragment:zm,tonemapping_fragment:km,tonemapping_pars_fragment:Gm,transmission_fragment:Vm,transmission_pars_fragment:Hm,uv_pars_fragment:Wm,uv_pars_vertex:Xm,uv_vertex:qm,worldpos_vertex:Ym,background_vert:Zm,background_frag:$m,backgroundCube_vert:Jm,backgroundCube_frag:Km,cube_vert:jm,cube_frag:Qm,depth_vert:t0,depth_frag:e0,distance_vert:n0,distance_frag:i0,equirect_vert:s0,equirect_frag:r0,linedashed_vert:a0,linedashed_frag:o0,meshbasic_vert:l0,meshbasic_frag:c0,meshlambert_vert:h0,meshlambert_frag:u0,meshmatcap_vert:d0,meshmatcap_frag:f0,meshnormal_vert:p0,meshnormal_frag:m0,meshphong_vert:g0,meshphong_frag:_0,meshphysical_vert:x0,meshphysical_frag:y0,meshtoon_vert:v0,meshtoon_frag:b0,points_vert:S0,points_frag:M0,shadow_vert:E0,shadow_frag:T0,sprite_vert:w0,sprite_frag:A0},wt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},zn={basic:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:qe([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:qe([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:qe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:qe([wt.points,wt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:qe([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:qe([wt.common,wt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:qe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:qe([wt.sprite,wt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:qe([wt.common,wt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:qe([wt.lights,wt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};zn.physical={uniforms:qe([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var Go={r:0,b:0,g:0},R0=new me,ku=new $t;ku.set(-1,0,0,0,1,0,0,0,1);function C0(n,t,e,i,s,r){let a=new Jt(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(w){let L=w.isScene===!0?w.background:null;if(L&&L.isTexture){let y=w.backgroundBlurriness>0;L=t.get(L,y)}return L}function _(w){let L=!1,y=f(w);y===null?m(a,o):y&&y.isColor&&(m(y,1),L=!0);let b=n.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||L)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(w,L){let y=f(L);y&&(y.isCubeTexture||y.mapping===Tr)?(c===void 0&&(c=new Oe(new jt(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:zi(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(L.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ku),c.material.toneMapped=se.getTransfer(y.colorSpace)!==he,(h!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Oe(new Ce(2,2),new fn({name:"BackgroundMaterial",uniforms:zi(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,L){w.getRGB(Go,rc(n)),e.buffers.color.setClear(Go.r,Go.g,Go.b,L,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,L=1){a.set(w),o=L,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:_,addToRenderList:S,dispose:p}}function P0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(I,O,V,F,H){let J=!1,X=d(I,F,V,O);r!==X&&(r=X,c(r.object)),J=f(I,F,V,H),J&&_(I,F,V,H),H!==null&&t.update(H,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,y(I,O,V,F),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function h(I){return n.deleteVertexArray(I)}function d(I,O,V,F){let H=F.wireframe===!0,J=i[O.id];J===void 0&&(J={},i[O.id]=J);let X=I.isInstancedMesh===!0?I.id:0,B=J[X];B===void 0&&(B={},J[X]=B);let N=B[V.id];N===void 0&&(N={},B[V.id]=N);let P=N[H];return P===void 0&&(P=u(l()),N[H]=P),P}function u(I){let O=[],V=[],F=[];for(let H=0;H<e;H++)O[H]=0,V[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:V,attributeDivisors:F,object:I,attributes:{},index:null}}function f(I,O,V,F){let H=r.attributes,J=O.attributes,X=0,B=V.getAttributes();for(let N in B)if(B[N].location>=0){let G=H[N],ot=J[N];if(ot===void 0&&(N==="instanceMatrix"&&I.instanceMatrix&&(ot=I.instanceMatrix),N==="instanceColor"&&I.instanceColor&&(ot=I.instanceColor)),G===void 0||G.attribute!==ot||ot&&G.data!==ot.data)return!0;X++}return r.attributesNum!==X||r.index!==F}function _(I,O,V,F){let H={},J=O.attributes,X=0,B=V.getAttributes();for(let N in B)if(B[N].location>=0){let G=J[N];G===void 0&&(N==="instanceMatrix"&&I.instanceMatrix&&(G=I.instanceMatrix),N==="instanceColor"&&I.instanceColor&&(G=I.instanceColor));let ot={};ot.attribute=G,G&&G.data&&(ot.data=G.data),H[N]=ot,X++}r.attributes=H,r.attributesNum=X,r.index=F}function S(){let I=r.newAttributes;for(let O=0,V=I.length;O<V;O++)I[O]=0}function m(I){p(I,0)}function p(I,O){let V=r.newAttributes,F=r.enabledAttributes,H=r.attributeDivisors;V[I]=1,F[I]===0&&(n.enableVertexAttribArray(I),F[I]=1),H[I]!==O&&(n.vertexAttribDivisor(I,O),H[I]=O)}function w(){let I=r.newAttributes,O=r.enabledAttributes;for(let V=0,F=O.length;V<F;V++)O[V]!==I[V]&&(n.disableVertexAttribArray(V),O[V]=0)}function L(I,O,V,F,H,J,X){X===!0?n.vertexAttribIPointer(I,O,V,H,J):n.vertexAttribPointer(I,O,V,F,H,J)}function y(I,O,V,F){S();let H=F.attributes,J=V.getAttributes(),X=O.defaultAttributeValues;for(let B in J){let N=J[B];if(N.location>=0){let P=H[B];if(P===void 0&&(B==="instanceMatrix"&&I.instanceMatrix&&(P=I.instanceMatrix),B==="instanceColor"&&I.instanceColor&&(P=I.instanceColor)),P!==void 0){let G=P.normalized,ot=P.itemSize,rt=t.get(P);if(rt===void 0)continue;let Pt=rt.buffer,Ft=rt.type,Kt=rt.bytesPerElement,et=Ft===n.INT||Ft===n.UNSIGNED_INT||P.gpuType===to;if(P.isInterleavedBufferAttribute){let at=P.data,yt=at.stride,Dt=P.offset;if(at.isInstancedInterleavedBuffer){for(let At=0;At<N.locationSize;At++)p(N.location+At,at.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let At=0;At<N.locationSize;At++)m(N.location+At);n.bindBuffer(n.ARRAY_BUFFER,Pt);for(let At=0;At<N.locationSize;At++)L(N.location+At,ot/N.locationSize,Ft,G,yt*Kt,(Dt+ot/N.locationSize*At)*Kt,et)}else{if(P.isInstancedBufferAttribute){for(let at=0;at<N.locationSize;at++)p(N.location+at,P.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let at=0;at<N.locationSize;at++)m(N.location+at);n.bindBuffer(n.ARRAY_BUFFER,Pt);for(let at=0;at<N.locationSize;at++)L(N.location+at,ot/N.locationSize,Ft,G,ot*Kt,ot/N.locationSize*at*Kt,et)}}else if(X!==void 0){let G=X[B];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(N.location,G);break;case 3:n.vertexAttrib3fv(N.location,G);break;case 4:n.vertexAttrib4fv(N.location,G);break;default:n.vertexAttrib1fv(N.location,G)}}}}w()}function b(){E();for(let I in i){let O=i[I];for(let V in O){let F=O[V];for(let H in F){let J=F[H];for(let X in J)h(J[X].object),delete J[X];delete F[H]}}delete i[I]}}function M(I){if(i[I.id]===void 0)return;let O=i[I.id];for(let V in O){let F=O[V];for(let H in F){let J=F[H];for(let X in J)h(J[X].object),delete J[X];delete F[H]}}delete i[I.id]}function A(I){for(let O in i){let V=i[O];for(let F in V){let H=V[F];if(H[I.id]===void 0)continue;let J=H[I.id];for(let X in J)h(J[X].object),delete J[X];delete H[I.id]}}}function x(I){for(let O in i){let V=i[O],F=I.isInstancedMesh===!0?I.id:0,H=V[F];if(H!==void 0){for(let J in H){let X=H[J];for(let B in X)h(X[B].object),delete X[B];delete H[J]}delete V[F],Object.keys(V).length===0&&delete i[O]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:m,disableUnusedAttributes:w}}function I0(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function L0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==xn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===Cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==nn&&A!==_n&&!x&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Xt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),L=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:L,maxFragmentUniforms:y,maxSamples:b,samples:M}}function D0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new ln,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let _=d.clippingPlanes,S=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{let w=r?0:i,L=w*4,y=p.clippingState||null;l.value=y,y=h(_,u,L,f);for(let b=0;b!==L;++b)y[b]=e[b];p.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,_){let S=d!==null?d.length:0,m=null;if(S!==0){if(m=l.value,_!==!0||m===null){let p=f+S*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let L=0,y=f;L!==S;++L,y+=4)a.copy(d[L]).applyMatrix4(w,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}var ws=4,N0=6,U0=20,F0=256,Dr=new ys,xu=new Jt,pc=null,mc=0,gc=0,_c=!1,O0=new z,ki=new z,Ho=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=O0}=r;pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(pc,mc,gc),this._renderer.xr.enabled=_c,t.scissorTest=!1,Ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xi||t.mapping===Oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pc=this._renderer.getRenderTarget(),mc=this._renderer.getActiveCubeFace(),gc=this._renderer.getActiveMipmapLevel(),_c=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:Cn,format:xn,colorSpace:Xs,depthBuffer:!1},s=yu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yu(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=B0(r)),this._blurMaterial=k0(r,t,e),this._ggxMaterial=z0(r,t,e)}return s}_compileMaterial(t){let e=new Oe(new ze,t);this._renderer.compile(e,Dr)}_sceneToCubeUV(t,e,i,s,r){let l=new Xe(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(xu),d.toneMapping=An,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Oe(new jt,new Ae({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,m=S.material,p=!1,w=t.background;w?w.isColor&&(m.color.copy(w),t.background=null,p=!0):(m.color.copy(xu),p=!0);for(let L=0;L<6;L++){let y=L%3;y===0?(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[L],r.y,r.z)):y===1?(l.up.set(0,0,c[L]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[L],r.z)):(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[L]));let b=this._cubeSize;Ts(s,y*b,L>2?b:0,b,b),d.setRenderTarget(s),p&&d.render(S,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=w}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===xi||t.mapping===Oi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Ts(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Dr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:_}=this,S=this._sizeLods[i],m=3*S*(i>_-ws?i-_+ws:0),p=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=_-e,Ts(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(o,Dr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=_-i,Ts(t,m,p,3*S,2*S),s.setRenderTarget(t),s.render(o,Dr)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-ws?s-this._lodMax+ws:0),u=4*(this._cubeSize-h);Ts(e,d,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Dr)}};function B0(n){let t=[],e=[],i=n,s=n-ws+1+N0;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,_=new Float32Array(f*u*d),S=new Float32Array(f*u*d);for(let p=0;p<d;p++){let w=p%3*2/3-1,L=p>2?0:-1,y=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];_.set(y,f*u*p);for(let b=0;b<u;b++){let M=h[b*2]*2-1,A=h[b*2+1]*2-1;p===0?ki.set(1,A,M):p===1?ki.set(-M,1,-A):p===2?ki.set(-M,A,1):p===3?ki.set(-1,A,-M):p===4?ki.set(-M,-1,A):ki.set(M,A,-1),ki.toArray(S,(p*u+b)*f)}}let m=new ze;m.setAttribute("position",new cn(_,f)),m.setAttribute("outputDirection",new cn(S,f)),e.push(new Oe(m,null)),i>ws&&i--}return{lodMeshes:e,sizeLods:t}}function yu(n,t,e){let i=new en(n,t,e);return i.texture.mapping=Tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ts(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function z0(n,t,e){return new fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:F0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function k0(n,t,e){return new fn({name:"SphericalGaussianBlur",defines:{SAMPLES:U0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function vu(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function bu(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function qo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Wo=class extends en{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new nr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new jt(5,5,5),r=new fn({name:"CubemapFromEquirect",uniforms:zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ke,blending:On});r.uniforms.tEquirect.value=e;let a=new Oe(s,r),o=e.minFilter;return e.minFilter===yi&&(e.minFilter=Be),new Ya(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function G0(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Ka||f===ja)if(t.has(u)){let _=t.get(u).texture;return o(_,u.mapping)}else{let _=u.image;if(_&&_.height>0){let S=new Wo(_.height);return S.fromEquirectangularTexture(n,u),t.set(u,S),u.addEventListener("dispose",c),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,_=f===Ka||f===ja,S=f===xi||f===Oi;if(_||S){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Ho(n)),m=_?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let w=u.image;return _&&w&&w.height>0||S&&w&&l(w)?(i===null&&(i=new Ho(n)),m=_?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Ka?u.mapping=xi:f===ja&&(u.mapping=Oi),u}function l(u){let f=0,_=6;for(let S=0;S<_;S++)u[S]!==void 0&&f++;return f===_}function c(u){let f=u.target;f.removeEventListener("dispose",c);let _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function V0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Ii("WebGLRenderer: "+i+" extension not supported."),s}}}function H0(n,t,e,i){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let _ in u.attributes)t.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,_=d.attributes.position,S=0;if(_===void 0)return;if(f!==null){let w=f.array;S=f.version;for(let L=0,y=w.length;L<y;L+=3){let b=w[L+0],M=w[L+1],A=w[L+2];u.push(b,M,M,A,A,b)}}else{let w=_.array;S=_.version;for(let L=0,y=w.length/3-1;L<y;L+=3){let b=L+0,M=L+1,A=L+2;u.push(b,M,M,A,A,b)}}let m=new(_.count>=65535?Qs:js)(u,1);m.version=S;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function W0(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){n.drawElements(i,u,r,d*a),e.update(u,i,1)}function c(d,u,f){f!==0&&(n.drawElementsInstanced(i,u,r,d*a,f),e.update(u,i,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,f);let S=0;for(let m=0;m<f;m++)S+=u[m];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function X0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function q0(n,t,e){let i=new WeakMap,s=new be;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==d){let E=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],L=0;f===!0&&(L=1),_===!0&&(L=2),S===!0&&(L=3);let y=o.attributes.position.count*L,b=1;y>t.maxTextureSize&&(b=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let M=new Float32Array(y*b*4*d),A=new Zs(M,y,b,d);A.type=_n,A.needsUpdate=!0;let x=L*4;for(let C=0;C<d;C++){let I=m[C],O=p[C],V=w[C],F=y*b*4*C;for(let H=0;H<I.count;H++){let J=H*x;f===!0&&(s.fromBufferAttribute(I,H),M[F+J+0]=s.x,M[F+J+1]=s.y,M[F+J+2]=s.z,M[F+J+3]=0),_===!0&&(s.fromBufferAttribute(O,H),M[F+J+4]=s.x,M[F+J+5]=s.y,M[F+J+6]=s.z,M[F+J+7]=0),S===!0&&(s.fromBufferAttribute(V,H),M[F+J+8]=s.x,M[F+J+9]=s.y,M[F+J+10]=s.z,M[F+J+11]=V.itemSize===4?s.w:1)}}u={count:d,texture:A,size:new gt(y,b)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let S=0;S<c.length;S++)f+=c[S];let _=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Y0(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Z0={[Gl]:"LINEAR_TONE_MAPPING",[Vl]:"REINHARD_TONE_MAPPING",[Hl]:"CINEON_TONE_MAPPING",[Er]:"ACES_FILMIC_TONE_MAPPING",[Xl]:"AGX_TONE_MAPPING",[ql]:"NEUTRAL_TONE_MAPPING",[Wl]:"CUSTOM_TONE_MAPPING"};function $0(n,t,e,i,s,r){let a=new en(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new ze;c.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new oe([0,2,0,0,2,0],2));let h=new Da({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Oe(c,h),u=new ys(-1,1,1,-1,0,1),f=null,_=null,S=!1,m,p=null,w=[],L=!1;this.setSize=function(y,b){a.setSize(y,b),o!==null&&o.setSize(y,b),l!==null&&l.setSize(y,b);for(let M=0;M<w.length;M++){let A=w[M];A.setSize&&A.setSize(y,b)}},this.setEffects=function(y){w=y,L=w.length>0&&w[0].isRenderPass===!0;let b=a.width,M=a.height;w.length>0&&o===null&&(o=new en(b,M,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),l=new en(b,M,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<w.length;A++){let x=w[A];x.setSize&&x.setSize(b,M)}},this.begin=function(y,b){if(S||y.toneMapping===An&&w.length===0)return!1;if(p=b,b!==null){let M=b.width,A=b.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return L===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=An,!0},this.hasRenderPass=function(){return L},this.end=function(y,b){y.toneMapping=m,S=!0;let M=a,A=o;for(let x=0;x<w.length;x++){let E=w[x];E.enabled!==!1&&(E.render(y,A,M,b),E.needsSwap!==!1&&(M=A,A=A===o?l:o))}if(f!==y.outputColorSpace||_!==y.toneMapping){f=y.outputColorSpace,_=y.toneMapping,h.defines={},se.getTransfer(f)===he&&(h.defines.SRGB_TRANSFER="");let x=Z0[_];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(p),y.render(d,u),p=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Gu=new Ke,vc=new ui(1,1),Vu=new Zs,Hu=new Ta,Wu=new nr,Su=[],Mu=[],Eu=new Float32Array(16),Tu=new Float32Array(9),wu=new Float32Array(4);function Rs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Su[s];if(r===void 0&&(r=new Float32Array(s),Su[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ie(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Yo(n,t){let e=Mu[t];e===void 0&&(e=new Int32Array(t),Mu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function J0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function K0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),Ie(e,t)}}function j0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),Ie(e,t)}}function Q0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),Ie(e,t)}}function tg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,i))return;wu.set(i),n.uniformMatrix2fv(this.addr,!1,wu),Ie(e,i)}}function eg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,i))return;Tu.set(i),n.uniformMatrix3fv(this.addr,!1,Tu),Ie(e,i)}}function ng(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Pe(e,i))return;Eu.set(i),n.uniformMatrix4fv(this.addr,!1,Eu),Ie(e,i)}}function ig(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function sg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),Ie(e,t)}}function rg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),Ie(e,t)}}function ag(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),Ie(e,t)}}function og(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function lg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),Ie(e,t)}}function cg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),Ie(e,t)}}function hg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),Ie(e,t)}}function ug(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(vc.compareFunction=e.isReversedDepthBuffer()?ko:zo,r=vc):r=Gu,e.setTexture2D(t||r,s)}function dg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Hu,s)}function fg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Wu,s)}function pg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Vu,s)}function mg(n){switch(n){case 5126:return J0;case 35664:return K0;case 35665:return j0;case 35666:return Q0;case 35674:return tg;case 35675:return eg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return ag;case 5125:return og;case 36294:return lg;case 36295:return cg;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return ug;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}function gg(n,t){n.uniform1fv(this.addr,t)}function _g(n,t){let e=Rs(t,this.size,2);n.uniform2fv(this.addr,e)}function xg(n,t){let e=Rs(t,this.size,3);n.uniform3fv(this.addr,e)}function yg(n,t){let e=Rs(t,this.size,4);n.uniform4fv(this.addr,e)}function vg(n,t){let e=Rs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function bg(n,t){let e=Rs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Sg(n,t){let e=Rs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Mg(n,t){n.uniform1iv(this.addr,t)}function Eg(n,t){n.uniform2iv(this.addr,t)}function Tg(n,t){n.uniform3iv(this.addr,t)}function wg(n,t){n.uniform4iv(this.addr,t)}function Ag(n,t){n.uniform1uiv(this.addr,t)}function Rg(n,t){n.uniform2uiv(this.addr,t)}function Cg(n,t){n.uniform3uiv(this.addr,t)}function Pg(n,t){n.uniform4uiv(this.addr,t)}function Ig(n,t,e){let i=this.cache,s=t.length,r=Yo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=vc:a=Gu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Lg(n,t,e){let i=this.cache,s=t.length,r=Yo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Hu,r[a])}function Dg(n,t,e){let i=this.cache,s=t.length,r=Yo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Wu,r[a])}function Ng(n,t,e){let i=this.cache,s=t.length,r=Yo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Ie(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Vu,r[a])}function Ug(n){switch(n){case 5126:return gg;case 35664:return _g;case 35665:return xg;case 35666:return yg;case 35674:return vg;case 35675:return bg;case 35676:return Sg;case 5124:case 35670:return Mg;case 35667:case 35671:return Eg;case 35668:case 35672:return Tg;case 35669:case 35673:return wg;case 5125:return Ag;case 36294:return Rg;case 36295:return Cg;case 36296:return Pg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Lg;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Ng}}var bc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=mg(e.type)}},Sc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ug(e.type)}},Mc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},xc=/(\w+)(\])?(\[|\.)?/g;function Au(n,t){n.seq.push(t),n.map[t.id]=t}function Fg(n,t,e){let i=n.name,s=i.length;for(xc.lastIndex=0;;){let r=xc.exec(i),a=xc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Au(e,c===void 0?new bc(o,n,t):new Sc(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new Mc(o),Au(e,d)),e=d}}}var As=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Fg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Ru(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Og=37297,Bg=0;function zg(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Cu=new $t;function kg(n){se._getMatrix(Cu,se.workingColorSpace,n);let t=`mat3( ${Cu.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(n)){case qs:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Pu(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+zg(n.getShaderSource(t),o)}else return r}function Gg(n,t){let e=kg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Vg={[Gl]:"Linear",[Vl]:"Reinhard",[Hl]:"Cineon",[Er]:"ACESFilmic",[Xl]:"AgX",[ql]:"Neutral",[Wl]:"Custom"};function Hg(n,t){let e=Vg[t];return e===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Vo=new z;function Wg(){se.getLuminanceCoefficients(Vo);let n=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ur).join(`
`)}function qg(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Yg(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ur(n){return n!==""}function Iu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ec(n){return n.replace(Zg,Jg)}var $g=new Map;function Jg(n,t){let e=ee[t];if(e===void 0){let i=$g.get(t);if(i!==void 0)e=ee[i],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ec(e)}var Kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(n){return n.replace(Kg,jg)}function jg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Nu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Qg={[Sr]:"SHADOWMAP_TYPE_PCF",[bs]:"SHADOWMAP_TYPE_VSM"};function t_(n){return Qg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var e_={[xi]:"ENVMAP_TYPE_CUBE",[Oi]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE_UV"};function n_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":e_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var i_={[Oi]:"ENVMAP_MODE_REFRACTION"};function s_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":i_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var r_={[kl]:"ENVMAP_BLENDING_MULTIPLY",[Yh]:"ENVMAP_BLENDING_MIX",[Zh]:"ENVMAP_BLENDING_ADD"};function a_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":r_[n.combine]||"ENVMAP_BLENDING_NONE"}function o_(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function l_(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=t_(e),c=n_(e),h=s_(e),d=a_(e),u=o_(e),f=Xg(e),_=qg(r),S=s.createProgram(),m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ur).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ur).join(`
`),p.length>0&&(p+=`
`)):(m=[Nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ur).join(`
`),p=[Nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?ee.tonemapping_pars_fragment:"",e.toneMapping!==An?Hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,Gg("linearToOutputTexel",e.outputColorSpace),Wg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ur).join(`
`)),a=Ec(a),a=Iu(a,e),a=Lu(a,e),o=Ec(o),o=Iu(o,e),o=Lu(o,e),a=Du(a),o=Du(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let L=w+m+a,y=w+p+o,b=Ru(s,s.VERTEX_SHADER,L),M=Ru(s,s.FRAGMENT_SHADER,y);s.attachShader(S,b),s.attachShader(S,M),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function A(I){if(n.debug.checkShaderErrors){let O=s.getProgramInfoLog(S)||"",V=s.getShaderInfoLog(b)||"",F=s.getShaderInfoLog(M)||"",H=O.trim(),J=V.trim(),X=F.trim(),B=!0,N=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,b,M);else{let P=Pu(s,b,"vertex"),G=Pu(s,M,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+P+`
`+G)}else H!==""?Xt("WebGLProgram: Program Info Log:",H):(J===""||X==="")&&(N=!1);N&&(I.diagnostics={runnable:B,programLog:H,vertexShader:{log:J,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(b),s.deleteShader(M),x=new As(s,S),E=Yg(s,S)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(S,Og)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Bg++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=b,this.fragmentShader=M,this}var c_=0,Tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new wc(t),e.set(t,i)),i}},wc=class{constructor(t){this.id=c_++,this.code=t,this.usedTimes=0}};function h_(n){return n===bi||n===Ir||n===Lr}function u_(n,t,e,i,s,r){let a=new $s,o=new Tc,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,E,C,I,O,V){let F=I.fog,H=O.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,B=t.get(x.envMap||J,X),N=B&&B.mapping===Tr?B.image.height:null,P=f[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Xt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let G=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ot=G!==void 0?G.length:0,rt=0;H.morphAttributes.position!==void 0&&(rt=1),H.morphAttributes.normal!==void 0&&(rt=2),H.morphAttributes.color!==void 0&&(rt=3);let Pt,Ft,Kt,et;if(P){let ge=zn[P];Pt=ge.vertexShader,Ft=ge.fragmentShader}else{Pt=x.vertexShader,Ft=x.fragmentShader;let ge=o.getVertexShaderStage(x),le=o.getFragmentShaderStage(x);o.update(x,ge,le),Kt=ge.id,et=le.id}let at=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Dt=O.isInstancedMesh===!0,At=O.isBatchedMesh===!0,Ht=!!x.map,Zt=!!x.matcap,st=!!B,ut=!!x.aoMap,dt=!!x.lightMap,R=!!x.bumpMap&&x.wireframe===!1,Z=!!x.normalMap,mt=!!x.displacementMap,ht=!!x.emissiveMap,ft=!!x.metalnessMap,Tt=!!x.roughnessMap,U=x.anisotropy>0,Wt=x.clearcoat>0,Yt=x.dispersion>0,T=x.retroreflectivity>0,g=x.iridescence>0,W=x.sheen>0,$=x.transmission>0,K=U&&!!x.anisotropyMap,xt=Wt&&!!x.clearcoatMap,vt=Wt&&!!x.clearcoatNormalMap,it=Wt&&!!x.clearcoatRoughnessMap,lt=g&&!!x.iridescenceMap,bt=g&&!!x.iridescenceThicknessMap,Ot=W&&!!x.sheenColorMap,St=W&&!!x.sheenRoughnessMap,Mt=!!x.specularMap,Bt=!!x.specularColorMap,Vt=!!x.specularIntensityMap,tt=$&&!!x.transmissionMap,D=$&&!!x.thicknessMap,nt=!!x.gradientMap,Q=!!x.alphaMap,_t=x.alphaTest>0,pt=!!x.alphaHash,ct=!!x.extensions,zt=An;x.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(zt=n.toneMapping);let kt={shaderID:P,shaderType:x.type,shaderName:x.name,vertexShader:Pt,fragmentShader:Ft,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:et,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:At,batchingColor:At&&O._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&O.instanceColor!==null,instancingMorph:Dt&&O.morphTexture!==null,outputColorSpace:at===null?n.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:se.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ht,matcap:Zt,envMap:st,envMapMode:st&&B.mapping,envMapCubeUVHeight:N,aoMap:ut,lightMap:dt,bumpMap:R,normalMap:Z,displacementMap:mt,emissiveMap:ht,normalMapObjectSpace:Z&&x.normalMapType===Kh,normalMapTangentSpace:Z&&x.normalMapType===Bo,packedNormalMap:Z&&x.normalMapType===Bo&&h_(x.normalMap.format),metalnessMap:ft,roughnessMap:Tt,anisotropy:U,anisotropyMap:K,clearcoat:Wt,clearcoatMap:xt,clearcoatNormalMap:vt,clearcoatRoughnessMap:it,dispersion:Yt,retroreflection:T,iridescence:g,iridescenceMap:lt,iridescenceThicknessMap:bt,sheen:W,sheenColorMap:Ot,sheenRoughnessMap:St,specularMap:Mt,specularColorMap:Bt,specularIntensityMap:Vt,transmission:$,transmissionMap:tt,thicknessMap:D,gradientMap:nt,opaque:x.transparent===!1&&x.blending===Ss&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:_t,alphaHash:pt,combine:x.combine,mapUv:Ht&&_(x.map.channel),aoMapUv:ut&&_(x.aoMap.channel),lightMapUv:dt&&_(x.lightMap.channel),bumpMapUv:R&&_(x.bumpMap.channel),normalMapUv:Z&&_(x.normalMap.channel),displacementMapUv:mt&&_(x.displacementMap.channel),emissiveMapUv:ht&&_(x.emissiveMap.channel),metalnessMapUv:ft&&_(x.metalnessMap.channel),roughnessMapUv:Tt&&_(x.roughnessMap.channel),anisotropyMapUv:K&&_(x.anisotropyMap.channel),clearcoatMapUv:xt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:vt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:St&&_(x.sheenRoughnessMap.channel),specularMapUv:Mt&&_(x.specularMap.channel),specularColorMapUv:Bt&&_(x.specularColorMap.channel),specularIntensityMapUv:Vt&&_(x.specularIntensityMap.channel),transmissionMapUv:tt&&_(x.transmissionMap.channel),thicknessMapUv:D&&_(x.thicknessMap.channel),alphaMapUv:Q&&_(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Z||U),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!H.attributes.uv&&(Ht||Q),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&Z===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:yt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:rt,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:zt,decodeVideoTexture:Ht&&x.map.isVideoTexture===!0&&se.getTransfer(x.map.colorSpace)===he,decodeVideoTextureEmissive:ht&&x.emissiveMap.isVideoTexture===!0&&se.getTransfer(x.emissiveMap.colorSpace)===he,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ge,flipSided:x.side===ke,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ct&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ct&&x.extensions.multiDraw===!0||At)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return kt.vertexUv1s=l.has(1),kt.vertexUv2s=l.has(2),kt.vertexUv3s=l.has(3),l.clear(),kt}function m(x){let E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)E.push(C),E.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(p(E,x),w(E,x),E.push(n.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function w(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function L(x){let E=f[x.type],C;if(E){let I=zn[E];C=mu.clone(I.uniforms)}else C=x.uniforms;return C}function y(x,E){let C=h.get(E);return C!==void 0?++C.usedTimes:(C=new l_(n,E,x,s),c.push(C),h.set(E,C)),C}function b(x){if(--x.usedTimes===0){let E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function M(x){o.remove(x)}function A(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:L,acquireProgram:y,releaseProgram:b,releaseShaderCache:M,programs:c,dispose:A}}function d_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function f_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Uu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Fu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,_,S,m,p){let w=n[t];return w===void 0?(w={id:u.id,object:u,geometry:f,material:_,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:p},n[t]=w):(w.id=u.id,w.object=u,w.geometry=f,w.material=_,w.materialVariant=a(u),w.groupOrder=S,w.renderOrder=u.renderOrder,w.z=m,w.group=p),t++,w}function l(u,f,_,S,m,p,w){w.reversedDepth===!0&&(m=-m);let L=o(u,f,_,S,m,p);_.transmission>0?i.push(L):_.transparent===!0?s.push(L):e.push(L)}function c(u,f,_,S,m,p){let w=o(u,f,_,S,m,p);_.transmission>0?i.unshift(w):_.transparent===!0?s.unshift(w):e.unshift(w)}function h(u,f){e.length>1&&e.sort(u||f_),i.length>1&&i.sort(f||Uu),s.length>1&&s.sort(f||Uu)}function d(){for(let u=t,f=n.length;u<f;u++){let _=n[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function p_(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Fu,n.set(i,[a])):s>=r.length?(a=new Fu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function m_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new Jt};break;case"SpotLight":e={position:new z,direction:new z,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[t.id]=e,e}}}function g_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var __=0;function x_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function y_(n){let t=new m_,e=g_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);let s=new z,r=new me,a=new me;function o(c){let h=0,d=0,u=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let f=0,_=0,S=0,m=0,p=0,w=0,L=0,y=0,b=0,M=0,A=0,x=0,E=0,C=0;c.sort(x_);for(let O=0,V=c.length;O<V;O++){let F=c[O],H=F.color,J=F.intensity,X=F.distance,B=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===bi?B=F.shadow.map.texture:B=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=H.r*J,d+=H.g*J,u+=H.b*J;else if(F.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(F.sh.coefficients[N],J);C++}else if(F.isSunLight){let N=t.get(F);if(N.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let P=F.shadow,G=e.get(F);G.shadowIntensity=P.intensity,G.shadowBias=P.bias,G.shadowNormalBias=P.normalBias,G.shadowRadius=P.radius,G.shadowMapSize.copy(P.mapSize).multiply(P.getFrameExtents()),i.sunShadow[_]=G,i.sunShadowMap[_]=B;let ot=P.getViewportCount();for(let rt=0;rt<ot;rt++)i.sunShadowMatrix[S+rt]=P.getMatrix(rt),i.sunShadowCascade[S+rt]=P._cascadeData[rt];S+=ot,_++}i.sun[f]=N,f++}else if(F.isDirectionalLight){let N=t.get(F);if(N.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let P=F.shadow,G=e.get(F);G.shadowIntensity=P.intensity,G.shadowBias=P.bias,G.shadowNormalBias=P.normalBias,G.shadowRadius=P.radius,G.shadowMapSize=P.mapSize,i.directionalShadow[m]=G,i.directionalShadowMap[m]=B,i.directionalShadowMatrix[m]=F.shadow.matrix,b++}i.directional[m]=N,m++}else if(F.isSpotLight){let N=t.get(F);N.position.setFromMatrixPosition(F.matrixWorld),N.color.copy(H).multiplyScalar(J),N.distance=X,N.coneCos=Math.cos(F.angle),N.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),N.decay=F.decay,i.spot[w]=N;let P=F.shadow;if(F.map&&(i.spotLightMap[x]=F.map,x++,P.updateMatrices(F),F.castShadow&&E++),i.spotLightMatrix[w]=P.matrix,F.castShadow){let G=e.get(F);G.shadowIntensity=P.intensity,G.shadowBias=P.bias,G.shadowNormalBias=P.normalBias,G.shadowRadius=P.radius,G.shadowMapSize=P.mapSize,i.spotShadow[w]=G,i.spotShadowMap[w]=B,A++}w++}else if(F.isRectAreaLight){let N=t.get(F);N.color.copy(H).multiplyScalar(J),N.halfWidth.set(F.width*.5,0,0),N.halfHeight.set(0,F.height*.5,0),i.rectArea[L]=N,L++}else if(F.isPointLight){let N=t.get(F);if(N.color.copy(F.color).multiplyScalar(F.intensity),N.distance=F.distance,N.decay=F.decay,F.castShadow){let P=F.shadow,G=e.get(F);G.shadowIntensity=P.intensity,G.shadowBias=P.bias,G.shadowNormalBias=P.normalBias,G.shadowRadius=P.radius,G.shadowMapSize=P.mapSize,G.shadowCameraNear=P.camera.near,G.shadowCameraFar=P.camera.far,i.pointShadow[p]=G,i.pointShadowMap[p]=B,i.pointShadowMatrix[p]=F.shadow.matrix,M++}i.point[p]=N,p++}else if(F.isHemisphereLight){let N=t.get(F);N.skyColor.copy(F.color).multiplyScalar(J),N.groundColor.copy(F.groundColor).multiplyScalar(J),i.hemi[y]=N,y++}}L>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let I=i.hash;(I.sunLength!==f||I.directionalLength!==m||I.pointLength!==p||I.spotLength!==w||I.rectAreaLength!==L||I.hemiLength!==y||I.numSunShadows!==_||I.numDirectionalShadows!==b||I.numPointShadows!==M||I.numSpotShadows!==A||I.numSpotMaps!==x||I.numLightProbes!==C)&&(i.sun.length=f,i.directional.length=m,i.spot.length=w,i.rectArea.length=L,i.point.length=p,i.hemi.length=y,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.directionalShadowMatrix.length=b,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+x-E,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,I.sunLength=f,I.directionalLength=m,I.pointLength=p,I.spotLength=w,I.rectAreaLength=L,I.hemiLength=y,I.numSunShadows=_,I.numDirectionalShadows=b,I.numPointShadows=M,I.numSpotShadows=A,I.numSpotMaps=x,I.numLightProbes=C,i.version=__++)}function l(c,h){let d=0,u=0,f=0,_=0,S=0,m=0,p=h.matrixWorldInverse;for(let w=0,L=c.length;w<L;w++){let y=c[w];if(y.isSunLight){let b=i.sun[d];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let b=i.directional[u];b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),u++}else if(y.isSpotLight){let b=i.spot[_];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),_++}else if(y.isRectAreaLight){let b=i.rectArea[S];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),S++}else if(y.isPointLight){let b=i.point[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let b=i.hemi[m];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function Ou(n){let t=new y_(n),e=[],i=[],s=[];function r(u){d.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function v_(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ou(n),t.set(s,[o])):r>=a.length?(o=new Ou(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var b_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,S_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,M_=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],E_=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Bu=new me,Nr=new z,yc=new z;function T_(n,t,e){let i=new ms,s=new gt,r=new gt,a=new be,o=new Na,l=new Ua,c={},h=e.maxTextureSize,d={[_i]:ke,[ke]:_i,[Ge]:Ge},u=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:b_,fragmentShader:S_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let _=new ze;_.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new Oe(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sr;let p=this.type;this.render=function(M,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===Ja&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Sr);let E=n.getRenderTarget(),C=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),O=n.state;O.setBlending(On),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let V=p!==this.type;V&&A.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(H=>H.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,H=M.length;F<H;F++){let J=M[F],X=J.shadow;if(X===void 0){Xt("WebGLShadowMap:",J,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let B=X.getFrameExtents();s.multiply(B),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/B.x),s.x=r.x*B.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/B.y),s.y=r.y*B.y,X.mapSize.y=r.y));let N=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=N,X.map===null||V===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===bs){if(J.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new en(s.x,s.y,{format:bi,type:Cn,minFilter:Be,magFilter:Be,generateMipmaps:!1}),X.map.texture.name=J.name+".shadowMap",X.map.depthTexture=new ui(s.x,s.y,_n),X.map.depthTexture.name=J.name+".shadowMapDepth",X.map.depthTexture.format=Nn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Fe,X.map.depthTexture.magFilter=Fe}else J.isPointLight?(X.map=new Wo(s.x),X.map.depthTexture=new wa(s.x,Rn)):(X.map=new en(s.x,s.y),X.map.depthTexture=new ui(s.x,s.y,Rn)),X.map.depthTexture.name=J.name+".shadowMap",X.map.depthTexture.format=Nn,this.type===Sr?(X.map.depthTexture.compareFunction=N?ko:zo,X.map.depthTexture.minFilter=Be,X.map.depthTexture.magFilter=Be):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=Fe,X.map.depthTexture.magFilter=Fe);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==s.x||X.map.height!==s.y)&&X.map.setSize(s.x,s.y);let P=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();J.isPointLight!==!0&&X.updateMatrices(J,x);for(let G=0;G<P;G++){let ot=X.getCamera(G);if(J.isPointLight){let rt=X.camera,Pt=X.matrix,Ft=J.distance||rt.far;Ft!==rt.far&&(rt.far=Ft,rt.updateProjectionMatrix()),Nr.setFromMatrixPosition(J.matrixWorld),rt.position.copy(Nr),yc.copy(rt.position),yc.add(M_[G]),rt.up.copy(E_[G]),rt.lookAt(yc),rt.updateMatrixWorld(),Pt.makeTranslation(-Nr.x,-Nr.y,-Nr.z),Bu.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Bu,rt.coordinateSystem,rt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,G),n.clear();else{G===0&&(n.setRenderTarget(X.map),n.clear());let rt=X.getViewport(G);a.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),O.viewport(a)}i=X.getFrustum(G),y(A,x,ot,J,this.type)}X.isPointLightShadow!==!0&&this.type===bs&&w(X,x),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(E,C,I)};function w(M,A){let x=t.update(S);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new en(s.x,s.y,{format:bi,type:Cn}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(A,null,x,u,S,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(A,null,x,f,S,null)}function L(M,A,x,E){let C=null,I=x.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(I!==void 0)C=I;else if(C=x.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=C.uuid,V=A.uuid,F=c[O];F===void 0&&(F={},c[O]=F);let H=F[V];H===void 0&&(H=C.clone(),F[V]=H,A.addEventListener("dispose",b)),C=H}if(C.visible=A.visible,C.wireframe=A.wireframe,E===bs?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:d[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let O=n.properties.get(C);O.light=x}return C}function y(M,A,x,E,C){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===bs)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,M.matrixWorld);let V=t.update(M),F=M.material;if(Array.isArray(F)){let H=V.groups;for(let J=0,X=H.length;J<X;J++){let B=H[J],N=F[B.materialIndex];if(N&&N.visible){let P=L(M,N,E,C);M.onBeforeShadow(n,M,A,x,V,P,B),n.renderBufferDirect(x,null,V,P,M,B),M.onAfterShadow(n,M,A,x,V,P,B)}}}else if(F.visible){let H=L(M,F,E,C);M.onBeforeShadow(n,M,A,x,V,H,null),n.renderBufferDirect(x,null,V,H,M,null),M.onAfterShadow(n,M,A,x,V,H,null)}}let O=M.children;for(let V=0,F=O.length;V<F;V++)y(O[V],A,x,E,C)}function b(M){M.target.removeEventListener("dispose",b);for(let x in c){let E=c[x],C=M.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function w_(n,t){function e(){let D=!1,nt=new be,Q=null,_t=new be(0,0,0,0);return{setMask:function(pt){Q!==pt&&!D&&(n.colorMask(pt,pt,pt,pt),Q=pt)},setLocked:function(pt){D=pt},setClear:function(pt,ct,zt,kt,ge){ge===!0&&(pt*=kt,ct*=kt,zt*=kt),nt.set(pt,ct,zt,kt),_t.equals(nt)===!1&&(n.clearColor(pt,ct,zt,kt),_t.copy(nt))},reset:function(){D=!1,Q=null,_t.set(-1,0,0,0)}}}function i(){let D=!1,nt=!1,Q=null,_t=null,pt=null;return{setReversed:function(ct){if(nt!==ct){let zt=t.get("EXT_clip_control");ct?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT),nt=ct;let kt=pt;pt=null,this.setClear(kt)}},getReversed:function(){return nt},setTest:function(ct){ct?at(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(ct){Q!==ct&&!D&&(n.depthMask(ct),Q=ct)},setFunc:function(ct){if(nt&&(ct=cu[ct]),_t!==ct){switch(ct){case pa:n.depthFunc(n.NEVER);break;case ma:n.depthFunc(n.ALWAYS);break;case ga:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case _a:n.depthFunc(n.EQUAL);break;case xa:n.depthFunc(n.GEQUAL);break;case ya:n.depthFunc(n.GREATER);break;case va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_t=ct}},setLocked:function(ct){D=ct},setClear:function(ct){pt!==ct&&(pt=ct,nt&&(ct=1-ct),n.clearDepth(ct))},reset:function(){D=!1,Q=null,_t=null,pt=null,nt=!1}}}function s(){let D=!1,nt=null,Q=null,_t=null,pt=null,ct=null,zt=null,kt=null,ge=null;return{setTest:function(le){D||(le?at(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(le){nt!==le&&!D&&(n.stencilMask(le),nt=le)},setFunc:function(le,bn,Pn){(Q!==le||_t!==bn||pt!==Pn)&&(n.stencilFunc(le,bn,Pn),Q=le,_t=bn,pt=Pn)},setOp:function(le,bn,Pn){(ct!==le||zt!==bn||kt!==Pn)&&(n.stencilOp(le,bn,Pn),ct=le,zt=bn,kt=Pn)},setLocked:function(le){D=le},setClear:function(le){ge!==le&&(n.clearStencil(le),ge=le)},reset:function(){D=!1,nt=null,Q=null,_t=null,pt=null,ct=null,zt=null,kt=null,ge=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,_=[],S=null,m=!1,p=null,w=null,L=null,y=null,b=null,M=null,A=null,x=new Jt(0,0,0),E=0,C=!1,I=null,O=null,V=null,F=null,H=null,J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,B=0,N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(N)[1]),X=B>=1):N.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),X=B>=2);let P=null,G={},ot=n.getParameter(n.SCISSOR_BOX),rt=n.getParameter(n.VIEWPORT),Pt=new be().fromArray(ot),Ft=new be().fromArray(rt);function Kt(D,nt,Q,_t){let pt=new Uint8Array(4),ct=n.createTexture();n.bindTexture(D,ct),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let zt=0;zt<Q;zt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,_t,0,n.RGBA,n.UNSIGNED_BYTE,pt):n.texImage2D(nt+zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pt);return ct}let et={};et[n.TEXTURE_2D]=Kt(n.TEXTURE_2D,n.TEXTURE_2D,1),et[n.TEXTURE_CUBE_MAP]=Kt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[n.TEXTURE_2D_ARRAY]=Kt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),et[n.TEXTURE_3D]=Kt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(n.DEPTH_TEST),a.setFunc(os),R(!1),Z(Ul),at(n.CULL_FACE),ut(On);function at(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function yt(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Dt(D,nt){return u[D]!==nt?(n.bindFramebuffer(D,nt),u[D]=nt,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=nt),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function At(D,nt){let Q=_,_t=!1;if(D){Q=f.get(nt),Q===void 0&&(Q=[],f.set(nt,Q));let pt=D.textures;if(Q.length!==pt.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let ct=0,zt=pt.length;ct<zt;ct++)Q[ct]=n.COLOR_ATTACHMENT0+ct;Q.length=pt.length,_t=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,_t=!0);_t&&n.drawBuffers(Q)}function Ht(D){return S!==D?(n.useProgram(D),S=D,!0):!1}let Zt={[Fi]:n.FUNC_ADD,[Ph]:n.FUNC_SUBTRACT,[Ih]:n.FUNC_REVERSE_SUBTRACT};Zt[Lh]=n.MIN,Zt[Dh]=n.MAX;let st={[Nh]:n.ZERO,[Uh]:n.ONE,[Fh]:n.SRC_COLOR,[Bl]:n.SRC_ALPHA,[Vh]:n.SRC_ALPHA_SATURATE,[kh]:n.DST_COLOR,[Bh]:n.DST_ALPHA,[Oh]:n.ONE_MINUS_SRC_COLOR,[zl]:n.ONE_MINUS_SRC_ALPHA,[Gh]:n.ONE_MINUS_DST_COLOR,[zh]:n.ONE_MINUS_DST_ALPHA,[Hh]:n.CONSTANT_COLOR,[Wh]:n.ONE_MINUS_CONSTANT_COLOR,[Xh]:n.CONSTANT_ALPHA,[qh]:n.ONE_MINUS_CONSTANT_ALPHA};function ut(D,nt,Q,_t,pt,ct,zt,kt,ge,le){if(D===On){m===!0&&(yt(n.BLEND),m=!1);return}if(m===!1&&(at(n.BLEND),m=!0),D!==Ch){if(D!==p||le!==C){if((w!==Fi||b!==Fi)&&(n.blendEquation(n.FUNC_ADD),w=Fi,b=Fi),le)switch(D){case Ss:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mr:n.blendFunc(n.ONE,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ol:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:qt("WebGLState: Invalid blending: ",D);break}else switch(D){case Ss:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fl:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ol:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",D);break}L=null,y=null,M=null,A=null,x.set(0,0,0),E=0,p=D,C=le}return}pt=pt||nt,ct=ct||Q,zt=zt||_t,(nt!==w||pt!==b)&&(n.blendEquationSeparate(Zt[nt],Zt[pt]),w=nt,b=pt),(Q!==L||_t!==y||ct!==M||zt!==A)&&(n.blendFuncSeparate(st[Q],st[_t],st[ct],st[zt]),L=Q,y=_t,M=ct,A=zt),(kt.equals(x)===!1||ge!==E)&&(n.blendColor(kt.r,kt.g,kt.b,ge),x.copy(kt),E=ge),p=D,C=!1}function dt(D,nt){D.side===Ge?yt(n.CULL_FACE):at(n.CULL_FACE);let Q=D.side===ke;nt&&(Q=!Q),R(Q),D.blending===Ss&&D.transparent===!1?ut(On):ut(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let _t=D.stencilWrite;o.setTest(_t),_t&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ht(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function R(D){I!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),I=D)}function Z(D){D!==Ah?(at(n.CULL_FACE),D!==O&&(D===Ul?n.cullFace(n.BACK):D===Rh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),O=D}function mt(D){D!==V&&(X&&n.lineWidth(D),V=D)}function ht(D,nt,Q){D?(at(n.POLYGON_OFFSET_FILL),(F!==nt||H!==Q)&&(F=nt,H=Q,a.getReversed()&&(nt=-nt),n.polygonOffset(nt,Q))):yt(n.POLYGON_OFFSET_FILL)}function ft(D){D?at(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function Tt(D){D===void 0&&(D=n.TEXTURE0+J-1),P!==D&&(n.activeTexture(D),P=D)}function U(D,nt,Q){Q===void 0&&(P===null?Q=n.TEXTURE0+J-1:Q=P);let _t=G[Q];_t===void 0&&(_t={type:void 0,texture:void 0},G[Q]=_t),(_t.type!==D||_t.texture!==nt)&&(P!==Q&&(n.activeTexture(Q),P=Q),n.bindTexture(D,nt||et[D]),_t.type=D,_t.texture=nt)}function Wt(){let D=G[P];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Yt(){try{n.compressedTexImage2D(...arguments)}catch(D){qt("WebGLState:",D)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(D){qt("WebGLState:",D)}}function g(){try{n.texSubImage2D(...arguments)}catch(D){qt("WebGLState:",D)}}function W(){try{n.texSubImage3D(...arguments)}catch(D){qt("WebGLState:",D)}}function $(){try{n.compressedTexSubImage2D(...arguments)}catch(D){qt("WebGLState:",D)}}function K(){try{n.compressedTexSubImage3D(...arguments)}catch(D){qt("WebGLState:",D)}}function xt(){try{n.texStorage2D(...arguments)}catch(D){qt("WebGLState:",D)}}function vt(){try{n.texStorage3D(...arguments)}catch(D){qt("WebGLState:",D)}}function it(){try{n.texImage2D(...arguments)}catch(D){qt("WebGLState:",D)}}function lt(){try{n.texImage3D(...arguments)}catch(D){qt("WebGLState:",D)}}function bt(D){return d[D]!==void 0?d[D]:n.getParameter(D)}function Ot(D,nt){d[D]!==nt&&(n.pixelStorei(D,nt),d[D]=nt)}function St(D){Pt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Pt.copy(D))}function Mt(D){Ft.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Ft.copy(D))}function Bt(D,nt){let Q=c.get(nt);Q===void 0&&(Q=new WeakMap,c.set(nt,Q));let _t=Q.get(D);_t===void 0&&(_t=n.getUniformBlockIndex(nt,D.name),Q.set(D,_t))}function Vt(D,nt){let _t=c.get(nt).get(D);l.get(nt)!==_t&&(n.uniformBlockBinding(nt,_t,D.__bindingPointIndex),l.set(nt,_t))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},P=null,G={},u={},f=new WeakMap,_=[],S=null,m=!1,p=null,w=null,L=null,y=null,b=null,M=null,A=null,x=new Jt(0,0,0),E=0,C=!1,I=null,O=null,V=null,F=null,H=null,Pt.set(0,0,n.canvas.width,n.canvas.height),Ft.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:at,disable:yt,bindFramebuffer:Dt,drawBuffers:At,useProgram:Ht,setBlending:ut,setMaterial:dt,setFlipSided:R,setCullFace:Z,setLineWidth:mt,setPolygonOffset:ht,setScissorTest:ft,activeTexture:Tt,bindTexture:U,unbindTexture:Wt,compressedTexImage2D:Yt,compressedTexImage3D:T,texImage2D:it,texImage3D:lt,pixelStorei:Ot,getParameter:bt,updateUBOMapping:Bt,uniformBlockBinding:Vt,texStorage2D:xt,texStorage3D:vt,texSubImage2D:g,texSubImage3D:W,compressedTexSubImage2D:$,compressedTexSubImage3D:K,scissor:St,viewport:Mt,reset:tt}}function A_(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,h=new WeakMap,d=new Set,u,f=new WeakMap,_=!1;try{_=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,g){return _?new OffscreenCanvas(T,g):Ys("canvas")}function m(T,g,W){let $=1,K=Yt(T);if((K.width>W||K.height>W)&&($=W/Math.max(K.width,K.height)),$<1)if(typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&T instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&T instanceof ImageBitmap||typeof VideoFrame!="undefined"&&T instanceof VideoFrame){let xt=Math.floor($*K.width),vt=Math.floor($*K.height);u===void 0&&(u=S(xt,vt));let it=g?S(xt,vt):u;return it.width=xt,it.height=vt,it.getContext("2d").drawImage(T,0,0,xt,vt),Xt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+xt+"x"+vt+")."),it}else return"data"in T&&Xt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),T;return T}function p(T){return T.generateMipmaps}function w(T){n.generateMipmap(T)}function L(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(T,g,W,$,K,xt=!1){if(T!==null){if(n[T]!==void 0)return n[T];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let vt;$&&(vt=t.get("EXT_texture_norm16"),vt||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=g;if(g===n.RED&&(W===n.FLOAT&&(it=n.R32F),W===n.HALF_FLOAT&&(it=n.R16F),W===n.UNSIGNED_BYTE&&(it=n.R8),W===n.UNSIGNED_SHORT&&vt&&(it=vt.R16_EXT),W===n.SHORT&&vt&&(it=vt.R16_SNORM_EXT)),g===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(it=n.R8UI),W===n.UNSIGNED_SHORT&&(it=n.R16UI),W===n.UNSIGNED_INT&&(it=n.R32UI),W===n.BYTE&&(it=n.R8I),W===n.SHORT&&(it=n.R16I),W===n.INT&&(it=n.R32I)),g===n.RG&&(W===n.FLOAT&&(it=n.RG32F),W===n.HALF_FLOAT&&(it=n.RG16F),W===n.UNSIGNED_BYTE&&(it=n.RG8),W===n.UNSIGNED_SHORT&&vt&&(it=vt.RG16_EXT),W===n.SHORT&&vt&&(it=vt.RG16_SNORM_EXT)),g===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(it=n.RG8UI),W===n.UNSIGNED_SHORT&&(it=n.RG16UI),W===n.UNSIGNED_INT&&(it=n.RG32UI),W===n.BYTE&&(it=n.RG8I),W===n.SHORT&&(it=n.RG16I),W===n.INT&&(it=n.RG32I)),g===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(it=n.RGB8UI),W===n.UNSIGNED_SHORT&&(it=n.RGB16UI),W===n.UNSIGNED_INT&&(it=n.RGB32UI),W===n.BYTE&&(it=n.RGB8I),W===n.SHORT&&(it=n.RGB16I),W===n.INT&&(it=n.RGB32I)),g===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(it=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(it=n.RGBA16UI),W===n.UNSIGNED_INT&&(it=n.RGBA32UI),W===n.BYTE&&(it=n.RGBA8I),W===n.SHORT&&(it=n.RGBA16I),W===n.INT&&(it=n.RGBA32I)),g===n.RGB&&(W===n.UNSIGNED_SHORT&&vt&&(it=vt.RGB16_EXT),W===n.SHORT&&vt&&(it=vt.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(it=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(it=n.R11F_G11F_B10F)),g===n.RGBA){let lt=xt?qs:se.getTransfer(K);W===n.FLOAT&&(it=n.RGBA32F),W===n.HALF_FLOAT&&(it=n.RGBA16F),W===n.UNSIGNED_BYTE&&(it=lt===he?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&vt&&(it=vt.RGBA16_EXT),W===n.SHORT&&vt&&(it=vt.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(it=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(it=n.RGB5_A1)}return(it===n.R16F||it===n.R32F||it===n.RG16F||it===n.RG32F||it===n.RGBA16F||it===n.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function b(T,g){let W;return T?g===null||g===Rn||g===Es?W=n.DEPTH24_STENCIL8:g===_n?W=n.DEPTH32F_STENCIL8:g===Ms&&(W=n.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Rn||g===Es?W=n.DEPTH_COMPONENT24:g===_n?W=n.DEPTH_COMPONENT32F:g===Ms&&(W=n.DEPTH_COMPONENT16),W}function M(T,g){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Fe&&T.minFilter!==Be?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function A(T){let g=T.target;g.removeEventListener("dispose",A),E(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&d.delete(g)}function x(T){let g=T.target;g.removeEventListener("dispose",x),I(g)}function E(T){let g=i.get(T);if(g.__webglInit===void 0)return;let W=T.source,$=f.get(W);if($){let K=$[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(T),Object.keys($).length===0&&f.delete(W)}i.remove(T)}function C(T){let g=i.get(T);n.deleteTexture(g.__webglTexture);let W=T.source,$=f.get(W);delete $[g.__cacheKey],a.memory.textures--}function I(T){let g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(g.__webglFramebuffer[$]))for(let K=0;K<g.__webglFramebuffer[$].length;K++)n.deleteFramebuffer(g.__webglFramebuffer[$][K]);else n.deleteFramebuffer(g.__webglFramebuffer[$]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[$])}else{if(Array.isArray(g.__webglFramebuffer))for(let $=0;$<g.__webglFramebuffer.length;$++)n.deleteFramebuffer(g.__webglFramebuffer[$]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let $=0;$<g.__webglColorRenderbuffer.length;$++)g.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[$]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let W=T.textures;for(let $=0,K=W.length;$<K;$++){let xt=i.get(W[$]);xt.__webglTexture&&(n.deleteTexture(xt.__webglTexture),a.memory.textures--),i.remove(W[$])}i.remove(T)}let O=0;function V(){O=0}function F(){return O}function H(T){O=T}function J(){let T=O;return T>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,T}function X(T){let g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function B(T,g){let W=i.get(T);if(T.isVideoTexture&&U(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&W.__version!==T.version){let $=T.image;if($===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{yt(W,T,g);return}}else T.isExternalTexture&&(W.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+g)}function N(T,g){let W=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&W.__version!==T.version){yt(W,T,g);return}else T.isExternalTexture&&(W.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+g)}function P(T,g){let W=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&W.__version!==T.version){yt(W,T,g);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+g)}function G(T,g){let W=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&W.__version!==T.version){Dt(W,T,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+g)}let ot={[ls]:n.REPEAT,[Dn]:n.CLAMP_TO_EDGE,[ba]:n.MIRRORED_REPEAT},rt={[Fe]:n.NEAREST,[$h]:n.NEAREST_MIPMAP_NEAREST,[wr]:n.NEAREST_MIPMAP_LINEAR,[Be]:n.LINEAR,[Qa]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},Pt={[Qh]:n.NEVER,[su]:n.ALWAYS,[tu]:n.LESS,[zo]:n.LEQUAL,[eu]:n.EQUAL,[ko]:n.GEQUAL,[nu]:n.GREATER,[iu]:n.NOTEQUAL};function Ft(T,g){if(g.type===_n&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Be||g.magFilter===Qa||g.magFilter===wr||g.magFilter===yi||g.minFilter===Be||g.minFilter===Qa||g.minFilter===wr||g.minFilter===yi)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ot[g.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ot[g.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ot[g.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,rt[g.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,rt[g.minFilter]),g.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Pt[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Fe||g.minFilter!==wr&&g.minFilter!==yi||g.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Kt(T,g){let W=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",A));let $=g.source,K=f.get($);K===void 0&&(K={},f.set($,K));let xt=X(g);if(xt!==T.__cacheKey){K[xt]===void 0&&(K[xt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),K[xt].usedTimes++;let vt=K[T.__cacheKey];vt!==void 0&&(K[T.__cacheKey].usedTimes--,vt.usedTimes===0&&C(g)),T.__cacheKey=xt,T.__webglTexture=K[xt].texture}return W}function et(T,g,W){return Math.floor(Math.floor(T/W)/g)}function at(T,g,W,$){let xt=T.updateRanges;if(xt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,W,$,g.data);else{xt.sort((Ot,St)=>Ot.start-St.start);let vt=0;for(let Ot=1;Ot<xt.length;Ot++){let St=xt[vt],Mt=xt[Ot],Bt=St.start+St.count,Vt=et(Mt.start,g.width,4),tt=et(St.start,g.width,4);Mt.start<=Bt+1&&Vt===tt&&et(Mt.start+Mt.count-1,g.width,4)===Vt?St.count=Math.max(St.count,Mt.start+Mt.count-St.start):(++vt,xt[vt]=Mt)}xt.length=vt+1;let it=e.getParameter(n.UNPACK_ROW_LENGTH),lt=e.getParameter(n.UNPACK_SKIP_PIXELS),bt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Ot=0,St=xt.length;Ot<St;Ot++){let Mt=xt[Ot],Bt=Math.floor(Mt.start/4),Vt=Math.ceil(Mt.count/4),tt=Bt%g.width,D=Math.floor(Bt/g.width),nt=Vt,Q=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(n.UNPACK_SKIP_ROWS,D),e.texSubImage2D(n.TEXTURE_2D,0,tt,D,nt,Q,W,$,g.data)}T.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,it),e.pixelStorei(n.UNPACK_SKIP_PIXELS,lt),e.pixelStorei(n.UNPACK_SKIP_ROWS,bt)}}function yt(T,g,W){let $=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&($=n.TEXTURE_3D);let K=Kt(T,g),xt=g.source;e.bindTexture($,T.__webglTexture,n.TEXTURE0+W);let vt=i.get(xt);if(xt.version!==vt.__version||K===!0){if(e.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap!="undefined"&&g.image instanceof ImageBitmap)===!1){let Q=se.getPrimaries(se.workingColorSpace),_t=g.colorSpace===$n?null:se.getPrimaries(g.colorSpace),pt=g.colorSpace===$n||Q===_t?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment);let lt=m(g.image,!1,s.maxTextureSize);lt=Wt(g,lt);let bt=r.convert(g.format,g.colorSpace),Ot=r.convert(g.type),St=y(g.internalFormat,bt,Ot,g.normalized,g.colorSpace,g.isVideoTexture);Ft($,g);let Mt,Bt=g.mipmaps,Vt=g.isVideoTexture!==!0,tt=vt.__version===void 0||K===!0,D=xt.dataReady,nt=M(g,lt);if(g.isDepthTexture)St=b(g.format===vi,g.type),tt&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,St,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,St,lt.width,lt.height,0,bt,Ot,null));else if(g.isDataTexture)if(Bt.length>0){Vt&&tt&&e.texStorage2D(n.TEXTURE_2D,nt,St,Bt[0].width,Bt[0].height);for(let Q=0,_t=Bt.length;Q<_t;Q++)Mt=Bt[Q],Vt?D&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,Mt.width,Mt.height,bt,Ot,Mt.data):e.texImage2D(n.TEXTURE_2D,Q,St,Mt.width,Mt.height,0,bt,Ot,Mt.data);g.generateMipmaps=!1}else Vt?(tt&&e.texStorage2D(n.TEXTURE_2D,nt,St,lt.width,lt.height),D&&at(g,lt,bt,Ot)):e.texImage2D(n.TEXTURE_2D,0,St,lt.width,lt.height,0,bt,Ot,lt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Vt&&tt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,St,Bt[0].width,Bt[0].height,lt.depth);for(let Q=0,_t=Bt.length;Q<_t;Q++)if(Mt=Bt[Q],g.format!==xn)if(bt!==null)if(Vt){if(D)if(g.layerUpdates.size>0){let pt=lc(Mt.width,Mt.height,g.format,g.type);for(let ct of g.layerUpdates){let zt=Mt.data.subarray(ct*pt/Mt.data.BYTES_PER_ELEMENT,(ct+1)*pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,ct,Mt.width,Mt.height,1,bt,zt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,Mt.width,Mt.height,lt.depth,bt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,St,Mt.width,Mt.height,lt.depth,0,Mt.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,Mt.width,Mt.height,lt.depth,bt,Ot,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Q,St,Mt.width,Mt.height,lt.depth,0,bt,Ot,Mt.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Vt&&tt&&e.texStorage2D(n.TEXTURE_2D,nt,St,Bt[0].width,Bt[0].height);for(let Q=0,_t=Bt.length;Q<_t;Q++)Mt=Bt[Q],g.format!==xn?bt!==null?Vt?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,Mt.width,Mt.height,bt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,Q,St,Mt.width,Mt.height,0,Mt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?D&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,Mt.width,Mt.height,bt,Ot,Mt.data):e.texImage2D(n.TEXTURE_2D,Q,St,Mt.width,Mt.height,0,bt,Ot,Mt.data)}else if(g.isDataArrayTexture)if(Vt){if(tt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,St,lt.width,lt.height,lt.depth),D)if(g.layerUpdates.size>0){let Q=lc(lt.width,lt.height,g.format,g.type);for(let _t of g.layerUpdates){let pt=lt.data.subarray(_t*Q/lt.data.BYTES_PER_ELEMENT,(_t+1)*Q/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_t,lt.width,lt.height,1,bt,Ot,pt)}g.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,bt,Ot,lt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,St,lt.width,lt.height,lt.depth,0,bt,Ot,lt.data);else if(g.isData3DTexture)Vt?(tt&&e.texStorage3D(n.TEXTURE_3D,nt,St,lt.width,lt.height,lt.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,bt,Ot,lt.data)):e.texImage3D(n.TEXTURE_3D,0,St,lt.width,lt.height,lt.depth,0,bt,Ot,lt.data);else if(g.isFramebufferTexture){if(tt)if(Vt)e.texStorage2D(n.TEXTURE_2D,nt,St,lt.width,lt.height);else{let Q=lt.width,_t=lt.height;for(let pt=0;pt<nt;pt++)e.texImage2D(n.TEXTURE_2D,pt,St,Q,_t,0,bt,Ot,null),Q>>=1,_t>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in n){let Q=n.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),lt.parentNode!==Q){Q.appendChild(lt),d.add(g),Q.onpaint=_t=>{let pt=_t.changedElements;for(let ct of d)pt.includes(ct.image)&&(ct.needsUpdate=!0)},Q.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,lt);else{let pt=n.RGBA,ct=n.RGBA,zt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,pt,ct,zt,lt)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Vt&&tt){let Q=Yt(Bt[0]);e.texStorage2D(n.TEXTURE_2D,nt,St,Q.width,Q.height)}for(let Q=0,_t=Bt.length;Q<_t;Q++)Mt=Bt[Q],Vt?D&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,bt,Ot,Mt):e.texImage2D(n.TEXTURE_2D,Q,St,bt,Ot,Mt);g.generateMipmaps=!1}else if(Vt){if(tt){let Q=Yt(lt);e.texStorage2D(n.TEXTURE_2D,nt,St,Q.width,Q.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt,Ot,lt)}else e.texImage2D(n.TEXTURE_2D,0,St,bt,Ot,lt);p(g)&&w($),vt.__version=xt.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Dt(T,g,W){if(g.image.length!==6)return;let $=Kt(T,g),K=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+W);let xt=i.get(K);if(K.version!==xt.__version||$===!0){e.activeTexture(n.TEXTURE0+W);let vt=se.getPrimaries(se.workingColorSpace),it=g.colorSpace===$n?null:se.getPrimaries(g.colorSpace),lt=g.colorSpace===$n||vt===it?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);let bt=g.isCompressedTexture||g.image[0].isCompressedTexture,Ot=g.image[0]&&g.image[0].isDataTexture,St=[];for(let ct=0;ct<6;ct++)!bt&&!Ot?St[ct]=m(g.image[ct],!0,s.maxCubemapSize):St[ct]=Ot?g.image[ct].image:g.image[ct],St[ct]=Wt(g,St[ct]);let Mt=St[0],Bt=r.convert(g.format,g.colorSpace),Vt=r.convert(g.type),tt=y(g.internalFormat,Bt,Vt,g.normalized,g.colorSpace),D=g.isVideoTexture!==!0,nt=xt.__version===void 0||$===!0,Q=K.dataReady,_t=M(g,Mt);Ft(n.TEXTURE_CUBE_MAP,g);let pt;if(bt){D&&nt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,tt,Mt.width,Mt.height);for(let ct=0;ct<6;ct++){pt=St[ct].mipmaps;for(let zt=0;zt<pt.length;zt++){let kt=pt[zt];g.format!==xn?Bt!==null?D?Q&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt,0,0,kt.width,kt.height,Bt,kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt,tt,kt.width,kt.height,0,kt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt,0,0,kt.width,kt.height,Bt,Vt,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt,tt,kt.width,kt.height,0,Bt,Vt,kt.data)}}}else{if(pt=g.mipmaps,D&&nt){pt.length>0&&_t++;let ct=Yt(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,tt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(Ot){D?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,St[ct].width,St[ct].height,Bt,Vt,St[ct].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,tt,St[ct].width,St[ct].height,0,Bt,Vt,St[ct].data);for(let zt=0;zt<pt.length;zt++){let ge=pt[zt].image[ct].image;D?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt+1,0,0,ge.width,ge.height,Bt,Vt,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt+1,tt,ge.width,ge.height,0,Bt,Vt,ge.data)}}else{D?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Bt,Vt,St[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,tt,Bt,Vt,St[ct]);for(let zt=0;zt<pt.length;zt++){let kt=pt[zt];D?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt+1,0,0,Bt,Vt,kt.image[ct]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,zt+1,tt,Bt,Vt,kt.image[ct])}}}p(g)&&w(n.TEXTURE_CUBE_MAP),xt.__version=K.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function At(T,g,W,$,K,xt){let vt=r.convert(W.format,W.colorSpace),it=r.convert(W.type),lt=y(W.internalFormat,vt,it,W.normalized,W.colorSpace),bt=i.get(g),Ot=i.get(W);if(Ot.__renderTarget=g,!bt.__hasExternalTextures){let St=Math.max(1,g.width>>xt),Mt=Math.max(1,g.height>>xt);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,xt,lt,St,Mt,g.depth,0,vt,it,null):e.texImage2D(K,xt,lt,St,Mt,0,vt,it,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Tt(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,K,Ot.__webglTexture,0,ft(g)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,K,Ot.__webglTexture,xt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ht(T,g,W){if(n.bindRenderbuffer(n.RENDERBUFFER,T),g.depthBuffer){let $=g.depthTexture,K=$&&$.isDepthTexture?$.type:null,xt=b(g.stencilBuffer,K),vt=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Tt(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(g),xt,g.width,g.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(g),xt,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,xt,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,T)}else{let $=g.textures;for(let K=0;K<$.length;K++){let xt=$[K],vt=r.convert(xt.format,xt.colorSpace),it=r.convert(xt.type),lt=y(xt.internalFormat,vt,it,xt.normalized,xt.colorSpace);Tt(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft(g),lt,g.width,g.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft(g),lt,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,lt,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Zt(T,g,W){let $=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=i.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),$){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,g.depthTexture);let bt=r.convert(g.depthTexture.format),Ot=r.convert(g.depthTexture.type),St;g.depthTexture.format===Nn?St=n.DEPTH_COMPONENT24:g.depthTexture.format===vi&&(St=n.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,St,g.width,g.height,0,bt,Ot,null)}}else B(g.depthTexture,0);let xt=K.__webglTexture,vt=ft(g),it=$?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,lt=g.depthTexture.format===vi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===Nn)Tt(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,it,xt,0,vt):n.framebufferTexture2D(n.FRAMEBUFFER,lt,it,xt,0);else if(g.depthTexture.format===vi)Tt(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,it,xt,0,vt):n.framebufferTexture2D(n.FRAMEBUFFER,lt,it,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(T){let g=i.get(T),W=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){let $=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),$){let K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,$.removeEventListener("dispose",K)};$.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=$}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(W)for(let $=0;$<6;$++)Zt(g.__webglFramebuffer[$],T,$);else{let $=T.texture.mipmaps;$&&$.length>0?Zt(g.__webglFramebuffer[0],T,0):Zt(g.__webglFramebuffer,T,0)}else if(W){g.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[$]),g.__webglDepthbuffer[$]===void 0)g.__webglDepthbuffer[$]=n.createRenderbuffer(),Ht(g.__webglDepthbuffer[$],T,!1);else{let K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=g.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,xt),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,xt)}}else{let $=T.texture.mipmaps;if($&&$.length>0?e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Ht(g.__webglDepthbuffer,T,!1);else{let K=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,xt),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,xt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(T,g,W){let $=i.get(T);g!==void 0&&At($.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&st(T)}function dt(T){let g=T.texture,W=i.get(T),$=i.get(g);T.addEventListener("dispose",x);let K=T.textures,xt=T.isWebGLCubeRenderTarget===!0,vt=K.length>1;if(vt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=g.version,a.memory.textures++),xt){W.__webglFramebuffer=[];for(let it=0;it<6;it++)if(g.mipmaps&&g.mipmaps.length>0){W.__webglFramebuffer[it]=[];for(let lt=0;lt<g.mipmaps.length;lt++)W.__webglFramebuffer[it][lt]=n.createFramebuffer()}else W.__webglFramebuffer[it]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){W.__webglFramebuffer=[];for(let it=0;it<g.mipmaps.length;it++)W.__webglFramebuffer[it]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(vt)for(let it=0,lt=K.length;it<lt;it++){let bt=i.get(K[it]);bt.__webglTexture===void 0&&(bt.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Tt(T)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){let lt=K[it];W.__webglColorRenderbuffer[it]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[it]);let bt=r.convert(lt.format,lt.colorSpace),Ot=r.convert(lt.type),St=y(lt.internalFormat,bt,Ot,lt.normalized,lt.colorSpace,T.isXRRenderTarget===!0),Mt=ft(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,St,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+it,n.RENDERBUFFER,W.__webglColorRenderbuffer[it])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ht(W.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(xt){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,g);for(let it=0;it<6;it++)if(g.mipmaps&&g.mipmaps.length>0)for(let lt=0;lt<g.mipmaps.length;lt++)At(W.__webglFramebuffer[it][lt],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,lt);else At(W.__webglFramebuffer[it],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(g)&&w(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let it=0,lt=K.length;it<lt;it++){let bt=K[it],Ot=i.get(bt),St=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(St=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(St,Ot.__webglTexture),Ft(St,bt),At(W.__webglFramebuffer,T,bt,n.COLOR_ATTACHMENT0+it,St,0),p(bt)&&w(St)}e.unbindTexture()}else{let it=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(it=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(it,$.__webglTexture),Ft(it,g),g.mipmaps&&g.mipmaps.length>0)for(let lt=0;lt<g.mipmaps.length;lt++)At(W.__webglFramebuffer[lt],T,g,n.COLOR_ATTACHMENT0,it,lt);else At(W.__webglFramebuffer,T,g,n.COLOR_ATTACHMENT0,it,0);p(g)&&w(it),e.unbindTexture()}T.depthBuffer&&st(T)}function R(T){let g=T.textures;for(let W=0,$=g.length;W<$;W++){let K=g[W];if(p(K)){let xt=L(T),vt=i.get(K).__webglTexture;e.bindTexture(xt,vt),w(xt),e.unbindTexture()}}}let Z=[],mt=[];function ht(T){if(T.samples>0){if(Tt(T)===!1){let g=T.textures,W=T.width,$=T.height,K=n.COLOR_BUFFER_BIT,xt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(T),it=g.length>1;if(it)for(let bt=0;bt<g.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);let lt=T.texture.mipmaps;lt&&lt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let bt=0;bt<g.length;bt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),it){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[bt]);let Ot=i.get(g[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ot,0)}n.blitFramebuffer(0,0,W,$,0,0,W,$,K,n.NEAREST),l===!0&&(Z.length=0,mt.length=0,Z.push(n.COLOR_ATTACHMENT0+bt),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(Z.push(xt),mt.push(xt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,mt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Z))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),it)for(let bt=0;bt<g.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[bt]);let Ot=i.get(g[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,Ot,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&l){let g=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function ft(T){return Math.min(s.maxSamples,T.samples)}function Tt(T){let g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function U(T){let g=a.render.frame;h.get(T)!==g&&(h.set(T,g),T.update())}function Wt(T,g){let W=T.colorSpace,$=T.format,K=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||W!==Xs&&W!==$n&&(se.getTransfer(W)===he?($!==xn||K!==nn)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",W)),g}function Yt(T){return typeof HTMLImageElement!="undefined"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame!="undefined"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=V,this.getTextureUnits=F,this.setTextureUnits=H,this.setTexture2D=B,this.setTexture2DArray=N,this.setTexture3D=P,this.setTextureCube=G,this.rebindTextures=ut,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=At,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function R_(n,t){function e(i,s=$n){let r,a=se.getTransfer(s);if(i===nn)return n.UNSIGNED_BYTE;if(i===eo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===no)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zl)return n.BYTE;if(i===$l)return n.SHORT;if(i===Ms)return n.UNSIGNED_SHORT;if(i===to)return n.INT;if(i===Rn)return n.UNSIGNED_INT;if(i===_n)return n.FLOAT;if(i===Cn)return n.HALF_FLOAT;if(i===jl)return n.ALPHA;if(i===Ql)return n.RGB;if(i===xn)return n.RGBA;if(i===Nn)return n.DEPTH_COMPONENT;if(i===vi)return n.DEPTH_STENCIL;if(i===io)return n.RED;if(i===so)return n.RED_INTEGER;if(i===bi)return n.RG;if(i===ro)return n.RG_INTEGER;if(i===ao)return n.RGBA_INTEGER;if(i===Ar||i===Rr||i===Cr||i===Pr)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===oo||i===lo||i===co||i===ho)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===lo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===co)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===uo||i===fo||i===po||i===mo||i===go||i===Ir||i===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===uo||i===fo)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===po)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===mo)return r.COMPRESSED_R11_EAC;if(i===go)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ir)return r.COMPRESSED_RG11_EAC;if(i===_o)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===xo||i===yo||i===vo||i===bo||i===So||i===Mo||i===Eo||i===To||i===wo||i===Ao||i===Ro||i===Co||i===Po||i===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===xo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===So)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Mo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Eo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===To)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wo)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ao)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ro)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Co)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Po)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Io)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Lo||i===Do||i===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Lo)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Do)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Uo||i===Fo||i===Lr||i===Oo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Uo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Fo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Oo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var C_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,P_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ac=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new ir(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new fn({vertexShader:C_,fragmentShader:P_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Oe(new Ce(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rc=class extends wn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,_=null,S=typeof XRWebGLBinding!="undefined",m=new Ac,p={},w=e.getContextAttributes(),L=null,y=null,b=[],M=[],A=new gt,x=null,E=null,C=new Xe;C.viewport=new be;let I=new Xe;I.viewport=new be;let O=[C,I],V=new Za,F=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let at=b[et];return at===void 0&&(at=new fs,b[et]=at),at.getTargetRaySpace()},this.getControllerGrip=function(et){let at=b[et];return at===void 0&&(at=new fs,b[et]=at),at.getGripSpace()},this.getHand=function(et){let at=b[et];return at===void 0&&(at=new fs,b[et]=at),at.getHandSpace()};function J(et){let at=M.indexOf(et.inputSource);if(at===-1)return;let yt=b[at];yt!==void 0&&(yt.update(et.inputSource,et.frame,c||a),yt.dispatchEvent({type:et.type,data:et.inputSource}))}function X(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",B);for(let et=0;et<b.length;et++){let at=M[et];at!==null&&(M[et]=null,b[et].disconnect(at))}F=null,H=null,m.reset();for(let et in p)delete p[et];if(t.setRenderTarget(L),f=null,u=null,d=null,s=null,y=null,Kt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),E!==null){let et=E.camera;et.fov=E.fov,et.zoom=E.zoom,et.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){o=et,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(et){c=et},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&S&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(L=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",X),s.addEventListener("inputsourceschange",B),w.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Dt=null,At=null;w.depth&&(At=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=w.stencil?vi:Nn,Dt=w.stencil?Es:Rn);let Ht={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ht),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new en(u.textureWidth,u.textureHeight,{format:xn,type:nn,depthTexture:new ui(u.textureWidth,u.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let yt={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new en(f.framebufferWidth,f.framebufferHeight,{format:xn,type:nn,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(et){for(let at=0;at<et.removed.length;at++){let yt=et.removed[at],Dt=M.indexOf(yt);Dt>=0&&(M[Dt]=null,b[Dt].disconnect(yt))}for(let at=0;at<et.added.length;at++){let yt=et.added[at],Dt=M.indexOf(yt);if(Dt===-1){for(let Ht=0;Ht<b.length;Ht++)if(Ht>=M.length){M.push(yt),Dt=Ht;break}else if(M[Ht]===null){M[Ht]=yt,Dt=Ht;break}if(Dt===-1)break}let At=b[Dt];At&&At.connect(yt)}}let N=new z,P=new z;function G(et,at,yt){N.setFromMatrixPosition(at.matrixWorld),P.setFromMatrixPosition(yt.matrixWorld);let Dt=N.distanceTo(P),At=at.projectionMatrix.elements,Ht=yt.projectionMatrix.elements,Zt=At[14]/(At[10]-1),st=At[14]/(At[10]+1),ut=(At[9]+1)/At[5],dt=(At[9]-1)/At[5],R=(At[8]-1)/At[0],Z=(Ht[8]+1)/Ht[0],mt=Zt*R,ht=Zt*Z,ft=Dt/(-R+Z),Tt=ft*-R;if(at.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(Tt),et.translateZ(ft),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),At[10]===-1)et.projectionMatrix.copy(at.projectionMatrix),et.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{let U=Zt+ft,Wt=st+ft,Yt=mt-Tt,T=ht+(Dt-Tt),g=ut*st/Wt*U,W=dt*st/Wt*U;et.projectionMatrix.makePerspective(Yt,T,g,W,U,Wt),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function ot(et,at){at===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(at.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let at=et.near,yt=et.far;m.texture!==null&&(m.depthNear>0&&(at=m.depthNear),m.depthFar>0&&(yt=m.depthFar)),V.near=I.near=C.near=at,V.far=I.far=C.far=yt,(F!==V.near||H!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),F=V.near,H=V.far),V.layers.mask=et.layers.mask|6,C.layers.mask=V.layers.mask&-5,I.layers.mask=V.layers.mask&-3;let Dt=et.parent,At=V.cameras;ot(V,Dt);for(let Ht=0;Ht<At.length;Ht++)ot(At[Ht],Dt);At.length===2?G(V,C,I):V.projectionMatrix.copy(C.projectionMatrix),E===null&&et.isPerspectiveCamera&&(E={camera:et,fov:et.fov,zoom:et.zoom}),rt(et,V,Dt)};function rt(et,at,yt){yt===null?et.matrix.copy(at.matrixWorld):(et.matrix.copy(yt.matrixWorld),et.matrix.invert(),et.matrix.multiply(at.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(at.projectionMatrix),et.projectionMatrixInverse.copy(at.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=us*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(et){l=et,u!==null&&(u.fixedFoveation=et),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=et)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(et){return p[et]};let Pt=null;function Ft(et,at){if(h=at.getViewerPose(c||a),_=at,h!==null){let yt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Dt=!1;yt.length!==V.cameras.length&&(V.cameras.length=0,Dt=!0);for(let st=0;st<yt.length;st++){let ut=yt[st],dt=null;if(f!==null)dt=f.getViewport(ut);else{let Z=d.getViewSubImage(u,ut);dt=Z.viewport,st===0&&(t.setRenderTargetTextures(y,Z.colorTexture,Z.depthStencilTexture),t.setRenderTarget(y))}let R=O[st];R===void 0&&(R=new Xe,R.layers.enable(st),R.viewport=new be,O[st]=R),R.matrix.fromArray(ut.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(ut.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(dt.x,dt.y,dt.width,dt.height),st===0&&(V.matrix.copy(R.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Dt===!0&&V.cameras.push(R)}let At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){d=i.getBinding();let st=d.getDepthInformation(yt[0]);st&&st.isValid&&st.texture&&m.init(st,s.renderState)}if(At&&At.includes("camera-access")&&S){t.state.unbindTexture(),d=i.getBinding();for(let st=0;st<yt.length;st++){let ut=yt[st].camera;if(ut){let dt=p[ut];dt||(dt=new ir,p[ut]=dt);let R=d.getCameraImage(ut);dt.sourceTexture=R}}}}for(let yt=0;yt<b.length;yt++){let Dt=M[yt],At=b[yt];Dt!==null&&At!==void 0&&At.update(Dt,at,c||a)}Pt&&Pt(et,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),_=null}let Kt=new zu;Kt.setAnimationLoop(Ft),this.setAnimationLoop=function(et){Pt=et},this.dispose=function(){}}},I_=new me,Xu=new $t;Xu.set(-1,0,0,0,1,0,0,0,1);function L_(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,rc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,L,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,L):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=t.get(p),L=w.envMap,y=w.envMapRotation;L&&(m.envMap.value=L,m.envMapRotation.value.setFromMatrix4(I_.makeRotationFromEuler(y)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Xu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,L){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=L*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){let w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function D_(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){let M=b.program;i.uniformBlockBinding(y,M)}function c(y,b){let M=s[y.id];M===void 0&&(m(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",w));let A=b.program;i.updateUBOMapping(y,A);let x=t.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){let b=d();y.__bindingPointIndex=b;let M=n.createBuffer(),A=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,M),M}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let b=s[y.id],M=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let x=0,E=M.length;x<E;x++){let C=M[x];if(Array.isArray(C))for(let I=0,O=C.length;I<O;I++)f(C[I],x,I,A);else f(C,x,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,b,M,A){if(S(y,b,M,A)===!0){let x=y.__offset,E=y.value;if(Array.isArray(E)){let C=0;for(let I=0;I<E.length;I++){let O=E[I],V=p(O);_(O,y.__data,C),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(C+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(E,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function _(y,b,M){typeof y=="number"||typeof y=="boolean"?b[0]=y:y.isMatrix3?(b[0]=y.elements[0],b[1]=y.elements[1],b[2]=y.elements[2],b[3]=0,b[4]=y.elements[3],b[5]=y.elements[4],b[6]=y.elements[5],b[7]=0,b[8]=y.elements[6],b[9]=y.elements[7],b[10]=y.elements[8],b[11]=0):ArrayBuffer.isView(y)?b.set(new y.constructor(y.buffer,y.byteOffset,b.length)):y.toArray(b,M)}function S(y,b,M,A){let x=y.value,E=b+"_"+M;if(A[E]===void 0)return typeof x=="number"||typeof x=="boolean"?A[E]=x:ArrayBuffer.isView(x)?A[E]=x.slice():A[E]=x.clone(),!0;{let C=A[E];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return A[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function m(y){let b=y.uniforms,M=0,A=16;for(let E=0,C=b.length;E<C;E++){let I=Array.isArray(b[E])?b[E]:[b[E]];for(let O=0,V=I.length;O<V;O++){let F=I[O],H=Array.isArray(F.value)?F.value:[F.value];for(let J=0,X=H.length;J<X;J++){let B=H[J],N=p(B),P=M%A,G=P%N.boundary,ot=P+G;M+=G,ot!==0&&A-ot<N.storage&&(M+=A-ot),F.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=N.storage}}}let x=M%A;return x>0&&(M+=A-x),y.__size=M,y.__cache={},this}function p(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(b.boundary=16,b.storage=y.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",y),b}function w(y){let b=y.target;b.removeEventListener("dispose",w);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function L(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:L}}var N_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;function U_(){return Bn===null&&(Bn=new tr(N_,16,16,bi,Cn),Bn.name="DFG_LUT",Bn.minFilter=Be,Bn.magFilter=Be,Bn.wrapS=Dn,Bn.wrapT=Dn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var Xo=class{constructor(t={}){let{canvas:e=au(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=nn}=t;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;let S=f,m=new Set([ao,ro,so]),p=new Set([nn,Rn,Ms,Es,eo,no]),w=new Uint32Array(4),L=new Int32Array(4),y=new z,b=null,M=null,A=[],x=[],E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,I=!1,O=null,V=null,F=null,H=null;this._outputColorSpace=Re;let J=0,X=0,B=null,N=-1,P=null,G=new be,ot=new be,rt=null,Pt=new Jt(0),Ft=0,Kt=e.width,et=e.height,at=1,yt=null,Dt=null,At=new be(0,0,Kt,et),Ht=new be(0,0,Kt,et),Zt=!1,st=new ms,ut=!1,dt=!1,R=new me,Z=new z,mt=new be,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function Tt(){return B===null?at:1}let U=i;function Wt(v,k){return e.getContext(v,k)}let Yt,T,g,W,$,K,xt,vt,it,lt,bt,Ot,St,Mt,Bt,Vt,tt,D,nt,Q,_t,pt,ct;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",ge,!1),e.addEventListener("webglcontextrestored",le,!1),e.addEventListener("webglcontextcreationerror",bn,!1),U===null){let k="webgl2";if(U=Wt(k,v),U===null)throw Wt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}zt()}catch(v){throw e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",bn,!1),qt("WebGLRenderer: "+v.message),v}function zt(){Yt=new V0(U),Yt.init(),_t=new R_(U,Yt),T=new L0(U,Yt,t,_t),g=new w_(U,Yt),T.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),V=U.createFramebuffer(),F=U.createFramebuffer(),H=U.createFramebuffer(),W=new X0(U),$=new d_,K=new A_(U,Yt,g,$,T,_t,W),xt=new G0(C),vt=new Yf(U),pt=new P0(U,vt),it=new H0(U,vt,W,pt),lt=new Y0(U,it,vt,pt,W),D=new q0(U,T,K),Bt=new D0($),bt=new u_(C,xt,Yt,T,pt,Bt),Ot=new L_(C,$),St=new p_,Mt=new v_(Yt),tt=new C0(C,xt,g,lt,_,l),Vt=new T_(C,lt,T),ct=new D_(U,W,T,g),nt=new I0(U,Yt,W),Q=new W0(U,Yt,W),W.programs=bt.programs,C.capabilities=T,C.extensions=Yt,C.properties=$,C.renderLists=St,C.shadowMap=Vt,C.state=g,C.info=W}S!==nn&&(E=new $0(S,e.width,e.height,o,s,r));let kt=new Rc(C,U);this.xr=kt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let v=Yt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Yt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(v){v!==void 0&&(at=v,this.setSize(Kt,et,!1))},this.getSize=function(v){return v.set(Kt,et)},this.setSize=function(v,k,j=!0){if(kt.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=v,et=k,e.width=Math.floor(v*at),e.height=Math.floor(k*at),j===!0&&(e.style.width=v+"px",e.style.height=k+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,v,k)},this.getDrawingBufferSize=function(v){return v.set(Kt*at,et*at).floor()},this.setDrawingBufferSize=function(v,k,j){Kt=v,et=k,at=j,e.width=Math.floor(v*j),e.height=Math.floor(k*j),this.setViewport(0,0,v,k)},this.setEffects=function(v){if(S===nn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let k=0;k<v.length;k++)if(v[k].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(G)},this.getViewport=function(v){return v.copy(At)},this.setViewport=function(v,k,j,q){v.isVector4?At.set(v.x,v.y,v.z,v.w):At.set(v,k,j,q),g.viewport(G.copy(At).multiplyScalar(at).round())},this.getScissor=function(v){return v.copy(Ht)},this.setScissor=function(v,k,j,q){v.isVector4?Ht.set(v.x,v.y,v.z,v.w):Ht.set(v,k,j,q),g.scissor(ot.copy(Ht).multiplyScalar(at).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(v){g.setScissorTest(Zt=v)},this.setOpaqueSort=function(v){yt=v},this.setTransparentSort=function(v){Dt=v},this.getClearColor=function(v){return v.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(v=!0,k=!0,j=!0){let q=0;if(v){let Y=!1;if(B!==null){let Ct=B.texture.format;Y=m.has(Ct)}if(Y){let Ct=B.texture.type,Lt=p.has(Ct),Rt=tt.getClearColor(),Nt=tt.getClearAlpha(),Gt=Rt.r,te=Rt.g,ie=Rt.b;Lt?(w[0]=Gt,w[1]=te,w[2]=ie,w[3]=Nt,U.clearBufferuiv(U.COLOR,0,w)):(L[0]=Gt,L[1]=te,L[2]=ie,L[3]=Nt,U.clearBufferiv(U.COLOR,0,L))}else q|=U.COLOR_BUFFER_BIT}k&&(q|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),O=v},this.dispose=function(){e.removeEventListener("webglcontextlost",ge,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",bn,!1),tt.dispose(),St.dispose(),Mt.dispose(),$.dispose(),xt.dispose(),lt.dispose(),pt.dispose(),ct.dispose(),bt.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",Oc),kt.removeEventListener("sessionend",Bc),Ti.stop()};function ge(v){v.preventDefault(),ec("WebGLRenderer: Context Lost."),I=!0}function le(){ec("WebGLRenderer: Context Restored."),I=!1;let v=W.autoReset,k=Vt.enabled,j=Vt.autoUpdate,q=Vt.needsUpdate,Y=Vt.type;zt(),W.autoReset=v,Vt.enabled=k,Vt.autoUpdate=j,Vt.needsUpdate=q,Vt.type=Y}function bn(v){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Pn(v){let k=v.target;k.removeEventListener("dispose",Pn),fd(k)}function fd(v){pd(v),$.remove(v)}function pd(v){let k=$.get(v).programs;k!==void 0&&(k.forEach(function(j){bt.releaseProgram(j)}),v.isShaderMaterial&&bt.releaseShaderCache(v))}this.renderBufferDirect=function(v,k,j,q,Y,Ct){k===null&&(k=ht);let Lt=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,Rt=_d(v,k,j,q,Y);g.setMaterial(q,Lt);let Nt=j.index,Gt=1;if(q.wireframe===!0){if(Nt=it.getWireframeAttribute(j),Nt===void 0)return;Gt=2}let te=j.drawRange,ie=j.attributes.position,Ut=te.start*Gt,ce=(te.start+te.count)*Gt;Ct!==null&&(Ut=Math.max(Ut,Ct.start*Gt),ce=Math.min(ce,(Ct.start+Ct.count)*Gt)),Nt!==null?(Ut=Math.max(Ut,0),ce=Math.min(ce,Nt.count)):ie!=null&&(Ut=Math.max(Ut,0),ce=Math.min(ce,ie.count));let Te=ce-Ut;if(Te<0||Te===1/0)return;pt.setup(Y,q,Rt,j,Nt);let ye,pe=nt;if(Nt!==null&&(ye=vt.get(Nt),pe=Q,pe.setIndex(ye)),Y.isMesh)q.wireframe===!0?(g.setLineWidth(q.wireframeLinewidth*Tt()),pe.setMode(U.LINES)):pe.setMode(U.TRIANGLES);else if(Y.isLine){let Ve=q.linewidth;Ve===void 0&&(Ve=1),g.setLineWidth(Ve*Tt()),Y.isLineSegments?pe.setMode(U.LINES):Y.isLineLoop?pe.setMode(U.LINE_LOOP):pe.setMode(U.LINE_STRIP)}else Y.isPoints?pe.setMode(U.POINTS):Y.isSprite&&pe.setMode(U.TRIANGLES);if(Y.isBatchedMesh)if(Yt.get("WEBGL_multi_draw"))pe.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Ve=Y._multiDrawStarts,It=Y._multiDrawCounts,Ze=Y._multiDrawCount,re=Nt?vt.get(Nt).bytesPerElement:1,mn=$.get(q).currentProgram.getUniforms();for(let In=0;In<Ze;In++)mn.setValue(U,"_gl_DrawID",In),pe.render(Ve[In]/re,It[In])}else if(Y.isInstancedMesh)pe.renderInstances(Ut,Te,Y.count);else if(j.isInstancedBufferGeometry){let Ve=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,It=Math.min(j.instanceCount,Ve);pe.renderInstances(Ut,Te,It)}else pe.render(Ut,Te)};function Fc(v,k,j,q){O!==null&&v.isNodeMaterial&&O.setObject(q,v),ut===!0&&Bt.setState(v,j,!1),v.transparent===!0&&v.side===Ge&&v.forceSinglePass===!1?(v.side=ke,v.needsUpdate=!0,Vr(v,k,q),v.side=_i,v.needsUpdate=!0,Vr(v,k,q),v.side=Ge):Vr(v,k,q)}this.compile=function(v,k,j=null){j===null&&(j=v),O!==null&&O.renderStart(v,k,j),M=Mt.get(j),M.init(k),x.push(M),j.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(M.pushLight(Y),Y.castShadow&&M.pushShadow(Y))}),v!==j&&v.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(M.pushLight(Y),Y.castShadow&&M.pushShadow(Y))}),M.setupLights(),O!==null&&O.updateLights(M.state.lightsArray),dt=this.localClippingEnabled,ut=Bt.init(this.clippingPlanes,dt),ut===!0&&Bt.setGlobalState(this.clippingPlanes,k),O!==null&&Vt.render(M.state.shadowsArray,j,k);let q=new Set;return v.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let Ct=Y.material;if(Ct)if(Array.isArray(Ct))for(let Lt=0;Lt<Ct.length;Lt++){let Rt=Ct[Lt];Fc(Rt,j,k,Y),q.add(Rt)}else Fc(Ct,j,k,Y),q.add(Ct)}),M=x.pop(),O!==null&&O.renderEnd(),q},this.compileAsync=function(v,k,j=null){let q=this.compile(v,k,j);return new Promise(Y=>{function Ct(){if(q.forEach(function(Lt){let Nt=$.get(Lt).currentProgram;(Nt===void 0||Nt.isReady())&&q.delete(Lt)}),q.size===0){Y(v);return}setTimeout(Ct,10)}Yt.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let jo=null;function md(v){jo&&jo(v)}function Oc(){Ti.stop()}function Bc(){Ti.start()}let Ti=new zu;Ti.setAnimationLoop(md),typeof self!="undefined"&&Ti.setContext(self),this.setAnimationLoop=function(v){jo=v,kt.setAnimationLoop(v),v===null?Ti.stop():Ti.start()},kt.addEventListener("sessionstart",Oc),kt.addEventListener("sessionend",Bc),this.render=function(v,k){if(k!==void 0&&k.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;O!==null&&O.renderStart(v,k);let j=kt.enabled===!0&&kt.isPresenting===!0,q=E!==null&&(B===null||j)&&E.begin(C,B);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(k),k=kt.getCamera()),v.isScene===!0&&v.onBeforeRender(C,v,k,B),M=Mt.get(v,x.length),M.init(k),M.state.textureUnits=K.getTextureUnits(),x.push(M),R.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),st.setFromProjectionMatrix(R,Tn,k.reversedDepth),dt=this.localClippingEnabled,ut=Bt.init(this.clippingPlanes,dt),b=St.get(v,A.length),b.init(),A.push(b),kt.enabled===!0&&kt.isPresenting===!0){let Lt=C.xr.getDepthSensingMesh();Lt!==null&&Qo(Lt,k,-1/0,C.sortObjects)}Qo(v,k,0,C.sortObjects),b.finish(),O!==null&&O.updateLights(M.state.lightsArray),C.sortObjects===!0&&b.sort(yt,Dt),ft=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,ft&&tt.addToRenderList(b,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ut===!0&&Bt.beginShadows();let Y=M.state.shadowsArray;if(Vt.render(Y,v,k),ut===!0&&Bt.endShadows(),(q&&E.hasRenderPass())===!1){let Lt=b.opaque,Rt=b.transmissive;if(M.setupLights(),k.isArrayCamera){let Nt=k.cameras;if(Rt.length>0)for(let Gt=0,te=Nt.length;Gt<te;Gt++){let ie=Nt[Gt];kc(Lt,Rt,v,ie)}ft&&tt.render(v);for(let Gt=0,te=Nt.length;Gt<te;Gt++){let ie=Nt[Gt];zc(b,v,ie,ie.viewport)}}else Rt.length>0&&kc(Lt,Rt,v,k),ft&&tt.render(v),zc(b,v,k)}B!==null&&X===0&&(K.updateMultisampleRenderTarget(B),K.updateRenderTargetMipmap(B)),q&&E.end(C),v.isScene===!0&&v.onAfterRender(C,v,k),pt.resetDefaultState(),N=-1,P=null,x.pop(),x.length>0?(M=x[x.length-1],K.setTextureUnits(M.state.textureUnits),ut===!0&&Bt.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?b=A[A.length-1]:b=null,O!==null&&O.renderEnd()};function Qo(v,k,j,q){if(v.visible===!1)return;if(v.layers.test(k.layers)){if(v.isGroup)j=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(k);else if(v.isLightProbeGrid)M.pushLightProbeGrid(v);else if(v.isLight)M.pushLight(v),v.castShadow&&M.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(st)){q&&mt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(R);let Lt=lt.update(v),Rt=v.material;Rt.visible&&b.push(v,Lt,Rt,j,mt.z,null,k)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(st))){let Lt=lt.update(v),Rt=v.material;if(q&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),mt.copy(v.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),mt.copy(Lt.boundingSphere.center)),mt.applyMatrix4(v.matrixWorld).applyMatrix4(R)),Array.isArray(Rt)){let Nt=Lt.groups;for(let Gt=0,te=Nt.length;Gt<te;Gt++){let ie=Nt[Gt],Ut=Rt[ie.materialIndex];Ut&&Ut.visible&&b.push(v,Lt,Ut,j,mt.z,ie,k)}}else Rt.visible&&b.push(v,Lt,Rt,j,mt.z,null,k)}}let Ct=v.children;for(let Lt=0,Rt=Ct.length;Lt<Rt;Lt++)Qo(Ct[Lt],k,j,q)}function zc(v,k,j,q){let{opaque:Y,transmissive:Ct,transparent:Lt}=v;M.setupLightsView(j),ut===!0&&Bt.setGlobalState(C.clippingPlanes,j),q&&g.viewport(G.copy(q)),Y.length>0&&Gr(Y,k,j),Ct.length>0&&Gr(Ct,k,j),Lt.length>0&&Gr(Lt,k,j),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function kc(v,k,j,q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[q.id]===void 0){let Ut=Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[q.id]=new en(1,1,{generateMipmaps:!0,type:Ut?Cn:nn,minFilter:yi,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:se.workingColorSpace})}let Ct=M.state.transmissionRenderTarget[q.id],Lt=q.viewport||G;Ct.setSize(Lt.z*C.transmissionResolutionScale,Lt.w*C.transmissionResolutionScale);let Rt=C.getRenderTarget(),Nt=C.getActiveCubeFace(),Gt=C.getActiveMipmapLevel();C.setRenderTarget(Ct),C.getClearColor(Pt),Ft=C.getClearAlpha(),Ft<1&&C.setClearColor(16777215,.5),C.clear(),ft&&tt.render(j);let te=C.toneMapping;C.toneMapping=An;let ie=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),M.setupLightsView(q),ut===!0&&Bt.setGlobalState(C.clippingPlanes,q),Gr(v,j,q),K.updateMultisampleRenderTarget(Ct),K.updateRenderTargetMipmap(Ct),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let ce=0,Te=k.length;ce<Te;ce++){let ye=k[ce],{object:pe,geometry:Ve,material:It,group:Ze}=ye;if(It.side===Ge&&pe.layers.test(q.layers)){let re=It.side;It.side=ke,It.needsUpdate=!0,Gc(pe,j,q,Ve,It,Ze),It.side=re,It.needsUpdate=!0,Ut=!0}}Ut===!0&&(K.updateMultisampleRenderTarget(Ct),K.updateRenderTargetMipmap(Ct))}C.setRenderTarget(Rt,Nt,Gt),C.setClearColor(Pt,Ft),ie!==void 0&&(q.viewport=ie),C.toneMapping=te}function Gr(v,k,j){let q=k.isScene===!0?k.overrideMaterial:null;for(let Y=0,Ct=v.length;Y<Ct;Y++){let Lt=v[Y],{object:Rt,geometry:Nt,group:Gt}=Lt,te=Lt.material;te.allowOverride===!0&&q!==null&&(te=q),Rt.layers.test(j.layers)&&Gc(Rt,k,j,Nt,te,Gt)}}function Gc(v,k,j,q,Y,Ct){O!==null&&Y.isNodeMaterial&&O.setObject(v,Y),v.onBeforeRender(C,k,j,q,Y,Ct),v.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),Y.onBeforeRender(C,k,j,q,v,Ct),Y.transparent===!0&&Y.side===Ge&&Y.forceSinglePass===!1?(Y.side=ke,Y.needsUpdate=!0,C.renderBufferDirect(j,k,q,Y,v,Ct),Y.side=_i,Y.needsUpdate=!0,C.renderBufferDirect(j,k,q,Y,v,Ct),Y.side=Ge):C.renderBufferDirect(j,k,q,Y,v,Ct),v.onAfterRender(C,k,j,q,Y,Ct)}function Vr(v,k,j){k.isScene!==!0&&(k=ht);let q=$.get(v),Y=M.state.lights,Ct=M.state.shadowsArray,Lt=Y.state.version,Rt=bt.getParameters(v,Y.state,Ct,k,j,M.state.lightProbeGridArray),Nt=bt.getProgramCacheKey(Rt),Gt=q.programs;q.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;let te=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;q.envMap=xt.get(v.envMap||q.environment,te),q.envMapRotation=q.environment!==null&&v.envMap===null?k.environmentRotation:v.envMapRotation,Gt===void 0&&(v.addEventListener("dispose",Pn),Gt=new Map,q.programs=Gt);let ie=Gt.get(Nt);if(ie!==void 0){if(q.currentProgram===ie&&q.lightsStateVersion===Lt)return Hc(v,Rt),ie}else Rt.uniforms=bt.getUniforms(v),O!==null&&v.isNodeMaterial&&O.build(v,j,Rt),v.onBeforeCompile(Rt,C),ie=bt.acquireProgram(Rt,Nt),Gt.set(Nt,ie),q.uniforms=Rt.uniforms;let Ut=q.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ut.clippingPlanes=Bt.uniform),Hc(v,Rt),q.needsLights=yd(v),q.lightsStateVersion=Lt,q.needsLights&&(Ut.ambientLightColor.value=Y.state.ambient,Ut.lightProbe.value=Y.state.probe,Ut.sunLights.value=Y.state.sun,Ut.sunLightShadows.value=Y.state.sunShadow,Ut.directionalLights.value=Y.state.directional,Ut.directionalLightShadows.value=Y.state.directionalShadow,Ut.spotLights.value=Y.state.spot,Ut.spotLightShadows.value=Y.state.spotShadow,Ut.rectAreaLights.value=Y.state.rectArea,Ut.ltc_1.value=Y.state.rectAreaLTC1,Ut.ltc_2.value=Y.state.rectAreaLTC2,Ut.pointLights.value=Y.state.point,Ut.pointLightShadows.value=Y.state.pointShadow,Ut.hemisphereLights.value=Y.state.hemi,Ut.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ut.sunShadowCascade.value=Y.state.sunShadowCascade,Ut.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ut.spotLightMatrix.value=Y.state.spotLightMatrix,Ut.spotLightMap.value=Y.state.spotLightMap,Ut.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=M.state.lightProbeGridArray.length>0,q.currentProgram=ie,q.uniformsList=null,ie}function Vc(v){if(v.uniformsList===null){let k=v.currentProgram.getUniforms();v.uniformsList=As.seqWithValue(k.seq,v.uniforms)}return v.uniformsList}function Hc(v,k){let j=$.get(v);j.outputColorSpace=k.outputColorSpace,j.batching=k.batching,j.batchingColor=k.batchingColor,j.instancing=k.instancing,j.instancingColor=k.instancingColor,j.instancingMorph=k.instancingMorph,j.skinning=k.skinning,j.morphTargets=k.morphTargets,j.morphNormals=k.morphNormals,j.morphColors=k.morphColors,j.morphTargetsCount=k.morphTargetsCount,j.numClippingPlanes=k.numClippingPlanes,j.numIntersection=k.numClipIntersection,j.vertexAlphas=k.vertexAlphas,j.vertexTangents=k.vertexTangents,j.toneMapping=k.toneMapping}function gd(v,k){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;y.setFromMatrixPosition(k.matrixWorld);for(let j=0,q=v.length;j<q;j++){let Y=v[j];if(Y.texture!==null&&Y.boundingBox.containsPoint(y))return Y}return null}function _d(v,k,j,q,Y){k.isScene!==!0&&(k=ht),K.resetTextureUnits();let Ct=k.fog,Lt=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,Rt=B===null?C.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:se.workingColorSpace,Nt=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Gt=xt.get(q.envMap||Lt,Nt),te=q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ie=!!j.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ut=!!j.morphAttributes.position,ce=!!j.morphAttributes.normal,Te=!!j.morphAttributes.color,ye=An;q.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(ye=C.toneMapping);let pe=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ve=pe!==void 0?pe.length:0,It=$.get(q),Ze=M.state.lights;if(ut===!0&&(dt===!0||v!==P)){let _e=v===P&&q.id===N;Bt.setState(q,v,_e)}let re=!1;q.version===It.__version?(It.needsLights&&It.lightsStateVersion!==Ze.state.version||It.outputColorSpace!==Rt||Y.isBatchedMesh&&It.batching===!1||!Y.isBatchedMesh&&It.batching===!0||Y.isBatchedMesh&&It.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&It.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&It.instancing===!1||!Y.isInstancedMesh&&It.instancing===!0||Y.isSkinnedMesh&&It.skinning===!1||!Y.isSkinnedMesh&&It.skinning===!0||Y.isInstancedMesh&&It.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&It.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&It.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&It.instancingMorph===!1&&Y.morphTexture!==null||It.envMap!==Gt||q.fog===!0&&It.fog!==Ct||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==Bt.numPlanes||It.numIntersection!==Bt.numIntersection)||It.vertexAlphas!==te||It.vertexTangents!==ie||It.morphTargets!==Ut||It.morphNormals!==ce||It.morphColors!==Te||It.toneMapping!==ye||It.morphTargetsCount!==Ve||!!It.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(re=!0):(re=!0,It.__version=q.version);let mn=It.currentProgram;re===!0&&(mn=Vr(q,k,Y),O&&q.isNodeMaterial&&O.onUpdateProgram(q,mn,It));let In=!1,jn=!1,Hi=!1,fe=mn.getUniforms(),Ee=It.uniforms;if(g.useProgram(mn.program)&&(In=!0,jn=!0,Hi=!0),q.id!==N&&(N=q.id,jn=!0),It.needsLights){let _e=gd(M.state.lightProbeGridArray,Y);It.lightProbeGrid!==_e&&(It.lightProbeGrid=_e,jn=!0)}if(In||P!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),fe.setValue(U,"projectionMatrix",v.projectionMatrix),fe.setValue(U,"viewMatrix",v.matrixWorldInverse);let ti=fe.map.cameraPosition;ti!==void 0&&ti.setValue(U,Z.setFromMatrixPosition(v.matrixWorld)),T.logarithmicDepthBuffer&&fe.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&fe.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),P!==v&&(P=v,jn=!0,Hi=!0)}if(It.needsLights&&(Ze.state.sunShadowMap.length>0&&fe.setValue(U,"sunShadowMap",Ze.state.sunShadowMap,K),Ze.state.directionalShadowMap.length>0&&fe.setValue(U,"directionalShadowMap",Ze.state.directionalShadowMap,K),Ze.state.spotShadowMap.length>0&&fe.setValue(U,"spotShadowMap",Ze.state.spotShadowMap,K),Ze.state.pointShadowMap.length>0&&fe.setValue(U,"pointShadowMap",Ze.state.pointShadowMap,K)),Y.isSkinnedMesh){fe.setOptional(U,Y,"bindMatrix"),fe.setOptional(U,Y,"bindMatrixInverse");let _e=Y.skeleton;_e&&(_e.boneTexture===null&&_e.computeBoneTexture(),fe.setValue(U,"boneTexture",_e.boneTexture,K))}Y.isBatchedMesh&&(fe.setOptional(U,Y,"batchingTexture"),fe.setValue(U,"batchingTexture",Y._matricesTexture,K),fe.setOptional(U,Y,"batchingIdTexture"),fe.setValue(U,"batchingIdTexture",Y._indirectTexture,K),fe.setOptional(U,Y,"batchingColorTexture"),Y._colorsTexture!==null&&fe.setValue(U,"batchingColorTexture",Y._colorsTexture,K));let Qn=j.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&D.update(Y,j,mn),(jn||It.receiveShadow!==Y.receiveShadow)&&(It.receiveShadow=Y.receiveShadow,fe.setValue(U,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(Ee.envMapIntensity.value=k.environmentIntensity),Ee.dfgLUT!==void 0&&(Ee.dfgLUT.value=U_()),jn){if(fe.setValue(U,"toneMappingExposure",C.toneMappingExposure),It.needsLights&&xd(Ee,Hi),Ct&&q.fog===!0&&Ot.refreshFogUniforms(Ee,Ct),Ot.refreshMaterialUniforms(Ee,q,at,et,M.state.transmissionRenderTarget[v.id]),It.needsLights&&It.lightProbeGrid){let _e=It.lightProbeGrid;Ee.probesSH.value=_e.texture,Ee.probesMin.value.copy(_e.boundingBox.min),Ee.probesMax.value.copy(_e.boundingBox.max),Ee.probesResolution.value.copy(_e.resolution)}As.upload(U,Vc(It),Ee,K)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(As.upload(U,Vc(It),Ee,K),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&fe.setValue(U,"center",Y.center),fe.setValue(U,"modelViewMatrix",Y.modelViewMatrix),fe.setValue(U,"normalMatrix",Y.normalMatrix),fe.setValue(U,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){let _e=q.uniformsGroups;for(let ti=0,Wi=_e.length;ti<Wi;ti++){let Xc=_e[ti];ct.update(Xc,mn),ct.bind(Xc,mn)}}return mn}function xd(v,k){v.ambientLightColor.needsUpdate=k,v.lightProbe.needsUpdate=k,v.sunLights.needsUpdate=k,v.sunLightShadows.needsUpdate=k,v.directionalLights.needsUpdate=k,v.directionalLightShadows.needsUpdate=k,v.pointLights.needsUpdate=k,v.pointLightShadows.needsUpdate=k,v.spotLights.needsUpdate=k,v.spotLightShadows.needsUpdate=k,v.rectAreaLights.needsUpdate=k,v.hemisphereLights.needsUpdate=k}function yd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(v,k,j){let q=$.get(v);q.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),$.get(v.texture).__webglTexture=k,$.get(v.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:j,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,k){let j=$.get(v);j.__webglFramebuffer=k,j.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(v,k=0,j=0){B=v,J=k,X=j;let q=null,Y=!1,Ct=!1;if(v){let Rt=$.get(v);if(Rt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(U.FRAMEBUFFER,Rt.__webglFramebuffer),G.copy(v.viewport),ot.copy(v.scissor),rt=v.scissorTest,g.viewport(G),g.scissor(ot),g.setScissorTest(rt),N=-1;return}else if(Rt.__webglFramebuffer===void 0)K.setupRenderTarget(v);else if(Rt.__hasExternalTextures)K.rebindTextures(v,$.get(v.texture).__webglTexture,$.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let te=v.depthTexture;if(Rt.__boundDepthTexture!==te){if(te!==null&&$.has(te)&&(v.width!==te.image.width||v.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(v)}}let Nt=v.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(Ct=!0);let Gt=$.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Gt[k])?q=Gt[k][j]:q=Gt[k],Y=!0):v.samples>0&&K.useMultisampledRTT(v)===!1?q=$.get(v).__webglMultisampledFramebuffer:Array.isArray(Gt)?q=Gt[j]:q=Gt,G.copy(v.viewport),ot.copy(v.scissor),rt=v.scissorTest}else G.copy(At).multiplyScalar(at).floor(),ot.copy(Ht).multiplyScalar(at).floor(),rt=Zt;if(j!==0&&(q=V),g.bindFramebuffer(U.FRAMEBUFFER,q)&&g.drawBuffers(v,q),g.viewport(G),g.scissor(ot),g.setScissorTest(rt),Y){let Rt=$.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,Rt.__webglTexture,j)}else if(Ct){let Rt=k;for(let Nt=0;Nt<v.textures.length;Nt++){let Gt=$.get(v.textures[Nt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Nt,Gt.__webglTexture,j,Rt)}}else if(v!==null&&j!==0){let Rt=$.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Rt.__webglTexture,j)}N=-1};function Wc(v){let k=$.get(v);return(k.__readFormat!==v.format||k.__readType!==v.type)&&(k.__readFormat=v.format,k.__readType=v.type,k.__formatReadable=T.textureFormatReadable(v.format),k.__typeReadable=T.textureTypeReadable(v.type)),k}this.readRenderTargetPixels=function(v,k,j,q,Y,Ct,Lt,Rt=0){if(!(v&&v.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=$.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Lt!==void 0&&(Nt=Nt[Lt]),Nt){g.bindFramebuffer(U.FRAMEBUFFER,Nt);try{let Gt=v.textures[Rt],te=Gt.format,ie=Gt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Rt);let Ut=Wc(Gt);if(Ut.__formatReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ut.__typeReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=v.width-q&&j>=0&&j<=v.height-Y&&U.readPixels(k,j,q,Y,_t.convert(te),_t.convert(ie),Ct)}finally{let Gt=B!==null?$.get(B).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(v,k,j,q,Y,Ct,Lt,Rt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=$.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Lt!==void 0&&(Nt=Nt[Lt]),Nt)if(k>=0&&k<=v.width-q&&j>=0&&j<=v.height-Y){g.bindFramebuffer(U.FRAMEBUFFER,Nt);let Gt=v.textures[Rt],te=Gt.format,ie=Gt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Rt);let Ut=Wc(Gt);if(Ut.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ut.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ce=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ce),U.bufferData(U.PIXEL_PACK_BUFFER,Ct.byteLength,U.STREAM_READ),U.readPixels(k,j,q,Y,_t.convert(te),_t.convert(ie),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Te=B!==null?$.get(B).__webglFramebuffer:null;g.bindFramebuffer(U.FRAMEBUFFER,Te);let ye=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await lu(U,ye,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ce),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ct),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ce),U.deleteSync(ye),Ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,k=null,j=0){let q=Math.pow(2,-j),Y=Math.floor(v.image.width*q),Ct=Math.floor(v.image.height*q),Lt=k!==null?k.x:0,Rt=k!==null?k.y:0;K.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,Lt,Rt,Y,Ct),g.unbindTexture()},this.copyTextureToTexture=function(v,k,j=null,q=null,Y=0,Ct=0){let Lt,Rt,Nt,Gt,te,ie,Ut,ce,Te,ye=v.isCompressedTexture?v.mipmaps[Ct]:v.image;if(j!==null)Lt=j.max.x-j.min.x,Rt=j.max.y-j.min.y,Nt=j.isBox3?j.max.z-j.min.z:1,Gt=j.min.x,te=j.min.y,ie=j.isBox3?j.min.z:0;else{let Ee=Math.pow(2,-Y);Lt=Math.floor(ye.width*Ee),Rt=Math.floor(ye.height*Ee),v.isDataArrayTexture?Nt=ye.depth:v.isData3DTexture?Nt=Math.floor(ye.depth*Ee):Nt=1,Gt=0,te=0,ie=0}q!==null?(Ut=q.x,ce=q.y,Te=q.z):(Ut=0,ce=0,Te=0);let pe=_t.convert(k.format),Ve=_t.convert(k.type),It;k.isData3DTexture?(K.setTexture3D(k,0),It=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(K.setTexture2DArray(k,0),It=U.TEXTURE_2D_ARRAY):(K.setTexture2D(k,0),It=U.TEXTURE_2D),g.activeTexture(U.TEXTURE0),g.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),g.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),g.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let Ze=g.getParameter(U.UNPACK_ROW_LENGTH),re=g.getParameter(U.UNPACK_IMAGE_HEIGHT),mn=g.getParameter(U.UNPACK_SKIP_PIXELS),In=g.getParameter(U.UNPACK_SKIP_ROWS),jn=g.getParameter(U.UNPACK_SKIP_IMAGES);g.pixelStorei(U.UNPACK_ROW_LENGTH,ye.width),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ye.height),g.pixelStorei(U.UNPACK_SKIP_PIXELS,Gt),g.pixelStorei(U.UNPACK_SKIP_ROWS,te),g.pixelStorei(U.UNPACK_SKIP_IMAGES,ie);let Hi=v.isDataArrayTexture||v.isData3DTexture,fe=k.isDataArrayTexture||k.isData3DTexture;if(v.isDepthTexture){let Ee=$.get(v),Qn=$.get(k),_e=$.get(Ee.__renderTarget),ti=$.get(Qn.__renderTarget);g.bindFramebuffer(U.READ_FRAMEBUFFER,_e.__webglFramebuffer),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let Wi=0;Wi<Nt;Wi++)Hi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(v).__webglTexture,Y,ie+Wi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,$.get(k).__webglTexture,Ct,Te+Wi)),U.blitFramebuffer(Gt,te,Lt,Rt,Ut,ce,Lt,Rt,U.DEPTH_BUFFER_BIT,U.NEAREST);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Y!==0||v.isRenderTargetTexture||$.has(v)){let Ee=$.get(v),Qn=$.get(k);g.bindFramebuffer(U.READ_FRAMEBUFFER,F),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,H);for(let _e=0;_e<Nt;_e++)Hi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.__webglTexture,Y,ie+_e):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ee.__webglTexture,Y),fe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Qn.__webglTexture,Ct,Te+_e):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Qn.__webglTexture,Ct),Y!==0?U.blitFramebuffer(Gt,te,Lt,Rt,Ut,ce,Lt,Rt,U.COLOR_BUFFER_BIT,U.NEAREST):fe?U.copyTexSubImage3D(It,Ct,Ut,ce,Te+_e,Gt,te,Lt,Rt):U.copyTexSubImage2D(It,Ct,Ut,ce,Gt,te,Lt,Rt);g.bindFramebuffer(U.READ_FRAMEBUFFER,null),g.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else fe?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(It,Ct,Ut,ce,Te,Lt,Rt,Nt,pe,Ve,ye.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(It,Ct,Ut,ce,Te,Lt,Rt,Nt,pe,ye.data):U.texSubImage3D(It,Ct,Ut,ce,Te,Lt,Rt,Nt,pe,Ve,ye):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ct,Ut,ce,Lt,Rt,pe,Ve,ye.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ct,Ut,ce,ye.width,ye.height,pe,ye.data):U.texSubImage2D(U.TEXTURE_2D,Ct,Ut,ce,Lt,Rt,pe,Ve,ye);g.pixelStorei(U.UNPACK_ROW_LENGTH,Ze),g.pixelStorei(U.UNPACK_IMAGE_HEIGHT,re),g.pixelStorei(U.UNPACK_SKIP_PIXELS,mn),g.pixelStorei(U.UNPACK_SKIP_ROWS,In),g.pixelStorei(U.UNPACK_SKIP_IMAGES,jn),Ct===0&&k.generateMipmaps&&U.generateMipmap(It),g.unbindTexture()},this.initRenderTarget=function(v){$.get(v).__webglFramebuffer===void 0&&K.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?K.setTextureCube(v,0):v.isData3DTexture?K.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?K.setTexture2DArray(v,0):K.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){J=0,X=0,B=null,g.reset(),pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}};var Yu={type:"change"},Pc={type:"start"},$u={type:"end"},Zo=new ps,Zu=new ln,F_=Math.cos(70*ic.DEG2RAD),Le=new z,sn=2*Math.PI,de={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Cc=1e-6,$o=class extends br{constructor(t,e=null){super(t,e),this.state=de.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:mi.ROTATE,MIDDLE:mi.DOLLY,RIGHT:mi.PAN},this.touches={ONE:gi.ROTATE,TWO:gi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new hn,this._lastTargetPosition=new z,this._quat=new hn().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vs,this._sphericalDelta=new vs,this._scale=1,this._panOffset=new z,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new z,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=B_.bind(this),this._onPointerDown=O_.bind(this),this._onPointerUp=z_.bind(this),this._onContextMenu=q_.bind(this),this._onMouseWheel=V_.bind(this),this._onKeyDown=H_.bind(this),this._onTouchStart=W_.bind(this),this._onTouchMove=X_.bind(this),this._onMouseDown=k_.bind(this),this._onMouseMove=G_.bind(this),this._interceptControlDown=Y_.bind(this),this._interceptControlUp=Z_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=de.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yu),this.update(),this.state=de.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Le.copy(e).sub(this.target),Le.applyQuaternion(this._quat),this._spherical.setFromVector3(Le),this.autoRotate&&this.state===de.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Le.setFromSpherical(this._spherical),Le.applyQuaternion(this._quatInverse),e.copy(this.target).add(Le),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Le.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new z(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Le.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Zo.origin.copy(this.object.position),Zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zo.direction))<F_?this.object.lookAt(this.target):(Zu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zo.intersectPlane(Zu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Cc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Cc||this._lastTargetPosition.distanceToSquared(this.target)>Cc?(this.dispatchEvent(Yu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Le.setFromMatrixColumn(e,0),Le.multiplyScalar(-t),this._panOffset.add(Le)}_panUp(t,e){this.screenSpacePanning===!0?Le.setFromMatrixColumn(e,1):(Le.setFromMatrixColumn(e,0),Le.crossVectors(this.object.up,Le)),Le.multiplyScalar(t),this._panOffset.add(Le)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Le.copy(s).sub(this.target);let r=Le.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function O_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function B_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function z_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($u),this.state=de.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function k_(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case mi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=de.DOLLY;break;case mi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=de.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=de.ROTATE}break;case mi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=de.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=de.PAN}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Pc)}function G_(n){switch(this.state){case de.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case de.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case de.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function V_(n){this.enabled===!1||this.enableZoom===!1||this.state!==de.NONE||(n.preventDefault(),this.dispatchEvent(Pc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent($u))}function H_(n){this.enabled!==!1&&this._handleKeyDown(n)}function W_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case gi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=de.TOUCH_ROTATE;break;case gi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=de.TOUCH_PAN;break;default:this.state=de.NONE}break;case 2:switch(this.touches.TWO){case gi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=de.TOUCH_DOLLY_PAN;break;case gi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=de.TOUCH_DOLLY_ROTATE;break;default:this.state=de.NONE}break;default:this.state=de.NONE}this.state!==de.NONE&&this.dispatchEvent(Pc)}function X_(n){switch(this._trackPointer(n),this.state){case de.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case de.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case de.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case de.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=de.NONE}}function q_(n){this.enabled!==!1&&n.preventDefault()}function Y_(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Z_(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ju="0.1 (fase 1)",rn={host:{name:"Tom\xE1s Rivero",role:"Presentador",voice:"host"},co1:{name:"Luc\xEDa Brisa",role:"Copresentadora",voice:"co"},co2:{name:"Nerea Pixel",role:"Copresentadora (streamer)",voice:"co"},co3:{name:"Marisa Copla",role:"Copresentadora (humor)",voice:"co"},ref1:{name:"Juli\xE1n Ferrer",role:"\xC1rbitro"},ref2:{name:"Roc\xEDo Paredes",role:"\xC1rbitra"},vaca:{name:"Canela",role:"La vaquilla (botarga)"},dino:{name:"Trufo",role:"El dinosaurio"},clown:{name:"Pipo Volteretas",role:"Acr\xF3bata y payaso"},host07:{name:"Gonzalo Sierra",role:"Presentador (etapa auton\xF3mica)",voice:"host"}},Fr={e1995:{id:"e1995",name:"Cuando calienta el sol",years:"1995",emoji:"\u2600\uFE0F",towns:4,colors:["azul","rojo","amarillo","verde"],host:"host",cos:["co1"],bullring:!0,vaquilla:"real",prize:"4.000.000 pesetas",title:"CUANDO CALIENTA EL SOL",desc:"4 pueblos de menos de 5.000 habitantes, con sus colores, alcalde y padrino."},e1996:{id:"e1996",name:"Grand Prix \xB7 La 1",years:"1996-2005",emoji:"\u{1F42E}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1"],bullring:!0,vaquilla:"real",prize:"6.000.000 pesetas",title:"GRAND PRIX",desc:"Dos pueblos, azul y amarillo, en la plaza de toros con la vaquilla."},e2007:{id:"e2007",name:"Grand Prix \xB7 Auton\xF3micas",years:"2007-2009",emoji:"\u{1F4FA}",towns:2,colors:["azul","amarillo"],host:"host07",cos:["co3"],bullring:!0,vaquilla:"real",prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"La etapa de las cadenas auton\xF3micas, con otro presentador."},e2023:{id:"e2023",name:"Grand Prix 2023",years:"2023",emoji:"\u{1F9B8}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1","co2"],bullring:!1,vaquilla:"botarga",comodin:"supervaquilla",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Vuelve el Grand Prix. La vaquilla es una botarga y el alcalde la usa como comod\xEDn."},e2024:{id:"e2024",name:"Grand Prix 2024",years:"2024",emoji:"\u{1F514}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1","co2"],bullring:!1,vaquilla:"botarga",comodin:"campana",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Suena la campana y la vaquilla entra 30 segundos en la prueba."},e2025:{id:"e2025",name:"Grand Prix 2025",years:"2025",emoji:"\u{1F947}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co2","co3"],bullring:!1,vaquilla:"botarga",comodin:"dorada2",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Cada pueblo tiene su Vaquilla dorada: si gana la prueba donde la usa, +2 puntos."},e2026:{id:"e2026",name:"Grand Prix 2026",years:"2026",emoji:"\u{1F3C6}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co3"],bullring:!1,vaquilla:"botarga",comodin:"dorada1",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Solo hay una Vaquilla dorada y se gana en \xABPasi\xF3n de capitanes\xBB."},navidad:{id:"navidad",name:"Grand Prix de la Navidad",years:"2024",emoji:"\u{1F384}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co2"],bullring:!1,vaquilla:"botarga",comodin:"cajas",dino:!0,clown:!0,prize:"Trofeo de Navidad",title:"GRAND PRIX",navidad:!0,desc:"Especial de Navidad: los padrinos eligen cajas con comodines."}},Or="e2026",yn={azul:"#1f6fe0",amarillo:"#ffd21a",rojo:"#e23a2a",verde:"#2fb84a"},Ic=[["Cudillero",1995],["Guijuelo",1996],["Murchante",1997],["Tordera",1998],["El Bonillo",1999],["Suances",2e3],["Nuevo Bazt\xE1n",2001],["Gri\xF1\xF3n",2002],["Los Molinos",2003],["Falces",2004],["Carri\xF3n de los Condes",2005],["Ricote",2007],["Ador",2008],["Renedo de Esgueva",2009],["Alfacar",2023],["Olvera",2024],["Aguilar de Campoo","2024 Navidad"],["San Sebasti\xE1n de la Gomera",2025],["Quintanar del Rey",2026]],Lc=Ic.map(n=>n[0]).concat(["Villarrubia del Monte","Castrillo de la Ribera","Fuentesauco del Valle","San Mart\xEDn de la Sierra","Pe\xF1alba de Arriba","Navalcuervo"]),Ku=["Pilar Ortega","Andr\xE9s Molina","Carmen Vidal","F\xE9lix Navarro","Rosa Ben\xEDtez","Ignacio Lara","Maite Serrano","Luis Campos"],ju=["Toni Estrella","Vera Lumen","Dani Saeta","Olga Ribera","Rafa Montes","Sara Vega","Quique Flash","Ana Sol"],Qu=[{id:"normal",emoji:"\u2B50",name:"Normal"},{id:"peques",emoji:"\u{1F9D2}",name:"Especial peques"},{id:"aniversario",emoji:"\u{1F382}",name:"10.\xBA aniversario"},{id:"portugal",emoji:"\u{1F1F5}\u{1F1F9}",name:"Espa\xF1a-Portugal"},{id:"navidad",emoji:"\u{1F384}",name:"Navidad"},{id:"campeones",emoji:"\u{1F3C6}",name:"Campeones"},{id:"noche",emoji:"\u{1F319}",name:"Noche de verano"}];function vn(n,t,e){let i=document.createElement("canvas");i.width=n,i.height=t,e(i.getContext("2d"),n,t);let s=new hi(i);return s.colorSpace=Re,s.anisotropy=4,s}function $_(){return vn(256,256,n=>{n.fillStyle="#ffd21a",n.beginPath(),n.arc(128,128,126,0,7),n.fill(),n.fillStyle="#1f4fc8",n.beginPath(),n.arc(128,128,116,0,7),n.fill(),n.fillStyle="#e2321e",n.beginPath(),n.arc(128,128,86,0,7),n.fill(),n.fillStyle="#ffe9b0",n.beginPath(),n.arc(128,136,58,0,7),n.fill(),n.fillStyle="#c9782e",n.beginPath(),n.ellipse(128,132,34,40,0,0,7),n.fill(),n.fillStyle="#f2b8a8",n.beginPath(),n.ellipse(128,156,22,14,0,0,7),n.fill(),n.fillStyle="#fff",[[112,120],[144,120]].forEach(([e,i])=>{n.beginPath(),n.arc(e,i,9,0,7),n.fill()}),n.fillStyle="#111",[[114,121],[142,121]].forEach(([e,i])=>{n.beginPath(),n.arc(e,i,4.5,0,7),n.fill()}),n.strokeStyle="#f4ede2",n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(100,100),n.quadraticCurveTo(86,82,96,74),n.moveTo(156,100),n.quadraticCurveTo(170,82,160,74),n.stroke(),n.font="900 26px Arial",n.textAlign="center",n.fillStyle="#fff";let t=(e,i,s,r)=>{for(let a=0;a<e.length;a++){let o=s+r*a*.17;n.save(),n.translate(128+Math.cos(o)*i,128+Math.sin(o)*i),n.rotate(o+r*Math.PI/2),n.fillText(e[a],0,8),n.restore()}};t("GRAND",100,-Math.PI/2-.34,1),t("PRIX",100,Math.PI/2+.26,-1)})}function td(n,t){let e=new ue;e.name="plato2023",n.add(e);let i=(R,Z={})=>new Ui(Object.assign({color:R,roughness:.6},Z)),s=R=>new Ae({color:R}),r=(R,Z,mt=0,ht=0,ft=0,Tt=e)=>{let U=new Oe(R,Z);return U.position.set(mt,ht,ft),Tt.add(U),U},a=vn(256,256,(R,Z,mt)=>{let ht=R.createRadialGradient(128,128,10,128,128,180);ht.addColorStop(0,"#bfeeff"),ht.addColorStop(1,"#6cc8ea"),R.fillStyle=ht,R.fillRect(0,0,Z,mt),R.globalAlpha=.18,R.fillStyle="#fff";for(let ft=0;ft<40;ft++)R.beginPath(),R.ellipse(Math.random()*Z,Math.random()*mt,30,8,Math.random()*3,0,7),R.fill()});a.wrapS=a.wrapT=ls,a.repeat.set(4,4);let o=r(new Ce(110,80).rotateX(-Math.PI/2),i("#ffffff",{map:a,roughness:.12,metalness:.15}),0,0,5);o.receiveShadow=!0;let l=vn(2048,512,(R,Z,mt)=>{let ht=R.createLinearGradient(0,0,Z,0);ht.addColorStop(0,"#ff5ab4"),ht.addColorStop(.3,"#8fd0ff"),ht.addColorStop(.7,"#8fd0ff"),ht.addColorStop(1,"#ff5ab4"),R.fillStyle=ht,R.fillRect(0,0,Z,mt),R.fillStyle="#ffffffcc";for(let ft=0;ft<9;ft++){let Tt=ft*240+60,U=60+ft%3*40;for(let Wt=0;Wt<4;Wt++)R.beginPath(),R.arc(Tt+Wt*26,U+Wt%2*8,26,0,7),R.fill()}R.fillStyle="#4fae4a";for(let ft=0;ft<8;ft++){let Tt=120+ft*260;R.beginPath(),R.ellipse(Tt,300,50,70,0,0,7),R.fill(),R.fillStyle="#6a4520",R.fillRect(Tt-6,350,12,80),R.fillStyle="#4fae4a"}R.fillStyle="#b8b0a4";for(let ft of[140,1880])R.fillRect(ft-70,200,140,312),R.fillStyle="#7ec8ff",R.beginPath(),R.arc(ft,330,46,Math.PI,0),R.fill(),R.fillRect(ft-46,330,92,182),R.fillStyle="#b8b0a4"}),c=r(new xe(52,52,26,40,1,!0,-Math.PI*.72,Math.PI*.44),new Ae({map:l,side:ke}),0,13,22);c.rotation.y=Math.PI;let h=["#f6c43a","#f08a3a","#9a6ad8","#f27ab0","#c7a6f0","#e85a4a","#f6c43a"],d=vn(128,256,(R,Z,mt)=>{R.fillStyle="#fff",R.fillRect(0,0,Z,mt),R.globalCompositeOperation="source-over";for(let ht=0;ht<3;ht++)for(let ft=0;ft<2;ft++){let Tt=18+ft*56,U=20+ht*80;R.fillStyle="#fff8e0",R.fillRect(Tt-4,U-4,44,60),R.fillStyle="#3a6ad8",R.fillRect(Tt,U,36,52),R.fillStyle="#ffd",R.fillRect(Tt+16,U,4,52),R.fillRect(Tt,U+24,36,4),R.fillStyle="#e8508a",R.fillRect(Tt-4,U+54,44,8)}});[[-40,-14,-.25],[-31,-19,-.12],[-22,-21,.08],[22,-21,-.08],[31,-19,.12],[40,-14,.25],[-12,-25,0],[12,-25,0]].forEach(([R,Z,mt],ht)=>{let ft=new ue;ft.position.set(R,0,Z),ft.rotation.z=mt*.4,ft.rotation.y=-R/60,e.add(ft);let Tt=h[ht%h.length],U=i(Tt,{map:d}),Wt=15+ht%3*3;r(new jt(8,Wt,4),U,0,Wt/2+4,0,ft);let Yt=r(new un(6.4,4,4),i("#a8402a"),0,Wt+6,0,ft);Yt.rotation.y=Math.PI/4,Yt.scale.z=.6,r(new jt(6,.3,1.2),i("#ffffff"),0,Wt*.55+4,2.4,ft),r(new jt(6,.6,.6),i("#3fa04a"),0,Wt*.55+4.5,2.8,ft)});let f=new ue;f.position.set(0,0,-20),e.add(f);let _=vn(256,256,(R,Z,mt)=>{for(let ht=0;ht<16;ht++)for(let ft=0;ft<8;ft++)R.fillStyle=(ht+ft)%3?"#3f6ad8":"#5a86f0",(ht*7+ft)%11===0&&(R.fillStyle="#f6c43a"),R.fillRect(ft*32+ht%2*16-16,ht*16,30,14)});r(new jt(22,12,6),i("#ffffff",{map:_}),0,6,0,f),r(new jt(24,1,8),i("#f4f0e8"),0,12.3,.5,f);let S=vn(256,64,(R,Z,mt)=>{R.fillStyle="#fff";for(let ht=0;ht<16;ht++)R.beginPath(),R.ellipse(8+ht*16,34,5,22,0,0,7),R.fill();R.fillRect(0,0,Z,10),R.fillRect(0,54,Z,10)});r(new Ce(24,3),new Ae({map:S,transparent:!0,side:Ge}),0,14.3,4.5,f);let m=vn(128,256,(R,Z,mt)=>{R.fillStyle="#f4f0e8",R.fillRect(0,0,Z,mt),R.fillStyle="#ff6ac8",R.beginPath(),R.arc(64,90,56,Math.PI,0),R.fill(),R.fillRect(8,90,112,166),R.fillStyle="#ffd2f0";for(let ht=0;ht<6;ht++)for(let ft=0;ft<4;ft++)R.fillRect(18+ft*24,100+ht*24,18,18);R.fillStyle="#7ac8ff",R.beginPath(),R.arc(64,60,26,0,7),R.fill(),R.strokeStyle="#fff",R.lineWidth=3;for(let ht=0;ht<8;ht++)R.beginPath(),R.moveTo(64,60),R.lineTo(64+Math.cos(ht*.785)*26,60+Math.sin(ht*.785)*26),R.stroke()});for(let R of[-7,7])r(new Ce(5,10),new Ae({map:m}),R,5,3.02,f);let p=$_(),w=r(new xe(3.2,3.2,.5,32).rotateX(Math.PI/2),[i("#ffd21a"),new Ae({map:p}),i("#ffd21a")],0,6.5,3.3,f);r(new xe(1.6,1.6,.3,24).rotateX(Math.PI/2),[i("#ffd21a"),new Ae({map:p}),i("#ffd21a")],0,16.5,4.5,f);for(let R of[-5,5]){let Z=r(new Ce(3.6,2.2),i((R<0,"#1f4fc8")),R,16.5,4.5,f);r(new Di(.8,20),new Ae({map:p}),R,16.5,4.52,f)}for(let R=0;R<3;R++)r(new jt(26-R*2,.5,2),i("#4fe0e8",{emissive:"#1ab8d0",emissiveIntensity:.5}),0,.25+R*.5,4.5-R*1.4,f);let L={},y=new xe(.14,.2,1.4,6);function b(R,Z){let mt=new ue;mt.position.set(R*26,0,-8),mt.rotation.y=R*.32,e.add(mt);let ht=26;for(let T=0;T<6;T++)r(new jt(ht,1.3,3),i("#3fc6dc",{roughness:.4}),0,.65+T*1.3,10-T*3,mt),r(new jt(ht,.12,.12),s("#9ff8ff"),0,1.32+T*1.3,11.5-T*3,mt);let ft=22,Tt=new Fn(y,i("#ffffff"),ft*2),U=new Me;for(let T=0;T<ft;T++)for(let g=0;g<2;g++)U.position.set(-ht/2+.6+T*(ht-1.2)/(ft-1),(g?7.8:2)+.7,g?0-.5:9),U.updateMatrix(),Tt.setMatrixAt(T*2+g,U.matrix);mt.add(Tt);for(let[T,g]of[[3.4,9],[9.2,-.5]])r(new jt(ht,.3,.5),i("#ffffff"),0,T,g,mt);let Wt=t?80:180,Yt=new Fn(new Li(.32,.7,2,6),i("#ffffff"),Wt);for(let T=0;T<Wt;T++){let g=1+T%5;U.position.set(-ht/2+1+Math.random()*(ht-2),1.95+g*1.3,10-g*3+Math.random()*.6),U.updateMatrix(),Yt.setMatrixAt(T,U.matrix),Yt.setColorAt(T,new Jt(yn[Z]).offsetHSL(0,0,(Math.random()-.5)*.15))}return mt.add(Yt),mt.userData.crowd=Yt,mt}let M=b(-1,"azul"),A=b(1,"amarillo"),x=new ue;x.position.set(-40,0,16),x.rotation.y=Math.PI/2,e.add(x),r(new jt(20,1.4,10),i("#ffffff"),0,.7,0,x);let E=r(new jt(19,.2,9),i("#1ab0e8",{roughness:.08,metalness:.2,transparent:!0,opacity:.9}),0,1.35,0,x),C=vn(512,256,(R,Z,mt)=>{R.fillStyle="#e8d8c8",R.fillRect(0,0,Z,mt);for(let ht=0;ht<4;ht++){let ft=64+ht*128;R.fillStyle="#ff8a3a",R.beginPath(),R.arc(ft,110,46,Math.PI,0),R.fill(),R.fillRect(ft-46,110,92,130),R.fillStyle="#ffd2a0",R.fillRect(ft-3,70,6,170)}});r(new Ce(22,11),new Ae({map:C}),0,5.5,-5.5,x);let I=r(new Ce(10,5.6),s("#ffffff"),0,14,-5.4,x);r(new jt(10.6,6.2,.4),i("#111"),0,14,-5.7,x);let O=new ue;O.position.set(9,0,-12),e.add(O),r(new jt(9,2.2,1.6),i("#1f4fc8"),0,1.1,0,O),r(new jt(9.4,.3,2),i("#ffd21a"),0,2.3,0,O);let V=[];for(let R of[-2.4,2.4]){let Z=r(new Ce(4,1.6),new Ae({color:"#fff"}),R,1.2,.81,O);V.push(Z)}let F=new ue;F.position.set(-6,0,-9),e.add(F),r(new jt(1.6,2.4,1),i("#ffd21a"),0,1.2,0,F),r(new jt(2,.25,1.3),i("#ffe86a"),0,2.5,.1,F);for(let R of[-.7,.7])r(new xe(.08,.08,3,6),i("#ffd21a"),R,1.5,-.6,F);function H(R,Z){[R,Z].forEach((mt,ht)=>{let ft=vn(256,96,Tt=>{Tt.fillStyle="#ffd21a",Tt.fillRect(0,0,256,96),Tt.fillStyle="#1f4fc8",Tt.fillRect(6,6,244,84),Tt.fillStyle="#fff",Tt.font="900 40px Arial",Tt.textAlign="center",Tt.fillText(String(mt).toUpperCase().slice(0,12),128,62)});V[ht].material.map=ft,V[ht].material.needsUpdate=!0})}H("AZUL","AMARILLO");let J=new ue;e.add(J);let X=i("#2a2a30",{metalness:.6});for(let R of[-14,0,14])r(new jt(90,.6,.6),X,0,26,R,J);for(let R of[-30,0,30])r(new jt(.6,.6,40),X,R,26,0,J);r(new Ce(120,80).rotateX(Math.PI/2),s("#0a0c14"),0,30,0,J);let B=new Fn(new xe(.6,.8,1.2,8),s("#ffffff"),36),N=new Me;for(let R=0;R<36;R++)N.position.set(-42+R%12*7.6,25.2,-14+Math.floor(R/12)*14),N.updateMatrix(),B.setMatrixAt(R,N.matrix);J.add(B);let P=new Ae({color:"#cfe8ff",transparent:!0,opacity:t?.05:.08,depthWrite:!1,blending:Mr,side:Ge}),G=[];for(let R=0;R<(t?4:8);R++){let Z=r(new un(2.6,24,12,1,!0),P,-30+R*(60/(t?3:7)),13.5,-6+R%2*10);G.push(Z)}for(let R=0;R<10;R++)r(new je(.35,8,6),s("#3a7aff"),-40+R*9,24,15);let ot=new ue;e.add(ot);let rt=new ue;rt.position.set(10,0,4),ot.add(rt);for(let R=0;R<5;R++){let Z=r(new jt(5,.6,3),i(R%2?"#2a5ad8":"#3a7aff"),-3+R%3*4.2,.3,-1+Math.floor(R/3)*3.2,rt);Z.rotation.y=(R-2)*.12}for(let R=0;R<3;R++)r(new jt(8-R*1.6,.7,2.4-R*.4),i("#e2321e"),4,.35+R*.7,-4+R*.3,rt);let Pt=[];[[0,0],[.9,.1],[1.2,.6],[1.1,1.4],[.7,2.3],[.45,2.9],[.6,3.5],[.55,4.1],[0,4.4]].forEach(([R,Z])=>Pt.push(new gt(R,Z)));let Ft=vn(64,256,R=>{R.fillStyle="#fff",R.fillRect(0,0,64,256),R.fillStyle="#ffd21a",R.fillRect(0,0,22,256),R.fillRect(42,0,22,256),R.fillStyle="#fff",R.fillRect(0,40,64,14)}),Kt=new fr(Pt,14),et=i("#ffffff",{map:Ft,roughness:.35}),at=[];[[2,-4.4],[4,-4.1],[6,-3.8],[3,-2.4],[5,-2.2]].forEach(([R,Z])=>{let mt=r(Kt,et,R,2.1,Z,rt);mt.scale.setScalar(.9),at.push(mt)});let yt=vn(256,128,R=>{["#ffffff","#ffd21a","#ffffff","#3a9aff","#ffffff","#ff5a3a"].forEach((Z,mt)=>{R.fillStyle=Z,R.fillRect(mt*43,0,43,128)})}),Dt=new ue;Dt.position.set(-2,25.5,4),ot.add(Dt);let At=r(new xe(.04,.04,21,4),s("#ddd"),0,-10.5,0,Dt),Ht=r(new je(1.6,20,14),i("#fff",{map:yt,roughness:.3}),0,-21.5,0,Dt),Zt=new ue;Zt.position.set(30,0,12),Zt.rotation.y=-Math.PI/3,ot.add(Zt);let st=vn(256,64,R=>{for(let Z=0;Z<8;Z++)R.fillStyle=Z%2?"#fff":"#e2321e",R.fillRect(Z*32,0,32,64)}),ut=r(new Ce(12,4),i("#fff",{map:st,side:Ge}),0,9,0,Zt);ut.rotation.x=-1;for(let R of[-5.6,5.6])r(new xe(.15,.15,9,6),i("#ddd"),R,4.5,1.6,Zt);let dt=[];for(let R=0;R<4;R++){let Z=new ue;Z.position.set(-6+R*4,0,4),Zt.add(Z);let mt=R%2;r(new je(1,12,10),i(mt?"#222":"#ffd21a"),0,1.6,0,Z).scale.set(1,1.4,1),r(new je(.65,10,8),i(mt?"#222":"#ffd21a"),0,3.2,0,Z),mt&&r(new je(.7,10,8),i("#fff"),0,1.6,.4,Z).scale.set(.8,1.2,.6),r(new un(.25,.7,8).rotateX(Math.PI/2),i("#ff8a1a"),0,3.1,.8,Z),dt.push(Z)}return{G:e,gl:M,gr:A,screen:I,setTowns:H,castle:f,pool:x,desk:O,lectern:F,bowl:rt,ball:Ht,pivot:Dt,ducks:dt,pins:at,medal:w,update(R){Dt.rotation.z=Math.sin(R*1.1)*.35,Dt.rotation.x=Math.sin(R*.7)*.1,G.forEach((Z,mt)=>{Z.rotation.z=Math.sin(R*.5+mt)*.25,Z.rotation.x=Math.cos(R*.4+mt)*.2}),dt.forEach((Z,mt)=>{Z.position.x=-6+(mt*4+R*1.5)%16,Z.rotation.z=Math.sin(R*6+mt)*.1}),E.position.y=1.35+Math.sin(R*2)*.03},SHOTS:{overview:[[0,14,42],[0,7,-12]],pool:[[-18,9,16],[-40,8,16]],host:[[-4,4,0],[-6,3,-9]],board:[[-24,13,16],[-45,13,16]],logo:[[0,9,-5],[0,8,-17]],vaca:[[16,5,24],[14,2,12]],dino:[[-16,5,24],[-14,2,12]],ramp:[[0,8,22],[10,2,1]],arena:[[14,7,26],[26,3,14]],ring:[[0,14,42],[0,7,-12]],bolera:[[-4,7,20],[8,3,0]],pato:[[18,6,28],[30,4,14]],gradas:[[0,8,14],[26,6,-10]]}}}var ed=["auto","media","alta","ultra"],nd={auto:"Auto",media:"Media",alta:"Alta",ultra:"Ultra (4K)"},J_={media:1,alta:2,ultra:3};function id(n,t){let e=t==="media"||t==="auto"&&(navigator.hardwareConcurrency||4)<=4,i=new Xo({antialias:!e,powerPreference:"high-performance"}),s=t==="auto"?e?1:Math.min(devicePixelRatio,2):Math.min(devicePixelRatio*1.5,J_[t]);i.setPixelRatio(s),i.setSize(innerWidth,innerHeight),i.outputColorSpace=Re,i.toneMapping=Er,i.shadowMap.enabled=!e,i.shadowMap.type=Ja,n.appendChild(i.domElement);let r=new Ks;r.background=new Jt("#7fc6ff"),r.fog=new Js("#bfe4ff",90,220);let a=new Xe(55,innerWidth/innerHeight,.1,500);a.position.set(0,24,58);let o=(tt,D={})=>new Ui(Object.assign({color:tt,roughness:.7},D)),l=(tt,D,nt=0,Q=0,_t=0,pt=r)=>{let ct=new Oe(tt,D);return ct.position.set(nt,Q,_t),ct.castShadow=ct.receiveShadow=!e,pt.add(ct),ct};r.add(new _r("#ffffff","#c8a070",1.1));let c=new yr("#fff4d8",2.2);c.position.set(30,60,25),c.castShadow=!e,c.shadow.mapSize.set(1024,1024),Object.assign(c.shadow.camera,{left:-60,right:60,top:60,bottom:-60}),r.add(c);let h={},d=tt=>{let D=new ue;return D.name=tt,r.add(D),h[tt]=D,D},u=d("base");l(new Ce(400,400).rotateX(-Math.PI/2),o("#e9cf93"),0,0,0,u),l(new Di(48,48).rotateX(-Math.PI/2),o("#f3e2b0"),0,.02,0,u);let f=d("pool");l(new jt(34,1.2,18),o("#ffffff"),0,.6,0,f);let _=l(new jt(32,.2,16),o("#28b8e8",{roughness:.15,metalness:.1,transparent:!0,opacity:.9}),0,1.1,0,f),S=[];for(let tt=0;tt<3;tt++){let D=l(new xe(2.2,2.2,.5,20),o(["#ff5a3a","#ffd21a","#3a8aff"][tt]),-9+tt*9,1.6,0,f);S.push(D)}let m=l(new xe(.9,.9,30,16).rotateZ(Math.PI/2),o("#8a5a2a"),0,3,-5.5,f),p=new ue;p.position.set(9,1.4,4),f.add(p),l(new xe(.6,.6,2,12),o("#e23a2a"),0,.8,0,p),l(new jt(12,.5,.5),o("#ff9b1a"),6,1.6,0,p);let w=d("ramp");w.position.set(-30,0,-6);let L=new jt(6,.6,18),y=l(L,o("#ffffff",{roughness:.2}),0,4,0,w);y.rotation.x=-.45,l(new jt(6.6,9,1),o("#2a6ad8"),0,4.5,-8.6,w),l(new je(.8,12,10),o("#ffd21a",{metalness:.8,roughness:.3}),0,10,-8.6,w);let b=d("ring");b.position.set(0,0,-48),l(new xe(22,22,.1,48),o("#e3b36a"),0,.06,0,b);let M=l(new xe(22.5,22.5,2,48,1,!0),o("#b8322a",{side:Ge}),0,1,0,b);for(let tt=0;tt<4;tt++)l(new xe(30-tt*.1+tt*2.5,23+tt*2.5,1.6,48,1,!0),o(tt%2?"#f4ede2":"#d9cbb3",{side:Ge}),0,2.6+tt*1.6,0,b);let A=d("arena");A.position.set(0,0,-44),l(new jt(44,.3,22),o("#5fbf5a"),0,.15,0,A);for(let tt=0;tt<6;tt++)l(new jt(3,3,3),o(["#ff5a3a","#ffd21a","#3a8aff"][tt%3]),-15+tt*6,1.8,6*(tt%2?1:-1)*.5,A);for(let tt=0;tt<2;tt++)l(new pr(4,.5,10,30),o("#ffffff"),-10+tt*20,4.5,-8,A);let x=d("gradas");for(let tt of[-1,1]){let D=new ue;D.position.set(tt*42,0,4),D.rotation.y=-tt*Math.PI/2,x.add(D);for(let pt=0;pt<5;pt++)l(new jt(40,1.2,2),o(tt<0?"#2a6ad8":"#f3c21a"),0,.6+pt*1.2,-pt*2,D);let nt=new Me,Q=e?60:160,_t=new Fn(new Li(.35,.6,2,6),o("#ffffff"),Q);for(let pt=0;pt<Q;pt++)nt.position.set(-19+Math.random()*38,1.9+pt%5*1.2,-(pt%5)*2),nt.updateMatrix(),_t.setMatrixAt(pt,nt.matrix),_t.setColorAt(pt,new Jt().setHSL(tt<0?.6:.14,.8,.4+Math.random()*.3));D.add(_t)}let E=d("board");E.position.set(0,0,26);let C=document.createElement("canvas");C.width=1024,C.height=512;let I=new hi(C);I.colorSpace=Re,l(new jt(22,12,1),o("#111"),0,10,0,E);let O=l(new Ce(21,10.5),new Ae({map:I}),0,10,-.55,E);O.rotation.y=Math.PI,l(new jt(1,5,1),o("#666"),-8,2.5,0,E),l(new jt(1,5,1),o("#666"),8,2.5,0,E);function V(tt,D="CLASIFICACI\xD3N"){let nt=C.getContext("2d"),Q=nt.createLinearGradient(0,0,0,512);Q.addColorStop(0,"#0a2a7a"),Q.addColorStop(1,"#03103a"),nt.fillStyle=Q,nt.fillRect(0,0,1024,512),nt.fillStyle="#ffd21a",nt.font="900 56px Arial",nt.textAlign="center",nt.fillText(D,512,70);let _t=Math.min(100,400/Math.max(1,tt.length));tt.forEach((pt,ct)=>{let zt=100+ct*_t;nt.fillStyle=yn[pt.color]||pt.color,nt.fillRect(40,zt,944,_t-12),nt.fillStyle=pt.color==="amarillo"?"#3a1a00":"#fff",nt.font=`900 ${Math.round(_t*.5)}px Arial`,nt.textAlign="left",nt.fillText(pt.name.toUpperCase().slice(0,22),70,zt+_t*.6),nt.textAlign="right",nt.fillText(String(pt.pts),950,zt+_t*.6)}),I.needsUpdate=!0}V([{name:"Azul",color:"azul",pts:0},{name:"Amarillo",color:"amarillo",pts:0}]);let F=d("logo");F.position.set(0,0,-20);let H=document.createElement("canvas");H.width=1024,H.height=384;let J=new hi(H);J.colorSpace=Re;let X=new _s,B=9,N=3.2,P=1.4;X.moveTo(-B+P,-N),X.lineTo(B-P,-N),X.quadraticCurveTo(B,-N,B,-N+P),X.lineTo(B,N-P),X.quadraticCurveTo(B,N,B-P,N),X.lineTo(-B+P,N),X.quadraticCurveTo(-B,N,-B,N-P),X.lineTo(-B,-N+P),X.quadraticCurveTo(-B,-N,-B+P,-N);let G=l(new dr(X,{depth:1,bevelEnabled:!0,bevelSize:.3,bevelThickness:.3,bevelSegments:2}),o("#e2321e",{metalness:.3,roughness:.4}),0,12,0,F),ot=l(new Ce(17.4,6.4),new Ae({map:J,transparent:!0}),0,12,1.35,F),rt=l(new xe(4,4,.8,32).rotateX(Math.PI/2),o("#ffc81a",{emissive:"#ff9a00",emissiveIntensity:.4}),7.5,15,-.4,F),Pt=new ue;Pt.position.set(7.5,15,-.6),F.add(Pt);for(let tt=0;tt<12;tt++){let D=l(new un(.6,2.2,6),o("#ffb000"),0,0,0,Pt),nt=tt/12*Math.PI*2;D.position.set(Math.cos(nt)*5.4,Math.sin(nt)*5.4,0),D.rotation.z=nt-Math.PI/2}l(new xe(.4,.4,9,8),o("#999"),0,4.5,0,F);function Ft(tt="GRAND PRIX",D="DEL VERANO"){let nt=H.getContext("2d");nt.clearRect(0,0,1024,384),nt.textAlign="center",nt.font=`900 ${tt.length>14?92:150}px Arial Black, Arial`,nt.lineWidth=18,nt.strokeStyle="#7a1000",nt.strokeText(tt,512,220),nt.fillStyle="#fff",nt.fillText(tt,512,220),nt.font="900 64px Arial",nt.fillStyle="#ffd21a",nt.lineWidth=10,nt.strokeStyle="#7a1000",nt.strokeText(D,512,320),nt.fillText(D,512,320),J.needsUpdate=!0}Ft();let Kt=d("deco");for(let tt=0;tt<8;tt++){let D=tt/8*Math.PI*2+.2,nt=Math.cos(D)*52,Q=Math.sin(D)*52;l(new xe(.4,.6,9,6),o("#8a6a3a"),nt,4.5,Q,Kt);for(let _t=0;_t<5;_t++)l(new un(.8,5,4),o("#2f9a3a"),nt,9,Q,Kt).rotation.set(1.2,_t*1.25,0)}let et=new Fn(new un(.5,1,3),new Ae({color:"#fff"}),60),at=new Me;for(let tt=0;tt<60;tt++){let D=tt/60;at.position.set(-36+D*72,14-Math.sin(D*Math.PI)*3,10),at.rotation.set(Math.PI,0,0),at.updateMatrix(),et.setMatrixAt(tt,at.matrix),et.setColorAt(tt,new Jt(["#e23a2a","#ffd21a","#2a6ad8","#2fb84a"][tt%4]))}Kt.add(et);let yt=d("chars");function Dt(tt,D,nt,Q=1,_t="#f1c6a0"){let pt=new ue;return pt.position.set(D,0,nt),pt.scale.setScalar(Q),l(new xe(.35,.45,1.6,8),o(tt),0,1.6,0,pt),l(new je(.38,10,8),o(_t),0,2.75,0,pt),l(new jt(.5,.9,.5),o("#333"),0,.45,0,pt),yt.add(pt),pt}let At=Dt("#ffffff",-4,14),Ht=Dt("#ff5aa0",4,14),Zt=new ue;Zt.position.set(14,0,12),yt.add(Zt),l(new jt(2.4,1.2,1.1),o("#7a4a22"),0,1.6,0,Zt),l(new jt(.9,.8,.8),o("#7a4a22"),1.5,2.2,0,Zt);for(let[tt,D]of[[-.9,-.4],[-.9,.4],[.9,-.4],[.9,.4]])l(new xe(.15,.15,1,6),o("#3b2412"),tt,.5,D,Zt);for(let tt of[-.3,.3]){let D=l(new un(.12,.5,6),o("#f4ede2"),1.6,2.8,tt,Zt)}let st=new ue;st.position.set(-14,0,12),yt.add(st),l(new je(1.1,12,10),o("#4fbf3a"),0,2,0,st).scale.set(1.3,1,1),l(new je(.7,10,8),o("#4fbf3a"),.9,3.3,0,st),l(new un(.5,2,8).rotateZ(Math.PI/2),o("#4fbf3a"),-1.8,1.8,0,st);for(let tt of[-.5,.5])l(new xe(.25,.3,1.2,6),o("#3a9a2a"),0,.6,tt,st);let ut=Dt("#9a3aff",0,18,1,"#ffffff");l(new je(.12,8,6),o("#ff0000"),0,2.75,.38,ut);let dt=td(r,e);dt.screen.material.map=I,dt.screen.material.needsUpdate=!0,dt.G.add(yt);let R=[u,f,w,A,x,E,F,Kt],Z=!1,mt={classic:[b],modern:[A,st,ut]};function ht(tt){Z=!tt.bullring,dt.G.visible=Z,R.forEach(D=>{D.visible=!Z}),yt.visible=!0,r.add(yt),At.position.set(Z?-6:-4,0,Z?-7.5:14),Ht.position.set(Z?-3:4,0,Z?-7:14),c.intensity=Z?1.2:2.2,r.fog.near=Z?120:90,b.visible=!!tt.bullring,A.visible=!tt.bullring&&!Z,st.visible=!!tt.dino,ut.visible=!!tt.clown,Zt.children.forEach(D=>{D.material&&D.material.color&&D.geometry.type==="BoxGeometry"&&D.material.color.set(tt.vaquilla==="botarga"?"#c98a4a":"#7a4a22")}),r.background.set(Z?"#06070c":tt.navidad?"#1a2a4a":"#7fc6ff"),r.fog.color.set(Z?"#10121c":tt.navidad?"#2a3a5a":"#bfe4ff"),Ft(tt.title,tt.id==="e1995"?"1995":tt.navidad?"DE LA NAVIDAD":"DEL VERANO")}let ft={overview:[[0,30,62],[0,2,0]],pool:[[0,12,24],[0,1,0]],ramp:[[-16,10,12],[-30,4,-6]],ring:[[0,18,-14],[0,0,-48]],arena:[[0,14,-18],[0,0,-44]],board:[[0,10,10],[0,10,26]],logo:[[0,13,2],[0,12,-20]],host:[[0,4,24],[0,2.4,14]],vaca:[[20,5,22],[14,2,12]],dino:[[-20,5,22],[-14,2,12]]},Tt=null,U=null,Wt=1,Yt=1,T=null,g=0;function W(tt,D=1.6){let nt=Z?dt.SHOTS:ft,Q=nt[tt]||nt.overview;Tt=[a.position.clone(),(a.userData.look||new z).clone()],U=[new z(...Q[0]),new z(...Q[1])],Wt=0,Yt=D,g=0}function $(tt){tt&&!T?(T=new $o(a,i.domElement),T.target.copy(a.userData.look||new z),T.maxPolarAngle=1.45,T.enableDamping=!0):!tt&&T&&(T.dispose(),T=null)}let K={on:!1,f:0,s:0,yaw:0,pitch:-.05};function xt(tt){K.on=tt,tt&&(a.position.set(0,2.2,Z?24:34),K.yaw=0)}let vt=!1;function it(tt){vt=tt}let lt=new vr,bt=60,Ot=0,St=0,Mt=!1,Bt=[];function Vt(){if(requestAnimationFrame(Vt),Mt)return;let tt=Math.min(.05,lt.getDelta()),D=lt.elapsedTime;if(Ot++,St+=tt,St>1&&(bt=Ot/St,Ot=0,St=0,t==="auto"&&bt<28&&s>.75&&(s=Math.max(.75,s-.25),i.setPixelRatio(s),i.shadowMap.enabled&&s<=1&&(i.shadowMap.enabled=!1))),S.forEach((nt,Q)=>{nt.position.z=Math.sin(D*.8+Q*2)*5}),m.rotation.x=D*2,p.rotation.y=D*1.2,Pt.rotation.z=D*.3,F.rotation.y=Math.sin(D*.4)*.15,Zt.position.x=14+Math.sin(D*.5)*3,Zt.rotation.y=Math.cos(D*.5)>0?0:Math.PI,st.rotation.y=Math.sin(D)*.4,ut.rotation.y=D*2,At.rotation.y=Math.sin(D*.7)*.3,Wt<1&&U){Wt=Math.min(1,Wt+tt/Yt);let nt=Wt*Wt*(3-2*Wt);a.position.lerpVectors(Tt[0],U[0],nt);let Q=new z().lerpVectors(Tt[1],U[1],nt);a.lookAt(Q),a.userData.look=Q}else if(vt&&!T&&!K.on){g+=tt*.08;let nt=Z?34:60;a.position.set(Math.sin(g)*nt*.8,Z?12:26,(Z?8:0)+Math.cos(g)*nt*.6),a.lookAt(0,Z?6:2,Z?-6:0),a.userData.look=new z(0,2,0)}if(T&&T.update(),K.on){K.yaw-=K.s*tt*1.6;let nt=new z(Math.sin(K.yaw),0,Math.cos(K.yaw)).multiplyScalar(-K.f*tt*9);a.position.add(nt),a.position.y=2.2,a.lookAt(a.position.x-Math.sin(K.yaw),2.2+K.pitch,a.position.z-Math.cos(K.yaw))}Z&&dt.update(D),Bt.forEach(nt=>nt(tt,D)),i.render(r,a)}return Vt(),addEventListener("resize",()=>{a.aspect=innerWidth/innerHeight,a.updateProjectionMatrix(),i.setSize(innerWidth,innerHeight)}),{scene:r,camera:a,renderer:i,Z:h,shot:W,drawBoard:V,drawLogo:Ft,setEtapa:ht,orbitMode:$,walkMode:xt,walk:K,setAutoOrbit:it,ticks:Bt,get fps(){return bt},pause(tt){Mt=tt},chars:{host:At,co:Ht,vaca:Zt,dino:st,clown:ut},P23:dt,setTowns:(tt,D)=>dt.setTowns(tt,D)}}var ae={ctx:null,master:null,music:null,musicVol:.7,voiceOn:!0,cur:null};function zr(){return ae.ctx||(ae.ctx=new(window.AudioContext||window.webkitAudioContext),ae.master=ae.ctx.createGain(),ae.master.connect(ae.ctx.destination)),ae.ctx.state==="suspended"&&ae.ctx.resume(),ae.ctx}var Br=n=>440*Math.pow(2,(n-69)/12);function Jn(n,t,e,i="square",s=.12,r){let a=ae.ctx,o=a.createOscillator(),l=a.createGain();o.type=i,o.frequency.value=t,l.gain.setValueAtTime(s,n),l.gain.exponentialRampToValueAtTime(.001,n+e),o.connect(l),l.connect(r||ae.master),o.start(n),o.stop(n+e+.02)}var sd=[72,76,79,76,77,81,79,0,76,79,84,83,81,79,77,76,74,77,81,79,76,72,74,76,77,76,74,71,72,0,0,0],rd=[48,48,53,53,55,55,48,48];function Cs(n=!0){if(Si(),!n||ae.musicVol<=0)return;let t=zr(),e=t.createGain();e.gain.value=ae.musicVol*.5,e.connect(ae.master);let i=60/132/2,s=0,r=t.currentTime+.05,a=setInterval(()=>{for(;r<t.currentTime+.3;){let o=sd[s%sd.length];o&&Jn(r,Br(o),i*.9,"square",.07,e),s%2===0&&Jn(r,Br(rd[(s>>2)%rd.length]),i*1.8,"triangle",.18,e),s%4===2&&K_(r,.05,.08,e),r+=i,s++}},80);ae.music={id:a,g:e}}function Si(){if(ae.music){clearInterval(ae.music.id);try{ae.music.g.disconnect()}catch{}ae.music=null}}function K_(n,t,e,i){let s=ae.ctx,r=s.createBuffer(1,s.sampleRate*t,s.sampleRate),a=r.getChannelData(0);for(let c=0;c<a.length;c++)a[c]=Math.random()*2-1;let o=s.createBufferSource(),l=s.createGain();o.buffer=r,l.gain.value=e,o.connect(l),l.connect(i||ae.master),o.start(n)}function Gi(n){try{let t=zr(),e=t.currentTime;if(n==="tap")Jn(e,880,.06,"sine",.08);else if(n==="win")[72,76,79,84].forEach((i,s)=>Jn(e+s*.12,Br(i),.3,"square",.1));else if(n==="lose")[67,63,60].forEach((i,s)=>Jn(e+s*.18,Br(i),.35,"sawtooth",.08));else if(n==="whistle")Jn(e,2400,.4,"sine",.12),Jn(e+.05,2550,.35,"sine",.08);else if(n==="bell")[0,.25,.5].forEach(i=>Jn(e+i,1320,.5,"triangle",.14));else if(n==="moo"){let i=t.createOscillator(),s=t.createGain();i.type="sawtooth",i.frequency.setValueAtTime(140,e),i.frequency.linearRampToValueAtTime(110,e+.9),s.gain.setValueAtTime(.15,e),s.gain.linearRampToValueAtTime(0,e+1),i.connect(s),s.connect(ae.master),i.start(e),i.stop(e+1)}else n==="fanfare"&&[60,64,67,72,67,72].forEach((i,s)=>Jn(e+s*.14,Br(i),.25,"square",.1))}catch{}}var j_=()=>document.getElementById("sub");function Jo(n,t,e){return new Promise(i=>{let s=j_();s.classList.remove("hidden"),s.innerHTML=(e?`<b>${e}:</b> `:"")+t;let r=()=>{s.classList.add("hidden"),i()},a=()=>setTimeout(r,Math.max(1600,t.length*55)/(window.__fast?8:1));if(!ae.voiceOn||!n||window.__fast)return a();let o=new Audio("assets/voz/"+n+".mp3");ae.cur=o,o.onended=()=>setTimeout(r,250),o.onerror=a,o.play().catch(a)})}function Dc(){ae.cur&&(ae.cur.pause(),ae.cur=null)}var Ps={h_hola:["host","\xA1Buenas noches y bienvenidos al Grand Prix! \xA1El concurso del verano!"],h_hola95:["host","\xA1Hola, hola! Bienvenidos a Cuando calienta el sol. \xA1Cuatro pueblos y mucho calor!"],h_holanav:["host","\xA1Feliz Navidad! Bienvenidos al Grand Prix de la Navidad."],h_pueblos:["host","Esta noche se enfrentan dos pueblos con muchas ganas de ganar. \xA1Un aplauso para el equipo azul y para el equipo amarillo!"],h_pueblos4:["host","Cuatro pueblos, cuatro colores: azul, rojo, amarillo y verde. \xA1Que empiece la fiesta!"],h_alcaldes:["host","Con ellos, sus alcaldes y sus padrinos, que les ayudar\xE1n en las pruebas de conocimiento."],h_prueba:["host","\xA1Vamos con la siguiente prueba!"],h_vaca:["host","\xA1Cuidado, que sale la vaquilla!"],h_piscina:["host","\xA1Nos vamos a la piscina! \xA1Que nadie se quede seco!"],h_rampa:["host","Atentos, que esto resbala much\xEDsimo."],h_saber:["host","Ahora les toca a los alcaldes y a los padrinos. \xA1A ver cu\xE1nto saben!"],h_yincana:["host","\xA1Yincana! Hay que correr y tener buena memoria."],h_gana_azul:["host","\xA1Prueba para el equipo azul!"],h_gana_amar:["host","\xA1Prueba para el equipo amarillo!"],h_empate:["host","\xA1Empate! Puntos para los dos."],h_marcador:["host","As\xED est\xE1 el marcador."],h_final:["host","Y llegamos a la prueba final. \xA1Vale el doble de puntos!"],h_ganador:["host","\xA1Tenemos pueblo ganador! \xA1Enhorabuena!"],h_adios:["host","\xA1Muchas gracias por acompa\xF1arnos! \xA1Hasta el pr\xF3ximo programa del Grand Prix!"],h_super:["host","El alcalde usa la Supervaquilla. \xA1A molestar al rival!"],h_campana:["host","\xA1Suena la campana! La vaquilla entra treinta segundos."],h_dorada:["host","\xA1El alcalde saca la Vaquilla dorada! Si ganan esta prueba, dos puntos extra."],h_capitanes:["host","Empezamos con Pasi\xF3n de capitanes. \xA1Se juegan la \xFAnica Vaquilla dorada de la noche!"],h_cajas:["host","Los padrinos eligen una caja. \xA1A ver qu\xE9 comod\xEDn les toca!"],h_semis:["host","\xA1Estamos en semifinales! Solo un pueblo pasar\xE1 a la gran final."],h_granfinal:["host","\xA1La gran final del Grand Prix! El ganador se lleva el trofeo."],h_trofeo:["host","\xA1Campeones del Grand Prix! \xA1Ese trofeo se va para el pueblo!"],h_historia1:["host","Hace muchos veranos, un concurso de pueblos llen\xF3 de risas las noches de la tele."],h_historia2:["host","Empez\xF3 en mil novecientos noventa y cinco con cuatro pueblos, y al a\xF1o siguiente pas\xF3 a ser un duelo entre dos: azul contra amarillo."],h_historia3:["host","La vaquilla, la piscina y las pruebas locas lo convirtieron en un cl\xE1sico del verano."],h_historia4:["host","Despu\xE9s vinieron las cadenas auton\xF3micas, y en dos mil veintitr\xE9s volvi\xF3 a la tele con la vaquilla de botarga, un dinosaurio y un payaso acr\xF3bata."],h_historia5:["host","Y hasta tuvo su edici\xF3n de Navidad. \xA1Esta es la historia del Grand Prix!"],h_promo1:["host","Este verano vuelve la fiesta de los pueblos. \xA1No te lo pierdas!"],h_promo2:["host","Vaquillas, piscinas y mucho humor. \xA1El Grand Prix, todas las semanas!"],h_promo3:["host","\xBFTu pueblo tiene lo que hay que tener? \xA1Ap\xFAntate al Grand Prix!"],h_falsa1:["host","Bienvenidos al Grand\u2026 \xA1ay! \xA1Que me resbalo! \xA1Corten, corten!"],h_falsa2:["host","\xA1Prueba para el equipo\u2026 verde! Perd\xF3n, que eso era en el noventa y cinco."],h_falsa3:["host","\xA1Quieta, vaquilla, que ese es mi micr\xF3fono!"],h_oculta1:["host","Le hemos dicho al \xE1rbitro que la piscina est\xE1 llena de gelatina. \xA1Mirad su cara!"],h_oculta2:["host","El alcalde cree que tiene que bailar con la vaquilla delante de todo el pueblo."],h_fuera1:["host","Esto es lo que no se ve: el equipo prepara la piscina antes del programa."],h_fuera2:["host","Los vecinos ensayan los gritos de \xE1nimo en el autob\xFAs."],h_casting:["host","Bienvenido al casting del Grand Prix. \xBFC\xF3mo se llama tu pueblo?"],h_casting2:["host","\xA1Perfecto! Ya form\xE1is parte del concurso del verano."],h_paseo:["host","Date una vuelta por el plat\xF3: la piscina, la rampa y el marcador."],h_pub1:["co","Helados Brisamar. \xA1El sabor del verano en cada bocado!"],h_pub2:["co","Crema solar Solecito. \xA1Protege tu piel en las fiestas del pueblo!"],h_pub3:["co","Refrescos Burbuja Loca. \xA1Para los d\xEDas de calor!"],c_hola:["co","\xA1Hola a todos! \xA1Qu\xE9 ganas de verano!"],c_vamos:["co","\xA1Vamos, vamos, que se acaba el tiempo!"],c_bien:["co","\xA1Qu\xE9 bien lo han hecho!"],c_credits:["co","Grand Prix tres D. Un remake de fans, sin relaci\xF3n con el programa original."]};var ad=n=>new Promise(t=>setTimeout(t,window.__fast?n/10:n)),Kn=n=>n[Math.floor(Math.random()*n.length)],Ye=(n,t)=>Jo(n,Ps[n][1],t),Nc=n=>document.getElementById(n);function od(n,t){let e=Nc("card");function i(y,b=2600){return e.innerHTML=y,e.classList.remove("hidden"),ad(b).then(()=>e.classList.add("hidden"))}let s=y=>rn[y.host].name;async function r(y,b){let M=b?["<b>Grand Prix 3D</b><br>remake de fans",`Presentador<br><b>${s(y)}</b> (personaje virtual)`,`Copresentaci\xF3n<br><b>${y.cos.map(A=>rn[A].name).join(" \xB7 ")}</b>`,`\xC1rbitros<br><b>${rn.ref1.name} \xB7 ${rn.ref2.name}</b>`,y.dino?`La vaquilla <b>${rn.vaca.name}</b> \xB7 el dino <b>${rn.dino.name}</b> \xB7 <b>${rn.clown.name}</b>`:`La vaquilla <b>${rn.vaca.name}</b>`,"Creado por<br><b>Iker Rodriguez Tejedor</b>","Voces Piper TTS \xB7 Three.js<br>M\xFAsica PROVISIONAL sintetizada","<small>Remake no oficial sin \xE1nimo de lucro. Sin relaci\xF3n con RTVE, FORTA ni Europroducciones.</small>"]:["<b>Iker Rodriguez Tejedor</b><br>presenta",`<b>GRAND PRIX 3D</b><br>${y.name} \xB7 ${y.years}`,`con <b>${s(y)}</b>`,"<small>Remake de fans \xB7 no oficial</small>"];n.setAutoOrbit(!0);for(let A of M){if(a)return;await i(`<div class="cred">${A}</div>`,1900)}n.setAutoOrbit(!1)}let a=!1,o=y=>y.colors[+t("color")%y.colors.length]||y.colors[0],l=()=>t("pueblo")||"Mi pueblo";function c(y,b){let M=o(y);return[M,...y.colors.filter(x=>x!==M)].slice(0,y.towns).map((x,E)=>({name:E?b&&b[E-1]||Kn(Lc.filter(C=>C!==l())):l(),color:x,pts:0,me:!E,alc:Kn(Ku),pad:Kn(ju),dorada:y.comodin==="dorada2"?1:0,comodin:0}))}function h(y,b){n.drawBoard(y.slice().sort((M,A)=>A.pts-M.pts),b)}function d(y){let b=E=>ei.filter(C=>C.cat===E),M=[Kn(b("vaquilla")),Kn(b("fisica")),Kn(b("piscina")),Kn(b("saber")),Kn(b("yincana")),Kn(b("vaquilla").concat(b("fisica")).concat(b("piscina")))],A=new Set;return M.filter(E=>E&&!A.has(E.id)&&A.add(E.id)).slice(0,y)}let u={vaquilla:"vaca",fisica:"bolera",piscina:"pool",saber:"host",yincana:"arena",especial:"board"},f={vaquilla:"h_vaca",fisica:"h_rampa",piscina:"h_piscina",saber:"h_saber",yincana:"h_yincana"};async function _(y,b,M,A,x){n.shot(y.id==="pinguipato"?"pato":u[y.cat]||"overview"),await Ye(x?"h_final":f[y.cat]||"h_prueba",s(b));let E=M[0],C=!1,I=!1,O=M[1];!x&&y.cat!=="saber"&&(b.comodin==="supervaquilla"&&O.comodin>0&&Math.random()<.5?(O.comodin--,C=!0,await Ye("h_super",s(b))):b.comodin==="campana"&&Math.random()<.4?(Gi("bell"),C=!0,await Ye("h_campana",s(b))):b.comodin==="dorada2"||b.comodin==="dorada1"?(C=!0,E.dorada&&await m(`\xBFUsas la <b>Vaquilla dorada</b> en \xAB${y.name}\xBB? (+2 si ganas)`)&&(E.dorada=0,I=!0,await Ye("h_dorada",s(b)))):b.vaquilla==="real"&&y.cat==="vaquilla"&&(C=!1));let V=t("ai")||"normal",F=M.slice(1).map(()=>Math.max(0,y.ai(V)));n.pause(!0);let H=await Hr(y,{color:yn[E.color],rivalColor:yn[O.color],level:V,vaca:C&&y.cat!=="vaquilla",rivalScore:Math.max(...F),fast:window.__fast,bot:window.__bot,etapa:b,lowres:t("quality")==="media"});n.pause(!1),n.shot("board");let J=[H.you,...y.id==="capitanes"?[H.rival]:F],X=J.map((P,G)=>[P,G]).sort((P,G)=>G[0]-P[0]);if(M.length>2)X.forEach(([P,G],ot)=>{M[G].pts+=(M.length-ot)*A});else{let P=X[0][0];J.forEach((G,ot)=>{G===P&&(M[ot].pts+=A)})}I&&H.you>Math.max(...F)&&(E.pts+=2);let B=X[0][1],N=M.length===2&&J[0]===J[1];return Gi(N?"whistle":B===0?"win":"lose"),M.length===2&&await Ye(N?"h_empate":M[B].color==="azul"?"h_gana_azul":"h_gana_amar",s(b)),h(M),await i(S(M,y.name),2600),H}function S(y,b){return`<h3>${b}</h3>`+y.slice().sort((M,A)=>A.pts-M.pts).map(M=>`<div class="srow" style="background:${yn[M.color]};color:${M.color==="amarillo"?"#3a1a00":"#fff"}"><span>${M.name}${M.me?" (t\xFA)":""}</span><b>${M.pts}</b></div>`).join("")}function m(y){return window.__bot?Promise.resolve(Math.random()<.5):new Promise(b=>{e.innerHTML=`<div class="ask">${y}<div><button class="mbtn gold" id="aY">S\xED</button><button class="mbtn" id="aN">No</button></div></div>`,e.classList.remove("hidden"),Nc("aY").onclick=()=>{e.classList.add("hidden"),b(!0)},Nc("aN").onclick=()=>{e.classList.add("hidden"),b(!1)}})}async function p(y,b={}){a=!1,n.setEtapa(y);let M=b.tv!==!1;Cs(t("music")!==!1),M&&!b.noCredits&&await r(y,!1),n.shot("logo"),await ad(1500),n.shot("host"),await Ye(y.id==="e1995"?"h_hola95":y.navidad?"h_holanav":"h_hola",s(y)),Si();let A=b.teams||c(y,b.rivals);if(h(A,"GRAND PRIX"),n.setTowns&&n.setTowns(A[0].name,A[1].name),n.shot("overview"),await Ye(A.length>2?"h_pueblos4":"h_pueblos",s(y)),await i("<h3>Esta noche</h3>"+A.map(I=>`<div class="srow" style="background:${yn[I.color]};color:${I.color==="amarillo"?"#3a1a00":"#fff"}"><span>${I.name}</span><small>Alcalde: ${I.alc} \xB7 Padrino: ${I.pad}</small></div>`).join(""),3200),await Ye("h_alcaldes",s(y)),y.comodin==="supervaquilla"&&(A[0].comodin=1,A[1].comodin=1+(Math.random()<.5?1:0)),y.comodin==="cajas"&&await Ye("h_cajas",s(y)),y.comodin==="dorada1"){await Ye("h_capitanes",s(y));let I=ei.find(V=>V.id==="capitanes");n.pause(!0);let O=await Hr(I,{color:yn[A[0].color],rivalColor:yn[A[1].color],rivalScore:2,fast:window.__fast,bot:window.__bot,etapa:y});n.pause(!1),O.you>=3?(A[0].dorada=1,await i("<h3>\u{1F947} \xA1La Vaquilla dorada es tuya!</h3>",2200)):(A[1].dorada=1,await i("<h3>La Vaquilla dorada se la lleva el rival</h3>",2200))}let x=d(+t("npruebas")||6);for(let I=0;I<x.length;I++){if(a)return;await _(x[I],y,A,I<2?1:I<4?2:3,!1)}let E=ei.find(I=>I.id==="troncos");await _(E,y,A,6,!0);let C=A.slice().sort((I,O)=>O.pts-I.pts)[0];return n.shot("logo"),Gi("fanfare"),Cs(t("music")!==!1),await i(`<h3>\u{1F3C6} \xA1Gana ${C.name}!</h3>`+S(A,"Clasificaci\xF3n final"),3500),await Ye("h_ganador",s(y)),M&&!b.noCredits&&(await Ye("h_adios",s(y)),await r(y,!0)),Si(),A}async function w(y){a=!1,n.setEtapa(y);let b=[l(),...Lc.filter(I=>I!==l()).sort(()=>Math.random()-.5).slice(0,7)].map((I,O)=>({name:I,pts:0,me:!O})),M=()=>"<h3>Tabla general</h3>"+b.slice().sort((I,O)=>O.pts-I.pts).map((I,O)=>`<div class="srow" style="background:${O<4?"#1f6fe0":"#334"}"><span>${O+1}. ${I.name}${I.me?" (t\xFA)":""}</span><b>${I.pts}</b></div>`).join("");for(let I=0;I<2;I++){let O=b[1+I*2],V=await p(y,{rivals:[O.name],noCredits:!0});b[0].pts+=V[0].pts,O.pts+=V[1].pts,b.slice(1).forEach(F=>{F!==O&&(F.pts+=Math.round(8+Math.random()*14))}),await i(M(),4e3)}let A=b.slice().sort((I,O)=>O.pts-I.pts).slice(0,4);if(!A.find(I=>I.me)){await i("<h3>Tu pueblo se queda fuera de las semifinales</h3>\xA1El pr\xF3ximo verano ser\xE1!",3500);return}await Ye("h_semis",s(y));let x=A.find(I=>!I.me&&A.indexOf(I)!==A.findIndex(O=>O.me)&&!0),E=await p(y,{rivals:[A.filter(I=>!I.me)[0].name],noCredits:!0});if(E[0].pts<E[1].pts){await i("<h3>Eliminados en semifinales</h3>\xA1Qu\xE9 verano tan bonito!",3500);return}await Ye("h_granfinal",s(y));let C=await p(y,{rivals:[A.filter(I=>!I.me)[1].name],noCredits:!0});C[0].pts>=C[1].pts?(Gi("fanfare"),await i(`<h3>\u{1F3C6} \xA1${l()} gana el Grand Prix!</h3><div class="trophy">\u{1F3C6}</div>`,4500),await Ye("h_trofeo",s(y))):await i("<h3>\xA1Subcampeones!</h3>Un final precioso.",3500)}async function L(y,b){n.setEtapa(b);let M=ei.find(x=>x.id===y);n.shot(u[M.cat]),n.pause(!0);let A=await Hr(M,{color:yn[o(b)],level:t("ai")||"normal",rivalScore:M.ai(t("ai")||"normal"),fast:window.__fast,bot:window.__bot,etapa:b});return n.pause(!1),A}return{programa:p,temporada:w,entrenamiento:L,credits:r,card:i,L:Ye,stop(){a=!0},board:h}}var Mi=new URLSearchParams(location.search);window.__fast=Mi.has("fast");window.__bot=Mi.has("bot");var Gn=n=>document.getElementById(n),dd=Mi.get("q")||localStorage.getItem("gp_quality")||"auto",De=id(Gn("app"),dd),Ei,Is=n=>Ei?Ei.get(n):void 0,Vi=od(De,Is),Qe=()=>Fr[Is("etapa")||Or]||Fr[Or];De.setEtapa(Qe());De.setAutoOrbit(!0);Gn("loading").remove();function Q_(){let n=document.createElement("canvas");n.width=640,n.height=300;let t=n.getContext("2d");return t.fillStyle="#ffc81a",t.beginPath(),t.arc(520,90,70,0,7),t.fill(),t.fillStyle="#e2321e",t.beginPath(),t.roundRect(20,70,600,170,60),t.fill(),t.lineWidth=10,t.strokeStyle="#fff",t.stroke(),t.textAlign="center",t.font="900 104px Arial Black, Arial",t.lineWidth=14,t.strokeStyle="#7a1000",t.strokeText("GRAND PRIX",320,180),t.fillStyle="#fff",t.fillText("GRAND PRIX",320,180),t.font="900 40px Arial",t.fillStyle="#ffd21a",t.fillText(Qe().navidad?"DE LA NAVIDAD":"DEL VERANO",320,228),n.toDataURL()}function ld(n){Gn("topBtns").classList.toggle("hidden",!n)}async function kr(n){ld(!0),De.setAutoOrbit(!1);try{await n()}catch(t){console.error(t)}finally{Dc(),De.orbitMode(!1),De.walkMode(!1),Gn("joy").classList.add("hidden"),ld(!1),De.setAutoOrbit(!0),Ei.go("main")}}var Ko=null;function cd(n){return new Promise(t=>{n?(De.walkMode(!0),Gn("joy").classList.remove("hidden")):De.orbitMode(!0),Ko=t})}Gn("tbHome").onclick=()=>{Vi.stop(),Dc(),Si(),Ko?(Ko(),Ko=null):location.reload()};var hd=["overview","pool","host","board","logo","vaca"],tx=0;Gn("tbCam").onclick=()=>De.shot(hd[++tx%hd.length]);Gn("tbMute").onclick=()=>{ae.master&&(ae.master.gain.value=ae.master.gain.value?0:1)};(()=>{let n=Gn("joy"),t=Gn("knob"),e=!1,i=s=>{let r=n.getBoundingClientRect(),a=(s.clientX-r.left-r.width/2)/(r.width/2),o=(s.clientY-r.top-r.height/2)/(r.height/2),l=c=>Math.max(-1,Math.min(1,c));De.walk.f=-l(o),De.walk.s=l(a),t.style.transform=`translate(${l(a)*30}px,${l(o)*30}px)`};n.onpointerdown=s=>{e=!0,n.setPointerCapture(s.pointerId),i(s)},n.onpointermove=s=>e&&i(s),n.onpointerup=()=>{e=!1,De.walk.f=De.walk.s=0,t.style.transform=""}})();var ex=()=>rn[Qe().host].name,kn=async n=>{for(let[t,e,i]of n)De.shot(t),await Jo(e,Ps[e][1],i||(Ps[e][0]==="co"?rn[Qe().cos[0]].name:ex()))},ud={promos:()=>kn([["logo","h_promo1"],["pool","h_promo2"],["overview","h_promo3"]]),promohost:()=>kn([["host","h_promo3"],["host","h_promo1"]]),publi:async()=>{for(let n of["h_pub1","h_pub2","h_pub3"])await Vi.card(`<div class="cred"><small>PUBLICIDAD (ficticia)</small><br><b>${Ps[n][1].split(".")[0]}</b></div>`,400),await kn([["overview",n]])},oculta:()=>kn([["pool","h_oculta1"],["vaca","h_oculta2"]]),falsas:()=>kn([["host","h_falsa1"],["board","h_falsa2"],["vaca","h_falsa3"]]),fuera:()=>kn([["pool","h_fuera1"],["overview","h_fuera2"]]),historia:()=>kn([["logo","h_historia1"],["overview","h_historia2"],["vaca","h_historia3"],["dino","h_historia4"],["logo","h_historia5"]]),casting:async()=>{await kn([["host","h_casting"]]);let n=prompt("\xBFC\xF3mo se llama tu pueblo?",Is("pueblo")||"");n&&Ei.set("pueblo",n.trim().slice(0,24)),await kn([["overview","h_casting2"]])},paseo:async()=>{await kn([["overview","h_paseo"]]),await cd(!0)},camlibre:()=>cd(!1)};function Uc(n,t){if(zr(),n==="tv")return kr(()=>Vi.programa(Qe(),{tv:!0}));if(n==="quick")return kr(()=>Vi.programa(Qe(),{tv:!1}));if(n==="temporada")return kr(()=>Vi.temporada(Qe()));if(n==="train")return kr(()=>Vi.entrenamiento(t,Qe()));if(ud[n])return kr(ud[n])}var nx="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><circle cx="34" cy="34" r="33" fill="#ffd21a"/><circle cx="34" cy="34" r="28" fill="#e2321e"/><circle cx="34" cy="34" r="20" fill="#1f6fe0"/><text x="34" y="43" font-size="24" text-anchor="middle">\u{1F42E}</text></svg>'),ix=()=>Object.keys(Ls).flatMap(n=>ei.filter(t=>t.cat===n).map(t=>({emoji:Ls[n].split(" ")[0],title:t.name,sub:Ls[n].slice(3),launch:"train",arg:t.id})));Ei=GameMenu.create({id:"grandprix",storeKey:"gp_menu",name:"Grand Prix",version:"v"+Ju,logo:Q_,fp:{img:nx},theme:{"--m-btn-a":"#ff6a2a","--m-btn-b":"#d8321a","--m-border":"#ffe08a","--m-tbtn":"#c8321ad9","--m-tbtn-border":"#ffb86a","--m-sub":"#fff0d0"},tag:()=>`${Qe().emoji} ${Qe().name.toUpperCase()}`,title:{sub:"El juego del verano",tap:"Toca para empezar"},sound:n=>Gi(n==="start"?"fanfare":"tap"),onTitleTap:()=>{zr(),Is("music")!==!1&&Cs(!0)},onEnter:n=>{(n==="play"||n==="train")&&Si()},install:{apk:"GrandPrix3D.apk"},launch:Uc,defaults:{etapa:Or,music:!0,voz:!0,ai:"normal",npruebas:6,color:0,pueblo:"",quality:dd},screens:{main:[{btn:"Jugar",sub:"Programa completo, temporada, entrenamiento, especiales\u2026",cls:"gold",go:"play"},{btn:"Promos",sub:"Los anuncios del programa",launch:"promos"},{btn:"Promos del presentador",sub:`${rn.host.name} te invita al Grand Prix`,launch:"promohost"},{btn:"Publicidad",sub:"Anuncios ficticios del verano",launch:"publi"},{btn:"C\xE1mara oculta",sub:"Bromas a \xE1rbitros y alcaldes",launch:"oculta"},{btn:"Tomas falsas",sub:"Resbalones y despistes",launch:"falsas"},{btn:"Fuera de c\xE1maras",sub:"Lo que no se ve del programa",launch:"fuera"},{btn:"Paseo",sub:"Pasea por el plat\xF3",launch:"paseo"},{btn:"Casting",sub:"Apunta a tu pueblo",launch:"casting"},{btn:"Elige el valor\u2026",sub:"Etapa, n\xFAmero de pruebas y tu color",go:"valor"},{btn:"C\xE1mara libre",sub:"Mueve la c\xE1mara a tu aire",launch:"camlibre"},{btn:"Opciones",sub:"Sonido, pueblo, rival, calidad gr\xE1fica",go:"options"},{btn:"La historia del Grand Prix",sub:"El presentador te la cuenta",cls:"hist",launch:"historia"},{btn:"C\xF3mo se juega",go:"help"},{btn:"Cr\xE9ditos",go:"credits"},{btn:"Instalar app",install:!0}],play:[{btn:"Programa completo",sub:()=>`${Qe().name}: cabecera, pueblos, ${Is("npruebas")} pruebas, prueba final y cr\xE9ditos`,cls:"gold",launch:"tv"},{btn:"Temporada",sub:"Fase de programas, tabla general, semifinal, final y trofeo",launch:"temporada"},{btn:"Entrenamiento",sub:"Elige cualquier prueba",go:"train"},{btn:"Partida r\xE1pida",sub:"Sin cabecera ni cr\xE9ditos",launch:"quick"},{h2:"Etapa"},{themes:()=>Object.values(Fr).map(n=>({id:n.id,emoji:n.emoji,name:n.years})),key:"etapa",def:Or,onPick:()=>De.setEtapa(Qe())},{text:()=>`<p>${Qe().desc}</p>`},{h2:"Programa especial"},{themes:Qu,key:"tema",def:"normal"},{back:"main"}],train:[{h2:"Entrenamiento"},{monolist:ix},{back:"play"}],valor:{title:"Elige el valor\u2026",options:()=>[{choice:"npruebas",label:"\u{1F3AF} Pruebas por programa",opts:[[4,"4"],[6,"6"],[8,"8"]]},{choice:"color",label:"\u{1F3BD} Tu color",opts:Qe().colors.map((n,t)=>[t,n[0].toUpperCase()+n.slice(1)]),wrap:!0},{choice:"etapa",label:"\u{1F4FA} Etapa",opts:Object.values(Fr).map(n=>[n.id,n.years]),wrap:!0,onChange:()=>De.setEtapa(Qe())}]},options:{title:"Opciones",options:()=>[{sino:"music",def:!0,label:"\u{1F3B5} M\xFAsica (provisional)",onChange:n=>n?Cs(!0):Si()},{sino:"voz",def:!0,label:"\u{1F3A4} Voces",onChange:n=>{ae.voiceOn=n}},{field:"pueblo",label:"\u{1F3D8}\uFE0F Tu pueblo",placeholder:"Mi pueblo",max:24},{choice:"ai",label:"\u{1F916} Nivel del rival",opts:[["facil","F\xE1cil"],["normal","Normal"],["dificil","Dif\xEDcil"]]},{fold:"\u{1F3AC} M\xE1s opciones",items:[{block:"\u{1F3C6} Pueblos ganadores",name:"Toca uno para jugar con \xE9l",btns:Ic.map(([n,t])=>({label:`${n} (${t})`,run:e=>{e.set("pueblo",n),e.go("options")}}))},{sino:"subs",def:!1,label:"\u{1F4AC} Subt\xEDtulos grandes",onChange:n=>document.body.classList.toggle("bigsub",n)}]},{choice:"quality",label:"\u2728 Calidad gr\xE1fica",opts:ed.map(n=>[n,nd[n]]),wrap:!0,onChange:n=>{localStorage.setItem("gp_quality",n),setTimeout(()=>location.reload(),300)}},{fullscreen:!0},{fps:()=>De.fps,hint:"Si va lento en tu m\xF3vil, elige calidad \xABMedia\xBB."}]},help:{title:"C\xF3mo se juega",text:`<p>Dos pueblos (azul y amarillo; cuatro en 1995) compiten en pruebas locas: con vaquilla, f\xEDsicas, de piscina, yincanas y de conocimiento para alcaldes y padrinos.</p>
<p>En cada prueba el rival ya tiene su marca: <b>\xA1sup\xE9rala!</b> Las primeras pruebas valen 1 punto, las del medio 2, las \xFAltimas 3 y la <b>prueba final</b> 6.</p>
<p><b>Comodines seg\xFAn la etapa:</b> 2023 Supervaquilla (el alcalde la suelta al rival) \xB7 2024 campana de 30 s \xB7 2025 una Vaquilla dorada por pueblo (+2) \xB7 2026 una sola Vaquilla dorada, que se gana en Pasi\xF3n de capitanes.</p>
<p><b>Temporada:</b> juega programas, sube en la tabla, pasa a semifinales y gana la final.</p>`},credits:{title:"Cr\xE9ditos",text:()=>`<p><b>Creado por</b><br>Iker Rodriguez Tejedor</p>
<p><b>Personajes virtuales</b><br>${Object.values(rn).map(n=>`${n.name} (${n.role})`).join(" \xB7 ")}</p>
<p><b>Voces</b><br>Piper TTS (es_ES)</p><p><b>Motor 3D</b><br>Three.js \xB7 plat\xF3 modelado por c\xF3digo</p>
<p><b>M\xFAsica</b><br>Tema PROVISIONAL sintetizado (se cambiar\xE1 por la cabecera original)</p>
<p class="small">Remake no oficial hecho por un fan, sin \xE1nimo de lucro. Grand Prix es un formato de Europroducciones emitido por RTVE y cadenas de FORTA. Sin relaci\xF3n oficial con el programa ni con sus cadenas.</p>`}}});ae.voiceOn=Is("voz")!==!1;Mi.get("screen")?Ei.go(Mi.get("screen")):Mi.get("mode")?Uc(Mi.get("mode"),Mi.get("arg")):Ei.go("title");window.__gp={S:De,show:Vi,menu:Ei,launch:Uc};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
