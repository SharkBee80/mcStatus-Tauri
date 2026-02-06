// import { watch } from "vue";
// import { TauriStorage } from '@/core/storage';
// import { playersHead } from "@/provider";
// import { debounce } from "@/utils";

// const CONFIG_PATH = 'playersHead.json';
// const storage = new TauriStorage(CONFIG_PATH);

// watch(playersHead,
// 	(newValue) => {
// 		debounce(() => {
// 			console.log('save playersHead', newValue)
// 			storage.save(JSON.stringify(newValue, null, 2))
// 		}, 1000)
// 	}
// );