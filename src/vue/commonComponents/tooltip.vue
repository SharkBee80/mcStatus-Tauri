<template>
	<div class="tip">
		<div class="reference" :class="tooltip ? 'cursor-progress' : ''">
			<slot></slot>
		</div>
		<div v-if="tooltip" class="tooltip w-max max-w-60 bg-[#3f3f46] text-white border border-black/75 text-base/tight
		 break-all whitespace-pre-line text-left py-2.5 px-3 rounded-md absolute z-100 shadow-black/10 shadow-[0px 2px 3px]">
			{{ tooltip }}
		</div>
	</div>
</template>
<script setup lang="ts">
	defineProps<{
		tooltip: string
	}>()
</script>
<style scoped>
	.tip:hover .tooltip {
		visibility: visible;
		display: unset;
		opacity: 1;
		transition: opacity 0.3s ease-in-out;
	}

	.tooltip {
		visibility: hidden;
		display: block;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		/* 定位 */
		position: absolute;
		transform: translate(calc(-50% - 1rem), calc(0% + 0px));
		/* transform: translate(calc(-100% - 40px - 6px), calc(-25%); */
	}
</style>