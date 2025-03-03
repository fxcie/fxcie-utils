export function isFunction<T extends Function>(func: any): func is T {
	return func instanceof Function;
}