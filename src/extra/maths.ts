import { isNumber } from "../core/isNumber";
import { num } from "./convert";

/**
 * @description Returns a min, max or value.
 * 
 * @param {number} min 
 * @param {number} value 
 * @param {number} max 
 * @returns
 */
export function clamp(min, value, max){
  return Math.max(min,
    Math.min(max,
      num(value)
    )
  );
}

export function numDiff(a, b, dp){
  // a = Math.abs(a);
  // b = Math.abs(b);
  const diff = Math.abs(num(a)-num(b));
  if(isNumber(dp)){
    dp = Math.round(dp);
    return Number(diff.toFixed(dp));
  } else return diff;
}
