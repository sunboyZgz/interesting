/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-05 08:59:17
 * @LastEditTime: 2022-09-06 17:29:32
 */

//矩阵转置
function matrix_transpose(matrix: number[][]) {
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
  const n_matrix = new Array(row1).fill(new Array(col2).fill(0));
  for (let i = 0; i < row1; i++) {
    for (let j = 0; j < col2; j++) {}
  }
  return n_matrix;
}
export { matrix_transpose };
