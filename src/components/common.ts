/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 18:42:11
 * @LastEditTime: 2022-09-08 14:44:39
 */
import { ShearFactor, MirrorFactor } from "./transform";

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

function inputToMirrorFactor(input: HTMLInputElement): MirrorFactor {
  //get mirror opposite the x or y axis
  const value = input.value.trim();

  return value == "x"
    ? 1
    : value == "y"
    ? -1
    : console.error("error input factor on mirror transform");
}
export { inputToInteger, inputToShearFactor, inputToMirrorFactor };
