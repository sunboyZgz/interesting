<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-05 08:55:04
 * @LastEditTime: 2022-09-05 22:29:40
-->
<script lang="ts" setup>
import { matrix_transpose } from "./matrix";
import { ref } from "vue";
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];
const result = ref(matrix);
function transform() {
  result.value = matrix_transpose(result.value);
}
</script>

<template>
  <div class="w-[600px] h-[600px]" style="border: 1px black solid">
    <div class="min-h-40">
      <h4>矩阵转置</h4>
      <div class="flex" v-for="row in result">
        <span class="mr-1 basis-xl" v-for="item in row">{{ item }}</span>
      </div>
    </div>
    <button v-on:click.stop="transform">transpose</button>
  </div>
</template>
