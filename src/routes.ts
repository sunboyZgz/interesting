/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-20 13:26:09
 * @LastEditTime: 2022-08-20 09:10:21
 */
import {createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Index = () => import("./components/index.vue")
const Box = () => import('./components/001.vue')
const Ball = () => import('./components/002.vue')
const Tree = () => import('./components/003.vue')
const Radar = () => import('./components/004.vue')

type MyRoute = RouteRecordRaw & {
  id?: string,
  filter?: boolean
}

const add_name = (route: MyRoute): MyRoute => ({
  name: (route.path[1]? route.path[1] : '').toUpperCase() + route.path.slice(2),
  ...route,
})
const add_id = (route: MyRoute, index: number): MyRoute => ({
  id: (index).toString().padStart(3, '0'),
  ...route
})
export const filter_noid = (route: MyRoute): boolean => (!route.filter)
const routes: MyRoute[] = [
  { path: '/', component: Index, filter: true },
  { path: '/box', component: Box },
  { path: '/ball', component: Ball },
  { path: '/tree', component: Tree },
  { path: '/radar', component: Radar },
].map(add_name).map(add_id)
const router = createRouter({
  routes,
  history: createWebHistory()
})

export {
  router,
  routes
}