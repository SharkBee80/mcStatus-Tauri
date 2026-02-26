import { TaskQueue } from "@/utils";
import Upscaler from 'upscaler';
import { reactive, Ref } from "vue";
import { config } from '@/provider'
// 放大倍数
const MULTIPLIER = 4;
//
let queue: TaskQueue;
function get_set_queue(concurrency: number = MULTIPLIER >= 4 ? 1 : 2) {
	if (!queue) {
		queue = new TaskQueue(concurrency, 'IncreaseImage');
	}
	return queue;
}
const infoPageQ = new TaskQueue()

type s = {
	0: boolean
	1: boolean
	64: string
	256: string
}

const UPimg: { [key: string]: s } = reactive({})
export class IncreaseImage {
	private readonly queue: TaskQueue;
	private iconImg: Ref<string | Blob | null | undefined, string | Blob | null | undefined>;
	private uuid: string;
	private imgs;
	private mark: boolean = false;
	constructor(iconImg: Ref<string | null | undefined, string | null | undefined>, uuid: string, name?: string) {
		this.iconImg = iconImg;
		this.uuid = uuid;
		this.imgs = UPimg[this.uuid] || (UPimg[this.uuid] = { 0: false, 1: false, 64: '', 256: '' });
		this.queue = name ? infoPageQ : get_set_queue();
	}

	private async main(img: string) {
		if (this.mark && this.imgs[0] && this.imgs[1]) return this.iconImg.value = this.imgs[256];
		else if (!this.mark && this.imgs[1]) { this.mark = true; return this.iconImg.value = this.imgs[256]; }
		// 原图直出
		this.iconImg.value = img
		this.imgs[0] = true
		this.imgs[64] = img
		if (!config.Home.imgIncrease) return;
		// 增强图
		const srcUrl = typeof img === 'string' ? img : URL.createObjectURL(img);
		try {
			const upscaler = new Upscaler({
				model: {
					path: '/src/assets/upscaler/esrgan-slim@1.0.0-beta.12/x4/model.json',
					scale: MULTIPLIER,
				},
			});
			// 1. 加载原图 (支持 Blob 或 Base64)
			const image = await this.loadImage(srcUrl); // 加载原图
			const { width, height } = image;
			// 2. 放大 RGB 部分
			const upscaledRGBBase64 = await upscaler.upscale(image);
			const upscaledImg = await this.loadImage(upscaledRGBBase64);
			// 3. 准备 Canvas 处理 Alpha
			const canvas = document.createElement('canvas');
			canvas.width = width * MULTIPLIER;
			canvas.height = height * MULTIPLIER;
			const ctx = canvas.getContext('2d')!;
			// 强制开启平滑算法
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = 'high';
			// 绘制放大后的图像（带黑底）
			ctx.drawImage(upscaledImg, 0, 0);
			// 4. 关键：应用原始透明度遮罩
			// 使用 destination-in 混合模式，将原图拉伸后的 Alpha 通道切回
			ctx.globalCompositeOperation = 'destination-in';
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 浏览器会自动通过插值放大 Alpha
			ctx.globalCompositeOperation = 'source-over';
			// 5. 将处理后的图片转为 转换为 Blob
			const result = await new Promise<{
				blob?: Blob;
				url: string;
				dispose?: () => void;
			}>((resolve, reject) => {
				canvas.toBlob((blob) => {
					if (!blob) return reject(new Error('Blob 生成失败'));

					const finalUrl = URL.createObjectURL(blob);

					// 手动销毁中间大对象以释放内存
					this.cleanup(canvas, [image, upscaledImg]);
					upscaler.dispose();

					resolve({
						// blob,
						url: finalUrl,
						// dispose: () => URL.revokeObjectURL(finalUrl) // 调用者负责销毁
					});
				}, 'image/png');
			});
			this.iconImg.value = result.url;
			console.log('enhancedImage', this.uuid)
			// 6.record
			this.imgs[1] = true
			this.imgs[256] = result.url
		} catch (error) {
			console.warn('IncreaseImage', error)
		} finally {
			if (typeof img !== 'string') URL.revokeObjectURL(srcUrl);
		}
	}

	/**
 * 辅助函数：加载图片
 */
	private loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = 'anonymous'; // 避免跨域画布污染
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	/**
 * 内存清理助手
 */
	private cleanup(canvas: HTMLCanvasElement, images: HTMLImageElement[]) {
		canvas.width = 0;
		canvas.height = 0;
		canvas.remove();
		images.forEach(img => {
			img.src = '';
			img.remove();
		});
	}
	run(img: string | null | undefined) {
		if (img === undefined || img === null || this.mark) return;
		this.queue.add(this.uuid, async () => { await this.main(img) })
	}
}