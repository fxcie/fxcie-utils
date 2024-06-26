const utils = require('../lib');

test('has isString function', () => {
	expect(utils.isString instanceof Function).toBe(true);
})
test('has isObject function', () => {
	expect(utils.isObject instanceof Function).toBe(true);
})
test('has isArray function', () => {
	expect(utils.isArray instanceof Function).toBe(true);
})
test('has isSet function', () => {
	expect(utils.isSet instanceof Function).toBe(true);
})
test('has isNonEmptyString function', () => {
	expect(utils.isNonEmptyString instanceof Function).toBe(true);
})
test('has merged function', () => {
	expect(utils.merged instanceof Function).toBe(true);
})

test('isString function does not consider null to be a string', () => {
	expect(utils.isString(null)).toBe(false);
})
test('isObject function does not consider null to be an object', () => {
	expect(utils.isObject(null)).toBe(false);
})

test('isArray function does not consider object to be an array', () => {
	expect(utils.isArray({})).toBe(false);
})

test('isArray function does not consider String object instance to be an array', () => {
	expect(utils.isArray(new String('test'))).toBe(false);
})

test('isSet function does not consider String object instance to be an array', () => {
	const testSet = new Set(['setItem1', 'setItem2'])
	expect(utils.isSet(testSet)).toBe(true);
	expect(utils.isSet(new String('test'))).toBe(false);
	expect(utils.isSet(new Array('test'))).toBe(false);
	expect(utils.isSet(new Array('test', 'tests'))).toBe(false);
	expect(utils.isSet([])).toBe(false);
	expect(utils.isSet([...testSet])).toBe(false);
})

test('isNonEmptyString function does not consider empty array to be a string', () => {
	expect(utils.isNonEmptyString([])).toBe(false);
})
test('isNonEmptyString function does not consider array to be a string', () => {
	expect(utils.isNonEmptyString(['a', 'b', 'c'])).toBe(false);
})


test('merged returns different array object even if only single array passed to it', () => {
	const testArray = ['Sample'];
	expect(utils.merged(testArray) === testArray).toBe(false);
})

test('findRecord return falsy value if not found', () => {
	expect(!!utils.findRecord([], 'field', 'value')).toBe(false);
})


