/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 18:42:11
 * @LastEditTime: 2022-09-08 14:12:06
 */
import { ShearFactor } from "./transform";

function inputToInteger(input: HTMLInputElement): number {
  return parseFloat(input.value);
}
function inputToShearFactor(input: HTMLInputElement): ShearFactor {
  const value = input.value;
  const factors = value.split(",").slice();
  if (factors.length > 2) {
    console.warn("only use the first and second factor");
  }
  if (factors.length == 1) {
    factors[1] = factors[0];
  }
  return factors.map((item) => parseFloat(item)) as ShearFactor;
}

export { inputToInteger, inputToShearFactor };
