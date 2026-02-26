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
	import { appStatus, swiperController, doubleSwitch } from '@/provider';
	import type { typeSwiper } from '@/modules';
	import { nextTick, onMounted, onUpdated, toRefs, watch } from 'vue';

	const { controller, currentIndex } = toRefs(swiperController)

	onMounted(() => {
		if (controller.value?.control) {
			const control = controller.value?.control as typeSwiper;
			control.on('breakpoint', function () {
				appStatus.exPage = appStatus.currentPage = control.activeIndex;
				appStatus.isAdding = appStatus.isEditing = false;
			});
		}
	})

	onUpdated(() => {
		if (controller.value?.control) {
			const control = controller.value?.control as typeSwiper;
			if (appStatus.currentPage > 1) return;
			if (control.activeIndex !== appStatus.exPage) {
				control.slideTo(appStatus.currentPage, 0)
			} else if (control.activeIndex !== appStatus.currentPage) {
				control.slideTo(appStatus.currentPage, 500)
			}
		}
	});

	const bindSwiperController = (swiper: typeSwiper) => {
		controller.value ? controller.value.control = swiper : controller.value = { control: swiper }
	}

	const onSlideChange = (swiper: typeSwiper) => {
		if (swiper.activeIndex !== currentIndex.value) {
			currentIndex.value = swiper.activeIndex
			appStatus.currentPage = swiper.activeIndex
		}
	}

	watch(() => doubleSwitch.value, async (val) => {
		await nextTick()
		const control = controller.value?.control as typeSwiper;
		if (val) {
			control.params.breakpoints = {
				700: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
			}
		} else {
			control.params.breakpoints = {
				0: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
			}
		};
	}, { immediate: true })
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