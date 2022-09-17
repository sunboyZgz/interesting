<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-09-17 23:01:11
-->
<template>
  <canvas
    ref="container"
    class="w-[600px] h-[600px]"
    style="border: 1px black solid"
  >
    3d in 2d
  </canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { DrawContext } from "./draw";
import { Vector3, New_Aspect, Square } from "./new_transform";
const container = $ref<HTMLCanvasElement>();
const camera_pos = Vector3(0, 0, 0);
//asume that the orthogonal axis of camera is aligned with x, y , z;
const up_aspect = New_Aspect(
  Vector3(-100, -100, 100),
  Vector3(-100, 100, 100),
  Vector3(100, 100, 100),
  Vector3(100, -100, 100)
);
const down_aspect = New_Aspect(
  Vector3(-100, -100, -100),
  Vector3(-100, 100, -100),
  Vector3(100, 100, -100),
  Vector3(100, -100, -100)
);

// let d_context;
onMounted(() => {
  let d_context = new DrawContext(container);
  d_context.translate_origin("center");
  d_context.mirror_coordinate();
  // d_context.draw_x();
  // d_context.draw_z();
  const square = new Square([up_aspect, down_aspect], d_context);
  square.rotate(30);
  square.draw();
});
</script>
