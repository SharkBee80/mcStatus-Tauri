<template>
	<Toast position="top-center" :pt="{ root: { class: 'max-w-4/5' } }" />
	<float>
		<ConfirmDialog :pt="{
			root: { class: 'w-1/2 min-w-75 max-w-100' },
			header: { class: 'p-4 pb-0' },
			content: { class: 'p-4' },
			footer: { class: 'p-2 justify-evenly' }
		}"></ConfirmDialog>
		<transition>
			<div v-show="appStatus.isDragging"
				class="trash float-btn flex rounded-xl cursor-pointer bg-red-700 hover:bg-red-900">
				<div ref="trashCan" class="size-full z-1 flex justify-center items-center"></div>
				<div class="absolute size-full flex justify-center items-center">
					<i class="a xicon-fluent text-4xl! xicon-fluent-Delete24Filled"></i>
					<i class="b hidden xicon-fluent text-4xl! xicon-fluent-DeleteDismiss24Regular"></i>
				</div>
			</div>
		</transition>
		<Button v-if="!appStatus.isDragging" class="float-btn rounded-xl" icon="xicon-fluent xicon-fluent-Add24Filled"
			raised @click="appStatus.isAdding = true"></Button>
	</float>
</template>

<script setup lang="ts">
	import Button from 'primevue/button';
	import Toast from 'primevue/toast';
	import ConfirmDialog from 'primevue/confirmdialog';
	import float from "@/vue/layouts/float.vue";
	import { onMounted, ref } from 'vue';
	import Sortable from 'sortablejs';
	import { serversStatus, appStatus } from "@/provider";
	import { useToast } from "primevue/usetoast";
	import { useConfirm } from "primevue/useconfirm";
	import { Mcdata } from '@/core/handle';
	import { useTranslation } from 'i18next-vue';
	const { t } = useTranslation();
	const toast = useToast();
	const confirm = useConfirm();

	const trashCan = ref();

	onMounted(() => {
		trash();
	});

	/////////////////////////////////////////////////////////////////
	function trash() {
		const el: HTMLElement = trashCan.value;
		const options: Sortable.Options = {
			group: {
				name: 'trash',
				pull: false,
				put: true
			},
			ghostClass: 'sortable-ghost',
			swapThreshold: 0,
			onAdd(e) {
				e.item.remove();
				// check if the mouse is inside the target
				const rect = e.to.getBoundingClientRect();
				// @ts-ignore
				const oe: PointerEvent = e.originalEvent;
				const inside = oe.clientX >= rect.left && oe.clientX <= rect.right &&
					oe.clientY >= rect.top && oe.clientY <= rect.bottom;
				if (!inside) return
				// main logic
				const index = e.oldIndex 		 // 原索引
				if (index === null || index === undefined) return
				const id = e.item.getAttribute('uuid')
				confirmDelete(id, index);
			},
		};
		new Sortable(el, options)
	};
	/////////////////////////////////////////////////////////////////////
	const confirmDelete = (uuid: string | null, index: number) => {
		confirm.require({
			message: t('home-remove-msg'),
			header: t('home-remove-title'),
			icon: 'xicon-fluent xicon-fluent-DeleteDismiss24Regular',
			rejectProps: {
				label: 'Cancel',
				severity: 'secondary',
				outlined: true
			},
			acceptProps: {
				label: 'Delete',
				severity: 'danger'
			},
			accept: () => {
				if (uuid) Mcdata.delete(uuid)
				else {
					const uuid = serversStatus[index].uuid
					Mcdata.delete(uuid)
				}

				toast.add({ severity: 'info', summary: 'Server Delete', life: 3000 });
			},
			reject: () => {
				toast.add({ severity: 'error', summary: 'Cancel', life: 3000 });
			}
		});
	};
</script>
<style scoped>
	.float-btn {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		width: 4rem;
		padding: 0;
		aspect-ratio: 1;
	}

	.trash:hover .a {
		display: none;
	}

	.trash:hover .b {
		display: block;
	}

	:deep(.sortable-ghost) {
		display: none;
		opacity: 0;
		pointer-events: none;
	}
</style>