import {isString} from  './isString.js'
export function isNonEmptyString(str): str is string {
	return isString(str) && str.length !== 0;
}