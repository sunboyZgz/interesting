<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-06-20 08:33:53
 * @LastEditTime: 2022-06-21 11:40:18
-->
<template>
<canvas
    class="center"
    ref="canvas"
    width="600"
    height="600"
    style="border: 1px black solid"
  ></canvas>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { Engine, Render, Composite, Bodies, Runner, Body, Vector, MouseConstraint, Mouse, Events} from "matter-js";
const canvas = $ref<HTMLCanvasElement>();
let engine;
const boundaryStyle = {
  fillStyle: 'white',
  strokeStyle: 'transparent'
}
function get_basket(ball_width: number): [body: Body, width: number] { //输入球
  const angle = Math.PI / 180 * 10;
  const sin_len = 2 * Math.sin(angle) * 25; //computed the line against with the rotate angle
  const gap = ball_width * 2 + sin_len + 1;
  const length = 50;
  const thick = 2;
  const computed_width = gap + length + sin_len;
  const left = Bodies.rectangle(200, 200, thick, length,{
    angle: -angle,
    isStatic: true
  });
  const right = Bodies.rectangle(200 + gap, 200, thick, length,{
    angle: angle,
    isStatic: true
  });
  const stick = Bodies.rectangle(200 + gap + length / 2, 200, length, thick,{
    isStatic: true
  })
  return [Body.create({
    parts: [left, right, stick],
    isStatic: true  
  }), computed_width];
}
function init(box_width: number, box_height: number) {
  engine = Engine.create();
  const render = Render.create({
    engine,
    canvas: canvas,
    options: {
      width: box_width,
      height: box_height,
      wireframes: false,
      background: "transparent"
    },
  })
  const ball_res = 0.5;
  const ball = Bodies.circle(15, box_height - 15, 30, {restitution:ball_res});
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(canvas),
  });
  // Events.on(mouseConstraint, 'mousedown', function(event) {
  //   console.log(event)
  // });
  //场地body
  const FLOOR_THICK = 20;
  const Floor_RES = 0.2;
  const topfloor = Bodies.rectangle(box_width / 2, 0,box_width, FLOOR_THICK, {isStatic: true, restitution:Floor_RES});
  const ground = Bodies.rectangle(box_width / 2, box_height,box_width, FLOOR_THICK, {isStatic: true, restitution:Floor_RES});
  const barrier = Bodies.rectangle(box_width / 2, box_height * 0.75,FLOOR_THICK, box_height * 0.5, {isStatic: true, restitution:Floor_RES});
  const left_wall = Bodies.rectangle(0, box_height / 2, 5, box_height, {isStatic: true, render:boundaryStyle, restitution:Floor_RES});
  const right_wall = Bodies.rectangle(box_width, box_height / 2,5, box_height, {isStatic: true, render:boundaryStyle, restitution:Floor_RES});
  //球body
  const [basket,width] = get_basket(ball.circleRadius!);
  Body.setPosition(basket, Vector.create(box_width - width / 2, box_height / 2))
  Composite.add(engine.world, [left_wall, right_wall,ground,topfloor,barrier, ball, basket]); //增加世界的东西
  Composite.add(engine.world, mouseConstraint); //增加鼠标可操作性
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine)
}
onMounted(() => {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  init(WIDTH, HEIGHT)
})
</script>