<template>
	<component ref='thisEl' :is="ElTag" :style="{ '--maxLines': maxLines }" class="ellipsis-text">
		<slot></slot>
	</component>
</template>
<script setup lang="ts">
	import { ref, useTemplateRef } from 'vue';
	import type { ShallowRef } from 'vue';

	import { useResizeObserver } from '@vueuse/core'

	import { calculateBoxLines as calculateLine } from '@/core/handle';

	const props = defineProps<{
		tag?: string;
		showEnd?: boolean;
	}>();
	const thisEl: ShallowRef = useTemplateRef('thisEl')
	const maxLines = ref(3);
	const ElTag = ref('div');
	const able = ['div', 'span', 'p', 'a']
	if (props.tag && able.includes(props.tag)) {
		ElTag.value = props.tag;
	}
	useResizeObserver(thisEl, () => {
		// const { width, height } = entry.contentRect
		maxLines.value = calculateLine(thisEl.value, { showEnd: props.showEnd })
	})
	// onUpdated(() => {
	// 	console.log(props.motd)
	// 	maxLines.value = calculateLine(thisEl.value, { debug: true })
	// })

</script>

<style lang="css" scoped>
	.ellipsis-text {
		-webkit-line-clamp: var(--maxLines);
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>