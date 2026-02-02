import type { App, Component } from "vue";

// 批量注册组件的函数
export const registerComponents = (components: Array<[string, Component]>, app: App<Element>) => {
	components.forEach(key => {
		app.component(`x-${key[0]}`, key[1] as Component);
	});
};
