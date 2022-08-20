<script setup lang="ts">
import Back from './components/back.vue'
import { useRoute } from 'vue-router'
const r = useRoute()
console.log(r)
</script>

<template>
    <header v-if="r.path != '/'" class="text-center fix-o text-2xl top-[5%]">{{r.name}}</header>
    <Back v-if="r.path != '/'" class="fix-o back" />
    <router-view class="center fix-o"></router-view>
    <footer class="fix-o bottom-0 translate-x-[-50%]">
      <a class="text-xl" href="https://github.com/sunboyZgz" target="_blank">github</a>
      <a class="text-4xl" >.</a>
      <a class="text-xl" href="https://twitter.com/sunboy_zgz" target="_blank">twitter</a>
      <div class="text-xl">from 2022/6/19</div>
    </footer>
</template>

<style>
.fix-o {
  overflow: hidden;
  position: fixed;
  transform: translate(-50%, -50%);
}
.center {
  left: 50%;
  top: 50%;
}
.back {
  left: 35%;
  top: 5%;
}
header {
  left: 50%;
  top: 10%;
}

footer {
  left: 50%;
  bottom: 5%;
}
</style>
