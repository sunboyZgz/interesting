<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 09:41:56
 * @LastEditTime: 2022-09-09 08:05:14
-->
<template>
  <div class="flex">
    <div class="min-w-10">
      <button @click="onScale">缩放</button>
      <input id="scale_input" class="max-w-10" />
      <hr class="mt-4" />
      <button @click="onRotate">旋转</button>
      <input id="rotate_input" class="max-w-10" />
      <hr class="mt-4" />
      <button @click="onShear">剪切</button>
      <input id="shear_input" class="max-w-10" />
      <hr class="mt-4" />
      <button @click="onMirror">镜像</button>
      <input id="mirror_input" class="max-w-10" />
      <hr class="mt-4" />
      <button @click="onTranslate">平移</button>
      <input id="translate_input" class="max-w-10" />
    </div>
    <canvas
      ref="container"
      class="w-[600px] h-[600px]"
      style="border: 1px black solid"
    ></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, unref, watch } from "vue";
import { DrawContext, VECTOR2 } from "./draw";
import {
  inputToInteger,
  inputToMutiFactor,
  inputToMirrorFactor,
} from "./common";
import {
  scale_vectors,
  rotate_vectors,
  shear_vectors,
  mirror_vectors,
  affine_translate_vs,
} from "./transform";
import { squareMatrix } from "./test";
const container = ref<HTMLCanvasElement>();
// const vectors = [
//   Vector2(0, 4),
//   Vector2(2, 0),
//   Vector2(4, 2),
//   Vector2(2, 2),
// ].map((item) => [item[0] * 30, item[1] * 30]);
const vectors = squareMatrix.map((item) => [item[0] * 60, item[1] * 60]);
const result = ref(vectors);
let d_context: DrawContext;
onMounted(() => {
  d_context = new DrawContext(container.value!);
  d_context.translate_origin("center");
  d_context.draw_x();
  d_context.draw_z();
  d_context.draw_vector_order(vectors as VECTOR2[]);
  watch([result], () => {
    d_context.draw_vector_order(result.value as VECTOR2[]);
  });
});
const onScale = () => {
  const input = document.getElementById("scale_input") as HTMLInputElement;
  const factor = inputToMutiFactor(input);
  result.value = scale_vectors(factor, result.value as VECTOR2[]);
};

const onRotate = () => {
  const input = document.getElementById("rotate_input") as HTMLInputElement;
  const factor = inputToInteger(input);
  result.value = rotate_vectors(factor, result.value as VECTOR2[]);
};

const onShear = () => {
  const input = document.getElementById("shear_input") as HTMLInputElement;
  const factors = inputToMutiFactor(input);
  result.value = shear_vectors(factors, result.value as VECTOR2[]);
};

const onMirror = () => {
  const input = document.getElementById("mirror_input") as HTMLInputElement;
  const factor = inputToMirrorFactor(input);
  result.value = mirror_vectors(factor, result.value as VECTOR2[]);
};

const onTranslate = () => {
  const input = document.getElementById("translate_input") as HTMLInputElement;
  const factor = inputToMutiFactor(input);
  result.value = affine_translate_vs(factor, result.value as VECTOR2[]);
};
</script>
