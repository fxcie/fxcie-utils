export const isString = (str: any): str is string =>
	typeof str === "string" || str instanceof String;
export const isNumber = (num: any): num is number =>
	(typeof num === "number" || num instanceof Number) && num === num;
export const isObject = (obj: any) =>
	typeof obj === "object" && obj instanceof Object;
export const isArray = (arr: any) => arr instanceof Array;
export const isSet = (set: any) => set instanceof Set;
export const isNonEmptyString = (str) => isString(str) && str.length !== 0;

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

export function equalSets(as1, as2) {
	if (!isObject(as1) || !isObject(as2)) return false;
	if (!as1[Symbol.iterator] || !as2[Symbol.iterator]) return false;
	const set1 = unique([...as1]);
	const set2 = unique([...as2]);
	return set1.length === set2.length && set1.every((el) => set2.includes(el));
}

export function findRecord(arr: [], field: string, value: any) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][field] == value) return arr[i];
	}
	return false;
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
