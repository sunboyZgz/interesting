<script setup lang="ts">
</script>

<template>
    <div class="text-center mb-4">title</div>
    <router-view></router-view>
    <footer class="text-center mt-4">footer</footer>
</template>

<style>
.center {
  overflow: hidden;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
