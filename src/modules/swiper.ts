import type { Swiper, ControllerOptions } from 'swiper/types';

interface swiperController {
	// controller: {
	// 	control?: Swiper | Swiper[] | string | HTMLElement | null,
	// 	inverse?: boolean,
	// 	by?: 'slide' | 'container'
	// } | undefined,
	controller: ControllerOptions | undefined,
	currentIndex: number
}

export type {
	Swiper as typeSwiper,
	ControllerOptions as typeController,
	swiperController as typeSwiperController
}