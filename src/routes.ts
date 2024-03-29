/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-20 13:26:09
 * @LastEditTime: 2022-10-11 21:41:41
 */
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const Index = () => import("./components/index.vue");
const Box = () => import("./components/001.vue");
const Ball = () => import("./components/002.vue");
const Tree = () => import("./components/003.vue");
const Radar = () => import("./components/004.vue");
const D3In2 = () => import("./components/006.vue");
const WebGL = () => import("./components/005.vue"); //TODO
const Matrix = () => import("./components/007.vue");
const LinearTranspose = () => import("./components/008.vue");
const Float = () => import("./components/009.vue");

export type MyRoute = RouteRecordRaw & {
  id?: string;
  filter?: boolean;
};

const add_name = (route: MyRoute): MyRoute => ({
  name:
    (route.path[1] ? route.path[1] : "").toUpperCase() + route.path.slice(2),
  ...route,
});
const add_id = (route: MyRoute, index: number): MyRoute => ({
  id: index.toString().padStart(3, "0"),
  ...route,
});
export const filter_noid = (route: MyRoute): boolean => !route.filter;
const routes: MyRoute[] = [
  { path: "/", component: Index, filter: true },
  { path: "/box", component: Box, meta: { title: "盒子" } },
  { path: "/ball", component: Ball, meta: { title: "投球" } },
  { path: "/tree", component: Tree, meta: { title: "树枝" } },
  { path: "/radar", component: Radar, meta: { title: "雷达图" } },
  { path: "/matrix", component: Matrix, meta: { title: "矩阵数学" } },
  { path: "/tlinear", component: LinearTranspose, meta: { title: "线性转换" } },
  {
    path: "/camera",
    component: D3In2,
    meta: { title: "相机空间" },
  },
  {
    path: "/float",
    component: Float,
    meta: { title: "浮点数表示法" },
  },
  { path: "/gl_tutorial", component: WebGL },
]
  .map(add_name)
  .map(add_id);
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router, routes };
