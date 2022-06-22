<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-21 10:34:06
 * @LastEditTime: 2022-06-22 11:18:20
-->
<script setup lang="ts">
import {routes, filter_noid} from '../routes'
const list = routes.filter(filter_noid)
</script>
<template>
  <div>
    <h1>interesting</h1>
    <ul class="w-1/2 list-none flex min-w-150">
      <li class="w-1/3 flex-grow-0 flex-shrink-0" v-for="item in list">
        <router-link class="underline-transparent text-black text-2xl " :to="item.path">{{`${item.id}   ${item.name?.toString()}`}}</router-link>
      </li>
    </ul>
  </div>
</template>
