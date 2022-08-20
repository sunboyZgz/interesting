<!--
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-20 09:06:45
 * @LastEditTime: 2022-08-20 22:10:47
-->
<template>
  <div
    ref="container"
    class="w-[600px] h-[400px]"
    style="border: 1px black solid"
  ></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

type RadarData = Record<string, [real: number, max: number]>

interface Radar {
  size: [width: number, height: number] //width and height
  edge: number //正多边形的边数
  data: RadarData
  ctx?: CanvasRenderingContext2D
  radius: number
}
type Option = {
  size: Vector
  data: RadarData
}

type Vector = [x: number, y: number]
type Vectors = Vector[]
function init(r: Radar, container: HTMLElement)  {
  if (container.clientHeight < r.size[1]) {
    container.style.height = r.size[1] + 'px'
  }
  if (container.clientWidth < r.size[0]) {
    container.style.width = r.size[0] + 'px'
  }
  const canvas = document.createElement('canvas')
  canvas.width = r.size[0]
  canvas.height = r.size[1]
  canvas.style.margin = 'auto'
  container.appendChild(canvas)
  return canvas
}

function resolveRadar(option: Option): Radar {
  const keys = Object.keys(option.data)
  const edge = keys.length
  if (edge < 3) {
    console.error("[err] the number of edges must be more than 3")
  }
  const opt = {
    size: option.size,
    edge,
    data: option.data,
    ctx: undefined,
    radius: 0
  }
  return opt
}

function draw(ctx: CanvasRenderingContext2D, vectors: Vectors) {
  let cur = 0
  while (cur < vectors.length) {
    let nx = (cur + 1) % (vectors.length)
    ctx.beginPath()
    lineFromTo(ctx, vectors[cur], vectors[nx])
    ctx.strokeStyle = "#ff000094"
    ctx.stroke()
    ctx.closePath()
    cur++
  } 
}

function draw_title(ctx: CanvasRenderingContext2D, vectors: (string | Vector)[][]) {
  let cur = 0
  while (cur < vectors.length) {
    ctx.beginPath()
    ctx.font = "20px Microsoft YaHei"
    ctx.strokeText(vectors[cur][0] as string, vectors[cur][1][0] as number, vectors[cur][1][1] as number)
    ctx.stroke()
    ctx.closePath()
    cur++
  } 
}

function draw_data(ctx: CanvasRenderingContext2D, vectors: Vectors) {
  let cur = 0
  let timer = setInterval(() => {
    ctx.beginPath()
    if (cur < vectors.length) {
      let nx = (cur + 1) % (vectors.length)
      lineFromTo(ctx, vectors[cur], vectors[nx])
      ctx.strokeStyle = "blue"
      ctx.stroke()
      cur++
    } else {
      clearInterval(timer)
    }
  }, 300)
}

function scale_vector(v: Vector, factor: number): Vector {
  return [v[0] * factor, v[1]*factor]
}
function scale(vectors: Vectors, factor: number) {
  return vectors.map((vector) => {
    return scale_vector(vector, factor)
  }) 
}

function scale_factors(vectors: Vectors, factors: number[]) {
  return vectors.map((vector, i) => {
    return scale_vector(vector, factors[i])
  })
}

function getVectors(r: Radar) {
    const angle = 2 / r.edge * Math.PI  //(360 / r.edge) / 180 * Math.PI
    const vectors: Array<[x: number, y: number]> = new Array(r.edge)
    for (let i = 0; i < r.edge; i++) {
      let a = angle * (i + 1) - 1 / 2 * Math.PI - angle
      let v: [x: number, y:number] = [0, 0]
      v[0] = r.radius * Math.cos(a)
      v[1] = r.radius * Math.sin(a)
      vectors[i] = v
    }
    return vectors
}

function lineFromTo(ctx: CanvasRenderingContext2D,from: Vector, to: Vector) {
  ctx.moveTo(from[0], from[1])
  ctx.lineTo(to[0], to[1])
}
function createRadar(option: Option, container: HTMLElement): Radar {
  const r_option: Radar = resolveRadar(option) //can also use function to lookup
  const canvas = init(r_option, container)
  const ctx = r_option.ctx = canvas.getContext('2d')!
  const width = r_option.size[0]
  const height = r_option.size[1]
  // const radius = r_option.radius = Math.min(width, height) / 2
  r_option.radius = Math.min(width, height) / 2
  ctx.translate(width / 2, height / 2)
  //辅助线
  /*
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.stroke()
  lineFromTo(ctx, [-width / 2, 0], [width / 2, 0])
  lineFromTo(ctx, [0, -height / 2], [0, height / 2])
  ctx.stroke()
  */
  //基准线结束
  const vectors = getVectors(r_option)
  draw(ctx, vectors)
  const vectors1 = scale(vectors, 1 / 5)
  const vectors2 = scale(vectors, 2 / 5)
  const vectors3 = scale(vectors, 3 / 5)
  const vectors4 = scale(vectors, 4 / 5)
  draw(ctx, vectors1)
  draw(ctx, vectors2)
  draw(ctx, vectors3)
  draw(ctx, vectors4)
  //雷达线
  const keys = Object.keys(r_option.data)
  const datas = keys.map((k) => {
    const data = r_option.data[k]
    return [k, data[0] / data[1]]
  })

  const t_vectors = datas.map((data, i) => {
    return [data[0] as string, scale_vector(vectors[i], 11 / 12)]
  })
  //标题
  draw_title(ctx, t_vectors)

  const factors = datas.map((item) => {
    return item[1]
  }) as any as number[]
  const result = scale_factors(vectors, factors)
  //实际数据比列
  draw_data(ctx, result)
  return r_option
}
const container = $ref<HTMLElement>()
onMounted(() => {
  const data: RadarData = {
    "age": [3.4 , 5],
    "popular": [2.6 , 5],
    "qq": [4, 5],
    "xx": [4.8, 5],
    "nn": [3.9, 5],
    "ax": [4.8, 5],
    "cx": [4.8, 5],
  }
  const radar = createRadar({size: [600, 600], data}, container)
})

</script>