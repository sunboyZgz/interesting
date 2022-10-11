/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-10-11 21:48:02
 * @LastEditTime: 2022-10-11 22:38:35
 */
export type floatTuple = [integer: string, fraction: string];
function fractionAndInteger(value: string): floatTuple {
  if (!value) {
    console.warn("no value be passed");
    return ["", ""];
  }
  return value.split(".").slice(0, 2) as floatTuple;
}

/**
 * @param flag indicate that it is a Positive  if flag == true, or it is a Negative
 */
function floatFormat(flag: boolean, float: floatTuple): number[] {
  const result = new Array(32).fill(0); //a 32 bits formats
  if (!flag) {
    result[0] = 1;
  }
  let [is, fs] = float;
  if (is == "0") {
    is = "1";
    // fs = fs.
  }
  return result;
}
export { fractionAndInteger, floatFormat };
