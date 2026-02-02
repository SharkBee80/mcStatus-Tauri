/**
 * 简单的 WebDAV 纯前端客户端
 */
export interface WebDAVConfig {
	baseUrl: string;
	username: string;
	password: string;
}

export class WebDAV {
	private baseUrl: string;
	private authHeader: string;

	constructor(config: WebDAVConfig) {
		this.baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl : `${config.baseUrl}/`;
		// 标准 Base64 认证
		this.authHeader = `Basic ${btoa(decodeURI(encodeURIComponent(`${config.username}:${config.password}`)))}`;
	}

	/**
	 * 核心请求方法
	 */
	private async request(path: string, options: RequestInit = {}) {
		const url = `${this.baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;

		const response = await fetch(url, {
			...options,
			headers: {
				'Authorization': this.authHeader,
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`WebDAV 请求失败: ${response.status} ${response.statusText}`);
		}
		return response;
	}

	/**
	 * 读取文件 (文本)
	 */
	async getFile(path: string): Promise<string> {
		const res = await this.request(path, { method: 'GET' });
		return await res.text();
	}

	/**
	 * 上传文件 (支持字符串、Blob、ArrayBuffer)
	 */
	async putFile(path: string, content: string | Blob | ArrayBuffer): Promise<void> {
		await this.request(path, {
			method: 'PUT',
			body: content,
			headers: {
				'Content-Type': 'application/octet-stream',
			},
		});
	}

	/**
	 * 创建文件夹
	 */
	async mkCol(path: string): Promise<void> {
		await this.request(path, { method: 'MKCOL' });
	}

	/**
	 * 删除文件或文件夹
	 */
	async delete(path: string): Promise<void> {
		await this.request(path, { method: 'DELETE' });
	}

	/**
	 * 获取目录列表 (PROPFIND)
	 * 返回简单的文件名数组
	 */
	async listDir(path: string): Promise<string[]> {
		const res = await this.request(path, {
			method: 'PROPFIND',
			headers: {
				'Depth': '1',
			},
		});
		const xmlText = await res.text();
		return this.parsePropfindXML(xmlText);
	}

	/**
	 * 简单的 XML 解析器，提取文件名
	 */
	private parsePropfindXML(xmlStr: string): string[] {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');
		const responses = xmlDoc.getElementsByTagName('D:response');
		const files: string[] = [];

		for (let i = 0; i < responses.length; i++) {
			const href = responses[i].getElementsByTagName('D:href')[0]?.textContent;
			if (href) {
				// 解码 URL 并提取最后一部分
				const decodedHref = decodeURIComponent(href);
				const name = decodedHref.split('/').filter(Boolean).pop() || '';
				files.push(name);
			}
		}
		// 第一个通常是目录自身，可以视情况过滤
		return files;
	}
}
