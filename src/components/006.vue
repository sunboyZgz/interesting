<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-09-16 08:32:00
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
import { Vector3 } from "./new_transform";
const container = $ref<HTMLCanvasElement>();
const camera_pos = Vector3(0, 0, 0);
//asume that the orthogonal axis of camera is aligned with x, y , z;

onMounted(() => {
  const d_context = new DrawContext(container);
  d_context.mirror_coordinate();
  d_context.draw_x();
  d_context.draw_z();
});
</script>
