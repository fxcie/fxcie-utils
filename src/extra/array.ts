import { isArray, isFunction, isObject, isString, } from '../core/index.js'

export function unique(arr) {
	if (!isArray(arr)) throw new TypeError("Arrays only");
	return arr.filter((element, index) => arr.indexOf(element) == index);
}

export function merged() {
	const args = Array.prototype.slice.call(arguments);
	return args.reduce(
		(arr, next) => (!isArray(next) ? arr : arr.concat(next)),
		[]
	);
}

export function reindex(arr, field='index', offset=0){
  if(!isArray(arr)) return;
  for(let i in arr) arr[i][field]=Number(i) + Number(offset);
}

export function byField<RecordEntry extends Record<string,any>>(
	array: Array<RecordEntry>,
	field:  keyof RecordEntry,
):
	Record<string,RecordEntry>
{
  if(!isArray(array)) return {};
  return array.reduce(
    (byField, item):Record<string,RecordEntry>=>(
      byField[String(item[field])]=item,
      byField
    ), {}
  );
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

export function equalSets(as1: any, as2: any) {
	if (!isObject(as1)) return false;
	if (!isObject(as2)) return false;
	if (!(as1[Symbol.iterator] instanceof Function))
		return false;
	if (!(as2[Symbol.iterator] instanceof Function))
		return false;
	// @ts-ignore
	const set1 = unique([...as1]);
	// @ts-ignore
	const set2 = unique([...as2]);
	return set1.length === set2.length && set1.every((el) => set2.includes(el));
}

export const DEFSORTFN = (a,b)=>(a==b?0:a<b?-1:1);

export function sortBy(arr, key: string|Function = DEFSORTFN, order='ASC'){
  if(!isArray(arr)) return;
	if(!isString(key) && !isFunction(key)) return;
  return arr.sort((a,b)=>{
		let c=isString(key)? a[key]: key(a);
		let d=isString(key)? b[key]: key(b);
    return c==d?0:
    (String(order).toUpperCase()=='DESC'?
      (
        c>d?-1:1
      ):(
        c>d?1:-1
      )
    )
	});
}

export function sorted(obj, key: string|Function = DEFSORTFN, order = 'DESC'){
	if(isArray(obj)){
		sortBy([...obj], key, order);
	} else if (isObject(obj)){
		sortBy({...obj}, key, order);
	}
}

export function sort<T extends Object>(obj: T, key: string|Function = DEFSORTFN, order){
	if(isArray(obj)) return sortBy(obj, key, order);
	const arr = Object.entries(obj).map(([key,value])=>({key,value}));
	sortBy(arr, 'key', order);
	arr.map(({key,value})=>{
		delete obj[key];
		obj[key]=value;
	})
}

export function listField(array, field){
  if(!isArray(array)) return [];
  return array.map(item=>item[field]);
}

export function intersection(a,b){
	// @ts-ignore
  return [...new Set(a).intersection(new Set(b))];
}

export function uniqueBy(RA, key){
  return Object.values(byField(RA, key));
}
