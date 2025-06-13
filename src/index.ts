export {
	isString, isNumber, isObject, isArray, 
	isFunction, isSet, noOp, isNonEmptyString, 
	isNEString, isNEArray, 
} from './base/index.js';
export {
	// from string
	substr, trimBack, escapeRegExp, randomString,
	ucase, lcase, fcase, digest, 	
	// from object
	cloneDeep, flattenObject, diffObjects, copyFields,
	ensureHasObject, ensureHasArray, sortObject, 
	//from json
	arrayToJson, objectToJson, jsonToArray, jsonToObject, 
	// from array
	unique, merged, reindex, byField,
	findRecord, removeRecords, sortBy, sorted, sort, 
	equalSets, DEFSORTFN, intersection, uniqueBy, 
	// from convert
	FMT, num, str, encodeHTMLEntities, decodeHTML, 
	// from maths
	clamp, numDiff,
	// from async
	sleep, asyncMap, asyncFilter,
} from './extra/index.js'




