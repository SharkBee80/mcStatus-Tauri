<template>
	<div :class="`${bg ?? ''} ${size ? 'size-' + size : ''}`">
		<img v-if="!icon && image" :src="img" :class="rounded ? 'rounded-full' : 'rounded'" class="size-full"
			@error="imgerror" loading="lazy" />
		<Icon v-if="!image && icon" :class="icon, rounded ? 'rounded-full' : 'rounded'"></Icon>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
	import { defineAsyncComponent, ImgHTMLAttributes, onMounted, ref } from 'vue';

	const props = defineProps<{
		rounded?: boolean
		size?: number
		image?: string
		icon?: string
		bg?: string
		imgerror?: string
		backupImage?: string
	}>()
	const Icon = defineAsyncComponent(() => import('@/vue/components/primevueIcon.vue'))
	function imgerror(e: Event) {
		const target = e.target as ImgHTMLAttributes | null;
		if (!target) return;
		target.src = props.imgerror;
	}
	const img = ref<string | undefined>(props.imgerror)
	onMounted(() => {
		generateImg();
	})
	async function generateImg() {
		if (!props.image) return props.imgerror;
		const res = await fetch(props.image, { redirect: 'manual' });
		if (res.ok) {
			img.value = props.image;
		} else {
			img.value = props.backupImage;
		}
	}
</script>