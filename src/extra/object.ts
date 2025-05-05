import { isObject, isArray } from "../core/index.js";
import { sortBy } from "./array.js";

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

export function copyFields(source, target, fields){
  fields.map(field=>{
    target[field]=source[field];
  })
}

export function ensureHasObject(obj, attrStr){
  if(!(obj instanceof Object)) return {[attrStr]:{}};
  if(!(obj[attrStr] instanceof Object)) obj[attrStr] = {};
  return obj;
}

export function ensureHasArray(obj, attrStr){
  if(!(obj instanceof Object)) return {[attrStr]:[]};
  if(!(obj[attrStr] instanceof Array)) obj[attrStr] = [];
  return obj;
}

export function sortObject(obj){
  const arr = Object.entries(obj).map(([key,value])=>({key,value}));
  sortBy(arr, 'key');
  arr.map(({key,value})=>{
    delete obj[key];
    obj[key]=value;
  })
}

