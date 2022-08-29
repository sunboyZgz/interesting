<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:22:24
 * @LastEditTime: 2022-08-29 22:33:02
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
import { DrawContext, Vector2 } from "./util";
const container = $ref<HTMLCanvasElement>();
let ctx: DrawContext;
onMounted(() => {
  ctx = new DrawContext(container);
  ctx.translate_origin("center");
  ctx.draw_point(Vector2(0, 0));
  ctx.draw_line(Vector2(100, 100), Vector2(200, 200));
});
</script>
