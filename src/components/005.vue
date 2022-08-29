<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-26 20:48:11
 * @LastEditTime: 2022-08-26 21:07:43
-->
<template>
  <canvas
    ref="container"
    class="w-[600px] h-[400px]"
    style="border: 1px black solid"
  >
    hello
  </canvas>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
const container = $ref<HTMLCanvasElement>();
onMounted(() => {
  const webgl = container.getContext("webgl")!;
  //assume that the browser supports the webgl
  webgl.clearColor(0, 0, 0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
});
</script>

<style></style>
