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

export const cloneDeep = function (obj: any) {
	const values = new Set();
	if (obj == null) return null;
	return _cloneDeep(obj);

	function _cloneDeep(obj) {
		if (!isObject(obj)) return obj;
		if (isString(obj)) return obj.toString();
		if (isArray(obj)) return obj.map(_cloneDeep);
		return Object.entries(obj).reduce((all, [key, value]) => {
			if (isObject(value)) {
				if (values.has(value)) throw new Error("Cyclic object cloning");
				values.add(value);
				value = _cloneDeep(value);
			}
			all[key] = value;
			return all;
		}, {});
	}
};
