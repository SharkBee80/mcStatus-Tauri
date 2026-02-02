<template>
	<div class="bar sticky z-50 top-0 p-3 h-14 flex justify-between items-center text-center">
		<h1 class="font-black">Welcome to Tauri + Vue</h1>
		<!--  -->
		<div class="ml-3 px-1 flex row gap-2">
			<template v-if="page === 1">
				<div @click="refreshFalse()" class="btn rounded-full">
					<i class="xicon-material xicon-material-ChangeCircleRound"></i>
				</div>
				<div @click="refreshAll()" class="btn rounded-full">
					<i class="xicon-material xicon-material-RefreshRound"></i>
				</div>
			</template>
			<!--  -->
			<template v-if="page === 2">
				<div @click="deleteThis()" class="btn rounded-full">
					<i class="xicon-material xicon-material-DeleteRound"></i>
				</div>
				<div @click="editThis()" class="btn rounded-full">
					<i class="xicon-material xicon-material-EditRound"></i>
				</div>
				<div @click="refreshThis()" class="btn rounded-full">
					<i class="xicon-material xicon-material-RefreshRound"></i>
				</div>
			</template>
			<!--  -->
			<template v-if="page === 3">
				<div></div>
			</template>
			<!--  -->
			<template v-if="page === 4">
				<div></div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		page: number
	}>()
	import { Mcdata } from '@/core/handle'
	import { appStatus } from '@/provider';
	// 1
	function refreshFalse() {
		Mcdata.refreshFalse()
	}
	function refreshAll() {
		Mcdata.refreshAll()
	}
	// 2
	function deleteThis() {
		if (!appStatus.activeUUID) return
		Mcdata.delete(appStatus.activeUUID)
	}
	function editThis() {
		if (!appStatus.activeUUID) return
		appStatus.isEditing = true;
	}
	function refreshThis() {
		if (!appStatus.activeUUID) return
		Mcdata.queryOne(appStatus.activeUUID)
	}
	// 3

	// 4
</script>
<style scoped>
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn i {
		transition: scale 0.3s ease-in-out;
		font-size: 1.5rem !important;
	}

	.btn:hover i {
		scale: 1.2;
	}
</style>