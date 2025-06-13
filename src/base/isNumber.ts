export function isNumber(num: any): num is number{
	return (typeof num === "number" || num instanceof Number) && num === num;
}	