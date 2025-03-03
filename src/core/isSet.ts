export function isSet<T extends Set<any>>(set: any): set is T {
	return set instanceof Set;
}