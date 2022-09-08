import{d as v,i as M,j as R,c as L,o as E}from"./index.53637e61.js";const b=v({__name:"005",setup(F){const s=M();R(()=>{const e=s.value.getContext("webgl");e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT);const t=m(e,`
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `,`
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `),n={program:t,attribLocations:{vertexPosition:e.getAttribLocation(t,"aVertexPosition")},uniformLocations:{projectionMatrix:e.getUniformLocation(t,"uProjectionMatrix"),modelViewMatrix:e.getUniformLocation(t,"uModelViewMatrix")}},o=x(e);h(e,n,o)});function m(e,r,a){const t=f(e,e.VERTEX_SHADER,r),n=f(e,e.FRAGMENT_SHADER,a),o=e.createProgram();return e.attachShader(o,t),e.attachShader(o,n),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)?o:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(o)),null)}function f(e,r,a){const t=e.createShader(r);return e.shaderSource(t,a),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(t)),e.deleteShader(t),null)}function x(e){const r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r);var a=[1,1,0,-1,1,0,1,-1,0,-1,-1,0];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),{position:r}}function h(e,r,a){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const t=45*Math.PI/180,n=e.canvas.clientWidth/e.canvas.clientHeight,o=.1,_=100,i=window.glMatrix.mat4,u=i.create();i.perspective(u,t,n,o,_);const c=i.create();i.translate(c,c,[-0,0,-6]);{const d=e.FLOAT,P=!1,S=0,A=0;e.bindBuffer(e.ARRAY_BUFFER,a.position),e.vertexAttribPointer(r.attribLocations.vertexPosition,2,d,P,S,A),e.enableVertexAttribArray(r.attribLocations.vertexPosition)}e.useProgram(r.program),e.uniformMatrix4fv(r.uniformLocations.projectionMatrix,!1,u),e.uniformMatrix4fv(r.uniformLocations.modelViewMatrix,!1,c),e.drawArrays(e.TRIANGLE_STRIP,0,4)}return(e,r)=>(E(),L("canvas",{ref_key:"container",ref:s,class:"w-[600px] h-[400px]",style:{border:"1px black solid"}}," hello ",512))}});export{b as default};
