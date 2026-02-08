<template>
	<div ref="thisEl" class="gridLayout grid gap-4 p-4" :style="{ '--eachLine': eachLine, '--minWidth': minwidth }">
		<Card v-for="i in serversStatus" :uuid="i.uuid" :key="'Card' + i.uuid" />
	</div>
</template>
<script lang="ts" setup>
	import { computed, onMounted, ref } from 'vue';
	import Sortable from 'sortablejs';
	import { appStatus, serversStatus } from '@/provider';
	import { Mcdata } from '@/core/handle';
	import Card from '@/vue/components/Card.vue'
	const props = defineProps<{
		eachLine: string | number
		minwidth: string
	}>()

	// const data = props.sortableData;
	// const data = reactive(props.sortableData);
	const thisEl = ref<HTMLElement>()
	onMounted(() => sortableG());

	function sortableG() {
		const el = thisEl.value!
		// Array.from(el.children).forEach((item) => {
		// 	if (item instanceof HTMLElement) {
		// 		item.classList.add(randomClassName)
		// 	}
		// })
		// const randomClass = '.' + randomClassName;
		const ops: Sortable.Options = {
			group: {
				name: 'items',
				pull: true,
				put: false,
			},
			delay: 300,
			delayOnTouchOnly: false,
			touchStartThreshold: 30,
			// disabled: false,
			// store: undefined,
			animation: 150,
			// easing: "cubic-bezier(1, 0, 0, 1)",
			// handle: ".my-handle",
			// filter: ".ignore-elements",
			// preventOnFilter: true,
			// draggable: ".item",
			//
			// dataIdAttr: 'data-id',
			//
			ghostClass: "sortable-ghost",
			chosenClass: "sortable-chosen",
			dragClass: "sortable-drag",
			//
			// swapThreshold: 1,
			// invertSwap: false,
			// invertedSwapThreshold: 1,
			// direction: 'horizontal',
			//
			forceFallback: true, // important in webview
			//
			onChoose() {
				appStatus.isDragging = true;
			},
			onUnchoose() {
				new Promise(() =>
					setTimeout(() => {
						appStatus.isDragging = false;
					}, 200)
				)
			},
			onStart() {
				appStatus.isDragging = true;
				// console.log('start', e);
			},
			onEnd(e) {
				new Promise(() =>
					setTimeout(() => {
						appStatus.isDragging = false;
					}, 200)
				)
				if (e.to !== e.from) {
					e.clone.remove();
					return reNode(e);
				};
				const { oldIndex, newIndex } = e;
				if (oldIndex === undefined || newIndex === undefined) return;

				if (oldIndex !== newIndex) {
					Mcdata.splice(oldIndex, newIndex);
				};
			}
		};
		new Sortable(el, ops);
	}
	function reNode(e: Sortable.SortableEvent) {
		const from = e.from          // 原列表 DOM
		const itemEl = e.item        // 被拖的 DOM
		const index = e.oldIndex 		 // 原索引
		const refNode = from.children[index!]
		from.insertBefore(itemEl, refNode)
	}

	//////////////////////////////////////////////////////////////////
	const eachLine = computed(() => {
		if (props.eachLine === '0' || props.eachLine === 0) {
			return 'auto-fit'
		} else {
			return props.eachLine
		}
	})
	////
</script>
<style scoped>
	.gridLayout {
		--minWidth: 240px;
		/* grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); */
		grid-template-columns: repeat(var(--eachLine), minmax(min(var(--minWidth), 100%), 1fr));
	}
</style>