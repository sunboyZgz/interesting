/*
 * @Author: sunboy
 * @LastEditors: sunboy
 * @Date: 2022-10-11 21:48:02
 * @LastEditTime: 2022-10-12 10:23:28
 */

// const DOUBLE_E_BIASED = 2 ** 10 - 1;
const FLOAT_E_BIASED = 2 ** 7 - 1;

/**
 * @description there is a diverse expression between float and integer,
 * the fundamental reason is the difference between signifying expression and complement expression
 * @param flag indicate that it is a Positive  if flag == true, or it is a Negative
 */
function floatFormat(float: string, lord: "f32" | "f64" = "f32"): number[] {
  const result = new Array(32).fill(0); //a 32 bits formats
  let num_float = parseFloat(float);
  if (num_float == 0) {
    return result;
  }
  if (num_float < 0) {
    result[0] = 1;
  }
  if (float.indexOf(".") == -1) {
    float = float + ".0";
  }
  //during operating the string, we divide the points and integer into two different groups
  //by this way, we could get a precision result without the binary multiply and divide
  const integer =
    parseInt(
      num_float < 0
        ? float.slice(1, float.indexOf("."))
        : float.slice(0, float.indexOf("."))
    ) || 0;
  const point = parseFloat("0" + float.slice(float.indexOf(".")));
  let integer_bits = integer.toString(2).split("");
  let point_bits = point.toString(2).slice(2).split("");
  let po = 0;
  if (integer != 0) {
    po += integer_bits.length - 1;
    integer_bits = integer_bits.slice(1);
  } else {
    for (let i = 0; i < point_bits.length; i++) {
      po--;
      if (parseInt(point_bits[i]) == 1) {
        point_bits = point_bits.slice(i + 1);
        break;
      }
    }
  }
  let tail_bits: string[] = (
    integer == 0 ? point_bits : integer_bits.concat(point_bits)
  ).slice(0, 23);
  let exponent = po + FLOAT_E_BIASED;
  console.log("integer_bits: ", integer_bits);
  console.log("tail_bits: ", tail_bits);
  console.log("float: ", float);
  console.log("po: ", po);
  console.log("exponent: ", exponent);
  const exponent_section = exponent.toString(2).split("");
  console.log("exponent_section: ", exponent_section);
  fill_float(
    result,
    exponent_section,
    9 - exponent_section.length,
    exponent_section.length
  );
  fill_float(result, tail_bits, 9, tail_bits.length);
  return result;
}

function fill_float(
  target: string[],
  source: string[],
  start: number,
  n: number
) {
  for (let i = start, j = 0; i < start + n; i++, j++) {
    target[i] = source[j];
  }
}
export { floatFormat };
