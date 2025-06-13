export function isObject<T extends Object>(obj: any): obj is T {
	return obj === Object(obj);
}
