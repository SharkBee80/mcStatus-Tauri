<template>
	<img style="image-rendering: auto;" :src="img" />
</template>
<script setup lang="ts">
	import { Edition } from '@/modules';
	import { watch, ref } from 'vue';
	import { setIcon } from '@/core/handle';
	import { IncreaseImage } from '@/utils';
	import { config } from '@/provider'

	const props = defineProps<{
		Imgsrc: string | undefined,
		edition: Edition,
		uuid: string
	}>()
	const img = ref<string | undefined>(setIcon(props.Imgsrc, props.edition))
	const increaseImg = new IncreaseImage(img, props.uuid)

	watch(() => props.Imgsrc, () => {
		img.value = setIcon(props.Imgsrc, props.edition);
		if (config.Home.imgIncrease) increaseImg.run(props.Imgsrc)
	}, { immediate: true })

	watch(() => img.value, () => {
		img.value = setIcon(img.value, props.edition);
	})
</script>