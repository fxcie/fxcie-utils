export function isArray<T = any>(arr: any): arr is T[] {
	return arr instanceof Array;
}