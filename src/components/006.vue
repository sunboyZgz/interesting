<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-09-03 22:16:46
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
import { DrawContext, Vector2, Vector3 } from "./draw";
const container = $ref<HTMLCanvasElement>();
let ctx: DrawContext;
onMounted(() => {
  ctx = new DrawContext(container);
  ctx.translate_origin("center");
  ctx.draw_point(Vector2(0, 0));
  ctx.draw_x();
  ctx.draw_z();
  ctx.draw_y(30); //now I can only resolve use a stupid method
  const polygons = [
    Vector3(1, -1, 1),
    Vector3(1, 1, 1),
    Vector3(-1, 1, 1),
    Vector3(-1, -1, 1),
  ];
  const polygons1 = [
    Vector3(1, -1, -1),
    Vector3(1, 1, -1),
    Vector3(-1, 1, -1),
    Vector3(-1, -1, -1),
  ];
  
});
</script>
