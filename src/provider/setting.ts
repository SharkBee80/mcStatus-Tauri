import { computed, reactive } from 'vue'
import { Config } from '@/modules';
import merge from 'deepmerge';
import { TauriStorage } from '@/core/storage';
import { useWindowSize } from '@vueuse/core';
import { pf } from '@/provider';
// import { WebStorage } from '@/core/storage';

export const DEFAULT_SETTINGS: Config = {
	UI: {
		theme: 'Auto',
		language: 'zh-CN',
		showtext: true,
		vertical: true,
		forceVerticalOnDesktop: false,
		verticalDockerFull: false
	},
	Home: {
		minWidth: 300,
		eachLine: 0,
		thread: 4,
		imgIncrease: false,
		doublePage: false
	},
	Info: {
		refreshOnload: true,
		avatar: true,
		rounded: false,
		showUUID: true
	}
}

// tauri
const CONFIG_PATH = 'setting.json';
const storage = new TauriStorage(CONFIG_PATH);
const data = await storage.load() || '{}';
let _config: Config = JSON.parse(data) as Config
// web
// const storage = new WebStorage()
// const data = storage.get('config') || {}
// let _config: Config = data as Config
// 
_config = merge(DEFAULT_SETTINGS, _config)

export const config: Config = reactive({ ..._config })

export function resetConfig() {
	Object.assign(config, DEFAULT_SETTINGS)
	// new Promise(() => setTimeout(() => location.reload(), 1000))
}

const { width, height } = useWindowSize();

export const vertical = computed(() => {
	if (config.UI.vertical) {
		if (config.UI.forceVerticalOnDesktop && pf === 'Desktop') {
			return true
		} else {
			return width.value > height.value
		}
	} else {
		return false
	}
})