<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-05 08:55:04
 * @LastEditTime: 2022-09-07 10:14:44
-->
<script lang="ts" setup>
import { matrix_transpose, matrix_multi } from "./matrix";
import { ref } from "vue";
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];
const transpose_result = ref(matrix);
function transform() {
  transpose_result.value = matrix_transpose(transpose_result.value);
}

const matrix1 = [
  [1, 3],
  [5, 2],
  [0, 4],
];

const matrix2 = [
  [3, 6, 9, 4],
  [2, 7, 8, 3],
];

const mutil_result = ref<number[][]>();
function mutiple() {
  mutil_result.value = matrix_multi(matrix1, matrix2);
}
</script>

<template>
  <div class="w-[600px] h-[600px] flex" style="border: 1px black solid">
    <div class="min-h-40 basis-[33%]">
      <h4>矩阵转置</h4>
      <div class="flex" v-for="row in transpose_result">
        <span class="mr-1 basis-xl" v-for="item in row">{{ item }}</span>
      </div>
      <button v-on:click.stop="transform">transpose</button>
    </div>

    <div class="min-h-40 basis-[66%]">
      <h4>矩阵转置</h4>
      <div class="w-full flex flex-wrap">
        <div class="w-[50%]">
          <div class="flex" v-for="row in matrix1">
            <span class="mr-1 basis-xl" v-for="item in row">{{ item }}</span>
          </div>
        </div>
        <div class="w-[50%]">
          <div class="flex w-[50%]" v-for="row in matrix2">
            <span class="mr-1 basis-xl" v-for="item in row">{{ item }}</span>
          </div>
        </div>
        <div class="w-[50%]">
          <button v-on:click.stop="mutiple">mutiple</button>
        </div>
        <div class="w-[50%]">
          <div class="flex w-[50%]" v-for="row in mutil_result">
            <span class="mr-1 basis-xl" v-for="item in row">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
