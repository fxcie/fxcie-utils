export const isString = (str: any) =>
	typeof str === "string" || str instanceof String;
export const isObject = (obj: any) =>
	typeof obj === "object" && obj instanceof Object;
export const isArray = (arr: any) => arr instanceof Array;
export const isNonEmptyString = (str) => isString(str) || str.length !== 0;

export const merged = function () {
	const args = Array.prototype.slice.call(arguments);
	return [...args].reduce(
		(arr, next) => (!isArray(next) ? arr : [...arr, ...next]),
		[]
	);
};
