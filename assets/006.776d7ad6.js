var o=Object.defineProperty;var d=(e,t,i)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var r=(e,t,i)=>(d(e,typeof t!="symbol"?t+"":t,i),i);import{d as _,i as l,j as x,c as w,o as g}from"./index.7f164155.js";class u{constructor(t){r(this,"el");r(this,"ctx");r(this,"width");r(this,"height");r(this,"degree_y");const i=t.clientWidth,h=t.clientWidth;t.width=i,t.height=h,this.el=t,this.ctx=t.getContext("2d"),this.width=i,this.height=h,this.degree_y=0}translate_origin(t){typeof t=="string"?(t=y(t,this),c(t,this.ctx)):c(t,this.ctx)}draw_point(t){this.ctx.beginPath(),this.ctx.fillStyle="#000",this.ctx.arc(t[0],t[1],1,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath()}draw_line(t,i){this.ctx.beginPath(),this.ctx.moveTo(t[0],t[1]),this.ctx.lineTo(i[0],i[1]),this.ctx.stroke(),this.ctx.closePath()}draw_x(){this.draw_line(s(-this.width/2,0),s(this.width/2,0))}draw_z(){this.draw_line(s(0,-this.height/2),s(0,this.height/2))}draw_y(t){const i=t&&(this.degree_y=-t)&&this.degree_y||this.degree_y;let h,n;f(i)?(h=this.width/2,n=this.width/2*Math.tan(i/180*Math.PI)):(n=this.height/2,h=this.height/2/Math.tan(i/180*Math.PI)),this.draw_line(s(-h,-n),s(h,n))}}function a(e,t){return e=e%360,Math.abs(Math.abs(e)-t)}function f(e){return a(e,0)<=45||a(e,180)<=45}function s(e,t){return[e,t]}function y(e,t){const i=t.el.width,h=t.el.height;switch(e){case"center":return{x:i/2,y:h/2};default:return{x:0,y:0}}}function c(e,t){t.translate(e.x,e.y)}const b=_({__name:"006",setup(e){const t=l();let i;return x(()=>{i=new u(t.value),i.translate_origin("center"),i.draw_point(s(0,0)),i.draw_x(),i.draw_z(),i.draw_y(30)}),(h,n)=>(g(),w("canvas",{ref_key:"container",ref:t,class:"w-[600px] h-[600px]",style:{border:"1px black solid"}}," 3d in 2d ",512))}});export{b as default};