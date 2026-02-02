import { watch } from "vue";
import { swiperController, appStatus } from "@/provider";
import { typeSwiper } from "@/modules";

watch(() => appStatus, (v) => {
	const swiper = swiperController.controller?.control as typeSwiper
	if (v.isDragging || v.isAdding || v.isEditing) {
		swiper.slideTo(swiperController.currentIndex, 1)
		swiper.disable()
	} else {
		swiper.enable()
	}
}, { deep: true })