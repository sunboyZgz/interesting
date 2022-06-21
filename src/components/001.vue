<template>
  <canvas
    class="center"
    ref="canvas"
    @click="events.click"
    width="600"
    height="600"
    style="border: 1px black solid"
  ></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Engine, Render, World, Bodies, Runner } from "matter-js";
type Noop = typeof noop;
interface Box {
  width: number;
  height: number;
}
interface Events {
  click: Noop | ((e:MouseEvent) => void)
}
const box: Box = {
  width: 50,
  height: 50,
};
const canvas = ref<HTMLCanvasElement>();
function noop(){}
let engine: Engine | null = null;
const events:Events = {
  click: noop
}
function init(width: number, height: number) {
  engine = Engine.create();
  const render = Render.create({
    engine,
    canvas: canvas.value,
    options: {
      width,
      height,
      wireframes: false,
      background: "transparent",
      hasBounds: true,
    },
  });
  const ground = Bodies.rectangle(0, height, width, 5, { isStatic: true }); //地面
  const cross_bar = Bodies.rectangle(
    width - width / 4,
    (height - 50) / 2,
    width / 2,
    50,
    { isStatic: true }
  ); //横杆
  World.add(engine.world, [ground, cross_bar]);
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);
}
function add_box_click(e: MouseEvent) {
  const x = e.x - canvas.value?.offsetLeft! + canvas.value!.width / 2; // + canvas.value的原因是因为需要把transform之前的原位置计算出来
  const box1 = Bodies.rectangle(x, 0, box.width, box.height);
  World.add(engine!.world, box1);
}

function add_events() {
  events.click = add_box_click
}
onMounted(() => {
  const WIDTH = canvas.value!.width;
  const HEIGHT = canvas.value!.height;
  init(WIDTH, HEIGHT);
  add_events()
});
</script>
