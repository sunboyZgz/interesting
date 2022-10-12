<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-10-11 21:41:19
 * @LastEditTime: 2022-10-12 10:30:25
-->
<template>
  <div class="w-[600px] h-[600px]" style="border: 1px black solid">
    <div class="mt-2 mb-2 min-h-2">
      <span
        class="mr-1 ml-1"
        :class="{
          'text-red-500': index == 0,
          'text-blue-500': index != 0 && index < 9,
          'text-yellow-500': index > 8,
        }"
        v-for="(bit, index) in float_format"
        >{{ bit }}</span
      >
    </div>
    <input id="ip" @change="onChange" placeholder="input a float"  />
  </div>
</template>

<script setup lang="ts">
import { floatFormat } from "./float";
import { ref } from "vue";
const float_format = ref(new Array(32).fill(0));
function onChange(ev: Event) {
  const v = (ev.target as HTMLInputElement).value;
  float_format.value = floatFormat(v);
  console.log("float_format: ", float_format.value.join(""));
}
</script>
