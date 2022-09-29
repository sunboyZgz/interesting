/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-16 08:26:52
 * @LastEditTime: 2022-09-29 19:43:08
 */
import { DrawContext, Pixel2D } from "./draw";
import { degreeToRadian } from "./transform";
import { matrix_transpose, rowMultiMatrix, getTranslateMatrix } from "./matrix";
import { Arr_isEqual } from "./common";
type Vector3 = [number, number, number, number];
function Vector3(x: number, y: number, z: number, w = 0) {
  return [x, y, z, w] as Vector3;
}
/*
type CameraCo = {
  origin: Vector3;
  up?: Vector3; //don't care now
  gaze?: Vector3; //don't care now
  x?: Vector3; //don't care now
  world?: World;
  aspect_rate?: number;
};
class Camera {
  //say that the camera is straightly face to the square and camera look at -z
  //assume that there is a curtain at the origin
  public origin: Vector3;
  public up: Vector3;
  public gaze: Vector3;
  public x: Vector3;
  public world: World;
  public aspect_rate: number;
  constructor(co: CameraCo) {
    this.origin = co.origin;
    this.up = co.up || Vector3(0, 1, 0);
    this.gaze = co.gaze || Vector3(0, 0, -1);
    this.x = co.x || Vector3(1, 0, 0);
    this.aspect_rate = co.aspect_rate || 1;
    this.world = co.world || new OrthographicPrj(this.aspect_rate); //later, we will set default view a Perspective Projection
  }
}
*/
interface Draw {
  draw(aspect?: number): void;
  rotate(degree: number, v?: Vector3): void;
  translate(v: Vector3): void;
}

interface World {
  draw(): void;
  rotate(degree: number, v?: Vector3): void;
}

//TODO: add aspects rate
class OrthographicPrj implements World {
  public bodys?: Draw[];
  public axis: Vector3;
  public aspect_rate: number;
  constructor(aspect_rate: number) {
    this.axis = Vector3(0, 1, 0);
    this.aspect_rate = aspect_rate;
  }
  public Add_body(body: Draw) {
    this.bodys ? {} : (this.bodys = []);
    this.bodys.push(body);
  } //later, the draw context is added to body instance when call add_body()
  public draw() {
    const bodys = this.bodys || [];
    if (bodys.length) {
      for (let i = 0; i < bodys.length; i++) {
        bodys[i].draw();
      }
    }
  }
  public rotate(degree: number, v?: Vector3): void {
    const bodys = this.bodys || [];
    if (bodys.length) {
      for (let i = 0; i < bodys.length; i++) {
        bodys[i].rotate(degree, v || this.axis);
      }
    }
  }
}
type Aspect = Vector3[];
class Square implements Draw {
  aspects: Aspect[]; //can only pass 2 aspects
  d_ctx: DrawContext; //shouldn't be passed manually
  origin_aspects: Aspect[];
  public axis: Vector3;
  start_angle: number;

  constructor(aspects: Aspect[], d_ctx: DrawContext) {
    this.aspects = aspects;
    this.origin_aspects = aspects.map((aspect) =>
      aspect.map((v) => v.slice())
    ) as Aspect[];
    this.d_ctx = d_ctx;
    this.axis = Vector3(0, 1, 0);
    this.start_angle = 0;
  }
  public draw(aspect?: number): void {
    aspect = aspect || 1;
    const up_aspect = this.aspects[0].map((v) => throw_z(v));
    const bl_aspect = this.aspects[1].map((v) => throw_z(v));
    draw_aspect(up_aspect, this.d_ctx);
    draw_aspect(bl_aspect, this.d_ctx);
    connect_aspect(up_aspect, bl_aspect, this.d_ctx);
  }
  //我认识旋转这块应该分成 世界旋转(视角旋转) 与 个体旋转
  public rotate(degree: number, v?: Vector3) {
    //the default matrix only rotate the vector by the y axis
    v = VectorToUnit(v || this.axis);
    if (!Arr_isEqual(this.axis, v)) {
      this.axis = v; //轴换了，但是degree没有变动，导致轴与degree量不对等
      this.start_angle = degree;
      this.origin_aspects = this.aspects;
    }
    const radian = degreeToRadian(degree - this.start_angle);

    const x = this.axis[0],
      y = this.axis[1],
      z = this.axis[2];
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
    const sub_x = (this.aspects[0][0][0] - this.aspects[0][2][0]) / 2;
    const sub_y = (this.aspects[0][0][1] - this.aspects[1][0][1]) / 2;
    const sub_z = (this.aspects[0][0][2] - this.aspects[0][1][2]) / 2;
    const t_to_origin = getTranslateMatrix(Vector3(-sub_x, -sub_y, -sub_z, 1));
    const origin_to_t = getTranslateMatrix(Vector3(sub_x, sub_y, sub_z, 1));
    const new_aspects = this.origin_aspects.map((aspect) => {
      return aspect.map(
        (v) => compose(v, t_to_origin, matrix, origin_to_t) as Vector3
      );
    });
    this.aspects = new_aspects;
    return;
  }

  public translate(v: Vector3): void {
    const matrix = getTranslateMatrix(v);
    const new_aspects = this.aspects.map((aspect) => {
      return aspect.map((v) => {
        v[3] = 1;
        return rowMultiMatrix(v, matrix) as Vector3;
      });
    });
    console.log(new_aspects);
    this.origin_aspects = new_aspects;
    this.aspects = new_aspects;
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

function compose(v: Vector3, ...matrix: number[][][]) {
  return matrix.reduce((pre, cur) => {
    return rowMultiMatrix(pre, cur) as Vector3;
  }, v);
}
export {
  Vector3,
  Square,
  OrthographicPrj,
  // Camera,
  New_Aspect,
};
