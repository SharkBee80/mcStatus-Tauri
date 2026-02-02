export function replaceReactive<
	T extends Record<string, any>
>(
	target: T,
	source: Partial<T>
): void {
	for (const key in target) {
		delete target[key]
	}
	for (const key in source) {
		target[key] = source[key] as T[typeof key]
	}
}
export function replaceReactiveStrict<
	T extends Record<string, any>
>(
	target: T,
	source: T
): void {
	for (const key in target) {
		delete target[key]
	}
	Object.assign(target, source)
}