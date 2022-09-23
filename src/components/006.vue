<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-09-23 21:35:35
-->
<template>
  <div class="flex">
    <div>
      <input id="v_input" type="text" placeholder="such as input 2,3,4" />
      <button @click="AddDegree">degree+1</button>
      <button @click="start">start</button>
    </div>
    <canvas
      ref="container"
      class="w-[600px] h-[600px]"
      style="border: 1px black solid"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { DrawContext } from "./draw";
import { Vector3, New_Aspect, Square, OrthographicPrj } from "./new_transform";
import type { Vector3 as V3 } from "./new_transform";
import { inputToVector3, Arr_isEqual } from "./common";
import { square_model, rectangle_mode } from "./model";

const container = $ref<HTMLCanvasElement>();
const camera_pos = Vector3(0, 0, 0);
//asume that the orthogonal axis of camera is aligned with x, y , z;

const degree = ref(0);
let d_context: DrawContext;
let square: Square;
let rectangle: Square;
let world: OrthographicPrj;
let rotate_axis: V3 | undefined;
watch([degree], () => {
  d_context.clear_ctx();
  world.rotate(degree.value, rotate_axis);
  world.draw();
});

function AddDegree() {
  const v_input = document.getElementById("v_input") as HTMLInputElement;
  const axis = inputToVector3(v_input);
  if (!rotate_axis) {
    rotate_axis = axis;
  } else if (!Arr_isEqual(rotate_axis as number[], axis as number[])) {
    degree.value = 0;
  }
  rotate_axis = axis;
  degree.value += 1;
}
function start() {
  let t1 = setInterval(() => {
    AddDegree();
  }, 100);
  let t2 = setTimeout(() => {
    clearInterval(t1);
    clearTimeout(t2);
  }, 5000);
}
// let d_context;
onMounted(() => {
  d_context = new DrawContext(container);
  d_context.translate_origin("center");
  d_context.mirror_coordinate();
  square = new Square(rectangle_mode, d_context);
  rectangle = new Square(square_model, d_context);
  world = new OrthographicPrj();
  world.Add_body(square);
  world.Add_body(rectangle);
  world.draw();
});
</script>
