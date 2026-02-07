<template>
	<HeadBar :page="appStatus.currentPage" />
	<div class="flex h-full w-full overflow-hidden" :class="vertical ? 'flex-row-reverse' : 'flex-col'">
		<BodyBar />
		<Navigation :vertical />
	</div>
</template>
<script setup lang="ts">
	import HeadBar from '@/vue/components/HeadBar.vue';
	import BodyBar from '@/vue/components/BodyBar.vue'
	import Navigation from '@/vue/components/Navigation.vue';

	import { appStatus, config, pf } from '@/provider'
	import { computed } from 'vue';
	import { useWindowSize } from '@vueuse/core';
	const { width, height } = useWindowSize();

	const vertical = computed(() => {
		if (config.UI.vertical) {
			if (config.UI.forceVerticalOnDesktop && pf === 'Desktop') {
				return true
			} else {
				return width.value > height.value
			}
		} else {
			return false
		}
	})
</script>