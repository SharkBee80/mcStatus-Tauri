import { reactive } from 'vue'
import type { typeSwiperController } from '@/modules';

const swiperController = reactive<typeSwiperController>({
	controller: undefined,
	currentIndex: 0
})

export { swiperController }