export interface Config {
	UI: {
		/**
		 * 默认主题
		 */
		theme: 'Light' | 'Dark' | 'Auto';
		/**
		 * 默认语言
		 */
		language: 'auto' | 'zh-CN' | 'en-US';
		/**
		 * 默认是否显示文本
		 */
		showtext: boolean;
	},
	Home: {
		/**
		 * 默认每页显示的行数
		 */
		eachLine: number;
		/**
		 * 默认查询的线程数
		 */
		thread: number;
		/**
		 * 默认是否启用图片增强
		 */
		imgIncrease: boolean;
	},
	Info: {
		/**
		 * 默认是否显示头像
		 */
		avatar: boolean;
		/**
		 * 默认是否显示圆形头像
		 */
		rounded: boolean;
		/**
		 * 默认是否显示UUID
		 */
		showUUID: boolean;
	}
	// [x: string]: any;
};