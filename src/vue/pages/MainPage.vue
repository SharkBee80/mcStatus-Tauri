<template>
	<swiper :slidesPerView="1" :spaceBetween="10" @swiper="bindSwiperController" :controller="controller"
		@slideChange="onSlideChange" :resistanceRatio="0">
		<swiper-slide>
			<HomePage />
		</swiper-slide>
		<swiper-slide>
			<InfoPage />
		</swiper-slide>
	</swiper>
</template>

<script setup lang="ts">
	// Import Swiper Vue.js components
	import { Swiper, SwiperSlide } from 'swiper/vue';
	// Import Swiper styles
	import 'swiper/css';
	//////////////////////////////////////////////////////////////
	import HomePage from '@/vue/pages/HomePage.vue';
	import InfoPage from '@/vue/pages/InfoPage.vue';
	//////////////////////////////////////////////////////////////
	import { appStatus, swiperController } from '@/provider';
	import type { typeSwiper } from '@/modules';
	import { onUpdated, toRefs } from 'vue';
	const props = defineProps<{
		index: number[]
	}>();
	const { controller, currentIndex } = toRefs(swiperController)

	onUpdated(() => {
		if (controller.value?.control) {
			const control = controller.value?.control as typeSwiper;
			if (props.index[0] > 2) return;
			if (control.activeIndex !== props.index[1] - 1) {
				control.slideTo(props.index[0] - 1, 0)
			} else if (control.activeIndex !== props.index[0] - 1) {
				control.slideTo(props.index[0] - 1, 500)
			}
		}
	});

	const bindSwiperController = (swiper: typeSwiper) => {
		controller.value ? controller.value.control = swiper : controller.value = { control: swiper }
	}

	const onSlideChange = (swiper: typeSwiper) => {
		if (swiper.activeIndex !== currentIndex.value) {
			currentIndex.value = swiper.activeIndex
			appStatus.currentPage = swiper.activeIndex + 1
		}
	}
</script>
<style scoped>
	.swiper {
		width: 100%;
		height: 100%;
		/* position: absolute; */
	}

	.swiper-slide {
		font-size: 18px;
		overflow: auto;
		transform: unset;
	}
</style>