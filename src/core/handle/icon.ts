
// const Java_Init = URL.createObjectURL(await getImageBlob(import('@/assets/img/unknown_server.png')));
// const Bedrock_Init = URL.createObjectURL(await getImageBlob(import('@/assets/img/240px-MC_square_key_art_2024.jpg')));
// async function getImageBlob(importz: Promise<any>) {
// 	// 1. 动态导入图片，获取其生成的 URL 对象
// 	const imageModule = await importz;
// 	const imageUrl = imageModule.default;

// 	// 2. 使用 fetch 请求该 URL 并转换为 Blob
// 	const response = await fetch(imageUrl);
// 	const blob = await response.blob();

// 	// console.log(blob); // 输出：Blob { size: ..., type: "image/png" }
// 	return blob;
// }

export const getSignalUrl = (boolean: boolean, index: number) => {
	if (boolean) return new URL(`/src/assets/img/signal/loading.gif`, import.meta.url).href;
	// 必须使用相对路径且包含扩展名
	return new URL(`/src/assets/img/signal/${index}.png`, import.meta.url).href
}

const getInitIcon = (type: 'Java' | 'Bedrock') => {
	if (type === 'Java') {
		return new URL(`@/assets/img/unknown_server.png`, import.meta.url).href;
	} else {
		return new URL(`@/assets/img/240px-MC_square_key_art_2024.jpg`, import.meta.url).href;
	}
}

export const setIcon = (image: string | undefined | null, type: 'Java' | 'Bedrock'): string => {
	if (image) {
		if (image.includes(';base64,')) {
			return URL.createObjectURL(base64ToBlob(image));
		} else if (image.startsWith('blob:')) {
			return image;
		}
		return image;
	} else {
		return getInitIcon(type);
	}
}

/**
 * Base64 转换为 Blob
 * @param {string} base64Data - Base64 字符串 (可以包含或不包含 data:image/png;base64, 前缀)
 * @param {string} contentType - 文件类型 (可选，如 'image/png')
 */
function base64ToBlob(base64Data: string, contentType: string = '') {
	// 1. 如果包含前缀，将其剥离并提取内容类型
	const parts = base64Data.split(';base64,');
	if (parts.length > 1) {
		contentType = contentType || parts[0].split(':')[1];
		base64Data = parts[1];
	}

	// 2. 解码 base64 字符串
	const byteCharacters = atob(base64Data);

	// 3. 将解码后的字符转换为二进制数组
	const byteArrays = [];
	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);
		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	// 4. 返回 Blob 对象
	return new Blob(byteArrays, { type: contentType });
}
