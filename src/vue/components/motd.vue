<template>
	<a v-html="parsedHtml"></a>
</template>
<script setup>
	import { computed } from 'vue'
	import { parseMOTD } from '@/core/handle/parseMOTD.js'
	const props = defineProps({
		data: String,
	})
	const parsedHtml = computed(() => {
		return parseMOTD(props.data)
	})
</script>

<style>

	/* Minecraft Color Classes */
	.mc-black {
		color: #000000;
	}

	.mc-dark-blue {
		color: #0000AA;
	}

	.mc-dark-green {
		color: #00AA00;
	}

	.mc-dark-aqua {
		color: #00AAAA;
	}

	.mc-dark-red {
		color: #AA0000;
	}

	.mc-dark-purple {
		color: #AA00AA;
	}

	.mc-gold {
		color: #FFAA00;
	}

	.mc-gray {
		color: #AAAAAA;
	}

	.mc-dark-gray {
		color: #555555;
	}

	.mc-blue {
		color: #5555FF;
	}

	.mc-green {
		color: #55FF55;
	}

	.mc-aqua {
		color: #55FFFF;
	}

	.mc-red {
		color: #FF5555;
	}

	.mc-light-purple {
		color: #FF55FF;
	}

	.mc-yellow {
		color: #FFFF55;
	}

	.mc-white {
		color: #FFFFFF;
	}

	/* Minecraft Format Classes */
	.mc-bold {
		font-weight: bold;
	}

	.mc-strikethrough {
		text-decoration: line-through;
	}

	.mc-underline {
		text-decoration: underline;
	}

	.mc-italic {
		font-style: italic;
	}
</style>