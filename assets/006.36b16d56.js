var x=Object.defineProperty;var w=(a,t,e)=>t in a?x(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(w(a,typeof t!="symbol"?t+"":t,e),e);import{d as g,D as v}from"./transform.b95b7cde.js";import{m as M,r as k}from"./matrix.eb4bdb6d.js";import{d as b,i as p,k as B,j as C,c as D,a as _,o as E}from"./index.4a5c4419.js";function o(a,t,e,s=0){return[a,t,e,s]}class T{constructor(t,e){i(this,"aspects");i(this,"d_ctx");i(this,"origin_aspects");this.aspects=t,this.origin_aspects=t.map(s=>s.map(r=>r.slice())),this.d_ctx=e}draw(){const t=this.aspects[0].map(s=>u(s)),e=this.aspects[1].map(s=>u(s));d(t,this.d_ctx),d(e,this.d_ctx),q(t,e,this.d_ctx)}rotate(t){const e=g(t),s=M([[Math.cos(e),0,Math.sin(e),0],[0,1,0,0],[-Math.sin(e),0,Math.cos(e),0],[0,0,0,1]]);console.log(this.origin_aspects.slice());const r=this.origin_aspects.map(n=>n.map(c=>k(c,s)));console.log(r),this.aspects=r}}function u(a){return a.slice(0,2)}function d(a,t){a.forEach((e,s)=>{const r=(s+1)%a.length;t.draw_line(e,a[r])})}function q(a,t,e,s){s=s||a.map((r,n)=>n),s.forEach((r,n)=>{e.draw_line(a[n],t[r])})}function h(...a){return[...a]}const y={class:"flex"},R=b({__name:"006",setup(a){const t=p(),e=h(o(-100,100,-100),o(-100,100,100),o(100,100,100),o(100,100,-100)),s=h(o(-100,-100,-100),o(-100,-100,100),o(100,-100,100),o(100,-100,-100)),r=p(0);let n,c;B([r],()=>{n.clear_ctx(),c.rotate(r.value),c.draw()});function l(){r.value+=1}let m=setInterval(()=>{l()},200),f=setTimeout(()=>{clearInterval(m),clearTimeout(f)},1e4);return C(()=>{n=new v(t.value),n.translate_origin("center"),n.mirror_coordinate(),c=new T([e,s],n),c.rotate(r.value),c.draw()}),(A,I)=>(E(),D("div",y,[_("button",{onClick:l},"degree+1"),_("canvas",{ref_key:"container",ref:t,class:"w-[600px] h-[600px]",style:{border:"1px black solid"}},null,512)]))}});export{R as default};