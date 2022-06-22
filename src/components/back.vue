<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-22 11:02:04
 * @LastEditTime: 2022-06-22 11:18:59
-->
<template>
  <div class="cursor-pointer text-2xl" @click="back">&lt-</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const r = useRouter()
const back = () => {
  r.push('/')
}
</script>
<style>

</style>