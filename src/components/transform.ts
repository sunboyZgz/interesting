import { VECTOR2 } from "./draw";
import { matrix_multi, matrix_transpose, rowMultiMatrix } from "./matrix";

/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 19:29:14
 * @LastEditTime: 2022-09-09 08:24:10
 */
function get2DScaleMatrix(factor: multiFactor) {
  return [
    [factor[0], 0],
    [0, factor[1]],
  ];
}
function scale(factor: multiFactor, vector: VECTOR2) {
  let matrix: number[][];
  if (vector.length == 2) {
    matrix = matrix_transpose(get2DScaleMatrix(factor));
  } else {
    matrix = [];
    console.error("don't support matrix 3 x 3 now");
  }
  return rowMultiMatrix(vector, matrix);
}

function scale_vectors(factor: multiFactor, vectors: VECTOR2[]) {
  return vectors.map((item) => scale(factor, item)) as number[][];
}

function get2DRotateMatrix(radian: number) {
  return [
    [Math.cos(radian), Math.sin(radian)],
    [-Math.sin(radian), Math.cos(radian)],
  ];
}
function rotate(factor: number, vector: VECTOR2) {
  let matrix: number[][];
  factor = degreeToRadian(factor);
  if (vector.length == 2) {
    matrix = matrix_transpose(get2DRotateMatrix(factor));
  } else {
    matrix = [];
    console.error("don't support matrix 3 x 3");
  }
  return rowMultiMatrix(vector, matrix);
}

function rotate_vectors(factor: number, vectors: VECTOR2[]) {
  return vectors.map((item) => rotate(factor, item)) as number[][];
}
export type multiFactor = [horizon: number, vertical: number];

function get2DShearHorizon(horizon: number) {
  return [
    [1, 0],
    [Math.sin(degreeToRadian(horizon)), 1],
  ];
}

function get2DShearVectical(vertical: number) {
  return [
    [1, Math.sin(degreeToRadian(vertical))],
    [0, 1],
  ];
}
function shear(factor: multiFactor, vector: VECTOR2) {
  //only support vector2
  //not a typecal shear transform, only use radian for transforming
  const [horizon, vertical] = factor;
  return shearVectical(vertical, shearHorizon(horizon, vector));
}

function shearHorizon(horizon: number, vector: VECTOR2) {
  const matrix = matrix_transpose(get2DShearHorizon(horizon));
  return rowMultiMatrix(vector, matrix) as VECTOR2;
}

function shearVectical(vertical: number, vector: VECTOR2) {
  const matrix = matrix_transpose(get2DShearVectical(vertical));
  return rowMultiMatrix(vector, matrix) as VECTOR2;
}

function shear_vectors(factor: multiFactor, vectors: VECTOR2[]) {
  return vectors.map((item) => shear(factor, item)) as number[][];
}

export type MirrorFactor = 1 | -1 | void;
const mirror2DX = [
  [1, 0],
  [0, -1],
];
const mirror2DY = [
  [-1, 0],
  [0, 1],
];
function mirror(factor: MirrorFactor, vector: VECTOR2) {
  let matrix: number[][];
  if (vector.length == 2) {
    if (factor == 1) {
      //x axis 得到镜像
      matrix = matrix_transpose(mirror2DX);
    } else if (factor == -1) {
      //y axis 得到镜像
      matrix = matrix_transpose(mirror2DY);
    } else {
      matrix = [];
      console.error("don't get a available factor");
    }
  } else {
    matrix = [];
    console.error("don't support matrix 3 x 3");
  }
  return rowMultiMatrix(vector, matrix);
}

function mirror_vectors(factor: MirrorFactor, vectors: VECTOR2[]) {
  return vectors.map((item) => mirror(factor, item)) as number[][];
}

function degreeToRadian(degree: number): number {
  return (degree / 180) * Math.PI;
}

function compose(matrixs: number[][][]) {
  return matrixs.reduce(
    (pre, cur) => {
      // let last_matrix = typeof pre == "function" ? pre() : pre;
      return matrix_multi(pre, cur) as number[][];
    },
    [
      [1, 0],
      [0, 1],
    ]
  );
}

/*
//note: all of vector and matrix passed through homogeneous function
function affine(
  vector: number[],
  matrix: number[][] | ((...args: any[]) => number[][]),
  factors?: number[]
) {
  //this factor maybe a translation (x, y , 1)
  if (factors) {
    matrix.push(factors);
  } else {
    matrix.push([0, 0, 1]);
  }
  return rowMultiMatrix(vector, matrix_transpose(matrix));
}
*/
function homogeneous_matrix(matrix: number[][]) {
  return matrix.map((item) => {
    item.push(1);
    return item;
  });
}

function homogeneous_point(pointer: number[]) {
  return pointer.push(1), pointer;
}

function homogeneous_vector(vector: number[]) {
  return vector.push(0), vector;
}
//actually, translation is not translate vector but translate the point,
//however you translate a vector, it's the same expression between before and after.
function affine_translate(factor: multiFactor, vector: VECTOR2) {
  const v = homogeneous_point(vector);
  const m = homogeneous_matrix([
    [1, 0],
    [0, 1],
  ]);
  m.push([...factor, 1]);
  return rowMultiMatrix(v, matrix_transpose(m));
}

function affine_translate_vs(factor: multiFactor, vectors: VECTOR2[]) {
  return vectors
    .map((v) => affine_translate(factor, v as VECTOR2))
    .map((v) => v?.slice(0, v.length - 1)) as number[][];
}
export {
  scale,
  scale_vectors,
  rotate,
  rotate_vectors,
  degreeToRadian,
  shear_vectors,
  shear,
  mirror,
  mirror_vectors,
  compose,
  affine_translate,
  affine_translate_vs,
};
