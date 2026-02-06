<template>
	<div
		class="cursor-pointer hover:bg-(--p-button-text-secondary-hover-background) rounded-full size-(--p-button-icon-only-width) flex items-center justify-center">
		<i :class="pt?.class" class="color-(--p-button-text-secondary-color)"></i>
	</div>
</template>
<script setup lang="ts">
	defineProps<{
		pt?: { class?: string }
	}>()
</script>