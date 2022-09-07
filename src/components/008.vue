<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 09:41:56
 * @LastEditTime: 2022-09-07 09:46:14
-->
<template>
  <div
    ref="container"
    class="w-[600px] h-[600px]"
    style="border: 1px black solid"
  ></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { DrawContext, Vector2 } from "./util";
const container = ref<HTMLCanvasElement>();

onMounted(() => {
  const d_context = new DrawContext(container.value!);
});
</script>
