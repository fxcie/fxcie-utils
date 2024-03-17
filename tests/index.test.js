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

test('isNonEmptyString function does not consider empty array to be a string', () => {
	expect(utils.isNonEmptyString([])).toBe(false);
})

test('merged returns different array object even if only single array passed to it', () => {
	const testArray = ['Sample'];
	expect(utils.merged(testArray) === testArray).toBe(false);
})

