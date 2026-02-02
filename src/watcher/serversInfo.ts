import { serversInfo } from "@/provider";
import { watch } from "vue";
import { TauriStorage } from '@/core/storage';

const CONFIG_PATH = 'serverInfo.json';
const storage = new TauriStorage(CONFIG_PATH);

watch(() => serversInfo,
	(newValue) => {
		serversInfo.forEach((server, index) => {
			if (server === undefined) {
				serversInfo.splice(index, 1)
			}
		})
		console.log('save serversInfo', newValue)
		// localStorage.setItem('serversInfo', JSON.stringify(newValue))
		storage.save(JSON.stringify(newValue, null, 2))
	},
	{ deep: true }
)

// window.addEventListener('unload', () => {
// 	localStorage.setItem('serversInfo', JSON.stringify(serversInfo))
// })