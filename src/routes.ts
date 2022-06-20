/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-20 13:26:09
 * @LastEditTime: 2022-06-20 14:13:10
 */
import {createRouter, createWebHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

const Box = () => import('./components/001.vue')
const Ball = () => import('./components/002.vue')

const add_name = (route: RouteRecordRaw): RouteRecordRaw => ({
  name: route.path[1].toUpperCase() + route.path.slice(2),
  ...route,
})
const routes: RouteRecordRaw[] = [
  { path: '/box', component: Box },
  { path: '/ball', component: Ball },
].map(add_name)

const router = createRouter({
  routes,
  history: createWebHistory()
})

export {
  router,
  routes
}