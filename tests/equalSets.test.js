const utils = require('../lib')

test('has equalSets function', () => {
	expect(utils.equalSets instanceof Function).toBe(true);
})

test('equalSets returns false if not enough values supplied', () => {
	expect(utils.equalSets()).toBe(false);
	expect(utils.equalSets(['test'])).toBe(false);
})
test('equalSets does not treat false, null, NaN and undefined as equal values', () => {
	expect(utils.equalSets([1, 2, 3, null, undefined], [undefined, 1, 2, 3, null])).toBe(true);
	expect(utils.equalSets([1, 2, 3, null, NaN, undefined], [undefined, 1, NaN, 2, 3, null])).toBe(true);

	expect(utils.equalSets([1, 2, 3, true], [undefined, 1, 2, 3])).toBe(false);

	expect(utils.equalSets([1, 2, 3, false], [null, 1, 2, 3])).toBe(false);
	expect(utils.equalSets([1, 2, 3, undefined], [null, 1, 2, 3])).toBe(false);
	expect(utils.equalSets([1, 2, 3, NaN], [null, 1, 2, 3])).toBe(false);
	expect(utils.equalSets([1, 2, 3, NaN], [undefined, 1, 2, 3])).toBe(false);
	expect(utils.equalSets([1, 2, null, 3], [undefined, 1, 2, 3, null])).toBe(false);
	expect(utils.equalSets([1, 2, 3, NaN, undefined], [undefined, 1, 2, 3, null])).toBe(false);
	expect(utils.equalSets([1, 2, NaN, 3], [undefined, 1, 2, 3, null])).toBe(false);
	expect(utils.equalSets([1, undefined, 2, 3], [undefined, 1, null, null, 2, 3, null])).toBe(false);
})
