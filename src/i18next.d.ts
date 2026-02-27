import 'i18next';
// 导入你的主语言 JSON 文件作为类型基准
import A from '../public/locales/A.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		// 默认命名空间，通常设为 'translation'
		defaultNS: 'translation';
		// 将资源类型指向你的 JSON 结构
		resources: {
			translation: typeof A;
		};
		// 如果你有深层嵌套，可以开启这个（可选）
		// keySeparator: '.';
	}
}
