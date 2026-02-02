<template>
	<SortableGrid ref="thisEl" :eachLine="eachline" minwidth="300px" />
	<div class="space"></div>
	<AddForm v-if="appStatus.isAdding" v-model="appStatus.isAdding"></AddForm>
	<dynamicBtn />
</template>
<script lang="ts" setup>
	import { nextTick, onActivated, onMounted, useTemplateRef, ref, toRefs, defineAsyncComponent } from 'vue';
	import { config, appStatus } from "@/provider";
	import dynamicBtn from '@/vue/components/dynamicBtn.vue';
	import SortableGrid from '@/vue/components/SortableGrid.vue';
	const AddForm = defineAsyncComponent(() => import('@/vue/components/AddForm.vue'))
	const { eachLine } = toRefs(config.Home);
	const thisEl = useTemplateRef('thisEl');
	onMounted(() => {
		func(eachLine.value);
	})

	onActivated(async () => {
		await nextTick();
		func(eachLine.value)
	})

	/////////////////////////////////////////////////////////////////
	const eachline = ref<string | number>(1);
	function func(b: string | number) {
		if (typeof b == 'number') {
			if (b === 0) return eachline.value = '0'
			const j = (b - 1) * 16 + 16 * 2
			const k = b * 240 + j
			const w = thisEl.value?.$el.clientWidth
			if (w > 0 && k > w) {
				console.log("width", w)
				eachLine.value = Math.max(1, Math.floor((w - j) / 240));
				eachline.value = 'auto-fit'
			} else {
				eachLine.value = Math.max(1, b);
				eachline.value = Math.max(1, b);
			}
		}
	}
</script>
<style scoped>
	.space {
		height: calc(1rem + 4rem);
	}
</style>