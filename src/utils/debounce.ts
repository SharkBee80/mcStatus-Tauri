/**
 * 函数防抖 (Debounce)
 * 特点：在一段连续触发内，只执行一次（通常是最后一次，或者首次）
 */
export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	time = 500,
	config: { first?: boolean; end?: boolean } = { first: false, end: true }
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return function (this: any, ...args: Parameters<T>) {
		const context = this;

		// 如果配置了首次执行，且当前没有定时器在运行
		if (config.first && !timeout) {
			fn.apply(context, args);
		}

		// 清除之前的定时器
		if (timeout) clearTimeout(timeout);

		// 重新开启定时器
		timeout = setTimeout(() => {
			// 如果配置了结束后执行
			if (config.end) {
				fn.apply(context, args);
			}
			timeout = null;
		}, time);
	};
}

/**
 * 函数节流 (Throttle)
 * 特点：在一段时间内，只允许函数执行一次
 */
export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	time = 500,
	config: { first?: boolean; end?: boolean } = { first: true, end: false }
): (...args: Parameters<T>) => void {
	let canRun = true;

	return function (this: any, ...args: Parameters<T>) {
		const context = this;

		if (!canRun) return;

		// 首次立即执行逻辑
		if (config.first) {
			fn.apply(context, args);
		}

		canRun = false;

		setTimeout(() => {
			// 结束后执行逻辑（注意：如果first也为true，可能会导致短时间内重复执行，需根据业务调整）
			if (config.end) {
				fn.apply(context, args);
			}
			canRun = true;
		}, time);
	};
}
