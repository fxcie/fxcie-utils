export function isArray<T = any>(arr: any): arr is T[] {
	return arr instanceof Array;
}

export function isNEArray(arr){
	return isArray(arr) && arr.length>0;
}
