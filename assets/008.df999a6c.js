import{V as l,D as m}from"./draw.d35c0036.js";import{r as _,m as x}from"./matrix.eb4bdb6d.js";import{d as h,i as u,j as v,l as w,c as f,a,o as M}from"./index.26f9fda3.js";function i(t){return parseFloat(t.value)}function g(t,n){let e;return n.length==2?e=[[t,0],[0,t]]:e=[[t,0,0],[0,t,0],[0,0,t]],_(n,e)}function k(t,n){return n.map(e=>g(t,e))}function B(t,n){let e;return t=b(t),n.length==2?e=x([[Math.cos(t),Math.sin(t)],[-Math.sin(t),Math.cos(t)]]):(e=[],console.error("don't support matrix 3 x 3")),_(n,e)}function C(t,n){return n.map(e=>B(t,e))}function b(t){return t/180*Math.PI}const y={class:"flex"},E=a("input",{id:"scale_input",class:"max-w-10"},null,-1),I=a("hr",{class:"mt-4"},null,-1),F=a("input",{id:"rotate_input",class:"max-w-10"},null,-1),T=h({__name:"008",setup(t){const n=u(),e=[l(0,4),l(2,0),l(4,2),l(2,2)].map(o=>[o[0]*30,o[1]*30]),s=u(e);let r;v(()=>{r=new m(n.value),r.translate_origin("center"),r.draw_x(),r.draw_z(),r.draw_vector_order(e),w([s],()=>{r.draw_vector_order(s.value)})});const d=()=>{const o=document.getElementById("scale_input"),c=i(o);s.value=k(c,s.value)},p=()=>{const o=document.getElementById("rotate_input"),c=i(o);s.value=C(c,s.value)};return(o,c)=>(M(),f("div",y,[a("div",{class:"min-w-10"},[a("button",{onClick:d},"\u7F29\u653E"),E,I,a("button",{onClick:p},"\u65CB\u8F6C"),F]),a("canvas",{ref_key:"container",ref:n,class:"w-[600px] h-[600px]",style:{border:"1px black solid"}},null,512)]))}});export{T as default};
