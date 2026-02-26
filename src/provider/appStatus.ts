import { useWindowSize } from "@vueuse/core";
import { computed, reactive } from "vue";
import { config, vertical } from "@/provider";

export const appStatus: AppStatus = reactive({
	exPage: 0,
	currentPage: 0,
	activeUUID: '',
	isDragging: false,
	isAdding: false,
	isEditing: false,
	isDelete: false,
})

// export const { isDragging, isShowDialog } = toRefs(appStatus)

type AppStatus = {
	exPage: number,
	currentPage: number,
	activeUUID: string,
	isDragging: boolean,
	isAdding: boolean,
	isEditing: boolean,
	isDelete: boolean
}

const { width } = useWindowSize()
export const doubleSwitch = computed(() => {
	if (config.Home.doublePage && width.value > (vertical.value ? 720 : 660)) {
		return true;
	} else {
		return false;
	}
})