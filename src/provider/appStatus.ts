import { reactive } from "vue";

export const appStatus: AppStatus = reactive({
	exPage: 1,
	currentPage: 1,
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