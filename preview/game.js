(()=>{(function(n){"use strict";let t=(i,s,r)=>{let a=document.createElement(i);return s&&(a.className=s),r!=null&&(a.innerHTML=r),a};function e(i){let s=typeof i.root=="string"?document.querySelector(i.root):i.root||document.getElementById("menu");if(!s)throw new Error("GameMenu: falta #menu");let r=i.storeKey||(i.id||"juego")+"_menu_opts",a=i.inApp!=null?!!i.inApp:!!window.AndroidKb||/; wv\)/.test(navigator.userAgent)||!!window.Android,o=null;addEventListener("beforeinstallprompt",O=>{O.preventDefault(),o=O});let l={},c=O=>(O||[]).forEach(P=>{P&&(P.sino&&(l[P.sino]=P.def!=null?P.def:!1,P.vol&&(l[P.vol]=P.volDef!=null?P.volDef:1)),P.choice&&(l[P.choice]=P.def!=null?P.def:P.opts[0][0]),P.items&&c(P.items))});c(Array.isArray(i.options)?i.options:[]);for(let O in i.screens||{}){let P=i.screens[O];P&&Array.isArray(P.options)&&c(P.options),Array.isArray(P)&&P.forEach(I=>I&&Array.isArray(I.options)&&c(I.options))}Object.assign(l,i.defaults||{});let h={};try{h=JSON.parse(localStorage.getItem(r)||"{}")||{}}catch{h={}}let u=Object.assign({},l,h),d=()=>{try{localStorage.setItem(r,JSON.stringify(u))}catch{}},f=O=>{if(i.store){let P=i.store.get(O);if(P!==void 0)return P}return u[O]},g=(O,P,I)=>{u[O]=P,i.store&&i.store.set(O,P)!==!1||d(),!I&&i.onOption&&i.onOption(O,P,u)};if(i.theme)for(let O in i.theme)s.style.setProperty(O.startsWith("--")?O:"--m-"+O,i.theme[O]);if(i.fp&&(i.fp.bg&&s.style.setProperty("--fp-bg",i.fp.bg),i.fp.mark&&s.style.setProperty("--fp-mark",i.fp.mark),i.fp.img&&(s.style.setProperty("--fp-img",`url("${i.fp.img}")`),s.classList.add("fpimg"))),i.autoVertical!==!1){let O=()=>document.documentElement.classList.toggle("vertical",innerWidth<innerHeight);addEventListener("resize",O),O()}let S=()=>{try{i.sound&&i.sound(i.sounds&&i.sounds.tap||"tap")}catch{}},m=(O,...P)=>typeof O=="function"?O(...P):O;function p(O,P,I,X,at){let et=t("button","mbtn "+(I||""));if(et.innerHTML=`<span class="fp"></span><span>${O}${P?`<small>${P}</small>`:""}</span>`,at){let vt=t("img","mmini");vt.src=at,vt.alt="",et.prepend(vt)}return et.onclick=vt=>{vt.stopPropagation(),S(),X&&X()},et}function T(O,P){let I=t("button","tbtn back",P||i.text&&i.text.back||"\u27F5 Volver");return I.onclick=X=>{X.stopPropagation(),S(),G(O)},I}let L=O=>{let P=t("h2");return P.textContent=O,P};function b(O,P,I){let X=t("button","tbtn"+(P?" sel":""),O);return X.onclick=at=>{at.stopPropagation(),S(),I&&I(X)},X}function y(O){let P=t("div","orow");O.id&&(P.id=O.id);let I=t("label");I.textContent=m(O.label);let X=t("button"),at=i.text&&i.text.yes||"S\xED",et=i.text&&i.text.no||"No",vt=()=>{X.className="tbtn"+(f(O.sino)?" sel":""),X.textContent=f(O.sino)?at:et};if(X.onclick=Tt=>{Tt.stopPropagation(),g(O.sino,!f(O.sino)),vt(),S(),O.onChange&&O.onChange(f(O.sino),W)},vt(),P.append(I,X),O.vol){let Tt=t("input");Tt.type="range",Tt.min="0",Tt.max="100",Tt.value=String(Math.round((f(O.vol)!=null?f(O.vol):1)*100)),Tt.oninput=()=>g(O.vol,+Tt.value/100),Tt.onchange=()=>{S(),O.onVol&&O.onVol(f(O.vol),W)},P.append(Tt)}return P}function v(O){let P=t("div","orow"+(O.wrap?" orow-wrap":""));O.id&&(P.id=O.id);let I=t("label");I.textContent=m(O.label),P.append(I);for(let[X,at]of m(O.opts)){let et=t("button","tbtn"+(String(f(O.choice))===String(X)?" sel":""),at);et.dataset.v=X,et.onclick=vt=>{vt.stopPropagation(),S(),g(O.choice,X),P.querySelectorAll("button").forEach(Tt=>Tt.classList.toggle("sel",Tt.dataset.v===String(X))),O.onChange&&O.onChange(X,W)},P.append(et)}return P}function A(O){let P=t("div","orow"),I=t("label");I.textContent=O.label||"\u26F6 Pantalla completa",P.append(I);let X=t("button","tbtn"+(document.fullscreenElement?" sel":""),document.fullscreenElement?"Salir":"Activar");return X.onclick=async at=>{at.stopPropagation(),S();try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen({navigationUI:"hide"})}catch{}setTimeout(()=>G(N),300)},a&&(X.disabled=!0,X.textContent="Siempre (app)"),P.append(X),P}function _(O,P){for(let I of O||[])if(I)if(I.sino)P.append(y(I));else if(I.choice)P.append(v(I));else if(I.fullscreen)P.append(A(I));else if(I.field){let X=t("div","orow ofield"),at=t("label");at.textContent=m(I.label);let et=t("input","otext");et.type="text",et.maxLength=I.max||24,et.placeholder=m(I.placeholder)||"",et.value=f(I.field)||"",et.onchange=()=>{g(I.field,et.value.trim()),I.onChange&&I.onChange(et.value.trim(),W)},et.onpointerup=vt=>vt.stopPropagation(),et.onkeydown=vt=>vt.stopPropagation(),X.append(at,et),P.append(X)}else if("block"in I||I.fold){let X=t("div","ocustom"+(I.fold?" ofold":"")+(I.cls?" "+I.cls:""));I.id&&(X.id=I.id);let at=t("div","olabel");if(at.textContent=I.block||I.fold,at.textContent&&X.append(at),I.fold){let et="__fold_"+(I.id||I.fold);w[et]&&X.classList.add("open"),at.onclick=vt=>{vt.stopPropagation(),S(),w[et]=X.classList.toggle("open")}}if(I.name){let et=t("div","oname",m(I.name));X.append(et)}if(_(I.items,X),I.btns){let et=t("div","orow obtns");for(let vt of I.btns)et.append(b(vt.label,m(vt.sel),()=>vt.run(W)));X.append(et)}I.note&&X.append(t("p","onote",I.note)),I.small&&X.append(t("p","onote small",I.small)),P.append(X)}else if(I.note)P.append(t("p","mtext",m(I.note)));else if(I.fps){let X=t("p","mtext");X.textContent=`Rendimiento actual: ${Math.round(m(I.fps)||0)} fps. ${I.hint||"Si el juego va lento en tu m\xF3vil, elige calidad \xABBaja\xBB."}`,P.append(X)}else I.el?P.append(I.el(W)):C([I],P)}let w={};function C(O,P){for(let I of O||[])if(I)if(I.btn!=null){if(I.install){if(a)continue;P.append(p(I.btn,I.sub,"inst",()=>$()));continue}let X=I.go?()=>G(I.go):I.launch?()=>F(I.launch,I.arg):()=>I.run&&I.run(W),at=p(m(I.btn),m(I.sub),I.cls,X,I.mini);I.id&&(at.id=I.id),P.append(at)}else if(I.h2)P.append(L(m(I.h2)));else if(I.back)P.append(T(I.back,I.label));else if(I.themes){let X=t("div","themes"),at=I.key||"tema",et=f(at)!=null?f(at):I.def||m(I.themes)[0].id;for(let vt of m(I.themes))X.append(b(`<span>${vt.emoji}</span>${vt.name}`,vt.id===et,()=>{g(at,vt.id),I.onPick&&I.onPick(vt,W),G(N)}));P.append(X)}else if(I.row){let X=t("div","mrow");for(let at of I.row)X.append(at.back?T(at.back):b(m(at.tbtn),m(at.sel),()=>{at.run&&at.run(W)}));P.append(X)}else if(I.monolist){let X=t("div","monolist");for(let at of m(I.monolist)){let et=b(`<span>${at.emoji||""}</span><b></b><small>${at.sub||""}</small>`,!1,()=>F(at.launch||I.launch,at.arg));et.querySelector("b").textContent=at.title,X.append(et)}P.append(X)}else if(I.text){let X=t("div","mtext",m(I.text));P.append(X)}else I.options?_(m(I.options,W),P):I.el&&P.append(I.el(W))}function B(O){let P=m(i.logo,W),I;return P instanceof HTMLElement?I=P.tagName==="IMG"?P.cloneNode():P:(I=t("img"),I.src=P,I.alt=i.name||"",I.draggable=!1),I.className=O,I}let N="title";function G(O="main"){if(N=O,s.classList.remove("hidden"),s.innerHTML="",i.onEnter&&i.onEnter(O,W),O==="title"){let vt=t("div","title"),Tt=i.title||{},Ht=t("div","tsub");Ht.textContent=Tt.sub!=null?Tt.sub:"El juego";let Q=t("div","ttap");Q.textContent=Tt.tap||"Toca para empezar";let ot=t("div","twrap");ot.append(B("tlogo")),vt.append(ot,Ht,Q),s.append(vt);let bt=Pt=>{Pt.stopPropagation&&Pt.stopPropagation(),s.removeEventListener("pointerup",bt),removeEventListener("keydown",bt);try{i.sound&&i.sound(i.sounds&&i.sounds.start||"start")}catch{}i.onTitleTap&&i.onTitleTap(W),G("main")};s.addEventListener("pointerup",bt),addEventListener("keydown",bt);return}let P=t("div","mbox"),I=t("div","logo");I.append(B("mlogo"));let X=t("div","mtag");X.textContent=m(i.tag,W)||"EL JUEGO \xB7 3D",I.append(X);let at=t("div","col ui"),et=(i.screens||{})[O];if(et?typeof et=="function"?et(at,W):Array.isArray(et)?C(et,at):et.text!=null?(at.classList.add("text"),at.append(T(et.back||"main"),L(m(et.title)),t("div","mtext",m(et.text,W)))):(et.options&&at.classList.add("opts"),et.title&&at.append(L(m(et.title))),C(et.items,at),et.options&&_(m(et.options,W),at),et.back!==!1&&at.append(T(et.back||"main"))):at.append(L(O),T("main")),P.append(I,at),s.append(P),i.version){let vt=t("div","mver");vt.textContent=i.version,s.append(vt)}}function F(O,P){U(),i.launch&&i.launch(O,P,W)}function U(){s.classList.add("hidden"),s.innerHTML=""}function $(){let O=t("div","modal ui"),P=matchMedia("(display-mode: standalone), (display-mode: fullscreen)").matches,I=i.install||{};O.innerHTML=`<div class="mcard"><h2>Instalar ${i.name||""}</h2>
        ${P?"<p>\u2705 Ya est\xE1s usando la app instalada.</p>":(o?'<p><button class="mbtn gold" id="instNow">\u{1F4F2} Instalar ahora</button></p>':"")+"<p><b>Android (Chrome):</b> men\xFA \u22EE \u2192 \xABInstalar aplicaci\xF3n\xBB o \xABA\xF1adir a pantalla de inicio\xBB.</p><p><b>iPhone/iPad (Safari):</b> bot\xF3n Compartir \u2192 \xABA\xF1adir a pantalla de inicio\xBB.</p><p><b>PC (Chrome/Edge):</b> icono de instalar \u2295 en la barra de direcciones.</p>"}
        ${I.apk?`<p><a class="mbtn gold" href="${I.apk}" download>\u2B07\uFE0F Descargar APK para Android</a></p><p style="font-size:13px;opacity:.85">El APK se instala en Android permitiendo \xABinstalar apps de origen desconocido\xBB.</p>`:""}
        <button class="tbtn back" id="instClose">Cerrar</button></div>`,s.append(O),O.querySelector("#instClose").onclick=at=>{at.stopPropagation(),O.remove()};let X=O.querySelector("#instNow");X&&(X.onclick=async at=>{at.stopPropagation(),o.prompt(),await o.userChoice,o=null,O.remove()}),O.onclick=at=>at.stopPropagation()}let W={go:G,hide:U,launch:F,opts:u,get:f,set:g,save:d,btn:p,back:T,h2:L,tbtn:b,rowSino:y,rowChoice:v,items:C,optionItems:_,get current(){return N},inApp:a,root:s,cfg:i};return W}n.GameMenu={create:e,version:"1.0"}})(typeof window!="undefined"?window:globalThis);var jt={ctx:null,master:null,music:null,musicVol:.7,voiceOn:!0,cur:null};function Bs(){return jt.ctx||(jt.ctx=new(window.AudioContext||window.webkitAudioContext),jt.master=jt.ctx.createGain(),jt.master.connect(jt.ctx.destination)),jt.ctx.state==="suspended"&&jt.ctx.resume(),jt.ctx}var $i=n=>440*Math.pow(2,(n-69)/12);function cn(n,t,e,i="square",s=.12,r){let a=jt.ctx,o=a.createOscillator(),l=a.createGain();o.type=i,o.frequency.value=t,l.gain.setValueAtTime(s,n),l.gain.exponentialRampToValueAtTime(.001,n+e),o.connect(l),l.connect(r||jt.master),o.start(n),o.stop(n+e+.02)}var lh=[72,76,79,76,77,81,79,0,76,79,84,83,81,79,77,76,74,77,81,79,76,72,74,76,77,76,74,71,72,0,0,0],ch=[48,48,53,53,55,55,48,48],Jr={tema:"assets/snd/cabecera.m4a",creditos:"assets/snd/loop_creditos.ogg",logo:"assets/snd/sting_logo.ogg",final:"assets/snd/sting_final.ogg",trans:"assets/snd/sting_trans.ogg",chant:"assets/snd/chant.mp3"},Ii=null;async function Fd(){if(Ii!==null)return Ii;try{Ii=(await fetch(Jr.tema,{method:"HEAD"})).ok}catch{Ii=!1}return Ii}Fd();function ks(n="tema",t={}){if(hn(),jt.musicVol<=0)return null;if(Ii===!1)return hh(),null;let e=new Audio(Jr[n]);return e.loop=t.loop!==!1,e.volume=jt.musicVol,t.from&&(e.currentTime=t.from),e.play().catch(()=>{}),e.onerror=()=>{jt.musicEl===e&&hh()},jt.musicEl=e,e}function dl(n,t=1){if(Ii===!1){he(n==="final"?"fanfare":"brass");return}let e=new Audio(Jr[n]);return e.volume=Math.min(1,jt.musicVol*t+.2),e.play().catch(()=>{}),e}function uh(){let n=new Audio(Jr.chant);n.volume=.8,n.play().catch(()=>{})}function jr(n=!0){return n?ks("tema"):hn()}function hh(){if(hn(),jt.musicVol<=0)return;let n=Bs(),t=n.createGain();t.gain.value=jt.musicVol*.5,t.connect(jt.master);let e=60/132/2,i=0,s=n.currentTime+.05,r=setInterval(()=>{for(;s<n.currentTime+.3;){let a=lh[i%lh.length];a&&cn(s,$i(a),e*.9,"square",.07,t),i%2===0&&cn(s,$i(ch[(i>>2)%ch.length]),e*1.8,"triangle",.18,t),i%4===2&&Os(s,.05,.08,t),s+=e,i++}},80);jt.music={id:r,g:t}}function hn(){if(jt.musicEl&&(jt.musicEl.pause(),jt.musicEl=null),jt.music){clearInterval(jt.music.id);try{jt.music.g.disconnect()}catch{}jt.music=null}}function Os(n,t,e,i){let s=jt.ctx,r=s.createBuffer(1,s.sampleRate*t,s.sampleRate),a=r.getChannelData(0);for(let c=0;c<a.length;c++)a[c]=Math.random()*2-1;let o=s.createBufferSource(),l=s.createGain();o.buffer=r,l.gain.value=e,o.connect(l),l.connect(i||jt.master),o.start(n)}function he(n){try{let t=Bs(),e=t.currentTime;if(n==="tap")cn(e,880,.06,"sine",.08);else if(n==="win")[72,76,79,84].forEach((i,s)=>cn(e+s*.12,$i(i),.3,"square",.1));else if(n==="lose")[67,63,60].forEach((i,s)=>cn(e+s*.18,$i(i),.35,"sawtooth",.08));else if(n==="whistle")cn(e,2400,.4,"sine",.12),cn(e+.05,2550,.35,"sine",.08);else if(n==="bell")[0,.25,.5].forEach(i=>cn(e+i,1320,.5,"triangle",.14));else if(n==="moo"){let i=t.createOscillator(),s=t.createGain();i.type="sawtooth",i.frequency.setValueAtTime(140,e),i.frequency.linearRampToValueAtTime(110,e+.9),s.gain.setValueAtTime(.15,e),s.gain.linearRampToValueAtTime(0,e+1),i.connect(s),s.connect(jt.master),i.start(e),i.stop(e+1)}else n==="gong"?([110,165,220.5,331].forEach((i,s)=>cn(e,i,3.2-s*.5,"sine",.22/(s+1))),Os(e,.08,.2)):n==="brass"?[[60,64,67],[65,69,72],[67,71,74,79]].forEach((i,s)=>i.forEach(r=>cn(e+s*.16,$i(r),s===2?.7:.14,"sawtooth",.07))):n==="tick"?cn(e,1800,.03,"square",.06):n==="pop"?(Os(e,.35,.5),cn(e,90,.4,"sine",.3)):n==="flip"?(Os(e,.025,.15),Os(e+.05,.02,.1)):n==="fanfare"&&[60,64,67,72,67,72].forEach((i,s)=>cn(e+s*.14,$i(i),.25,"square",.1))}catch{}}var Od=()=>document.getElementById("sub");function Kr(n,t,e){return new Promise(i=>{let s=Od();s.classList.remove("hidden"),s.innerHTML=(e?`<b>${e}:</b> `:"")+t;let r=()=>{s.classList.add("hidden"),i()},a=()=>setTimeout(r,Math.max(1600,t.length*55)/(window.__fast?8:1));if(!jt.voiceOn||!n||window.__fast)return a();let o=new Audio("assets/voz/"+n+".mp3");jt.cur=o,o.onended=()=>setTimeout(r,250),o.onerror=a,o.play().catch(a)})}function fl(){jt.cur&&(jt.cur.pause(),jt.cur=null)}var ri=[],dh={baloncesto:"dedo",alicia:"corazon",superbolos:"casco",troncos:"flotador",pinguinos:"pez",pegajosos:"estrella",pinguipato:"pato"};function Bd(n,t,e,i,s){s&&(n.save(),n.translate(t+40*i,e-50*i),n.scale(i,i),s==="dedo"?(n.fillStyle="#ffd21a",n.fillRect(-6,-10,12,40),n.beginPath(),n.roundRect(-16,-50,32,44,10),n.fill(),n.beginPath(),n.roundRect(-6,-90,14,46,7),n.fill(),n.fillStyle="#1f4fc8",n.font="900 12px Arial",n.fillText("N\xBA1",-11,-22)):s==="corazon"?(n.fillStyle="#ddd",n.fillRect(-3,-10,6,50),n.fillStyle="#e2163a",n.beginPath(),n.moveTo(0,-20),n.bezierCurveTo(-40,-50,-30,-90,0,-70),n.bezierCurveTo(30,-90,40,-50,0,-20),n.fill()):(n.font="40px Arial",n.fillText({casco:"\u26D1\uFE0F",flotador:"\u{1F6DF}",pez:"\u{1F41F}",estrella:"\u2B50",pato:"\u{1F986}"}[s]||"\u{1F388}",-20,-20)),n.restore())}function Re(n){return ri.push(n),n}var zs={vaquilla:"\u{1F42E} Con vaquilla",fisica:"\u{1F4AA} F\xEDsicas",piscina:"\u{1F3CA} Piscina",yincana:"\u{1F3C3} Yincanas",saber:"\u{1F9E0} Conocimiento",especial:"\u2B50 Especiales"},Zt=(n,t)=>n+Math.random()*(t-n);var ct={sky(n,t,e,i="#7ec8ff",s="#d8f1ff"){let r=n.createLinearGradient(0,0,0,e);r.addColorStop(0,i),r.addColorStop(1,s),n.fillStyle=r,n.fillRect(0,0,t,e)},water(n,t,e,i,s,r){let a=n.createLinearGradient(0,e,0,e+s);a.addColorStop(0,"#2ec4e8"),a.addColorStop(1,"#0a6fb0"),n.fillStyle=a,n.fillRect(t,e,i,s),n.strokeStyle="#ffffff66",n.lineWidth=2;for(let o=0;o<4;o++){n.beginPath();for(let l=0;l<=i;l+=20){let c=e+12+o*s/4+Math.sin(l/30+r*2+o)*4;l?n.lineTo(t+l,c):n.moveTo(t+l,c)}n.stroke()}},sand(n,t,e,i,s){let r=n.createLinearGradient(0,e,0,e+s);r.addColorStop(0,"#f2d38a"),r.addColorStop(1,"#d9a85a"),n.fillStyle=r,n.fillRect(t,e,i,s)},person(n,t,e,i,s,r={}){n.save(),n.translate(t,e),n.scale(i,i),r.rot&&n.rotate(r.rot),n.fillStyle="#00000033",n.beginPath(),n.ellipse(0,2,16,5,0,0,7),n.fill(),n.strokeStyle="#333",n.lineWidth=5,n.lineCap="round";let a=r.run?Math.sin(r.run)*9:0;n.beginPath(),n.moveTo(-5,-22),n.lineTo(-7-a,0),n.moveTo(5,-22),n.lineTo(7+a,0),n.stroke(),n.fillStyle=s,n.beginPath(),n.roundRect(-11,-50,22,30,6),n.fill(),n.strokeStyle="#f1c6a0",n.beginPath(),n.moveTo(-10,-45),n.lineTo(-18,r.armsUp?-66:-28+a),n.moveTo(10,-45),n.lineTo(18,r.armsUp?-66:-28-a),n.stroke(),n.fillStyle="#f1c6a0",n.beginPath(),n.arc(0,-60,10,0,7),n.fill(),n.fillStyle=s,n.beginPath(),n.arc(0,-63,10.5,Math.PI,0),n.fill(),n.restore()},vaca(n,t,e,i,s=0,r=1,a=!1){n.save(),n.translate(t,e),n.scale(i*r,i),n.fillStyle="#00000033",n.beginPath(),n.ellipse(0,4,34,7,0,0,7),n.fill();let o=Math.sin(s*14)*6;n.strokeStyle="#3b2412",n.lineWidth=6,n.lineCap="round",n.beginPath(),n.moveTo(-20,-10),n.lineTo(-22+o,2),n.moveTo(-8,-10),n.lineTo(-6-o,2),n.moveTo(12,-10),n.lineTo(10+o,2),n.moveTo(22,-10),n.lineTo(24-o,2),n.stroke(),n.fillStyle=a?"#f6c431":"#7a4a22",n.beginPath(),n.ellipse(0,-22,30,15,0,0,7),n.fill(),n.fillStyle=a?"#fff1a8":"#f4ede2",n.beginPath(),n.ellipse(-8,-24,9,6,.4,0,7),n.fill(),n.fillStyle=a?"#f6c431":"#7a4a22",n.beginPath(),n.ellipse(32,-32,12,10,.3,0,7),n.fill(),n.fillStyle="#f2b8a8",n.beginPath(),n.ellipse(41,-28,6,5,0,0,7),n.fill(),n.strokeStyle="#f4ede2",n.lineWidth=4,n.beginPath(),n.moveTo(28,-40),n.quadraticCurveTo(24,-52,30,-54),n.moveTo(36,-40),n.quadraticCurveTo(40,-52,34,-55),n.stroke(),n.fillStyle="#111",n.beginPath(),n.arc(35,-35,2.2,0,7),n.fill(),n.strokeStyle=a?"#f6c431":"#7a4a22",n.lineWidth=3,n.beginPath(),n.moveTo(-30,-24),n.quadraticCurveTo(-42,-20+o,-40,-8),n.stroke(),n.restore()},text(n,t,e,i,s=28,r="#fff",a="center"){n.font=`900 ${s}px Arial, Roboto, sans-serif`,n.textAlign=a,n.textBaseline="middle",n.lineWidth=Math.max(3,s/7),n.strokeStyle="#000a",n.strokeText(t,e,i),n.fillStyle=r,n.fillText(t,e,i)},btn(n,t,e,i,s,r,a="#ffd21a",o=!1){n.fillStyle=o?"#fff":a,n.strokeStyle="#fff",n.lineWidth=3,n.beginPath(),n.roundRect(t,e,i,s,s/2),n.fill(),n.stroke(),ct.text(n,r,t+i/2,e+s/2,Math.min(26,s*.45),"#3a1a00")}};function Qr(n,t){return new Promise(e=>{let i=document.getElementById("mg"),s=i.getContext("2d");i.classList.remove("hidden");let r=Math.min(devicePixelRatio||1,t.lowres?1:1.5),a=0,o=0,l=()=>{a=innerWidth,o=innerHeight,i.width=a*r,i.height=o*r,s.setTransform(r,0,0,r,0,0)};l(),addEventListener("resize",l);let c=t.fast?6:1,h={c:s,get W(){return a},get H(){return o},t:0,dt:0,opts:t,def:n,col:t.color||"#1f6fe0",rcol:t.rivalColor||"#ffd21a",level:t.level||"normal",vaca:!!t.vaca,bot:!!t.bot,ended:!1,score:0,timeLeft:n.dur||0,taps:[],down:!1,px:0,py:0,onTap:null,onRelease:null,onDown:null,swipe:null,hud(U){let $=U!=null?+U:h.score,W=t.rivalScore;if(ct.text(s,n.name,a/2,22,Math.min(22,a/40),"#ffd21a"),n.dur){let O=Math.ceil(Math.max(0,h.timeLeft)),P=O<=10&&Math.floor(h.t*4)%2;s.fillStyle="#ff7a1a",s.beginPath(),s.roundRect(34,14,112,36,18),s.fill(),s.strokeStyle=P?"#ffd21a":"#fff",s.lineWidth=3,s.stroke(),ct.text(s,Math.floor(O/60)+":"+String(O%60).padStart(2,"0"),100,33,22,"#fff"),s.fillStyle="#1f6fe0",s.beginPath(),s.arc(32,32,26,0,7),s.fill(),s.strokeStyle=P?"#ffd21a":"#fff",s.stroke(),ct.vaca(s,26,44,.42,0),s.strokeStyle="#fff",s.lineWidth=2,s.beginPath(),s.arc(44,18,7,0,7),s.stroke(),s.beginPath(),s.moveTo(44,18),s.lineTo(44+Math.sin(h.t*6)*5,18-Math.cos(h.t*6)*5),s.stroke()}d(s,a,o,h,$,W)},end(U){h.ended||(h.ended=!0,he("whistle"),h.score=U!=null?U:h.score,setTimeout(G,t.fast?150:1300))}},u={v:[null,null],t:[0,0],old:[0,0]};function d(U,$,W,O,P,I){var ot,bt,Pt,wt;let X=(t.myColorName||"azul")!=="amarillo",at=X?[((ot=t.names)==null?void 0:ot[0])||"Tu pueblo",P]:[((bt=t.names)==null?void 0:bt[1])||"Rival",I],et=X?[((Pt=t.names)==null?void 0:Pt[1])||"Rival",I]:[((wt=t.names)==null?void 0:wt[0])||"Tu pueblo",P],vt=Math.min($*.36,300),Tt=34,Ht=W-Tt-10,Q=$/2;U.fillStyle="#1f4fc8",U.beginPath(),U.roundRect(Q-vt-26,Ht,vt,Tt,[17,0,0,17]),U.fill(),U.fillStyle="#ffd21a",U.beginPath(),U.roundRect(Q+26,Ht,vt,Tt,[0,17,17,0]),U.fill(),ct.text(U,String(at[0]).toUpperCase().slice(0,18),Q-vt/2-40,Ht+Tt/2,16,"#fff"),U.font="900 16px Arial",U.fillStyle="#111",U.textAlign="center",U.fillText(String(et[0]).toUpperCase().slice(0,18),Q+vt/2+40,Ht+Tt/2+1),[[at[1],Q-50,"#1f4fc8","#fff"],[et[1],Q+50,"#ffd21a","#111"]].forEach(([Gt,Wt,lt,ft],ht)=>{if(u.v[ht]!==Gt){if(u.v[ht]!==null){u.old[ht]=u.v[ht],u.t[ht]=.35;try{t.onFlip&&t.onFlip()}catch{}}u.v[ht]=Gt}u.t[ht]>0&&(u.t[ht]-=O.dt/(t.fast?6:1)),U.fillStyle="#fff",U.beginPath(),U.arc(Wt,Ht+Tt/2,24,0,7),U.fill(),U.fillStyle=lt,U.beginPath(),U.arc(Wt,Ht+Tt/2,21,0,7),U.fill();let mt=Math.max(0,u.t[ht])/.35,pt=mt>.5?u.old[ht]:Gt,Vt=Math.abs(Math.cos(mt*Math.PI));U.save(),U.translate(Wt,Ht+Tt/2),U.scale(1,Math.max(.05,Vt)),U.fillStyle=ft,U.font="900 22px Arial",U.textAlign="center",U.textBaseline="middle",U.fillText(String(pt),0,1),U.restore(),U.strokeStyle="#0004",U.lineWidth=1,U.beginPath(),U.moveTo(Wt-20,Ht+Tt/2),U.lineTo(Wt+20,Ht+Tt/2),U.stroke()}),t.doradaIcon!==!1&&ct.vaca(U,Q+12,Ht+Tt-2,.32,0,1,!0)}let f=[],g=0,S=320;function m(){if(t.fast||++g%3)return;let U=document.createElement("canvas");U.width=S,U.height=Math.round(S*o/a),U.getContext("2d").drawImage(i,0,0,U.width,U.height),f.push(U),f.length>30&&f.shift()}let p={on:!1,x:0,t0:0,next:Zt(4,8)},T=U=>{let $=i.getBoundingClientRect();return[U.clientX-$.left,U.clientY-$.top]},L=0,b=0,y=U=>{U.preventDefault(),[h.px,h.py]=T(U),L=h.px,b=h.py,h.down=!0,h.onDown&&h.onDown(h.px,h.py)},v=U=>{[h.px,h.py]=T(U),h.onMove&&h.onMove(h.px,h.py)},A=U=>{let[$,W]=T(U);h.down=!1;let O=$-L,P=W-b;Math.hypot(O,P)>40&&h.swipe?h.swipe(Math.abs(O)>Math.abs(P)?O>0?"r":"l":P>0?"d":"u",O,P):h.onTap&&h.onTap($,W),h.onRelease&&h.onRelease($,W)};i.addEventListener("pointerdown",y),i.addEventListener("pointermove",v),i.addEventListener("pointerup",A);let _=0,w=performance.now(),C=t.fast?.2:2.2;function B(U){_=requestAnimationFrame(B);let $=Math.min(.05,(U-w)/1e3)*c;if(w=U,C>0){C-=$,N();return}h.dt=$,h.t+=$,n.dur&&!h.ended&&(h.timeLeft-=$,h.timeLeft<=0&&(h.timeLeft=0,h.end())),h.vaca&&!h.ended&&(p.next-=$,!p.on&&p.next<=0&&(p.on=!0,p.x=-80),p.on&&(p.x+=$*a*.45,Math.abs(p.x-a/2)<8&&h.bump&&h.bump(),p.x>a+80&&(p.on=!1,p.next=Zt(5,9)))),h.bot&&!h.ended&&n.bot&&n.bot(h),n.frame(h),p.on&&(ct.vaca(s,p.x,o*.62,1.6,h.t,1),Bd(s,p.x,o*.62,1.6,dh[n.id]||"dedo"),ct.text(s,dh[n.id]==="corazon"?"\u{1F498} \xA1LA VAQUILLA ENAMORADA!":"\xA1LA VAQUILLA!",p.x,o*.62-120,24,"#ffd21a")),h.ended||m(),h.ended&&(s.fillStyle="#0008",s.fillRect(0,o/2-50,a,100),ct.text(s,`${h.score} ${n.unit||""}`,a/2,o/2-12,40,"#ffd21a"),n.icon&&(ct.text(s,`${n.icon}\xD7${h.score}`,a/2-110,o/2-80,30,"#6ab8ff"),ct.text(s,`${n.icon}\xD7${t.rivalScore}`,a/2+110,o/2-80,30,"#ffd21a")),ct.text(s,h.score>t.rivalScore?"\xA1Ganas la prueba!":h.score===t.rivalScore?"\xA1Empate!":"Gana el rival",a/2,o/2+28,24))}function N(){ct.sky(s,a,o,"#0a2a6a","#1f6fe0"),ct.text(s,zs[n.cat]||"",a/2,o*.22,22,"#9fd0ff"),ct.text(s,n.name,a/2,o*.36,Math.min(56,a/12),"#ffd21a"),ct.text(s,n.how,a/2,o*.52,Math.min(22,a/34)),n.live||ct.text(s,`Rival: ${t.rivalScore} ${n.unit||""} \u2014 \xA1sup\xE9ralo!`,a/2,o*.66,22,"#fff"),h.vaca&&ct.text(s,"\u{1F42E} \xA1El rival te ha soltado la vaquilla!",a/2,o*.78,22,"#ff9b6b")}function G(){if(cancelAnimationFrame(_),f.length>8&&t.replay!==!1&&(!t.bot||window.__replay)){let U=0;try{new Audio("assets/voz/h_replay.mp3").play().catch(()=>{})}catch{}let $=setInterval(()=>{let W=f[U++];if(!W){clearInterval($),F();return}s.drawImage(W,0,0,a,o),s.fillStyle="#ff7a1a",s.beginPath(),s.roundRect(14,14,120,36,6),s.fill(),ct.text(s,"REPLAY",74,33,20,"#fff"),s.setLineDash([3,9]),s.lineCap="round",s.strokeStyle="#3a8aff",s.lineWidth=8,s.strokeRect(8,8,a-16,o-16),s.setLineDash([])},1e3/8);return}F()}function F(){removeEventListener("resize",l),i.removeEventListener("pointerdown",y),i.removeEventListener("pointermove",v),i.removeEventListener("pointerup",A),i.classList.add("hidden"),e({you:h.score,rival:t.rivalScore,extra:h.extra})}n.start(h),_=requestAnimationFrame(B)})}var Ve={facil:.7,normal:1,dificil:1.25};var fh=[["Botijo",["Vasija de barro que enfr\xEDa el agua","Zapato de esparto","Sombrero de paja"],0],["Alf\xE9izar",["Tipo de pan","Parte baja de la ventana","Baile andaluz"],1],["Zascandil",["Persona inquieta y enredadora","Tipo de pez","Herramienta de campo"],0],["Ababol",["Juguete de madera","Amapola","Postre de leche"],1],["Ga\xF1\xE1n",["Mozo de labranza","P\xE1jaro cantor","Tela fina"],0],["Sobremesa",["Mantel grande","Tiempo tras la comida charlando","Mueble de cocina"],1],["Cachivache",["Trasto in\xFAtil","Cr\xEDa de vaca","Guiso de patata"],0],["Morri\xF1a",["Nostalgia de la tierra","Lluvia fina","Queso curado"],0],["Chisc\xF3n",["Habitaci\xF3n muy peque\xF1a","Charco grande","Pan dulce"],0],["Birlar",["Cantar en voz baja","Quitar algo con disimulo","Saltar a la pata coja"],1],["Tarambana",["Persona alocada","Instrumento de cuerda","Fruta tropical"],0],["Pelele",["Mu\xF1eco de paja","Piedra pulida","Cesta de mimbre"],0]],ta=[["A\xF1o en que se descubri\xF3 la penicilina",1928,1850,1990],["A\xF1o de la llegada de Col\xF3n a Am\xE9rica",1492,1400,1600],["Metros de altura de la Torre Eiffel (sin antenas)",300,100,500],["N\xFAmero de huesos de un adulto",206,100,300],["A\xF1o del primer hombre en la Luna",1969,1940,2e3],["Kil\xF3metros de un marat\xF3n (redondeado)",42,10,100],["Teclas de un piano de cola",88,40,120],["Grados de un \xE1ngulo recto",90,10,180],["D\xEDas de un a\xF1o bisiesto",366,300,400],["N\xFAmero de provincias de Espa\xF1a",50,20,80],["A\xF1o de inauguraci\xF3n de los Juegos Ol\xEDmpicos de Barcelona",1992,1960,2010],["Minutos de un partido de f\xFAtbol sin descuento",90,30,150],["Patas de 3 ara\xF1as",24,6,40],["Velocidad del sonido en m/s (redondeada a cientos)",300,100,1e3],["A\xF1o de publicaci\xF3n del Quijote (primera parte)",1605,1500,1700]],Lt=Math.PI,pl=[["PASEAR AL PERRO",{body:0,arms:[Lt*.15,Lt*.7],legs:[Lt*.4,Lt*.6]},{body:Lt*.45,arms:[Lt*.5,Lt*.55],legs:[Lt*.5,Lt*.55],y:.75}],["SUBIR ESCALERAS",{body:0,arms:[-Lt*.3,Lt*.8],legs:[Lt*.15,Lt*.55],y:.7},{body:0,arms:[-Lt*.3,Lt*.8],legs:[Lt*.15,Lt*.55],y:.4}],["LEVANTAR PESAS",{body:0,arms:[-Lt*.35,-Lt*.65],legs:[Lt*.35,Lt*.65]},{body:0,arms:[-Lt*.35,-Lt*.65],legs:[Lt*.35,Lt*.65]}],["JUGAR AL F\xDATBOL",{body:-.2,arms:[Lt*.1,Lt*.9],legs:[Lt*.05,Lt*.55]},{body:0,arms:[-Lt*.05,-Lt*.95],legs:[Lt*.3,Lt*.7],y:.45}],["TOCAR LA GUITARRA",{body:0,arms:[Lt*.2,Lt*.05],legs:[Lt*.45,Lt*.55]},{body:0,arms:[-Lt*.5,Lt*.6],legs:[Lt*.35,Lt*.65]}],["NADAR A CROL",{body:Lt*.5,arms:[-Lt*.1,Lt*.9],legs:[Lt*.48,Lt*.52]},{body:Lt*.5,arms:[Lt*.1,Lt*1.1],legs:[Lt*.46,Lt*.54],y:.35}],["BAILAR SEVILLANAS",{body:0,arms:[-Lt*.6,-Lt*.25],legs:[Lt*.4,Lt*.5]},{body:0,arms:[-Lt*.75,-Lt*.4],legs:[Lt*.5,Lt*.6]}],["HACER UNA FOTO",{body:0,arms:[-Lt*.1,Lt*1.1],legs:[Lt*.4,Lt*.6]},{body:0,arms:[-Lt*.4,-Lt*.6],legs:[Lt*.35,Lt*.65]}]];var en=n=>Math.round(n);Re({id:"pichichi",name:"La vaca pichichi",cat:"vaquilla",unit:"goles",dur:0,how:"Toca para chutar cuando la flecha apunte al hueco. \xA1La vaquilla es la portera! 6 tiros.",ai:n=>en(Zt(1.5,3.8)*Ve[n]),start(n){n.s={shots:6,ang:0,ball:null,keeper:0,msg:""},n.onTap=()=>{let t=n.s;t.ball||n.ended||!t.shots||(t.ball={t:0,tx:Math.sin(t.ang)},t.shots--)}},bot(n){!n.s.ball&&Math.abs(Math.sin(n.s.ang)- -Math.sin(n.t*1.3)*.5)>.6&&Math.random()<.08&&n.onTap()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),t.fillStyle="#4caf50",t.fillRect(0,i*.5,e,i*.5);let r=e/2,a=i*.42,o=e*.5,l=i*.22;t.strokeStyle="#fff",t.lineWidth=8,t.strokeRect(r-o/2,a-l,o,l),t.fillStyle="#ffffff22",t.fillRect(r-o/2,a-l,o,l),s.keeper=Math.sin(n.t*1.3*(n.level==="dificil"?1.5:1))*.5,ct.vaca(t,r+s.keeper*o*.8,a,1.5,n.t,s.keeper>0?-1:1),s.ang=Math.sin(n.t*2.2)*.75;let c=r,h=i*.88;s.ball||(t.strokeStyle="#ffd21a",t.lineWidth=6,t.beginPath(),t.moveTo(c,h),t.lineTo(c+Math.sin(s.ang)*o*.7,h-i*.3),t.stroke());let u=c,d=h;if(s.ball){s.ball.t+=n.dt*1.8;let f=Math.min(1,s.ball.t);if(u=c+s.ball.tx*o*.66*f,d=h-(h-(a-l/2))*f,f>=1&&!s.ball.done){s.ball.done=1;let g=s.ball.tx*.66/.5*.5,S=Math.abs(s.ball.tx*.66-s.keeper*.8*1)<.22,m=Math.abs(s.ball.tx)>.74;s.msg=m?"\xA1Fuera!":S?"\xA1Para la vaquilla!":"\xA1GOOOL!",!m&&!S&&n.score++,setTimeout(()=>{s.ball=null,s.msg="",s.shots||n.end()},700)}}ct.person(t,c-30,h+20,1.3,n.col),t.fillStyle="#fff",t.beginPath(),t.arc(u,d,12,0,7),t.fill(),t.strokeStyle="#000",t.lineWidth=2,t.stroke(),s.msg&&ct.text(t,s.msg,e/2,i*.55,44,"#ffd21a"),n.hud(),ct.text(t,"Tiros: "+s.shots,12,104,18,"#fff","left")}});Re({id:"regadores",name:"Los regadores",cat:"vaquilla",unit:"litros",dur:35,how:"Mant\xE9n pulsado para correr con el cubo hasta la tinaja. \xA1Suelta cuando la vaquilla mire!",ai:n=>en(Zt(14,26)*Ve[n]),start(n){n.s={x:0,dir:1,water:10,look:!1,lt:Zt(2,4),hit:0}},bot(n){n.down=!n.s.look&&!(n.s.lt<.35)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),ct.sand(t,0,i*.55,e,i*.45),s.lt-=n.dt,s.lt<=0&&(s.look=!s.look,s.lt=s.look?Zt(1,2):Zt(1.5,3.5));let r=n.down&&!n.ended&&s.hit<=0;s.hit>0&&(s.hit-=n.dt),r&&(s.x+=s.dir*n.dt*.32,s.look&&(s.hit=1.2,s.water=Math.max(0,s.water-5))),s.x>=1&&(s.x=1,s.dir=-1,n.score+=s.water,s.water=0),s.x<=0&&s.dir<0&&(s.x=0,s.dir=1,s.water=10);let a=e*.1,o=e*.85,l=a+(o-a)*s.x,c=i*.82;t.fillStyle="#2b88d8",t.fillRect(a-50,c-40,40,40),ct.text(t,"POZO",a-30,c-50,14),t.fillStyle="#8a5a2a",t.fillRect(o+10,c-70,50,70),t.fillStyle="#2ec4e8";let h=Math.min(1,n.score/40);t.fillRect(o+14,c-4-62*h,42,62*h),ct.text(t,"TINAJA",o+35,c-82,14),ct.vaca(t,e*.5,i*.58,1.4,s.look?n.t:0,s.look?1:-1),ct.text(t,s.look?"\u{1F440} \xA1QUIETO!":"Corre\u2026",e*.5,i*.4,26,s.look?"#ff5b4b":"#fff"),ct.person(t,l,c,1.4,n.col,{run:r?n.t*14:0,rot:s.hit>0?1.2:0}),t.fillStyle="#9aa",t.fillRect(l+14,c-50,16,18),t.fillStyle="#2ec4e8",t.fillRect(l+15,c-49+17*(1-s.water/10),14,17*s.water/10),ct.btn(t,e-190,i-80,170,60,n.down?"CORRIENDO":"MANT\xC9N","#ffd21a",n.down),n.hud()}});Re({id:"huevos",name:"Huevos fritos",cat:"vaquilla",unit:"huevos",dur:30,how:"Desliza o toca a izquierda/derecha para cambiar de carril. Coge huevos y esquiva a la vaquilla.",ai:n=>en(Zt(8,15)*Ve[n]),start(n){n.s={lane:1,items:[],next:0,hit:0};let t=e=>{n.s.lane=Math.max(0,Math.min(2,n.s.lane+e))};n.onTap=e=>t(e<n.W/2?-1:1),n.swipe=e=>t(e==="l"?-1:e==="r"?1:0)},bot(n){let t=n.s;t.items.find(i=>i.y>.55&&i.y<.8&&i.lane===t.lane&&i.vaca)&&Math.random()<.2&&n.onTap(t.lane===0?n.W:t.lane===2||Math.random()<.5?0:n.W)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),ct.sand(t,0,i*.3,e,i*.7);let r=(o,l)=>e/2+(o-1)*e*(.12+.18*l),a=o=>i*.3+o*i*.7;t.strokeStyle="#fff8",t.lineWidth=3;for(let o of[.5,1.5])t.beginPath(),t.moveTo(r(o,0),a(0)),t.lineTo(r(o,1),a(1)),t.stroke();s.next-=n.dt,s.next<=0&&!n.ended&&(s.next=Zt(.45,.9),s.items.push({lane:en(Zt(-.49,2.49)),y:0,vaca:Math.random()<.38})),s.hit>0&&(s.hit-=n.dt);for(let o of s.items){o.y+=n.dt*(.45+n.t*.01),!o.done&&o.y>.82&&o.y<.95&&o.lane===s.lane&&(o.done=1,o.vaca?(s.hit=1,n.score=Math.max(0,n.score-2)):n.score++);let l=.4+o.y;o.done&&!o.vaca||(o.vaca?ct.vaca(t,r(o.lane,o.y),a(o.y),l,n.t):(t.fillStyle="#fff",t.beginPath(),t.ellipse(r(o.lane,o.y),a(o.y)-10*l,14*l,18*l,0,0,7),t.fill(),t.strokeStyle="#ccc",t.stroke()))}s.items=s.items.filter(o=>o.y<1.1),ct.person(t,r(s.lane,.9),a(.9),1.5,n.col,{run:n.t*12,rot:s.hit>0?Math.sin(n.t*30)*.5:0}),t.fillStyle="#333",t.beginPath(),t.ellipse(r(s.lane,.9)+26,a(.9)-60,18,6,0,0,7),t.fill(),n.hud()}});Re({id:"rampa",name:"La rampa",cat:"fisica",unit:"subidas",dur:30,how:"Toca muy r\xE1pido para subir la rampa enjabonada y tocar la campana. \xA1Si paras, resbalas!",ai:n=>en(Zt(3,6)*Ve[n]),start(n){n.s={y:0,v:0,ring:0},n.onTap=()=>{n.ended||(n.s.v+=.065)},n.onDown=n.onTap,n.onTap=null},bot(n){Math.random()<.42&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),s.v-=n.dt*.55,s.v*=.96,s.y=Math.max(0,s.y+s.v*n.dt*10),s.y===0&&(s.v=Math.max(0,s.v)),s.y>=1&&(n.score++,s.y=0,s.v=0,s.ring=1),s.ring>0&&(s.ring-=n.dt);let r=e*.15,a=i*.9,o=e*.8,l=i*.25;t.fillStyle="#e8f6ff",t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.lineTo(o,a),t.fill(),t.strokeStyle="#3aa0ff",t.lineWidth=6,t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.stroke();for(let c=0;c<12;c++)t.fillStyle="#ffffffaa",t.beginPath(),t.arc(r+(o-r)*((c*.083+n.t*.02)%1),a+(l-a)*((c*.083+n.t*.02)%1)-8,5+c%3*2,0,7),t.fill();t.fillStyle="#ffd21a",t.beginPath(),t.arc(o+20,l-30,18+(s.ring>0?Math.sin(n.t*50)*4:0),0,7),t.fill(),ct.person(t,r+(o-r)*s.y,a+(l-a)*s.y,1.3,n.col,{run:s.v>.02?n.t*18:0,rot:-.6}),s.ring>0&&ct.text(t,"\u{1F514} \xA1DING!",e/2,i*.2,40,"#ffd21a"),ct.text(t,"\u{1F446} \xA1TOCA R\xC1PIDO!",e*.3,i*.3,26),n.hud()}});Re({id:"rompepuertas",name:"Rompepuertas",cat:"fisica",unit:"paredes",dur:30,how:"Elige una puerta: dos son de papel y una es de verdad. \xA1Atraviesa todas las paredes que puedas!",ai:n=>en(Zt(5,9)*Ve[n]),start(n){let t=n.s={solid:en(Zt(-.49,2.49)),anim:0,pick:-1,bad:0};n.onTap=(e,i)=>{if(t.anim>0||n.ended)return;let s=Math.floor(e/(n.W/3));t.pick=s,t.anim=.6,t.bad=s===t.solid}},bot(n){n.s.anim<=0&&Math.random()<.05&&n.onTap(Zt(0,n.W),200)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i,"#ffb36b","#ffe3b8"),t.fillStyle="#c8a070",t.fillRect(0,i*.8,e,i*.2),s.anim>0&&(s.anim-=n.dt,s.anim<=0&&(s.bad||n.score++,s.solid=en(Zt(-.49,2.49)),s.pick=-1));for(let r=0;r<3;r++){let a=e/6+r*e/3,o=e/4.2,l=i*.55,c=i*.8-l,h=s.pick===r&&!s.bad&&s.anim>0,u=s.pick>=0&&s.anim>0;t.fillStyle=u&&r===s.solid?"#7a4a22":["#ff6b6b","#6bc5ff","#8ee86b"][r],h?(t.strokeStyle="#fff",t.setLineDash([8,8]),t.strokeRect(a-o/2,c,o,l),t.setLineDash([])):(t.fillRect(a-o/2,c,o,l),t.strokeStyle="#fff",t.lineWidth=4,t.strokeRect(a-o/2,c,o,l)),ct.text(t,["A","B","C"][r],a,c+l/2,48)}if(s.pick>=0){let r=e/6+s.pick*e/3,a=1-Math.max(0,s.anim)/.6;ct.person(t,r,i*.95-a*30,1.6+a*.4,n.col,{rot:s.bad&&a>.5?-1.4:0,armsUp:!s.bad}),s.bad&&a>.5&&ct.text(t,"\xA1PUM! \xA1Era de madera!",e/2,i*.25,30,"#ff5b4b"),!s.bad&&a>.3&&ct.text(t,"\xA1CRASH!",e/2,i*.25,40,"#ffd21a")}n.hud()}});function kd(n,t,e,i,s){let r=["#fff","#ffd21a","#fff","#3a9aff","#fff","#ff5a3a"];for(let a=0;a<6;a++)n.fillStyle=r[a],n.beginPath(),n.moveTo(t,e),n.arc(t,e,i,s+a*Math.PI/3,s+(a+1)*Math.PI/3),n.fill();n.strokeStyle="#0003",n.lineWidth=2,n.beginPath(),n.arc(t,e,i,0,7),n.stroke()}function zd(n,t,e){let i=n.createLinearGradient(0,0,t,0);i.addColorStop(0,"#ff5ab4"),i.addColorStop(.5,"#8fd0ff"),i.addColorStop(1,"#ff5ab4"),n.fillStyle=i,n.fillRect(0,0,t,e*.55);let s=["#f6c43a","#f08a3a","#9a6ad8","#f27ab0","#c7a6f0"];for(let a=0;a<7;a++){let o=a*t/6-30,l=t/8,c=e*(.28+a%3*.05);n.fillStyle=s[a%5],n.fillRect(o,e*.55-c,l,c),n.fillStyle="#a8402a",n.beginPath(),n.moveTo(o-8,e*.55-c),n.lineTo(o+l/2,e*.55-c-30),n.lineTo(o+l+8,e*.55-c),n.fill(),n.fillStyle="#3a6ad8";for(let h=0;h<2;h++)for(let u=0;u<2;u++)n.fillRect(o+10+u*l/2,e*.55-c+14+h*44,l/2-20,30)}let r=n.createLinearGradient(0,e*.55,0,e);r.addColorStop(0,"#8ad8f4"),r.addColorStop(1,"#c8f2ff"),n.fillStyle=r,n.fillRect(0,e*.55,t,e*.45),n.fillStyle="#4fe0e8",n.fillRect(0,e*.55,t,6)}Re({id:"pinguipato",name:"Tiro al ping\xFCi-pato",cat:"fisica",unit:"puntos",dur:30,how:"Patos y ping\xFCinos desfilan bajo el toldo. Toca uno para lanzarle el bal\xF3n de la cuerda. Pato 1 punto, ping\xFCino 2. \xA1Al \xE1rbitro no!",ai:n=>en(Zt(9,16)*Ve[n]),start(n){let t=n.s={list:[],next:0,shot:null};n.onDown=e=>{t.shot||n.ended||(t.shot={tx:e,t:0})}},bot(n){let t=n.s.list.find(e=>!e.hit&&!e.ref&&e.x>.25&&e.x<.75);t&&!n.s.shot&&Math.random()<.08&&n.onDown(t.x*n.W+t.v*n.W*.45)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;zd(t,e,i);for(let h=0;h<12;h++)t.fillStyle=h%2?"#fff":"#e2321e",t.beginPath(),t.moveTo(h*e/12,0),t.lineTo((h+1)*e/12,0),t.lineTo((h+1)*e/12,i*.12),t.lineTo(h*e/12,i*.12),t.fill();if(s.next-=n.dt,s.next<=0&&!n.ended){s.next=Zt(.7,1.3);let h=Math.random();s.list.push({x:-.06,v:Zt(.14,.24),kind:h<.12?"ref":h<.45?"pen":"pato",hit:0})}let r=i*.82;for(let h of s.list){h.x+=h.v*n.dt;let u=h.x*e,d=Math.min(1.2,i/450);if(t.save(),t.translate(u,r),h.hit&&t.rotate(Math.min(1.4,h.hit*4)),t.scale(d,d),h.kind==="ref"){t.restore(),ct.person(t,u,r,1.3*d,"#111"),ct.text(t,"\xC1RBITRO",u,r-100*d,13);continue}let f=h.kind==="pen"?"#222":"#ffd21a";t.fillStyle=f,t.beginPath(),t.ellipse(0,-40,26,40,0,0,7),t.fill(),t.beginPath(),t.arc(0,-92,18,0,7),t.fill(),h.kind==="pen"&&(t.fillStyle="#fff",t.beginPath(),t.ellipse(0,-36,15,28,0,0,7),t.fill()),t.fillStyle="#ff8a1a",t.beginPath(),t.moveTo(10,-94),t.lineTo(30,-88),t.lineTo(10,-84),t.fill(),t.fillRect(-14,-4,10,5),t.fillRect(4,-4,10,5),t.fillStyle="#111",t.beginPath(),t.arc(6,-98,3,0,7),t.fill(),t.restore(),h.hit&&(h.hit+=n.dt)}s.list=s.list.filter(h=>h.x<1.1);let a=e/2,o=r-60,l=a,c=o*.35;if(s.shot){s.shot.t+=n.dt*2;let h=Math.min(1,s.shot.t);if(l=a+(s.shot.tx-a)*h,c=o*.35+(r-60-o*.35)*Math.sin(h*Math.PI/2),h>=1&&!s.shot.done){s.shot.done=1;let u=s.list.find(d=>!d.hit&&Math.abs(d.x*e-l)<40);u&&(u.hit=.01,n.score=Math.max(0,n.score+(u.kind==="ref"?-3:u.kind==="pen"?2:1))),setTimeout(()=>{s.shot=null},350)}}t.strokeStyle="#ddd",t.lineWidth=2,t.beginPath(),t.moveTo(a,i*.12),t.lineTo(l,c),t.stroke(),kd(t,l,c,26,n.t*4),n.hud()}});Re({id:"salta",name:"\xA1Salta!",cat:"piscina",unit:"saltos",dur:30,how:"Una barra gigante gira sobre la piscina. Toca para saltar justo cuando llegue a tus pies.",ai:n=>en(Zt(9,16)*Ve[n]),start(n){n.s={a:0,jump:0,fall:0,sp:1.6},n.onDown=()=>{n.s.jump<=0&&n.s.fall<=0&&(n.s.jump=.7)}},bot(n){(n.s.a%(Math.PI*2)+Math.PI*2)%(Math.PI*2)>Math.PI*2-.55&&Math.random()<.5&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),ct.water(t,0,i*.7,e,i*.3,n.t);let r=e/2,a=i*.62,o=Math.min(e*.4,i*.5);t.fillStyle="#ddd",t.beginPath(),t.ellipse(r,a,o,o*.3,0,0,7),t.fill(),t.fillStyle="#e23a2a",t.beginPath(),t.arc(r,a,16,0,7),t.fill();let l=s.a;n.ended||(s.sp=1.6+n.t*.05,s.a+=n.dt*s.sp);let c=Math.PI/2;Math.floor((l-c)/(Math.PI*2))!==Math.floor((s.a-c)/(Math.PI*2))&&s.fall<=0&&!n.ended&&(s.jump>.12&&s.jump<.62?n.score++:s.fall=1.3),s.jump>0&&(s.jump-=n.dt),s.fall>0&&(s.fall-=n.dt);let u=r+Math.cos(s.a)*o,d=a+Math.sin(s.a)*o*.3,f=a+o*.3-Math.max(0,Math.sin(Math.max(0,s.jump)/.7*Math.PI))*80,g=Math.sin(s.a)<0,S=()=>{t.strokeStyle="#ff9b1a",t.lineWidth=14,t.lineCap="round",t.beginPath(),t.moveTo(r,a),t.lineTo(u,d),t.stroke(),t.fillStyle="#ffd21a",t.beginPath(),t.arc(u,d,16,0,7),t.fill()};g&&S(),s.fall>0?ct.text(t,"\xA1PLAF! \u{1F4A6}",r,a+o*.3,36,"#fff"):ct.person(t,r,f,1.4,n.col,{armsUp:s.jump>0}),g||S(),n.hud()}});Re({id:"cocos",name:"Los recoge-cocos",cat:"piscina",unit:"cocos",dur:30,how:"Arrastra la barca por la piscina y recoge los cocos que caen de la palmera.",ai:n=>en(Zt(10,18)*Ve[n]),start(n){n.s={x:.5,items:[],next:0},n.onMove=t=>{n.down&&(n.s.x=Math.max(.08,Math.min(.92,t/n.W)))},n.onDown=t=>{n.s.x=Math.max(.08,Math.min(.92,t/n.W))}},bot(n){let t=n.s.items.filter(e=>!e.done&&e.y<.85).sort((e,i)=>i.y-e.y)[0];t&&(n.s.x+=Math.sign(t.x-n.s.x)*Math.min(Math.abs(t.x-n.s.x),n.dt*.9))},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i),ct.water(t,0,i*.78,e,i*.22,n.t),t.fillStyle="#2f8a3a";for(let o=0;o<5;o++)t.beginPath(),t.ellipse(e*(.1+o*.2),60,e*.12,30,Math.sin(o)*.3,0,7),t.fill();s.next-=n.dt,s.next<=0&&!n.ended&&(s.next=Zt(.5,1),s.items.push({x:Zt(.08,.92),y:.08,v:Zt(.25,.4),bomb:Math.random()<.15}));for(let o of s.items)o.done||(o.y+=n.dt*o.v,o.v+=n.dt*.08,o.y>.78&&o.y<.84&&Math.abs(o.x-s.x)<.08&&(o.done=1,n.score+=o.bomb?-2:1,n.score=Math.max(0,n.score)),t.fillStyle=o.bomb?"#e23a2a":"#6a4520",t.beginPath(),t.arc(o.x*e,o.y*i,16,0,7),t.fill(),o.bomb&&ct.text(t,"\u{1F345}",o.x*e,o.y*i,20));s.items=s.items.filter(o=>o.y<1.05&&!o.done);let r=s.x*e,a=i*.82;t.fillStyle=n.col,t.beginPath(),t.moveTo(r-60,a-10),t.lineTo(r+60,a-10),t.lineTo(r+42,a+16),t.lineTo(r-42,a+16),t.fill(),ct.person(t,r,a-8,1.1,n.col,{armsUp:!0}),n.hud()}});Re({id:"tomatazos",name:"Tomatazos",cat:"piscina",unit:"blancos",dur:25,how:"Toca los blancos que pasan sobre la piscina para lanzarles un tomate. \xA1No le des al \xE1rbitro!",ai:n=>en(Zt(12,20)*Ve[n]),start(n){let t=n.s={tg:[],next:0,sp:[]};n.onDown=(e,i)=>{if(!n.ended){for(let s of t.tg)if(!s.hit&&Math.hypot(s.x*n.W-e,s.y*n.H-i)<46){s.hit=1,n.score+=s.ref?-3:1,n.score=Math.max(0,n.score),t.sp.push({x:e,y:i,t:.5});return}}}},bot(n){let t=n.s.tg.find(e=>!e.hit&&!e.ref&&e.x>.1&&e.x<.9);t&&Math.random()<.07&&n.onDown(t.x*n.W,t.y*n.H)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;if(ct.sky(t,e,i),ct.water(t,0,i*.7,e,i*.3,n.t),s.next-=n.dt,s.next<=0&&!n.ended){s.next=Zt(.4,.8);let r=Math.random()<.5;s.tg.push({x:r?-.05:1.05,y:Zt(.25,.62),v:(r?1:-1)*Zt(.2,.38),ref:Math.random()<.14})}for(let r of s.tg)r.x+=r.v*n.dt,!r.hit&&(r.ref?(ct.person(t,r.x*e,r.y*i+40,1.1,"#111"),ct.text(t,"\xC1RBITRO",r.x*e,r.y*i-40,12)):(t.fillStyle="#fff",t.beginPath(),t.arc(r.x*e,r.y*i,36,0,7),t.fill(),t.fillStyle="#e23a2a",t.beginPath(),t.arc(r.x*e,r.y*i,24,0,7),t.fill(),t.fillStyle="#fff",t.beginPath(),t.arc(r.x*e,r.y*i,10,0,7),t.fill()));s.tg=s.tg.filter(r=>r.x>-.1&&r.x<1.1);for(let r of s.sp){r.t-=n.dt,t.fillStyle="#d42a1a";for(let a=0;a<6;a++)t.beginPath(),t.arc(r.x+Math.cos(a)*(1-r.t)*40,r.y+Math.sin(a*2)*(1-r.t)*40,8,0,7),t.fill()}s.sp=s.sp.filter(r=>r.t>0),n.hud()}});Re({id:"sandia",name:"La sand\xEDa",cat:"yincana",unit:"rondas",dur:0,how:"Mira el orden en que se iluminan las casetas y rep\xEDtelo. Cada ronda, una m\xE1s.",ai:n=>en(Zt(3,6)*Ve[n]),start(n){let t=n.s={seq:[],show:0,idx:0,input:0,flash:-1,ft:0,wait:1,fail:0};t.add=()=>{t.seq.push(en(Zt(-.49,3.49))),t.show=1,t.idx=0,t.ft=0,t.input=0},n.onDown=(e,i)=>{if(!t.input||n.ended)return;let s=(e<n.W/2?0:1)+(i<n.H*.58?0:2);t.flash=s,t.ft=.25,s===t.seq[t.idx]?(t.idx++,t.idx===t.seq.length&&(n.score++,t.input=0,t.wait=.9)):(t.fail=1,t.input=0,n.end())}},bot(n){let t=n.s;if(t.input&&Math.random()<.08){let e=Math.random()<.9?t.seq[t.idx]:0;n.onDown((e%2?.75:.25)*n.W,(e<2?.4:.8)*n.H)}},frame(n){let{c:t,W:e,H:i}=n,s=n.s;if(ct.sky(t,e,i),ct.sand(t,0,i*.2,e,i*.8),s.wait>0&&(s.wait-=n.dt,s.wait<=0&&s.add()),s.show){s.ft+=n.dt;let o=Math.floor(s.ft/.7);s.flash=s.ft%.7<.45?s.seq[o]:-1,o>=s.seq.length&&(s.show=0,s.input=1,s.flash=-1)}else s.ft>0&&(s.ft-=n.dt,s.ft<=0&&(s.flash=-1));let r=["\u{1F349}","\u{1F353}","\u{1F33D}","\u{1F34B}"],a=["#2fb84a","#e23a2a","#ffb31a","#ffe14a"];for(let o=0;o<4;o++){let l=o%2*e/2+20,c=56+(o<2?0:(i-56)/2),h=e/2-40,u=(i-56)/2-20;t.fillStyle=s.flash===o?"#fff":a[o],t.globalAlpha=s.flash===o?1:.75,t.beginPath(),t.roundRect(l,c,h,u,20),t.fill(),t.globalAlpha=1,ct.text(t,r[o],l+h/2,c+u/2,60)}ct.text(t,s.show?"Mira\u2026":s.input?"\xA1Tu turno!":s.fail?"\xA1Fallo!":"\xA1Bien!",e/2,i*.58,30,"#fff"),n.hud()}});function Gd(n,t,e,i,s,r){return Re({id:n,name:t,cat:"saber",unit:i,dur:0,how:e,ai:a=>en(Zt(2,4.5)*Ve[a]),start(a){let o=a.s={q:s.slice().sort(()=>Math.random()-.5).slice(0,6),i:0,sel:-1,st:0,fuse:12,boom:0};o.cur=()=>r(o.q[o.i]),a.onDown=(l,c)=>{if(o.sel>=0||a.ended||o.boom)return;let h=o.cur().opts;for(let u=0;u<h.length;u++){let d=a.H*.45+u*a.H*.15;c>d&&c<d+a.H*.12&&(o.sel=u,o.st=.9,u===o.cur().ok&&a.score++)}}},bot(a){if(a.s.sel<0&&!a.s.boom&&Math.random()<.03){let o=Math.random()<.7?a.s.cur().ok:0;a.onDown(a.W/2,a.H*.45+o*a.H*.15+5)}},frame(a){let{c:o,W:l,H:c}=a,h=a.s;if(ct.sky(o,l,c,"#0a1a4a","#22408a"),n==="patata"){if(h.sel<0&&!h.boom&&!a.ended&&(h.fuse-=a.dt,h.fuse<=0&&(h.boom=1.2)),h.boom&&(h.boom-=a.dt,h.boom<=0))return h.boom=0,a.end(),a.hud();let d=h.fuse<4?Math.sin(a.t*40)*4:0;o.fillStyle=h.boom?"#ff5b1a":"#c08a3a",o.beginPath(),o.ellipse(l-80+d,110,40,28,.3,0,7),o.fill(),ct.text(o,h.boom?"\u{1F4A5}":Math.ceil(h.fuse)+"",l-80,110,26)}if(h.st>0&&(h.st-=a.dt,h.st<=0)){let d=h.sel===h.cur().ok;if(h.sel=-1,h.i++,n==="patata"&&(h.fuse=d?Math.max(5,h.fuse+2):h.fuse-3),h.i>=h.q.length)return a.end()}let u=h.cur();if(!u)return a.hud();o.fillStyle="#000a",o.beginPath(),o.roundRect(l*.06,c*.16,l*.88,c*.24,16),o.fill(),Vd(o,u.q,l/2,c*.28,l*.8,Math.min(26,l/30)),u.opts.forEach((d,f)=>{let g=c*.45+f*c*.15,S=h.sel>=0,m=S&&f===u.ok?"#2fb84a":S&&f===h.sel?"#e23a2a":"#1f6fe0";o.fillStyle=m,o.strokeStyle="#ffd21a",o.lineWidth=3,o.beginPath(),o.roundRect(l*.12,g,l*.76,c*.12,30),o.fill(),o.stroke(),ct.text(o,d,l/2,g+c*.06,Math.min(22,l/36))}),a.hud(),ct.text(o,`Pregunta ${Math.min(h.i+1,h.q.length)}/${h.q.length}`,12,64,16,"#fff","left")}})}function Vd(n,t,e,i,s,r){n.font=`900 ${r}px Arial`;let a=t.split(" "),o=[],l="";for(let c of a)n.measureText(l+c).width>s&&(o.push(l),l=""),l+=c+" ";o.push(l),o.forEach((c,h)=>ct.text(n,c.trim(),e,i+(h-(o.length-1)/2)*r*1.2,r))}Gd("diccionario","El diccionario","El padrino elige la definici\xF3n correcta de cada palabra rara.","aciertos",fh,n=>n&&{q:"\xBFQu\xE9 significa \xAB"+n[0]+"\xBB?",opts:n[1],ok:n[2]});Re({id:"capitanes",name:"Pasi\xF3n de capitanes",cat:"especial",unit:"puntos",dur:0,how:"Duelo de capitanes: toca en cuanto el sem\xE1foro se ponga VERDE. Al mejor de 5. \xA1Se juega la Vaquilla dorada!",ai:()=>2,start(n){let t=n.s={r:0,st:"wait",t:Zt(1.2,3),you:0,riv:0,msg:"",rt:0};n.onDown=()=>{if(!n.ended){if(t.st==="wait")t.msg="\xA1Te has adelantado!",t.riv++,t.st="res",t.t=1.2;else if(t.st==="go"){let e=t.rt,i=Zt(.28,.55);e<i?(t.you++,t.msg=`\xA1Ganas! ${Math.round(e*1e3)} ms`):(t.riv++,t.msg=`M\xE1s r\xE1pido el rival (${Math.round(i*1e3)} ms)`),t.st="res",t.t=1.3}}}},bot(n){n.s.st==="go"&&n.s.rt>.3&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i,"#1a0a3a","#4a1a6a"),n.ended||(s.st==="go"?s.rt+=n.dt:s.t-=n.dt,s.st==="wait"&&s.t<=0&&(s.st="go",s.rt=0),s.st==="go"&&s.rt>1&&(s.riv++,s.msg="Demasiado lento\u2026",s.st="res",s.t=1.2),s.st==="res"&&s.t<=0&&(s.you>=3||s.riv>=3?(n.score=s.you,n.opts.rivalScore=s.riv,n.end(s.you)):(s.st="wait",s.t=Zt(1.2,3),s.msg=""))),t.fillStyle="#222",t.beginPath(),t.roundRect(e/2-60,i*.2,120,200,20),t.fill(),["#e23a2a","#ffb31a","#2fb84a"].forEach((r,a)=>{let o=s.st==="go"&&a===2||s.st==="wait"&&a===0;t.fillStyle=o?r:"#444",t.beginPath(),t.arc(e/2,i*.2+36+a*64,26,0,7),t.fill()}),ct.person(t,e*.2,i*.9,2,n.col,{armsUp:s.st==="res"&&s.msg.startsWith("\xA1Ganas")}),ct.person(t,e*.8,i*.9,2,n.rcol),ct.vaca(t,e/2,i*.95,1.2,0,1,!0),ct.text(t,"VAQUILLA DORADA",e/2,i*.97-90,14,"#ffd21a"),ct.text(t,`${s.you} - ${s.riv}`,e/2,i*.14,36,"#ffd21a"),s.msg&&ct.text(t,s.msg,e/2,i*.7,28),n.hud(`${s.you}`)}});var ai=Math.round,Gs=n=>{if(!window.__fast)try{new Audio("assets/voz/"+n+".mp3").play().catch(()=>{})}catch{}},ea=(n,t,e,i,s,r,a)=>ct.btn(n,t,e,i,s,r,a),Ji=(n,t,e)=>n>e[0]&&n<e[0]+e[2]&&t>e[1]&&t<e[1]+e[3];function gl(n,t,e){let i=n.createLinearGradient(0,0,t,0);i.addColorStop(0,"#ff5ab4"),i.addColorStop(.5,"#8fd0ff"),i.addColorStop(1,"#ff5ab4"),n.fillStyle=i,n.fillRect(0,0,t,e*.55);let s=["#f6c43a","#f08a3a","#9a6ad8","#f27ab0","#c7a6f0"];for(let a=0;a<7;a++){let o=a*t/6-30,l=t/8,c=e*(.28+a%3*.05);n.fillStyle=s[a%5],n.fillRect(o,e*.55-c,l,c),n.fillStyle="#3a6ad8";for(let h=0;h<2;h++)for(let u=0;u<2;u++)n.fillRect(o+10+u*l/2,e*.55-c+14+h*44,l/2-20,30)}let r=n.createLinearGradient(0,e*.55,0,e);r.addColorStop(0,"#8ad8f4"),r.addColorStop(1,"#c8f2ff"),n.fillStyle=r,n.fillRect(0,e*.55,t,e*.45),n.fillStyle="#4fe0e8",n.fillRect(0,e*.55,t,6)}function Hd(n,t,e,i,s){let r=["#e23a2a","#fff","#1f4fc8","#ffd21a","#2fb84a","#fff"];for(let a=0;a<6;a++)n.fillStyle=r[a],n.beginPath(),n.moveTo(t,e),n.arc(t,e,i,s+a*Math.PI/3,s+(a+1)*Math.PI/3),n.fill()}function Wd(n,t,e,i,s,r){n.save(),n.translate(t,e),n.rotate(r*1.4),n.scale(i,i),n.fillStyle=s?"#f6c431":"#fff",n.beginPath(),n.moveTo(-20,0),n.bezierCurveTo(-28,-40,-10,-60,-12,-80),n.bezierCurveTo(-16,-100,-10,-118,0,-120),n.bezierCurveTo(10,-118,16,-100,12,-80),n.bezierCurveTo(10,-60,28,-40,20,0),n.closePath(),n.fill(),n.save(),n.clip(),n.fillStyle=s?"#fff1a8":"#ffd21a",n.fillRect(-30,-130,16,140),n.fillRect(14,-130,16,140),n.fillStyle="#e23a2a",n.fillRect(-30,-86,60,7),n.restore(),n.fillStyle="#f1c6a0",n.beginPath(),n.arc(0,-98,7,0,7),n.fill(),n.restore()}Re({id:"superbolos",name:"Los superbolos",cat:"fisica",unit:"bolos",icon:"\u{1F3B3}",dur:150,pts:{win:2},shot:"bolera",how:"Vas con los ojos vendados y en patines. Tu padrino te gu\xEDa: \xAB\xA1Izquierda! \xA1Derecha! \xA1Tira!\xBB. Mueve \u25C0 \u25B6 y pulsa TIRAR. 6 bolos, el dorado vale 2. Tienes 2:30.",ai:n=>ai(Math.min(7,Zt(3,6.5)*Ve[n])),start(n){let t=n.s={x:.5,mv:0,ball:null,guide:"",gt:0,cool:0,pins:[[.5,0],[.44,1],[.56,1],[.38,2],[.5,2],[.62,2]].map(([s,r],a)=>({x:s,row:r,gold:a===4,dn:0,gone:0}))},e=()=>({l:[20,n.H-90,90,70],r:[120,n.H-90,90,70],t:[n.W-200,n.H-90,180,70]});n.onDown=(s,r)=>{let a=e();Ji(s,r,a.l)?t.mv=-1:Ji(s,r,a.r)?t.mv=1:Ji(s,r,a.t)&&i()},n.onRelease=()=>{t.mv=0};let i=()=>{t.ball||n.ended||(t.ball={t:0,x:t.x})};t.throwB=i},bot(n){let t=n.s,e=t.pins.find(s=>!s.dn);if(!e)return;let i=e.x-t.x;t.mv=Math.abs(i)>.025?Math.sign(i):0,!t.mv&&!t.ball&&Math.random()<.1&&t.throwB()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;gl(t,e,i),t.fillStyle="#e2321e",t.beginPath(),t.ellipse(e/2,i*.62,e*.3,i*.1,0,Math.PI,0),t.fill(),t.fillRect(e*.2,i*.6,e*.6,i*.06),s.x=Math.max(.15,Math.min(.85,s.x+s.mv*n.dt*.35));let r=u=>i*(.6-u*.025)-0,a=u=>Math.min(1,i/600)*(1-u*.08),o=s.pins.filter(u=>!u.gone);for(let u of o.slice().sort((d,f)=>f.row-d.row))u.dn>0&&(u.dn+=n.dt,u.dn>1.6&&(u.gone=1)),Wd(t,e*u.x,r(u.row),a(u.row),u.gold,Math.min(1,u.dn*2)*(u.x<.5?-1:1));let l=e*s.x,c=i*.72,h=Math.min(e,i)*.07;if(s.ball){s.ball.t+=n.dt*1.4;let u=s.ball.t,d=u<1?u:2-u;if(l=e*s.ball.x,c=i*(.74-d*.14),h*=1-d*.35,u>=1&&!s.ball.hit){s.ball.hit=1;let f=0;for(let g of s.pins)!g.dn&&Math.abs(g.x-s.ball.x)<.055&&f<2&&(g.dn=.01,n.score+=g.gold?2:1,f++);he(f?"pop":"whistle")}u>=2&&(s.ball=null)}if(t.strokeStyle="#ddd",t.lineWidth=2,t.beginPath(),t.moveTo(e/2,0),t.lineTo(l,c-h),t.stroke(),Hd(t,l,c,h,n.t),t.fillStyle="rgba(0,0,10,.78)",t.fillRect(0,0,e,i),t.globalCompositeOperation="destination-out",t.fillStyle="rgba(0,0,0,.35)",t.beginPath(),t.ellipse(e*.4,i*.45,e*.1,i*.08,0,0,7),t.ellipse(e*.6,i*.45,e*.1,i*.08,0,0,7),t.fill(),t.globalCompositeOperation="source-over",ct.person(t,e*s.x,i*.95,1.5,n.col,{armsUp:!s.ball}),t.fillStyle="#111",t.fillRect(e*s.x-10,i*.95-64,20,6),s.gt-=n.dt,s.gt<=0&&!n.ended){s.gt=1.4;let u=s.pins.filter(d=>!d.dn).sort((d,f)=>Math.abs(d.x-s.x)-Math.abs(f.x-s.x))[0];if(u){let d=u.x-s.x;s.guide=Math.abs(d)<.03?"\xA1Corre, tira!":d<0?"\xA1Izquierda, izquierda!":"\xA1Derecha, derecha!",Gs(Math.abs(d)<.03?"g_tira":d<0?"g_izq":"g_der")}else s.guide="\xA1Todos abajo!",n.end()}t.fillStyle="#fff",t.beginPath(),t.roundRect(e*.3,64,e*.4,44,14),t.fill(),ct.text(t,"\u{1F3A4} Padrino: "+s.guide,e/2,86,18,"#1f4fc8"),ea(t,20,i-90,90,70,"\u25C0","#ffd21a"),ea(t,120,i-90,90,70,"\u25B6","#ffd21a"),ea(t,e-200,i-90,180,70,s.ball?"\u2026":"TIRAR","#ff7a1a"),n.hud()}});Re({id:"troncos",name:"Los troncos locos",cat:"piscina",unit:"salmones",dur:150,pts:{win:4,lose:2,comWin:2,comLose:1},intro:"h_troncos",how:"Relevos: cruza los 6 troncos que giran, coge un salm\xF3n y tr\xE1elo a la cesta. Toca a los lados para no caerte y SALTA para pasar de tronco. Si caes con el salm\xF3n, lo pierdes.",ai:n=>ai(Zt(3,6)*Ve[n]),start(n){let t=n.s={pos:0,dir:1,fish:!1,tilt:0,vt:0,fall:0,jump:0,runner:1};n.onDown=(e,i)=>{t.fall>0||n.ended||(i>n.H-100&&Math.abs(e-n.W/2)<110?t.jump<=0&&(t.jump=.45):t.vt+=(e<n.W/2?-1:1)*.55)}},bot(n){let t=n.s;Math.random()<.22&&(t.vt+=(t.tilt>0?-1:1)*.55),Math.abs(t.tilt)<.3&&t.jump<=0&&Math.random()<.05&&(t.jump=.45)},frame(n){let{c:t,W:e,H:i}=n,s=n.s;gl(t,e,i);let r=i*.66;ct.water(t,0,r,e,i-r,n.t);let a=h=>e*(.08+h*.84/7);t.fillStyle="#ddd",t.fillRect(a(0)-30,r-70,10,90),t.fillRect(a(0)+20,r-70,10,90);for(let h=0;h<5;h++)t.fillRect(a(0)-30,r-60+h*18,60,5);t.fillStyle="#8a5a2a",t.fillRect(a(0)-50,r-104,50,30),ct.text(t,"\u{1F41F}\xD7"+n.score,a(0)-25,r-120,16),t.fillStyle="#e2321e",t.fillRect(a(7)-24,r-40,48,40),ct.text(t,"\u{1F41F}",a(7),r-52,22);for(let h=1;h<=6;h++){let u=a(h);t.fillStyle="#8a5a2a",t.beginPath(),t.roundRect(u-34,r-14,68,26,13),t.fill(),t.fillStyle="#ffd21a",t.fillRect(u-34,r-14,8,26),t.fillRect(u+26,r-14,8,26),t.strokeStyle="#5a3a1a",t.lineWidth=2;for(let d=0;d<3;d++){let f=u-20+((d*14+n.t*60*(h%2?1:-1))%42+42)%42;t.beginPath(),t.moveTo(f,r-12),t.lineTo(f,r+10),t.stroke()}}s.fall>0?(s.fall-=n.dt,s.fall<=0&&(s.pos=0,s.dir=1,s.tilt=s.vt=0,s.runner++)):n.ended||(s.pos>0&&s.pos<7?(s.vt+=(Math.sin(n.t*1.9)*.8+Math.sin(n.t*3.3)*.5+s.tilt*2.2)*n.dt,s.vt*=.97,s.tilt+=s.vt*n.dt):(s.tilt*=.9,s.vt=0),Math.abs(s.tilt)>1&&(s.fall=1.6,s.fish&&(s.fish=!1),he("pop")),s.jump>0&&(s.jump-=n.dt,s.jump<=0&&(s.pos+=s.dir,s.tilt*=.5,s.pos>=7&&(s.pos=7,s.fish=!0,s.dir=-1),s.pos<=0&&s.dir<0&&(s.pos=0,s.fish&&(n.score++,he("brass")),s.fish=!1,s.dir=1,s.runner++))));let o=s.jump>0?(1-s.jump/.45)*s.dir:0,l=a(s.pos+o),c=r-12-(s.jump>0?Math.sin((1-s.jump/.45)*Math.PI)*50:0);s.fall>0?(ct.text(t,"\xA1AL AGUA! \u{1F4A6}",e/2,i*.3,36,"#fff"),ct.text(t,s.fish?"":"Vuelve nadando a la escalera",e/2,i*.38,18)):(ct.person(t,l,c,1.3,n.col,{rot:s.tilt*.9,armsUp:!0}),s.fish&&ct.text(t,"\u{1F41F}",l+22,c-70,26)),ct.person(t,e*.5,r-140,.9,"#111"),ct.text(t,"\xC1RBITRO",e*.5,r-205,11),t.fillStyle="#0006",t.fillRect(e/2-100,i-128,200,12),t.fillStyle=Math.abs(s.tilt)>.7?"#ff5b4b":"#8eff8e",t.fillRect(e/2+s.tilt*100-6,i-132,12,20),ea(t,e/2-100,i-100,200,56,s.dir>0?"SALTA \u279C":"\u2B05 SALTA","#ff7a1a"),ct.text(t,"\u25C0",30,i*.45,44),ct.text(t,"\u25B6",e-30,i*.45,44),n.hud()}});Re({id:"patata",name:"La patata caliente",cat:"saber",unit:"rondas",dur:0,live:!0,shot:"host",how:"El globo se infla sin parar. Teclea un n\xFAmero: el presentador te dir\xE1 \xAB\xA1M\xE1s!\xBB o \xAB\xA1Menos!\xBB. Cuando aciertes, el globo pasa al rival. Pierde quien lo tenga al explotar. 2 rondas.",ai:()=>0,start(n){let t=n.s={round:0,you:0,riv:0,holder:"you",q:null,input:"",msg:"",mt:0,size:0,popAt:0,ai:null,pause:1.2,popped:0,tick:0,used:new Set};t.newQ=()=>{let i;do i=ta[Math.floor(Math.random()*ta.length)];while(t.used.has(i[0])&&t.used.size<ta.length);t.used.add(i[0]),t.q=i,t.input="",t.ai={lo:i[2],hi:i[3],next:Zt(1,1.8)}},t.startRound=()=>{t.size=0,t.popAt=Zt(20,34)/(window.__bot?3:1),t.holder=t.round%2?"riv":"you",t.newQ(),t.popped=0},t.startRound(),t.guess=(i,s)=>{let r=t.q[1];i===r?(t.msg="\xA1Correcto!",Gs("h_correcto"),he("brass"),t.holder=s==="you"?"riv":"you",t.newQ()):(t.msg=(s==="you"?i+": ":"Rival dice "+i+": ")+(i<r?"\xA1M\xC1S!":"\xA1MENOS!"),Gs(i<r?"h_mas":"h_menos"),s==="riv"&&(i<r?t.ai.lo=i+1:t.ai.hi=i-1)),t.mt=1.4};let e=()=>{let i=Math.min(64,n.W*.07),s=n.W-i*3-30,r=n.H*.26,a=[];return"789456123C0\u2713".split("").forEach((o,l)=>a.push([o,s+l%3*(i+6),r+Math.floor(l/3)*(i*.8+6),i,i*.8])),a};t.keys=e,n.onDown=(i,s)=>{if(!(t.holder!=="you"||t.pause>0||n.ended))for(let[r,a,o,l,c]of e())Ji(i,s,[a,o,l,c])&&(he("tap"),r==="C"?t.input=t.input.slice(0,-1):r==="\u2713"?t.input&&(t.guess(+t.input,"you"),t.input=""):t.input.length<5&&(t.input+=r))}},bot(n){let t=n.s;if(t.holder==="you"&&t.pause<=0&&Math.random()<.08){t.bai||(t.bai={lo:t.q[2],hi:t.q[3],q:t.q}),t.bai.q!==t.q&&(t.bai={lo:t.q[2],hi:t.q[3],q:t.q});let e=Math.round((t.bai.lo+t.bai.hi)/2);t.guess(e,"you"),e<t.q[1]?t.bai.lo=e+1:t.bai.hi=e-1}},frame(n){let{c:t,W:e,H:i}=n,s=n.s;if(ct.sky(t,e,i,"#0a1a4a","#22408a"),t.fillStyle="#e8d8b8",t.beginPath(),t.ellipse(e*.38,i*.78,e*.3,i*.08,0,0,7),t.fill(),ct.person(t,e*.16,i*.86,1.6,n.col,{armsUp:s.holder==="you"}),ct.person(t,e*.6,i*.86,1.6,n.rcol,{armsUp:s.holder==="riv"}),ct.text(t,"TU ALCALDE",e*.16,i*.58,14),ct.text(t,"ALCALDE RIVAL",e*.6,i*.58,14),s.pause>0)s.pause-=n.dt;else if(!n.ended&&!s.popped){if(s.size+=n.dt,s.tick-=n.dt,s.tick<=0&&(he("tick"),s.tick=Math.max(.12,.8-s.size/s.popAt*.7)),s.holder==="riv"&&(s.ai.next-=n.dt,s.ai.next<=0)){let r=Math.round(s.ai.lo+(s.ai.hi-s.ai.lo)*Zt(.35,.65));s.guess(r,"riv"),s.ai.next=Zt(1.1,2)/(window.__bot?3:1)}s.size>=s.popAt&&(s.popped=1.6,he("pop"),setTimeout(()=>he("brass"),300),s.holder==="you"?s.riv++:s.you++,n.opts.rivalScore=s.riv,n.score=s.you)}if(s.popped>0)s.popped-=n.dt,ct.text(t,"\u{1F4A5} \xA1PUM!",e*.38,i*.4,60,"#ff5b1a"),ct.text(t,s.holder==="you"?"Ronda para el rival":"\xA1Ronda para ti!",e*.38,i*.52,28),s.popped<=0&&(s.round++,s.round>=2?(n.opts.rivalScore=s.riv,n.end(s.you)):(s.startRound(),s.pause=1.2));else{let r=Math.min(1,s.size/s.popAt),a=26+r*70,o=s.holder==="you"?e*.24:e*.52,l=i*.5-r*30+Math.sin(n.t*20)*r*3;t.fillStyle="#e23a2a",t.beginPath(),t.ellipse(o,l,a,a*1.15,0,0,7),t.fill(),t.fillStyle="#ffffff55",t.beginPath(),t.ellipse(o-a*.35,l-a*.4,a*.2,a*.3,-.5,0,7),t.fill(),t.strokeStyle="#fff",t.beginPath(),t.moveTo(o,l+a*1.15),t.lineTo(o,l+a*1.15+30),t.stroke()}if(s.q&&(t.fillStyle="#ff7a1a",t.beginPath(),t.roundRect(e*.05,i-100,e*.9,44,10),t.fill(),ct.text(t,s.q[0].toUpperCase(),e/2,i-78,Math.min(20,e/48),"#fff")),s.mt>0&&(s.mt-=n.dt,ct.text(t,s.msg,e*.38,i*.2,30,"#ffd21a")),s.holder==="you"&&!s.popped){t.fillStyle="#000a",t.fillRect(e-Math.min(64,e*.07)*3-46,i*.14,Math.min(64,e*.07)*3+40,i*.62),ct.text(t,s.input||"\u2026",e-Math.min(64,e*.07)*1.5-24,i*.2,30,"#fff");for(let[r,a,o,l,c]of s.keys())t.fillStyle=r==="\u2713"?"#2fb84a":r==="C"?"#e23a2a":"#1f6fe0",t.beginPath(),t.roundRect(a,o,l,c,10),t.fill(),ct.text(t,r,a+l/2,o+c/2,24)}else s.popped||ct.text(t,"El rival piensa\u2026",e*.82,i*.3,20);ct.text(t,`Ronda ${Math.min(2,s.round+1)}/2`,e*.82,i*.1,18),n.hud(s.you)}});Re({id:"pegajosos",name:"Los Pegajosos",cat:"fisica",unit:"aciertos",dur:0,live:!0,pts:{tie:3,tieCancelsDorada:!0},shot:"gradas",intro:"h_pegajosos",how:"Suena el gong y tus saltadores se pegan al muro de velcro con una pose. T\xFA eres el adivinador: elige qu\xE9 frase representan. 2 tarjetas por equipo. Empate: 3 puntos para cada uno.",ai:()=>0,start(n){let t=pl.slice().sort(()=>Math.random()-.5),e=n.s={i:0,cards:t,phase:"gong",pt:1.5,you:0,riv:0,sel:-1,opts:[],turn:"you",msg:""};e.setup=()=>{let i=e.cards[e.i],s=pl.filter(r=>r!==i).sort(()=>Math.random()-.5).slice(0,3);e.opts=[i,...s].sort(()=>Math.random()-.5),e.card=i,e.sel=-1,e.phase="gong",e.pt=1.2,he("gong")},e.setup(),n.onDown=(i,s)=>{e.phase!=="guess"||e.turn!=="you"||e.opts.forEach((r,a)=>{let o=[n.W*.55,n.H*.2+a*n.H*.15,n.W*.4,n.H*.12];Ji(i,s,o)&&(e.sel=a,e.phase="res",e.pt=1.6,r===e.card?(e.you++,he("brass"),e.msg="\xA1Acierto!"):(e.msg="Era: "+e.card[0],he("lose")))})}},bot(n){let t=n.s;if(t.phase==="guess"&&t.turn==="you"&&Math.random()<.05){let e=Math.random()<.7?t.opts.indexOf(t.card):0,i=[n.W*.55,n.H*.2+e*n.H*.15];n.onDown(i[0]+5,i[1]+5)}},frame(n){let{c:t,W:e,H:i}=n,s=n.s;gl(t,e,i);let r=e*.05,a=i*.12,o=e*.45,l=i*.6;t.fillStyle="#111",t.fillRect(r,a,o,l),t.strokeStyle="#333",t.lineWidth=1;for(let h=0;h<12;h++)t.beginPath(),t.moveTo(r+h*o/12,a),t.lineTo(r+h*o/12,a+l),t.stroke();for(let h=0;h<8;h++)t.beginPath(),t.moveTo(r,a+h*l/8),t.lineTo(r+o,a+h*l/8),t.stroke();t.fillStyle="#1f4fc8",t.fillRect(r+10,i*.8,o*.35,12),t.fillStyle="#ffd21a",t.fillRect(r+o*.55,i*.8,o*.35,12),s.pt-=n.dt;let c=s.turn==="you"?n.col:n.rcol;if(s.phase==="gong"&&s.pt<=0&&(s.phase="jump",s.pt=1.2),s.phase==="jump"){let h=1-Math.max(0,s.pt)/1.2;ct.person(t,r+o*.3,i*.8-Math.sin(h*Math.PI)*i*.4,1.2,c,{armsUp:!0}),ct.person(t,r+o*.7,i*.8-Math.sin(h*Math.PI)*i*.35,1.2,c,{armsUp:!0}),s.pt<=0&&(s.phase="pose",s.pt=2.5)}if((s.phase==="pose"||s.phase==="guess"||s.phase==="res")&&Xd(t,s.card,r,a,o,l,c,n.t),s.phase==="pose"&&(ct.text(t,"\u23F1 "+Math.ceil(s.pt*12),r+o/2,a-16,20),s.pt<=0&&(s.phase="guess",s.turn==="riv"&&(s.pt=1.4))),s.phase==="guess"&&s.turn==="riv"&&(ct.text(t,"El adivinador rival piensa\u2026",e*.75,i*.4,20),s.pt<=0)){let h=Math.random()<.6;h&&s.riv++,s.msg=h?"El rival acierta":"El rival falla",he(h?"brass":"whistle"),s.phase="res",s.pt=1.6}s.phase==="guess"&&s.turn==="you"&&(ct.text(t,"\u{1F3A7} \xBFQu\xE9 representan?",e*.75,i*.13,20,"#fff"),s.opts.forEach((h,u)=>{let d=i*.2+u*i*.15;t.fillStyle="#1f6fe0",t.strokeStyle="#ffd21a",t.lineWidth=3,t.beginPath(),t.roundRect(e*.55,d,e*.4,i*.12,20),t.fill(),t.stroke(),ct.text(t,h[0],e*.75,d+i*.06,Math.min(20,e/45))})),s.phase==="res"&&(ct.text(t,s.msg,e*.75,i*.45,26,"#ffd21a"),s.pt<=0&&(s.i++,s.turn=s.i%2?"riv":"you",n.opts.rivalScore=s.riv,n.score=s.you,s.i>=4?(n.extra={tie:s.you===s.riv},n.end(s.you)):s.setup())),ct.text(t,`Tarjeta ${Math.min(4,s.i+1)}/4 \xB7 ${s.turn==="you"?"Tu equipo":"Equipo rival"}`,e*.75,i*.9-60,16),n.hud(s.you)}});function Xd(n,t,e,i,s,r,a,o){let l=(u,d,f)=>{n.save(),n.translate(u,d),n.strokeStyle="#fff",n.lineWidth=10,n.lineCap="round";let S=(v,A)=>{n.beginPath(),n.moveTo(...v),n.lineTo(...A),n.stroke()},m=(v,A,_)=>[v[0]+Math.cos(A)*_,v[1]+Math.sin(A)*_],p=[0,0],T=m(p,f.body-Math.PI/2,38*1.4);S(p,T);let L=f.arms;S(T,m(T,L[0],38)),S(T,m(T,L[1],38));let b=f.legs;S(p,m(p,b[0],45.6)),S(p,m(p,b[1],45.6)),n.fillStyle="#fff";let y=m(T,f.body-Math.PI/2,16);n.beginPath(),n.arc(y[0],y[1],14,0,7),n.fill(),n.fillStyle=a,n.font="20px Arial",n.fillText("\u2605",y[0]-7,y[1]-12),n.fillText("\u2605",T[0]-7+(p[0]-T[0])/2,T[1]+8+(p[1]-T[1])/2),n.restore()},[,c,h]=t;l(e+s*.3,i+r*(c.y||.55),c),l(e+s*.7,i+r*(h.y||.55),h)}Re({id:"pinguinos",name:"Ping\xFCinos matem\xE1ticos",cat:"piscina",unit:"ping\xFCinos",dur:0,live:!0,shot:"overview",intro:"h_pinguinos",how:"El presentador lee una cuenta. \xA1L\xE1nzate a la colchoneta con el resultado! Quedan eliminados los que fallan y el \xFAltimo en llegar. Gana el equipo al que le queden ping\xFCinos.",ai:()=>0,start(n){let t=n.s={mine:[1,1,1,1],his:[1,1,1,1],phase:"read",pt:1.2,q:null,mats:[],t0:0,my:null,msg:""};t.newQ=()=>{let e=ai(Zt(8,45)),i=ai(Zt(2,9)),s=Math.random()<.5,r=s?e+i:e-i,a=new Set([r]);for(;a.size<6;)a.add(r+ai(Zt(-6,6))||r+7);t.q=[`${e} ${s?"+":"\u2212"} ${i}`,r],t.mats=[...a].sort(()=>Math.random()-.5),t.my=null,t.phase="read",t.pt=1.4},t.newQ(),n.onDown=(e,i)=>{t.phase!=="go"||t.my||t.mats.forEach((s,r)=>{let a=ml(n,r);Ji(e,i,a)&&(t.my={v:s,t:t.t0},he("tap"))})}},bot(n){let t=n.s;if(t.phase==="go"&&!t.my&&t.t0>Zt(.4,1.2)){let e=Math.random()<.85?t.mats.indexOf(t.q[1]):0,i=ml(n,e);n.onDown(i[0]+5,i[1]+5)}},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i,"#8fd0ff","#c8f2ff"),t.fillStyle="#8ad8f4",t.fillRect(0,i*.3,e,i*.7),s.mats.forEach((a,o)=>{let l=ml(n,o),c=s.phase==="res"&&a===s.q[1];t.fillStyle=c?"#2fb84a":"#1f4fc8",t.beginPath(),t.roundRect(...l,12),t.fill(),ct.text(t,String(a),l[0]+l[2]/2,l[1]+l[3]/2,36,"#fff")});let r=(a,o,l)=>a.forEach((c,h)=>{if(!c)return;let u=l+h*46,d=i*.28;t.fillStyle="#1a2a6a",t.beginPath(),t.ellipse(u,d,16,22,0,0,7),t.fill(),t.fillStyle="#fff",t.beginPath(),t.ellipse(u,d+4,9,14,0,0,7),t.fill(),t.fillStyle=o,t.fillRect(u-16,d-24,32,6),t.fillStyle="#ff8a1a",t.fillRect(u-4,d-14,8,5)});if(r(s.mine,n.col,30),r(s.his,n.rcol,e-30-138),s.pt-=n.dt,s.phase==="read"&&(ct.text(t,s.q[0]+" = ?",e/2,i*.18,44,"#ffd21a"),s.pt<=0&&(s.phase="go",s.t0=0)),s.phase==="go"&&(s.t0+=n.dt,ct.text(t,s.q[0]+" = ?",e/2,i*.18,44,"#ffd21a"),ct.text(t,"\xA1YA!",e/2,i*.1,24,"#fff"),s.my||s.t0>5)){let a=[];s.mine.forEach((u,d)=>{u&&(d===s.mine.findIndex(f=>f)?a.push({team:"m",i:d,ok:s.my&&s.my.v===s.q[1],t:s.my?s.my.t:9}):a.push({team:"m",i:d,ok:Math.random()<.85,t:Zt(.7,2.2)}))}),s.his.forEach((u,d)=>{u&&a.push({team:"h",i:d,ok:Math.random()<(n.level==="dificil"?.9:.82),t:Zt(.6,2)})});let o=a.filter(u=>!u.ok),l=a.filter(u=>u.ok).sort((u,d)=>d.t-u.t);l.length>1&&o.push(l[0]),o.forEach(u=>{(u.team==="m"?s.mine:s.his)[u.i]=0});let c=o.filter(u=>u.team==="m").length,h=o.length-c;s.msg=`Eliminados: ${c} tuyo(s), ${h} rival(es)`,he("whistle"),s.phase="res",s.pt=1.8}if(s.phase==="res"&&(ct.text(t,s.q[0]+" = "+s.q[1],e/2,i*.18,44,"#ffd21a"),ct.text(t,s.msg,e/2,i*.9-50,22),s.pt<=0)){let a=s.mine.filter(Boolean).length,o=s.his.filter(Boolean).length;n.score=a,n.opts.rivalScore=o,!a||!o?n.end(a):s.newQ()}n.hud(s.mine.filter(Boolean).length)}});function ml(n,t){let e=n.W,i=n.H,s=e*.22,r=i*.18;return[e*.11+t%3*e*.27,i*.38+Math.floor(t/3)*i*.24,s,r]}Re({id:"baloncesto",name:"Baloncesto en pa\xF1ales",cat:"fisica",unit:"puntos",icon:"\u{1F3C0}",dur:150,pts:{win:3},shot:"bolera",how:"Coge una pelota del foso, toca muy r\xE1pido para subir la cinta que va hacia atr\xE1s y, arriba, toca cuando la flecha est\xE9 en verde para encestar. La roja vale 2.",ai:n=>ai(Zt(7,13)*Ve[n]),start(n){let t=n.s={y:0,ball:null,aim:0,phase:"pick",msg:"",mt:0,slip:0},e=()=>{t.ball=Math.random()<.18?"red":["yel","blu"][ai(Zt(0,1))],t.phase="run"};e(),t.pick=e,n.bump=()=>{t.phase==="run"&&(t.y=Math.max(0,t.y-.45),t.msg="\xA1La vaquilla te empuja!",t.mt=1.2,Gs("h_caido"))},n.onDown=()=>{n.ended||(t.phase==="run"?t.y+=.045:t.phase==="shoot"&&(Math.abs(Math.sin(t.aim))<.3?(n.score+=t.ball==="red"?2:1,t.msg=t.ball==="red"?"\xA1Canasta roja! +2":"\xA1Canasta! +1",he("brass")):t.msg="\xA1Fuera!",t.mt=1,t.phase="down"))}},bot(n){let t=n.s;t.phase==="run"&&Math.random()<.5&&n.onDown(),t.phase==="shoot"&&Math.abs(Math.sin(t.aim))<.2&&n.onDown()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;t.fillStyle="#7a6a5a",t.fillRect(0,0,e,i);for(let u=0;u<30;u++)t.fillStyle=u%2?"#8a7a68":"#6a5a4a",t.beginPath(),t.arc(u*137%e,u*89%(i*.5),30+u%4*10,0,7),t.fill();let r=e*.2,a=i*.9,o=e*.72,l=i*.3;t.fillStyle="#1f4fc8",t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.lineTo(o,l+30),t.lineTo(r,a+30),t.fill();for(let u=0;u<10;u++){let d=(u/10-n.t*.25%.1*10/10+1)%1;t.fillStyle="#ffd21a";let f=r+(o-r)*d,g=a+(l-a)*d+14;t.beginPath(),t.moveTo(f+10,g-8),t.lineTo(f-8,g),t.lineTo(f+10,g+8),t.fill()}t.fillStyle="#c84a1a",t.beginPath(),t.ellipse(r-40,a+10,70,22,0,0,7),t.fill(),["#ffd21a","#3a8aff","#e23a2a","#ffd21a","#3a8aff"].forEach((u,d)=>{t.fillStyle=u,t.beginPath(),t.arc(r-80+d*20,a,12,0,7),t.fill()}),t.fillStyle="#fff",t.fillRect(o+30,l-120,70,50),t.strokeStyle="#e23a2a",t.lineWidth=5,t.beginPath(),t.ellipse(o+50,l-66,26,7,0,0,7),t.stroke(),s.phase==="run"&&(s.y-=n.dt*.22,s.y<0&&(s.y=0),s.y>=1&&(s.y=1,s.phase="shoot",s.aim=0)),s.phase==="shoot"&&(s.aim+=n.dt*3),s.phase==="down"&&(s.y-=n.dt*1.2,s.y<=0&&(s.y=0,s.pick()));let c=r+(o-r)*s.y,h=a+(l-a)*s.y;ct.person(t,c,h,1.3,n.col,{run:s.phase==="run"?n.t*18:0,armsUp:!!s.ball}),t.fillStyle="#fff",t.beginPath(),t.ellipse(c,h-20,13,8,0,0,7),t.fill(),s.ball&&s.phase!=="down"&&(t.fillStyle={red:"#e23a2a",yel:"#ffd21a",blu:"#3a8aff"}[s.ball],t.beginPath(),t.arc(c,h-90,18,0,7),t.fill()),s.phase==="shoot"?(t.fillStyle="#0008",t.fillRect(e*.3,64,e*.4,26),t.fillStyle="#2fb84a",t.fillRect(e*.5-e*.06,64,e*.12,26),t.fillStyle="#fff",t.fillRect(e*.5+Math.sin(s.aim)*e*.19-3,60,6,34),ct.text(t,"\xA1TIRA EN VERDE!",e/2,110,20,"#ffd21a")):s.phase==="run"&&ct.text(t,"\u{1F446} \xA1TOCA R\xC1PIDO!",e*.5,80,22),s.mt>0&&(s.mt-=n.dt,ct.text(t,s.msg,e/2,i*.45,30,"#ffd21a")),n.hud()}});Re({id:"alicia",name:"Alicia en el pa\xEDs de las caidillas",cat:"fisica",unit:"bolas",icon:"\u{1F535}",dur:150,pts:{win:4,lose:2},shot:"arena",how:"Mant\xE9n pulsado para llenar el cubo de bolitas y suelta para cruzar la plataforma giratoria. \xA1Cuidado con el brazo que gira! Vac\xEDa las bolas en el bol transparente.",ai:n=>ai(Zt(18,32)*Ve[n]),start(n){let t=n.s={x:0,fill:0,balls:0,cross:!1,fall:0,a:0,msg:"",mt:0},e=i=>{t.cross&&t.fall<=0&&(t.fall=1.4,t.balls=Math.floor(t.balls/3),t.msg=i,t.mt=1.4,Gs("h_trompazo"),he("pop"))};n.bump=()=>e("\u{1F498} \xA1La vaquilla enamorada te tira!"),t.spill=e,n.onRelease=()=>{!t.cross&&t.balls>0&&t.fall<=0&&(t.cross=!0)}},bot(n){let t=n.s;n.down=!t.cross&&t.balls<8,!t.cross&&t.balls>=8&&n.onRelease()},frame(n){let{c:t,W:e,H:i}=n,s=n.s;ct.sky(t,e,i,"#ffb0d8","#ffe8f4");let r=e*.5,a=i*.66,o=Math.min(e*.26,i*.3);s.a+=n.dt*1.4,t.save(),t.translate(r,a),t.scale(1,.35);for(let u=0;u<16;u++)t.fillStyle=u%2?"#fff":"#e2321e",t.beginPath(),t.moveTo(0,0),t.arc(0,0,o,s.a+u*Math.PI/8,s.a+(u+1)*Math.PI/8),t.fill();t.restore();let l=s.a*1.3;t.strokeStyle="#e2321e",t.lineWidth=10,t.beginPath(),t.moveTo(r,a-60),t.lineTo(r+Math.cos(l)*o,a-60+Math.sin(l)*o*.35),t.stroke(),t.fillStyle="#fff",t.fillRect(r-6,a-80,12,80);for(let u=0;u<6;u++)t.fillStyle="#e2321e",t.fillRect(r-6,a-80+u*14,12,6);t.fillStyle="#c84aff",t.beginPath(),t.ellipse(e*.08,a,50,16,0,0,7),t.fill();for(let u=0;u<12;u++)t.fillStyle=["#e23a2a","#ffd21a","#3a8aff","#2fb84a"][u%4],t.beginPath(),t.arc(e*.08-36+u%6*14,a-6-Math.floor(u/6)*10,6,0,7),t.fill();t.fillStyle="#ffd21a",t.fillRect(e*.9-18,a-40,36,60),t.strokeStyle="#ffffffcc",t.lineWidth=3,t.beginPath(),t.arc(e*.9,a-70,34,0,Math.PI),t.stroke(),t.fillStyle="#3a8aff88";let c=Math.min(1,n.score/40);if(t.fillRect(e*.9-30,a-70+34*(1-c),60,34*c),s.fall>0&&(s.fall-=n.dt,s.fall<=0&&(s.cross=!1,s.x=0)),!s.cross&&s.fall<=0&&(s.x=0,n.down&&!n.ended&&(s.fill+=n.dt*6,s.balls=Math.min(12,Math.floor(s.fill)))),s.cross&&s.fall<=0){s.x+=n.dt*.3;let u=e*.08+e*.82*s.x,d=r+Math.cos(l)*o;Math.abs(u-r)<o&&Math.abs(Math.sin(l))<.25&&Math.abs(d-u)<30&&s.spill("\xA1Qu\xE9 trompazo!"),s.x>=1&&(n.score+=s.balls,s.balls=0,s.fill=0,s.cross=!1,he("brass"))}let h=e*.08+e*.82*s.x;ct.person(t,h,a,1.4,n.col,{run:s.cross?n.t*14:0,rot:s.fall>0?1.3:0}),t.fillStyle="#fff",t.beginPath(),t.moveTo(h-10,a-50),t.lineTo(h+10,a-50),t.lineTo(h+14,a-20),t.lineTo(h-14,a-20),t.fill(),t.fillStyle=["#e23a2a","#2fb84a"][0],t.fillRect(h+16,a-46,18,20),ct.text(t,String(s.balls),h+25,a-56,14),!s.cross&&s.fall<=0&&ct.text(t,n.down?"Llenando\u2026 suelta para cruzar":"MANT\xC9N para llenar el cubo",e/2,80,22),s.mt>0&&(s.mt-=n.dt,ct.text(t,s.msg,e/2,i*.3,28,"#e2163a")),n.hud()}});var bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wh=0,Kl=1,Xh=2;var Ir=1,lo=2,As=3,Si=0,Xe=1,qe=2,Gn=0,Rs=1,Lr=2,Ql=3,tc=4,qh=5;var Gi=100,Yh=101,Zh=102,$h=103,Jh=104,jh=200,Kh=201,Qh=202,tu=203,ec=204,nc=205,eu=206,nu=207,iu=208,su=209,ru=210,au=211,ou=212,lu=213,cu=214,wa=0,Aa=1,Ra=2,fs=3,Ca=4,Pa=5,Ia=6,La=7,ic=0,hu=1,uu=2,In=0,sc=1,rc=2,ac=3,Dr=4,oc=5,lc=6,cc=7;var hc=300,Ei=301,Vi=302,co=303,ho=304,Nr=306,ps=1e3,On=1001,Da=1002,ke=1003,du=1004;var Ur=1005;var He=1006,uo=1007;var Ti=1008;var on=1009,uc=1010,dc=1011,Cs=1012,fo=1013,Ln=1014,Mn=1015,Dn=1016,po=1017,mo=1018,Ps=1020,fc=35902,pc=35899,mc=1021,gc=1022,Sn=1023,Bn=1026,wi=1027,go=1028,_o=1029,Ai=1030,xo=1031;var yo=1033,Fr=33776,Or=33777,Br=33778,kr=33779,vo=35840,bo=35841,Mo=35842,So=35843,Eo=36196,To=37492,wo=37496,Ao=37488,Ro=37489,zr=37490,Co=37491,Po=37808,Io=37809,Lo=37810,Do=37811,No=37812,Uo=37813,Fo=37814,Oo=37815,Bo=37816,ko=37817,zo=37818,Go=37819,Vo=37820,Ho=37821,Wo=36492,Xo=36494,qo=36495,Yo=36283,Zo=36284,Gr=36285,$o=36286;var Qs=2300,Na=2301,Ea=2302,Gl=2303,Vl=2400,Hl=2401,Wl=2402;var fu=3200;var Jo=0,pu=1,ti="",De="srgb",tr="srgb-linear",er="linear",fe="srgb";var Ta=7680;var mu=519,gu=512,_u=513,xu=514,jo=515,yu=516,vu=517,Ko=518,bu=519,Mu=35044;var _c="300 es",Cn=2e3,ms=2001;function qd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Yd(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function nr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Su(){let n=nr("canvas");return n.style.display="block",n}var ph={},gs=null;function xc(...n){let t="THREE."+n.shift();gs?gs("log",t,...n):console.log(t,...n)}function Eu(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Yt(...n){n=Eu(n);let t="THREE."+n.shift();if(gs)gs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function $t(...n){n=Eu(n);let t="THREE."+n.shift();if(gs)gs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Oi(...n){let t=n.join(" ");t in ph||(ph[t]=!0,Yt(...n))}function Tu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var wu={[wa]:Aa,[Ra]:Ia,[Ca]:La,[fs]:Pa,[Aa]:wa,[Ia]:Ra,[La]:Ca,[Pa]:fs},Pn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mh=1234567,$s=Math.PI/180,_s=180/Math.PI;function Hi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function yc(n,t){return(n%t+t)%t}function Zd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function $d(n,t,e){return n!==t?(e-n)/(t-n):0}function Js(n,t,e){return(1-e)*n+e*t}function Jd(n,t,e,i){return Js(n,t,1-Math.exp(-e*i))}function jd(n,t=1){return t-Math.abs(yc(n,t*2)-t)}function Kd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Qd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function tf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function ef(n,t){return n+Math.random()*(t-n)}function nf(n){return n*(.5-Math.random())}function sf(n){n!==void 0&&(mh=n);let t=mh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rf(n){return n*$s}function af(n){return n*_s}function of(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function lf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function cf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hf(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),f=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*h,o*c);break;default:Yt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function us(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var vc={DEG2RAD:$s,RAD2DEG:_s,generateUUID:Hi,clamp:ne,euclideanModulo:yc,mapLinear:Zd,inverseLerp:$d,lerp:Js,damp:Jd,pingpong:jd,smoothstep:Kd,smootherstep:Qd,randInt:tf,randFloat:ef,randFloatSpread:nf,seededRandom:sf,degToRad:rf,radToDeg:af,isPowerOfTwo:of,ceilPowerOfTwo:lf,floorPowerOfTwo:cf,setQuaternionFromProperEuler:hf,normalize:nn,denormalize:us},wc=class wc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};wc.prototype.isVector2=!0;var _t=wc,mn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],f=r[a+1],g=r[a+2],S=r[a+3];if(u!==S||l!==d||c!==f||h!==g){let m=l*d+c*f+h*g+u*S;m<0&&(d=-d,f=-f,g=-g,S=-S,m=-m);let p=1-o;if(m<.9995){let T=Math.acos(m),L=Math.sin(T);p=Math.sin(p*T)/L,o=Math.sin(o*T)/L,l=l*p+d*o,c=c*p+f*o,h=h*p+g*o,u=u*p+S*o}else{l=l*p+d*o,c=c*p+f*o,h=h*p+g*o,u=u*p+S*o;let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Ac=class Ac{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return _l.copy(this).projectOnVector(t),this.sub(_l)}reflect(t){return this.sub(_l.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ac.prototype.isVector3=!0;var z=Ac,_l=new z,gh=new mn,Rc=class Rc{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],S=s[0],m=s[3],p=s[6],T=s[1],L=s[4],b=s[7],y=s[2],v=s[5],A=s[8];return r[0]=a*S+o*T+l*y,r[3]=a*m+o*L+l*v,r[6]=a*p+o*b+l*A,r[1]=c*S+h*T+u*y,r[4]=c*m+h*L+u*v,r[7]=c*p+h*b+u*A,r[2]=d*S+f*T+g*y,r[5]=d*m+f*L+g*v,r[8]=d*p+f*b+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+i*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/g;return t[0]=u*S,t[1]=(s*c-h*i)*S,t[2]=(o*i-s*a)*S,t[3]=d*S,t[4]=(h*e-s*l)*S,t[5]=(s*r-o*e)*S,t[6]=f*S,t[7]=(i*l-c*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xl.makeScale(t,e)),this}rotate(t){return Oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xl.makeRotation(-t)),this}translate(t,e){return Oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Rc.prototype.isMatrix3=!0;var Jt=Rc,xl=new Jt,_h=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uf(){let n={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===fe&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===fe&&(s.r=ds(s.r),s.g=ds(s.g),s.b=ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[tr]:{primaries:t,whitePoint:i,transfer:er,toXYZ:_h,fromXYZ:xh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:_h,fromXYZ:xh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:De}}}),n}var ae=uf();function Kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ds(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ji,Ua=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ji===void 0&&(ji=nr("canvas")),ji.width=t.width,ji.height=t.height;let s=ji.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ji}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=nr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Kn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Kn(e[i]/255)*255):e[i]=Kn(e[i]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},df=0,xs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=Hi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement!="undefined"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame!="undefined"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yl(s[a].image)):r.push(yl(s[a]))}else r=yl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function yl(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Ua.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}var ff=0,vl=new z,sn=class n extends Pn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=On,s=On,r=He,a=Ti,o=Sn,l=on,c=n.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=Hi(),this.name="",this.source=new xs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vl).x}get height(){return this.source.getSize(vl).y}get depth(){return this.source.getSize(vl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ps:t.x=t.x-Math.floor(t.x);break;case On:t.x=t.x<0?0:1;break;case Da:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ps:t.y=t.y-Math.floor(t.y);break;case On:t.y=t.y<0?0:1;break;case Da:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=hc;sn.DEFAULT_ANISOTROPY=1;var Cc=class Cc{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let L=(c+1)/2,b=(f+1)/2,y=(p+1)/2,v=(h+d)/4,A=(u+S)/4,_=(g+m)/4;return L>b&&L>y?L<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(L),s=v/i,r=A/i):b>y?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=v/s,r=_/s):y<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),i=A/r,s=_/r),this.set(i,s,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-S)*(u-S)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-S)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Cc.prototype.isVector4=!0;var Se=Cc,Fa=class extends Pn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new sn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:He,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new xs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},rn=class extends Fa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ir=class extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Oa=class extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var oo=class oo{constructor(t,e,i,s,r,a,o,l,c,h,u,d,f,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,d,f,g,S,m)}set(t,e,i,s,r,a,o,l,c,h,u,d,f,g,S,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oo().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/Ki.setFromMatrixColumn(t,0).length(),r=1/Ki.setFromMatrixColumn(t,1).length(),a=1/Ki.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,g=o*h,S=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-S*c,e[9]=-o*l,e[2]=S-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,g=c*h,S=c*u;e[0]=d+S*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=S+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,g=c*h,S=c*u;e[0]=d-S*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=S-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,g=o*h,S=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+S,e[1]=l*u,e[5]=S*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,g=o*l,S=o*c;e[0]=l*h,e[4]=S-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-S*u}else if(t.order==="XZY"){let d=a*l,f=a*c,g=o*l,S=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+S,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=S*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pf,t,mf)}lookAt(t,e,i){let s=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),oi.crossVectors(i,un),oi.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),oi.crossVectors(i,un)),oi.normalize(),na.crossVectors(un,oi),s[0]=oi.x,s[4]=na.x,s[8]=un.x,s[1]=oi.y,s[5]=na.y,s[9]=un.y,s[2]=oi.z,s[6]=na.z,s[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],S=i[6],m=i[10],p=i[14],T=i[3],L=i[7],b=i[11],y=i[15],v=s[0],A=s[4],_=s[8],w=s[12],C=s[1],B=s[5],N=s[9],G=s[13],F=s[2],U=s[6],$=s[10],W=s[14],O=s[3],P=s[7],I=s[11],X=s[15];return r[0]=a*v+o*C+l*F+c*O,r[4]=a*A+o*B+l*U+c*P,r[8]=a*_+o*N+l*$+c*I,r[12]=a*w+o*G+l*W+c*X,r[1]=h*v+u*C+d*F+f*O,r[5]=h*A+u*B+d*U+f*P,r[9]=h*_+u*N+d*$+f*I,r[13]=h*w+u*G+d*W+f*X,r[2]=g*v+S*C+m*F+p*O,r[6]=g*A+S*B+m*U+p*P,r[10]=g*_+S*N+m*$+p*I,r[14]=g*w+S*G+m*W+p*X,r[3]=T*v+L*C+b*F+y*O,r[7]=T*A+L*B+b*U+y*P,r[11]=T*_+L*N+b*$+y*I,r[15]=T*w+L*G+b*W+y*X,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],S=t[7],m=t[11],p=t[15],T=l*f-c*d,L=o*f-c*u,b=o*d-l*u,y=a*f-c*h,v=a*d-l*h,A=a*u-o*h;return e*(S*T-m*L+p*b)-i*(g*T-m*y+p*v)+s*(g*L-S*y+p*A)-r*(g*b-S*v+m*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],S=t[13],m=t[14],p=t[15],T=e*o-i*a,L=e*l-s*a,b=e*c-r*a,y=i*l-s*o,v=i*c-r*o,A=s*c-r*l,_=h*S-u*g,w=h*m-d*g,C=h*p-f*g,B=u*m-d*S,N=u*p-f*S,G=d*p-f*m,F=T*G-L*N+b*B+y*C-v*w+A*_;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/F;return t[0]=(o*G-l*N+c*B)*U,t[1]=(s*N-i*G-r*B)*U,t[2]=(S*A-m*v+p*y)*U,t[3]=(d*v-u*A-f*y)*U,t[4]=(l*C-a*G-c*w)*U,t[5]=(e*G-s*C+r*w)*U,t[6]=(m*b-g*A-p*L)*U,t[7]=(h*A-d*b+f*L)*U,t[8]=(a*N-o*C+c*_)*U,t[9]=(i*C-e*N-r*_)*U,t[10]=(g*v-S*b+p*T)*U,t[11]=(u*b-h*v-f*T)*U,t[12]=(o*w-a*B-l*_)*U,t[13]=(e*B-i*w+s*_)*U,t[14]=(S*L-g*y-m*T)*U,t[15]=(h*y-u*L+d*T)*U,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,S=a*h,m=a*u,p=o*u,T=l*c,L=l*h,b=l*u,y=i.x,v=i.y,A=i.z;return s[0]=(1-(S+p))*y,s[1]=(f+b)*y,s[2]=(g-L)*y,s[3]=0,s[4]=(f-b)*v,s[5]=(1-(d+p))*v,s[6]=(m+T)*v,s[7]=0,s[8]=(g+L)*A,s[9]=(m-T)*A,s[10]=(1-(d+S))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Ki.set(s[0],s[1],s[2]).length(),o=Ki.set(s[4],s[5],s[6]).length(),l=Ki.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wn.copy(this);let c=1/a,h=1/o,u=1/l;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=u,wn.elements[9]*=u,wn.elements[10]*=u,e.setFromRotationMatrix(wn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=Cn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),f=(i+s)/(i-s),g,S;if(l)g=r/(a-r),S=a*r/(a-r);else if(o===Cn)g=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===ms)g=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Cn,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-s),d=-(e+t)/(e-t),f=-(i+s)/(i-s),g,S;if(l)g=1/(a-r),S=a/(a-r);else if(o===Cn)g=-2/(a-r),S=-(a+r)/(a-r);else if(o===ms)g=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};oo.prototype.isMatrix4=!0;var _e=oo,Ki=new z,wn=new _e,pf=new z(0,0,0),mf=new z(1,1,1),oi=new z,na=new z,un=new z,yh=new _e,vh=new mn,Qn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return yh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vh.setFromEuler(this),this.setFromQuaternion(vh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var sr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},gf=0,bh=new z,Qi=new mn,Yn=new _e,ia=new z,Vs=new z,_f=new z,xf=new mn,Mh=new z(1,0,0),Sh=new z(0,1,0),Eh=new z(0,0,1),Th={type:"added"},yf={type:"removed"},ts={type:"childadded",child:null},bl={type:"childremoved",child:null},Te=class n extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=Hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new z,e=new Qn,i=new mn,s=new z(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new Jt}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(Mh,t)}rotateY(t){return this.rotateOnAxis(Sh,t)}rotateZ(t){return this.rotateOnAxis(Eh,t)}translateOnAxis(t,e){return bh.copy(t).applyQuaternion(this.quaternion),this.position.add(bh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Mh,t)}translateY(t){return this.translateOnAxis(Sh,t)}translateZ(t){return this.translateOnAxis(Eh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ia.copy(t):ia.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Vs,ia,this.up):Yn.lookAt(ia,Vs,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Yn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?($t("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Th),ts.child=t,this.dispatchEvent(ts),ts.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yf),bl.child=t,this.dispatchEvent(bl),bl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Th),ts.child=t,this.dispatchEvent(ts),ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,t,_f),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,xf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Te.DEFAULT_UP=new z(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var le=class extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}},vf={type:"move"},ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let S of t.hand.values()){let m=e.getJointPose(S,i),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new le;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},sa={h:0,s:0,l:0};function Ml(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Kt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=yc(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Ml(a,r,t+1/3),this.g=Ml(a,r,t),this.b=Ml(a,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=De){function i(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){let i=Au[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return ae.workingToColorSpace($e.copy(this),t),Math.round(ne($e.r*255,0,255))*65536+Math.round(ne($e.g*255,0,255))*256+Math.round(ne($e.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace($e.copy(this),e);let i=$e.r,s=$e.g,r=$e.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=De){ae.workingToColorSpace($e.copy(this),t);let e=$e.r,i=$e.g,s=$e.b;return t!==De?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(sa);let i=Js(li.h,sa.h,e),s=Js(li.s,sa.s,e),r=Js(li.l,sa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$e=new Kt;Kt.NAMES=Au;var rr=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Kt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ar=class extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},An=new z,Zn=new z,Sl=new z,$n=new z,es=new z,ns=new z,wh=new z,El=new z,Tl=new z,wl=new z,Al=new Se,Rl=new Se,Cl=new Se,di=class n{constructor(t=new z,e=new z,i=new z){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),An.subVectors(t,e),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){An.subVectors(s,e),Zn.subVectors(i,e),Sl.subVectors(t,e);let a=An.dot(An),o=An.dot(Zn),l=An.dot(Sl),c=Zn.dot(Zn),h=Zn.dot(Sl),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Al.setScalar(0),Rl.setScalar(0),Cl.setScalar(0),Al.fromBufferAttribute(t,e),Rl.fromBufferAttribute(t,i),Cl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Al,r.x),a.addScaledVector(Rl,r.y),a.addScaledVector(Cl,r.z),a}static isFrontFacing(t,e,i,s){return An.subVectors(i,e),Zn.subVectors(t,e),An.cross(Zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),An.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;es.subVectors(s,i),ns.subVectors(r,i),El.subVectors(t,i);let l=es.dot(El),c=ns.dot(El);if(l<=0&&c<=0)return e.copy(i);Tl.subVectors(t,s);let h=es.dot(Tl),u=ns.dot(Tl);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(es,a);wl.subVectors(t,r);let f=es.dot(wl),g=ns.dot(wl);if(g>=0&&f<=g)return e.copy(r);let S=f*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(ns,o);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return wh.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(wh,o);let p=1/(m+S+d);return a=S*p,o=d*p,e.copy(i).addScaledVector(es,a).addScaledVector(ns,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},kn=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Rn):Rn.fromBufferAttribute(r,a),Rn.applyMatrix4(t.matrixWorld),this.expandByPoint(Rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ra.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ra.copy(i.boundingBox)),ra.applyMatrix4(t.matrixWorld),this.union(ra)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Rn),Rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hs),aa.subVectors(this.max,Hs),is.subVectors(t.a,Hs),ss.subVectors(t.b,Hs),rs.subVectors(t.c,Hs),ci.subVectors(ss,is),hi.subVectors(rs,ss),Li.subVectors(is,rs);let e=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Li.z,Li.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Li.z,0,-Li.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Li.y,Li.x,0];return!Pl(e,is,ss,rs,aa)||(e=[1,0,0,0,1,0,0,0,1],!Pl(e,is,ss,rs,aa))?!1:(oa.crossVectors(ci,hi),e=[oa.x,oa.y,oa.z],Pl(e,is,ss,rs,aa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Jn=[new z,new z,new z,new z,new z,new z,new z,new z],Rn=new z,ra=new kn,is=new z,ss=new z,rs=new z,ci=new z,hi=new z,Li=new z,Hs=new z,aa=new z,oa=new z,Di=new z;function Pl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Di.fromArray(n,r);let o=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),l=t.dot(Di),c=e.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Pe=new z,la=new _t,bf=0,pn=class extends Pn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Mu,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)la.fromBufferAttribute(this,e),la.applyMatrix3(t),this.setXY(e,la.x,la.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=us(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=nn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=us(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=us(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=us(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var or=class extends pn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var lr=class extends pn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ce=class extends pn{constructor(t,e,i){super(new Float32Array(t),e,i)}},Mf=new kn,Ws=new z,Il=new z,fi=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Mf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ws.subVectors(t,this.center);let e=Ws.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ws,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ws.copy(t.center).add(Il)),this.expandByPoint(Ws.copy(t.center).sub(Il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sf=0,bn=new _e,Ll=new Te,as=new z,dn=new kn,Xs=new kn,Be=new z,We=class n extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qd(t)?lr:or)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,i){return bn.makeTranslation(t,e,i),this.applyMatrix4(bn),this}scale(t,e,i){return bn.makeScale(t,e,i),this.applyMatrix4(bn),this}lookAt(t){return Ll.lookAt(t),Ll.updateMatrix(),this.applyMatrix4(Ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(as).negate(),this.translate(as.x,as.y,as.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ce(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let i=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(dn.min,Xs.min),dn.expandByPoint(Be),Be.addVectors(dn.max,Xs.max),dn.expandByPoint(Be)):(dn.expandByPoint(Xs.min),dn.expandByPoint(Xs.max))}dn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(as.fromBufferAttribute(t,c),Be.add(as)),s=Math.max(s,i.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new z,l[_]=new z;let c=new z,h=new z,u=new z,d=new _t,f=new _t,g=new _t,S=new z,m=new z;function p(_,w,C){c.fromBufferAttribute(i,_),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,C),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,C),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let B=1/(f.x*g.y-g.x*f.y);isFinite(B)&&(S.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(B),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(B),o[_].add(S),o[w].add(S),o[C].add(S),l[_].add(m),l[w].add(m),l[C].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let _=0,w=T.length;_<w;++_){let C=T[_],B=C.start,N=C.count;for(let G=B,F=B+N;G<F;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let L=new z,b=new z,y=new z,v=new z;function A(_){y.fromBufferAttribute(s,_),v.copy(y);let w=o[_];L.copy(w),L.sub(y.multiplyScalar(y.dot(w))).normalize(),b.crossVectors(v,w);let B=b.dot(l[_])<0?-1:1;a.setXYZW(_,L.x,L.y,L.z,B)}for(let _=0,w=T.length;_<w;++_){let C=T[_],B=C.start,N=C.count;for(let G=B,F=B+N;G<F;G+=3)A(t.getX(G+0)),A(t.getX(G+1)),A(t.getX(G+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new z,r=new z,a=new z,o=new z,l=new z,c=new z,h=new z,u=new z;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),S=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?f=l[S]*o.data.stride+o.offset:f=l[S]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new pn(d,h,u)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Dl=new z,Ef=new z,Tf=new Jt,fn=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Dl.subVectors(i,e).cross(Ef.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Dl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Tf.getNormalMatrix(t),s=this.coplanarPoint(Dl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},wf=0,pi=class extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=Hi(),this.name="",this.type="Material",this.blending=Rs,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ec,this.blendDst=nc,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ta,this.stencilZFail=Ta,this.stencilZPass=Ta,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new fn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _t().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var jn=new z,Nl=new z,ca=new z,ha=new z,vs=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(jn.copy(this.origin).addScaledVector(this.direction,e),jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Nl.copy(t).add(e).multiplyScalar(.5),ca.copy(e).sub(t).normalize(),ha.copy(this.origin).sub(Nl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ca),o=ha.dot(this.direction),l=-ha.dot(ca),c=ha.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let S=1/h;u*=S,d*=S,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Nl).addScaledVector(ca,d),f}intersectSphere(t,e){if(t.radius<0)return null;jn.subVectors(t.center,this.origin);let i=jn.dot(this.direction),s=jn.dot(jn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,jn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,d=t.y-a.y,f=t.z-a.z,g=e.x-a.x,S=e.y-a.y,m=e.z-a.z,p=i.x-a.x,T=i.y-a.y,L=i.z-a.z,b=Math.abs(l),y=Math.abs(c),v=Math.abs(h),A,_,w,C,B,N,G,F,U,$,W,O;if(b>=y&&b>=v?(w=l,N=u,U=g,O=p,l>=0?(A=c,_=h,C=d,B=f,G=S,F=m,$=T,W=L):(A=h,_=c,C=f,B=d,G=m,F=S,$=L,W=T)):y>=v?(w=c,N=d,U=S,O=T,c>=0?(A=h,_=l,C=f,B=u,G=m,F=g,$=L,W=p):(A=l,_=h,C=u,B=f,G=g,F=m,$=p,W=L)):(w=h,N=f,U=m,O=L,h>=0?(A=l,_=c,C=u,B=d,G=g,F=S,$=p,W=T):(A=c,_=l,C=d,B=u,G=S,F=g,$=T,W=p)),w===0)return null;let P=A/w,I=_/w,X=1/w,at=C-P*N,et=B-I*N,vt=G-P*U,Tt=F-I*U,Ht=$-P*O,Q=W-I*O,ot=Ht*Tt-Q*vt,bt=at*Q-et*Ht,Pt=vt*et-Tt*at;if(s){if(ot<0||bt<0||Pt<0)return null}else if((ot<0||bt<0||Pt<0)&&(ot>0||bt>0||Pt>0))return null;let wt=ot+bt+Pt;if(wt===0)return null;let Gt=X*(ot*N+bt*U+Pt*O);return(wt>0?Gt<0:Gt>0)?null:this.at(Gt/wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ie=class extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ah=new _e,Ni=new vs,ua=new fi,Rh=new z,da=new z,fa=new z,pa=new z,Ul=new z,ma=new z,Ch=new z,ga=new z,ze=class extends Te{constructor(t=new We,e=new Ie){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ma.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Ul.fromBufferAttribute(u,t),a?ma.addScaledVector(Ul,h):ma.addScaledVector(Ul.sub(e),h))}e.add(ma)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ua.copy(i.boundingSphere),ua.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(ua.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(ua,Rh)===null||Ni.origin.distanceToSquared(Rh)>(t.far-t.near)**2))&&(Ah.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(Ah),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,S=d.length;g<S;g++){let m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),L=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=T,y=L;b<y;b+=3){let v=o.getX(b),A=o.getX(b+1),_=o.getX(b+2);s=_a(this,p,t,i,c,h,u,v,A,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),S=Math.min(o.count,f.start+f.count);for(let m=g,p=S;m<p;m+=3){let T=o.getX(m),L=o.getX(m+1),b=o.getX(m+2);s=_a(this,a,t,i,c,h,u,T,L,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,S=d.length;g<S;g++){let m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),L=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=T,y=L;b<y;b+=3){let v=b,A=b+1,_=b+2;s=_a(this,p,t,i,c,h,u,v,A,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let m=g,p=S;m<p;m+=3){let T=m,L=m+1,b=m+2;s=_a(this,a,t,i,c,h,u,T,L,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Af(n,t,e,i,s,r,a,o){let l;if(t.side===Xe?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Si,o),l===null)return null;ga.copy(o),ga.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ga);return c<e.near||c>e.far?null:{distance:c,point:ga.clone(),object:n}}function _a(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,da),n.getVertexPosition(l,fa),n.getVertexPosition(c,pa);let h=Af(n,t,e,i,da,fa,pa,Ch);if(h){let u=new z;di.getBarycoord(Ch,da,fa,pa,u),s&&(h.uv=di.getInterpolatedAttribute(s,o,l,c,u,new _t)),r&&(h.uv1=di.getInterpolatedAttribute(r,o,l,c,u,new _t)),a&&(h.normal=di.getInterpolatedAttribute(a,o,l,c,u,new z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new z,materialIndex:0};di.getNormal(da,fa,pa,d.normal),h.face=d,h.barycoord=u}return h}var cr=class extends sn{constructor(t=null,e=1,i=1,s,r,a,o,l,c=ke,h=ke,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hr=class extends pn{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},os=new _e,Ph=new _e,xa=[],Ih=new kn,Rf=new _e,qs=new ze,Ys=new fi,zn=class extends ze{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new hr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Rf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new kn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,os),Ih.copy(t.boundingBox).applyMatrix4(os),this.boundingBox.union(Ih)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,os),Ys.copy(t.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(qs.geometry=this.geometry,qs.material=this.material,qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ys.copy(this.boundingSphere),Ys.applyMatrix4(i),t.ray.intersectsSphere(Ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),Ph.multiplyMatrices(i,os),qs.matrixWorld=Ph,qs.raycast(t,xa);for(let a=0,o=xa.length;a<o;a++){let l=xa[a];l.instanceId=r,l.object=this,e.push(l)}xa.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new hr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new cr(new Float32Array(s*this.count),s,this.count,go,Mn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ui=new fi,Cf=new _t(.5,.5),ya=new z,bs=class{constructor(t=new fn,e=new fn,i=new fn,s=new fn,r=new fn,a=new fn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Cn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],S=r[9],m=r[10],p=r[11],T=r[12],L=r[13],b=r[14],y=r[15];if(s[0].setComponents(c-a,f-h,p-g,y-T).normalize(),s[1].setComponents(c+a,f+h,p+g,y+T).normalize(),s[2].setComponents(c+o,f+u,p+S,y+L).normalize(),s[3].setComponents(c-o,f-u,p-S,y-L).normalize(),i)s[4].setComponents(l,d,m,b).normalize(),s[5].setComponents(c-l,f-d,p-m,y-b).normalize();else if(s[4].setComponents(c-l,f-d,p-m,y-b).normalize(),e===Cn)s[5].setComponents(c+l,f+d,p+m,y+b).normalize();else if(e===ms)s[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(t){Ui.center.set(0,0,0);let e=Cf.distanceTo(t.center);return Ui.radius=.7071067811865476+e,Ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ya.x=s.normal.x>0?t.max.x:t.min.x,ya.y=s.normal.y>0?t.max.y:t.min.y,ya.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ya)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ur=class extends sn{constructor(t=[],e=Ei,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},mi=class extends sn{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var gi=class extends sn{constructor(t,e,i=Ln,s,r,a,o=ke,l=ke,c,h=Bn,u=1){if(h!==Bn&&h!==wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new xs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ba=class extends gi{constructor(t,e=Ln,i=Ei,s,r,a=ke,o=ke,l,c=Bn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},dr=class extends sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Qt=class n extends We{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function g(S,m,p,T,L,b,y,v,A,_,w){let C=b/A,B=y/_,N=b/2,G=y/2,F=v/2,U=A+1,$=_+1,W=0,O=0,P=new z;for(let I=0;I<$;I++){let X=I*B-G;for(let at=0;at<U;at++){let et=at*C-N;P[S]=et*T,P[m]=X*L,P[p]=F,c.push(P.x,P.y,P.z),P[S]=0,P[m]=0,P[p]=v>0?1:-1,h.push(P.x,P.y,P.z),u.push(at/A),u.push(1-I/_),W+=1}}for(let I=0;I<_;I++)for(let X=0;X<A;X++){let at=d+X+U*I,et=d+X+U*(I+1),vt=d+(X+1)+U*(I+1),Tt=d+(X+1)+U*I;l.push(at,et,Tt),l.push(et,vt,Tt),O+=6}o.addGroup(f,O,w),f+=O,d+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Bi=class n extends We{constructor(t=1,e=1,i=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:i,radialSegments:s,heightSegments:r},e=Math.max(0,e),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,g=i*2+r,S=s+1,m=new z,p=new z;for(let T=0;T<=g;T++){let L=0,b=0,y=0,v=0;if(T<=i){let w=T/i,C=w*Math.PI/2;b=-h-t*Math.cos(C),y=t*Math.sin(C),v=-t*Math.cos(C),L=w*u}else if(T<=i+r){let w=(T-i)/r;b=-h+w*e,y=t,v=0,L=u+w*d}else{let w=(T-i-r)/i,C=w*Math.PI/2;b=h+t*Math.sin(C),y=t*Math.cos(C),v=t*Math.sin(C),L=u+d+w*u}let A=Math.max(0,Math.min(1,L/f)),_=0;T===0?_=.5/s:T===g&&(_=-.5/s);for(let w=0;w<=s;w++){let C=w/s,B=C*Math.PI*2,N=Math.sin(B),G=Math.cos(B);p.x=-y*G,p.y=b,p.z=y*N,o.push(p.x,p.y,p.z),m.set(-y*G,v,y*N),m.normalize(),l.push(m.x,m.y,m.z),c.push(C+_,A)}if(T>0){let w=(T-1)*S;for(let C=0;C<s;C++){let B=w+C,N=w+C+1,G=T*S+C,F=T*S+C+1;a.push(B,N,G),a.push(N,F,G)}}}this.setIndex(a),this.setAttribute("position",new ce(o,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},ki=class n extends We{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new z,h=new _t;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=i+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(o,3)),this.setAttribute("uv",new ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ve=class n extends We{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,S=[],m=i/2,p=0;T(),a===!1&&(t>0&&L(!0),e>0&&L(!1)),this.setIndex(h),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(d,3)),this.setAttribute("uv",new ce(f,2));function T(){let b=new z,y=new z,v=0,A=(e-t)/i;for(let _=0;_<=r;_++){let w=[],C=_/r,B=C*(e-t)+t;for(let N=0;N<=s;N++){let G=N/s,F=G*l+o,U=Math.sin(F),$=Math.cos(F);y.x=B*U,y.y=-C*i+m,y.z=B*$,u.push(y.x,y.y,y.z),b.set(U,A,$).normalize(),d.push(b.x,b.y,b.z),f.push(G,1-C),w.push(g++)}S.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){let C=S[w][_],B=S[w+1][_],N=S[w+1][_+1],G=S[w][_+1];(t>0||w!==0)&&(h.push(C,B,G),v+=3),(e>0||w!==r-1)&&(h.push(B,N,G),v+=3)}c.addGroup(p,v,0),p+=v}function L(b){let y=g,v=new _t,A=new z,_=0,w=b===!0?t:e,C=b===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*C,0),d.push(0,C,0),f.push(.5,.5),g++;let B=g;for(let N=0;N<=s;N++){let F=N/s*l+o,U=Math.cos(F),$=Math.sin(F);A.x=w*$,A.y=m*C,A.z=w*U,u.push(A.x,A.y,A.z),d.push(0,C,0),v.x=U*.5+.5,v.y=$*.5*C+.5,f.push(v.x,v.y),g++}for(let N=0;N<s;N++){let G=y+N,F=B+N;b===!0?h.push(F,F+1,G):h.push(F+1,F,G),_+=3}c.addGroup(p,_,b===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},an=class n extends ve{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],d=i[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new _t:new z);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new z,s=[],r=[],a=[],o=new z,l=new _e;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new z)}r[0]=new z,a[0]=new z;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ne(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ne(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ms=class extends gn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new _t){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ka=class extends Ms{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function bc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Lh=new z,Dh=new z,Fl=new bc,Ol=new bc,Bl=new bc,za=class extends gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new z){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Dh.subVectors(s[0],s[1]).add(s[0]),c=Dh);let u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Lh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Lh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),S=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);S<1e-4&&(S=1),g<1e-4&&(g=S),m<1e-4&&(m=S),Fl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,S,m),Ol.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,S,m),Bl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,S,m)}else this.curveType==="catmullrom"&&(Fl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Ol.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Bl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Fl.calc(l),Ol.calc(l),Bl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Nh(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function Pf(n,t){let e=1-n;return e*e*t}function If(n,t){return 2*(1-n)*n*t}function Lf(n,t){return n*n*t}function js(n,t,e,i){return Pf(n,t)+If(n,e)+Lf(n,i)}function Df(n,t){let e=1-n;return e*e*e*t}function Nf(n,t){let e=1-n;return 3*e*e*n*t}function Uf(n,t){return 3*(1-n)*n*n*t}function Ff(n,t){return n*n*n*t}function Ks(n,t,e,i,s){return Df(n,t)+Nf(n,e)+Uf(n,i)+Ff(n,s)}var fr=class extends gn{constructor(t=new _t,e=new _t,i=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ks(t,s.x,r.x,a.x,o.x),Ks(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ga=class extends gn{constructor(t=new z,e=new z,i=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new z){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ks(t,s.x,r.x,a.x,o.x),Ks(t,s.y,r.y,a.y,o.y),Ks(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pr=class extends gn{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Va=class extends gn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mr=class extends gn{constructor(t=new _t,e=new _t,i=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(js(t,s.x,r.x,a.x),js(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ha=class extends gn{constructor(t=new z,e=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new z){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(js(t,s.x,r.x,a.x),js(t,s.y,r.y,a.y),js(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gr=class extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Nh(o,l.x,c.x,h.x,u.x),Nh(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},Xl=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:za,CubicBezierCurve:fr,CubicBezierCurve3:Ga,EllipseCurve:Ms,LineCurve:pr,LineCurve3:Va,QuadraticBezierCurve:mr,QuadraticBezierCurve3:Ha,SplineCurve:gr}),Wa=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xl[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Xl[s.type]().fromJSON(s))}return this}},_r=class extends Wa{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new pr(this.currentPoint.clone(),new _t(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new mr(this.currentPoint.clone(),new _t(t,e),new _t(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new fr(this.currentPoint.clone(),new _t(t,e),new _t(i,s),new _t(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new gr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new Ms(t,e,i,s,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Ss=class extends _r{constructor(t){super(t),this.uuid=Hi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new _r().fromJSON(s))}return this}};function Of(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Ru(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=Vf(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let h=o,u=l;for(let d=e;d<s;d+=e){let f=n[d],g=n[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return xr(r,a,e,o,l,c,0),a}function Ru(n,t,e,i,s){let r;if(s===Qf(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=Uh(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=Uh(a/i|0,n[a],n[a+1],r);return r&&Es(r,r.next)&&(vr(r),r=r.next),r}function zi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Es(e,e.next)||Ee(e.prev,e,e.next)===0)){if(vr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function xr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Yf(n,i,s,r);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?kf(n,i,s,r):Bf(n)){t.push(l.i,n.i,c.i),vr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=zf(zi(n),t),xr(n,t,e,i,s,r,2)):a===2&&Gf(n,t,e,i,s,r):xr(zi(n),t,e,i,s,r,1);break}}}function Bf(n){let t=n.prev,e=n,i=n.next;if(Ee(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,h=Math.min(s,r,a),u=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Zs(s,o,r,l,a,c,g.x,g.y)&&Ee(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function kf(n,t,e,i){let s=n.prev,r=n,a=n.next;if(Ee(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),S=Math.max(o,l,c),m=Math.max(h,u,d),p=ql(f,g,t,e,i),T=ql(S,m,t,e,i),L=n.prevZ,b=n.nextZ;for(;L&&L.z>=p&&b&&b.z<=T;){if(L.x>=f&&L.x<=S&&L.y>=g&&L.y<=m&&L!==s&&L!==a&&Zs(o,h,l,u,c,d,L.x,L.y)&&Ee(L.prev,L,L.next)>=0||(L=L.prevZ,b.x>=f&&b.x<=S&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&Zs(o,h,l,u,c,d,b.x,b.y)&&Ee(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;L&&L.z>=p;){if(L.x>=f&&L.x<=S&&L.y>=g&&L.y<=m&&L!==s&&L!==a&&Zs(o,h,l,u,c,d,L.x,L.y)&&Ee(L.prev,L,L.next)>=0)return!1;L=L.prevZ}for(;b&&b.z<=T;){if(b.x>=f&&b.x<=S&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&Zs(o,h,l,u,c,d,b.x,b.y)&&Ee(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function zf(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Es(i,s)&&Pu(i,e,e.next,s)&&yr(i,s)&&yr(s,i)&&(t.push(i.i,e.i,s.i),vr(e),vr(e.next),e=n=s),e=e.next}while(e!==n);return zi(e)}function Gf(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Jf(a,o)){let l=Iu(a,o);a=zi(a,a.next),l=zi(l,l.next),xr(a,t,e,i,s,r,0),xr(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Vf(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=Ru(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push($f(c))}s.sort(Hf);for(let r=0;r<s.length;r++)e=Wf(s[r],e);return e}function Hf(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function Wf(n,t){let e=Xf(n,t);if(!e)return t;let i=Iu(e,n);return zi(i,i.next),zi(e,e.next)}function Xf(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Es(n,e))return e;do{if(Es(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Cu(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let u=Math.abs(s-e.y)/(i-e.x);yr(e,n)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&qf(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function qf(n,t){return Ee(n.prev,n,t.prev)<0&&Ee(t.next,n,n.next)<0}function Yf(n,t,e,i){let s=n;do s.z===0&&(s.z=ql(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Zf(s)}function Zf(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function ql(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function $f(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Cu(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Zs(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&Cu(n,t,e,i,s,r,a,o)}function Jf(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!jf(n,t)&&(yr(n,t)&&yr(t,n)&&Kf(n,t)&&(Ee(n.prev,n,t.prev)||Ee(n,t.prev,t))||Es(n,t)&&Ee(n.prev,n,n.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Es(n,t){return n.x===t.x&&n.y===t.y}function Pu(n,t,e,i){let s=ba(Ee(n,t,e)),r=ba(Ee(n,t,i)),a=ba(Ee(e,i,n)),o=ba(Ee(e,i,t));return!!(s!==r&&a!==o||s===0&&va(n,e,t)||r===0&&va(n,i,t)||a===0&&va(e,n,i)||o===0&&va(e,t,i))}function va(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function ba(n){return n>0?1:n<0?-1:0}function jf(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Pu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function yr(n,t){return Ee(n.prev,n,n.next)<0?Ee(n,t,n.next)>=0&&Ee(n,n.prev,t)>=0:Ee(n,t,n.prev)<0||Ee(n,n.next,t)<0}function Kf(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Iu(n,t){let e=Yl(n.i,n.x,n.y),i=Yl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Uh(n,t,e,i){let s=Yl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function vr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Yl(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qf(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Zl=class{static triangulate(t,e,i=2){return Of(t,e,i)}},Fi=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Fh(t),Oh(i,t);let a=t.length;e.forEach(Fh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Oh(i,e[l]);let o=Zl.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Fh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Oh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var br=class n extends We{constructor(t=new Ss([new _t(.5,.5),new _t(-.5,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new ce(s,3)),this.setAttribute("uv",new ce(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,S=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:tp,L,b=!1,y,v,A,_;if(p){L=p.getSpacedPoints(h),b=!0,d=!1;let lt=p.isCatmullRomCurve3?p.closed:!1;y=p.computeFrenetFrames(h,lt),v=new z,A=new z,_=new z}d||(m=0,f=0,g=0,S=0);let w=o.extractPoints(c),C=w.shape,B=w.holes;if(!Fi.isClockWise(C)){C=C.reverse();for(let lt=0,ft=B.length;lt<ft;lt++){let ht=B[lt];Fi.isClockWise(ht)&&(B[lt]=ht.reverse())}}function G(lt){let ht=10000000000000001e-36,mt=lt[0];for(let pt=1;pt<=lt.length;pt++){let Vt=pt%lt.length,kt=lt[Vt],Xt=kt.x-mt.x,qt=kt.y-mt.y,k=Xt*Xt+qt*qt,te=Math.max(Math.abs(kt.x),Math.abs(kt.y),Math.abs(mt.x),Math.abs(mt.y)),ee=ht*te*te;if(k<=ee){lt.splice(Vt,1),pt--;continue}mt=kt}}G(C),B.forEach(G);let F=B.length,U=C;for(let lt=0;lt<F;lt++){let ft=B[lt];C=C.concat(ft)}function $(lt,ft,ht){return ft||$t("ExtrudeGeometry: vec does not exist"),lt.clone().addScaledVector(ft,ht)}let W=C.length;function O(lt,ft,ht){let mt,pt,Vt,kt=lt.x-ft.x,Xt=lt.y-ft.y,qt=ht.x-lt.x,k=ht.y-lt.y,te=kt*kt+Xt*Xt,ee=kt*k-Xt*qt;if(Math.abs(ee)>Number.EPSILON){let R=Math.sqrt(te),x=Math.sqrt(qt*qt+k*k),Z=ft.x-Xt/R,K=ft.y+kt/R,E=ht.x-k/x,Y=ht.y+qt/x,nt=((E-Z)*k-(Y-K)*qt)/(kt*k-Xt*qt);mt=Z+kt*nt-lt.x,pt=K+Xt*nt-lt.y;let V=mt*mt+pt*pt;if(V<=2)return new _t(mt,pt);Vt=Math.sqrt(V/2)}else{let R=!1;kt>Number.EPSILON?qt>Number.EPSILON&&(R=!0):kt<-Number.EPSILON?qt<-Number.EPSILON&&(R=!0):Math.sign(Xt)===Math.sign(k)&&(R=!0),R?(mt=-Xt,pt=kt,Vt=Math.sqrt(te)):(mt=kt,pt=Xt,Vt=Math.sqrt(te/2))}return new _t(mt/Vt,pt/Vt)}let P=[];for(let lt=0,ft=U.length,ht=ft-1,mt=lt+1;lt<ft;lt++,ht++,mt++)ht===ft&&(ht=0),mt===ft&&(mt=0),P[lt]=O(U[lt],U[ht],U[mt]);let I=[],X,at=P.concat();for(let lt=0,ft=F;lt<ft;lt++){let ht=B[lt];X=[];for(let mt=0,pt=ht.length,Vt=pt-1,kt=mt+1;mt<pt;mt++,Vt++,kt++)Vt===pt&&(Vt=0),kt===pt&&(kt=0),X[mt]=O(ht[mt],ht[Vt],ht[kt]);I.push(X),at=at.concat(X)}let et;if(m===0)et=Fi.triangulateShape(U,B);else{let lt=[],ft=[];for(let ht=0;ht<m;ht++){let mt=ht/m,pt=f*Math.cos(mt*Math.PI/2),Vt=g*Math.sin(mt*Math.PI/2)+S;for(let kt=0,Xt=U.length;kt<Xt;kt++){let qt=$(U[kt],P[kt],Vt);bt(qt.x,qt.y,-pt),mt===0&&lt.push(qt)}for(let kt=0,Xt=F;kt<Xt;kt++){let qt=B[kt];X=I[kt];let k=[];for(let te=0,ee=qt.length;te<ee;te++){let R=$(qt[te],X[te],Vt);bt(R.x,R.y,-pt),mt===0&&k.push(R)}mt===0&&ft.push(k)}}et=Fi.triangulateShape(lt,ft)}let vt=et.length,Tt=g+S;for(let lt=0;lt<W;lt++){let ft=d?$(C[lt],at[lt],Tt):C[lt];b?(A.copy(y.normals[0]).multiplyScalar(ft.x),v.copy(y.binormals[0]).multiplyScalar(ft.y),_.copy(L[0]).add(A).add(v),bt(_.x,_.y,_.z)):bt(ft.x,ft.y,0)}for(let lt=1;lt<=h;lt++)for(let ft=0;ft<W;ft++){let ht=d?$(C[ft],at[ft],Tt):C[ft];b?(A.copy(y.normals[lt]).multiplyScalar(ht.x),v.copy(y.binormals[lt]).multiplyScalar(ht.y),_.copy(L[lt]).add(A).add(v),bt(_.x,_.y,_.z)):bt(ht.x,ht.y,u/h*lt)}for(let lt=m-1;lt>=0;lt--){let ft=lt/m,ht=f*Math.cos(ft*Math.PI/2),mt=g*Math.sin(ft*Math.PI/2)+S;for(let pt=0,Vt=U.length;pt<Vt;pt++){let kt=$(U[pt],P[pt],mt);bt(kt.x,kt.y,u+ht)}for(let pt=0,Vt=B.length;pt<Vt;pt++){let kt=B[pt];X=I[pt];for(let Xt=0,qt=kt.length;Xt<qt;Xt++){let k=$(kt[Xt],X[Xt],mt);b?bt(k.x,k.y+L[h-1].y,L[h-1].x+ht):bt(k.x,k.y,u+ht)}}}Ht(),Q();function Ht(){let lt=s.length/3;if(d){let ft=0,ht=W*ft;for(let mt=0;mt<vt;mt++){let pt=et[mt];Pt(pt[2]+ht,pt[1]+ht,pt[0]+ht)}ft=h+m*2,ht=W*ft;for(let mt=0;mt<vt;mt++){let pt=et[mt];Pt(pt[0]+ht,pt[1]+ht,pt[2]+ht)}}else{for(let ft=0;ft<vt;ft++){let ht=et[ft];Pt(ht[2],ht[1],ht[0])}for(let ft=0;ft<vt;ft++){let ht=et[ft];Pt(ht[0]+W*h,ht[1]+W*h,ht[2]+W*h)}}i.addGroup(lt,s.length/3-lt,0)}function Q(){let lt=s.length/3,ft=0;ot(U,ft),ft+=U.length;for(let ht=0,mt=B.length;ht<mt;ht++){let pt=B[ht];ot(pt,ft),ft+=pt.length}i.addGroup(lt,s.length/3-lt,1)}function ot(lt,ft){let ht=lt.length;for(;--ht>=0;){let mt=ht,pt=ht-1;pt<0&&(pt=lt.length-1);for(let Vt=0,kt=h+m*2;Vt<kt;Vt++){let Xt=W*Vt,qt=W*(Vt+1),k=ft+mt+Xt,te=ft+pt+Xt,ee=ft+pt+qt,R=ft+mt+qt;wt(k,te,ee,R)}}}function bt(lt,ft,ht){l.push(lt),l.push(ft),l.push(ht)}function Pt(lt,ft,ht){Gt(lt),Gt(ft),Gt(ht);let mt=s.length/3,pt=T.generateTopUV(i,s,mt-3,mt-2,mt-1);Wt(pt[0]),Wt(pt[1]),Wt(pt[2])}function wt(lt,ft,ht,mt){Gt(lt),Gt(ft),Gt(mt),Gt(ft),Gt(ht),Gt(mt);let pt=s.length/3,Vt=T.generateSideWallUV(i,s,pt-6,pt-3,pt-2,pt-1);Wt(Vt[0]),Wt(Vt[1]),Wt(Vt[3]),Wt(Vt[1]),Wt(Vt[2]),Wt(Vt[3])}function Gt(lt){s.push(l[lt*3+0]),s.push(l[lt*3+1]),s.push(l[lt*3+2])}function Wt(lt){r.push(lt.x),r.push(lt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return ep(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Xl[s.type]().fromJSON(s)),new n(i,t.options)}},tp={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new _t(r,a),new _t(o,l),new _t(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],u=t[i*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],S=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new _t(a,1-l),new _t(c,1-u),new _t(d,1-g),new _t(S,1-p)]:[new _t(o,1-l),new _t(h,1-u),new _t(f,1-g),new _t(m,1-p)]}};function ep(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Mr=class n extends We{constructor(t=[new _t(0,-.5),new _t(.5,0),new _t(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=ne(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,u=new z,d=new _t,f=new z,g=new z,S=new z,m=0,p=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:m=t[T+1].x-t[T].x,p=t[T+1].y-t[T].y,f.x=p*1,f.y=-m,f.z=p*0,S.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(S.x,S.y,S.z);break;default:m=t[T+1].x-t[T].x,p=t[T+1].y-t[T].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=S.x,f.y+=S.y,f.z+=S.z,f.normalize(),l.push(f.x,f.y,f.z),S.copy(g)}for(let T=0;T<=e;T++){let L=i+T*h*s,b=Math.sin(L),y=Math.cos(L);for(let v=0;v<=t.length-1;v++){u.x=t[v].x*b,u.y=t[v].y,u.z=t[v].x*y,a.push(u.x,u.y,u.z),d.x=T/e,d.y=v/(t.length-1),o.push(d.x,d.y);let A=l[3*v+0]*b,_=l[3*v+1],w=l[3*v+0]*y;c.push(A,_,w)}}for(let T=0;T<e;T++)for(let L=0;L<t.length-1;L++){let b=L+T*t.length,y=b,v=b+t.length,A=b+t.length+1,_=b+1;r.push(y,v,_),r.push(A,_,v)}this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("uv",new ce(o,2)),this.setAttribute("normal",new ce(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}};var Ne=class n extends We{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],S=[],m=[];for(let p=0;p<h;p++){let T=p*d-a;for(let L=0;L<c;L++){let b=L*u-r;g.push(b,-T,0),S.push(0,0,1),m.push(L/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){let L=T+c*p,b=T+c*(p+1),y=T+1+c*(p+1),v=T+1+c*p;f.push(L,b,v),f.push(b,y,v)}this.setIndex(f),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(S,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Le=class n extends We{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new z,d=new z,f=[],g=[],S=[],m=[];for(let p=0;p<=i;p++){let T=[],L=p/i,b=a+L*o,y=t*Math.cos(b),v=Math.sqrt(t*t-y*y),A=0;p===0&&a===0?A=.5/e:p===i&&l===Math.PI&&(A=-.5/e);for(let _=0;_<=e;_++){let w=_/e,C=s+w*r;u.x=-v*Math.cos(C),u.y=y,u.z=v*Math.sin(C),g.push(u.x,u.y,u.z),d.copy(u).normalize(),S.push(d.x,d.y,d.z),m.push(w+A,1-L),T.push(c++)}h.push(T)}for(let p=0;p<i;p++)for(let T=0;T<e;T++){let L=h[p][T+1],b=h[p][T],y=h[p+1][T],v=h[p+1][T+1];(p!==0||a>0)&&f.push(L,b,v),(p!==i-1||l<Math.PI)&&f.push(b,y,v)}this.setIndex(f),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(S,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Sr=class n extends We{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new z,f=new z,g=new z;for(let S=0;S<=i;S++){let m=a+S/i*o;for(let p=0;p<=s;p++){let T=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(T),f.y=(t+e*Math.cos(m))*Math.sin(T),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),d.x=t*Math.cos(T),d.y=t*Math.sin(T),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(p/s),u.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){let p=(s+1)*S+m-1,T=(s+1)*(S-1)+m-1,L=(s+1)*(S-1)+m,b=(s+1)*S+m;l.push(p,T,b),l.push(T,L,b)}this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Wi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Bh(s))s.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Bh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function je(n){let t={};for(let e=0;e<n.length;e++){let i=Wi(n[e]);for(let s in i)t[s]=i[s]}return t}function Bh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function np(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Mc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var Lu={clone:Wi,merge:je},ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ip,this.fragmentShader=sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=np(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Kt().setHex(s.value);break;case"v2":this.uniforms[i].value=new _t().fromArray(s.value);break;case"v3":this.uniforms[i].value=new z().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Se().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Jt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new _e().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Xa=class extends _n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_i=class extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jo,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var qa=class extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ya=class extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ls(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function kl(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var xi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Za=class extends xi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vl,endingEnd:Vl}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hl:r=t,o=2*e-i;break;case Wl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Hl:a=t,l=2*i-e;break;case Wl:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),S=g*g,m=S*g,p=-d*m+2*d*S-d*g,T=(1+d)*m+(-1.5-2*d)*S+(-.5+d)*g+1,L=(-1-f)*m+(1.5+f)*S+.5*g,b=f*m-f*S;for(let y=0;y!==o;++y)r[y]=p*a[h+y]+T*a[c+y]+L*a[l+y]+b*a[u+y];return r}},$a=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},Ja=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ja=class extends xi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-e)/(s-e),S=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*S+a[l+m]*g;return r}let d=o*2,f=t-1;for(let g=0;g!==o;++g){let S=a[c+g],m=a[l+g],p=f*d+g*2,T=u[p],L=u[p+1],b=t*d+g*2,y=h[b],v=h[b+1],A=ap(i,e,T,y,s);r[g]=Du(A,S,L,v,m)}return r}};function Du(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function rp(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function ap(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Du(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=rp(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var xn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ls(e,this.TimeBufferType),this.values=ls(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ls(t.times,Array),values:ls(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),kl(t.settings)&&(i.settings={inTangents:ls(t.settings.inTangents,Array),outTangents:ls(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new $a(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ja(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Qs:e=this.InterpolantFactoryMethodDiscrete;break;case Na:e=this.InterpolantFactoryMethodLinear;break;case Ea:e=this.InterpolantFactoryMethodSmooth;break;case Gl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Yt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qs;case this.InterpolantFactoryMethodLinear:return Na;case this.InterpolantFactoryMethodSmooth:return Ea;case this.InterpolantFactoryMethodBezier:return Gl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;kl(this.settings)&&(kh(this.settings.inTangents,t),kh(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&($t("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&($t("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){$t("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){$t("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Yd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){$t("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ea,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let S=e[u+g];if(S!==e[d+g]||S!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,kl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function kh(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Na;var yi=class extends xn{constructor(t,e,i){super(t,e,i)}};yi.prototype.ValueTypeName="bool";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=Qs;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ka=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};Ka.prototype.ValueTypeName="color";var Qa=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};Qa.prototype.ValueTypeName="number";var to=class extends xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)mn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Er=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new to(this.times,this.values,this.getValueSize(),t)}};Er.prototype.ValueTypeName="quaternion";Er.prototype.InterpolantFactoryMethodSmooth=void 0;var vi=class extends xn{constructor(t,e,i){super(t,e,i)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=Qs;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var eo=class extends xn{constructor(t,e,i,s){super(t,e,i,s)}};eo.prototype.ValueTypeName="vector";var no=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Nu=new no,io=class{constructor(t){this.manager=t!==void 0?t:Nu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};io.DEFAULT_MATERIAL_NAME="__DEFAULT";var Tr=class extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},wr=class extends Tr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},zl=new _e,zh=new z,Gh=new z,so=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bs,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;zh.setFromMatrixPosition(t.matrixWorld),e.position.copy(zh),Gh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){zl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(zl,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===ms||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(zl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ma=new z,Sa=new mn,Fn=new z,Ar=class extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ma,Sa,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Fn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ma,Sa,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new z,Vh=new _t,Hh=new _t,Je=class extends Ar{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=_s*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _s*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,Vh,Hh),e.subVectors(Hh,Vh)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan($s*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ts=class extends Ar{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$l=class extends so{constructor(){super(new Ts(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rr=class extends Tr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new $l}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var cs=-90,hs=1,ro=class extends Te{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Je(cs,hs,t,e);s.layers=this.layers,this.add(s);let r=new Je(cs,hs,t,e);r.layers=this.layers,this.add(r);let a=new Je(cs,hs,t,e);a.layers=this.layers,this.add(a);let o=new Je(cs,hs,t,e);o.layers=this.layers,this.add(o);let l=new Je(cs,hs,t,e);l.layers=this.layers,this.add(l);let c=new Je(cs,hs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},ao=class extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Sc="\\[\\]\\.:\\/",op=new RegExp("["+Sc+"]","g"),Ec="[^"+Sc+"]",lp="[^"+Sc.replace("\\.","")+"]",cp=/((?:WC+[\/:])*)/.source.replace("WC",Ec),hp=/(WCOD+)?/.source.replace("WCOD",lp),up=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ec),dp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ec),fp=new RegExp("^"+cp+hp+up+dp+"$"),pp=["material","materials","bones","map"],Jl=class{constructor(t,e,i){let s=i||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(op,"")}static parseTrackName(t){let e=fp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);pp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){$t("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){$t("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){$t("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){$t("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){$t("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){$t("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;$t("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){$t("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=Jl;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qx=new Float32Array(1);var Cr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Yt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},ws=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Pc=class Pc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Pc.prototype.isMatrix2=!0;var jl=Pc;var Pr=class extends Pn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Tc(n,t,e,i){let s=mp(i);switch(e){case mc:return n*t;case go:return n*t/s.components*s.byteLength;case _o:return n*t/s.components*s.byteLength;case Ai:return n*t*2/s.components*s.byteLength;case xo:return n*t*2/s.components*s.byteLength;case gc:return n*t*3/s.components*s.byteLength;case Sn:return n*t*4/s.components*s.byteLength;case yo:return n*t*4/s.components*s.byteLength;case Fr:case Or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Br:case kr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case bo:case So:return Math.max(n,16)*Math.max(t,8)/4;case vo:case Mo:return Math.max(n,8)*Math.max(t,8)/2;case Eo:case To:case Ao:case Ro:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wo:case zr:case Co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Io:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Do:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case No:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ko:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case zo:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Go:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Vo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Wo:case Xo:case qo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Yo:case Zo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Gr:case $o:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function mp(n){switch(n){case on:case uc:return{byteLength:1,components:1};case Cs:case dc:case Dn:return{byteLength:2,components:1};case po:case mo:return{byteLength:2,components:4};case Ln:case fo:case Mn:return{byteLength:4,components:1};case fc:case pc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window!="undefined"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function nd(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function _p(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array!="undefined"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],S=u[f];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++d,u[d]=S)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let S=u[f];n.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yp=`#ifdef USE_ALPHAHASH
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
#endif`,vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ep=`#ifdef USE_AOMAP
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
#endif`,Tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wp=`#ifdef USE_BATCHING
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
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
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
#endif`,Lp=`#ifdef USE_BUMPMAP
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
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Gp=`#define PI 3.141592653589793
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
} // validated`,Vp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hp=`vec3 transformedNormal = objectNormal;
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
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",$p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jp=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kp=`#ifdef USE_ENVMAP
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
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
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
#endif`,em=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rm=`#ifdef USE_GRADIENTMAP
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
}`,am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,hm=`#ifdef USE_ENVMAP
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
#endif`,um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mm=`PhysicalMaterial material;
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
#endif`,gm=`uniform sampler2D dfgLUT;
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
}`,_m=`
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
#endif`,xm=`#if defined( RE_IndirectDiffuse )
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
#endif`,ym=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Am=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rm=`#if defined( USE_POINTS_UV )
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
#endif`,Cm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Im=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
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
#endif`,Um=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Om=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
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
#endif`,Vm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ym=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$m=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Km=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,t0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,n0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,i0=`float getShadowMask() {
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
}`,s0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,a0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o0=`#ifdef USE_SKINNING
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
#endif`,l0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,c0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,h0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,u0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,d0=`#ifdef USE_TRANSMISSION
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
#endif`,f0=`#ifdef USE_TRANSMISSION
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,g0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,x0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,y0=`uniform sampler2D t2D;
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,b0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`#include <common>
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
}`,T0=`#if DEPTH_PACKING == 3200
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
}`,w0=`#define DISTANCE
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
}`,A0=`#define DISTANCE
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,C0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`uniform float scale;
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
}`,I0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,D0=`uniform vec3 diffuse;
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
}`,N0=`#define LAMBERT
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
}`,U0=`#define LAMBERT
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
}`,F0=`#define MATCAP
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
}`,O0=`#define MATCAP
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
}`,B0=`#define NORMAL
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
}`,k0=`#define NORMAL
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
}`,z0=`#define PHONG
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
}`,G0=`#define PHONG
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
}`,V0=`#define STANDARD
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
}`,H0=`#define STANDARD
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
}`,W0=`#define TOON
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
}`,X0=`#define TOON
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
}`,q0=`uniform float size;
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
}`,Y0=`uniform vec3 diffuse;
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
}`,Z0=`#include <common>
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
}`,$0=`uniform vec3 color;
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
}`,J0=`uniform float rotation;
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
}`,j0=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:xp,alphahash_pars_fragment:yp,alphamap_fragment:vp,alphamap_pars_fragment:bp,alphatest_fragment:Mp,alphatest_pars_fragment:Sp,aomap_fragment:Ep,aomap_pars_fragment:Tp,batching_pars_vertex:wp,batching_vertex:Ap,begin_vertex:Rp,beginnormal_vertex:Cp,bsdfs:Pp,iridescence_fragment:Ip,bumpmap_pars_fragment:Lp,clipping_planes_fragment:Dp,clipping_planes_pars_fragment:Np,clipping_planes_pars_vertex:Up,clipping_planes_vertex:Fp,color_fragment:Op,color_pars_fragment:Bp,color_pars_vertex:kp,color_vertex:zp,common:Gp,cube_uv_reflection_fragment:Vp,defaultnormal_vertex:Hp,displacementmap_pars_vertex:Wp,displacementmap_vertex:Xp,emissivemap_fragment:qp,emissivemap_pars_fragment:Yp,colorspace_fragment:Zp,colorspace_pars_fragment:$p,envmap_fragment:Jp,envmap_common_pars_fragment:jp,envmap_pars_fragment:Kp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:hm,envmap_vertex:tm,fog_vertex:em,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:sm,gradientmap_pars_fragment:rm,lightmap_pars_fragment:am,lights_lambert_fragment:om,lights_lambert_pars_fragment:lm,lights_pars_begin:cm,lights_toon_fragment:um,lights_toon_pars_fragment:dm,lights_phong_fragment:fm,lights_phong_pars_fragment:pm,lights_physical_fragment:mm,lights_physical_pars_fragment:gm,lights_fragment_begin:_m,lights_fragment_maps:xm,lights_fragment_end:ym,lightprobes_pars_fragment:vm,logdepthbuf_fragment:bm,logdepthbuf_pars_fragment:Mm,logdepthbuf_pars_vertex:Sm,logdepthbuf_vertex:Em,map_fragment:Tm,map_pars_fragment:wm,map_particle_fragment:Am,map_particle_pars_fragment:Rm,metalnessmap_fragment:Cm,metalnessmap_pars_fragment:Pm,morphinstance_vertex:Im,morphcolor_vertex:Lm,morphnormal_vertex:Dm,morphtarget_pars_vertex:Nm,morphtarget_vertex:Um,normal_fragment_begin:Fm,normal_fragment_maps:Om,normal_pars_fragment:Bm,normal_pars_vertex:km,normal_vertex:zm,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:Vm,clearcoat_normal_fragment_maps:Hm,clearcoat_pars_fragment:Wm,iridescence_pars_fragment:Xm,opaque_fragment:qm,packing:Ym,premultiplied_alpha_fragment:Zm,project_vertex:$m,dithering_fragment:Jm,dithering_pars_fragment:jm,roughnessmap_fragment:Km,roughnessmap_pars_fragment:Qm,shadowmap_pars_fragment:t0,shadowmap_pars_vertex:e0,shadowmap_vertex:n0,shadowmask_pars_fragment:i0,skinbase_vertex:s0,skinning_pars_vertex:r0,skinning_vertex:a0,skinnormal_vertex:o0,specularmap_fragment:l0,specularmap_pars_fragment:c0,tonemapping_fragment:h0,tonemapping_pars_fragment:u0,transmission_fragment:d0,transmission_pars_fragment:f0,uv_pars_fragment:p0,uv_pars_vertex:m0,uv_vertex:g0,worldpos_vertex:_0,background_vert:x0,background_frag:y0,backgroundCube_vert:v0,backgroundCube_frag:b0,cube_vert:M0,cube_frag:S0,depth_vert:E0,depth_frag:T0,distance_vert:w0,distance_frag:A0,equirect_vert:R0,equirect_frag:C0,linedashed_vert:P0,linedashed_frag:I0,meshbasic_vert:L0,meshbasic_frag:D0,meshlambert_vert:N0,meshlambert_frag:U0,meshmatcap_vert:F0,meshmatcap_frag:O0,meshnormal_vert:B0,meshnormal_frag:k0,meshphong_vert:z0,meshphong_frag:G0,meshphysical_vert:V0,meshphysical_frag:H0,meshtoon_vert:W0,meshtoon_frag:X0,points_vert:q0,points_frag:Y0,shadow_vert:Z0,shadow_frag:$0,sprite_vert:J0,sprite_frag:j0},At={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Hn={basic:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:je([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:je([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new Kt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:je([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:je([At.points,At.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:je([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:je([At.common,At.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:je([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:je([At.sprite,At.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distance:{uniforms:je([At.common,At.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distance_vert,fragmentShader:se.distance_frag},shadow:{uniforms:je([At.lights,At.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Hn.physical={uniforms:je([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var Qo={r:0,b:0,g:0},K0=new _e,id=new Jt;id.set(-1,0,0,0,1,0,0,0,1);function Q0(n,t,e,i,s,r){let a=new Kt(0),o=s===!0?0:1,l,c,h=null,u=0,d=null;function f(T){let L=T.isScene===!0?T.background:null;if(L&&L.isTexture){let b=T.backgroundBlurriness>0;L=t.get(L,b)}return L}function g(T){let L=!1,b=f(T);b===null?m(a,o):b&&b.isColor&&(m(b,1),L=!0);let y=n.xr.getEnvironmentBlendMode();y==="additive"?e.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||L)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(T,L){let b=f(L);b&&(b.isCubeTexture||b.mapping===Nr)?(c===void 0&&(c=new ze(new Qt(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Wi(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,v,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(K0.makeRotationFromEuler(L.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(id),c.material.toneMapped=ae.getTransfer(b.colorSpace)!==fe,(h!==b||u!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ze(new Ne(2,2),new _n({name:"BackgroundMaterial",uniforms:Wi(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,l.material.toneMapped=ae.getTransfer(b.colorSpace)!==fe,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function m(T,L){T.getRGB(Qo,Mc(n)),e.buffers.color.setClear(Qo.r,Qo.g,Qo.b,L,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,L=1){a.set(T),o=L,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,m(a,o)},render:g,addToRenderList:S,dispose:p}}function tg(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(B,N,G,F,U){let $=!1,W=u(B,F,G,N);r!==W&&(r=W,c(r.object)),$=f(B,F,G,U),$&&g(B,F,G,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,b(B,N,G,F),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return n.createVertexArray()}function c(B){return n.bindVertexArray(B)}function h(B){return n.deleteVertexArray(B)}function u(B,N,G,F){let U=F.wireframe===!0,$=i[N.id];$===void 0&&($={},i[N.id]=$);let W=B.isInstancedMesh===!0?B.id:0,O=$[W];O===void 0&&(O={},$[W]=O);let P=O[G.id];P===void 0&&(P={},O[G.id]=P);let I=P[U];return I===void 0&&(I=d(l()),P[U]=I),I}function d(B){let N=[],G=[],F=[];for(let U=0;U<e;U++)N[U]=0,G[U]=0,F[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:F,object:B,attributes:{},index:null}}function f(B,N,G,F){let U=r.attributes,$=N.attributes,W=0,O=G.getAttributes();for(let P in O)if(O[P].location>=0){let X=U[P],at=$[P];if(at===void 0&&(P==="instanceMatrix"&&B.instanceMatrix&&(at=B.instanceMatrix),P==="instanceColor"&&B.instanceColor&&(at=B.instanceColor)),X===void 0||X.attribute!==at||at&&X.data!==at.data)return!0;W++}return r.attributesNum!==W||r.index!==F}function g(B,N,G,F){let U={},$=N.attributes,W=0,O=G.getAttributes();for(let P in O)if(O[P].location>=0){let X=$[P];X===void 0&&(P==="instanceMatrix"&&B.instanceMatrix&&(X=B.instanceMatrix),P==="instanceColor"&&B.instanceColor&&(X=B.instanceColor));let at={};at.attribute=X,X&&X.data&&(at.data=X.data),U[P]=at,W++}r.attributes=U,r.attributesNum=W,r.index=F}function S(){let B=r.newAttributes;for(let N=0,G=B.length;N<G;N++)B[N]=0}function m(B){p(B,0)}function p(B,N){let G=r.newAttributes,F=r.enabledAttributes,U=r.attributeDivisors;G[B]=1,F[B]===0&&(n.enableVertexAttribArray(B),F[B]=1),U[B]!==N&&(n.vertexAttribDivisor(B,N),U[B]=N)}function T(){let B=r.newAttributes,N=r.enabledAttributes;for(let G=0,F=N.length;G<F;G++)N[G]!==B[G]&&(n.disableVertexAttribArray(G),N[G]=0)}function L(B,N,G,F,U,$,W){W===!0?n.vertexAttribIPointer(B,N,G,U,$):n.vertexAttribPointer(B,N,G,F,U,$)}function b(B,N,G,F){S();let U=F.attributes,$=G.getAttributes(),W=N.defaultAttributeValues;for(let O in $){let P=$[O];if(P.location>=0){let I=U[O];if(I===void 0&&(O==="instanceMatrix"&&B.instanceMatrix&&(I=B.instanceMatrix),O==="instanceColor"&&B.instanceColor&&(I=B.instanceColor)),I!==void 0){let X=I.normalized,at=I.itemSize,et=t.get(I);if(et===void 0)continue;let vt=et.buffer,Tt=et.type,Ht=et.bytesPerElement,Q=Tt===n.INT||Tt===n.UNSIGNED_INT||I.gpuType===fo;if(I.isInterleavedBufferAttribute){let ot=I.data,bt=ot.stride,Pt=I.offset;if(ot.isInstancedInterleavedBuffer){for(let wt=0;wt<P.locationSize;wt++)p(P.location+wt,ot.meshPerAttribute);B.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let wt=0;wt<P.locationSize;wt++)m(P.location+wt);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let wt=0;wt<P.locationSize;wt++)L(P.location+wt,at/P.locationSize,Tt,X,bt*Ht,(Pt+at/P.locationSize*wt)*Ht,Q)}else{if(I.isInstancedBufferAttribute){for(let ot=0;ot<P.locationSize;ot++)p(P.location+ot,I.meshPerAttribute);B.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let ot=0;ot<P.locationSize;ot++)m(P.location+ot);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let ot=0;ot<P.locationSize;ot++)L(P.location+ot,at/P.locationSize,Tt,X,at*Ht,at/P.locationSize*ot*Ht,Q)}}else if(W!==void 0){let X=W[O];if(X!==void 0)switch(X.length){case 2:n.vertexAttrib2fv(P.location,X);break;case 3:n.vertexAttrib3fv(P.location,X);break;case 4:n.vertexAttrib4fv(P.location,X);break;default:n.vertexAttrib1fv(P.location,X)}}}}T()}function y(){w();for(let B in i){let N=i[B];for(let G in N){let F=N[G];for(let U in F){let $=F[U];for(let W in $)h($[W].object),delete $[W];delete F[U]}}delete i[B]}}function v(B){if(i[B.id]===void 0)return;let N=i[B.id];for(let G in N){let F=N[G];for(let U in F){let $=F[U];for(let W in $)h($[W].object),delete $[W];delete F[U]}}delete i[B.id]}function A(B){for(let N in i){let G=i[N];for(let F in G){let U=G[F];if(U[B.id]===void 0)continue;let $=U[B.id];for(let W in $)h($[W].object),delete $[W];delete U[B.id]}}}function _(B){for(let N in i){let G=i[N],F=B.isInstancedMesh===!0?B.id:0,U=G[F];if(U!==void 0){for(let $ in U){let W=U[$];for(let O in W)h(W[O].object),delete W[O];delete U[$]}delete G[F],Object.keys(G).length===0&&delete i[N]}}}function w(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:y,releaseStatesOfGeometry:v,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:m,disableUnusedAttributes:T}}function eg(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ng(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==Sn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let _=A===Dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==on&&A!==Mn&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Yt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),L=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=n.getParameter(n.MAX_SAMPLES),v=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:L,maxFragmentUniforms:b,maxSamples:y,samples:v}}function ig(n){let t=this,e=null,i=0,s=!1,r=!1,a=new fn,o=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,S=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let T=r?0:i,L=T*4,b=p.clippingState||null;l.value=b,b=h(g,d,L,f);for(let y=0;y!==L;++y)b[y]=e[y];p.clippingState=b,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,g){let S=u!==null?u.length:0,m=null;if(S!==0){if(m=l.value,g!==!0||m===null){let p=f+S*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let L=0,b=f;L!==S;++L,b+=4)a.copy(u[L]).applyMatrix4(T,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}var Ls=4,sg=6,rg=20,ag=256,Vr=new Ts,Uu=new Kt,Ic=null,Lc=0,Dc=0,Nc=!1,og=new z,Xi=new z,el=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=og}=r;Ic=this._renderer.getRenderTarget(),Lc=this._renderer.getActiveCubeFace(),Dc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ic,Lc,Dc),this._renderer.xr.enabled=Nc,t.scissorTest=!1,Is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ei||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ic=this._renderer.getRenderTarget(),Lc=this._renderer.getActiveCubeFace(),Dc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:He,minFilter:He,generateMipmaps:!1,type:Dn,format:Sn,colorSpace:tr,depthBuffer:!1},s=Fu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fu(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=lg(r)),this._blurMaterial=hg(r,t,e),this._ggxMaterial=cg(r,t,e)}return s}_compileMaterial(t){let e=new ze(new We,t);this._renderer.compile(e,Vr)}_sceneToCubeUV(t,e,i,s,r){let l=new Je(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Uu),u.toneMapping=In,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new Qt,new Ie({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1})));let S=this._backgroundBox,m=S.material,p=!1,T=t.background;T?T.isColor&&(m.color.copy(T),t.background=null,p=!0):(m.color.copy(Uu),p=!0);for(let L=0;L<6;L++){let b=L%3;b===0?(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[L],r.y,r.z)):b===1?(l.up.set(0,0,c[L]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[L],r.z)):(l.up.set(0,c[L],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[L]));let y=this._cubeSize;Is(s,b*y,L>2?y:0,y,y),u.setRenderTarget(s),p&&u.render(S,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=T}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Ei||t.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ou());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Is(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Vr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:g}=this,S=this._sizeLods[i],m=3*S*(i>g-Ls?i-g+Ls:0),p=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Is(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(o,Vr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Is(t,m,p,3*S,2*S),s.setRenderTarget(t),s.render(o,Vr)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-Ls?s-this._lodMax+Ls:0),d=4*(this._cubeSize-h);Is(e,u,d,3*h,2*h),a.setRenderTarget(e),a.render(l,Vr)}};function lg(n){let t=[],e=[],i=n,s=n-Ls+1+sg;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,g=new Float32Array(f*d*u),S=new Float32Array(f*d*u);for(let p=0;p<u;p++){let T=p%3*2/3-1,L=p>2?0:-1,b=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];g.set(b,f*d*p);for(let y=0;y<d;y++){let v=h[y*2]*2-1,A=h[y*2+1]*2-1;p===0?Xi.set(1,A,v):p===1?Xi.set(-v,1,-A):p===2?Xi.set(-v,A,1):p===3?Xi.set(-1,A,-v):p===4?Xi.set(-v,-1,A):Xi.set(v,A,-1),Xi.toArray(S,(p*d+y)*f)}}let m=new We;m.setAttribute("position",new pn(g,f)),m.setAttribute("outputDirection",new pn(S,f)),e.push(new ze(m,null)),i>Ls&&i--}return{lodMeshes:e,sizeLods:t}}function Fu(n,t,e){let i=new rn(n,t,e);return i.texture.mapping=Nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Is(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function cg(n,t,e){return new _n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ag,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function hg(n,t,e){return new _n({name:"SphericalGaussianBlur",defines:{SAMPLES:rg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ou(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Bu(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var nl=class extends rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ur(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qt(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Wi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:Gn});r.uniforms.tEquirect.value=e;let a=new ze(s,r),o=e.minFilter;return e.minFilter===Ti&&(e.minFilter=He),new ro(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function ug(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===co||f===ho)if(t.has(d)){let g=t.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let S=new nl(g.height);return S.fromEquirectangularTexture(n,d),t.set(d,S),d.addEventListener("dispose",c),o(S.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,g=f===co||f===ho,S=f===Ei||f===Vi;if(g||S){let m=e.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new el(n)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{let T=d.image;return g&&T&&T.height>0||S&&T&&l(T)?(i===null&&(i=new el(n)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===co?d.mapping=Ei:f===ho&&(d.mapping=Vi),d}function l(d){let f=0,g=6;for(let S=0;S<g;S++)d[S]!==void 0&&f++;return f===g}function c(d){let f=d.target;f.removeEventListener("dispose",c);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function dg(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Oi("WebGLRenderer: "+i+" extension not supported."),s}}}function fg(n,t,e,i){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)t.update(d[f],n.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,S=0;if(g===void 0)return;if(f!==null){let T=f.array;S=f.version;for(let L=0,b=T.length;L<b;L+=3){let y=T[L+0],v=T[L+1],A=T[L+2];d.push(y,v,v,A,A,y)}}else{let T=g.array;S=g.version;for(let L=0,b=T.length/3-1;L<b;L+=3){let y=L+0,v=L+1,A=L+2;d.push(y,v,v,A,A,y)}}let m=new(g.count>=65535?lr:or)(d,1);m.version=S;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function pg(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){n.drawElements(i,d,r,u*a),e.update(d,i,1)}function c(u,d,f){f!==0&&(n.drawElementsInstanced(i,d,r,u*a,f),e.update(d,i,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,f);let S=0;for(let m=0;m<f;m++)S+=d[m];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function mg(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:$t("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function gg(n,t,e){let i=new WeakMap,s=new Se;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],L=0;f===!0&&(L=1),g===!0&&(L=2),S===!0&&(L=3);let b=o.attributes.position.count*L,y=1;b>t.maxTextureSize&&(y=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let v=new Float32Array(b*y*4*u),A=new ir(v,b,y,u);A.type=Mn,A.needsUpdate=!0;let _=L*4;for(let C=0;C<u;C++){let B=m[C],N=p[C],G=T[C],F=b*y*4*C;for(let U=0;U<B.count;U++){let $=U*_;f===!0&&(s.fromBufferAttribute(B,U),v[F+$+0]=s.x,v[F+$+1]=s.y,v[F+$+2]=s.z,v[F+$+3]=0),g===!0&&(s.fromBufferAttribute(N,U),v[F+$+4]=s.x,v[F+$+5]=s.y,v[F+$+6]=s.z,v[F+$+7]=0),S===!0&&(s.fromBufferAttribute(G,U),v[F+$+8]=s.x,v[F+$+9]=s.y,v[F+$+10]=s.z,v[F+$+11]=G.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new _t(b,y)},i.set(o,d),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let S=0;S<c.length;S++)f+=c[S];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function _g(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var xg={[sc]:"LINEAR_TONE_MAPPING",[rc]:"REINHARD_TONE_MAPPING",[ac]:"CINEON_TONE_MAPPING",[Dr]:"ACES_FILMIC_TONE_MAPPING",[lc]:"AGX_TONE_MAPPING",[cc]:"NEUTRAL_TONE_MAPPING",[oc]:"CUSTOM_TONE_MAPPING"};function yg(n,t,e,i,s,r){let a=new rn(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new We;c.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ce([0,2,0,0,2,0],2));let h=new Xa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ze(c,h),d=new Ts(-1,1,1,-1,0,1),f=null,g=null,S=!1,m,p=null,T=[],L=!1;this.setSize=function(b,y){a.setSize(b,y),o!==null&&o.setSize(b,y),l!==null&&l.setSize(b,y);for(let v=0;v<T.length;v++){let A=T[v];A.setSize&&A.setSize(b,y)}},this.setEffects=function(b){T=b,L=T.length>0&&T[0].isRenderPass===!0;let y=a.width,v=a.height;T.length>0&&o===null&&(o=new rn(y,v,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),l=new rn(y,v,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<T.length;A++){let _=T[A];_.setSize&&_.setSize(y,v)}},this.begin=function(b,y){if(S||b.toneMapping===In&&T.length===0)return!1;if(p=y,y!==null){let v=y.width,A=y.height;(a.width!==v||a.height!==A)&&this.setSize(v,A)}return L===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=In,!0},this.hasRenderPass=function(){return L},this.end=function(b,y){b.toneMapping=m,S=!0;let v=a,A=o;for(let _=0;_<T.length;_++){let w=T[_];w.enabled!==!1&&(w.render(b,A,v,y),w.needsSwap!==!1&&(v=A,A=A===o?l:o))}if(f!==b.outputColorSpace||g!==b.toneMapping){f=b.outputColorSpace,g=b.toneMapping,h.defines={},ae.getTransfer(f)===fe&&(h.defines.SRGB_TRANSFER="");let _=xg[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=v.texture,b.setRenderTarget(p),b.render(u,d),p=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var sd=new sn,Oc=new gi(1,1),rd=new ir,ad=new Oa,od=new ur,ku=[],zu=[],Gu=new Float32Array(16),Vu=new Float32Array(9),Hu=new Float32Array(4);function Ns(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=ku[s];if(r===void 0&&(r=new Float32Array(s),ku[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Fe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function rl(n,t){let e=zu[t];e===void 0&&(e=new Int32Array(t),zu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function vg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function bg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2fv(this.addr,t),Fe(e,t)}}function Mg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;n.uniform3fv(this.addr,t),Fe(e,t)}}function Sg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4fv(this.addr,t),Fe(e,t)}}function Eg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,i))return;Hu.set(i),n.uniformMatrix2fv(this.addr,!1,Hu),Fe(e,i)}}function Tg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,i))return;Vu.set(i),n.uniformMatrix3fv(this.addr,!1,Vu),Fe(e,i)}}function wg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(Ue(e,i))return;Gu.set(i),n.uniformMatrix4fv(this.addr,!1,Gu),Fe(e,i)}}function Ag(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Rg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2iv(this.addr,t),Fe(e,t)}}function Cg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3iv(this.addr,t),Fe(e,t)}}function Pg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4iv(this.addr,t),Fe(e,t)}}function Ig(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Lg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2uiv(this.addr,t),Fe(e,t)}}function Dg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3uiv(this.addr,t),Fe(e,t)}}function Ng(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4uiv(this.addr,t),Fe(e,t)}}function Ug(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Oc.compareFunction=e.isReversedDepthBuffer()?Ko:jo,r=Oc):r=sd,e.setTexture2D(t||r,s)}function Fg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ad,s)}function Og(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||od,s)}function Bg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||rd,s)}function kg(n){switch(n){case 5126:return vg;case 35664:return bg;case 35665:return Mg;case 35666:return Sg;case 35674:return Eg;case 35675:return Tg;case 35676:return wg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Pg;case 5125:return Ig;case 36294:return Lg;case 36295:return Dg;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Ug;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Bg}}function zg(n,t){n.uniform1fv(this.addr,t)}function Gg(n,t){let e=Ns(t,this.size,2);n.uniform2fv(this.addr,e)}function Vg(n,t){let e=Ns(t,this.size,3);n.uniform3fv(this.addr,e)}function Hg(n,t){let e=Ns(t,this.size,4);n.uniform4fv(this.addr,e)}function Wg(n,t){let e=Ns(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Xg(n,t){let e=Ns(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function qg(n,t){let e=Ns(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Yg(n,t){n.uniform1iv(this.addr,t)}function Zg(n,t){n.uniform2iv(this.addr,t)}function $g(n,t){n.uniform3iv(this.addr,t)}function Jg(n,t){n.uniform4iv(this.addr,t)}function jg(n,t){n.uniform1uiv(this.addr,t)}function Kg(n,t){n.uniform2uiv(this.addr,t)}function Qg(n,t){n.uniform3uiv(this.addr,t)}function t_(n,t){n.uniform4uiv(this.addr,t)}function e_(n,t,e){let i=this.cache,s=t.length,r=rl(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Oc:a=sd;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function n_(n,t,e){let i=this.cache,s=t.length,r=rl(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ad,r[a])}function i_(n,t,e){let i=this.cache,s=t.length,r=rl(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||od,r[a])}function s_(n,t,e){let i=this.cache,s=t.length,r=rl(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||rd,r[a])}function r_(n){switch(n){case 5126:return zg;case 35664:return Gg;case 35665:return Vg;case 35666:return Hg;case 35674:return Wg;case 35675:return Xg;case 35676:return qg;case 5124:case 35670:return Yg;case 35667:case 35671:return Zg;case 35668:case 35672:return $g;case 35669:case 35673:return Jg;case 5125:return jg;case 36294:return Kg;case 36295:return Qg;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return s_}}var Bc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=kg(e.type)}},kc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=r_(e.type)}},zc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Uc=/(\w+)(\])?(\[|\.)?/g;function Wu(n,t){n.seq.push(t),n.map[t.id]=t}function a_(n,t,e){let i=n.name,s=i.length;for(Uc.lastIndex=0;;){let r=Uc.exec(i),a=Uc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Wu(e,c===void 0?new Bc(o,n,t):new kc(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new zc(o),Wu(e,u)),e=u}}}var Ds=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);a_(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Xu(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var o_=37297,l_=0;function c_(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var qu=new Jt;function h_(n){ae._getMatrix(qu,ae.workingColorSpace,n);let t=`mat3( ${qu.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(n)){case er:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Yu(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+c_(n.getShaderSource(t),o)}else return r}function u_(n,t){let e=h_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var d_={[sc]:"Linear",[rc]:"Reinhard",[ac]:"Cineon",[Dr]:"ACESFilmic",[lc]:"AgX",[cc]:"Neutral",[oc]:"Custom"};function f_(n,t){let e=d_[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var tl=new z;function p_(){ae.getLuminanceCoefficients(tl);let n=tl.x.toFixed(4),t=tl.y.toFixed(4),e=tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function g_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function __(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Wr(n){return n!==""}function Zu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $u(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var x_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gc(n){return n.replace(x_,v_)}var y_=new Map;function v_(n,t){let e=se[t];if(e===void 0){let i=y_.get(t);if(i!==void 0)e=se[i],Yt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Gc(e)}var b_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ju(n){return n.replace(b_,M_)}function M_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ju(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}var S_={[Ir]:"SHADOWMAP_TYPE_PCF",[As]:"SHADOWMAP_TYPE_VSM"};function E_(n){return S_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var T_={[Ei]:"ENVMAP_TYPE_CUBE",[Vi]:"ENVMAP_TYPE_CUBE",[Nr]:"ENVMAP_TYPE_CUBE_UV"};function w_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":T_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var A_={[Vi]:"ENVMAP_MODE_REFRACTION"};function R_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":A_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var C_={[ic]:"ENVMAP_BLENDING_MULTIPLY",[hu]:"ENVMAP_BLENDING_MIX",[uu]:"ENVMAP_BLENDING_ADD"};function P_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":C_[n.combine]||"ENVMAP_BLENDING_NONE"}function I_(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function L_(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=E_(e),c=w_(e),h=R_(e),u=P_(e),d=I_(e),f=m_(e),g=g_(r),S=s.createProgram(),m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Wr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Wr).join(`
`),p.length>0&&(p+=`
`)):(m=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),p=[ju(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?se.tonemapping_pars_fragment:"",e.toneMapping!==In?f_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,u_("linearToOutputTexel",e.outputColorSpace),p_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Wr).join(`
`)),a=Gc(a),a=Zu(a,e),a=$u(a,e),o=Gc(o),o=Zu(o,e),o=$u(o,e),a=Ju(a),o=Ju(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===_c?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let L=T+m+a,b=T+p+o,y=Xu(s,s.VERTEX_SHADER,L),v=Xu(s,s.FRAGMENT_SHADER,b);s.attachShader(S,y),s.attachShader(S,v),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function A(B){if(n.debug.checkShaderErrors){let N=s.getProgramInfoLog(S)||"",G=s.getShaderInfoLog(y)||"",F=s.getShaderInfoLog(v)||"",U=N.trim(),$=G.trim(),W=F.trim(),O=!0,P=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,y,v);else{let I=Yu(s,y,"vertex"),X=Yu(s,v,"fragment");$t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+U+`
`+I+`
`+X)}else U!==""?Yt("WebGLProgram: Program Info Log:",U):($===""||W==="")&&(P=!1);P&&(B.diagnostics={runnable:O,programLog:U,vertexShader:{log:$,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(y),s.deleteShader(v),_=new Ds(s,S),w=__(s,S)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(S,o_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=l_++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=y,this.fragmentShader=v,this}var D_=0,Vc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Hc(t),e.set(t,i)),i}},Hc=class{constructor(t){this.id=D_++,this.code=t,this.usedTimes=0}};function N_(n){return n===Ai||n===zr||n===Gr}function U_(n,t,e,i,s,r){let a=new sr,o=new Vc,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function S(_,w,C,B,N,G){let F=B.fog,U=N.geometry,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?B.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,O=t.get(_.envMap||$,W),P=O&&O.mapping===Nr?O.image.height:null,I=f[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&Yt("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let X=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,at=X!==void 0?X.length:0,et=0;U.morphAttributes.position!==void 0&&(et=1),U.morphAttributes.normal!==void 0&&(et=2),U.morphAttributes.color!==void 0&&(et=3);let vt,Tt,Ht,Q;if(I){let xe=Hn[I];vt=xe.vertexShader,Tt=xe.fragmentShader}else{vt=_.vertexShader,Tt=_.fragmentShader;let xe=o.getVertexShaderStage(_),ue=o.getFragmentShaderStage(_);o.update(_,xe,ue),Ht=xe.id,Q=ue.id}let ot=n.getRenderTarget(),bt=n.state.buffers.depth.getReversed(),Pt=N.isInstancedMesh===!0,wt=N.isBatchedMesh===!0,Gt=!!_.map,Wt=!!_.matcap,lt=!!O,ft=!!_.aoMap,ht=!!_.lightMap,mt=!!_.bumpMap&&_.wireframe===!1,pt=!!_.normalMap,Vt=!!_.displacementMap,kt=!!_.emissiveMap,Xt=!!_.metalnessMap,qt=!!_.roughnessMap,k=_.anisotropy>0,te=_.clearcoat>0,ee=_.dispersion>0,R=_.retroreflectivity>0,x=_.iridescence>0,Z=_.sheen>0,K=_.transmission>0,E=k&&!!_.anisotropyMap,Y=te&&!!_.clearcoatMap,nt=te&&!!_.clearcoatNormalMap,V=te&&!!_.clearcoatRoughnessMap,q=x&&!!_.iridescenceMap,dt=x&&!!_.iridescenceThicknessMap,St=Z&&!!_.sheenColorMap,yt=Z&&!!_.sheenRoughnessMap,Mt=!!_.specularMap,Et=!!_.specularColorMap,Nt=!!_.specularIntensityMap,it=K&&!!_.transmissionMap,D=K&&!!_.thicknessMap,rt=!!_.gradientMap,st=!!_.alphaMap,xt=_.alphaTest>0,gt=!!_.alphaHash,ut=!!_.extensions,Ot=In;_.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(Ot=n.toneMapping);let Bt={shaderID:I,shaderType:_.type,shaderName:_.name,vertexShader:vt,fragmentShader:Tt,defines:_.defines,customVertexShaderID:Ht,customFragmentShaderID:Q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:wt,batchingColor:wt&&N._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&N.instanceColor!==null,instancingMorph:Pt&&N.morphTexture!==null,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Gt,matcap:Wt,envMap:lt,envMapMode:lt&&O.mapping,envMapCubeUVHeight:P,aoMap:ft,lightMap:ht,bumpMap:mt,normalMap:pt,displacementMap:Vt,emissiveMap:kt,normalMapObjectSpace:pt&&_.normalMapType===pu,normalMapTangentSpace:pt&&_.normalMapType===Jo,packedNormalMap:pt&&_.normalMapType===Jo&&N_(_.normalMap.format),metalnessMap:Xt,roughnessMap:qt,anisotropy:k,anisotropyMap:E,clearcoat:te,clearcoatMap:Y,clearcoatNormalMap:nt,clearcoatRoughnessMap:V,dispersion:ee,retroreflection:R,iridescence:x,iridescenceMap:q,iridescenceThicknessMap:dt,sheen:Z,sheenColorMap:St,sheenRoughnessMap:yt,specularMap:Mt,specularColorMap:Et,specularIntensityMap:Nt,transmission:K,transmissionMap:it,thicknessMap:D,gradientMap:rt,opaque:_.transparent===!1&&_.blending===Rs&&_.alphaToCoverage===!1,alphaMap:st,alphaTest:xt,alphaHash:gt,combine:_.combine,mapUv:Gt&&g(_.map.channel),aoMapUv:ft&&g(_.aoMap.channel),lightMapUv:ht&&g(_.lightMap.channel),bumpMapUv:mt&&g(_.bumpMap.channel),normalMapUv:pt&&g(_.normalMap.channel),displacementMapUv:Vt&&g(_.displacementMap.channel),emissiveMapUv:kt&&g(_.emissiveMap.channel),metalnessMapUv:Xt&&g(_.metalnessMap.channel),roughnessMapUv:qt&&g(_.roughnessMap.channel),anisotropyMapUv:E&&g(_.anisotropyMap.channel),clearcoatMapUv:Y&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:nt&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:St&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:yt&&g(_.sheenRoughnessMap.channel),specularMapUv:Mt&&g(_.specularMap.channel),specularColorMapUv:Et&&g(_.specularColorMap.channel),specularIntensityMapUv:Nt&&g(_.specularIntensityMap.channel),transmissionMapUv:it&&g(_.transmissionMap.channel),thicknessMapUv:D&&g(_.thicknessMap.channel),alphaMapUv:st&&g(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(pt||k),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!U.attributes.uv&&(Gt||st),fog:!!F,useFog:_.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&pt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:bt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:et,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Gt&&_.map.isVideoTexture===!0&&ae.getTransfer(_.map.colorSpace)===fe,decodeVideoTextureEmissive:kt&&_.emissiveMap.isVideoTexture===!0&&ae.getTransfer(_.emissiveMap.colorSpace)===fe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===qe,flipSided:_.side===Xe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ut&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&_.extensions.multiDraw===!0||wt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Bt.vertexUv1s=l.has(1),Bt.vertexUv2s=l.has(2),Bt.vertexUv3s=l.has(3),l.clear(),Bt}function m(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)w.push(C),w.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(p(w,_),T(w,_),w.push(n.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function p(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function T(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function L(_){let w=f[_.type],C;if(w){let B=Hn[w];C=Lu.clone(B.uniforms)}else C=_.uniforms;return C}function b(_,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new L_(n,w,_,s),c.push(C),h.set(w,C)),C}function y(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function v(_){o.remove(_)}function A(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:L,acquireProgram:b,releaseProgram:y,releaseShaderCache:v,programs:c,dispose:A}}function F_(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function O_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Ku(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,S,m,p){let T=n[t];return T===void 0?(T={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:p},n[t]=T):(T.id=d.id,T.object=d,T.geometry=f,T.material=g,T.materialVariant=a(d),T.groupOrder=S,T.renderOrder=d.renderOrder,T.z=m,T.group=p),t++,T}function l(d,f,g,S,m,p,T){T.reversedDepth===!0&&(m=-m);let L=o(d,f,g,S,m,p);g.transmission>0?i.push(L):g.transparent===!0?s.push(L):e.push(L)}function c(d,f,g,S,m,p){let T=o(d,f,g,S,m,p);g.transmission>0?i.unshift(T):g.transparent===!0?s.unshift(T):e.unshift(T)}function h(d,f){e.length>1&&e.sort(d||O_),i.length>1&&i.sort(f||Ku),s.length>1&&s.sort(f||Ku)}function u(){for(let d=t,f=n.length;d<f;d++){let g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function B_(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Qu,n.set(i,[a])):s>=r.length?(a=new Qu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function k_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new Kt};break;case"SpotLight":e={position:new z,direction:new z,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[t.id]=e,e}}}function z_(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var G_=0;function V_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function H_(n){let t=new k_,e=z_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);let s=new z,r=new _e,a=new _e;function o(c){let h=0,u=0,d=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let f=0,g=0,S=0,m=0,p=0,T=0,L=0,b=0,y=0,v=0,A=0,_=0,w=0,C=0;c.sort(V_);for(let N=0,G=c.length;N<G;N++){let F=c[N],U=F.color,$=F.intensity,W=F.distance,O=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Ai?O=F.shadow.map.texture:O=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=U.r*$,u+=U.g*$,d+=U.b*$;else if(F.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(F.sh.coefficients[P],$);C++}else if(F.isSunLight){let P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let I=F.shadow,X=e.get(F);X.shadowIntensity=I.intensity,X.shadowBias=I.bias,X.shadowNormalBias=I.normalBias,X.shadowRadius=I.radius,X.shadowMapSize.copy(I.mapSize).multiply(I.getFrameExtents()),i.sunShadow[g]=X,i.sunShadowMap[g]=O;let at=I.getViewportCount();for(let et=0;et<at;et++)i.sunShadowMatrix[S+et]=I.getMatrix(et),i.sunShadowCascade[S+et]=I._cascadeData[et];S+=at,g++}i.sun[f]=P,f++}else if(F.isDirectionalLight){let P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let I=F.shadow,X=e.get(F);X.shadowIntensity=I.intensity,X.shadowBias=I.bias,X.shadowNormalBias=I.normalBias,X.shadowRadius=I.radius,X.shadowMapSize=I.mapSize,i.directionalShadow[m]=X,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=F.shadow.matrix,y++}i.directional[m]=P,m++}else if(F.isSpotLight){let P=t.get(F);P.position.setFromMatrixPosition(F.matrixWorld),P.color.copy(U).multiplyScalar($),P.distance=W,P.coneCos=Math.cos(F.angle),P.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),P.decay=F.decay,i.spot[T]=P;let I=F.shadow;if(F.map&&(i.spotLightMap[_]=F.map,_++,I.updateMatrices(F),F.castShadow&&w++),i.spotLightMatrix[T]=I.matrix,F.castShadow){let X=e.get(F);X.shadowIntensity=I.intensity,X.shadowBias=I.bias,X.shadowNormalBias=I.normalBias,X.shadowRadius=I.radius,X.shadowMapSize=I.mapSize,i.spotShadow[T]=X,i.spotShadowMap[T]=O,A++}T++}else if(F.isRectAreaLight){let P=t.get(F);P.color.copy(U).multiplyScalar($),P.halfWidth.set(F.width*.5,0,0),P.halfHeight.set(0,F.height*.5,0),i.rectArea[L]=P,L++}else if(F.isPointLight){let P=t.get(F);if(P.color.copy(F.color).multiplyScalar(F.intensity),P.distance=F.distance,P.decay=F.decay,F.castShadow){let I=F.shadow,X=e.get(F);X.shadowIntensity=I.intensity,X.shadowBias=I.bias,X.shadowNormalBias=I.normalBias,X.shadowRadius=I.radius,X.shadowMapSize=I.mapSize,X.shadowCameraNear=I.camera.near,X.shadowCameraFar=I.camera.far,i.pointShadow[p]=X,i.pointShadowMap[p]=O,i.pointShadowMatrix[p]=F.shadow.matrix,v++}i.point[p]=P,p++}else if(F.isHemisphereLight){let P=t.get(F);P.skyColor.copy(F.color).multiplyScalar($),P.groundColor.copy(F.groundColor).multiplyScalar($),i.hemi[b]=P,b++}}L>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let B=i.hash;(B.sunLength!==f||B.directionalLength!==m||B.pointLength!==p||B.spotLength!==T||B.rectAreaLength!==L||B.hemiLength!==b||B.numSunShadows!==g||B.numDirectionalShadows!==y||B.numPointShadows!==v||B.numSpotShadows!==A||B.numSpotMaps!==_||B.numLightProbes!==C)&&(i.sun.length=f,i.directional.length=m,i.spot.length=T,i.rectArea.length=L,i.point.length=p,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.directionalShadowMatrix.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.pointShadowMatrix.length=v,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-w,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,B.sunLength=f,B.directionalLength=m,B.pointLength=p,B.spotLength=T,B.rectAreaLength=L,B.hemiLength=b,B.numSunShadows=g,B.numDirectionalShadows=y,B.numPointShadows=v,B.numSpotShadows=A,B.numSpotMaps=_,B.numLightProbes=C,i.version=G_++)}function l(c,h){let u=0,d=0,f=0,g=0,S=0,m=0,p=h.matrixWorldInverse;for(let T=0,L=c.length;T<L;T++){let b=c[T];if(b.isSunLight){let y=i.sun[u];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),u++}else if(b.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(b.isSpotLight){let y=i.spot[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),g++}else if(b.isRectAreaLight){let y=i.rectArea[S];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),S++}else if(b.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){let y=i.hemi[m];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:i}}function td(n){let t=new H_(n),e=[],i=[],s=[];function r(d){u.camera=d,e.length=0,i.length=0,s.length=0}function a(d){e.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function W_(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new td(n),t.set(s,[o])):r>=a.length?(o=new td(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`,Y_=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],Z_=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],ed=new _e,Hr=new z,Fc=new z;function $_(n,t,e){let i=new bs,s=new _t,r=new _t,a=new Se,o=new qa,l=new Ya,c={},h=e.maxTextureSize,u={[Si]:Xe,[Xe]:Si,[qe]:qe},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new We;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new ze(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ir;let p=this.type;this.render=function(v,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||v.length===0)return;this.type===lo&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ir);let w=n.getRenderTarget(),C=n.getActiveCubeFace(),B=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Gn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let G=p!==this.type;G&&A.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(U=>U.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,U=v.length;F<U;F++){let $=v[F],W=$.shadow;if(W===void 0){Yt("WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let O=W.getFrameExtents();s.multiply(O),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,W.mapSize.y=r.y));let P=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=P,W.map===null||G===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===As){if($.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new rn(s.x,s.y,{format:Ai,type:Dn,minFilter:He,magFilter:He,generateMipmaps:!1}),W.map.texture.name=$.name+".shadowMap",W.map.depthTexture=new gi(s.x,s.y,Mn),W.map.depthTexture.name=$.name+".shadowMapDepth",W.map.depthTexture.format=Bn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=ke,W.map.depthTexture.magFilter=ke}else $.isPointLight?(W.map=new nl(s.x),W.map.depthTexture=new Ba(s.x,Ln)):(W.map=new rn(s.x,s.y),W.map.depthTexture=new gi(s.x,s.y,Ln)),W.map.depthTexture.name=$.name+".shadowMap",W.map.depthTexture.format=Bn,this.type===Ir?(W.map.depthTexture.compareFunction=P?Ko:jo,W.map.depthTexture.minFilter=He,W.map.depthTexture.magFilter=He):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=ke,W.map.depthTexture.magFilter=ke);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let I=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();$.isPointLight!==!0&&W.updateMatrices($,_);for(let X=0;X<I;X++){let at=W.getCamera(X);if($.isPointLight){let et=W.camera,vt=W.matrix,Tt=$.distance||et.far;Tt!==et.far&&(et.far=Tt,et.updateProjectionMatrix()),Hr.setFromMatrixPosition($.matrixWorld),et.position.copy(Hr),Fc.copy(et.position),Fc.add(Y_[X]),et.up.copy(Z_[X]),et.lookAt(Fc),et.updateMatrixWorld(),vt.makeTranslation(-Hr.x,-Hr.y,-Hr.z),ed.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),W._frustum.setFromProjectionMatrix(ed,et.coordinateSystem,et.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,X),n.clear();else{X===0&&(n.setRenderTarget(W.map),n.clear());let et=W.getViewport(X);a.set(r.x*et.x,r.y*et.y,r.x*et.z,r.y*et.w),N.viewport(a)}i=W.getFrustum(X),b(A,_,at,$,this.type)}W.isPointLightShadow!==!0&&this.type===As&&T(W,_),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(w,C,B)};function T(v,A){let _=t.update(S);d.defines.VSM_SAMPLES!==v.blurSamples&&(d.defines.VSM_SAMPLES=v.blurSamples,f.defines.VSM_SAMPLES=v.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),v.mapPass===null?v.mapPass=new rn(s.x,s.y,{format:Ai,type:Dn}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),d.uniforms.shadow_pass.value=v.map.depthTexture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,n.setRenderTarget(v.mapPass),n.clear(),n.renderBufferDirect(A,null,_,d,S,null),f.uniforms.shadow_pass.value=v.mapPass.texture,f.uniforms.resolution.value.set(v.map.width,v.map.height),f.uniforms.radius.value=v.radius,n.setRenderTarget(v.map),n.clear(),n.renderBufferDirect(A,null,_,f,S,null)}function L(v,A,_,w){let C=null,B=_.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(B!==void 0)C=B;else if(C=_.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=C.uuid,G=A.uuid,F=c[N];F===void 0&&(F={},c[N]=F);let U=F[G];U===void 0&&(U=C.clone(),F[G]=U,A.addEventListener("dispose",y)),C=U}if(C.visible=A.visible,C.wireframe=A.wireframe,w===As?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:u[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let N=n.properties.get(C);N.light=_}return C}function b(v,A,_,w,C){if(v.visible===!1)return;if(v.layers.test(A.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&C===As)&&(!v.frustumCulled||v.intersectsFrustum(i))){v.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,v.matrixWorld);let G=t.update(v),F=v.material;if(Array.isArray(F)){let U=G.groups;for(let $=0,W=U.length;$<W;$++){let O=U[$],P=F[O.materialIndex];if(P&&P.visible){let I=L(v,P,w,C);v.onBeforeShadow(n,v,A,_,G,I,O),n.renderBufferDirect(_,null,G,I,v,O),v.onAfterShadow(n,v,A,_,G,I,O)}}}else if(F.visible){let U=L(v,F,w,C);v.onBeforeShadow(n,v,A,_,G,U,null),n.renderBufferDirect(_,null,G,U,v,null),v.onAfterShadow(n,v,A,_,G,U,null)}}let N=v.children;for(let G=0,F=N.length;G<F;G++)b(N[G],A,_,w,C)}function y(v){v.target.removeEventListener("dispose",y);for(let _ in c){let w=c[_],C=v.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function J_(n,t){function e(){let D=!1,rt=new Se,st=null,xt=new Se(0,0,0,0);return{setMask:function(gt){st!==gt&&!D&&(n.colorMask(gt,gt,gt,gt),st=gt)},setLocked:function(gt){D=gt},setClear:function(gt,ut,Ot,Bt,xe){xe===!0&&(gt*=Bt,ut*=Bt,Ot*=Bt),rt.set(gt,ut,Ot,Bt),xt.equals(rt)===!1&&(n.clearColor(gt,ut,Ot,Bt),xt.copy(rt))},reset:function(){D=!1,st=null,xt.set(-1,0,0,0)}}}function i(){let D=!1,rt=!1,st=null,xt=null,gt=null;return{setReversed:function(ut){if(rt!==ut){let Ot=t.get("EXT_clip_control");ut?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),rt=ut;let Bt=gt;gt=null,this.setClear(Bt)}},getReversed:function(){return rt},setTest:function(ut){ut?ot(n.DEPTH_TEST):bt(n.DEPTH_TEST)},setMask:function(ut){st!==ut&&!D&&(n.depthMask(ut),st=ut)},setFunc:function(ut){if(rt&&(ut=wu[ut]),xt!==ut){switch(ut){case wa:n.depthFunc(n.NEVER);break;case Aa:n.depthFunc(n.ALWAYS);break;case Ra:n.depthFunc(n.LESS);break;case fs:n.depthFunc(n.LEQUAL);break;case Ca:n.depthFunc(n.EQUAL);break;case Pa:n.depthFunc(n.GEQUAL);break;case Ia:n.depthFunc(n.GREATER);break;case La:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xt=ut}},setLocked:function(ut){D=ut},setClear:function(ut){gt!==ut&&(gt=ut,rt&&(ut=1-ut),n.clearDepth(ut))},reset:function(){D=!1,st=null,xt=null,gt=null,rt=!1}}}function s(){let D=!1,rt=null,st=null,xt=null,gt=null,ut=null,Ot=null,Bt=null,xe=null;return{setTest:function(ue){D||(ue?ot(n.STENCIL_TEST):bt(n.STENCIL_TEST))},setMask:function(ue){rt!==ue&&!D&&(n.stencilMask(ue),rt=ue)},setFunc:function(ue,Tn,Nn){(st!==ue||xt!==Tn||gt!==Nn)&&(n.stencilFunc(ue,Tn,Nn),st=ue,xt=Tn,gt=Nn)},setOp:function(ue,Tn,Nn){(ut!==ue||Ot!==Tn||Bt!==Nn)&&(n.stencilOp(ue,Tn,Nn),ut=ue,Ot=Tn,Bt=Nn)},setLocked:function(ue){D=ue},setClear:function(ue){xe!==ue&&(n.clearStencil(ue),xe=ue)},reset:function(){D=!1,rt=null,st=null,xt=null,gt=null,ut=null,Ot=null,Bt=null,xe=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],S=null,m=!1,p=null,T=null,L=null,b=null,y=null,v=null,A=null,_=new Kt(0,0,0),w=0,C=!1,B=null,N=null,G=null,F=null,U=null,$=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,O=0,P=n.getParameter(n.VERSION);P.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(P)[1]),W=O>=1):P.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),W=O>=2);let I=null,X={},at=n.getParameter(n.SCISSOR_BOX),et=n.getParameter(n.VIEWPORT),vt=new Se().fromArray(at),Tt=new Se().fromArray(et);function Ht(D,rt,st,xt){let gt=new Uint8Array(4),ut=n.createTexture();n.bindTexture(D,ut),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ot=0;Ot<st;Ot++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,xt,0,n.RGBA,n.UNSIGNED_BYTE,gt):n.texImage2D(rt+Ot,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,gt);return ut}let Q={};Q[n.TEXTURE_2D]=Ht(n.TEXTURE_2D,n.TEXTURE_2D,1),Q[n.TEXTURE_CUBE_MAP]=Ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[n.TEXTURE_2D_ARRAY]=Ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Q[n.TEXTURE_3D]=Ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(n.DEPTH_TEST),a.setFunc(fs),mt(!1),pt(Kl),ot(n.CULL_FACE),ft(Gn);function ot(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function bt(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Pt(D,rt){return d[D]!==rt?(n.bindFramebuffer(D,rt),d[D]=rt,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=rt),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function wt(D,rt){let st=g,xt=!1;if(D){st=f.get(rt),st===void 0&&(st=[],f.set(rt,st));let gt=D.textures;if(st.length!==gt.length||st[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,Ot=gt.length;ut<Ot;ut++)st[ut]=n.COLOR_ATTACHMENT0+ut;st.length=gt.length,xt=!0}}else st[0]!==n.BACK&&(st[0]=n.BACK,xt=!0);xt&&n.drawBuffers(st)}function Gt(D){return S!==D?(n.useProgram(D),S=D,!0):!1}let Wt={[Gi]:n.FUNC_ADD,[Yh]:n.FUNC_SUBTRACT,[Zh]:n.FUNC_REVERSE_SUBTRACT};Wt[$h]=n.MIN,Wt[Jh]=n.MAX;let lt={[jh]:n.ZERO,[Kh]:n.ONE,[Qh]:n.SRC_COLOR,[ec]:n.SRC_ALPHA,[ru]:n.SRC_ALPHA_SATURATE,[iu]:n.DST_COLOR,[eu]:n.DST_ALPHA,[tu]:n.ONE_MINUS_SRC_COLOR,[nc]:n.ONE_MINUS_SRC_ALPHA,[su]:n.ONE_MINUS_DST_COLOR,[nu]:n.ONE_MINUS_DST_ALPHA,[au]:n.CONSTANT_COLOR,[ou]:n.ONE_MINUS_CONSTANT_COLOR,[lu]:n.CONSTANT_ALPHA,[cu]:n.ONE_MINUS_CONSTANT_ALPHA};function ft(D,rt,st,xt,gt,ut,Ot,Bt,xe,ue){if(D===Gn){m===!0&&(bt(n.BLEND),m=!1);return}if(m===!1&&(ot(n.BLEND),m=!0),D!==qh){if(D!==p||ue!==C){if((T!==Gi||y!==Gi)&&(n.blendEquation(n.FUNC_ADD),T=Gi,y=Gi),ue)switch(D){case Rs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lr:n.blendFunc(n.ONE,n.ONE);break;case Ql:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case tc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:$t("WebGLState: Invalid blending: ",D);break}else switch(D){case Rs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ql:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tc:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",D);break}L=null,b=null,v=null,A=null,_.set(0,0,0),w=0,p=D,C=ue}return}gt=gt||rt,ut=ut||st,Ot=Ot||xt,(rt!==T||gt!==y)&&(n.blendEquationSeparate(Wt[rt],Wt[gt]),T=rt,y=gt),(st!==L||xt!==b||ut!==v||Ot!==A)&&(n.blendFuncSeparate(lt[st],lt[xt],lt[ut],lt[Ot]),L=st,b=xt,v=ut,A=Ot),(Bt.equals(_)===!1||xe!==w)&&(n.blendColor(Bt.r,Bt.g,Bt.b,xe),_.copy(Bt),w=xe),p=D,C=!1}function ht(D,rt){D.side===qe?bt(n.CULL_FACE):ot(n.CULL_FACE);let st=D.side===Xe;rt&&(st=!st),mt(st),D.blending===Rs&&D.transparent===!1?ft(Gn):ft(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let xt=D.stencilWrite;o.setTest(xt),xt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),kt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(n.SAMPLE_ALPHA_TO_COVERAGE):bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function mt(D){B!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),B=D)}function pt(D){D!==Wh?(ot(n.CULL_FACE),D!==N&&(D===Kl?n.cullFace(n.BACK):D===Xh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):bt(n.CULL_FACE),N=D}function Vt(D){D!==G&&(W&&n.lineWidth(D),G=D)}function kt(D,rt,st){D?(ot(n.POLYGON_OFFSET_FILL),(F!==rt||U!==st)&&(F=rt,U=st,a.getReversed()&&(rt=-rt),n.polygonOffset(rt,st))):bt(n.POLYGON_OFFSET_FILL)}function Xt(D){D?ot(n.SCISSOR_TEST):bt(n.SCISSOR_TEST)}function qt(D){D===void 0&&(D=n.TEXTURE0+$-1),I!==D&&(n.activeTexture(D),I=D)}function k(D,rt,st){st===void 0&&(I===null?st=n.TEXTURE0+$-1:st=I);let xt=X[st];xt===void 0&&(xt={type:void 0,texture:void 0},X[st]=xt),(xt.type!==D||xt.texture!==rt)&&(I!==st&&(n.activeTexture(st),I=st),n.bindTexture(D,rt||Q[D]),xt.type=D,xt.texture=rt)}function te(){let D=X[I];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ee(){try{n.compressedTexImage2D(...arguments)}catch(D){$t("WebGLState:",D)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(D){$t("WebGLState:",D)}}function x(){try{n.texSubImage2D(...arguments)}catch(D){$t("WebGLState:",D)}}function Z(){try{n.texSubImage3D(...arguments)}catch(D){$t("WebGLState:",D)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(D){$t("WebGLState:",D)}}function E(){try{n.compressedTexSubImage3D(...arguments)}catch(D){$t("WebGLState:",D)}}function Y(){try{n.texStorage2D(...arguments)}catch(D){$t("WebGLState:",D)}}function nt(){try{n.texStorage3D(...arguments)}catch(D){$t("WebGLState:",D)}}function V(){try{n.texImage2D(...arguments)}catch(D){$t("WebGLState:",D)}}function q(){try{n.texImage3D(...arguments)}catch(D){$t("WebGLState:",D)}}function dt(D){return u[D]!==void 0?u[D]:n.getParameter(D)}function St(D,rt){u[D]!==rt&&(n.pixelStorei(D,rt),u[D]=rt)}function yt(D){vt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),vt.copy(D))}function Mt(D){Tt.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Tt.copy(D))}function Et(D,rt){let st=c.get(rt);st===void 0&&(st=new WeakMap,c.set(rt,st));let xt=st.get(D);xt===void 0&&(xt=n.getUniformBlockIndex(rt,D.name),st.set(D,xt))}function Nt(D,rt){let xt=c.get(rt).get(D);l.get(rt)!==xt&&(n.uniformBlockBinding(rt,xt,D.__bindingPointIndex),l.set(rt,xt))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},I=null,X={},d={},f=new WeakMap,g=[],S=null,m=!1,p=null,T=null,L=null,b=null,y=null,v=null,A=null,_=new Kt(0,0,0),w=0,C=!1,B=null,N=null,G=null,F=null,U=null,vt.set(0,0,n.canvas.width,n.canvas.height),Tt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:bt,bindFramebuffer:Pt,drawBuffers:wt,useProgram:Gt,setBlending:ft,setMaterial:ht,setFlipSided:mt,setCullFace:pt,setLineWidth:Vt,setPolygonOffset:kt,setScissorTest:Xt,activeTexture:qt,bindTexture:k,unbindTexture:te,compressedTexImage2D:ee,compressedTexImage3D:R,texImage2D:V,texImage3D:q,pixelStorei:St,getParameter:dt,updateUBOMapping:Et,uniformBlockBinding:Nt,texStorage2D:Y,texStorage3D:nt,texSubImage2D:x,texSubImage3D:Z,compressedTexSubImage2D:K,compressedTexSubImage3D:E,scissor:yt,viewport:Mt,reset:it}}function j_(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(R,x){return g?new OffscreenCanvas(R,x):nr("canvas")}function m(R,x,Z){let K=1,E=ee(R);if((E.width>Z||E.height>Z)&&(K=Z/Math.max(E.width,E.height)),K<1)if(typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&R instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&R instanceof ImageBitmap||typeof VideoFrame!="undefined"&&R instanceof VideoFrame){let Y=Math.floor(K*E.width),nt=Math.floor(K*E.height);d===void 0&&(d=S(Y,nt));let V=x?S(Y,nt):d;return V.width=Y,V.height=nt,V.getContext("2d").drawImage(R,0,0,Y,nt),Yt("WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Y+"x"+nt+")."),V}else return"data"in R&&Yt("WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),R;return R}function p(R){return R.generateMipmaps}function T(R){n.generateMipmap(R)}function L(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(R,x,Z,K,E,Y=!1){if(R!==null){if(n[R]!==void 0)return n[R];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let nt;K&&(nt=t.get("EXT_texture_norm16"),nt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let V=x;if(x===n.RED&&(Z===n.FLOAT&&(V=n.R32F),Z===n.HALF_FLOAT&&(V=n.R16F),Z===n.UNSIGNED_BYTE&&(V=n.R8),Z===n.UNSIGNED_SHORT&&nt&&(V=nt.R16_EXT),Z===n.SHORT&&nt&&(V=nt.R16_SNORM_EXT)),x===n.RED_INTEGER&&(Z===n.UNSIGNED_BYTE&&(V=n.R8UI),Z===n.UNSIGNED_SHORT&&(V=n.R16UI),Z===n.UNSIGNED_INT&&(V=n.R32UI),Z===n.BYTE&&(V=n.R8I),Z===n.SHORT&&(V=n.R16I),Z===n.INT&&(V=n.R32I)),x===n.RG&&(Z===n.FLOAT&&(V=n.RG32F),Z===n.HALF_FLOAT&&(V=n.RG16F),Z===n.UNSIGNED_BYTE&&(V=n.RG8),Z===n.UNSIGNED_SHORT&&nt&&(V=nt.RG16_EXT),Z===n.SHORT&&nt&&(V=nt.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(Z===n.UNSIGNED_BYTE&&(V=n.RG8UI),Z===n.UNSIGNED_SHORT&&(V=n.RG16UI),Z===n.UNSIGNED_INT&&(V=n.RG32UI),Z===n.BYTE&&(V=n.RG8I),Z===n.SHORT&&(V=n.RG16I),Z===n.INT&&(V=n.RG32I)),x===n.RGB_INTEGER&&(Z===n.UNSIGNED_BYTE&&(V=n.RGB8UI),Z===n.UNSIGNED_SHORT&&(V=n.RGB16UI),Z===n.UNSIGNED_INT&&(V=n.RGB32UI),Z===n.BYTE&&(V=n.RGB8I),Z===n.SHORT&&(V=n.RGB16I),Z===n.INT&&(V=n.RGB32I)),x===n.RGBA_INTEGER&&(Z===n.UNSIGNED_BYTE&&(V=n.RGBA8UI),Z===n.UNSIGNED_SHORT&&(V=n.RGBA16UI),Z===n.UNSIGNED_INT&&(V=n.RGBA32UI),Z===n.BYTE&&(V=n.RGBA8I),Z===n.SHORT&&(V=n.RGBA16I),Z===n.INT&&(V=n.RGBA32I)),x===n.RGB&&(Z===n.UNSIGNED_SHORT&&nt&&(V=nt.RGB16_EXT),Z===n.SHORT&&nt&&(V=nt.RGB16_SNORM_EXT),Z===n.UNSIGNED_INT_5_9_9_9_REV&&(V=n.RGB9_E5),Z===n.UNSIGNED_INT_10F_11F_11F_REV&&(V=n.R11F_G11F_B10F)),x===n.RGBA){let q=Y?er:ae.getTransfer(E);Z===n.FLOAT&&(V=n.RGBA32F),Z===n.HALF_FLOAT&&(V=n.RGBA16F),Z===n.UNSIGNED_BYTE&&(V=q===fe?n.SRGB8_ALPHA8:n.RGBA8),Z===n.UNSIGNED_SHORT&&nt&&(V=nt.RGBA16_EXT),Z===n.SHORT&&nt&&(V=nt.RGBA16_SNORM_EXT),Z===n.UNSIGNED_SHORT_4_4_4_4&&(V=n.RGBA4),Z===n.UNSIGNED_SHORT_5_5_5_1&&(V=n.RGB5_A1)}return(V===n.R16F||V===n.R32F||V===n.RG16F||V===n.RG32F||V===n.RGBA16F||V===n.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function y(R,x){let Z;return R?x===null||x===Ln||x===Ps?Z=n.DEPTH24_STENCIL8:x===Mn?Z=n.DEPTH32F_STENCIL8:x===Cs&&(Z=n.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ln||x===Ps?Z=n.DEPTH_COMPONENT24:x===Mn?Z=n.DEPTH_COMPONENT32F:x===Cs&&(Z=n.DEPTH_COMPONENT16),Z}function v(R,x){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==ke&&R.minFilter!==He?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function A(R){let x=R.target;x.removeEventListener("dispose",A),w(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(R){let x=R.target;x.removeEventListener("dispose",_),B(x)}function w(R){let x=i.get(R);if(x.__webglInit===void 0)return;let Z=R.source,K=f.get(Z);if(K){let E=K[x.__cacheKey];E.usedTimes--,E.usedTimes===0&&C(R),Object.keys(K).length===0&&f.delete(Z)}i.remove(R)}function C(R){let x=i.get(R);n.deleteTexture(x.__webglTexture);let Z=R.source,K=f.get(Z);delete K[x.__cacheKey],a.memory.textures--}function B(R){let x=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let E=0;E<x.__webglFramebuffer[K].length;E++)n.deleteFramebuffer(x.__webglFramebuffer[K][E]);else n.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)n.deleteFramebuffer(x.__webglFramebuffer[K]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let Z=R.textures;for(let K=0,E=Z.length;K<E;K++){let Y=i.get(Z[K]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(Z[K])}i.remove(R)}let N=0;function G(){N=0}function F(){return N}function U(R){N=R}function $(){let R=N;return R>=s.maxTextures&&Yt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,R}function W(R){let x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function O(R,x){let Z=i.get(R);if(R.isVideoTexture&&k(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&Z.__version!==R.version){let K=R.image;if(K===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{bt(Z,R,x);return}}else R.isExternalTexture&&(Z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,Z.__webglTexture,n.TEXTURE0+x)}function P(R,x){let Z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){bt(Z,R,x);return}else R.isExternalTexture&&(Z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,Z.__webglTexture,n.TEXTURE0+x)}function I(R,x){let Z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&Z.__version!==R.version){bt(Z,R,x);return}e.bindTexture(n.TEXTURE_3D,Z.__webglTexture,n.TEXTURE0+x)}function X(R,x){let Z=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&Z.__version!==R.version){Pt(Z,R,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture,n.TEXTURE0+x)}let at={[ps]:n.REPEAT,[On]:n.CLAMP_TO_EDGE,[Da]:n.MIRRORED_REPEAT},et={[ke]:n.NEAREST,[du]:n.NEAREST_MIPMAP_NEAREST,[Ur]:n.NEAREST_MIPMAP_LINEAR,[He]:n.LINEAR,[uo]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},vt={[gu]:n.NEVER,[bu]:n.ALWAYS,[_u]:n.LESS,[jo]:n.LEQUAL,[xu]:n.EQUAL,[Ko]:n.GEQUAL,[yu]:n.GREATER,[vu]:n.NOTEQUAL};function Tt(R,x){if(x.type===Mn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===He||x.magFilter===uo||x.magFilter===Ur||x.magFilter===Ti||x.minFilter===He||x.minFilter===uo||x.minFilter===Ur||x.minFilter===Ti)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,at[x.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,at[x.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,at[x.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,et[x.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,et[x.minFilter]),x.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,vt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ke||x.minFilter!==Ur&&x.minFilter!==Ti||x.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let Z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ht(R,x){let Z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",A));let K=x.source,E=f.get(K);E===void 0&&(E={},f.set(K,E));let Y=W(x);if(Y!==R.__cacheKey){E[Y]===void 0&&(E[Y]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,Z=!0),E[Y].usedTimes++;let nt=E[R.__cacheKey];nt!==void 0&&(E[R.__cacheKey].usedTimes--,nt.usedTimes===0&&C(x)),R.__cacheKey=Y,R.__webglTexture=E[Y].texture}return Z}function Q(R,x,Z){return Math.floor(Math.floor(R/Z)/x)}function ot(R,x,Z,K){let Y=R.updateRanges;if(Y.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,Z,K,x.data);else{Y.sort((St,yt)=>St.start-yt.start);let nt=0;for(let St=1;St<Y.length;St++){let yt=Y[nt],Mt=Y[St],Et=yt.start+yt.count,Nt=Q(Mt.start,x.width,4),it=Q(yt.start,x.width,4);Mt.start<=Et+1&&Nt===it&&Q(Mt.start+Mt.count-1,x.width,4)===Nt?yt.count=Math.max(yt.count,Mt.start+Mt.count-yt.start):(++nt,Y[nt]=Mt)}Y.length=nt+1;let V=e.getParameter(n.UNPACK_ROW_LENGTH),q=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let St=0,yt=Y.length;St<yt;St++){let Mt=Y[St],Et=Math.floor(Mt.start/4),Nt=Math.ceil(Mt.count/4),it=Et%x.width,D=Math.floor(Et/x.width),rt=Nt,st=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,it),e.pixelStorei(n.UNPACK_SKIP_ROWS,D),e.texSubImage2D(n.TEXTURE_2D,0,it,D,rt,st,Z,K,x.data)}R.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,V),e.pixelStorei(n.UNPACK_SKIP_PIXELS,q),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function bt(R,x,Z){let K=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=n.TEXTURE_3D);let E=Ht(R,x),Y=x.source;e.bindTexture(K,R.__webglTexture,n.TEXTURE0+Z);let nt=i.get(Y);if(Y.version!==nt.__version||E===!0){if(e.activeTexture(n.TEXTURE0+Z),(typeof ImageBitmap!="undefined"&&x.image instanceof ImageBitmap)===!1){let st=ae.getPrimaries(ae.workingColorSpace),xt=x.colorSpace===ti?null:ae.getPrimaries(x.colorSpace),gt=x.colorSpace===ti||st===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let q=m(x.image,!1,s.maxTextureSize);q=te(x,q);let dt=r.convert(x.format,x.colorSpace),St=r.convert(x.type),yt=b(x.internalFormat,dt,St,x.normalized,x.colorSpace,x.isVideoTexture);Tt(K,x);let Mt,Et=x.mipmaps,Nt=x.isVideoTexture!==!0,it=nt.__version===void 0||E===!0,D=Y.dataReady,rt=v(x,q);if(x.isDepthTexture)yt=y(x.format===wi,x.type),it&&(Nt?e.texStorage2D(n.TEXTURE_2D,1,yt,q.width,q.height):e.texImage2D(n.TEXTURE_2D,0,yt,q.width,q.height,0,dt,St,null));else if(x.isDataTexture)if(Et.length>0){Nt&&it&&e.texStorage2D(n.TEXTURE_2D,rt,yt,Et[0].width,Et[0].height);for(let st=0,xt=Et.length;st<xt;st++)Mt=Et[st],Nt?D&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,dt,St,Mt.data):e.texImage2D(n.TEXTURE_2D,st,yt,Mt.width,Mt.height,0,dt,St,Mt.data);x.generateMipmaps=!1}else Nt?(it&&e.texStorage2D(n.TEXTURE_2D,rt,yt,q.width,q.height),D&&ot(x,q,dt,St)):e.texImage2D(n.TEXTURE_2D,0,yt,q.width,q.height,0,dt,St,q.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Nt&&it&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,yt,Et[0].width,Et[0].height,q.depth);for(let st=0,xt=Et.length;st<xt;st++)if(Mt=Et[st],x.format!==Sn)if(dt!==null)if(Nt){if(D)if(x.layerUpdates.size>0){let gt=Tc(Mt.width,Mt.height,x.format,x.type);for(let ut of x.layerUpdates){let Ot=Mt.data.subarray(ut*gt/Mt.data.BYTES_PER_ELEMENT,(ut+1)*gt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,ut,Mt.width,Mt.height,1,dt,Ot)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,Mt.width,Mt.height,q.depth,dt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,st,yt,Mt.width,Mt.height,q.depth,0,Mt.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,st,0,0,0,Mt.width,Mt.height,q.depth,dt,St,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,st,yt,Mt.width,Mt.height,q.depth,0,dt,St,Mt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Nt&&it&&e.texStorage2D(n.TEXTURE_2D,rt,yt,Et[0].width,Et[0].height);for(let st=0,xt=Et.length;st<xt;st++)Mt=Et[st],x.format!==Sn?dt!==null?Nt?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,dt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,st,yt,Mt.width,Mt.height,0,Mt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?D&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,Mt.width,Mt.height,dt,St,Mt.data):e.texImage2D(n.TEXTURE_2D,st,yt,Mt.width,Mt.height,0,dt,St,Mt.data)}else if(x.isDataArrayTexture)if(Nt){if(it&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,yt,q.width,q.height,q.depth),D)if(x.layerUpdates.size>0){let st=Tc(q.width,q.height,x.format,x.type);for(let xt of x.layerUpdates){let gt=q.data.subarray(xt*st/q.data.BYTES_PER_ELEMENT,(xt+1)*st/q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,xt,q.width,q.height,1,dt,St,gt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,dt,St,q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,yt,q.width,q.height,q.depth,0,dt,St,q.data);else if(x.isData3DTexture)Nt?(it&&e.texStorage3D(n.TEXTURE_3D,rt,yt,q.width,q.height,q.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,dt,St,q.data)):e.texImage3D(n.TEXTURE_3D,0,yt,q.width,q.height,q.depth,0,dt,St,q.data);else if(x.isFramebufferTexture){if(it)if(Nt)e.texStorage2D(n.TEXTURE_2D,rt,yt,q.width,q.height);else{let st=q.width,xt=q.height;for(let gt=0;gt<rt;gt++)e.texImage2D(n.TEXTURE_2D,gt,yt,st,xt,0,dt,St,null),st>>=1,xt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){let st=n.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),q.parentNode!==st){st.appendChild(q),u.add(x),st.onpaint=xt=>{let gt=xt.changedElements;for(let ut of u)gt.includes(ut.image)&&(ut.needsUpdate=!0)},st.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,q);else{let gt=n.RGBA,ut=n.RGBA,Ot=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,gt,ut,Ot,q)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Et.length>0){if(Nt&&it){let st=ee(Et[0]);e.texStorage2D(n.TEXTURE_2D,rt,yt,st.width,st.height)}for(let st=0,xt=Et.length;st<xt;st++)Mt=Et[st],Nt?D&&e.texSubImage2D(n.TEXTURE_2D,st,0,0,dt,St,Mt):e.texImage2D(n.TEXTURE_2D,st,yt,dt,St,Mt);x.generateMipmaps=!1}else if(Nt){if(it){let st=ee(q);e.texStorage2D(n.TEXTURE_2D,rt,yt,st.width,st.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,St,q)}else e.texImage2D(n.TEXTURE_2D,0,yt,dt,St,q);p(x)&&T(K),nt.__version=Y.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Pt(R,x,Z){if(x.image.length!==6)return;let K=Ht(R,x),E=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+Z);let Y=i.get(E);if(E.version!==Y.__version||K===!0){e.activeTexture(n.TEXTURE0+Z);let nt=ae.getPrimaries(ae.workingColorSpace),V=x.colorSpace===ti?null:ae.getPrimaries(x.colorSpace),q=x.colorSpace===ti||nt===V?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let dt=x.isCompressedTexture||x.image[0].isCompressedTexture,St=x.image[0]&&x.image[0].isDataTexture,yt=[];for(let ut=0;ut<6;ut++)!dt&&!St?yt[ut]=m(x.image[ut],!0,s.maxCubemapSize):yt[ut]=St?x.image[ut].image:x.image[ut],yt[ut]=te(x,yt[ut]);let Mt=yt[0],Et=r.convert(x.format,x.colorSpace),Nt=r.convert(x.type),it=b(x.internalFormat,Et,Nt,x.normalized,x.colorSpace),D=x.isVideoTexture!==!0,rt=Y.__version===void 0||K===!0,st=E.dataReady,xt=v(x,Mt);Tt(n.TEXTURE_CUBE_MAP,x);let gt;if(dt){D&&rt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,it,Mt.width,Mt.height);for(let ut=0;ut<6;ut++){gt=yt[ut].mipmaps;for(let Ot=0;Ot<gt.length;Ot++){let Bt=gt[Ot];x.format!==Sn?Et!==null?D?st&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,0,0,Bt.width,Bt.height,Et,Bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,it,Bt.width,Bt.height,0,Bt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,0,0,Bt.width,Bt.height,Et,Nt,Bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,it,Bt.width,Bt.height,0,Et,Nt,Bt.data)}}}else{if(gt=x.mipmaps,D&&rt){gt.length>0&&xt++;let ut=ee(yt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,it,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(St){D?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,yt[ut].width,yt[ut].height,Et,Nt,yt[ut].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,it,yt[ut].width,yt[ut].height,0,Et,Nt,yt[ut].data);for(let Ot=0;Ot<gt.length;Ot++){let xe=gt[Ot].image[ut].image;D?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,0,0,xe.width,xe.height,Et,Nt,xe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,it,xe.width,xe.height,0,Et,Nt,xe.data)}}else{D?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Et,Nt,yt[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,it,Et,Nt,yt[ut]);for(let Ot=0;Ot<gt.length;Ot++){let Bt=gt[Ot];D?st&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,0,0,Et,Nt,Bt.image[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,it,Et,Nt,Bt.image[ut])}}}p(x)&&T(n.TEXTURE_CUBE_MAP),Y.__version=E.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function wt(R,x,Z,K,E,Y){let nt=r.convert(Z.format,Z.colorSpace),V=r.convert(Z.type),q=b(Z.internalFormat,nt,V,Z.normalized,Z.colorSpace),dt=i.get(x),St=i.get(Z);if(St.__renderTarget=x,!dt.__hasExternalTextures){let yt=Math.max(1,x.width>>Y),Mt=Math.max(1,x.height>>Y);E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY?e.texImage3D(E,Y,q,yt,Mt,x.depth,0,nt,V,null):e.texImage2D(E,Y,q,yt,Mt,0,nt,V,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,E,St.__webglTexture,0,Xt(x)):(E===n.TEXTURE_2D||E>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&E<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,E,St.__webglTexture,Y),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(R,x,Z){if(n.bindRenderbuffer(n.RENDERBUFFER,R),x.depthBuffer){let K=x.depthTexture,E=K&&K.isDepthTexture?K.type:null,Y=y(x.stencilBuffer,E),nt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(x),Y,x.width,x.height):Z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(x),Y,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Y,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,R)}else{let K=x.textures;for(let E=0;E<K.length;E++){let Y=K[E],nt=r.convert(Y.format,Y.colorSpace),V=r.convert(Y.type),q=b(Y.internalFormat,nt,V,Y.normalized,Y.colorSpace);qt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(x),q,x.width,x.height):Z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(x),q,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,q,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Wt(R,x,Z){let K=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let E=i.get(x.depthTexture);if(E.__renderTarget=x,(!E.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),K){if(E.__webglInit===void 0&&(E.__webglInit=!0,x.depthTexture.addEventListener("dispose",A)),E.__webglTexture===void 0){E.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture),Tt(n.TEXTURE_CUBE_MAP,x.depthTexture);let dt=r.convert(x.depthTexture.format),St=r.convert(x.depthTexture.type),yt;x.depthTexture.format===Bn?yt=n.DEPTH_COMPONENT24:x.depthTexture.format===wi&&(yt=n.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,yt,x.width,x.height,0,dt,St,null)}}else O(x.depthTexture,0);let Y=E.__webglTexture,nt=Xt(x),V=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+Z:n.TEXTURE_2D,q=x.depthTexture.format===wi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Bn)qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,V,Y,0,nt):n.framebufferTexture2D(n.FRAMEBUFFER,q,V,Y,0);else if(x.depthTexture.format===wi)qt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,V,Y,0,nt):n.framebufferTexture2D(n.FRAMEBUFFER,q,V,Y,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(R){let x=i.get(R),Z=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){let K=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){let E=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",E)};K.addEventListener("dispose",E),x.__depthDisposeCallback=E}x.__boundDepthTexture=K}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(Z)for(let K=0;K<6;K++)Wt(x.__webglFramebuffer[K],R,K);else{let K=R.texture.mipmaps;K&&K.length>0?Wt(x.__webglFramebuffer[0],R,0):Wt(x.__webglFramebuffer,R,0)}else if(Z){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=n.createRenderbuffer(),Gt(x.__webglDepthbuffer[K],R,!1);else{let E=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,E,n.RENDERBUFFER,Y)}}else{let K=R.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Gt(x.__webglDepthbuffer,R,!1);else{let E=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,E,n.RENDERBUFFER,Y)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(R,x,Z){let K=i.get(R);x!==void 0&&wt(K.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Z!==void 0&&lt(R)}function ht(R){let x=R.texture,Z=i.get(R),K=i.get(x);R.addEventListener("dispose",_);let E=R.textures,Y=R.isWebGLCubeRenderTarget===!0,nt=E.length>1;if(nt||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=x.version,a.memory.textures++),Y){Z.__webglFramebuffer=[];for(let V=0;V<6;V++)if(x.mipmaps&&x.mipmaps.length>0){Z.__webglFramebuffer[V]=[];for(let q=0;q<x.mipmaps.length;q++)Z.__webglFramebuffer[V][q]=n.createFramebuffer()}else Z.__webglFramebuffer[V]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){Z.__webglFramebuffer=[];for(let V=0;V<x.mipmaps.length;V++)Z.__webglFramebuffer[V]=n.createFramebuffer()}else Z.__webglFramebuffer=n.createFramebuffer();if(nt)for(let V=0,q=E.length;V<q;V++){let dt=i.get(E[V]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&qt(R)===!1){Z.__webglMultisampledFramebuffer=n.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let V=0;V<E.length;V++){let q=E[V];Z.__webglColorRenderbuffer[V]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Z.__webglColorRenderbuffer[V]);let dt=r.convert(q.format,q.colorSpace),St=r.convert(q.type),yt=b(q.internalFormat,dt,St,q.normalized,q.colorSpace,R.isXRRenderTarget===!0),Mt=Xt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,yt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+V,n.RENDERBUFFER,Z.__webglColorRenderbuffer[V])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(Z.__webglDepthRenderbuffer=n.createRenderbuffer(),Gt(Z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Tt(n.TEXTURE_CUBE_MAP,x);for(let V=0;V<6;V++)if(x.mipmaps&&x.mipmaps.length>0)for(let q=0;q<x.mipmaps.length;q++)wt(Z.__webglFramebuffer[V][q],R,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+V,q);else wt(Z.__webglFramebuffer[V],R,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);p(x)&&T(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(nt){for(let V=0,q=E.length;V<q;V++){let dt=E[V],St=i.get(dt),yt=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(yt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(yt,St.__webglTexture),Tt(yt,dt),wt(Z.__webglFramebuffer,R,dt,n.COLOR_ATTACHMENT0+V,yt,0),p(dt)&&T(yt)}e.unbindTexture()}else{let V=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(V=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(V,K.__webglTexture),Tt(V,x),x.mipmaps&&x.mipmaps.length>0)for(let q=0;q<x.mipmaps.length;q++)wt(Z.__webglFramebuffer[q],R,x,n.COLOR_ATTACHMENT0,V,q);else wt(Z.__webglFramebuffer,R,x,n.COLOR_ATTACHMENT0,V,0);p(x)&&T(V),e.unbindTexture()}R.depthBuffer&&lt(R)}function mt(R){let x=R.textures;for(let Z=0,K=x.length;Z<K;Z++){let E=x[Z];if(p(E)){let Y=L(R),nt=i.get(E).__webglTexture;e.bindTexture(Y,nt),T(Y),e.unbindTexture()}}}let pt=[],Vt=[];function kt(R){if(R.samples>0){if(qt(R)===!1){let x=R.textures,Z=R.width,K=R.height,E=n.COLOR_BUFFER_BIT,Y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=i.get(R),V=x.length>1;if(V)for(let dt=0;dt<x.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,nt.__webglMultisampledFramebuffer);let q=R.texture.mipmaps;q&&q.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,nt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,nt.__webglFramebuffer);for(let dt=0;dt<x.length;dt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(E|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(E|=n.STENCIL_BUFFER_BIT)),V){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,nt.__webglColorRenderbuffer[dt]);let St=i.get(x[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,St,0)}n.blitFramebuffer(0,0,Z,K,0,0,Z,K,E,n.NEAREST),l===!0&&(pt.length=0,Vt.length=0,pt.push(n.COLOR_ATTACHMENT0+dt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(pt.push(Y),Vt.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Vt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,pt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),V)for(let dt=0;dt<x.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,nt.__webglColorRenderbuffer[dt]);let St=i.get(x[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,St,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,nt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let x=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Xt(R){return Math.min(s.maxSamples,R.samples)}function qt(R){let x=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function k(R){let x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function te(R,x){let Z=R.colorSpace,K=R.format,E=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Z!==tr&&Z!==ti&&(ae.getTransfer(Z)===fe?(K!==Sn||E!==on)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",Z)),x}function ee(R){return typeof HTMLImageElement!="undefined"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame!="undefined"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=G,this.getTextureUnits=F,this.setTextureUnits=U,this.setTexture2D=O,this.setTexture2DArray=P,this.setTexture3D=I,this.setTextureCube=X,this.rebindTextures=ft,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=qt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function K_(n,t){function e(i,s=ti){let r,a=ae.getTransfer(s);if(i===on)return n.UNSIGNED_BYTE;if(i===po)return n.UNSIGNED_SHORT_4_4_4_4;if(i===mo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===fc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===pc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===uc)return n.BYTE;if(i===dc)return n.SHORT;if(i===Cs)return n.UNSIGNED_SHORT;if(i===fo)return n.INT;if(i===Ln)return n.UNSIGNED_INT;if(i===Mn)return n.FLOAT;if(i===Dn)return n.HALF_FLOAT;if(i===mc)return n.ALPHA;if(i===gc)return n.RGB;if(i===Sn)return n.RGBA;if(i===Bn)return n.DEPTH_COMPONENT;if(i===wi)return n.DEPTH_STENCIL;if(i===go)return n.RED;if(i===_o)return n.RED_INTEGER;if(i===Ai)return n.RG;if(i===xo)return n.RG_INTEGER;if(i===yo)return n.RGBA_INTEGER;if(i===Fr||i===Or||i===Br||i===kr)if(a===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vo||i===bo||i===Mo||i===So)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Eo||i===To||i===wo||i===Ao||i===Ro||i===zr||i===Co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Eo||i===To)return a===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ao)return r.COMPRESSED_R11_EAC;if(i===Ro)return r.COMPRESSED_SIGNED_R11_EAC;if(i===zr)return r.COMPRESSED_RG11_EAC;if(i===Co)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Po||i===Io||i===Lo||i===Do||i===No||i===Uo||i===Fo||i===Oo||i===Bo||i===ko||i===zo||i===Go||i===Vo||i===Ho)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Po)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Io)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Lo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Do)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===No)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Uo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Oo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ko)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===zo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Go)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vo)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ho)return a===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Wo||i===Xo||i===qo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Wo)return a===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Yo||i===Zo||i===Gr||i===$o)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Yo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ps?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tx=`
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

}`,Wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new dr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new _n({vertexShader:Q_,fragmentShader:tx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ze(new Ne(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xc=class extends Pn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,S=typeof XRWebGLBinding!="undefined",m=new Wc,p={},T=e.getContextAttributes(),L=null,b=null,y=[],v=[],A=new _t,_=null,w=null,C=new Je;C.viewport=new Se;let B=new Je;B.viewport=new Se;let N=[C,B],G=new ao,F=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ot=y[Q];return ot===void 0&&(ot=new ys,y[Q]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(Q){let ot=y[Q];return ot===void 0&&(ot=new ys,y[Q]=ot),ot.getGripSpace()},this.getHand=function(Q){let ot=y[Q];return ot===void 0&&(ot=new ys,y[Q]=ot),ot.getHandSpace()};function $(Q){let ot=v.indexOf(Q.inputSource);if(ot===-1)return;let bt=y[ot];bt!==void 0&&(bt.update(Q.inputSource,Q.frame,c||a),bt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",O);for(let Q=0;Q<y.length;Q++){let ot=v[Q];ot!==null&&(v[Q]=null,y[Q].disconnect(ot))}F=null,U=null,m.reset();for(let Q in p)delete p[Q];if(t.setRenderTarget(L),f=null,d=null,u=null,s=null,b=null,Ht.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(A.width,A.height,!1),w!==null){let Q=w.camera;Q.fov=w.fov,Q.zoom=w.zoom,Q.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,i.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&S&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(L=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",W),s.addEventListener("inputsourceschange",O),T.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(A),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Pt=null,wt=null;T.depth&&(wt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=T.stencil?wi:Bn,Pt=T.stencil?Ps:Ln);let Gt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Gt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new rn(d.textureWidth,d.textureHeight,{format:Sn,type:on,depthTexture:new gi(d.textureWidth,d.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let bt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new rn(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:on,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function O(Q){for(let ot=0;ot<Q.removed.length;ot++){let bt=Q.removed[ot],Pt=v.indexOf(bt);Pt>=0&&(v[Pt]=null,y[Pt].disconnect(bt))}for(let ot=0;ot<Q.added.length;ot++){let bt=Q.added[ot],Pt=v.indexOf(bt);if(Pt===-1){for(let Gt=0;Gt<y.length;Gt++)if(Gt>=v.length){v.push(bt),Pt=Gt;break}else if(v[Gt]===null){v[Gt]=bt,Pt=Gt;break}if(Pt===-1)break}let wt=y[Pt];wt&&wt.connect(bt)}}let P=new z,I=new z;function X(Q,ot,bt){P.setFromMatrixPosition(ot.matrixWorld),I.setFromMatrixPosition(bt.matrixWorld);let Pt=P.distanceTo(I),wt=ot.projectionMatrix.elements,Gt=bt.projectionMatrix.elements,Wt=wt[14]/(wt[10]-1),lt=wt[14]/(wt[10]+1),ft=(wt[9]+1)/wt[5],ht=(wt[9]-1)/wt[5],mt=(wt[8]-1)/wt[0],pt=(Gt[8]+1)/Gt[0],Vt=Wt*mt,kt=Wt*pt,Xt=Pt/(-mt+pt),qt=Xt*-mt;if(ot.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(qt),Q.translateZ(Xt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),wt[10]===-1)Q.projectionMatrix.copy(ot.projectionMatrix),Q.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{let k=Wt+Xt,te=lt+Xt,ee=Vt-qt,R=kt+(Pt-qt),x=ft*lt/te*k,Z=ht*lt/te*k;Q.projectionMatrix.makePerspective(ee,R,x,Z,k,te),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function at(Q,ot){ot===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ot.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ot=Q.near,bt=Q.far;m.texture!==null&&(m.depthNear>0&&(ot=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),G.near=B.near=C.near=ot,G.far=B.far=C.far=bt,(F!==G.near||U!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),F=G.near,U=G.far),G.layers.mask=Q.layers.mask|6,C.layers.mask=G.layers.mask&-5,B.layers.mask=G.layers.mask&-3;let Pt=Q.parent,wt=G.cameras;at(G,Pt);for(let Gt=0;Gt<wt.length;Gt++)at(wt[Gt],Pt);wt.length===2?X(G,C,B):G.projectionMatrix.copy(C.projectionMatrix),w===null&&Q.isPerspectiveCamera&&(w={camera:Q,fov:Q.fov,zoom:Q.zoom}),et(Q,G,Pt)};function et(Q,ot,bt){bt===null?Q.matrix.copy(ot.matrixWorld):(Q.matrix.copy(bt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ot.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ot.projectionMatrix),Q.projectionMatrixInverse.copy(ot.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=_s*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(Q){return p[Q]};let vt=null;function Tt(Q,ot){if(h=ot.getViewerPose(c||a),g=ot,h!==null){let bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let Pt=!1;bt.length!==G.cameras.length&&(G.cameras.length=0,Pt=!0);for(let lt=0;lt<bt.length;lt++){let ft=bt[lt],ht=null;if(f!==null)ht=f.getViewport(ft);else{let pt=u.getViewSubImage(d,ft);ht=pt.viewport,lt===0&&(t.setRenderTargetTextures(b,pt.colorTexture,pt.depthStencilTexture),t.setRenderTarget(b))}let mt=N[lt];mt===void 0&&(mt=new Je,mt.layers.enable(lt),mt.viewport=new Se,N[lt]=mt),mt.matrix.fromArray(ft.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(ft.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(ht.x,ht.y,ht.width,ht.height),lt===0&&(G.matrix.copy(mt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Pt===!0&&G.cameras.push(mt)}let wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){u=i.getBinding();let lt=u.getDepthInformation(bt[0]);lt&&lt.isValid&&lt.texture&&m.init(lt,s.renderState)}if(wt&&wt.includes("camera-access")&&S){t.state.unbindTexture(),u=i.getBinding();for(let lt=0;lt<bt.length;lt++){let ft=bt[lt].camera;if(ft){let ht=p[ft];ht||(ht=new dr,p[ft]=ht);let mt=u.getCameraImage(ft);ht.sourceTexture=mt}}}}for(let bt=0;bt<y.length;bt++){let Pt=v[bt],wt=y[bt];Pt!==null&&wt!==void 0&&wt.update(Pt,ot,c||a)}vt&&vt(Q,ot),ot.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ot}),g=null}let Ht=new nd;Ht.setAnimationLoop(Tt),this.setAnimationLoop=function(Q){vt=Q},this.dispose=function(){}}},ex=new _e,ld=new Jt;ld.set(-1,0,0,0,1,0,0,0,1);function nx(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Mc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,L,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,L):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Xe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Xe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let T=t.get(p),L=T.envMap,b=T.envMapRotation;L&&(m.envMap.value=L,m.envMapRotation.value.setFromMatrix4(ex.makeRotationFromEuler(b)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ld),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,L){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=L*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){let T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ix(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,y){let v=y.program;i.uniformBlockBinding(b,v)}function c(b,y){let v=s[b.id];v===void 0&&(m(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",T));let A=y.program;i.updateUBOMapping(b,A);let _=t.render.frame;r[b.id]!==_&&(d(b),r[b.id]=_)}function h(b){let y=u();b.__bindingPointIndex=y;let v=n.createBuffer(),A=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,v),v}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let y=s[b.id],v=b.uniforms,A=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let _=0,w=v.length;_<w;_++){let C=v[_];if(Array.isArray(C))for(let B=0,N=C.length;B<N;B++)f(C[B],_,B,A);else f(C,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(b,y,v,A){if(S(b,y,v,A)===!0){let _=b.__offset,w=b.value;if(Array.isArray(w)){let C=0;for(let B=0;B<w.length;B++){let N=w[B],G=p(N);g(N,b.__data,C),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(C+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function g(b,y,v){typeof b=="number"||typeof b=="boolean"?y[0]=b:b.isMatrix3?(y[0]=b.elements[0],y[1]=b.elements[1],y[2]=b.elements[2],y[3]=0,y[4]=b.elements[3],y[5]=b.elements[4],y[6]=b.elements[5],y[7]=0,y[8]=b.elements[6],y[9]=b.elements[7],y[10]=b.elements[8],y[11]=0):ArrayBuffer.isView(b)?y.set(new b.constructor(b.buffer,b.byteOffset,y.length)):b.toArray(y,v)}function S(b,y,v,A){let _=b.value,w=y+"_"+v;if(A[w]===void 0)return typeof _=="number"||typeof _=="boolean"?A[w]=_:ArrayBuffer.isView(_)?A[w]=_.slice():A[w]=_.clone(),!0;{let C=A[w];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function m(b){let y=b.uniforms,v=0,A=16;for(let w=0,C=y.length;w<C;w++){let B=Array.isArray(y[w])?y[w]:[y[w]];for(let N=0,G=B.length;N<G;N++){let F=B[N],U=Array.isArray(F.value)?F.value:[F.value];for(let $=0,W=U.length;$<W;$++){let O=U[$],P=p(O),I=v%A,X=I%P.boundary,at=I+X;v+=X,at!==0&&A-at<P.storage&&(v+=A-at),F.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=P.storage}}}let _=v%A;return _>0&&(v+=A-_),b.__size=v,b.__cache={},this}function p(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(y.boundary=16,y.storage=b.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",b),y}function T(b){let y=b.target;y.removeEventListener("dispose",T);let v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function L(){for(let b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:L}}var sx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Vn=null;function rx(){return Vn===null&&(Vn=new cr(sx,16,16,Ai,Dn),Vn.name="DFG_LUT",Vn.minFilter=He,Vn.magFilter=He,Vn.wrapS=On,Vn.wrapT=On,Vn.generateMipmaps=!1,Vn.needsUpdate=!0),Vn}var il=class{constructor(t={}){let{canvas:e=Su(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=on}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext!="undefined"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let S=f,m=new Set([yo,xo,_o]),p=new Set([on,Ln,Cs,Ps,po,mo]),T=new Uint32Array(4),L=new Int32Array(4),b=new z,y=null,v=null,A=[],_=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,B=!1,N=null,G=null,F=null,U=null;this._outputColorSpace=De;let $=0,W=0,O=null,P=-1,I=null,X=new Se,at=new Se,et=null,vt=new Kt(0),Tt=0,Ht=e.width,Q=e.height,ot=1,bt=null,Pt=null,wt=new Se(0,0,Ht,Q),Gt=new Se(0,0,Ht,Q),Wt=!1,lt=new bs,ft=!1,ht=!1,mt=new _e,pt=new z,Vt=new Se,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xt=!1;function qt(){return O===null?ot:1}let k=i;function te(M,H){return e.getContext(M,H)}let ee,R,x,Z,K,E,Y,nt,V,q,dt,St,yt,Mt,Et,Nt,it,D,rt,st,xt,gt,ut;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",xe,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",Tn,!1),k===null){let H="webgl2";if(k=te(H,M),k===null)throw te(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(M){throw e.removeEventListener("webglcontextlost",xe,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Tn,!1),$t("WebGLRenderer: "+M.message),M}function Ot(){ee=new dg(k),ee.init(),xt=new K_(k,ee),R=new ng(k,ee,t,xt),x=new J_(k,ee),R.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),G=k.createFramebuffer(),F=k.createFramebuffer(),U=k.createFramebuffer(),Z=new mg(k),K=new F_,E=new j_(k,ee,x,K,R,xt,Z),Y=new ug(C),nt=new _p(k),gt=new tg(k,nt),V=new fg(k,nt,Z,gt),q=new _g(k,V,nt,gt,Z),D=new gg(k,R,E),Et=new ig(K),dt=new U_(C,Y,ee,R,gt,Et),St=new nx(C,K),yt=new B_,Mt=new W_(ee),it=new Q0(C,Y,x,q,g,l),Nt=new $_(C,q,R),ut=new ix(k,Z,R,x),rt=new eg(k,ee,Z),st=new pg(k,ee,Z),Z.programs=dt.programs,C.capabilities=R,C.extensions=ee,C.properties=K,C.renderLists=yt,C.shadowMap=Nt,C.state=x,C.info=Z}S!==on&&(w=new yg(S,e.width,e.height,o,s,r));let Bt=new Xc(C,k);this.xr=Bt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let M=ee.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ee.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(M){M!==void 0&&(ot=M,this.setSize(Ht,Q,!1))},this.getSize=function(M){return M.set(Ht,Q)},this.setSize=function(M,H,tt=!0){if(Bt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}Ht=M,Q=H,e.width=Math.floor(M*ot),e.height=Math.floor(H*ot),tt===!0&&(e.style.width=M+"px",e.style.height=H+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,M,H)},this.getDrawingBufferSize=function(M){return M.set(Ht*ot,Q*ot).floor()},this.setDrawingBufferSize=function(M,H,tt){Ht=M,Q=H,ot=tt,e.width=Math.floor(M*tt),e.height=Math.floor(H*tt),this.setViewport(0,0,M,H)},this.setEffects=function(M){if(S===on){$t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let H=0;H<M.length;H++)if(M[H].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(X)},this.getViewport=function(M){return M.copy(wt)},this.setViewport=function(M,H,tt,J){M.isVector4?wt.set(M.x,M.y,M.z,M.w):wt.set(M,H,tt,J),x.viewport(X.copy(wt).multiplyScalar(ot).round())},this.getScissor=function(M){return M.copy(Gt)},this.setScissor=function(M,H,tt,J){M.isVector4?Gt.set(M.x,M.y,M.z,M.w):Gt.set(M,H,tt,J),x.scissor(at.copy(Gt).multiplyScalar(ot).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(M){x.setScissorTest(Wt=M)},this.setOpaqueSort=function(M){bt=M},this.setTransparentSort=function(M){Pt=M},this.getClearColor=function(M){return M.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(M=!0,H=!0,tt=!0){let J=0;if(M){let j=!1;if(O!==null){let Ct=O.texture.format;j=m.has(Ct)}if(j){let Ct=O.texture.type,Dt=p.has(Ct),Rt=it.getClearColor(),Ut=it.getClearAlpha(),zt=Rt.r,ie=Rt.g,re=Rt.b;Dt?(T[0]=zt,T[1]=ie,T[2]=re,T[3]=Ut,k.clearBufferuiv(k.COLOR,0,T)):(L[0]=zt,L[1]=ie,L[2]=re,L[3]=Ut,k.clearBufferiv(k.COLOR,0,L))}else J|=k.COLOR_BUFFER_BIT}H&&(J|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&(J|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&k.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),N=M},this.dispose=function(){e.removeEventListener("webglcontextlost",xe,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",Tn,!1),it.dispose(),yt.dispose(),Mt.dispose(),K.dispose(),Y.dispose(),q.dispose(),gt.dispose(),ut.dispose(),dt.dispose(),Bt.dispose(),Bt.removeEventListener("sessionstart",Qc),Bt.removeEventListener("sessionend",th),Pi.stop()};function xe(M){M.preventDefault(),xc("WebGLRenderer: Context Lost."),B=!0}function ue(){xc("WebGLRenderer: Context Restored."),B=!1;let M=Z.autoReset,H=Nt.enabled,tt=Nt.autoUpdate,J=Nt.needsUpdate,j=Nt.type;Ot(),Z.autoReset=M,Nt.enabled=H,Nt.autoUpdate=tt,Nt.needsUpdate=J,Nt.type=j}function Tn(M){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Nn(M){let H=M.target;H.removeEventListener("dispose",Nn),Cd(H)}function Cd(M){Pd(M),K.remove(M)}function Pd(M){let H=K.get(M).programs;H!==void 0&&(H.forEach(function(tt){dt.releaseProgram(tt)}),M.isShaderMaterial&&dt.releaseShaderCache(M))}this.renderBufferDirect=function(M,H,tt,J,j,Ct){H===null&&(H=kt);let Dt=j.isMesh&&j.matrixWorld.determinantAffine()<0,Rt=Dd(M,H,tt,J,j);x.setMaterial(J,Dt);let Ut=tt.index,zt=1;if(J.wireframe===!0){if(Ut=V.getWireframeAttribute(tt),Ut===void 0)return;zt=2}let ie=tt.drawRange,re=tt.attributes.position,Ft=ie.start*zt,de=(ie.start+ie.count)*zt;Ct!==null&&(Ft=Math.max(Ft,Ct.start*zt),de=Math.min(de,(Ct.start+Ct.count)*zt)),Ut!==null?(Ft=Math.max(Ft,0),de=Math.min(de,Ut.count)):re!=null&&(Ft=Math.max(Ft,0),de=Math.min(de,re.count));let Ce=de-Ft;if(Ce<0||Ce===1/0)return;gt.setup(j,J,Rt,tt,Ut);let be,ge=rt;if(Ut!==null&&(be=nt.get(Ut),ge=st,ge.setIndex(be)),j.isMesh)J.wireframe===!0?(x.setLineWidth(J.wireframeLinewidth*qt()),ge.setMode(k.LINES)):ge.setMode(k.TRIANGLES);else if(j.isLine){let Ye=J.linewidth;Ye===void 0&&(Ye=1),x.setLineWidth(Ye*qt()),j.isLineSegments?ge.setMode(k.LINES):j.isLineLoop?ge.setMode(k.LINE_LOOP):ge.setMode(k.LINE_STRIP)}else j.isPoints?ge.setMode(k.POINTS):j.isSprite&&ge.setMode(k.TRIANGLES);if(j.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))ge.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let Ye=j._multiDrawStarts,It=j._multiDrawCounts,tn=j._multiDrawCount,oe=Ut?nt.get(Ut).bytesPerElement:1,vn=K.get(J).currentProgram.getUniforms();for(let Un=0;Un<tn;Un++)vn.setValue(k,"_gl_DrawID",Un),ge.render(Ye[Un]/oe,It[Un])}else if(j.isInstancedMesh)ge.renderInstances(Ft,Ce,j.count);else if(tt.isInstancedBufferGeometry){let Ye=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,It=Math.min(tt.instanceCount,Ye);ge.renderInstances(Ft,Ce,It)}else ge.render(Ft,Ce)};function Kc(M,H,tt,J){N!==null&&M.isNodeMaterial&&N.setObject(J,M),ft===!0&&Et.setState(M,tt,!1),M.transparent===!0&&M.side===qe&&M.forceSinglePass===!1?(M.side=Xe,M.needsUpdate=!0,$r(M,H,J),M.side=Si,M.needsUpdate=!0,$r(M,H,J),M.side=qe):$r(M,H,J)}this.compile=function(M,H,tt=null){tt===null&&(tt=M),N!==null&&N.renderStart(M,H,tt),v=Mt.get(tt),v.init(H),_.push(v),tt.traverseVisible(function(j){j.isLight&&j.layers.test(H.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),M!==tt&&M.traverseVisible(function(j){j.isLight&&j.layers.test(H.layers)&&(v.pushLight(j),j.castShadow&&v.pushShadow(j))}),v.setupLights(),N!==null&&N.updateLights(v.state.lightsArray),ht=this.localClippingEnabled,ft=Et.init(this.clippingPlanes,ht),ft===!0&&Et.setGlobalState(this.clippingPlanes,H),N!==null&&Nt.render(v.state.shadowsArray,tt,H);let J=new Set;return M.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let Ct=j.material;if(Ct)if(Array.isArray(Ct))for(let Dt=0;Dt<Ct.length;Dt++){let Rt=Ct[Dt];Kc(Rt,tt,H,j),J.add(Rt)}else Kc(Ct,tt,H,j),J.add(Ct)}),v=_.pop(),N!==null&&N.renderEnd(),J},this.compileAsync=function(M,H,tt=null){let J=this.compile(M,H,tt);return new Promise(j=>{function Ct(){if(J.forEach(function(Dt){let Ut=K.get(Dt).currentProgram;(Ut===void 0||Ut.isReady())&&J.delete(Dt)}),J.size===0){j(M);return}setTimeout(Ct,10)}ee.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let hl=null;function Id(M){hl&&hl(M)}function Qc(){Pi.stop()}function th(){Pi.start()}let Pi=new nd;Pi.setAnimationLoop(Id),typeof self!="undefined"&&Pi.setContext(self),this.setAnimationLoop=function(M){hl=M,Bt.setAnimationLoop(M),M===null?Pi.stop():Pi.start()},Bt.addEventListener("sessionstart",Qc),Bt.addEventListener("sessionend",th),this.render=function(M,H){if(H!==void 0&&H.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;N!==null&&N.renderStart(M,H);let tt=Bt.enabled===!0&&Bt.isPresenting===!0,J=w!==null&&(O===null||tt)&&w.begin(C,O);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Bt.enabled===!0&&Bt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Bt.cameraAutoUpdate===!0&&Bt.updateCamera(H),H=Bt.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,H,O),v=Mt.get(M,_.length),v.init(H),v.state.textureUnits=E.getTextureUnits(),_.push(v),mt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),lt.setFromProjectionMatrix(mt,Cn,H.reversedDepth),ht=this.localClippingEnabled,ft=Et.init(this.clippingPlanes,ht),y=yt.get(M,A.length),y.init(),A.push(y),Bt.enabled===!0&&Bt.isPresenting===!0){let Dt=C.xr.getDepthSensingMesh();Dt!==null&&ul(Dt,H,-1/0,C.sortObjects)}ul(M,H,0,C.sortObjects),y.finish(),N!==null&&N.updateLights(v.state.lightsArray),C.sortObjects===!0&&y.sort(bt,Pt),Xt=Bt.enabled===!1||Bt.isPresenting===!1||Bt.hasDepthSensing()===!1,Xt&&it.addToRenderList(y,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ft===!0&&Et.beginShadows();let j=v.state.shadowsArray;if(Nt.render(j,M,H),ft===!0&&Et.endShadows(),(J&&w.hasRenderPass())===!1){let Dt=y.opaque,Rt=y.transmissive;if(v.setupLights(),H.isArrayCamera){let Ut=H.cameras;if(Rt.length>0)for(let zt=0,ie=Ut.length;zt<ie;zt++){let re=Ut[zt];nh(Dt,Rt,M,re)}Xt&&it.render(M);for(let zt=0,ie=Ut.length;zt<ie;zt++){let re=Ut[zt];eh(y,M,re,re.viewport)}}else Rt.length>0&&nh(Dt,Rt,M,H),Xt&&it.render(M),eh(y,M,H)}O!==null&&W===0&&(E.updateMultisampleRenderTarget(O),E.updateRenderTargetMipmap(O)),J&&w.end(C),M.isScene===!0&&M.onAfterRender(C,M,H),gt.resetDefaultState(),P=-1,I=null,_.pop(),_.length>0?(v=_[_.length-1],E.setTextureUnits(v.state.textureUnits),ft===!0&&Et.setGlobalState(C.clippingPlanes,v.state.camera)):v=null,A.pop(),A.length>0?y=A[A.length-1]:y=null,N!==null&&N.renderEnd()};function ul(M,H,tt,J){if(M.visible===!1)return;if(M.layers.test(H.layers)){if(M.isGroup)tt=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(H);else if(M.isLightProbeGrid)v.pushLightProbeGrid(M);else if(M.isLight)v.pushLight(M),M.castShadow&&v.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(lt)){J&&Vt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(mt);let Dt=q.update(M),Rt=M.material;Rt.visible&&y.push(M,Dt,Rt,tt,Vt.z,null,H)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(lt))){let Dt=q.update(M),Rt=M.material;if(J&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Vt.copy(M.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),Vt.copy(Dt.boundingSphere.center)),Vt.applyMatrix4(M.matrixWorld).applyMatrix4(mt)),Array.isArray(Rt)){let Ut=Dt.groups;for(let zt=0,ie=Ut.length;zt<ie;zt++){let re=Ut[zt],Ft=Rt[re.materialIndex];Ft&&Ft.visible&&y.push(M,Dt,Ft,tt,Vt.z,re,H)}}else Rt.visible&&y.push(M,Dt,Rt,tt,Vt.z,null,H)}}let Ct=M.children;for(let Dt=0,Rt=Ct.length;Dt<Rt;Dt++)ul(Ct[Dt],H,tt,J)}function eh(M,H,tt,J){let{opaque:j,transmissive:Ct,transparent:Dt}=M;v.setupLightsView(tt),ft===!0&&Et.setGlobalState(C.clippingPlanes,tt),J&&x.viewport(X.copy(J)),j.length>0&&Zr(j,H,tt),Ct.length>0&&Zr(Ct,H,tt),Dt.length>0&&Zr(Dt,H,tt),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function nh(M,H,tt,J){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[J.id]===void 0){let Ft=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[J.id]=new rn(1,1,{generateMipmaps:!0,type:Ft?Dn:on,minFilter:Ti,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}let Ct=v.state.transmissionRenderTarget[J.id],Dt=J.viewport||X;Ct.setSize(Dt.z*C.transmissionResolutionScale,Dt.w*C.transmissionResolutionScale);let Rt=C.getRenderTarget(),Ut=C.getActiveCubeFace(),zt=C.getActiveMipmapLevel();C.setRenderTarget(Ct),C.getClearColor(vt),Tt=C.getClearAlpha(),Tt<1&&C.setClearColor(16777215,.5),C.clear(),Xt&&it.render(tt);let ie=C.toneMapping;C.toneMapping=In;let re=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),v.setupLightsView(J),ft===!0&&Et.setGlobalState(C.clippingPlanes,J),Zr(M,tt,J),E.updateMultisampleRenderTarget(Ct),E.updateRenderTargetMipmap(Ct),ee.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let de=0,Ce=H.length;de<Ce;de++){let be=H[de],{object:ge,geometry:Ye,material:It,group:tn}=be;if(It.side===qe&&ge.layers.test(J.layers)){let oe=It.side;It.side=Xe,It.needsUpdate=!0,ih(ge,tt,J,Ye,It,tn),It.side=oe,It.needsUpdate=!0,Ft=!0}}Ft===!0&&(E.updateMultisampleRenderTarget(Ct),E.updateRenderTargetMipmap(Ct))}C.setRenderTarget(Rt,Ut,zt),C.setClearColor(vt,Tt),re!==void 0&&(J.viewport=re),C.toneMapping=ie}function Zr(M,H,tt){let J=H.isScene===!0?H.overrideMaterial:null;for(let j=0,Ct=M.length;j<Ct;j++){let Dt=M[j],{object:Rt,geometry:Ut,group:zt}=Dt,ie=Dt.material;ie.allowOverride===!0&&J!==null&&(ie=J),Rt.layers.test(tt.layers)&&ih(Rt,H,tt,Ut,ie,zt)}}function ih(M,H,tt,J,j,Ct){N!==null&&j.isNodeMaterial&&N.setObject(M,j),M.onBeforeRender(C,H,tt,J,j,Ct),M.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),j.onBeforeRender(C,H,tt,J,M,Ct),j.transparent===!0&&j.side===qe&&j.forceSinglePass===!1?(j.side=Xe,j.needsUpdate=!0,C.renderBufferDirect(tt,H,J,j,M,Ct),j.side=Si,j.needsUpdate=!0,C.renderBufferDirect(tt,H,J,j,M,Ct),j.side=qe):C.renderBufferDirect(tt,H,J,j,M,Ct),M.onAfterRender(C,H,tt,J,j,Ct)}function $r(M,H,tt){H.isScene!==!0&&(H=kt);let J=K.get(M),j=v.state.lights,Ct=v.state.shadowsArray,Dt=j.state.version,Rt=dt.getParameters(M,j.state,Ct,H,tt,v.state.lightProbeGridArray),Ut=dt.getProgramCacheKey(Rt),zt=J.programs;J.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?H.environment:null,J.fog=H.fog;let ie=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;J.envMap=Y.get(M.envMap||J.environment,ie),J.envMapRotation=J.environment!==null&&M.envMap===null?H.environmentRotation:M.envMapRotation,zt===void 0&&(M.addEventListener("dispose",Nn),zt=new Map,J.programs=zt);let re=zt.get(Ut);if(re!==void 0){if(J.currentProgram===re&&J.lightsStateVersion===Dt)return rh(M,Rt),re}else Rt.uniforms=dt.getUniforms(M),N!==null&&M.isNodeMaterial&&N.build(M,tt,Rt),M.onBeforeCompile(Rt,C),re=dt.acquireProgram(Rt,Ut),zt.set(Ut,re),J.uniforms=Rt.uniforms;let Ft=J.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ft.clippingPlanes=Et.uniform),rh(M,Rt),J.needsLights=Ud(M),J.lightsStateVersion=Dt,J.needsLights&&(Ft.ambientLightColor.value=j.state.ambient,Ft.lightProbe.value=j.state.probe,Ft.sunLights.value=j.state.sun,Ft.sunLightShadows.value=j.state.sunShadow,Ft.directionalLights.value=j.state.directional,Ft.directionalLightShadows.value=j.state.directionalShadow,Ft.spotLights.value=j.state.spot,Ft.spotLightShadows.value=j.state.spotShadow,Ft.rectAreaLights.value=j.state.rectArea,Ft.ltc_1.value=j.state.rectAreaLTC1,Ft.ltc_2.value=j.state.rectAreaLTC2,Ft.pointLights.value=j.state.point,Ft.pointLightShadows.value=j.state.pointShadow,Ft.hemisphereLights.value=j.state.hemi,Ft.sunShadowMatrix.value=j.state.sunShadowMatrix,Ft.sunShadowCascade.value=j.state.sunShadowCascade,Ft.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ft.spotLightMatrix.value=j.state.spotLightMatrix,Ft.spotLightMap.value=j.state.spotLightMap,Ft.pointShadowMatrix.value=j.state.pointShadowMatrix),J.lightProbeGrid=v.state.lightProbeGridArray.length>0,J.currentProgram=re,J.uniformsList=null,re}function sh(M){if(M.uniformsList===null){let H=M.currentProgram.getUniforms();M.uniformsList=Ds.seqWithValue(H.seq,M.uniforms)}return M.uniformsList}function rh(M,H){let tt=K.get(M);tt.outputColorSpace=H.outputColorSpace,tt.batching=H.batching,tt.batchingColor=H.batchingColor,tt.instancing=H.instancing,tt.instancingColor=H.instancingColor,tt.instancingMorph=H.instancingMorph,tt.skinning=H.skinning,tt.morphTargets=H.morphTargets,tt.morphNormals=H.morphNormals,tt.morphColors=H.morphColors,tt.morphTargetsCount=H.morphTargetsCount,tt.numClippingPlanes=H.numClippingPlanes,tt.numIntersection=H.numClipIntersection,tt.vertexAlphas=H.vertexAlphas,tt.vertexTangents=H.vertexTangents,tt.toneMapping=H.toneMapping}function Ld(M,H){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;b.setFromMatrixPosition(H.matrixWorld);for(let tt=0,J=M.length;tt<J;tt++){let j=M[tt];if(j.texture!==null&&j.boundingBox.containsPoint(b))return j}return null}function Dd(M,H,tt,J,j){H.isScene!==!0&&(H=kt),E.resetTextureUnits();let Ct=H.fog,Dt=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?H.environment:null,Rt=O===null?C.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ae.workingColorSpace,Ut=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,zt=Y.get(J.envMap||Dt,Ut),ie=J.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,re=!!tt.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ft=!!tt.morphAttributes.position,de=!!tt.morphAttributes.normal,Ce=!!tt.morphAttributes.color,be=In;J.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(be=C.toneMapping);let ge=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,Ye=ge!==void 0?ge.length:0,It=K.get(J),tn=v.state.lights;if(ft===!0&&(ht===!0||M!==I)){let ye=M===I&&J.id===P;Et.setState(J,M,ye)}let oe=!1;J.version===It.__version?(It.needsLights&&It.lightsStateVersion!==tn.state.version||It.outputColorSpace!==Rt||j.isBatchedMesh&&It.batching===!1||!j.isBatchedMesh&&It.batching===!0||j.isBatchedMesh&&It.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&It.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&It.instancing===!1||!j.isInstancedMesh&&It.instancing===!0||j.isSkinnedMesh&&It.skinning===!1||!j.isSkinnedMesh&&It.skinning===!0||j.isInstancedMesh&&It.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&It.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&It.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&It.instancingMorph===!1&&j.morphTexture!==null||It.envMap!==zt||J.fog===!0&&It.fog!==Ct||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==Et.numPlanes||It.numIntersection!==Et.numIntersection)||It.vertexAlphas!==ie||It.vertexTangents!==re||It.morphTargets!==Ft||It.morphNormals!==de||It.morphColors!==Ce||It.toneMapping!==be||It.morphTargetsCount!==Ye||!!It.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,It.__version=J.version);let vn=It.currentProgram;oe===!0&&(vn=$r(J,H,j),N&&J.isNodeMaterial&&N.onUpdateProgram(J,vn,It));let Un=!1,ni=!1,Yi=!1,me=vn.getUniforms(),Ae=It.uniforms;if(x.useProgram(vn.program)&&(Un=!0,ni=!0,Yi=!0),J.id!==P&&(P=J.id,ni=!0),It.needsLights){let ye=Ld(v.state.lightProbeGridArray,j);It.lightProbeGrid!==ye&&(It.lightProbeGrid=ye,ni=!0)}if(Un||I!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),me.setValue(k,"projectionMatrix",M.projectionMatrix),me.setValue(k,"viewMatrix",M.matrixWorldInverse);let si=me.map.cameraPosition;si!==void 0&&si.setValue(k,pt.setFromMatrixPosition(M.matrixWorld)),R.logarithmicDepthBuffer&&me.setValue(k,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&me.setValue(k,"isOrthographic",M.isOrthographicCamera===!0),I!==M&&(I=M,ni=!0,Yi=!0)}if(It.needsLights&&(tn.state.sunShadowMap.length>0&&me.setValue(k,"sunShadowMap",tn.state.sunShadowMap,E),tn.state.directionalShadowMap.length>0&&me.setValue(k,"directionalShadowMap",tn.state.directionalShadowMap,E),tn.state.spotShadowMap.length>0&&me.setValue(k,"spotShadowMap",tn.state.spotShadowMap,E),tn.state.pointShadowMap.length>0&&me.setValue(k,"pointShadowMap",tn.state.pointShadowMap,E)),j.isSkinnedMesh){me.setOptional(k,j,"bindMatrix"),me.setOptional(k,j,"bindMatrixInverse");let ye=j.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),me.setValue(k,"boneTexture",ye.boneTexture,E))}j.isBatchedMesh&&(me.setOptional(k,j,"batchingTexture"),me.setValue(k,"batchingTexture",j._matricesTexture,E),me.setOptional(k,j,"batchingIdTexture"),me.setValue(k,"batchingIdTexture",j._indirectTexture,E),me.setOptional(k,j,"batchingColorTexture"),j._colorsTexture!==null&&me.setValue(k,"batchingColorTexture",j._colorsTexture,E));let ii=tt.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&D.update(j,tt,vn),(ni||It.receiveShadow!==j.receiveShadow)&&(It.receiveShadow=j.receiveShadow,me.setValue(k,"receiveShadow",j.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&H.environment!==null&&(Ae.envMapIntensity.value=H.environmentIntensity),Ae.dfgLUT!==void 0&&(Ae.dfgLUT.value=rx()),ni){if(me.setValue(k,"toneMappingExposure",C.toneMappingExposure),It.needsLights&&Nd(Ae,Yi),Ct&&J.fog===!0&&St.refreshFogUniforms(Ae,Ct),St.refreshMaterialUniforms(Ae,J,ot,Q,v.state.transmissionRenderTarget[M.id]),It.needsLights&&It.lightProbeGrid){let ye=It.lightProbeGrid;Ae.probesSH.value=ye.texture,Ae.probesMin.value.copy(ye.boundingBox.min),Ae.probesMax.value.copy(ye.boundingBox.max),Ae.probesResolution.value.copy(ye.resolution)}Ds.upload(k,sh(It),Ae,E)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ds.upload(k,sh(It),Ae,E),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&me.setValue(k,"center",j.center),me.setValue(k,"modelViewMatrix",j.modelViewMatrix),me.setValue(k,"normalMatrix",j.normalMatrix),me.setValue(k,"modelMatrix",j.matrixWorld),J.uniformsGroups!==void 0){let ye=J.uniformsGroups;for(let si=0,Zi=ye.length;si<Zi;si++){let oh=ye[si];ut.update(oh,vn),ut.bind(oh,vn)}}return vn}function Nd(M,H){M.ambientLightColor.needsUpdate=H,M.lightProbe.needsUpdate=H,M.sunLights.needsUpdate=H,M.sunLightShadows.needsUpdate=H,M.directionalLights.needsUpdate=H,M.directionalLightShadows.needsUpdate=H,M.pointLights.needsUpdate=H,M.pointLightShadows.needsUpdate=H,M.spotLights.needsUpdate=H,M.spotLightShadows.needsUpdate=H,M.rectAreaLights.needsUpdate=H,M.hemisphereLights.needsUpdate=H}function Ud(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(M,H,tt){let J=K.get(M);J.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),K.get(M.texture).__webglTexture=H,K.get(M.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:tt,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,H){let tt=K.get(M);tt.__webglFramebuffer=H,tt.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(M,H=0,tt=0){O=M,$=H,W=tt;let J=null,j=!1,Ct=!1;if(M){let Rt=K.get(M);if(Rt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(k.FRAMEBUFFER,Rt.__webglFramebuffer),X.copy(M.viewport),at.copy(M.scissor),et=M.scissorTest,x.viewport(X),x.scissor(at),x.setScissorTest(et),P=-1;return}else if(Rt.__webglFramebuffer===void 0)E.setupRenderTarget(M);else if(Rt.__hasExternalTextures)E.rebindTextures(M,K.get(M.texture).__webglTexture,K.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ie=M.depthTexture;if(Rt.__boundDepthTexture!==ie){if(ie!==null&&K.has(ie)&&(M.width!==ie.image.width||M.height!==ie.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(M)}}let Ut=M.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Ct=!0);let zt=K.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(zt[H])?J=zt[H][tt]:J=zt[H],j=!0):M.samples>0&&E.useMultisampledRTT(M)===!1?J=K.get(M).__webglMultisampledFramebuffer:Array.isArray(zt)?J=zt[tt]:J=zt,X.copy(M.viewport),at.copy(M.scissor),et=M.scissorTest}else X.copy(wt).multiplyScalar(ot).floor(),at.copy(Gt).multiplyScalar(ot).floor(),et=Wt;if(tt!==0&&(J=G),x.bindFramebuffer(k.FRAMEBUFFER,J)&&x.drawBuffers(M,J),x.viewport(X),x.scissor(at),x.setScissorTest(et),j){let Rt=K.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,Rt.__webglTexture,tt)}else if(Ct){let Rt=H;for(let Ut=0;Ut<M.textures.length;Ut++){let zt=K.get(M.textures[Ut]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ut,zt.__webglTexture,tt,Rt)}}else if(M!==null&&tt!==0){let Rt=K.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Rt.__webglTexture,tt)}P=-1};function ah(M){let H=K.get(M);return(H.__readFormat!==M.format||H.__readType!==M.type)&&(H.__readFormat=M.format,H.__readType=M.type,H.__formatReadable=R.textureFormatReadable(M.format),H.__typeReadable=R.textureTypeReadable(M.type)),H}this.readRenderTargetPixels=function(M,H,tt,J,j,Ct,Dt,Rt=0){if(!(M&&M.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=K.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){x.bindFramebuffer(k.FRAMEBUFFER,Ut);try{let zt=M.textures[Rt],ie=zt.format,re=zt.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Rt);let Ft=ah(zt);if(Ft.__formatReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ft.__typeReadable===!1){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=M.width-J&&tt>=0&&tt<=M.height-j&&k.readPixels(H,tt,J,j,xt.convert(ie),xt.convert(re),Ct)}finally{let zt=O!==null?K.get(O).__webglFramebuffer:null;x.bindFramebuffer(k.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(M,H,tt,J,j,Ct,Dt,Rt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=K.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut)if(H>=0&&H<=M.width-J&&tt>=0&&tt<=M.height-j){x.bindFramebuffer(k.FRAMEBUFFER,Ut);let zt=M.textures[Rt],ie=zt.format,re=zt.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Rt);let Ft=ah(zt);if(Ft.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ft.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let de=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,de),k.bufferData(k.PIXEL_PACK_BUFFER,Ct.byteLength,k.STREAM_READ),k.readPixels(H,tt,J,j,xt.convert(ie),xt.convert(re),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let Ce=O!==null?K.get(O).__webglFramebuffer:null;x.bindFramebuffer(k.FRAMEBUFFER,Ce);let be=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Tu(k,be,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,de),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ct),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(de),k.deleteSync(be),Ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,H=null,tt=0){let J=Math.pow(2,-tt),j=Math.floor(M.image.width*J),Ct=Math.floor(M.image.height*J),Dt=H!==null?H.x:0,Rt=H!==null?H.y:0;E.setTexture2D(M,0),k.copyTexSubImage2D(k.TEXTURE_2D,tt,0,0,Dt,Rt,j,Ct),x.unbindTexture()},this.copyTextureToTexture=function(M,H,tt=null,J=null,j=0,Ct=0){let Dt,Rt,Ut,zt,ie,re,Ft,de,Ce,be=M.isCompressedTexture?M.mipmaps[Ct]:M.image;if(tt!==null)Dt=tt.max.x-tt.min.x,Rt=tt.max.y-tt.min.y,Ut=tt.isBox3?tt.max.z-tt.min.z:1,zt=tt.min.x,ie=tt.min.y,re=tt.isBox3?tt.min.z:0;else{let Ae=Math.pow(2,-j);Dt=Math.floor(be.width*Ae),Rt=Math.floor(be.height*Ae),M.isDataArrayTexture?Ut=be.depth:M.isData3DTexture?Ut=Math.floor(be.depth*Ae):Ut=1,zt=0,ie=0,re=0}J!==null?(Ft=J.x,de=J.y,Ce=J.z):(Ft=0,de=0,Ce=0);let ge=xt.convert(H.format),Ye=xt.convert(H.type),It;H.isData3DTexture?(E.setTexture3D(H,0),It=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(E.setTexture2DArray(H,0),It=k.TEXTURE_2D_ARRAY):(E.setTexture2D(H,0),It=k.TEXTURE_2D),x.activeTexture(k.TEXTURE0),x.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),x.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),x.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);let tn=x.getParameter(k.UNPACK_ROW_LENGTH),oe=x.getParameter(k.UNPACK_IMAGE_HEIGHT),vn=x.getParameter(k.UNPACK_SKIP_PIXELS),Un=x.getParameter(k.UNPACK_SKIP_ROWS),ni=x.getParameter(k.UNPACK_SKIP_IMAGES);x.pixelStorei(k.UNPACK_ROW_LENGTH,be.width),x.pixelStorei(k.UNPACK_IMAGE_HEIGHT,be.height),x.pixelStorei(k.UNPACK_SKIP_PIXELS,zt),x.pixelStorei(k.UNPACK_SKIP_ROWS,ie),x.pixelStorei(k.UNPACK_SKIP_IMAGES,re);let Yi=M.isDataArrayTexture||M.isData3DTexture,me=H.isDataArrayTexture||H.isData3DTexture;if(M.isDepthTexture){let Ae=K.get(M),ii=K.get(H),ye=K.get(Ae.__renderTarget),si=K.get(ii.__renderTarget);x.bindFramebuffer(k.READ_FRAMEBUFFER,ye.__webglFramebuffer),x.bindFramebuffer(k.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let Zi=0;Zi<Ut;Zi++)Yi&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,K.get(M).__webglTexture,j,re+Zi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,K.get(H).__webglTexture,Ct,Ce+Zi)),k.blitFramebuffer(zt,ie,Dt,Rt,Ft,de,Dt,Rt,k.DEPTH_BUFFER_BIT,k.NEAREST);x.bindFramebuffer(k.READ_FRAMEBUFFER,null),x.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(j!==0||M.isRenderTargetTexture||K.has(M)){let Ae=K.get(M),ii=K.get(H);x.bindFramebuffer(k.READ_FRAMEBUFFER,F),x.bindFramebuffer(k.DRAW_FRAMEBUFFER,U);for(let ye=0;ye<Ut;ye++)Yi?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ae.__webglTexture,j,re+ye):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ae.__webglTexture,j),me?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ii.__webglTexture,Ct,Ce+ye):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ii.__webglTexture,Ct),j!==0?k.blitFramebuffer(zt,ie,Dt,Rt,Ft,de,Dt,Rt,k.COLOR_BUFFER_BIT,k.NEAREST):me?k.copyTexSubImage3D(It,Ct,Ft,de,Ce+ye,zt,ie,Dt,Rt):k.copyTexSubImage2D(It,Ct,Ft,de,zt,ie,Dt,Rt);x.bindFramebuffer(k.READ_FRAMEBUFFER,null),x.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else me?M.isDataTexture||M.isData3DTexture?k.texSubImage3D(It,Ct,Ft,de,Ce,Dt,Rt,Ut,ge,Ye,be.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(It,Ct,Ft,de,Ce,Dt,Rt,Ut,ge,be.data):k.texSubImage3D(It,Ct,Ft,de,Ce,Dt,Rt,Ut,ge,Ye,be):M.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ct,Ft,de,Dt,Rt,ge,Ye,be.data):M.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ct,Ft,de,be.width,be.height,ge,be.data):k.texSubImage2D(k.TEXTURE_2D,Ct,Ft,de,Dt,Rt,ge,Ye,be);x.pixelStorei(k.UNPACK_ROW_LENGTH,tn),x.pixelStorei(k.UNPACK_IMAGE_HEIGHT,oe),x.pixelStorei(k.UNPACK_SKIP_PIXELS,vn),x.pixelStorei(k.UNPACK_SKIP_ROWS,Un),x.pixelStorei(k.UNPACK_SKIP_IMAGES,ni),Ct===0&&H.generateMipmaps&&k.generateMipmap(It),x.unbindTexture()},this.initRenderTarget=function(M){K.get(M).__webglFramebuffer===void 0&&E.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?E.setTextureCube(M,0):M.isData3DTexture?E.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?E.setTexture2DArray(M,0):E.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){$=0,W=0,O=null,x.reset(),gt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var hd={type:"change"},Yc={type:"start"},dd={type:"end"},al=new vs,ud=new fn,ax=Math.cos(70*vc.DEG2RAD),Oe=new z,ln=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qc=1e-6,ol=class extends Pr{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN},this.touches={ONE:Mi.ROTATE,TWO:Mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new mn,this._lastTargetPosition=new z,this._quat=new mn().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ws,this._sphericalDelta=new ws,this._scale=1,this._panOffset=new z,this._rotateStart=new _t,this._rotateEnd=new _t,this._rotateDelta=new _t,this._panStart=new _t,this._panEnd=new _t,this._panDelta=new _t,this._dollyStart=new _t,this._dollyEnd=new _t,this._dollyDelta=new _t,this._dollyDirection=new z,this._mouse=new _t,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=lx.bind(this),this._onPointerDown=ox.bind(this),this._onPointerUp=cx.bind(this),this._onContextMenu=gx.bind(this),this._onMouseWheel=dx.bind(this),this._onKeyDown=fx.bind(this),this._onTouchStart=px.bind(this),this._onTouchMove=mx.bind(this),this._onMouseDown=hx.bind(this),this._onMouseMove=ux.bind(this),this._interceptControlDown=_x.bind(this),this._interceptControlUp=xx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=pe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(hd),this.update(),this.state=pe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Oe.copy(e).sub(this.target),Oe.applyQuaternion(this._quat),this._spherical.setFromVector3(Oe),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Oe.setFromSpherical(this._spherical),Oe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Oe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Oe.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new z(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Oe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(al.origin.copy(this.object.position),al.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(al.direction))<ax?this.object.lookAt(this.target):(ud.setFromNormalAndCoplanarPoint(this.object.up,this.target),al.intersectPlane(ud,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>qc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qc||this._lastTargetPosition.distanceToSquared(this.target)>qc?(this.dispatchEvent(hd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ln/60*this.autoRotateSpeed*t:ln/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Oe.setFromMatrixColumn(e,0),Oe.multiplyScalar(-t),this._panOffset.add(Oe)}_panUp(t,e){this.screenSpacePanning===!0?Oe.setFromMatrixColumn(e,1):(Oe.setFromMatrixColumn(e,0),Oe.crossVectors(this.object.up,Oe)),Oe.multiplyScalar(t),this._panOffset.add(Oe)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Oe.copy(s).sub(this.target);let r=Oe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new _t,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function ox(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function lx(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function cx(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dd),this.state=pe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function hx(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pe.DOLLY;break;case bi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}break;case bi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Yc)}function ux(n){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function dx(n){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(n.preventDefault(),this.dispatchEvent(Yc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dd))}function fx(n){this.enabled!==!1&&this._handleKeyDown(n)}function px(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Mi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pe.TOUCH_ROTATE;break;case Mi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case Mi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pe.TOUCH_DOLLY_PAN;break;case Mi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(Yc)}function mx(n){switch(this._trackPointer(n),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pe.NONE}}function gx(n){this.enabled!==!1&&n.preventDefault()}function _x(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ke={host:{name:"Tom\xE1s Rivero",role:"Presentador",voice:"host"},co1:{name:"Luc\xEDa Brisa",role:"Copresentadora",voice:"co"},co2:{name:"Nerea Pixel",role:"Copresentadora (streamer)",voice:"co"},co3:{name:"Marisa Copla",role:"Copresentadora (humor)",voice:"co"},ref1:{name:"Juli\xE1n Ferrer",role:"\xC1rbitro"},ref2:{name:"Roc\xEDo Paredes",role:"\xC1rbitra"},vaca:{name:"Canela",role:"La vaquilla (botarga)"},dino:{name:"Trufo",role:"El dinosaurio"},clown:{name:"Pipo Volteretas",role:"Acr\xF3bata y payaso"},host07:{name:"Gonzalo Sierra",role:"Presentador (etapa auton\xF3mica)",voice:"host"}},Xr={e1995:{id:"e1995",name:"Cuando calienta el sol",years:"1995",emoji:"\u2600\uFE0F",towns:4,colors:["azul","rojo","amarillo","verde"],host:"host",cos:["co1"],bullring:!0,vaquilla:"real",prize:"4.000.000 pesetas",title:"CUANDO CALIENTA EL SOL",desc:"4 pueblos de menos de 5.000 habitantes, con sus colores, alcalde y padrino."},e1996:{id:"e1996",name:"Grand Prix \xB7 La 1",years:"1996-2005",emoji:"\u{1F42E}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1"],bullring:!0,vaquilla:"real",prize:"6.000.000 pesetas",title:"GRAND PRIX",desc:"Dos pueblos, azul y amarillo, en la plaza de toros con la vaquilla."},e2007:{id:"e2007",name:"Grand Prix \xB7 Auton\xF3micas",years:"2007-2009",emoji:"\u{1F4FA}",towns:2,colors:["azul","amarillo"],host:"host07",cos:["co3"],bullring:!0,vaquilla:"real",prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"La etapa de las cadenas auton\xF3micas, con otro presentador."},e2023:{id:"e2023",name:"Grand Prix 2023",years:"2023",emoji:"\u{1F9B8}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1","co2"],bullring:!1,vaquilla:"botarga",comodin:"supervaquilla",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Vuelve el Grand Prix. La vaquilla es una botarga y el alcalde la usa como comod\xEDn."},e2024:{id:"e2024",name:"Grand Prix 2024",years:"2024",emoji:"\u{1F514}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co1","co2"],bullring:!1,vaquilla:"botarga",comodin:"campana",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Suena la campana y la vaquilla entra 30 segundos en la prueba."},e2025:{id:"e2025",name:"Grand Prix 2025",years:"2025",emoji:"\u{1F947}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co2","co3"],bullring:!1,vaquilla:"botarga",comodin:"dorada2",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Cada pueblo tiene su Vaquilla dorada: si gana la prueba donde la usa, +2 puntos."},e2026:{id:"e2026",name:"Grand Prix 2026",years:"2026",emoji:"\u{1F3C6}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co3"],bullring:!1,vaquilla:"botarga",comodin:"dorada1",dino:!0,clown:!0,prize:"30.000 \u20AC",title:"GRAND PRIX",desc:"Solo hay una Vaquilla dorada y se gana en \xABPasi\xF3n de capitanes\xBB."},navidad:{id:"navidad",name:"Grand Prix de la Navidad",years:"2024",emoji:"\u{1F384}",towns:2,colors:["azul","amarillo"],host:"host",cos:["co2"],bullring:!1,vaquilla:"botarga",comodin:"cajas",dino:!0,clown:!0,prize:"Trofeo de Navidad",title:"GRAND PRIX",navidad:!0,desc:"Especial de Navidad: los padrinos eligen cajas con comodines."}},qr="e2026",En={azul:"#1f6fe0",amarillo:"#ffd21a",rojo:"#e23a2a",verde:"#2fb84a"},Zc=[["Cudillero",1995],["Guijuelo",1996],["Murchante",1997],["Tordera",1998],["El Bonillo",1999],["Suances",2e3],["Nuevo Bazt\xE1n",2001],["Gri\xF1\xF3n",2002],["Los Molinos",2003],["Falces",2004],["Carri\xF3n de los Condes",2005],["Ricote",2007],["Ador",2008],["Renedo de Esgueva",2009],["Alfacar",2023],["Olvera",2024],["Aguilar de Campoo","2024 Navidad"],["San Sebasti\xE1n de la Gomera",2025],["Quintanar del Rey",2026]],$c=Zc.map(n=>n[0]).concat(["Villarrubia del Monte","Castrillo de la Ribera","Fuentesauco del Valle","San Mart\xEDn de la Sierra","Pe\xF1alba de Arriba","Navalcuervo"]),fd=["Pilar Ortega","Andr\xE9s Molina","Carmen Vidal","F\xE9lix Navarro","Rosa Ben\xEDtez","Ignacio Lara","Maite Serrano","Luis Campos"],pd=["Toni Estrella","Vera Lumen","Dani Saeta","Olga Ribera","Rafa Montes","Sara Vega","Quique Flash","Ana Sol"],md=[{id:"normal",emoji:"\u2B50",name:"Normal"},{id:"peques",emoji:"\u{1F9D2}",name:"Especial peques"},{id:"aniversario",emoji:"\u{1F382}",name:"10.\xBA aniversario"},{id:"portugal",emoji:"\u{1F1F5}\u{1F1F9}",name:"Espa\xF1a-Portugal"},{id:"navidad",emoji:"\u{1F384}",name:"Navidad"},{id:"campeones",emoji:"\u{1F3C6}",name:"Campeones"},{id:"noche",emoji:"\u{1F319}",name:"Noche de verano"}];function yn(n,t,e){let i=document.createElement("canvas");i.width=n,i.height=t,e(i.getContext("2d"),n,t);let s=new mi(i);return s.colorSpace=De,s.anisotropy=4,s}function yx(){return yn(256,256,n=>{n.fillStyle="#ffd21a",n.beginPath(),n.arc(128,128,126,0,7),n.fill(),n.fillStyle="#1f4fc8",n.beginPath(),n.arc(128,128,116,0,7),n.fill(),n.fillStyle="#e2321e",n.beginPath(),n.arc(128,128,86,0,7),n.fill(),n.fillStyle="#ffe9b0",n.beginPath(),n.arc(128,136,58,0,7),n.fill(),n.fillStyle="#c9782e",n.beginPath(),n.ellipse(128,132,34,40,0,0,7),n.fill(),n.fillStyle="#f2b8a8",n.beginPath(),n.ellipse(128,156,22,14,0,0,7),n.fill(),n.fillStyle="#fff",[[112,120],[144,120]].forEach(([e,i])=>{n.beginPath(),n.arc(e,i,9,0,7),n.fill()}),n.fillStyle="#111",[[114,121],[142,121]].forEach(([e,i])=>{n.beginPath(),n.arc(e,i,4.5,0,7),n.fill()}),n.strokeStyle="#f4ede2",n.lineWidth=7,n.lineCap="round",n.beginPath(),n.moveTo(100,100),n.quadraticCurveTo(86,82,96,74),n.moveTo(156,100),n.quadraticCurveTo(170,82,160,74),n.stroke(),n.font="900 26px Arial",n.textAlign="center",n.fillStyle="#fff";let t=(e,i,s,r)=>{for(let a=0;a<e.length;a++){let o=s+r*a*.17;n.save(),n.translate(128+Math.cos(o)*i,128+Math.sin(o)*i),n.rotate(o+r*Math.PI/2),n.fillText(e[a],0,8),n.restore()}};t("GRAND",100,-Math.PI/2-.34,1),t("PRIX",100,Math.PI/2+.26,-1)})}function gd(n,t){let e=new le;e.name="plato2023",n.add(e);let i=(E,Y={})=>new _i(Object.assign({color:E,roughness:.6},Y)),s=E=>new Ie({color:E}),r=(E,Y,nt=0,V=0,q=0,dt=e)=>{let St=new ze(E,Y);return St.position.set(nt,V,q),dt.add(St),St},a=yn(256,256,(E,Y,nt)=>{let V=E.createRadialGradient(128,128,10,128,128,180);V.addColorStop(0,"#bfeeff"),V.addColorStop(1,"#6cc8ea"),E.fillStyle=V,E.fillRect(0,0,Y,nt),E.globalAlpha=.18,E.fillStyle="#fff";for(let q=0;q<40;q++)E.beginPath(),E.ellipse(Math.random()*Y,Math.random()*nt,30,8,Math.random()*3,0,7),E.fill()});a.wrapS=a.wrapT=ps,a.repeat.set(4,4);let o=r(new Ne(110,80).rotateX(-Math.PI/2),i("#ffffff",{map:a,roughness:.12,metalness:.15}),0,0,5);o.receiveShadow=!0;let l=yn(2048,512,(E,Y,nt)=>{let V=E.createLinearGradient(0,0,Y,0);V.addColorStop(0,"#ff5ab4"),V.addColorStop(.3,"#8fd0ff"),V.addColorStop(.7,"#8fd0ff"),V.addColorStop(1,"#ff5ab4"),E.fillStyle=V,E.fillRect(0,0,Y,nt),E.fillStyle="#ffffffcc";for(let q=0;q<9;q++){let dt=q*240+60,St=60+q%3*40;for(let yt=0;yt<4;yt++)E.beginPath(),E.arc(dt+yt*26,St+yt%2*8,26,0,7),E.fill()}E.fillStyle="#4fae4a";for(let q=0;q<8;q++){let dt=120+q*260;E.beginPath(),E.ellipse(dt,300,50,70,0,0,7),E.fill(),E.fillStyle="#6a4520",E.fillRect(dt-6,350,12,80),E.fillStyle="#4fae4a"}E.fillStyle="#b8b0a4";for(let q of[140,1880])E.fillRect(q-70,200,140,312),E.fillStyle="#7ec8ff",E.beginPath(),E.arc(q,330,46,Math.PI,0),E.fill(),E.fillRect(q-46,330,92,182),E.fillStyle="#b8b0a4"}),c=r(new ve(52,52,26,40,1,!0,-Math.PI*.72,Math.PI*.44),new Ie({map:l,side:Xe}),0,13,22);c.rotation.y=Math.PI;let h=["#f6c43a","#f08a3a","#9a6ad8","#f27ab0","#c7a6f0","#e85a4a","#f6c43a"],u=yn(128,256,(E,Y,nt)=>{E.fillStyle="#fff",E.fillRect(0,0,Y,nt),E.globalCompositeOperation="source-over";for(let V=0;V<3;V++)for(let q=0;q<2;q++){let dt=18+q*56,St=20+V*80;E.fillStyle="#fff8e0",E.fillRect(dt-4,St-4,44,60),E.fillStyle="#3a6ad8",E.fillRect(dt,St,36,52),E.fillStyle="#ffd",E.fillRect(dt+16,St,4,52),E.fillRect(dt,St+24,36,4),E.fillStyle="#e8508a",E.fillRect(dt-4,St+54,44,8)}});[[-40,-14,-.25],[-31,-19,-.12],[-22,-21,.08],[22,-21,-.08],[31,-19,.12],[40,-14,.25],[-12,-25,0],[12,-25,0]].forEach(([E,Y,nt],V)=>{let q=new le;q.position.set(E,0,Y),q.rotation.z=nt*.4,q.rotation.y=-E/60,e.add(q);let dt=h[V%h.length],St=i(dt,{map:u}),yt=15+V%3*3;r(new Qt(8,yt,4),St,0,yt/2+4,0,q);let Mt=r(new an(6.4,4,4),i("#a8402a"),0,yt+6,0,q);Mt.rotation.y=Math.PI/4,Mt.scale.z=.6,r(new Qt(6,.3,1.2),i("#ffffff"),0,yt*.55+4,2.4,q),r(new Qt(6,.6,.6),i("#3fa04a"),0,yt*.55+4.5,2.8,q)});let f=new le;f.position.set(0,0,-20),e.add(f);let g=yn(256,256,(E,Y,nt)=>{for(let V=0;V<16;V++)for(let q=0;q<8;q++)E.fillStyle=(V+q)%3?"#3f6ad8":"#5a86f0",(V*7+q)%11===0&&(E.fillStyle="#f6c43a"),E.fillRect(q*32+V%2*16-16,V*16,30,14)});r(new Qt(22,12,6),i("#ffffff",{map:g}),0,6,0,f),r(new Qt(24,1,8),i("#f4f0e8"),0,12.3,.5,f);let S=yn(256,64,(E,Y,nt)=>{E.fillStyle="#fff";for(let V=0;V<16;V++)E.beginPath(),E.ellipse(8+V*16,34,5,22,0,0,7),E.fill();E.fillRect(0,0,Y,10),E.fillRect(0,54,Y,10)});r(new Ne(24,3),new Ie({map:S,transparent:!0,side:qe}),0,14.3,4.5,f);let m=yn(128,256,(E,Y,nt)=>{E.fillStyle="#f4f0e8",E.fillRect(0,0,Y,nt),E.fillStyle="#ff6ac8",E.beginPath(),E.arc(64,90,56,Math.PI,0),E.fill(),E.fillRect(8,90,112,166),E.fillStyle="#ffd2f0";for(let V=0;V<6;V++)for(let q=0;q<4;q++)E.fillRect(18+q*24,100+V*24,18,18);E.fillStyle="#7ac8ff",E.beginPath(),E.arc(64,60,26,0,7),E.fill(),E.strokeStyle="#fff",E.lineWidth=3;for(let V=0;V<8;V++)E.beginPath(),E.moveTo(64,60),E.lineTo(64+Math.cos(V*.785)*26,60+Math.sin(V*.785)*26),E.stroke()});for(let E of[-7,7])r(new Ne(5,10),new Ie({map:m}),E,5,3.02,f);let p=yx(),T=r(new ve(3.2,3.2,.5,32).rotateX(Math.PI/2),[i("#ffd21a"),new Ie({map:p}),i("#ffd21a")],0,6.5,3.3,f);r(new ve(1.6,1.6,.3,24).rotateX(Math.PI/2),[i("#ffd21a"),new Ie({map:p}),i("#ffd21a")],0,16.5,4.5,f);for(let E of[-5,5]){let Y=r(new Ne(3.6,2.2),i((E<0,"#1f4fc8")),E,16.5,4.5,f);r(new ki(.8,20),new Ie({map:p}),E,16.5,4.52,f)}for(let E=0;E<3;E++)r(new Qt(26-E*2,.5,2),i("#4fe0e8",{emissive:"#1ab8d0",emissiveIntensity:.5}),0,.25+E*.5,4.5-E*1.4,f);let L={},b=new ve(.14,.2,1.4,6);function y(E,Y){let nt=new le;nt.position.set(E*26,0,-8),nt.rotation.y=E*.32,e.add(nt);let V=26;for(let Et=0;Et<6;Et++)r(new Qt(V,1.3,3),i("#3fc6dc",{roughness:.4}),0,.65+Et*1.3,10-Et*3,nt),r(new Qt(V,.12,.12),s("#9ff8ff"),0,1.32+Et*1.3,11.5-Et*3,nt);let q=22,dt=new zn(b,i("#ffffff"),q*2),St=new Te;for(let Et=0;Et<q;Et++)for(let Nt=0;Nt<2;Nt++)St.position.set(-V/2+.6+Et*(V-1.2)/(q-1),(Nt?7.8:2)+.7,Nt?0-.5:9),St.updateMatrix(),dt.setMatrixAt(Et*2+Nt,St.matrix);nt.add(dt);for(let[Et,Nt]of[[3.4,9],[9.2,-.5]])r(new Qt(V,.3,.5),i("#ffffff"),0,Et,Nt,nt);let yt=t?80:180,Mt=new zn(new Bi(.32,.7,2,6),i("#ffffff"),yt);for(let Et=0;Et<yt;Et++){let Nt=1+Et%5;St.position.set(-V/2+1+Math.random()*(V-2),1.95+Nt*1.3,10-Nt*3+Math.random()*.6),St.updateMatrix(),Mt.setMatrixAt(Et,St.matrix),Mt.setColorAt(Et,new Kt(En[Y]).offsetHSL(0,0,(Math.random()-.5)*.15))}return nt.add(Mt),nt.userData.crowd=Mt,nt}let v=y(-1,"azul"),A=y(1,"amarillo"),_=new le;_.position.set(-40,0,16),_.rotation.y=Math.PI/2,e.add(_),r(new Qt(20,1.4,10),i("#ffffff"),0,.7,0,_);let w=r(new Qt(19,.2,9),i("#1ab0e8",{roughness:.08,metalness:.2,transparent:!0,opacity:.9}),0,1.35,0,_),C=yn(512,256,(E,Y,nt)=>{E.fillStyle="#e8d8c8",E.fillRect(0,0,Y,nt);for(let V=0;V<4;V++){let q=64+V*128;E.fillStyle="#ff8a3a",E.beginPath(),E.arc(q,110,46,Math.PI,0),E.fill(),E.fillRect(q-46,110,92,130),E.fillStyle="#ffd2a0",E.fillRect(q-3,70,6,170)}});r(new Ne(22,11),new Ie({map:C}),0,5.5,-5.5,_);let B=r(new Ne(10,5.6),s("#ffffff"),0,14,-5.4,_);r(new Qt(10.6,6.2,.4),i("#111"),0,14,-5.7,_);let N=new le;N.position.set(9,0,-12),e.add(N),r(new Qt(9,2.2,1.6),i("#1f4fc8"),0,1.1,0,N),r(new Qt(9.4,.3,2),i("#ffd21a"),0,2.3,0,N);let G=[];for(let E of[-2.4,2.4]){let Y=r(new Ne(4,1.6),new Ie({color:"#fff"}),E,1.2,.81,N);G.push(Y)}let F=new le;F.position.set(-6,0,-9),e.add(F),r(new Qt(1.6,2.4,1),i("#ffd21a"),0,1.2,0,F),r(new Qt(2,.25,1.3),i("#ffe86a"),0,2.5,.1,F);for(let E of[-.7,.7])r(new ve(.08,.08,3,6),i("#ffd21a"),E,1.5,-.6,F);function U(E,Y){[E,Y].forEach((nt,V)=>{let q=yn(256,96,dt=>{dt.fillStyle="#ffd21a",dt.fillRect(0,0,256,96),dt.fillStyle="#1f4fc8",dt.fillRect(6,6,244,84),dt.fillStyle="#fff",dt.font="900 40px Arial",dt.textAlign="center",dt.fillText(String(nt).toUpperCase().slice(0,12),128,62)});G[V].material.map=q,G[V].material.needsUpdate=!0})}U("AZUL","AMARILLO");let $=new le;e.add($);let W=i("#2a2a30",{metalness:.6});for(let E of[-14,0,14])r(new Qt(90,.6,.6),W,0,26,E,$);for(let E of[-30,0,30])r(new Qt(.6,.6,40),W,E,26,0,$);r(new Ne(120,80).rotateX(Math.PI/2),s("#0a0c14"),0,30,0,$);let O=new zn(new ve(.6,.8,1.2,8),s("#ffffff"),36),P=new Te;for(let E=0;E<36;E++)P.position.set(-42+E%12*7.6,25.2,-14+Math.floor(E/12)*14),P.updateMatrix(),O.setMatrixAt(E,P.matrix);$.add(O);let I=new Ie({color:"#cfe8ff",transparent:!0,opacity:t?.05:.08,depthWrite:!1,blending:Lr,side:qe}),X=[];for(let E=0;E<(t?4:8);E++){let Y=r(new an(2.6,24,12,1,!0),I,-30+E*(60/(t?3:7)),13.5,-6+E%2*10);X.push(Y)}for(let E=0;E<10;E++)r(new Le(.35,8,6),s("#3a7aff"),-40+E*9,24,15);let at=new le;e.add(at);let et=new le;et.position.set(10,0,4),at.add(et);for(let E=0;E<5;E++){let Y=r(new Qt(5,.6,3),i(E%2?"#2a5ad8":"#3a7aff"),-3+E%3*4.2,.3,-1+Math.floor(E/3)*3.2,et);Y.rotation.y=(E-2)*.12}for(let E=0;E<3;E++)r(new Qt(8-E*1.6,.7,2.4-E*.4),i("#e2321e"),4,.35+E*.7,-4+E*.3,et);let vt=[];[[0,0],[.9,.1],[1.2,.6],[1.1,1.4],[.7,2.3],[.45,2.9],[.6,3.5],[.55,4.1],[0,4.4]].forEach(([E,Y])=>vt.push(new _t(E,Y)));let Tt=yn(64,256,E=>{E.fillStyle="#fff",E.fillRect(0,0,64,256),E.fillStyle="#ffd21a",E.fillRect(0,0,22,256),E.fillRect(42,0,22,256),E.fillStyle="#fff",E.fillRect(0,40,64,14)}),Ht=new Mr(vt,14),Q=i("#ffffff",{map:Tt,roughness:.35}),ot=[];[[2,-4.4],[4,-4.1],[6,-3.8],[3,-2.4],[5,-2.2]].forEach(([E,Y])=>{let nt=r(Ht,Q,E,2.1,Y,et);nt.scale.setScalar(.9),ot.push(nt)});let bt=yn(256,128,E=>{["#ffffff","#ffd21a","#ffffff","#3a9aff","#ffffff","#ff5a3a"].forEach((Y,nt)=>{E.fillStyle=Y,E.fillRect(nt*43,0,43,128)})}),Pt=new le;Pt.position.set(-2,25.5,4),at.add(Pt);let wt=r(new ve(.04,.04,21,4),s("#ddd"),0,-10.5,0,Pt),Gt=r(new Le(1.6,20,14),i("#fff",{map:bt,roughness:.3}),0,-21.5,0,Pt),Wt=new le;Wt.position.set(30,0,12),Wt.rotation.y=-Math.PI/3,at.add(Wt);let lt=yn(256,64,E=>{for(let Y=0;Y<8;Y++)E.fillStyle=Y%2?"#fff":"#e2321e",E.fillRect(Y*32,0,32,64)}),ft=r(new Ne(12,4),i("#fff",{map:lt,side:qe}),0,9,0,Wt);ft.rotation.x=-1;for(let E of[-5.6,5.6])r(new ve(.15,.15,9,6),i("#ddd"),E,4.5,1.6,Wt);let ht=[];for(let E=0;E<4;E++){let Y=new le;Y.position.set(-6+E*4,0,4),Wt.add(Y);let nt=E%2;r(new Le(1,12,10),i(nt?"#222":"#ffd21a"),0,1.6,0,Y).scale.set(1,1.4,1),r(new Le(.65,10,8),i(nt?"#222":"#ffd21a"),0,3.2,0,Y),nt&&r(new Le(.7,10,8),i("#fff"),0,1.6,.4,Y).scale.set(.8,1.2,.6),r(new an(.25,.7,8).rotateX(Math.PI/2),i("#ff8a1a"),0,3.1,.8,Y),ht.push(Y)}let mt=new le;mt.visible=!1,e.add(mt);let pt=[],Vt=i("#ffd21a"),kt=i("#1a2a6a"),Xt=i("#ffffff"),qt=i("#ff8a1a"),k=new Le(1,10,8),te=new Le(.62,10,8),ee=new an(.22,.6,6).rotateX(Math.PI/2),R=new Qt(.5,.15,.7);for(let E=0;E<(t?16:26);E++){let Y=new le,nt=E%2,V=nt?kt:Vt;r(k,V,0,1.5,0,Y).scale.set(.9,1.3,.9),r(te,V,0,3,0,Y),nt&&r(k,Xt,0,1.4,.45,Y).scale.set(.6,1,.5),r(ee,qt,0,2.9,.7,Y),r(R,qt,-.35,.08,.3,Y),r(R,qt,.35,.08,.3,Y);let q=E*2.39,dt=3+E%7*2.2;Y.position.set(Math.cos(q)*dt,0,Math.sin(q)*dt*.7-2),Y.userData={a:q,r:dt,ph:Math.random()*6},mt.add(Y),pt.push(Y)}let x=[];for(let E=0;E<2;E++){let Y=r(new Le(1.8,16,12),new _i({color:"#dff6ff",transparent:!0,opacity:.35,roughness:.05}),-4+E*8,1.8,3,mt);x.push(Y)}let Z=[];for(let E=0;E<3;E++){let Y=new le,nt=yn(64,64,V=>{for(let q=0;q<8;q++)V.fillStyle=q%2?"#fff":"#2a4ad8",V.fillRect(0,q*8,64,8)});r(new Le(1.5,14,10),i("#fff",{map:nt}),0,2,0,Y).scale.set(1,1.15,1),r(new Le(1.1,12,8,0,6.3,0,1.6),Vt,0,1,0,Y).rotation.x=Math.PI,r(te,i("#f1c6a0"),0,3.6,0,Y).scale.setScalar(.6),Y.position.set(-3+E*3,0,-1),mt.add(Y),Z.push(Y)}function K(E){pt.forEach((Y,nt)=>{let V=Y.userData;Y.position.y=Math.abs(Math.sin(E*4.2+V.ph))*.6,Y.rotation.y=Math.sin(E*1.5+V.ph)*.8,Y.rotation.z=Math.sin(E*4.2+V.ph)*.15;let q=V.a+E*.15*(nt%2?1:-1);Y.position.x=Math.cos(q)*V.r,Y.position.z=Math.sin(q)*V.r*.7-2}),x.forEach((Y,nt)=>{Y.position.x=-6+nt*10+Math.sin(E*.8+nt)*4,Y.rotation.z=-E*(nt?1:-1)}),Z.forEach((Y,nt)=>{Y.position.y=Math.abs(Math.sin(E*3+nt))*.5,Y.rotation.y=Math.sin(E*2+nt)*.5})}return{dancers:mt,dance:K,G:e,gl:v,gr:A,screen:B,setTowns:U,castle:f,pool:_,desk:N,lectern:F,bowl:et,ball:Gt,pivot:Pt,ducks:ht,pins:ot,medal:T,update(E){Pt.rotation.z=Math.sin(E*1.1)*.35,Pt.rotation.x=Math.sin(E*.7)*.1,X.forEach((Y,nt)=>{Y.rotation.z=Math.sin(E*.5+nt)*.25,Y.rotation.x=Math.cos(E*.4+nt)*.2}),ht.forEach((Y,nt)=>{Y.position.x=-6+(nt*4+E*1.5)%16,Y.rotation.z=Math.sin(E*6+nt)*.1}),w.position.y=1.35+Math.sin(E*2)*.03},SHOTS:{overview:[[0,14,42],[0,7,-12]],pool:[[-18,9,16],[-40,8,16]],host:[[-4,4,0],[-6,3,-9]],board:[[-24,13,16],[-45,13,16]],logo:[[0,9,-5],[0,8,-17]],vaca:[[16,5,24],[14,2,12]],dino:[[-16,5,24],[-14,2,12]],ramp:[[0,8,22],[10,2,1]],arena:[[14,7,26],[26,3,14]],ring:[[0,14,42],[0,7,-12]],bolera:[[-4,7,20],[8,3,0]],pato:[[18,6,28],[30,4,14]],gradas:[[0,8,14],[26,6,-10]]}}}var _d=["auto","media","alta","ultra"],xd={auto:"Auto",media:"Media",alta:"Alta",ultra:"Ultra (4K)"},vx={media:1,alta:2,ultra:3};function yd(n,t){let e=t==="media"||t==="auto"&&(navigator.hardwareConcurrency||4)<=4,i=new il({antialias:!e,powerPreference:"high-performance"}),s=t==="auto"?e?1:Math.min(devicePixelRatio,2):Math.min(devicePixelRatio*1.5,vx[t]);i.setPixelRatio(s),i.setSize(innerWidth,innerHeight),i.outputColorSpace=De,i.toneMapping=Dr,i.shadowMap.enabled=!e,i.shadowMap.type=lo,n.appendChild(i.domElement);let r=new ar;r.background=new Kt("#7fc6ff"),r.fog=new rr("#bfe4ff",90,220);let a=new Je(55,innerWidth/innerHeight,.1,500);a.position.set(0,24,58);let o=(it,D={})=>new _i(Object.assign({color:it,roughness:.7},D)),l=(it,D,rt=0,st=0,xt=0,gt=r)=>{let ut=new ze(it,D);return ut.position.set(rt,st,xt),ut.castShadow=ut.receiveShadow=!e,gt.add(ut),ut};r.add(new wr("#ffffff","#c8a070",1.1));let c=new Rr("#fff4d8",2.2);c.position.set(30,60,25),c.castShadow=!e,c.shadow.mapSize.set(1024,1024),Object.assign(c.shadow.camera,{left:-60,right:60,top:60,bottom:-60}),r.add(c);let h={},u=it=>{let D=new le;return D.name=it,r.add(D),h[it]=D,D},d=u("base");l(new Ne(400,400).rotateX(-Math.PI/2),o("#e9cf93"),0,0,0,d),l(new ki(48,48).rotateX(-Math.PI/2),o("#f3e2b0"),0,.02,0,d);let f=u("pool");l(new Qt(34,1.2,18),o("#ffffff"),0,.6,0,f);let g=l(new Qt(32,.2,16),o("#28b8e8",{roughness:.15,metalness:.1,transparent:!0,opacity:.9}),0,1.1,0,f),S=[];for(let it=0;it<3;it++){let D=l(new ve(2.2,2.2,.5,20),o(["#ff5a3a","#ffd21a","#3a8aff"][it]),-9+it*9,1.6,0,f);S.push(D)}let m=l(new ve(.9,.9,30,16).rotateZ(Math.PI/2),o("#8a5a2a"),0,3,-5.5,f),p=new le;p.position.set(9,1.4,4),f.add(p),l(new ve(.6,.6,2,12),o("#e23a2a"),0,.8,0,p),l(new Qt(12,.5,.5),o("#ff9b1a"),6,1.6,0,p);let T=u("ramp");T.position.set(-30,0,-6);let L=new Qt(6,.6,18),b=l(L,o("#ffffff",{roughness:.2}),0,4,0,T);b.rotation.x=-.45,l(new Qt(6.6,9,1),o("#2a6ad8"),0,4.5,-8.6,T),l(new Le(.8,12,10),o("#ffd21a",{metalness:.8,roughness:.3}),0,10,-8.6,T);let y=u("ring");y.position.set(0,0,-48),l(new ve(22,22,.1,48),o("#e3b36a"),0,.06,0,y);let v=l(new ve(22.5,22.5,2,48,1,!0),o("#b8322a",{side:qe}),0,1,0,y);for(let it=0;it<4;it++)l(new ve(30-it*.1+it*2.5,23+it*2.5,1.6,48,1,!0),o(it%2?"#f4ede2":"#d9cbb3",{side:qe}),0,2.6+it*1.6,0,y);let A=u("arena");A.position.set(0,0,-44),l(new Qt(44,.3,22),o("#5fbf5a"),0,.15,0,A);for(let it=0;it<6;it++)l(new Qt(3,3,3),o(["#ff5a3a","#ffd21a","#3a8aff"][it%3]),-15+it*6,1.8,6*(it%2?1:-1)*.5,A);for(let it=0;it<2;it++)l(new Sr(4,.5,10,30),o("#ffffff"),-10+it*20,4.5,-8,A);let _=u("gradas");for(let it of[-1,1]){let D=new le;D.position.set(it*42,0,4),D.rotation.y=-it*Math.PI/2,_.add(D);for(let gt=0;gt<5;gt++)l(new Qt(40,1.2,2),o(it<0?"#2a6ad8":"#f3c21a"),0,.6+gt*1.2,-gt*2,D);let rt=new Te,st=e?60:160,xt=new zn(new Bi(.35,.6,2,6),o("#ffffff"),st);for(let gt=0;gt<st;gt++)rt.position.set(-19+Math.random()*38,1.9+gt%5*1.2,-(gt%5)*2),rt.updateMatrix(),xt.setMatrixAt(gt,rt.matrix),xt.setColorAt(gt,new Kt().setHSL(it<0?.6:.14,.8,.4+Math.random()*.3));D.add(xt)}let w=u("board");w.position.set(0,0,26);let C=document.createElement("canvas");C.width=1024,C.height=512;let B=new mi(C);B.colorSpace=De,l(new Qt(22,12,1),o("#111"),0,10,0,w);let N=l(new Ne(21,10.5),new Ie({map:B}),0,10,-.55,w);N.rotation.y=Math.PI,l(new Qt(1,5,1),o("#666"),-8,2.5,0,w),l(new Qt(1,5,1),o("#666"),8,2.5,0,w);function G(it,D="CLASIFICACI\xD3N"){let rt=C.getContext("2d"),st=rt.createLinearGradient(0,0,0,512);st.addColorStop(0,"#0a2a7a"),st.addColorStop(1,"#03103a"),rt.fillStyle=st,rt.fillRect(0,0,1024,512),rt.fillStyle="#ffd21a",rt.font="900 56px Arial",rt.textAlign="center",rt.fillText(D,512,70);let xt=Math.min(100,400/Math.max(1,it.length));it.forEach((gt,ut)=>{let Ot=100+ut*xt;rt.fillStyle=En[gt.color]||gt.color,rt.fillRect(40,Ot,944,xt-12),rt.fillStyle=gt.color==="amarillo"?"#3a1a00":"#fff",rt.font=`900 ${Math.round(xt*.5)}px Arial`,rt.textAlign="left",rt.fillText(gt.name.toUpperCase().slice(0,22),70,Ot+xt*.6),rt.textAlign="right",rt.fillText(String(gt.pts),950,Ot+xt*.6)}),B.needsUpdate=!0}G([{name:"Azul",color:"azul",pts:0},{name:"Amarillo",color:"amarillo",pts:0}]);let F=u("logo");F.position.set(0,0,-20);let U=document.createElement("canvas");U.width=1024,U.height=384;let $=new mi(U);$.colorSpace=De;let W=new Ss,O=9,P=3.2,I=1.4;W.moveTo(-O+I,-P),W.lineTo(O-I,-P),W.quadraticCurveTo(O,-P,O,-P+I),W.lineTo(O,P-I),W.quadraticCurveTo(O,P,O-I,P),W.lineTo(-O+I,P),W.quadraticCurveTo(-O,P,-O,P-I),W.lineTo(-O,-P+I),W.quadraticCurveTo(-O,-P,-O+I,-P);let X=l(new br(W,{depth:1,bevelEnabled:!0,bevelSize:.3,bevelThickness:.3,bevelSegments:2}),o("#e2321e",{metalness:.3,roughness:.4}),0,12,0,F),at=l(new Ne(17.4,6.4),new Ie({map:$,transparent:!0}),0,12,1.35,F),et=l(new ve(4,4,.8,32).rotateX(Math.PI/2),o("#ffc81a",{emissive:"#ff9a00",emissiveIntensity:.4}),7.5,15,-.4,F),vt=new le;vt.position.set(7.5,15,-.6),F.add(vt);for(let it=0;it<12;it++){let D=l(new an(.6,2.2,6),o("#ffb000"),0,0,0,vt),rt=it/12*Math.PI*2;D.position.set(Math.cos(rt)*5.4,Math.sin(rt)*5.4,0),D.rotation.z=rt-Math.PI/2}l(new ve(.4,.4,9,8),o("#999"),0,4.5,0,F);function Tt(it="GRAND PRIX",D="DEL VERANO"){let rt=U.getContext("2d");rt.clearRect(0,0,1024,384),rt.textAlign="center",rt.font=`900 ${it.length>14?92:150}px Arial Black, Arial`,rt.lineWidth=18,rt.strokeStyle="#7a1000",rt.strokeText(it,512,220),rt.fillStyle="#fff",rt.fillText(it,512,220),rt.font="900 64px Arial",rt.fillStyle="#ffd21a",rt.lineWidth=10,rt.strokeStyle="#7a1000",rt.strokeText(D,512,320),rt.fillText(D,512,320),$.needsUpdate=!0}Tt();let Ht=u("deco");for(let it=0;it<8;it++){let D=it/8*Math.PI*2+.2,rt=Math.cos(D)*52,st=Math.sin(D)*52;l(new ve(.4,.6,9,6),o("#8a6a3a"),rt,4.5,st,Ht);for(let xt=0;xt<5;xt++)l(new an(.8,5,4),o("#2f9a3a"),rt,9,st,Ht).rotation.set(1.2,xt*1.25,0)}let Q=new zn(new an(.5,1,3),new Ie({color:"#fff"}),60),ot=new Te;for(let it=0;it<60;it++){let D=it/60;ot.position.set(-36+D*72,14-Math.sin(D*Math.PI)*3,10),ot.rotation.set(Math.PI,0,0),ot.updateMatrix(),Q.setMatrixAt(it,ot.matrix),Q.setColorAt(it,new Kt(["#e23a2a","#ffd21a","#2a6ad8","#2fb84a"][it%4]))}Ht.add(Q);let bt=u("chars");function Pt(it,D,rt,st=1,xt="#f1c6a0"){let gt=new le;return gt.position.set(D,0,rt),gt.scale.setScalar(st),l(new ve(.35,.45,1.6,8),o(it),0,1.6,0,gt),l(new Le(.38,10,8),o(xt),0,2.75,0,gt),l(new Qt(.5,.9,.5),o("#333"),0,.45,0,gt),bt.add(gt),gt}let wt=Pt("#ffffff",-4,14),Gt=Pt("#ff5aa0",4,14),Wt=new le;Wt.position.set(14,0,12),bt.add(Wt),l(new Qt(2.4,1.2,1.1),o("#7a4a22"),0,1.6,0,Wt),l(new Qt(.9,.8,.8),o("#7a4a22"),1.5,2.2,0,Wt);for(let[it,D]of[[-.9,-.4],[-.9,.4],[.9,-.4],[.9,.4]])l(new ve(.15,.15,1,6),o("#3b2412"),it,.5,D,Wt);for(let it of[-.3,.3]){let D=l(new an(.12,.5,6),o("#f4ede2"),1.6,2.8,it,Wt)}let lt=new le;lt.position.set(-14,0,12),bt.add(lt),l(new Le(1.1,12,10),o("#4fbf3a"),0,2,0,lt).scale.set(1.3,1,1),l(new Le(.7,10,8),o("#4fbf3a"),.9,3.3,0,lt),l(new an(.5,2,8).rotateZ(Math.PI/2),o("#4fbf3a"),-1.8,1.8,0,lt);for(let it of[-.5,.5])l(new ve(.25,.3,1.2,6),o("#3a9a2a"),0,.6,it,lt);let ft=Pt("#9a3aff",0,18,1,"#ffffff");l(new Le(.12,8,6),o("#ff0000"),0,2.75,.38,ft);let ht=gd(r,e);ht.screen.material.map=B,ht.screen.material.needsUpdate=!0,ht.G.add(bt);let mt=[d,f,T,A,_,w,F,Ht],pt=!1,Vt={classic:[y],modern:[A,lt,ft]};function kt(it){pt=!it.bullring,ht.G.visible=pt,mt.forEach(D=>{D.visible=!pt}),bt.visible=!0,r.add(bt),wt.position.set(pt?-6:-4,0,pt?-7.5:14),Gt.position.set(pt?-3:4,0,pt?-7:14),c.intensity=pt?1.2:2.2,r.fog.near=pt?120:90,y.visible=!!it.bullring,A.visible=!it.bullring&&!pt,lt.visible=!!it.dino,ft.visible=!!it.clown,Wt.children.forEach(D=>{D.material&&D.material.color&&D.geometry.type==="BoxGeometry"&&D.material.color.set(it.vaquilla==="botarga"?"#c98a4a":"#7a4a22")}),r.background.set(pt?"#06070c":it.navidad?"#1a2a4a":"#7fc6ff"),r.fog.color.set(pt?"#10121c":it.navidad?"#2a3a5a":"#bfe4ff"),Tt(it.title,it.id==="e1995"?"1995":it.navidad?"DE LA NAVIDAD":"DEL VERANO")}let Xt={overview:[[0,30,62],[0,2,0]],pool:[[0,12,24],[0,1,0]],ramp:[[-16,10,12],[-30,4,-6]],ring:[[0,18,-14],[0,0,-48]],arena:[[0,14,-18],[0,0,-44]],board:[[0,10,10],[0,10,26]],logo:[[0,13,2],[0,12,-20]],host:[[0,4,24],[0,2.4,14]],vaca:[[20,5,22],[14,2,12]],dino:[[-20,5,22],[-14,2,12]]},qt=null,k=null,te=1,ee=1,R=null,x=0;function Z(it,D=1.6){let rt=pt?ht.SHOTS:Xt,st=rt[it]||rt.overview;qt=[a.position.clone(),(a.userData.look||new z).clone()],k=[new z(...st[0]),new z(...st[1])],te=0,ee=D,x=0}function K(it){it&&!R?(R=new ol(a,i.domElement),R.target.copy(a.userData.look||new z),R.maxPolarAngle=1.45,R.enableDamping=!0):!it&&R&&(R.dispose(),R=null)}let E={on:!1,f:0,s:0,yaw:0,pitch:-.05};function Y(it){E.on=it,it&&(a.position.set(0,2.2,pt?24:34),E.yaw=0)}let nt=!1;function V(it){nt=it}let q=new Cr,dt=60,St=0,yt=0,Mt=!1,Et=[];function Nt(){if(requestAnimationFrame(Nt),Mt)return;let it=Math.min(.05,q.getDelta()),D=q.elapsedTime;if(St++,yt+=it,yt>1&&(dt=St/yt,St=0,yt=0,t==="auto"&&dt<28&&s>.75&&(s=Math.max(.75,s-.25),i.setPixelRatio(s),i.shadowMap.enabled&&s<=1&&(i.shadowMap.enabled=!1))),S.forEach((rt,st)=>{rt.position.z=Math.sin(D*.8+st*2)*5}),m.rotation.x=D*2,p.rotation.y=D*1.2,vt.rotation.z=D*.3,F.rotation.y=Math.sin(D*.4)*.15,Wt.position.x=14+Math.sin(D*.5)*3,Wt.rotation.y=Math.cos(D*.5)>0?0:Math.PI,lt.rotation.y=Math.sin(D)*.4,ft.rotation.y=D*2,wt.rotation.y=Math.sin(D*.7)*.3,te<1&&k){te=Math.min(1,te+it/ee);let rt=te*te*(3-2*te);a.position.lerpVectors(qt[0],k[0],rt);let st=new z().lerpVectors(qt[1],k[1],rt);a.lookAt(st),a.userData.look=st}else if(nt&&!R&&!E.on){x+=it*.08;let rt=pt?34:60;a.position.set(Math.sin(x)*rt*.8,pt?12:26,(pt?8:0)+Math.cos(x)*rt*.6),a.lookAt(0,pt?6:2,pt?-6:0),a.userData.look=new z(0,2,0)}if(R&&R.update(),E.on){E.yaw-=E.s*it*1.6;let rt=new z(Math.sin(E.yaw),0,Math.cos(E.yaw)).multiplyScalar(-E.f*it*9);a.position.add(rt),a.position.y=2.2,a.lookAt(a.position.x-Math.sin(E.yaw),2.2+E.pitch,a.position.z-Math.cos(E.yaw))}pt&&(ht.update(D),ht.dancers.visible&&ht.dance(D)),Et.forEach(rt=>rt(it,D)),i.render(r,a)}return Nt(),addEventListener("resize",()=>{a.aspect=innerWidth/innerHeight,a.updateProjectionMatrix(),i.setSize(innerWidth,innerHeight)}),{scene:r,camera:a,renderer:i,Z:h,shot:Z,drawBoard:G,drawLogo:Tt,setEtapa:kt,orbitMode:K,walkMode:Y,walk:E,setAutoOrbit:V,ticks:Et,get fps(){return dt},pause(it){Mt=it},chars:{host:wt,co:Gt,vaca:Wt,dino:lt,clown:ft},P23:ht,cam(it,D){te=1,a.position.set(...it);let rt=new z(...D);a.lookAt(rt),a.userData.look=rt},get modern(){return pt},setTowns:(it,D)=>ht.setTowns(it,D)}}function bx(n=512){let t=document.createElement("canvas");t.width=t.height=n;let e=t.getContext("2d"),i=n/256;e.scale(i,i),e.fillStyle="#2f9a3a",e.beginPath(),e.arc(128,128,126,0,7),e.fill(),e.fillStyle="#7ad04a";for(let s=0;s<28;s++){let r=s/28*Math.PI*2;e.save(),e.translate(128+Math.cos(r)*112,128+Math.sin(r)*112),e.rotate(r+.6),e.beginPath(),e.ellipse(0,0,11,5,0,0,7),e.fill(),e.restore()}return e.fillStyle="#ffffff",e.beginPath(),e.arc(128,128,98,0,7),e.fill(),e.fillStyle="#1f6fe0",e.beginPath(),e.arc(128,128,92,0,7),e.fill(),e.fillStyle="#ff8a2a",e.beginPath(),e.arc(128,138,48,0,7),e.fill(),e.fillStyle="#c9782e",e.beginPath(),e.ellipse(128,136,30,36,0,0,7),e.fill(),e.fillStyle="#f2b8a8",e.beginPath(),e.ellipse(128,158,20,12,0,0,7),e.fill(),e.fillStyle="#fff",[112,144].forEach(s=>{e.beginPath(),e.arc(s,124,8,0,7),e.fill()}),e.fillStyle="#111",[114,142].forEach(s=>{e.beginPath(),e.arc(s,125,4,0,7),e.fill()}),e.strokeStyle="#f4ede2",e.lineWidth=6,e.lineCap="round",e.beginPath(),e.moveTo(102,106),e.quadraticCurveTo(90,90,98,82),e.moveTo(154,106),e.quadraticCurveTo(166,90,158,82),e.stroke(),e.font="900 34px Arial Black, Arial",e.textAlign="center",e.lineWidth=6,e.strokeStyle="#7a3a00",e.fillStyle="#ffd21a",e.strokeText("GRAND",128,78),e.fillText("GRAND",128,78),e.strokeText("PRIX",128,214),e.fillText("PRIX",128,214),t}var Yr=[[7,[0,2,10],[0,1.6,0],"dance"],[9,[12,6,8],[26,6,-10]],[11,[-2,2.6,7],[0,2.2,-2],"co"],[15,[6,3,10],[0,1.6,-1],"inflat"],[20,[-6,4,12],[0,1,-2]],[25,[3,3,9],[0,1.8,3]],[27,[-4,3,6],[-3,2.4,-7],"co2"],[30,[-12,6,8],[-26,6,-10]],[33,[2,2.6,8],[0,2,-2],"co"],[37,[-10,3,18],[-14,2,12]],[39,[18,4,20],[14,2,12]],[43,[12,6,8],[26,6,-10]],[44,[-12,6,8],[-26,6,-10]],[45,[0,15,26],[0,0,-2],"wide"],[55,[-12,7,8],[-26,6,-10]],[57.5,[12,7,8],[26,6,-10]],[60,[0,3,10],[0,2.4,-4],"host"],[63,[-12,6,8],[-26,6,-10]],[65,[0,4,14],[0,2.4,-2],"host2"],[72,[0,5,16],[0,2.4,-1],"grupo"]],Mx=[[8,"Producci\xF3n ejecutiva","Iker Rodriguez Tejedor"],[13,"Direcci\xF3n de entretenimiento","Grand Prix 3D"],[18,"Producci\xF3n","Remake de fans"],[23,"Dise\xF1o del plat\xF3","Three.js"],[28,"Realizaci\xF3n","Iker R. T."],[33,"Direcci\xF3n","Iker Rodriguez Tejedor"],[38,"Voces","Piper TTS"]];function ll(n,t,{mode:e="recreada",skip:i}={}){return new Promise(s=>{if(e==="video")return Ex(s);let r=document.getElementById("cab"),a=r.getContext("2d");r.classList.remove("hidden");let o=()=>innerWidth,l=()=>innerHeight,c=()=>{r.width=o(),r.height=l()};c(),addEventListener("resize",c);let h=n.P23,u=n.modern;h.dancers.visible=!0,n.setAutoOrbit(!1);let d=n.chars.host,f=n.chars.co,g=n.chars.dino,S=n.chars.vaca,m=ks("tema",{loop:!1}),p=performance.now(),T=()=>m&&!m.paused&&m.currentTime>0?m.currentTime:(performance.now()-p)/1e3,L=bx(512),b=0,y=-1,v=!1,A=()=>{v||(v=!0,cancelAnimationFrame(b),removeEventListener("resize",c),r.classList.add("hidden"),h.dancers.visible=!1,hn(),d.position.set(-6,0,-7.5),f.position.set(-3,0,-7),document.getElementById("skip").classList.add("hidden"),s())},_=document.getElementById("skip");_.classList.remove("hidden"),_.onclick=A;function w(){b=requestAnimationFrame(w);let C=T();if(C>=78||m&&m.ended)return A();let B=o(),N=l();if(a.clearRect(0,0,B,N),C<7){Sx(a,B,N,C,L);return}let G=0;for(let O=0;O<Yr.length;O++)C>=Yr[O][0]&&(G=O);let F=Yr[G],U=Yr[G+1]?Yr[G+1][0]:78,$=(C-F[0])/(U-F[0]),W=F[1].map((O,P)=>O+(P===0?Math.sin($*1.2)*1.5:0)+(P===2?-$*2:0));n.cam(W,F[2]),G!==y&&(y=G,a.fillStyle="#fff"),(F[3]==="co"||F[3]==="co2")&&f.position.set(F[3]==="co2"?-3:0,Math.abs(Math.sin(C*4))*.3,F[3]==="co2"?-7:-2),C>=60&&d.position.set(0,0,Math.min(-2,-12+(C-60)*2.5)),C>=72&&(f.position.set(2.2,0,-1.5),g.position.set(-4,0,-2),S.position.set(4.5,0,-2));for(let[O,P,I]of Mx)C>=O&&C<O+4.2&&(a.font=`900 ${Math.round(N*.03)}px Arial`,a.fillStyle="#fff",a.shadowColor="#000",a.shadowBlur=6,a.textAlign="left",a.fillText(P.toUpperCase(),B*.06,N*.84),a.font=`700 ${Math.round(N*.022)}px Arial`,a.fillText(I.toUpperCase(),B*.06,N*.88),a.shadowBlur=0);if(C>=61.5&&C<66){let O=B*.26,P=N*.07,I=B*.37,X=N*.82;a.fillStyle="#ff7a1a",a.beginPath(),a.roundRect(I,X,O,P,8),a.fill(),a.strokeStyle="#ffd21a",a.lineWidth=3,a.stroke(),a.font=`900 ${Math.round(P*.5)}px Arial`,a.fillStyle="#fff",a.textAlign="center",a.fillText(Ke[t.host].name.toUpperCase(),I+O/2,X+P*.68)}C>76.5&&(a.fillStyle=`rgba(255,255,255,${(C-76.5)/1.5})`,a.fillRect(0,0,B,N))}b=requestAnimationFrame(w)})}function Sx(n,t,e,i,s){n.imageSmoothingEnabled=!1;let r=Math.max(4,Math.round(t/160)),a=(h,u,d,f,g)=>{n.fillStyle=g,n.fillRect(Math.round(h/r)*r,Math.round(u/r)*r,Math.ceil(d/r)*r,Math.ceil(f/r)*r)};a(0,0,t,e,i<2?"#3a8ae8":"#1f5fd0");for(let h=0;h<6;h++){let u=(h*260+i*30)%(t+200)-100,d=e*(.1+h%3*.1);a(u,d,70,14,"#fff"),a(u+14,d-12,42,14,"#fff")}if(i<2){a(0,e*.48,t,e*.22,"#2fa8e8");for(let f=0;f<6;f++)a((f*180+i*60)%t,e*(.52+f%3*.05),60,r,"#bfe8ff");a(0,e*.7,t,e*.3,"#f2c66a"),a(0,e*.7,t,r*2,"#fff");let h=(f,g)=>{a(f,e*.72,28,28,"#c9782e"),a(f+4,e*.69,20,14,"#c9782e"),a(f+6,e*.66,4,8,"#fff"),a(f+18,e*.66,4,8,"#fff"),a(f+2,e*.76,24,10,g)};h(t*.22+Math.sin(i*6)*6,"#1f6fe0"),h(t*.45+Math.sin(i*6+1)*6,"#ffd21a");let u=t*.6+i*40,d=e*.74-Math.abs(Math.sin(i*5))*50;if(a(u,d,24,24,"#fff"),a(u,d,12,12,"#e23a2a"),a(u+12,d+12,12,12,"#1f6fe0"),i>.9){let f=t*1.1-(i-.9)*t*.7,g=e*.14;a(f,g,40,12,"#e23a2a"),a(f+10,g-8,14,8,"#fff"),a(f+44,g+2,120,10,"#ffd21a")}return}let o=Math.min(1,(i-2)/.45),l=o<1?o*1.15:1+Math.sin((i-2.45)*3)*.02,c=Math.min(t,e)*.33*l;n.imageSmoothingEnabled=!0,n.drawImage(s,t/2-c,e*.44-c,c*2,c*2),i>2.6&&(n.font=`900 ${Math.round(e*.07)}px Arial Black, Arial`,n.textAlign="center",n.lineWidth=8,n.strokeStyle="#0a2a6a",n.fillStyle="#fff",n.strokeText("EL JUEGO",t/2,e*.9),n.fillText("EL JUEGO",t/2,e*.9)),i>6.7&&(n.fillStyle=`rgba(255,255,255,${(i-6.7)/.3})`,n.fillRect(0,0,t,e))}function Ex(n){let t=document.createElement("video");t.src="assets/vid/cabecera.mp4",t.playsInline=!0,t.style.cssText="position:fixed;inset:0;width:100%;height:100%;background:#000;z-index:40;object-fit:contain",document.body.appendChild(t),hn();let e=document.getElementById("skip");e.classList.remove("hidden"),e.style.zIndex=41;let i=()=>{t.pause(),t.remove(),e.classList.add("hidden"),n()};e.onclick=i,t.onended=i,t.onerror=i,t.play().catch(i)}async function vd(){try{return(await fetch("assets/vid/cabecera.mp4",{method:"HEAD"})).ok}catch{return!1}}var Us={h_hola:["host","\xA1Buenas noches y bienvenidos al Grand Prix! \xA1El concurso del verano!"],h_hola95:["host","\xA1Hola, hola! Bienvenidos a Cuando calienta el sol. \xA1Cuatro pueblos y mucho calor!"],h_holanav:["host","\xA1Feliz Navidad! Bienvenidos al Grand Prix de la Navidad."],h_pueblos:["host","Esta noche se enfrentan dos pueblos con muchas ganas de ganar. \xA1Un aplauso para el equipo azul y para el equipo amarillo!"],h_pueblos4:["host","Cuatro pueblos, cuatro colores: azul, rojo, amarillo y verde. \xA1Que empiece la fiesta!"],h_alcaldes:["host","Con ellos, sus alcaldes y sus padrinos, que les ayudar\xE1n en las pruebas de conocimiento."],h_prueba:["host","\xA1Vamos con la siguiente prueba!"],h_vaca:["host","\xA1Cuidado, que sale la vaquilla!"],h_piscina:["host","\xA1Nos vamos a la piscina! \xA1Que nadie se quede seco!"],h_rampa:["host","Atentos, que esto resbala much\xEDsimo."],h_saber:["host","Ahora les toca a los alcaldes y a los padrinos. \xA1A ver cu\xE1nto saben!"],h_yincana:["host","\xA1Yincana! Hay que correr y tener buena memoria."],h_gana_azul:["host","\xA1Prueba para el equipo azul!"],h_gana_amar:["host","\xA1Prueba para el equipo amarillo!"],h_empate:["host","\xA1Empate! Puntos para los dos."],h_marcador:["host","As\xED est\xE1 el marcador."],h_final:["host","Y llegamos a la prueba final. \xA1Vale el doble de puntos!"],h_ganador:["host","\xA1Tenemos pueblo ganador! \xA1Enhorabuena!"],h_adios:["host","\xA1Muchas gracias por acompa\xF1arnos! \xA1Hasta el pr\xF3ximo programa del Grand Prix!"],h_super:["host","El alcalde usa la Supervaquilla. \xA1A molestar al rival!"],h_campana:["host","\xA1Suena la campana! La vaquilla entra treinta segundos."],h_dorada:["host","\xA1El alcalde saca la Vaquilla dorada! Si ganan esta prueba, dos puntos extra."],h_capitanes:["host","Empezamos con Pasi\xF3n de capitanes. \xA1Se juegan la \xFAnica Vaquilla dorada de la noche!"],h_cajas:["host","Los padrinos eligen una caja. \xA1A ver qu\xE9 comod\xEDn les toca!"],h_semis:["host","\xA1Estamos en semifinales! Solo un pueblo pasar\xE1 a la gran final."],h_granfinal:["host","\xA1La gran final del Grand Prix! El ganador se lleva el trofeo."],h_trofeo:["host","\xA1Campeones del Grand Prix! \xA1Ese trofeo se va para el pueblo!"],h_historia1:["host","Hace muchos veranos, un concurso de pueblos llen\xF3 de risas las noches de la tele."],h_historia2:["host","Empez\xF3 en mil novecientos noventa y cinco con cuatro pueblos, y al a\xF1o siguiente pas\xF3 a ser un duelo entre dos: azul contra amarillo."],h_historia3:["host","La vaquilla, la piscina y las pruebas locas lo convirtieron en un cl\xE1sico del verano."],h_historia4:["host","Despu\xE9s vinieron las cadenas auton\xF3micas, y en dos mil veintitr\xE9s volvi\xF3 a la tele con la vaquilla de botarga, un dinosaurio y un payaso acr\xF3bata."],h_historia5:["host","Y hasta tuvo su edici\xF3n de Navidad. \xA1Esta es la historia del Grand Prix!"],h_promo1:["host","Este verano vuelve la fiesta de los pueblos. \xA1No te lo pierdas!"],h_promo2:["host","Vaquillas, piscinas y mucho humor. \xA1El Grand Prix, todas las semanas!"],h_promo3:["host","\xBFTu pueblo tiene lo que hay que tener? \xA1Ap\xFAntate al Grand Prix!"],h_falsa1:["host","Bienvenidos al Grand\u2026 \xA1ay! \xA1Que me resbalo! \xA1Corten, corten!"],h_falsa2:["host","\xA1Prueba para el equipo\u2026 verde! Perd\xF3n, que eso era en el noventa y cinco."],h_falsa3:["host","\xA1Quieta, vaquilla, que ese es mi micr\xF3fono!"],h_oculta1:["host","Le hemos dicho al \xE1rbitro que la piscina est\xE1 llena de gelatina. \xA1Mirad su cara!"],h_oculta2:["host","El alcalde cree que tiene que bailar con la vaquilla delante de todo el pueblo."],h_fuera1:["host","Esto es lo que no se ve: el equipo prepara la piscina antes del programa."],h_fuera2:["host","Los vecinos ensayan los gritos de \xE1nimo en el autob\xFAs."],h_casting:["host","Bienvenido al casting del Grand Prix. \xBFC\xF3mo se llama tu pueblo?"],h_casting2:["host","\xA1Perfecto! Ya form\xE1is parte del concurso del verano."],h_paseo:["host","Date una vuelta por el plat\xF3: la piscina, la rampa y el marcador."],h_pub1:["co","Helados Brisamar. \xA1El sabor del verano en cada bocado!"],h_pub2:["co","Crema solar Solecito. \xA1Protege tu piel en las fiestas del pueblo!"],h_pub3:["co","Refrescos Burbuja Loca. \xA1Para los d\xEDas de calor!"],c_hola:["co","\xA1Hola a todos! \xA1Qu\xE9 ganas de verano!"],c_vamos:["co","\xA1Vamos, vamos, que se acaba el tiempo!"],c_bien:["co","\xA1Qu\xE9 bien lo han hecho!"],c_credits:["co","Grand Prix tres D. Un remake de fans, sin relaci\xF3n con el programa original."],h_preparados:["host","\xBFEst\xE1is preparados? Tres, dos, uno... \xA1tiempo!"],h_troncos:["host","\xA1Tres, dos, uno... Troncos locos!"],h_bolos:["host","Suerte, y preparamos el cron\xF3metro. Dos minutos y medio."],h_mas:["host","\xA1M\xE1s!"],h_menos:["host","\xA1Menos!"],h_correcto:["host","\xA1Correcto! \xA1Pasa el globo!"],h_comodin:["host","\xBFUs\xE1is el comod\xEDn? \xA1Ten\xE9is cinco segundos!"],h_pegajosos:["host","\xA1A pegarse al muro! Treinta segundos para la pose."],h_pinguinos:["host","\xA1Ping\xFCinos matem\xE1ticos! Atentos a la cuenta."],h_replay:["host","\xA1Vamos a verlo en la repetici\xF3n!"],h_caido:["host","\xA1Madre m\xEDa! \xA1Se ha ca\xEDdo!"],h_trompazo:["host","\xA1Qu\xE9 trompazo! \xA1Se pegan cada costalada!"],g_izq:["co","\xA1Izquierda, izquierda!"],g_der:["co","\xA1Derecha, derecha!"],g_tira:["co","\xA1Corre, tira!"]};var bd=n=>new Promise(t=>setTimeout(t,window.__fast?n/10:n)),ei=n=>n[Math.floor(Math.random()*n.length)],Ge=(n,t)=>Kr(n,Us[n][1],t),Jc=n=>document.getElementById(n);function Md(n,t){let e=Jc("card");function i(y,v=2600){return e.innerHTML=y,e.classList.remove("hidden"),bd(v).then(()=>e.classList.add("hidden"))}let s=y=>Ke[y.host].name;async function r(y,v){let A=v?["<b>Grand Prix 3D</b><br>remake de fans",`Presentador<br><b>${s(y)}</b> (personaje virtual)`,`Copresentaci\xF3n<br><b>${y.cos.map(_=>Ke[_].name).join(" \xB7 ")}</b>`,`\xC1rbitros<br><b>${Ke.ref1.name} \xB7 ${Ke.ref2.name}</b>`,y.dino?`La vaquilla <b>${Ke.vaca.name}</b> \xB7 el dino <b>${Ke.dino.name}</b> \xB7 <b>${Ke.clown.name}</b>`:`La vaquilla <b>${Ke.vaca.name}</b>`,"Creado por<br><b>Iker Rodriguez Tejedor</b>","Voces Piper TTS \xB7 Three.js<br>M\xFAsica: cabecera del programa","<small>Remake no oficial sin \xE1nimo de lucro. Sin relaci\xF3n con RTVE, FORTA ni Europroducciones.</small>"]:["<b>Iker Rodriguez Tejedor</b><br>presenta",`<b>GRAND PRIX 3D</b><br>${y.name} \xB7 ${y.years}`,`con <b>${s(y)}</b>`,"<small>Remake de fans \xB7 no oficial</small>"];n.setAutoOrbit(!0),v&&ks("creditos");for(let _ of A){if(a)return;await i(`<div class="cred">${_}</div>`,1900)}n.setAutoOrbit(!1)}let a=!1,o=y=>y.colors[+t("color")%y.colors.length]||y.colors[0],l=()=>t("pueblo")||"Mi pueblo";function c(y,v){let A=o(y);return[A,...y.colors.filter(w=>w!==A)].slice(0,y.towns).map((w,C)=>({name:C?v&&v[C-1]||ei($c.filter(B=>B!==l())):l(),color:w,pts:0,me:!C,alc:ei(fd),pad:ei(pd),dorada:y.comodin==="dorada2"?1:0,comodin:0}))}function h(y,v){n.drawBoard(y.slice().sort((A,_)=>_.pts-A.pts),v)}function u(y){let v=C=>ri.filter(B=>B.cat===C),A=[ei(v("vaquilla")),ei(v("fisica")),ei(v("piscina")),ei(v("saber")),ei(v("yincana")),ei(v("vaquilla").concat(v("fisica")).concat(v("piscina")))],_=new Set;return A.filter(C=>C&&!_.has(C.id)&&_.add(C.id)).slice(0,y)}let d={vaquilla:"vaca",fisica:"bolera",piscina:"pool",saber:"host",yincana:"arena",especial:"board"},f={vaquilla:"h_vaca",fisica:"h_rampa",piscina:"h_piscina",saber:"h_saber",yincana:"h_yincana"};async function g(y,v,A,_,w){n.shot(y.shot||(y.id==="pinguipato"?"pato":d[y.cat])||"overview"),await Ge(w?"h_final":f[y.cat]||"h_prueba",s(v));let C=A[0],B=!1,N=!1,G=!1,F=A[1];if(!w&&y.cat!=="saber"&&v.comodin&&A.length===2){let at=v.comodin==="supervaquilla"?C.comodin>0:v.comodin==="dorada2"||v.comodin==="dorada1"?C.dorada>0:v.comodin==="cajas"?C.comodin>0:!1,et=v.comodin==="supervaquilla"?F.comodin>0&&Math.random()<.45:v.comodin==="dorada2"||v.comodin==="dorada1"?F.dorada>0&&Math.random()<.3:!1;if(v.comodin==="campana")Math.random()<.4&&(he("bell"),B=!0,await Ge("h_campana",s(v)));else if(at||et){await Ge("h_comodin",s(v));let vt=at?await m(v,C,F,y):!1;v.comodin==="supervaquilla"||v.comodin==="cajas"?(vt&&(C.comodin--,G=!0,await Ge("h_super",s(v))),et&&(F.comodin--,B=!0)):(vt&&(C.dorada=0,N=!0,await Ge("h_dorada",s(v))),et&&(F.dorada=0,F.usingDorada=!0))}(v.comodin==="dorada2"||v.comodin==="dorada1")&&(B=B||v.comodin==="dorada2")}let U=t("ai")||"normal",$=A.slice(1).map(()=>Math.max(0,y.ai(U)));n.pause(!0),await Ge(y.intro||"h_preparados",s(v)),(Math.random()<.5||y.id==="superbolos")&&uh(),he("whistle"),G&&$.forEach((at,et)=>{$[et]=Math.floor(at*.7)});let W=await Qr(y,{color:En[C.color],rivalColor:En[F.color],names:[C.name,F.name],myColorName:C.color,onFlip:()=>he("flip"),level:U,vaca:B&&y.cat!=="vaquilla",rivalScore:Math.max(...$),fast:window.__fast,bot:window.__bot,etapa:v,lowres:t("quality")==="media"});n.pause(!1),n.shot("board");let O=[W.you,...y.id==="capitanes"||y.live?[W.rival]:$],P=O.map((at,et)=>[at,et]).sort((at,et)=>et[0]-at[0]);if(A.length>2)P.forEach(([at,et],vt)=>{A[et].pts+=(A.length-vt)*_});else{let at=P[0][0],et=O[0]===O[1],vt=!w&&y.pts||{};et&&vt.tie?(A[0].pts+=vt.tie,A[1].pts+=vt.tie):O.forEach((Ht,Q)=>{let ot=Ht===at;A[Q].pts+=ot?vt.win||_:vt.lose||0,vt.comWin&&(A[Q].comodin=(A[Q].comodin||0)+(ot?vt.comWin:vt.comLose))});let Tt=et&&vt.tieCancelsDorada;N&&!Tt&&O[0]>O[1]&&(C.pts+=2),F.usingDorada&&!Tt&&O[1]>O[0]&&(F.pts+=2),F.usingDorada=!1,Tt&&N&&await i("<h3>Empate: la Vaquilla dorada se anula</h3>",1800)}let I=P[0][1],X=A.length===2&&O[0]===O[1];return he(X?"whistle":I===0?"win":"lose"),A.length===2&&await Ge(X?"h_empate":A[I].color==="azul"?"h_gana_azul":"h_gana_amar",s(v)),h(A),dl("trans"),await i(S(A,y.name),2600),W}function S(y,v){return`<h3>${v}</h3>`+y.slice().sort((A,_)=>_.pts-A.pts).map(A=>`<div class="srow" style="background:${En[A.color]};color:${A.color==="amarillo"?"#3a1a00":"#fff"}"><span>${A.name}${A.me?" (t\xFA)":""}</span><b>${A.pts}</b></div>`).join("")}function m(y,v,A,_){return new Promise(w=>{let C=v.color!=="amarillo",B=(W,O)=>`<div class="sp ${W.color}"><b>${W.name}</b><small>Alcalde: ${W.alc}</small>${O?'<button class="mbtn gold" id="spY">\xA1Usar comod\xEDn!</button>':"<i>Pensando\u2026</i>"}</div>`,N=document.getElementById("split");N.innerHTML=(C?B(v,1)+B(A,0):B(A,0)+B(v,1))+`<div class="spc"><div id="spN">5</div><small>${_.name}</small></div>`,N.classList.remove("hidden");let G=5,F=!1,U=()=>{clearInterval($),N.classList.add("hidden"),w(F)},$=setInterval(()=>{G--,he("tick");let W=document.getElementById("spN");W&&(W.textContent=G),G<=0&&U()},window.__fast?100:1e3);document.getElementById("spY").onclick=()=>{F=!0,he("brass"),U()},window.__bot&&Math.random()<.5&&setTimeout(()=>{F=!0,U()},300)})}function p(y){return window.__bot?Promise.resolve(Math.random()<.5):new Promise(v=>{e.innerHTML=`<div class="ask">${y}<div><button class="mbtn gold" id="aY">S\xED</button><button class="mbtn" id="aN">No</button></div></div>`,e.classList.remove("hidden"),Jc("aY").onclick=()=>{e.classList.add("hidden"),v(!0)},Jc("aN").onclick=()=>{e.classList.add("hidden"),v(!1)}})}async function T(y,v={}){a=!1,n.setEtapa(y);let A=v.tv!==!1;A&&!v.noCredits&&(hn(),n.modern||n.setEtapa({...y,bullring:!1,dino:!0,clown:!0,vaquilla:"botarga"}),window.__fast||await ll(n,y,{mode:t("cabecera")||"recreada"}),n.setEtapa(y),await r(y,!1)),n.shot("logo"),await bd(1500),n.shot("host"),await Ge(y.id==="e1995"?"h_hola95":y.navidad?"h_holanav":"h_hola",s(y)),hn();let _=v.teams||c(y,v.rivals);if(h(_,"GRAND PRIX"),n.setTowns&&n.setTowns(_[0].name,_[1].name),n.shot("overview"),await Ge(_.length>2?"h_pueblos4":"h_pueblos",s(y)),await i("<h3>Esta noche</h3>"+_.map(N=>`<div class="srow" style="background:${En[N.color]};color:${N.color==="amarillo"?"#3a1a00":"#fff"}"><span>${N.name}</span><small>Alcalde: ${N.alc} \xB7 Padrino: ${N.pad}</small></div>`).join(""),3200),await Ge("h_alcaldes",s(y)),y.comodin==="supervaquilla"&&(_[0].comodin=1,_[1].comodin=1+(Math.random()<.5?1:0)),y.comodin==="cajas"&&await Ge("h_cajas",s(y)),y.comodin==="dorada1"){await Ge("h_capitanes",s(y));let N=ri.find(F=>F.id==="capitanes");n.pause(!0);let G=await Qr(N,{color:En[_[0].color],rivalColor:En[_[1].color],rivalScore:2,fast:window.__fast,bot:window.__bot,etapa:y});n.pause(!1),G.you>=3?(_[0].dorada=1,await i("<h3>\u{1F947} \xA1La Vaquilla dorada es tuya!</h3>",2200)):(_[1].dorada=1,await i("<h3>La Vaquilla dorada se la lleva el rival</h3>",2200))}let w=u(+t("npruebas")||6);for(let N=0;N<w.length;N++){if(a)return;await g(w[N],y,_,N<2?1:N<4?2:3,!1)}let C=ri.find(N=>N.id==="troncos");await g(C,y,_,6,!0);let B=_.slice().sort((N,G)=>G.pts-N.pts)[0];return n.shot("logo"),dl("final"),await i(`<h3>\u{1F3C6} \xA1Gana ${B.name}!</h3>`+S(_,"Clasificaci\xF3n final"),3500),await Ge("h_ganador",s(y)),A&&!v.noCredits&&(await Ge("h_adios",s(y)),await r(y,!0)),hn(),_}async function L(y){a=!1,n.setEtapa(y);let v=[l(),...$c.filter(N=>N!==l()).sort(()=>Math.random()-.5).slice(0,7)].map((N,G)=>({name:N,pts:0,me:!G})),A=()=>"<h3>Tabla general</h3>"+v.slice().sort((N,G)=>G.pts-N.pts).map((N,G)=>`<div class="srow" style="background:${G<4?"#1f6fe0":"#334"}"><span>${G+1}. ${N.name}${N.me?" (t\xFA)":""}</span><b>${N.pts}</b></div>`).join("");for(let N=0;N<2;N++){let G=v[1+N*2],F=await T(y,{rivals:[G.name],noCredits:!0});v[0].pts+=F[0].pts,G.pts+=F[1].pts,v.slice(1).forEach(U=>{U!==G&&(U.pts+=Math.round(8+Math.random()*14))}),await i(A(),4e3)}let _=v.slice().sort((N,G)=>G.pts-N.pts).slice(0,4);if(!_.find(N=>N.me)){await i("<h3>Tu pueblo se queda fuera de las semifinales</h3>\xA1El pr\xF3ximo verano ser\xE1!",3500);return}await Ge("h_semis",s(y));let w=_.find(N=>!N.me&&_.indexOf(N)!==_.findIndex(G=>G.me)&&!0),C=await T(y,{rivals:[_.filter(N=>!N.me)[0].name],noCredits:!0});if(C[0].pts<C[1].pts){await i("<h3>Eliminados en semifinales</h3>\xA1Qu\xE9 verano tan bonito!",3500);return}await Ge("h_granfinal",s(y));let B=await T(y,{rivals:[_.filter(N=>!N.me)[1].name],noCredits:!0});B[0].pts>=B[1].pts?(he("fanfare"),await i(`<h3>\u{1F3C6} \xA1${l()} gana el Grand Prix!</h3><div class="trophy">\u{1F3C6}</div>`,4500),await Ge("h_trofeo",s(y))):await i("<h3>\xA1Subcampeones!</h3>Un final precioso.",3500)}async function b(y,v){n.setEtapa(v);let A=ri.find(w=>w.id===y);n.shot(d[A.cat]),n.pause(!0);let _=await Qr(A,{color:En[o(v)],level:t("ai")||"normal",rivalScore:A.ai(t("ai")||"normal"),fast:window.__fast,bot:window.__bot,etapa:v,vaca:!!window.__vaca});return n.pause(!1),_}return{programa:T,temporada:L,entrenamiento:b,credits:r,card:i,L:Ge,split:m,stop(){a=!0},board:h}}var Ad=!1;vd().then(n=>{Ad=n});var Xn=new URLSearchParams(location.search);window.__fast=Xn.has("fast");window.__bot=Xn.has("bot");window.__vaca=Xn.has("vaca");window.__replay=Xn.has("replay");var qn=n=>document.getElementById(n),Rd=Xn.get("q")||localStorage.getItem("gp_quality")||"auto",we=yd(qn("app"),Rd),Ci,Ri=n=>Ci?Ci.get(n):void 0,qi=Md(we,Ri),Qe=()=>Xr[Ri("etapa")||qr]||Xr[qr];we.setEtapa(Qe());we.setAutoOrbit(!0);qn("loading").remove();function wx(){let n=document.createElement("canvas");n.width=640,n.height=300;let t=n.getContext("2d");return t.fillStyle="#ffc81a",t.beginPath(),t.arc(520,90,70,0,7),t.fill(),t.fillStyle="#e2321e",t.beginPath(),t.roundRect(20,70,600,170,60),t.fill(),t.lineWidth=10,t.strokeStyle="#fff",t.stroke(),t.textAlign="center",t.font="900 104px Arial Black, Arial",t.lineWidth=14,t.strokeStyle="#7a1000",t.strokeText("GRAND PRIX",320,180),t.fillStyle="#fff",t.fillText("GRAND PRIX",320,180),t.font="900 40px Arial",t.fillStyle="#ffd21a",t.fillText(Qe().navidad?"DE LA NAVIDAD":"DEL VERANO",320,228),n.toDataURL()}function Sd(n){qn("topBtns").classList.toggle("hidden",!n)}async function Fs(n){Sd(!0),we.setAutoOrbit(!1);try{await n()}catch(t){console.error(t)}finally{fl(),we.orbitMode(!1),we.walkMode(!1),qn("joy").classList.add("hidden"),Sd(!1),we.setAutoOrbit(!0),Ci.go("main")}}var cl=null;function Ed(n){return new Promise(t=>{n?(we.walkMode(!0),qn("joy").classList.remove("hidden")):we.orbitMode(!0),cl=t})}qn("tbHome").onclick=()=>{qi.stop(),fl(),hn(),cl?(cl(),cl=null):location.reload()};var Td=["overview","pool","host","board","logo","vaca"],Ax=0;qn("tbCam").onclick=()=>we.shot(Td[++Ax%Td.length]);qn("tbMute").onclick=()=>{jt.master&&(jt.master.gain.value=jt.master.gain.value?0:1)};(()=>{let n=qn("joy"),t=qn("knob"),e=!1,i=s=>{let r=n.getBoundingClientRect(),a=(s.clientX-r.left-r.width/2)/(r.width/2),o=(s.clientY-r.top-r.height/2)/(r.height/2),l=c=>Math.max(-1,Math.min(1,c));we.walk.f=-l(o),we.walk.s=l(a),t.style.transform=`translate(${l(a)*30}px,${l(o)*30}px)`};n.onpointerdown=s=>{e=!0,n.setPointerCapture(s.pointerId),i(s)},n.onpointermove=s=>e&&i(s),n.onpointerup=()=>{e=!1,we.walk.f=we.walk.s=0,t.style.transform=""}})();var Rx=()=>Ke[Qe().host].name,Wn=async n=>{for(let[t,e,i]of n)we.shot(t),await Kr(e,Us[e][1],i||(Us[e][0]==="co"?Ke[Qe().cos[0]].name:Rx()))},wd={promos:()=>Wn([["logo","h_promo1"],["pool","h_promo2"],["overview","h_promo3"]]),promohost:()=>Wn([["host","h_promo3"],["host","h_promo1"]]),publi:async()=>{for(let n of["h_pub1","h_pub2","h_pub3"])await qi.card(`<div class="cred"><small>PUBLICIDAD (ficticia)</small><br><b>${Us[n][1].split(".")[0]}</b></div>`,400),await Wn([["overview",n]])},oculta:()=>Wn([["pool","h_oculta1"],["vaca","h_oculta2"]]),falsas:()=>Wn([["host","h_falsa1"],["board","h_falsa2"],["vaca","h_falsa3"]]),fuera:()=>Wn([["pool","h_fuera1"],["overview","h_fuera2"]]),historia:()=>Wn([["logo","h_historia1"],["overview","h_historia2"],["vaca","h_historia3"],["dino","h_historia4"],["logo","h_historia5"]]),casting:async()=>{await Wn([["host","h_casting"]]);let n=prompt("\xBFC\xF3mo se llama tu pueblo?",Ri("pueblo")||"");n&&Ci.set("pueblo",n.trim().slice(0,24)),await Wn([["overview","h_casting2"]])},paseo:async()=>{await Wn([["overview","h_paseo"]]),await Ed(!0)},camlibre:()=>Ed(!1)};function jc(n,t){if(Bs(),n==="tv")return Fs(()=>qi.programa(Qe(),{tv:!0}));if(n==="quick")return Fs(()=>qi.programa(Qe(),{tv:!1}));if(n==="cabecera")return Fs(async()=>{let e=Qe();we.setEtapa({...e,bullring:!1,dino:!0,clown:!0,vaquilla:"botarga"}),await ll(we,e,{mode:Ri("cabecera")||"recreada"}),we.setEtapa(e)});if(n==="temporada")return Fs(()=>qi.temporada(Qe()));if(n==="train")return Fs(()=>qi.entrenamiento(t,Qe()));if(wd[n])return Fs(wd[n])}var Cx="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><circle cx="34" cy="34" r="33" fill="#ffd21a"/><circle cx="34" cy="34" r="28" fill="#e2321e"/><circle cx="34" cy="34" r="20" fill="#1f6fe0"/><text x="34" y="43" font-size="24" text-anchor="middle">\u{1F42E}</text></svg>'),Px=()=>Object.keys(zs).flatMap(n=>ri.filter(t=>t.cat===n).map(t=>({emoji:zs[n].split(" ")[0],title:t.name,sub:zs[n].slice(3),launch:"train",arg:t.id})));Ci=GameMenu.create({id:"grandprix",storeKey:"gp_menu",name:"Grand Prix",version:"v0.2",logo:wx,fp:{img:Cx},theme:{"--m-btn-a":"#ff6a2a","--m-btn-b":"#d8321a","--m-border":"#ffe08a","--m-tbtn":"#c8321ad9","--m-tbtn-border":"#ffb86a","--m-sub":"#fff0d0"},tag:()=>`${Qe().emoji} ${Qe().name.toUpperCase()}`,title:{sub:"El juego del verano",tap:"Toca para empezar"},sound:n=>he(n==="start"?"fanfare":"tap"),onTitleTap:()=>{Bs(),Ri("music")!==!1&&jr(!0)},onEnter:n=>{n==="main"&&Ri("music")!==!1&&!jt.musicEl&&!jt.music&&jt.ctx&&jr(!0)},install:{apk:"GrandPrix3D.apk"},launch:jc,defaults:{etapa:qr,music:!0,voz:!0,ai:"normal",npruebas:6,color:0,pueblo:"",quality:Rd},screens:{main:[{btn:"Jugar",sub:"Programa completo, temporada, entrenamiento, especiales\u2026",cls:"gold",go:"play"},{btn:"Promos",sub:"Los anuncios del programa",launch:"promos"},{btn:"Promos del presentador",sub:`${Ke.host.name} te invita al Grand Prix`,launch:"promohost"},{btn:"Publicidad",sub:"Anuncios ficticios del verano",launch:"publi"},{btn:"C\xE1mara oculta",sub:"Bromas a \xE1rbitros y alcaldes",launch:"oculta"},{btn:"Tomas falsas",sub:"Resbalones y despistes",launch:"falsas"},{btn:"Fuera de c\xE1maras",sub:"Lo que no se ve del programa",launch:"fuera"},{btn:"Paseo",sub:"Pasea por el plat\xF3",launch:"paseo"},{btn:"Casting",sub:"Apunta a tu pueblo",launch:"casting"},{btn:"Elige el valor\u2026",sub:"Etapa, n\xFAmero de pruebas y tu color",go:"valor"},{btn:"C\xE1mara libre",sub:"Mueve la c\xE1mara a tu aire",launch:"camlibre"},{btn:"Opciones",sub:"Sonido, pueblo, rival, calidad gr\xE1fica",go:"options"},{btn:"La historia del Grand Prix",sub:"El presentador te la cuenta",cls:"hist",launch:"historia"},{btn:"C\xF3mo se juega",go:"help"},{btn:"Cr\xE9ditos",go:"credits"},{btn:"Instalar app",install:!0}],play:[{btn:"Programa completo",sub:()=>`${Qe().name}: cabecera, pueblos, ${Ri("npruebas")} pruebas, prueba final y cr\xE9ditos`,cls:"gold",launch:"tv"},{btn:"Temporada",sub:"Fase de programas, tabla general, semifinal, final y trofeo",launch:"temporada"},{btn:"Entrenamiento",sub:"Elige cualquier prueba",go:"train"},{btn:"Partida r\xE1pida",sub:"Sin cabecera ni cr\xE9ditos",launch:"quick"},{btn:"Ver la cabecera",sub:"La cabecera del programa recreada en 3D",launch:"cabecera"},{h2:"Etapa"},{themes:()=>Object.values(Xr).map(n=>({id:n.id,emoji:n.emoji,name:n.years})),key:"etapa",def:qr,onPick:()=>we.setEtapa(Qe())},{text:()=>`<p>${Qe().desc}</p>`},{h2:"Programa especial"},{themes:md,key:"tema",def:"normal"},{back:"main"}],train:[{h2:"Entrenamiento"},{monolist:Px},{back:"play"}],valor:{title:"Elige el valor\u2026",options:()=>[{choice:"npruebas",label:"\u{1F3AF} Pruebas por programa",opts:[[4,"4"],[6,"6"],[8,"8"]]},{choice:"color",label:"\u{1F3BD} Tu color",opts:Qe().colors.map((n,t)=>[t,n[0].toUpperCase()+n.slice(1)]),wrap:!0},{choice:"etapa",label:"\u{1F4FA} Etapa",opts:Object.values(Xr).map(n=>[n.id,n.years]),wrap:!0,onChange:()=>we.setEtapa(Qe())}]},options:{title:"Opciones",options:()=>[{sino:"music",def:!0,label:"\u{1F3B5} M\xFAsica",onChange:n=>n?jr(!0):hn()},{sino:"voz",def:!0,label:"\u{1F3A4} Voces",onChange:n=>{jt.voiceOn=n}},{field:"pueblo",label:"\u{1F3D8}\uFE0F Tu pueblo",placeholder:"Mi pueblo",max:24},{choice:"ai",label:"\u{1F916} Nivel del rival",opts:[["facil","F\xE1cil"],["normal","Normal"],["dificil","Dif\xEDcil"]]},{fold:"\u{1F3AC} M\xE1s opciones",items:[{block:"\u{1F3C6} Pueblos ganadores",name:"Toca uno para jugar con \xE9l",btns:Zc.map(([n,t])=>({label:`${n} (${t})`,run:e=>{e.set("pueblo",n),e.go("options")}}))},{choice:"cabecera",label:"\u{1F3AC} Cabecera",opts:()=>Ad?[["recreada","Recreada"],["video","V\xEDdeo original"]]:[["recreada","Recreada"]],def:"recreada"},{sino:"subs",def:!1,label:"\u{1F4AC} Subt\xEDtulos grandes",onChange:n=>document.body.classList.toggle("bigsub",n)}]},{choice:"quality",label:"\u2728 Calidad gr\xE1fica",opts:_d.map(n=>[n,xd[n]]),wrap:!0,onChange:n=>{localStorage.setItem("gp_quality",n),setTimeout(()=>location.reload(),300)}},{fullscreen:!0},{fps:()=>we.fps,hint:"Si va lento en tu m\xF3vil, elige calidad \xABMedia\xBB."}]},help:{title:"C\xF3mo se juega",text:`<p>Dos pueblos (azul y amarillo; cuatro en 1995) compiten en pruebas locas: con vaquilla, f\xEDsicas, de piscina, yincanas y de conocimiento para alcaldes y padrinos.</p>
<p>En cada prueba el rival ya tiene su marca: <b>\xA1sup\xE9rala!</b> Las primeras pruebas valen 1 punto, las del medio 2, las \xFAltimas 3 y la <b>prueba final</b> 6.</p>
<p><b>Comodines seg\xFAn la etapa:</b> 2023 Supervaquilla (el alcalde la suelta al rival) \xB7 2024 campana de 30 s \xB7 2025 una Vaquilla dorada por pueblo (+2) \xB7 2026 una sola Vaquilla dorada, que se gana en Pasi\xF3n de capitanes.</p>
<p><b>Temporada:</b> juega programas, sube en la tabla, pasa a semifinales y gana la final.</p>`},credits:{title:"Cr\xE9ditos",text:()=>`<p><b>Creado por</b><br>Iker Rodriguez Tejedor</p>
<p><b>Personajes virtuales</b><br>${Object.values(Ke).map(n=>`${n.name} (${n.role})`).join(" \xB7 ")}</p>
<p><b>Voces</b><br>Piper TTS (es_ES)</p><p><b>Motor 3D</b><br>Three.js \xB7 plat\xF3 modelado por c\xF3digo</p>
<p><b>M\xFAsica</b><br>Cabecera del programa (audio del v\xEDdeo original)</p>
<p class="small">Remake no oficial hecho por un fan, sin \xE1nimo de lucro. Grand Prix es un formato de Europroducciones emitido por RTVE y cadenas de FORTA. Sin relaci\xF3n oficial con el programa ni con sus cadenas.</p>`}}});jt.voiceOn=Ri("voz")!==!1;Xn.get("screen")?Ci.go(Xn.get("screen")):Xn.get("mode")?jc(Xn.get("mode"),Xn.get("arg")):Ci.go("title");window.__gp={S:we,show:qi,menu:Ci,launch:jc};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
