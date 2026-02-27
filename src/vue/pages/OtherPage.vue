<template>
	<div class="main">
		<div class="col">
			<div class="row">
				<a href="https://vite.dev" target="_blank">
					<img src="/vite.svg" class="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
				</a>
				<a href="https://vuejs.org/" target="_blank">
					<img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
				</a>
			</div>
			<hr class="invert-75">
			<div class="grid grid-cols-[repeat(auto-fit,10rem)] justify-center">
				<a href="https://tailwindcss.com/" target="_blank">
					<img src="@/assets/Tailwind.svg" class="logo" alt="logo" />
				</a>
				<a href="https://primevue.org" target="_blank">
					<img src="@/assets/primevue.svg" class="logo" alt="logo" />
				</a>
				<a href="https://swiperjs.com/" target="_blank">
					<img src="@/assets/swiper.svg" class="logo" alt="logo" />
				</a>
				<a href="https://i18next.github.io/i18next-vue/" target="_blank">
					<img src="@/assets/i18next.png" class="logo" alt="logo" />
				</a>
				<a href="https://vueuse.org/" target="_blank">
					<img src="@/assets/vueuse.svg" class="logo" alt="logo" />
				</a>
				<a href="https://upscalerjs.com/" target="_blank">
					<img src="@/assets/upscaler.svg" class="logo" alt="logo" />
				</a>
				<a href="https://xicons.org/" target="_blank">
					<img src="@/assets/xicons.svg" class="logo black" alt="logo" />
				</a>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	defineOptions({
		name: 'otherPage'
	})
</script>
<style scoped>
	.logo.vite:hover {
		filter: drop-shadow(0 0 2em #747bff) !important;
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #249b73) !important;
	}

	.logo.tauri:hover {
		filter: drop-shadow(0 0 2em #24c8db) !important;
	}

	.logo:hover {
		filter: drop-shadow(0 0 1em var(--text-color));
	}

	.black {
		filter: drop-shadow(0 0 1em var(--bg-color));
	}

	.dark .black {
		filter: invert(1);
	}

	.dark .black:hover {
		filter: invert(1) drop-shadow(0 0 1em var(--text-color));
	}

</style>

<style scoped>
	.main {
		display: flex;
		flex-direction: column;
		text-align: center;
		height: 100%;
	}

	.logo {
		width: 10rem;
		aspect-ratio: 1;
		padding: 1em;
		will-change: filter;
		transition: 0.75s;
	}

	.long {
		height: 10rem;
		width: unset;
		aspect-ratio: unset !important;
	}

	.row {
		justify-content: center;
		flex-wrap: wrap;
	}

	a {
		font-weight: 500;
		color: #646cff;
		text-decoration: inherit;
		width: fit-content;
	}

	a:hover {
		color: #535bf2;
	}

	html.dark a:hover {
		color: #24c8db;
	}
</style>