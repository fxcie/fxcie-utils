export const isString = (str: any): str is String | string =>
	typeof str === "string" || str instanceof String;