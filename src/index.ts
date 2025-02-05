export const isString = (str: any): str is String | string =>
	typeof str === "string" || str instanceof String;
export const isNumber = (num: any): num is number | Number =>
	(typeof num === "number" || num instanceof Number) && num === num;
export function isObject<T extends Object>(obj: any): obj is T {
	return obj === Object(obj);
}
export function isArray<T = any>(arr: any): arr is T[] {
	return arr instanceof Array;
}
export function isFunction<T extends Function>(func: any): func is T {
	return func instanceof Function;
}
export function isSet<T extends Set<any>>(set: any): set is T {
	return set instanceof Set;
}
export function isNonEmptyString(str): str is string {
	return isString(str) && str.length !== 0;
}
export function noOp() {}

export function merged() {
	const args = Array.prototype.slice.call(arguments);
	return args.reduce(
		(arr, next) => (!isArray(next) ? arr : arr.concat(next)),
		[]
	);
}

export function unique(arr) {
	if (!isArray(arr)) throw new TypeError("Arrays only");
	return arr.filter((element, index) => arr.indexOf(element) == index);
}

export function cloneDeep(obj: any) {
	const values: any[] = [];
	if (obj == null) return null;
	return _cloneDeep(obj);

	function _cloneDeep(obj) {
		if (!isObject(obj)) return obj;
		if (obj instanceof String) return new String(obj.toString());
		if (isArray(obj)) return obj.map(_cloneDeep);
		return Object.entries(obj).reduce((all, [key, value]) => {
			if (isObject(value)) {
				if (values.includes(value)) throw new Error("Cyclic object cloning");
				values.push(value);
				value = _cloneDeep(value);
			}
			all[key] = value;
			return all;
		}, {});
	}
}

export function equalSets(as1: any, as2: any) {
	if (!isObject(as1)) return false;
	if (!isObject(as2)) return false;
	if (!as1[Symbol.iterator] || !(as1[Symbol.iterator] instanceof Function))
		return false;
	if (!as2[Symbol.iterator] || !(as2[Symbol.iterator] instanceof Function))
		return false;
	// @ts-ignore
	const set1 = unique([...as1]);
	// @ts-ignore
	const set2 = unique([...as2]);
	return set1.length === set2.length && set1.every((el) => set2.includes(el));
}

export function findRecord<T extends Object, V = any>(
	arr: T[],
	field: string,
	value: V
) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][field] == value) return arr[i];
	}
	return false;
}

export function removeRecords(
	arr: any[],
	key: string,
	values: any,
	anyType?: boolean
) {
	if (!(arr instanceof Array)) return 0;
	var found = 0;
	if (!(values instanceof Array)) values = [values];
	for (var i = 0; i < arr.length; i++)
		if (
			(anyType && values.indexOf("" + arr[i][key]) != -1) ||
			(anyType && values.indexOf(0 + arr[i][key]) != -1) ||
			values.indexOf(arr[i][key]) != -1
		) {
			for (var j = i--; j < arr.length; j++) arr[j] = arr[j + 1];
			arr.length--;
			found++;
		}
	return found;
}

export function escapeRegExp(str) {
	return str.replace(/[[\]*+?{}.()^$|\\-]/g, "\\$&");
}

export function jsonToArray(jsonArray: string): any[] {
	var s = [];
	try {
		s = JSON.parse(jsonArray);
	} catch (e) {
		s = [];
	}
	return s;
}

export function arrayToJson(array: any[]): string {
	var s = "[]";
	if (!(array instanceof Array)) return s;
	try {
		s = JSON.stringify(array);
	} catch (e) {
		s = "[]";
	}
	return s;
}

export function jsonToObject(jsonObject: string): object {
	var s = {};
	try {
		s = JSON.parse(jsonObject);
	} catch (e) {
		s = {};
	}
	return s;
}

export function objectToJson(
	object: Record<string, any>,
	pretty: boolean = false
): string {
	var s = "{}";
	if (!(object instanceof Object)) return s;
	try {
		s = JSON.stringify(
			object,
			pretty ? null : undefined,
			pretty ? 2 : undefined
		);
	} catch (e) {
		s = "{}";
	}
	return s;
}

export function randomString(len: number = 8, charSet?: string) {
	charSet =
		charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	len = len || 8;
	var randomString = "";
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
}
