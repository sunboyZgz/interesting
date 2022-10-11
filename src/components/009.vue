<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-10-11 21:41:19
 * @LastEditTime: 2022-10-11 22:25:53
-->
<template>
  <div class="w-[600px] h-[600px]" style="border: 1px black solid">
    <div class="mt-2 mb-2 min-h-2">
      <span class="mr-1 ml-1" v-for="bit in float_format">{{ bit }}</span>
    </div>
    <input id="ip" @change="onChange" placeholder="1.1" />
  </div>
</template>

<script setup lang="ts">
import { fractionAndInteger, floatFormat, floatTuple } from "./float";
import { onMounted, ref } from "vue";
let value: floatTuple = [0, 0];
const float_format = ref();
function onChange(ev: Event) {
  const v = (ev.target as HTMLInputElement).value;
  value = fractionAndInteger(v);
  console.log(value);
  float_format.value = floatFormat(v.startsWith("-"), value);
}
onMounted(() => {
  const input = document.getElementById("ip") as HTMLInputElement;
  float_format.value = floatFormat(input.value.startsWith("-"), value);
});
</script>
