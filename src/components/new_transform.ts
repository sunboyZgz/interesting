/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-16 08:26:52
 * @LastEditTime: 2022-09-17 23:00:40
 */
import { DrawContext, Pixel2D } from "./draw";
import { degreeToRadian } from "./transform";
import { matrix_transpose, rowMultiMatrix } from "./matrix";
type Vector3 = [number, number, number, number];
function Vector3(x: number, y: number, z: number, w = 1) {
  return [x, y, z, w] as Vector3;
}
type CameraCo = {
  origin: Vector3;
  up?: Vector3; //don't care now
  gaze?: Vector3; //don't care now
  x?: Vector3; //don't care now
  world?: World;
};
class Camera {
  //say that the camera is straightly face to the square and camera look at -z
  //assume that there is a curtain at the origin
  public origin: Vector3;
  public up: Vector3;
  public gaze: Vector3;
  public x: Vector3;
  public world: World;
  constructor(co: CameraCo) {
    this.origin = co.origin;
    this.up = co.up || Vector3(0, 1, 0);
    this.gaze = co.gaze || Vector3(0, 0, -1);
    this.x = co.x || Vector3(1, 0, 0);
    this.world = co.world || new OrthographicPrj(); //later, we will set default view a Perspective Projection
  }
}
interface Draw {
  draw(): void;
  rotate(degree: number): void;
}

interface World {
  draw(): void;
  rotate(): void;
}

class OrthographicPrj implements World {
  public body?: Draw[];
  constructor() {}
  public Add_body() {} //later, the draw context is added to body instance when call add_body()
  public draw() {
    const bodys = this.body || [];
    if (bodys.length) {
      for (let i = 0; i < bodys.length; i++) {
        bodys[i].draw();
      }
    }
  }
  public rotate(): void {}
}
type Aspect = Vector3[];
class Square implements Draw {
  aspects: Aspect[]; //can only pass 2 aspects
  d_ctx: DrawContext; //shouldn't be passed manually
  constructor(aspects: Aspect[], d_ctx: DrawContext) {
    this.aspects = aspects;
    this.d_ctx = d_ctx;
  }
  public draw(): void {
    // TODO
    const up_aspect = this.aspects[0].map((v) => throw_z(v));
    const bl_aspect = this.aspects[1].map((v) => throw_z(v));
    draw_aspect(up_aspect, this.d_ctx);
    draw_aspect(bl_aspect, this.d_ctx);
    connect_aspect(up_aspect, bl_aspect, this.d_ctx);
  }
  public rotate(degree: number) {
    const radian = degreeToRadian(degree);
    //the next matrix only rotate the vector by the y axis
    const matrix = matrix_transpose([
      [Math.cos(radian), 1, Math.sin(radian), 0],
      [1, 1, 1, 0],
      [-Math.sin(radian), 1, Math.cos(radian), 0],
      [0, 0, 0, 1],
    ]);
    const new_aspects = this.aspects.map((aspect) => {
      return aspect.map((v) => rowMultiMatrix(v, matrix) as Vector3);
    });
    this.aspects = new_aspects;
    return;
  }
}
function throw_z(v: Vector3) {
  return v.slice(0, 2) as Pixel2D;
}

function draw_aspect(aspect: Pixel2D[], d_context: DrawContext) {
  aspect.forEach((v, index) => {
    const next = (index + 1) % aspect.length;
    d_context.draw_line(v, aspect[next]);
  });
}

//only when the amounts of points constructing both aspects are equal
//can only pass two aspects
/**
 * @param conn_ids represent how the idx of aspect1 [v1, v2, v3] connect to aspect2 [q1, q2, q3]
 if conn_ids is [2,1,0], it will connect v1 => q3, v2 => q2, v3 => q1
 */
function connect_aspect(
  aspect1: Pixel2D[],
  aspect2: Pixel2D[],
  d_context: DrawContext,
  conn_ids?: number[]
) {
  conn_ids = conn_ids || aspect1.map((_, idx) => idx);
  conn_ids.forEach((idx2, idx1) => {
    d_context.draw_line(aspect1[idx1], aspect2[idx2]);
  });
}

//under general circumstances, we need a Class Aspects because of more flexiable expansion.
function New_Aspect(...vs: Vector3[]) {
  return [...vs] as Aspect;
}
export { Vector3, Square, OrthographicPrj, Camera, New_Aspect };
