import { reactive } from 'vue'
import { Config } from '@/modules';
import merge from 'deepmerge';
import { TauriStorage } from '@/core/storage';
// import { WebStorage } from '@/core/storage';

export const DEFAULT_SETTINGS: Config = {
	UI: {
		theme: 'Auto',
		language: 'zh-CN',
		showtext: true
	},
	Home: {
		eachLine: 0,
		thread: 4,
		imgIncrease: true
	}
}

// tauri
const CONFIG_PATH = 'setting.json';
const storage = new TauriStorage(CONFIG_PATH);
const data = await storage.load() || '{}'
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