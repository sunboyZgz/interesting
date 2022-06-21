/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-20 13:26:09
 * @LastEditTime: 2022-06-21 11:03:13
 */
import {createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Index = () => import("./components/index.vue")
const Box = () => import('./components/001.vue')
const Ball = () => import('./components/002.vue')

type MyRoute = RouteRecordRaw & {
  id?: string,
  filter?: boolean
}

const add_name = (route: MyRoute): MyRoute => ({
  name: (route.path[1]? route.path[1] : '').toUpperCase() + route.path.slice(2),
  ...route,
})
const add_id = (route: MyRoute, index: number): MyRoute => ({
  id: (index).toString().padStart(3, '0') + route.name?.toString(),
  ...route
})
export const filter_noid = (route: MyRoute): boolean => (!route.filter)
const routes: MyRoute[] = [
  { path: '/', component: Index, filter: true },
  { path: '/box', component: Box },
  { path: '/ball', component: Ball },
].map(add_name).map(add_id)
console.log(routes)
const router = createRouter({
  routes,
  history: createWebHistory()
})

export {
  router,
  routes
}