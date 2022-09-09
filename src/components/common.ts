/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 18:42:11
 * @LastEditTime: 2022-09-08 21:21:58
 */
import { multiFactor, MirrorFactor } from "./transform";

function inputToInteger(input: HTMLInputElement): number {
  return parseFloat(input.value);
}
function inputToMutiFactor(input: HTMLInputElement): multiFactor {
  const value = input.value;
  const factors = value.split(",").slice();
  if (factors.length > 3) {
    console.warn("only use the first and second factor");
  }
  if (factors.length == 1) {
    factors[1] = factors[0];
  }
  return factors.map((item) => parseFloat(item)) as multiFactor;
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
export { inputToInteger, inputToMutiFactor, inputToMirrorFactor };
