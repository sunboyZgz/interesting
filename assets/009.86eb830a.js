import{d as x,i as h,c as f,a as m,F as b,b as v,o as g,n as F,t as y}from"./index.0b863bf9.js";const O=2**7-1;function S(e,s="f32"){const t=new Array(32).fill(0);let o=parseFloat(e);if(o==0)return t;o<0&&(t[0]=1),e.indexOf(".")==-1&&(e=e+".0");const n=parseInt(o<0?e.slice(1,e.indexOf(".")):e.slice(0,e.indexOf(".")))||0,i=parseFloat("0"+e.slice(e.indexOf(".")));let l=n.toString(2).split(""),r=i.toString(2).slice(2).split(""),a=0;if(n!=0)a+=l.length-1,l=l.slice(1);else for(let p=0;p<r.length;p++)if(a--,parseInt(r[p])==1){r=r.slice(p+1);break}let _=(n==0?r:l.concat(r)).slice(0,23),u=a+O;console.log("integer_bits: ",l),console.log("tail_bits: ",_),console.log("float: ",e),console.log("po: ",a),console.log("exponent: ",u);const c=u.toString(2).split("");return console.log("exponent_section: ",c),d(t,c,9-c.length,c.length),d(t,_,9,_.length),t}function d(e,s,t,o){for(let n=t,i=0;n<t+o;n++,i++)e[n]=s[i]}const k={class:"w-[600px] h-[600px]",style:{border:"1px black solid"}},w={class:"mt-2 mb-2 min-h-2"},B=x({__name:"009",setup(e){const s=h(new Array(32).fill(0));function t(o){const n=o.target.value;s.value=S(n),console.log("float_format: ",s.value.join(""))}return(o,n)=>(g(),f("div",k,[m("div",w,[(g(!0),f(b,null,v(s.value,(i,l)=>(g(),f("span",{class:F(["mr-1 ml-1",{"text-red-500":l==0,"text-blue-500":l!=0&&l<9,"text-yellow-500":l>8}])},y(i),3))),256))]),m("input",{id:"ip",onChange:t,placeholder:"input a float"},null,32)]))}});export{B as default};
