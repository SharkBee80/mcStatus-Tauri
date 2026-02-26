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
		/**
		 * 默认是否垂直显示
		 */
		vertical: boolean;
		/**
		 * 强制垂直显示
		 */
		forceVerticalOnDesktop: boolean;
		/**
		 * 垂直docker铺满
		 */
		verticalDockerFull: boolean;
	},
	Home: {
		/**
		 * 最小宽度
		 */
		minWidth: number;
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
		/**
		 * 启用双页模式
		 */
		doublePage: boolean;
	},
	Info: {
		/**
		 * 加载时刷新 
		 */
		refreshOnload: boolean;
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