import { watch } from 'vue'
import { config } from '@/provider';
// import { WebStorage } from '@/core/storage';
import { TauriStorage } from '@/core/storage';

let timeout: number | undefined;
// tauri
const CONFIG_PATH = 'setting.json';
const storage = new TauriStorage(CONFIG_PATH);
// web
// const storage = new WebStorage();
// 
// 如果需要监听变化，可以添加监听器
watch(config, (newConfig) => {
	// 配置变化时的处理逻辑
	if (timeout) clearTimeout(timeout);
	timeout = setTimeout(() => {
		// console.log('Config updated:', newConfig);
		storage.save(newConfig);
		// storage.set('config', newConfig)
	}, 500);
}, { deep: true });

// window.addEventListener('unload', () => {
// 	localStorage.setItem('serversInfo', JSON.stringify(config))
// })