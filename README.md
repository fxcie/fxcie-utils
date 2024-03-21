# fxcie-utils
My Utilities

Methods I need to have access to from anywhere.

## Install

```
npm install @fxcie/utils
```

## Usage

```
// Common JS
const Utils = require('@fxcie/utils')

// Module JS
import Utils, { isString } from '@fxcie/utils'
```

## Methods

isString: Test if first argument is a string.

isObject: Test if first argument is an object. Does not test as object if value is null. Does test as object if string is a String object instance or an Array object instance.

isArray: Test if first argument is an Array object instance. Reports false for a String object instance.

isSet: Test if first argument is a Set object instance. Reports false for a String object instance.

isNonEmptyString: Test if first argument is string value/instance, and is not empty string.

merged: Merges all arrays in parameters into a single array. No flatenning.

cloneDeep: Deep clones the first argument. String object instances are cloned into new String object instances, but string literals are left as string literals.

unique: Returns an array of the unique values from the array supplied.

equalSets: Compare 2 iterables. Returns false if elements do not match.