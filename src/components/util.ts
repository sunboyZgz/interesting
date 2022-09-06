/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-08-29 16:47:00
 * @LastEditTime: 2022-09-05 08:58:30
 */
// import {ReactiveVariable} from 'vue'

type Placement = "center" | "left"; //such right top bottom....

type Point = {
  x: number;
  y: number;
};

export type VECTOR2 = [number, number];

type VECTOR3 = [number, number, number];

// type Polygon = VECTOR3[];

class DrawContext {
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public degree_y: number; //默认的y轴与x轴在显示时的夹角度数
  constructor(container: HTMLCanvasElement) {
    const width = container.clientWidth;
    const height = container.clientWidth;
    container.width = width;
    container.height = height;
    this.el = container;
    this.ctx = container.getContext("2d")!;
    this.width = width;
    this.height = height;
    this.degree_y = 0;
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

  draw_x() {
    this.draw_line(Vector2(-this.width / 2, 0), Vector2(this.width / 2, 0));
  }

  draw_z() {
    this.draw_line(Vector2(0, -this.height / 2), Vector2(0, this.height / 2));
  }

  draw_y(degree?: number) {
    const angle =
      (degree && (this.degree_y = -degree) && this.degree_y) || this.degree_y;
    let x: number;
    let y: number;
    if (isClose_x(angle)) {
      x = this.width / 2;
      y = (this.width / 2) * Math.tan((angle / 180) * Math.PI);
    } else {
      y = this.height / 2;
      x = this.height / 2 / Math.tan((angle / 180) * Math.PI);
    }
    this.draw_line(Vector2(-x, -y), Vector2(x, y));
  }

  // draw_cuboid(...polygons: Polygon[]) {
  //   if (polygons.length != 2) {
  //     console.error("we only need 2 polygons");
  //     return
  //   }
  // }
  // draw_diy(fn: (ctx: this) => void) {
  //   fn(this);
  // }
}

function degree_sub(angle: number, target: number) {
  angle = angle % 360;
  return Math.abs(Math.abs(angle) - target);
}

function isClose_x(angle: number) {
  return degree_sub(angle, 0) <= 45 || degree_sub(angle, 180) <= 45;
}

function Vector2(x: number, y: number) {
  return [x, y] as VECTOR2;
}

function Vector3(x: number, y: number, z: number) {
  return [x, y, z] as VECTOR3;
}

function str_to_p(p: Placement, ctx: DrawContext): Point {
  const width = ctx.el.width;
  const height = ctx.el.height;
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



export { DrawContext, Vector2, Vector3 };
