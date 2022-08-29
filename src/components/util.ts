/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:47:00
 * @LastEditTime: 2022-08-29 22:42:59
 */
// import {ReactiveVariable} from 'vue'

type Placement = "center" | "left"; //such right top bottom....

type Point = {
  x: number;
  y: number;
};

export type VECTOR2 = [number, number];

class DrawContext {
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  constructor(container: HTMLCanvasElement) {
    console.log(container.style);
    const width = container.clientWidth;
    const height = container.clientWidth;
    container.width = width;
    container.height = height;
    this.el = container;
    this.ctx = container.getContext("2d")!;
  }

  translate_origin(placement: Placement): void;
  translate_origin(placement: Point): void;
  translate_origin(placement: any) {
    if (typeof placement === "string") {
      placement = str_to_p(placement as Placement, this);
      translate_origin_inner(placement, this.ctx);
    } else {
      translate_origin_inner(placement, this.ctx);
    }
  }

  draw_point(v: VECTOR2) {
    console.log(v);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.arc(v[0], v[1], 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw_line(v1: VECTOR2, v2: VECTOR2) {
    this.ctx.beginPath();
    this.ctx.moveTo(v1[0], v1[1]);
    this.ctx.lineTo(v2[0], v2[1]);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

function Vector2(x: number, y: number) {
  return [x, y] as VECTOR2;
}

function str_to_p(p: Placement, ctx: DrawContext): Point {
  const width = ctx.el.width;
  const height = ctx.el.height;
  console.log(width);
  console.log(height);
  console.log(ctx.el.clientWidth);
  console.log(ctx.el.clientHeight);
  switch (p) {
    case "center":
      return { x: width / 2, y: height / 2 };
    default:
      return { x: 0, y: 0 };
  }
}

function translate_origin_inner(p: Point, ctx: CanvasRenderingContext2D) {
  ctx.translate(p.x, p.y);
}

export { DrawContext, Vector2 };
