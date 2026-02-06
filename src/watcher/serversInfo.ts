import { serversInfo } from "@/provider";
import { watch } from "vue";
import { TauriStorage } from '@/core/storage';
import { debounce } from "@/utils";

const CONFIG_PATH = 'serverInfo.json';
const storage = new TauriStorage(CONFIG_PATH);

const debounceSave = debounce((data) => {
	storage.save(data);
}, 500)

watch(() => serversInfo,
	(newValue) => {
		serversInfo.forEach((server, index) => {
			if (server === undefined) {
				serversInfo.splice(index, 1)
			}
		})
		console.log('save serversInfo', newValue)
		// localStorage.setItem('serversInfo', JSON.stringify(newValue))
		debounceSave(newValue);
	},
	{ deep: true }
)

// window.addEventListener('unload', () => {
// 	localStorage.setItem('serversInfo', JSON.stringify(serversInfo))
// })