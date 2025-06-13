export const isString = (str: any): str is String | string =>
	typeof str === "string" || str instanceof String;

export function isNEString(str){
  return isString(str) && str.length>0;
}