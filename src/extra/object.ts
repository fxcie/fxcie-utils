export function flattenObject<T extends Object>(obj: T, separator: string = '.') {
	const toReturn: Record<string, any> = {};
	for (let i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == "object" && obj[i] !== null) {
			const flatObject = flattenObject(obj[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				toReturn[i + separator + x] = flatObject[x];
			}
		} else {
			toReturn[i] = obj[i];
		}
	}
	return toReturn;
}

export function diffObjects<T1 extends Record<string,any>, T2 extends Record<string,any>>(obj1: T1, obj2: T2){
  const keys1 = new Set(Object.keys(obj1));
  const keys2 = new Set(Object.keys(obj2));
	// @ts-ignore Typescript should accept this
  const deleted = [...keys1.difference(keys2)]
  .map(key=>({diff:'deleted', key, was: obj1[key], now: undefined}));
	// @ts-ignore Typescript should accept this
  const created = [...keys2.difference(keys1)]
  .map(key=>({diff:'created', key, was: undefined, now: obj2[key]}));
	// @ts-ignore Typescript should accept this
  const changed = [...keys1.intersection(keys2)]
  .filter(key=>obj1[key]!==obj2[key])
  .map(key=>({diff:'changed', key, was: obj1[key], now: obj2[key]}));
  return {deleted, created, changed};
}