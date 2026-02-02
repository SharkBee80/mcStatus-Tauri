<template>
	<div class="stopwatch-container">
		<div class="display">
			{{ formattedTime }}
		</div>
		<div class="controls">
			<button v-if="!isRunning" @click="start" class="btn start">开始</button>
			<button v-else @click="pause" class="btn pause">暂停</button>
			<button @click="reset" class="btn reset">重置</button>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onUnmounted, onMounted } from 'vue';
	const props = defineProps({
		start: Boolean,
	});
	// 响应式状态
	const time = ref(0); // 单位：毫秒
	const isRunning = ref(false);
	let timer = null;

	// 格式化时间显示 (00:00:00.00)
	const formattedTime = computed(() => {
		const ms = Math.floor((time.value % 1000) / 10);
		const seconds = Math.floor((time.value / 1000) % 60);
		const minutes = Math.floor((time.value / (1000 * 60)) % 60);
		const hours = Math.floor(time.value / (1000 * 60 * 60));

		const pad = (num) => num.toString().padStart(2, '0');

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
	});

	// 功能函数
	const start = () => {
		if (isRunning.value) return;
		isRunning.value = true;
		const startTime = Date.now() - time.value;

		timer = setInterval(() => {
			time.value = Date.now() - startTime;
		}, 10); // 每10毫秒更新一次以保证精度
	};

	const pause = () => {
		isRunning.value = false;
		clearInterval(timer);
	};

	const reset = () => {
		pause();
		time.value = 0;
	};
	onMounted(() => {
		if (props.start) start();
	});
	// 卸载组件时清除定时器防止内存泄漏
	onUnmounted(() => {
		clearInterval(timer);
	});
</script>

<style scoped>
	.stopwatch-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Courier New', Courier, monospace;
		padding: 20px;
	}

	.display {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 20px;
		color: #2c3e50;
	}

	.controls {
		display: flex;
		gap: 10px;
	}

	.btn {
		padding: 10px 20px;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		transition: opacity 0.2s;
	}

	.btn:hover {
		opacity: 0.8;
	}

	.start {
		background-color: #42b983;
		color: white;
	}

	.pause {
		background-color: #f39c12;
		color: white;
	}

	.reset {
		background-color: #e74c3c;
		color: white;
	}
</style>