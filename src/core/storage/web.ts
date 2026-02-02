/**
 * 存储项接口，支持过期时间
 */
interface StorageItem<T> {
	value: T;
	expiry: number | null; // 时间戳，null 表示永久
}

export enum StorageType {
	Local = 'local',
	Session = 'session'
}

export class WebStorage {
	private storage: Storage;
	private prefix: string;

	/**
	 * @param type 存储类型
	 * @param prefix Key 前缀，防止多应用/多模块冲突
	 */
	constructor(type: StorageType = StorageType.Local, prefix: string = 'app_') {
		// 检查是否在浏览器环境中
		if (typeof window === 'undefined' || !window.localStorage || !window.sessionStorage) {
			throw new Error('WebStorage 只能在支持 Web Storage API 的浏览器环境中使用');
		}
		this.storage = type === StorageType.Local ? window.localStorage : window.sessionStorage;
		this.prefix = prefix;
	}

	/**
	 * 设置存储
	 * @param key 键名
	 * @param value 键值
	 * @param ttl 过期时间（秒），可选
	 */
	set<T>(key: string, value: T, ttl?: number | null): void {
		// 验证键名，防止非法字符
		if (!key || typeof key !== 'string' || /[\u0000-\u001F\u007F]/.test(key)) {
			console.error(`无效的键名: ${key}`);
			return;
		}

		const item: StorageItem<T> = {
			value,
			expiry: ttl ? Date.now() + ttl * 1000 : null,
		};

		try {
			const serializedItem = JSON.stringify(item);
			this.storage.setItem(this.prefix + key, serializedItem);
		} catch (e) {
			if (e instanceof DOMException && e.name === 'QuotaExceededError') {
				console.error('存储空间已满:', e);
			} else {
				console.error('序列化或存储失败:', e);
			}
		}
	}

	/**
	 * 获取存储
	 * @param key 键名
	 */
	get<T>(key: string): T | null {
		// 验证键名
		if (!key || typeof key !== 'string') {
			console.error(`无效的键名: ${key}`);
			return null;
		}

		const prefixedKey = this.prefix + key;
		const raw = this.storage.getItem(prefixedKey);
		if (!raw) return null;

		try {
			const item: StorageItem<T> = JSON.parse(raw);

			// 检查是否过期
			if (item.expiry && Date.now() > item.expiry) {
				this.remove(key);
				return null;
			}

			return item.value;
		} catch (e) {
			console.error(`解析 Storage [${prefixedKey}] 失败:`, e);
			// 解析失败后清理损坏的数据
			this.storage.removeItem(prefixedKey);
			return null;
		}
	}
	/**
	 * 删除指定项
	 */
	remove(key: string): void {
		if (!key || typeof key !== 'string') {
			console.error(`无效的键名: ${key}`);
			return;
		}
		this.storage.removeItem(this.prefix + key);
	}

	/**
	 * 清空当前前缀下的所有存储
	 */
	clear(): void {
		const keysToRemove: string[] = [];
		for (let i = 0; i < this.storage.length; i++) {
			const key = this.storage.key(i);
			if (key?.startsWith(this.prefix)) {
				keysToRemove.push(key);
			}
		}
		keysToRemove.forEach(key => this.storage.removeItem(key));
	}

	/**
	 * 清理所有过期的存储项
	 */
	cleanupExpired(): void {
		const keysToRemove: string[] = [];
		const length = this.storage.length;

		for (let i = 0; i < length; i++) {
			const key = this.storage.key(i);
			if (key?.startsWith(this.prefix)) {
				// 检查该项是否已过期
				const raw = this.storage.getItem(key);
				if (raw) {
					try {
						const item: StorageItem<any> = JSON.parse(raw);
						if (item.expiry && Date.now() > item.expiry) {
							keysToRemove.push(key);
						}
					} catch (e) {
						// 如果解析失败，也视为无效数据，进行清理
						keysToRemove.push(key);
					}
				}
			}
		}
		keysToRemove.forEach(key => this.storage.removeItem(key));
	}
}

// 导出单例
// export const localStore = new StorageService(StorageType.Local, 'tauri_ui_');
// export const sessionStore = new StorageService(StorageType.Session, 'tauri_tmp_');
