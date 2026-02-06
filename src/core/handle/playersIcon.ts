// import { fetch } from '@tauri-apps/plugin-http';

export const DEFAULT_HEAD_URL = new URL(`@/assets/img/Steve.png`, import.meta.url).href;

const BASE_URL = 'https://minotar.net/avatar/'
export const headSrc = (path: string) => {
	return BASE_URL + path + '/64'
}
// export function getAvatar(uuid: string) {
// 	return new PlayersIcon().get(uuid)
// }

// class PlayersIcon {
// 	get(uuid: string) {
// 		const has = playersHead[uuid]
// 		if (!has) playersHead[uuid] = { img: '', time: -1, blob: DEFAULT_HEAD_URL }
// 		const iconTab = toRef(playersHead[uuid]);
// 		if (!this.validTime(iconTab.value)) {
// 			console.log('更新头像')
// 			return this.updateIcon(uuid)
// 		} else {
// 			return iconTab.value.blob
// 		}
// 	}

// 	private validTime(iconTab: PlayerTab) {
// 		if (iconTab.time === -1) return false;
// 		return Date.now() - iconTab.time < 5 * 60 * 1000  // 5分钟
// 	}

// 	private async updateIcon(uuid: string): Promise<string | undefined> {
// 		const ico = await this.fetchIcon(uuid)
// 		const iconTab = {
// 			img: ico,
// 			time: Date.now(),
// 			blob: URL.createObjectURL(base64ToBlob(ico)),
// 		}
// 		playersHead[uuid] = iconTab
// 		return iconTab.blob
// 	}

// 	/**
// 	 * 获取玩家头像
// 	 * @param {string} uuid - 玩家 UUID
// 	 * @returns {Promise<string>} - 玩家头像的 Base64 字符串
// 	 */
// 	private async fetchIcon(uuid: string): Promise<string> {
// 		const img = await fetchImageToBase64(`https://minotar.net/avatar/${uuid}/64`)
// 		return img
// 	}
// }
// async function fetchImageToBase64(url: string): Promise<string> {
// 	try {
// 		const response = await fetch(url);
// 		const blob = await response.blob();

// 		return new Promise((resolve, reject) => {
// 			const reader = new FileReader();
// 			reader.onloadend = () => {
// 				if (reader.result) {
// 					resolve(reader.result as string);
// 				} else {
// 					reject(new Error('Failed to read image data'));
// 				}
// 			};
// 			reader.onerror = () => {
// 				reject(new Error('Error reading image file'));
// 			};
// 			reader.readAsDataURL(blob);
// 		});
// 	} catch (error) {
// 		console.error('Error fetching image:', error);
// 		return DEFAULT_HEAD_URL;
// 	}
// }

// /**
//  * Base64 转换为 Blob
//  * @param {string} base64Data - Base64 字符串 (可以包含或不包含 data:image/png;base64, 前缀)
//  * @param {string} contentType - 文件类型 (可选，如 'image/png')
//  */
// function base64ToBlob(base64Data: string, contentType: string = '') {
// 	// 1. 如果包含前缀，将其剥离并提取内容类型
// 	const parts = base64Data.split(';base64,');
// 	if (parts.length > 1) {
// 		contentType = contentType || parts[0].split(':')[1];
// 		base64Data = parts[1];
// 	}

// 	// 2. 解码 base64 字符串
// 	const byteCharacters = atob(base64Data);

// 	// 3. 将解码后的字符转换为二进制数组
// 	const byteArrays = [];
// 	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
// 		const slice = byteCharacters.slice(offset, offset + 512);
// 		const byteNumbers = new Array(slice.length);
// 		for (let i = 0; i < slice.length; i++) {
// 			byteNumbers[i] = slice.charCodeAt(i);
// 		}
// 		const byteArray = new Uint8Array(byteNumbers);
// 		byteArrays.push(byteArray);
// 	}

// 	// 4. 返回 Blob 对象
// 	return new Blob(byteArrays, { type: contentType });
// }
