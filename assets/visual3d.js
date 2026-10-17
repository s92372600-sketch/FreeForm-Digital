/* Offline WebGL procedural 3D engine. No CDN, no fetch, works from file://.
   Designed as a self-contained, lightweight fallback when Three.js cannot be bundled. */
(function(){'use strict';
const vertex=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const fragment=`precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float yaw;
uniform float pitch;
uniform float zoom;
uniform float kind;
uniform float variant;
#define PI 3.14159265
mat2 R(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sph(vec3 p,float r){return length(p)-r;}
float box(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float rb(vec3 p,vec3 b,float r){return box(p,b)-r;}
float tor(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float cyl(vec3 p,float r,float h){vec2 d=abs(vec2(length(p.xz),p.y))-vec2(r,h);return min(max(d.x,d.y),0.)+length(max(d,0.));}
vec2 join(vec2 a,vec2 b){return a.x<b.x?a:b;}
vec3 spin(vec3 p){p.xz=R(yaw)*p.xz;p.yz=R(pitch)*p.yz;return p;}
vec2 world(vec3 P){
 vec3 p=spin(P);
 vec2 d=vec2(100.,0.);
 if(kind<.5){
   p.yz=R(.44+time*.12)*p.yz;p.xz=R(.32+time*.1)*p.xz;
   d=join(d,vec2(tor(p,vec2(1.12,.19)),1.));
   vec3 s=p;s.xy=R(1.16)*s.xy;s.yz=R(.9)*s.yz;
   d=join(d,vec2(tor(s,vec2(1.37,.064)),2.));
   vec3 q=p;q.xy=R(.83)*q.xy;q.xz=R(.4)*q.xz;
   d=join(d,vec2(tor(q,vec2(.89,.034)),3.));
   d=join(d,vec2(sph(p,.30),4.));
 }else if(kind<1.5){
   d=join(d,vec2(rb(p,vec3(1.22,.60,.78),.045),2.));
   d=join(d,vec2(rb(p-vec3(0,.68,0),vec3(1.34,.075,.89),.03),1.));
   for(int i=0;i<3;i++){
     float x=float(i-1)*.77;
     d=join(d,vec2(rb(p-vec3(x,.07,.801),vec3(.28,.38,.029),.01),1.));
     d=join(d,vec2(rb(p-vec3(x,.07,-.801),vec3(.28,.38,.029),.01),1.));
   }
   d=join(d,vec2(rb(p-vec3(0,-.71,0),vec3(1.53,.036,1.02),.04),4.));
 }else if(kind<2.5){
   float radius=.68+.065*p.y;
   d=join(d,vec2(max(length(p.xz)-radius,abs(p.y)-.69),2.));
   d=join(d,vec2(tor(p-vec3(0,.70,0),vec2(.73,.07)),1.));
   d=join(d,vec2(cyl(p-vec3(0,.67,0),.62,.035),5.));
   vec3 h=vec3(p.x-.77,p.z,p.y+.03);
   d=join(d,vec2(tor(h,vec2(.33,.095)),2.));
   d=join(d,vec2(cyl(p-vec3(0,-.75,0),.43,.07),4.));
 }else if(kind<3.5){
   d=join(d,vec2(rb(p-vec3(0,-.19,0),vec3(1.47,.23,.58),.19),1.));
   d=join(d,vec2(rb(p-vec3(.08,.16,0),vec3(.70,.34,.45),.14),2.));
   d=join(d,vec2(rb(p-vec3(.06,.30,.0),vec3(.56,.15,.459),.025),4.));
   d=join(d,vec2(rb(p-vec3(1.45,-.16,0),vec3(.09,.08,.4),.025),3.));
   d=join(d,vec2(rb(p-vec3(-1.47,-.22,0),vec3(.045,.09,.43),.02),6.));
   for(int x=0;x<2;x++)for(int z=0;z<2;z++){
      float xx=x==0?-.88:.92;
      float zz=z==0?-.60:.60;
      vec3 q=vec3(p.x-xx,p.z-zz,p.y+.43);
      d=join(d,vec2(tor(q,vec2(.31,.15)),7.));
      d=join(d,vec2(sph(q*.95,.19),2.));
   }
   d=join(d,vec2(rb(p-vec3(0,-.81,0),vec3(1.66,.018,.81),.04),4.));
 }else{
   d=join(d,vec2(cyl(p,.38,1.2),1.));
   d=join(d,vec2(cyl(p-vec3(0,1.23,0),.47,.13),2.));
   d=join(d,vec2(cyl(p-vec3(0,-1.23,0),.47,.13),2.));
   d=join(d,vec2(cyl(p-vec3(0,-1.52,0),.14,.19),2.));
   d=join(d,vec2(cyl(p-vec3(0,-1.74,0),.34,.075),4.));
 }
 return d;
}
vec3 palette(float m,vec3 p){
 if(kind<.5){
   if(m<1.5)return vec3(.20,.79,1.);
   if(m<2.5)return vec3(.55,.8,.97);
   if(m<3.5)return vec3(.15,.49,.82);
   return vec3(.7,.89,.98);
 }
 if(kind<1.5){if(m<1.5)return variant<.5?vec3(.13,.72,.94):vec3(.89,.73,.36);if(m<2.5)return vec3(.56,.68,.69);return vec3(.13,.20,.24);}
 if(kind<2.5){if(m<1.5)return vec3(.75,.84,.84);if(m<2.5)return variant>1.5?vec3(.46,.61,.45):vec3(.87,.88,.80);if(m<4.5)return vec3(.21,.24,.27);return variant<.5?vec3(.56,.29,.14):variant<1.5?vec3(.21,.12,.08):vec3(.32,.55,.36);}
 if(kind<3.5){if(m<1.5)return variant<.5?vec3(.07,.58,.90):variant<1.5?vec3(.68,.77,.84):variant<2.5?vec3(.80,.16,.20):vec3(.07,.11,.17);if(m<2.5)return vec3(.65,.74,.84);if(m<3.5)return vec3(.65,.97,1.);if(m<4.5)return vec3(.025,.075,.12);if(m<6.5)return vec3(.97,.10,.15);return vec3(.035,.055,.07);}
 if(m<1.5){float ang=atan(p.z,p.x);float stripe=sin(ang*3.+p.y*8.5);return stripe>0.?vec3(.88,.82,.73):(variant<.5?vec3(.65,.14,.13):vec3(.08,.23,.30));}
 if(m<2.5)return vec3(.80,.60,.35);
 return vec3(.17,.13,.10);
}
vec3 normal(vec3 p){vec2 e=vec2(.004,0.);return normalize(vec3(world(p+e.xyy).x-world(p-e.xyy).x,world(p+e.yxy).x-world(p-e.yxy).x,world(p+e.yyx).x-world(p-e.yyx).x));}
void main(){
 vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
 vec3 col=vec3(.018,.052,.094);
 float wash=max(0.,1.-length(uv*.6));col+=vec3(.035,.10,.19)*wash*wash;
 float rayAng=.12;
 vec3 ro=vec3(0.,.12,zoom);
 vec3 rd=normalize(vec3(uv.x,uv.y,-2.1));
 if(kind>2.5&&kind<3.5){ro.y=.43;rd=normalize(vec3(uv.x,uv.y-.08,-2.1));}
 float t=0.,mat=0.;vec3 pos=vec3(0.);
 for(int i=0;i<65;i++){
   pos=ro+rd*t;vec2 h=world(pos);
   if(h.x<.005){mat=h.y;break;}
   t+=max(.011,h.x*.82);
   if(t>18.)break;
 }
 if(t<18.){
   vec3 n=normal(pos);
   vec3 l=normalize(vec3(-.5,.86,1.));
   float dif=max(dot(n,l),0.);
   float light2=max(dot(n,normalize(vec3(1.,.34,-.65))),0.);
   vec3 view=normalize(ro-pos);
   vec3 h=normalize(l+view);
   float spec=pow(max(dot(n,h),0.),kind<.5?84.:36.);
   float rim=pow(1.-max(dot(n,view),0.),3.);
   vec3 base=palette(mat,spin(pos));
   col=base*(.26+dif*.70+light2*.28)+vec3(.65,.87,1.)*spec*.72+vec3(.16,.55,.84)*rim*.38;
   if(kind<.5)col+=base*rim*.36;
   float fog=1.-exp(-t*t*.008);col=mix(col,vec3(.016,.055,.095),fog);
 }
 if(kind<.5){
  vec2 v=uv;
  float dust=0.;
  for(int i=0;i<23;i++){
   float fi=float(i);
   vec2 pt=vec2(sin(fi*114.23)*1.3,cos(fi*67.82)*1.16);
   pt.x+=sin(time*.25+fi*1.7)*.045;
   dust+=.003/(.006+length(v-pt)*length(v-pt));
  }
  col+=vec3(.025,.17,.28)*min(dust,.8);
 }
 col=pow(col,vec3(.82));
 col*=1.-.14*dot(uv*.47,uv*.47);
 gl_FragColor=vec4(col,1.);
}`;
function compile(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){throw new Error(gl.getShaderInfoLog(s))}return s}
function Renderer(canvas,kind){this.canvas=canvas;this.kind=kind;this.yaw=kind===0?.18:-.36;this.pitch=kind===0?.18:.12;this.zoom=kind===0?5.6:kind===3?5.8:4.6;this.variant=0;this.paused=false;this.auto=true;this.visible=true;this.active=true;this.raf=0;this.last=0;this.started=performance.now();this.reduce=false;const gl=canvas.getContext('webgl',{alpha:false,preserveDrawingBuffer:false,antialias:false,powerPreference:'low-power'});if(!gl)throw new Error('No WebGL');this.gl=gl;const prog=gl.createProgram();gl.attachShader(prog,compile(gl,gl.VERTEX_SHADER,vertex));gl.attachShader(prog,compile(gl,gl.FRAGMENT_SHADER,fragment));gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(prog));gl.useProgram(prog);const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const p=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);this.prog=prog;this.buf=buf;this.loc={};for(const n of ['resolution','time','yaw','pitch','zoom','kind','variant'])this.loc[n]=gl.getUniformLocation(prog,n);this._loop=this.frame.bind(this);this.resize();this.raf=requestAnimationFrame(this._loop)}
Renderer.prototype.resize=function(){const rect=this.canvas.getBoundingClientRect();const mobile=innerWidth<760, slow=(navigator.hardwareConcurrency||4)<=4;const dpr=Math.min(window.devicePixelRatio||1,mobile?1:slow?1.15:1.7);const scale=mobile?.60:slow?.85:1;const w=Math.max(2,Math.min(1600,Math.round(rect.width*dpr*scale))),h=Math.max(2,Math.min(1000,Math.round(rect.height*dpr*scale)));if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;this.gl.viewport(0,0,w,h)}};
Renderer.prototype.frame=function(now){if(!this.active)return;this.raf=requestAnimationFrame(this._loop);if(this.paused||!this.visible||document.hidden)return;const interval=this.reduce?140:(innerWidth<760?90:((navigator.hardwareConcurrency||4)<=4?34:20));if(now-this.last<interval)return;const delta=Math.min(now-this.last,70)/1000;this.last=now;if(this.auto&&!this.reduce)this.yaw+=(this.kind===0?.045:.16)*delta;const gl=this.gl;this.resize();gl.useProgram(this.prog);gl.uniform2f(this.loc.resolution,this.canvas.width,this.canvas.height);gl.uniform1f(this.loc.time,(now-this.started)/1000);gl.uniform1f(this.loc.yaw,this.yaw);gl.uniform1f(this.loc.pitch,this.pitch);gl.uniform1f(this.loc.zoom,this.zoom);gl.uniform1f(this.loc.kind,this.kind);gl.uniform1f(this.loc.variant,this.variant);gl.drawArrays(gl.TRIANGLES,0,6)};
Renderer.prototype.destroy=function(){this.active=false;cancelAnimationFrame(this.raf);this.gl.deleteBuffer(this.buf);this.gl.deleteProgram(this.prog);const ext=this.gl.getExtension('WEBGL_lose_context');if(ext)ext.loseContext()};
let hero=null,modal=null,reduced=false,observe=null;const types={haven:1,moko:2,apex:3,blade:4};
function initHero(canvas){if(!canvas)return;try{if(innerWidth<760||matchMedia('(prefers-reduced-motion: reduce)').matches){canvas.style.display='none';return}hero=new Renderer(canvas,0);hero.reduce=reduced;observe=new IntersectionObserver(entries=>{if(hero)hero.visible=entries[0].isIntersecting},{threshold:0});observe.observe(canvas)}catch(e){console.warn('FREEFORM WebGL hero unavailable:',e.message);canvas.style.display='none'}}
function openShowroom(canvas,id){try{if(modal)modal.destroy();if(hero)hero.paused=true;modal=new Renderer(canvas,types[id]||1);modal.reduce=reduced;modal.resize();let x=0,y=0,drag=false;canvas.onpointerdown=e=>{drag=true;x=e.clientX;y=e.clientY;modal.auto=false;canvas.setPointerCapture?.(e.pointerId)};canvas.onpointermove=e=>{if(!drag||!modal)return;const dx=e.clientX-x,dy=e.clientY-y;if(Math.abs(dx)>1||Math.abs(dy)>1){modal.yaw+=dx*.008;modal.pitch=Math.max(-.7,Math.min(.7,modal.pitch+dy*.004))}x=e.clientX;y=e.clientY};canvas.onpointerup=()=>{drag=false};canvas.onpointercancel=()=>{drag=false};canvas.onwheel=e=>{e.preventDefault();if(modal)modal.zoom=Math.max(3.3,Math.min(8,modal.zoom+Math.sign(e.deltaY)*.30))};return true}catch(e){console.warn('FREEFORM WebGL showroom unavailable:',e.message);if(hero)hero.paused=false;return false}}
function closeShowroom(){if(modal){modal.destroy();modal=null}if(hero)hero.paused=false}
function setView(view){if(!modal)return;modal.auto=false;modal.pitch=.08;modal.zoom=modal.kind===3?5.8:4.6;modal.yaw=view==='front'?0:view==='side'?Math.PI*.5:view==='back'?Math.PI:view==='close'?0:modal.yaw;if(view==='close')modal.zoom=3.35}
function rotate(dir){if(modal){modal.auto=false;modal.yaw+=dir*.43}}
function setVariant(i){if(modal)modal.variant=i}
function toggleAuto(){if(!modal)return false;modal.auto=!modal.auto;return modal.auto}
function setReduced(x){reduced=x;if(hero)hero.reduce=x;if(modal)modal.reduce=x}
window.Freeform3D={initHero,openShowroom,closeShowroom,setView,rotate,setVariant,toggleAuto,setReduced};
})();
