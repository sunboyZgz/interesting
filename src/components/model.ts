/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-23 20:31:43
 * @LastEditTime: 2022-09-23 21:30:00
 */
import { New_Aspect, Vector3 } from "./new_transform";

export const square_model = (function () {
  const up_aspect = New_Aspect(
    Vector3(-100, 100, -100),
    Vector3(-100, 100, 100),
    Vector3(100, 100, 100),
    Vector3(100, 100, -100)
  );
  const down_aspect = New_Aspect(
    Vector3(-100, -100, -100),
    Vector3(-100, -100, 100),
    Vector3(100, -100, 100),
    Vector3(100, -100, -100)
  );
  return [up_aspect, down_aspect];
})();

export const rectangle_mode = (function () {
  const up_aspect = New_Aspect(
    Vector3(-50, 50, -125),
    Vector3(-50, 50, 125),
    Vector3(50, 50, 125),
    Vector3(50, 50, -125)
  );
  const down_aspect = New_Aspect(
    Vector3(-50, -50, -125),
    Vector3(-50, -50, 125),
    Vector3(50, -50, 125),
    Vector3(50, -50, -125)
  );
  return [up_aspect, down_aspect];
})();
