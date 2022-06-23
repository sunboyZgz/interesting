<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-23 11:14:08
 * @LastEditTime: 2022-06-23 19:24:14
-->
<template>
  <canvas
    ref="canvas"
    width="600"
    height="600"
    style="border: 1px black solid"
  ></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
interface Point {
  x: number,
  y: number
}
interface Angle {
  last: number,
  degree: number
}
const canvas = $ref<HTMLCanvasElement>();
let ctx:CanvasRenderingContext2D;
let WIDTH: number;
let HEIGHT: number;
const noop = () => {}
function init()  {
  ctx = canvas.getContext('2d')!;
  ctx.lineWidth = 1;
  WIDTH = canvas.width;
  HEIGHT = canvas.width;
}

function sin(angle: number) {//not radian
  return Math.sin(rotate_angle(angle))
}
function cos(angle: number) {
  return Math.cos(rotate_angle(angle))
}
function rotate_angle(angle: number) {
  return Math.PI / 180 * angle
}
function line_len(start: Point, end: Point) {
  const x = end.x - start.x;
  const y = end.y - start.y;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}
const pending_task: [Function,Function][] = []
const flower_task: Function[][] = []
let num_branches = 0;

function getRandomArbitrary(min:number, max:number) {
  return Math.random() * (max - min) + min;
}
function draw_line_r(start: Point, end: Point, angle: Angle, counts: number) {
  const l = line_len(start, end) * (1 - 0.05 * num_branches);
  const l_angle = angle.last - angle.degree * getRandomArbitrary(0.3, 0.8);
  const r_angle = angle.last + angle.degree * getRandomArbitrary(0.3, 0.8);
  const l_end = {
    x: end.x + sin(l_angle) * l,
    y: end.y - cos(l_angle) * l
  };
  const r_end = {
    x: end.x + sin(r_angle) * l,
    y: end.y - cos(r_angle) * l
  }
  if (counts > 0) {
    const probability = 0.5;
    const flower_prob = 0.8;
    const min_branches = 4;
    const flower_branch = 3
    if (Math.random() < probability || num_branches < min_branches) {
      pending_task.push([
      (Math.random() < flower_prob && num_branches > flower_branch) ? () => {flower(getRandomArbitrary(3,3.5), l_end);} : noop,
      () => {
        draw_line(end, l_end); //draw left
        draw_line_r(end, l_end, {last: l_angle, degree: angle.degree}, counts - 1)
      },
      
      ])
    }
    if (Math.random() < probability || num_branches < min_branches) {
      pending_task.push([
      (Math.random() < flower_prob && num_branches > flower_branch) ? () => {flower(getRandomArbitrary(3,3.5), r_end);} : noop,
      () => {
        draw_line(end, r_end);  //draw right
        draw_line_r(end, r_end, {last: r_angle, degree: angle.degree}, counts - 1)
      },
      ])
    }
  } 
}
function draw_line(start: Point, end: Point) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.closePath();
}
let count = 0;
function frame() {
  num_branches += 1;
  const tasks = pending_task.map(task => (task[1]));
  flower_task.push(pending_task.map(task => (task[0])));
  pending_task.length = 0;
  tasks.forEach(fn => fn())
}
let flower_counts = 0;
function is_interger(num: number) {
  return num == Math.floor(num)
}
function draw_flower() {
  requestAnimationFrame(() => {
    flower_counts += 1;
    const index = flower_counts / 3;
    if(flower_counts % 3 === 0) {
      is_interger(index) && flower_task[index].forEach(fn => fn())
    }
    if(is_interger(index) && flower_task[index] && flower_task[index].length === 0) {
    } else {
      draw_flower()
    }
  })
  
}
function execute() {
  requestAnimationFrame(() => {
    count += 1;
    if (count % 3 == 0) {
      frame()
    }
    if(count < 60 * 2) {
      execute()
    } else {
      console.log(flower_task)
      draw_flower()
    }
  })
  
}
function draw(start: Point, end: Point, angle: Angle) {
  draw_line(start, end);
  execute();
  draw_line_r(start, end, angle, 8)
}
function flower(radian: number, center: Point) {
  ctx.beginPath();
  ctx.fillStyle = '#ffa0cc';
  ctx.arc(center.x, center.y + radian * 1.5, radian * 1.5, 0, 2 * Math.PI)
  ctx.arc(center.x, center.y - radian * 1.5, radian * 1.5, 0, 2 * Math.PI)
  ctx.arc(center.x + radian * 1.5, center.y , radian * 1.5, 0, 2 * Math.PI)
  ctx.arc(center.x - radian * 1.5, center.y , radian * 1.5, 0, 2 * Math.PI)
  ctx.arc(center.x, center.y , radian * 1.5, 0, 2 * Math.PI)
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = '#e9fd72';
  ctx.arc(center.x, center.y, radian, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
onMounted(() => {
  init();
  const start = {x: WIDTH / 2, y: HEIGHT};
  const end = {x: WIDTH / 2, y: HEIGHT - 80};
  const angle:Angle = {last: 0, degree: 20}
  draw(start, end, angle);
})
</script>
