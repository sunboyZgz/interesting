/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-09-07 18:42:11
 * @LastEditTime: 2022-09-22 16:34:29
 */
import { multiFactor, MirrorFactor } from "./transform";
import type { Vector3 } from "./new_transform";
import { Vector3 as V3 } from "./new_transform";
function inputToInteger(input: HTMLInputElement): number {
  return parseFloat(input.value);
}
function inputToMutiFactor(input: HTMLInputElement): multiFactor {
  const value = input.value;
  const factors = value.split(",").slice();
  if (factors.length > 2) {
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

function inputToVector3(input: HTMLInputElement) {
  const value = input.value;
  const factors = value.split(",").slice();
  if (factors.length > 4) {
    console.error("can only put 4 factors");
    return;
  }
  const [x, y, z, w] = factors.map((item) => parseFloat(item));
  if (factors.length == 4 || factors.length == 3) {
    return V3(x, y, z, w) as Vector3;
  } else {
    console.error("miss too much factors");
    return;
  }
}

function Arr_isEqual(arr1: boolean[], arr2: boolean[]): boolean;
function Arr_isEqual(arr1: string[], arr2: string[]): boolean;
function Arr_isEqual(arr1: number[], arr2: number[]): boolean;
function Arr_isEqual(arr1: any[], arr2: any[]): boolean {
  const l1 = arr1.length,
    l2 = arr2.length;
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    const max_len = Math.max(l1, l2);
    for (let i = 0; i < max_len; i++) {
      const i1 = arr1[i],
        i2 = arr2[i];
      if (i1 === undefined || i2 === undefined) {
        return false;
      } else if (i1 !== i2) {
        return false;
      }
    }
  }
  return true;
}
export {
  inputToInteger,
  inputToMutiFactor,
  inputToMirrorFactor,
  inputToVector3,
  Arr_isEqual,
};
