<script setup lang="ts">
import {routes} from './routes'
// const routes_map = routes.map(route => ({
//   ...route,
//   name: route
// }));

</script>

<template>
  <div id="demonstrate">
    <ol>
      <li v-for="item in routes">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ol>
    <router-view></router-view>
  </div>
</template>

<style>
/* #demonstrate {
  position: absolute;
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}  */
</style>
