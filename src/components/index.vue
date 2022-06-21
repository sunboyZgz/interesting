<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-21 10:34:06
 * @LastEditTime: 2022-06-21 11:01:48
-->
<script setup lang="ts">
import {routes, filter_noid} from '../routes'
const list = routes.filter(filter_noid)
</script>
<template>
  <ul class="w-1/2 list-none">
    <li v-for="item in list">
      <router-link :to="item.path">{{item.id}}</router-link>
    </li>
  </ul>
</template>
