/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-16 08:26:52
 * @LastEditTime: 2022-09-16 09:07:41
 */
import { DrawContext } from "./draw";
type Vector3 = [number, number, number, number];
function Vector3(x: number, y: number, z: number, w = 1) {
  return [x, y, z, w] as Vector3;
}
type CameraCo = {
  origin: Vector3;
  up?: Vector3; //don't care now
  gaze?: Vector3; //don't care now
  x?: Vector3; //don't care now
};
class Camera {
  public origin: Vector3;
  public up: Vector3;
  public gaze: Vector3;
  public x: Vector3;
  constructor(co: CameraCo) {
    this.origin = co.origin;
    this.up = Vector3(0, 1, 0);
    this.gaze = Vector3(0, 0, -1);
    this.x = Vector3(1, 0, 0);
  }
}
interface Draw {
  draw(): void;
}
class OrthographicPrj {
  public body?: Draw[];
  constructor() {}
  public Add_body() {}
  public draw() {
    const bodys = this.body || [];
    if (bodys.length) {
      for (let i = 0; i < bodys.length; i++) {
        bodys[i].draw();
      }
    }
  }
}
type Aspect = Vector3[];
class Square implements Draw {
  aspects: Aspect[]; //can only pass 2 aspects
  d_ctx: DrawContext;
  constructor(aspects: Aspect[], d_ctx: DrawContext) {
    this.aspects = aspects;
    this.d_ctx = d_ctx;
  }
  public draw(): void {
    // TODO
    // const up_aspect = this.aspects[0];
    // const bl_aspect = this.aspects[1];
    // for (let i = 0; i < up_aspect.length; i++) {
    //   const next = (i + 1) % up_aspect.length;
    //   this.d_ctx.draw_line(up_aspect[i], up_aspect[next]);
    //   this.d_ctx.draw_line(bl_aspect[i], bl_aspect[next]);
    // }
  }
}
export { Vector3 };
