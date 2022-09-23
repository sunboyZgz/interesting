var y=Object.defineProperty;var b=(e,t,s)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var a=(e,t,s)=>(b(e,typeof t!="symbol"?t+"":t,s),s);import{m as h,r as c}from"./matrix.eb4bdb6d.js";class v{constructor(t){a(this,"el");a(this,"ctx");a(this,"width");a(this,"height");a(this,"degree_y");const s=t.clientWidth,r=t.clientWidth;t.width=s,t.height=r,this.el=t,this.ctx=t.getContext("2d"),this.width=s,this.height=r,this.degree_y=0}mirror_coordinate(){this.el.style.transformOrigin="center",this.el.style.transform="scale(1,-1)"}translate_origin(t){typeof t=="string"?(t=D(t,this),g(t,this.ctx)):g(t,this.ctx)}draw_point(t,s=1){this.ctx.beginPath(),this.ctx.fillStyle="#000",this.ctx.arc(t[0],t[1],s,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath()}draw_line(t,s){this.ctx.beginPath(),this.ctx.moveTo(t[0],t[1]),this.ctx.lineTo(s[0],s[1]),this.ctx.stroke(),this.ctx.closePath()}draw_vector_order(t){for(let s=0;s<t.length;s++){const r=(s+1)%t.length;this.draw_line(t[s],t[r])}}draw_x(){this.draw_line(u(-this.width/2,0),u(this.width/2,0))}draw_z(){this.draw_line(u(0,-this.height/2),u(0,this.height/2))}draw_y(t){const s=t&&(this.degree_y=-t)&&this.degree_y||this.degree_y;let r,i;P(s)?(r=this.width/2,i=this.width/2*Math.tan(s/180*Math.PI)):(i=this.height/2,r=this.height/2/Math.tan(s/180*Math.PI)),this.draw_line(u(-r,-i),u(r,i))}clear_ctx(){this.ctx.clearRect(-this.width,-this.height,this.width*2,this.height*2)}}function x(e,t){return e=e%360,Math.abs(Math.abs(e)-t)}function P(e){return x(e,0)<=45||x(e,180)<=45}function u(e,t){return[e,t]}function D(e,t){const s=t.el.width,r=t.el.height;switch(e){case"center":return{x:s/2,y:r/2};default:return{x:0,y:0}}}function g(e,t){t.translate(e.x,e.y)}function T(e){return[[e[0],0],[0,e[1]]]}function z(e,t){let s;return t.length==2?s=h(T(e)):(s=[],console.error("don't support matrix 3 x 3 now")),c(t,s)}function B(e,t){return t.map(s=>z(e,s))}function V(e){return[[Math.cos(e),Math.sin(e)],[-Math.sin(e),Math.cos(e)]]}function S(e,t){let s;return e=f(e),t.length==2?s=h(V(e)):(s=[],console.error("don't support matrix 3 x 3")),c(t,s)}function G(e,t){return t.map(s=>S(e,s))}function F(e){return[[1,0],[Math.tan(f(e)),1]]}function I(e){return[[1,Math.tan(f(e))],[0,1]]}function A(e,t){const[s,r]=e;return C(r,q(s,t))}function q(e,t){const s=h(F(e));return c(t,s)}function C(e,t){const s=h(I(e));return c(t,s)}function J(e,t){return t.map(s=>A(e,s))}const E=[[1,0],[0,-1]],O=[[-1,0],[0,1]];function R(e,t){let s;return t.length==2?e==1?s=h(E):e==-1?s=h(O):(s=[],console.error("don't get a available factor")):(s=[],console.error("don't support matrix 3 x 3")),c(t,s)}function K(e,t){return t.map(s=>R(e,s))}function f(e){return e/180*Math.PI}function H(e){return e.map(t=>(t.push(1),t))}function N(e){return e.push(1),e}function W(e,t){const s=N(t),r=H([[1,0],[0,1]]);return r.push([...e,1]),c(s,h(r))}function L(e,t){return t.map(s=>W(e,s)).map(s=>s==null?void 0:s.slice(0,s.length-1))}function Q(e){return parseFloat(e.value)}function Z(e){const s=e.value.split(",").slice();return s.length>2&&console.warn("only use the first and second factor"),s.length==1&&(s[1]=s[0]),s.map(r=>parseFloat(r))}function $(e){const t=e.value.trim();return t=="x"?1:t=="y"?-1:console.error("error input factor on mirror transform")}function tt(e){const s=e.value.split(",").slice();if(s.length>4){console.error("can only put 4 factors");return}const[r,i,n,o]=s.map(l=>parseFloat(l));if(s.length==4||s.length==3)return d(r,i,n,o);console.error("miss too much factors")}function j(e,t){const s=e.length,r=t.length;if(e.length!==t.length)return!1;{const i=Math.max(s,r);for(let n=0;n<i;n++){const o=e[n],l=t[n];if(o===void 0||l===void 0)return!1;if(o!==l)return!1}}return!0}function d(e,t,s,r=0){return[e,t,s,r]}class st{constructor(){a(this,"bodys");a(this,"axis");this.axis=d(0,1,0)}Add_body(t){this.bodys||(this.bodys=[]),this.bodys.push(t)}draw(){const t=this.bodys||[];if(t.length)for(let s=0;s<t.length;s++)t[s].draw()}rotate(t,s){const r=this.bodys||[];if(r.length)for(let i=0;i<r.length;i++)r[i].rotate(t,s||this.axis)}}class et{constructor(t,s){a(this,"aspects");a(this,"d_ctx");a(this,"origin_aspects");a(this,"axis");this.aspects=t,this.origin_aspects=t.map(r=>r.map(i=>i.slice())),this.d_ctx=s,this.axis=d(0,1,0)}draw(){const t=this.aspects[0].map(r=>_(r)),s=this.aspects[1].map(r=>_(r));p(t,this.d_ctx),p(s,this.d_ctx),k(t,s,this.d_ctx)}rotate(t,s){const r=f(t);s=U(s||this.axis),j(this.axis,s)||(this.axis=s,this.origin_aspects=this.aspects);const i=s[0],n=s[1],o=s[2],l=h([[i**2*(1-Math.cos(r))+Math.cos(r),i*n*(1-Math.cos(r))+o*Math.sin(r),i*o*(1-Math.cos(r)-n*Math.sin(r)),0],[i*n*(1-Math.cos(r))-o*Math.sin(r),n**2*(1-Math.cos(r))+Math.cos(r),n*o*(1-Math.cos(r)+i*Math.sin(r)),0],[i*o*(1-Math.cos(r))+n*Math.sin(r),o*n*(1-Math.cos(r))-i*Math.sin(r),o**2*(1-Math.cos(r))+Math.cos(r),0],[0,0,0,1]]),m=this.origin_aspects.map(M=>M.map(w=>c(w,l)));this.aspects=m}}function _(e){return e.slice(0,2)}function p(e,t){e.forEach((s,r)=>{const i=(r+1)%e.length;t.draw_line(s,e[i])})}function k(e,t,s,r){r=r||e.map((i,n)=>n),r.forEach((i,n)=>{s.draw_line(e[n],t[i])})}function rt(...e){return[...e]}function U(e){const t=Math.sqrt(e.reduce((s,r)=>s+r**2,0));return e.map(s=>s/t)}export{j as A,v as D,rt as N,st as O,et as S,d as V,Z as a,Q as b,J as c,$ as d,L as e,tt as i,K as m,G as r,B as s};
