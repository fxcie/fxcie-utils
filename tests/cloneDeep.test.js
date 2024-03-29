const utils = require('../lib')

test('has cloneDeep function', () => {
	expect(utils.cloneDeep instanceof Function).toBe(true);
})

test('cloneDeep returns null if no value supplied', () => {
	expect(utils.cloneDeep() === null).toBe(true);
})
test('cloneDeep returns null if null supplied', () => {
	expect(utils.cloneDeep(null) === null).toBe(true);
})
test('cloneDeep returns value if a non-object value is supplied', () => {
	expect(utils.cloneDeep('test') === 'test').toBe(true);
	expect(utils.cloneDeep(5) === 5).toBe(true);
})
test('cloneDeep returns new string object if a string object is supplied', () => {
	const testValue = 'test';
	const testString = new String(testValue);
	expect(utils.cloneDeep(testString) === testString).toBe(false);
	expect(typeof utils.cloneDeep(testString) === 'object').toBe(true);
	expect(utils.cloneDeep(testString) instanceof Object).toBe(true);
})
