type TaskExecutor<T = any> = () => Promise<T>;
type OnTaskComplete<T> = (id: string | number, result: T) => void;

interface QueueItem {
	id: string | number;
	task: TaskExecutor;
	resolve: (value: any) => void;
	reject: (reason?: any) => void;
}

export class TaskQueue {
	private queue: QueueItem[] = [];
	private runningCount: number = 0;
	private concurrency: number;
	private readonly name?: string;
	private readonly pendingIds: Set<string | number> = new Set();
	public onTaskSuccess?: OnTaskComplete<any>;

	/**
	 * @param concurrency 最大并发数，默认为 1（串行）
	 */
	constructor(concurrency: number = 1, name?: string) {
		this.concurrency = a(concurrency);
		this.name = name;
	}

	construct(concurrency?: number) {
		if (concurrency !== undefined) this.concurrency = a(concurrency);
	}

	/**
	 * 添加任务到队列
	 * @param id 任务唯一标识，如果 ID 已存在则忽略该任务
	 * @param task 异步任务函数
	 */
	add<T>(id: string | number, task: TaskExecutor<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 检查 ID 是否已在队列中或正在执行
			if (this.pendingIds.has(id)) {
				console.warn(`任务 [${this.name ?? '<>'}] ID [${id}] 已在队列中，跳过添加。`);
				return;
			}

			this.pendingIds.add(id);
			this.queue.push({ id, task, resolve, reject });
			this.next();
		});
	}

	private async next() {
		// 如果达到并发上限或队列为空，则停止
		if (this.runningCount >= this.concurrency || this.queue.length === 0) {
			return;
		}

		this.runningCount++;
		const item = this.queue.shift()!;

		try {
			const result = await item.task();
			item.resolve(result);
			// 触发全局回调
			if (this.onTaskSuccess) {
				this.onTaskSuccess(item.id, result);
			}
		} catch (error) {
			item.reject(error);
		} finally {
			this.runningCount--;
			this.pendingIds.delete(item.id); // 任务结束后移除 ID 占用
			this.next(); // 尝试执行下一个
		}
	}

	/** 获取当前等待中的任务数量 */
	get waitingCount(): number {
		return this.queue.length;
	}

	/** 获取当前正在执行的任务数量 */
	get activeCount(): number {
		return this.runningCount;
	}
}

const a = (num: number) => num < 1 ? 32 : num;;


// // 实例化一个并发数为 2 的队列
// const scheduler = new TaskQueue(2);

// const mockApi = (id: string, delay: number) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(`任务 ${id} 完成`);
//       resolve(`结果: ${id}`);
//     }, delay);
//   });
// };

// // 添加任务
// scheduler.add("A", () => mockApi("A", 2000)).then(console.log);
// scheduler.add("B", () => mockApi("B", 1000)).then(console.log);
// scheduler.add("A", () => mockApi("A", 500));  // 该任务会被忽略，因为 ID "A" 正在处理中
// scheduler.add("C", () => mockApi("C", 1000)).then(console.log);

// /*
// 执行逻辑：
// 1. A 和 B 同时开始执行（并发为2）。
// 2. 第二个 A 被直接拦截，不进入队列。
// 3. 1秒后 B 完成，C 开始执行。
// 4. 2秒后 A 完成。
// 5. 2.5秒后 C 完成。
// */
