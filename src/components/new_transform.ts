/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-16 08:26:52
 * @LastEditTime: 2022-09-22 12:45:16
 */
import { DrawContext, Pixel2D } from "./draw";
import { degreeToRadian } from "./transform";
import { matrix_transpose, rowMultiMatrix } from "./matrix";
import { Arr_isEqual } from "./common";
type Vector3 = [number, number, number, number];
function Vector3(x: number, y: number, z: number, w = 0) {
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
  origin_aspects: Aspect[];
  axis: Vector3;
  // rotate_degree: number;
  constructor(aspects: Aspect[], d_ctx: DrawContext) {
    this.aspects = aspects;
    this.origin_aspects = aspects.map((aspect) =>
      aspect.map((v) => v.slice())
    ) as Aspect[];
    this.d_ctx = d_ctx;
    this.axis = Vector3(0, 1, 0);
    // this.rotate_degree = 0;
  }
  public draw(): void {
    const up_aspect = this.aspects[0].map((v) => throw_z(v));
    const bl_aspect = this.aspects[1].map((v) => throw_z(v));
    draw_aspect(up_aspect, this.d_ctx);
    draw_aspect(bl_aspect, this.d_ctx);
    connect_aspect(up_aspect, bl_aspect, this.d_ctx);
  }
  public rotate(degree: number, v?: Vector3) {
    const radian = degreeToRadian(degree);
    //the default matrix only rotate the vector by the y axis
    v = VectorToUnit(v || this.axis);
    if (!Arr_isEqual(this.axis, v)) {
      this.axis = v;
      this.origin_aspects = this.aspects;
      // this.rotate_degree
      console.log("change");
    }
    const x = v[0],
      y = v[1],
      z = v[2];
    console.log("x: ", v);
    const matrix = matrix_transpose([
      [
        x ** 2 * (1 - Math.cos(radian)) + Math.cos(radian),
        x * y * (1 - Math.cos(radian)) + z * Math.sin(radian),
        x * z * (1 - Math.cos(radian) - y * Math.sin(radian)),
        0,
      ],
      [
        x * y * (1 - Math.cos(radian)) - z * Math.sin(radian),
        y ** 2 * (1 - Math.cos(radian)) + Math.cos(radian),
        y * z * (1 - Math.cos(radian) + x * Math.sin(radian)),
        0,
      ],
      [
        x * z * (1 - Math.cos(radian)) + y * Math.sin(radian),
        z * y * (1 - Math.cos(radian)) - x * Math.sin(radian),
        z ** 2 * (1 - Math.cos(radian)) + Math.cos(radian),
        0,
      ],
      [0, 0, 0, 1],
    ]);
    // const matrix =
    //   transpose ||
    //   matrix_transpose([
    //     [Math.cos(radian), 0, Math.sin(radian), 0],
    //     [0, 1, 0, 0],
    //     [-Math.sin(radian), 0, Math.cos(radian), 0],
    //     [0, 0, 0, 1],
    //   ]);
    // console.log(matrix);
    const new_aspects = this.origin_aspects.map((aspect) => {
      return aspect.map((v) => rowMultiMatrix(v, matrix) as Vector3);
    });
    console.log(new_aspects);
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

function VectorToUnit(v: Vector3) {
  //vector3 to unit
  const len = Math.sqrt(
    v.reduce((total, coordinate) => total + coordinate ** 2, 0)
  );
  return v.map((v) => v / len) as Vector3;
}
export { Vector3, Square, OrthographicPrj, Camera, New_Aspect };
