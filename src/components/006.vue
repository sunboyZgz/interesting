<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-09-18 22:19:28
-->
<template>
  <div class="flex">
    <button @click="AddDegree">degree+1</button>
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
import { Vector3, New_Aspect, Square } from "./new_transform";
const container = $ref<HTMLCanvasElement>();
const camera_pos = Vector3(0, 0, 0);
//asume that the orthogonal axis of camera is aligned with x, y , z;
const up_aspect = New_Aspect(
  Vector3(-100, 100, -100),
  Vector3(-100, 100, 100),
  Vector3(100, 100, 100),
  Vector3(100, 100, -100)
);
const down_aspect = New_Aspect(
  Vector3(-100, -100, -100),
  Vector3(-100, -100, 100),
  Vector3(100, -100, 100),
  Vector3(100, -100, -100)
);

const degree = ref(0);
let d_context: DrawContext;
let square: Square;
watch([degree], () => {
  d_context.clear_ctx();
  square.rotate(degree.value);
  square.draw();
});

function AddDegree() {
  degree.value += 1;
}

let t1 = setInterval(() => {
  AddDegree();
}, 200);
let t2 = setTimeout(() => {
  clearInterval(t1);
  clearTimeout(t2);
}, 10000);
// let d_context;
onMounted(() => {
  d_context = new DrawContext(container);
  d_context.translate_origin("center");
  d_context.mirror_coordinate();
  // d_context.draw_x();
  // d_context.draw_z();
  square = new Square([up_aspect, down_aspect], d_context);
  square.rotate(degree.value);
  square.draw();
});
</script>
