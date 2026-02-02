import {
	readTextFile,
	writeTextFile,
	exists,
	BaseDirectory
} from '@tauri-apps/plugin-fs';

export class TauriStorage {
	private Path: string;
	constructor(path: string) {
		// 验证路径，防止路径遍历攻击
		if (path.includes('../') || path.includes('..\\')) {
			throw new Error('Invalid path: path traversal not allowed');
		}
		this.Path = path;
	}


	/**
	 * 加载文件
	 */
	async load() {
		try {
			// 1. 检查文件是否存在
			const fileExists = await exists(this.Path, { baseDir: BaseDirectory.AppConfig });

			if (!fileExists) {
				// 如果不存在，则返回空对象
				await this.save();
				return null;
			}

			// 2. 读取文件
			const contents = await readTextFile(this.Path, {
				baseDir: BaseDirectory.AppConfig
			});
			if (!contents) {
				await this.save();
				return null;
			}
			return contents;
		} catch (error) {
			console.error("文件加载失败:", error);
			return null;
		}
	}

	/**
	 * 保存文件
	 * @param _data 完整文件内容
	 */
	async save(_data?: any) {
		try {
			let data: string;
			if (typeof _data === "object") {
				// 如果是增量更新，可以先 load 再合并
				data = JSON.stringify(_data, null, 2);
			} else if (typeof _data === "string") {
				data = _data;
			} else if (_data === null || _data === undefined) {
				data = '';
			} else {
				data = _data.toString();
			}
			await writeTextFile(this.Path, data, {
				baseDir: BaseDirectory.AppConfig
			});

			console.log("文件保存成功");
			return true;
		} catch (error) {
			console.error("文件保存失败:", error);
			return false;
		}
	}
}
