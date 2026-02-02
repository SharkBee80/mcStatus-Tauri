import { fetch } from '@tauri-apps/plugin-http';

export interface WebDAVConfig {
	baseUrl: string; // 例如: dav.jianguoyun.com
	username: string;
	password: string;
}

export class TauriWebDAV {
	private authHeader: string;
	private baseUrl: string;

	constructor(config: WebDAVConfig) {
		// 自动处理基础 URL 末尾斜杠
		this.baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl : `${config.baseUrl}/`;
		// Base64 编码认证信息
		this.authHeader = `Basic ${btoa(`${config.username}:${config.password}`)}`;
	}

	/**
	 * 通用请求封装，利用 Tauri Http 插件绕过 CORS
	 */
	private async request(path: string, options: RequestInit) {
		const url = `${this.baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

		const response = await fetch(url, {
			...options,
			headers: {
				...options.headers,
				'Authorization': this.authHeader,
			},
		});

		if (!response.ok) {
			throw new Error(`WebDAV Error: ${response.status} ${response.statusText}`);
		}
		return response;
	}

	/**
	 * 读取文件内容 (文本)
	 */
	async readFile(path: string): Promise<string> {
		const res = await this.request(path, { method: 'GET' });
		return await res.text();
	}

	/**
	 * 写入文件内容
	 * @param path 文件路径
	 * @param content 内容 (String 或 Blob)
	 */
	async writeFile(path: string, content: string | Blob): Promise<void> {
		await this.request(path, {
			method: 'PUT',
			body: content,
		});
	}

	/**
	 * 创建文件夹 (MKCOL)
	 */
	async createDirectory(path: string): Promise<void> {
		await this.request(path, { method: 'MKCOL' });
	}

	/**
	 * 删除文件或目录
	 */
	async delete(path: string): Promise<void> {
		await this.request(path, { method: 'DELETE' });
	}

	/**
	 * 列出目录下的文件 (PROPFIND)
	 * 注意：解析 XML 较为复杂，此处返回原始 XML 字符串，
	 * 建议配合 DOMParser 使用
	 */
	async listFiles(path: string): Promise<string> {
		const res = await this.request(path, {
			method: 'PROPFIND',
			headers: { 'Depth': '1' }
		});
		return await res.text();
	}
}
