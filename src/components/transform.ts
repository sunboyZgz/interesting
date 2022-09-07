import { VECTOR2 } from "./draw";
import { matrix_transpose, rowMultiMatrix } from "./matrix";

/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 19:29:14
 * @LastEditTime: 2022-09-07 23:01:37
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

function degreeToRadian(degree: number): number {
  return (degree / 180) * Math.PI;
}
export { scale, scale_vectors, rotate, rotate_vectors, degreeToRadian };
