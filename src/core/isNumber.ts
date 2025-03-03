export const isNumber = (num: any): num is number | Number =>
	(typeof num === "number" || num instanceof Number) && num === num;