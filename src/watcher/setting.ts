import { watch } from 'vue'
import { config } from '@/provider';
// import { WebStorage } from '@/core/storage';
import { TauriStorage } from '@/core/storage';
import { debounce } from '@/utils';

// tauri
const CONFIG_PATH = 'setting.json';
const storage = new TauriStorage(CONFIG_PATH);
// web
// const storage = new WebStorage();
// 
// 如果需要监听变化，可以添加监听器
const debounceSave = debounce((data) => {
	storage.save(data);
}, 500)
watch(config, (newConfig) => {
	debounceSave(newConfig)
}, { deep: true });

// window.addEventListener('unload', () => {
// 	localStorage.setItem('serversInfo', JSON.stringify(config))
// })