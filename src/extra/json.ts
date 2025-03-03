
export function jsonToArray(jsonArray: string): any[] {
	var s = [];
	try {
		s = JSON.parse(jsonArray);
	} catch (e) {
		s = [];
	}
	return s;
}

export function arrayToJson(array: any[]): string {
	var s = "[]";
	if (!(array instanceof Array)) return s;
	try {
		s = JSON.stringify(array);
	} catch (e) {
		s = "[]";
	}
	return s;
}

export function jsonToObject(jsonObject: string): object {
	var s = {};
	try {
		s = JSON.parse(jsonObject);
	} catch (e) {
		s = {};
	}
	return s;
}

export function objectToJson(
	object: Record<string, any>,
	pretty: boolean = false
): string {
	var s = "{}";
	if (!(object instanceof Object)) return s;
	try {
		s = JSON.stringify(
			object,
			pretty ? null : undefined,
			pretty ? 2 : undefined
		);
	} catch (e) {
		s = "{}";
	}
	return s;
}
