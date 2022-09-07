/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-05 08:59:17
 * @LastEditTime: 2022-09-07 10:03:51
 */

//矩阵转置
function matrix_transpose(matrix: number[][]) {
  //we also need a in-place algorithm
  const row = matrix.length;
  if (row < 1) {
    return [];
  }
  const col = matrix[0].length;
  const result = new Array(col);
  for (let j = 0; j < col; j++) {
    const new_row = [];
    for (let i = 0; i < row; i++) {
      new_row.push(matrix[i][j]);
    }
    result[j] = new_row;
  }
  return result;
}

function matrix_multi(m1: number[][], m2: number[][]) {
  if (m1.length == 0 || m2.length == 0) {
    console.error("m1 m2 need at least one row");
    return;
  }
  const row1 = m1.length;
  const col1 = m1[0].length;
  const row2 = m2.length;
  const col2 = m2[0].length;
  if (col1 != row2) {
    console.error("the column of m1 must equal with the row of m2");
    return;
  }
  let n_matrix = new Array(row1).fill(0);
  n_matrix = n_matrix.map((_) => {
    const result = new Array(col2).fill(0);
    return result;
  });
  const m2_new = matrix_transpose(m2);
  for (let i = 0; i < row1; i++) {
    for (let j = 0; j < col2; j++) {
      console.log(i, j);
      n_matrix[i][j] = rMultibyc(m1[i], m2_new[j]);
    }
  }
  return n_matrix;
}

function rMultibyc(v1: number[], v2: number[]) {
  const l_v1 = v1.length;
  let result = 0;
  for (let i = 0; i < l_v1; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}

function rowMultiMatrix(vector: number[], m2: number[][]) {
  const v_l = vector.length;
  if (m2.length == 0 || m2.length == 0) {
    console.error("the column of vector must be the same as the row of");
    return;
  }
  const result = new Array(v_l);
  // const new_m2 = matrix_transpose(m2);

  for (let i = 0; i < v_l; i++) {
    result[i] = m2[i].reduce(
      (pre: number, cur: number) => pre + vector[i] * cur,
      0
    );
  }
  return result;
}
export { matrix_transpose, matrix_multi, rowMultiMatrix };
