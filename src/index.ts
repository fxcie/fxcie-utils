export const isString = (str: any) =>
	typeof str === "string" || str instanceof String;
export const isObject = (obj: any) =>
	typeof obj === "object" && obj instanceof Object;
export const isArray = (arr: any) => arr instanceof Array;
export const isSet = (set: any) => set instanceof Set;
export const isNonEmptyString = (str) => isString(str) || str.length !== 0;

export function merged() {
	const args = Array.prototype.slice.call(arguments);
	return [...args].reduce(
		(arr, next) => (!isArray(next) ? arr : [...arr, ...next]),
		[]
	);
}

export function cloneDeep(obj: any) {
	const values = new Set();
	if (obj == null) return null;
	return _cloneDeep(obj);

	function _cloneDeep(obj) {
		if (!isObject(obj)) return obj;
		if (obj instanceof String) return new String(obj.toString());
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
}

export function equalSets(as1, as2) {
	const set1 = isSet(as1) ? as1 : new Set([...as1]);
	const set2 = isSet(as2) ? as2 : new Set([...as2]);
	return set1.size === set2.size && [...set1].every(set2.has);
}
