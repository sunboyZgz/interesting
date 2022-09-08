import { VECTOR2 } from "./draw";
import { matrix_transpose, rowMultiMatrix } from "./matrix";

/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 19:29:14
 * @LastEditTime: 2022-09-08 14:18:02
 */
function scale(factor: number, vector: VECTOR2) {
  let matrix: number[][];
  if (vector.length == 2) {
    matrix = [
      [factor, 0],
      [0, factor],
    ];
  } else {
    matrix = [
      [factor, 0, 0],
      [0, factor, 0],
      [0, 0, factor],
    ];
  }
  return rowMultiMatrix(vector, matrix);
}

function scale_vectors(factor: number, vectors: VECTOR2[]) {
  return vectors.map((item) => scale(factor, item)) as number[][];
}

function rotate(factor: number, vector: VECTOR2) {
  let matrix: number[][];
  factor = degreeToRadian(factor);
  if (vector.length == 2) {
    matrix = matrix_transpose([
      [Math.cos(factor), Math.sin(factor)],
      [-Math.sin(factor), Math.cos(factor)],
    ]);
  } else {
    matrix = [];
    console.error("don't support matrix 3 x 3");
  }
  return rowMultiMatrix(vector, matrix);
}

function rotate_vectors(factor: number, vectors: VECTOR2[]) {
  return vectors.map((item) => rotate(factor, item)) as number[][];
}
export type ShearFactor = [horizon: number, vertical: number];

function shear(factor: ShearFactor, vector: VECTOR2) {
  //only support vector2
  //not a typecal shear transform, only use radian for transforming
  const [horizon, vertical] = factor;
  return shearVectical(vertical, shearHorizon(horizon, vector));
}

function shearHorizon(horizon: number, vector: VECTOR2) {
  const matrix = matrix_transpose([
    [1, 0],
    [Math.sin(degreeToRadian(horizon)), 1],
  ]);
  return rowMultiMatrix(vector, matrix) as VECTOR2;
}

function shearVectical(vertical: number, vector: VECTOR2) {
  const matrix = matrix_transpose([
    [1, Math.sin(degreeToRadian(vertical))],
    [0, 1],
  ]);
  return rowMultiMatrix(vector, matrix) as VECTOR2;
}
function shear_vectors(factor: ShearFactor, vectors: VECTOR2[]) {
  return vectors.map((item) => shear(factor, item)) as number[][];
}

function degreeToRadian(degree: number): number {
  return (degree / 180) * Math.PI;
}
export {
  scale,
  scale_vectors,
  rotate,
  rotate_vectors,
  degreeToRadian,
  shear_vectors,
  shear,
};
