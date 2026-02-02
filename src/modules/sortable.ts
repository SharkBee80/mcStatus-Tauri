// import Sortable from "sortablejs";

// const s: Sortable.Options = {
// 	group: 'name', // 如果两个列表的 group 名称相同，它们可以相互拖拽。
// 	sort: true, // 是否允许在列表内部进行排序（如果设为 false，该列表只能作为源或目标，不能改变自身内部顺序）。
// 	delay: 0, // 定义鼠标按下多久后才开始拖拽（单位：毫秒），防止误触发。
// 	delayOnTouchOnly: false, // 仅在移动端（触摸屏）开启延迟。
// 	touchStartThreshold: 0, //  灵敏度。在延迟期间，如果手指移动超过该像素值，则取消拖拽。
// 	disabled: false, // Disables the sortable if set to true.
// 	store: undefined,  // @see Store 用于持久化排序（如存入 localStorage）。
// 	animation: 150,  // 排序时的动画时长（毫秒）。
// 	easing: "cubic-bezier(1, 0, 0, 1)", // 动画过渡曲线（如 cubic-bezier），控制移动效果的平滑度。See https://easings.net/ for examples.
// 	handle: ".my-handle",  // 指定拖拽手柄的选择器。只有点击此区域才能开始拖拽。
// 	filter: ".ignore-elements",  // 指定哪些元素不能被拖拽（如具有某个 class 的元素）。
// 	preventOnFilter: true, // 当点击被过滤的元素时，是否调用 preventDefault()。
// 	draggable: ".item",  // 指定列表中哪些子元素是可以被拖拽的。

// 	dataIdAttr: 'data-id', // 调用 toArray() 方法时，读取哪个 HTML 属性作为 ID。

// 	ghostClass: "sortable-ghost",  // 占位符样式。当你拖起一个元素时，留在原地的那个“虚影”的类名。
// 	chosenClass: "sortable-chosen",  // 被选中项样式。鼠标按下准备拖动时的类名。
// 	dragClass: "sortable-drag",  // 拖拽跟随样式。鼠标移动过程中，悬浮在鼠标下的那个元素的类名。

// 	swapThreshold: 1, // 交换阈值（0到1）。决定鼠标移动到目标元素多少比例时触发位置交换。
// 	invertSwap: false, // 设为 true 会始终开启“反向交换”逻辑。
// 	invertedSwapThreshold: 1, // 反向交换的阈值。
// 	direction: 'horizontal', // 拖拽方向。可以是 'horizontal'（水平）或 'vertical'（垂直）。如果不设置，插件会自动检测。

// 	forceFallback: false,  // 强制使用非原生的回退机制（通常为了更统一的跨浏览器样式）。

// 	fallbackClass: "sortable-fallback",  // 开启回退机制时，克隆出来的跟随鼠标移动元素的类名。
// 	fallbackOnBody: false,  // 是否将拖拽元素挂载到 body 下。
// 	fallbackTolerance: 0, // 鼠标移动多少像素后才触发拖拽（防止点击时产生轻微位移导致误拖拽）。

// 	dragoverBubble: false,
// 	removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
// 	emptyInsertThreshold: 5, // px, distance mouse must be from empty sortable to insert drag element into it


// 	setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
// 		dataTransfer.setData('Text', dragEl.textContent); // HTML5 拖拽事件中的 dataTransfer.setData，用于设置传递的数据。
// 	},

// 	// 元素被点击选中时。
// 	onChoose: function (/**Event*/evt) {
// 		evt.oldIndex;  // element index within parent
// 	},

// 	// Element is unchosen
// 	onUnchoose: function (/**Event*/evt) {
// 		// same properties as onEnd
// 	},

// 	//拖拽正式开始时。
// 	onStart: function (/**Event*/evt) {
// 		evt.oldIndex;  // element index within parent
// 	},

// 	// 拖拽完成松开鼠标时（最常用，用于处理最终状态）。
// 	onEnd: function (/**Event*/evt) {
// 		var itemEl = evt.item;  // dragged HTMLElement
// 		evt.to;    // target list
// 		evt.from;  // previous list
// 		evt.oldIndex;  // element's old index within old parent
// 		evt.newIndex;  // element's new index within new parent
// 		evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
// 		evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
// 		evt.clone // the clone element
// 		evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
// 	},

// 	// 一个元素从别的列表被拖入本列表时。
// 	onAdd: function (/**Event*/evt) {
// 		// same properties as onEnd
// 	},

// 	// 在本列表内通过拖拽改变了位置。
// 	onUpdate: function (/**Event*/evt) {
// 		// same properties as onEnd
// 	},

// 	// 只要列表顺序发生了任何变化（无论本列表排序、新增、移除）都会触发。
// 	onSort: function (/**Event*/evt) {
// 		// same properties as onEnd
// 	},

// 	// 元素从本列表被拖走放入别的列表时。
// 	onRemove: function (/**Event*/evt) {
// 		// same properties as onEnd
// 	},

// 	// 点击了被 filter 排除的元素时触发。
// 	onFilter: function (/**Event*/evt) {
// 		var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
// 	},

// 	// 拖拽过程中，元素每次移动位置实时触发。可以通过 return false 拦截特定位置的放置。
// 	onMove: function (/**Event*/evt, /**Event*/originalEvent) {
// 		// Example: https://jsbin.com/nawahef/edit?js,output
// 		evt.dragged; // dragged HTMLElement
// 		evt.draggedRect; // DOMRect {left, top, right, bottom}
// 		evt.related; // HTMLElement on which have guided
// 		evt.relatedRect; // DOMRect
// 		evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
// 		// @ts-ignore
// 		originalEvent.clientY; // mouse position
// 		// return false; — for cancel
// 		// return -1; — insert before target
// 		// return 1; — insert after target
// 		// return true; — keep default insertion point based on the direction
// 		// return void; — keep default insertion point based on the direction
// 	},

// 	// 当 group 设置为 clone 模式并创建副本时触发。
// 	onClone: function (/**Event*/evt) {
// 		var origEl = evt.item;
// 		var cloneEl = evt.clone;
// 	},

// 	// 拖拽过程中，当元素在列表中的索引发生变化时触发。
// 	onChange: function (/**Event*/evt) {
// 		evt.newIndex // most likely why this event is used is to get the dragging element's current index
// 		// same properties as onEnd
// 	}
// }

// const ops: Sortable.Options = {
// 	group: 'name',
// 	delay: 0,
// 	delayOnTouchOnly: false,
// 	touchStartThreshold: 0,
// 	disabled: false,
// 	store: undefined,
// 	animation: 150,
// 	easing: "cubic-bezier(1, 0, 0, 1)",
// 	handle: ".my-handle",
// 	filter: ".ignore-elements",
// 	preventOnFilter: true,
// 	draggable: ".item",
// 	//
// 	dataIdAttr: 'data-id',
// 	//
// 	ghostClass: "sortable-ghost",
// 	chosenClass: "sortable-chosen",
// 	dragClass: "sortable-drag",
// 	//
// 	swapThreshold: 1,
// 	invertSwap: false,
// 	invertedSwapThreshold: 1,
// 	direction: 'horizontal',
// 	//
// 	forceFallback: false,
// 	//
// 	fallbackClass: "sortable-fallback",
// 	fallbackOnBody: false,
// 	fallbackTolerance: 0,
// 	//
// 	dragoverBubble: false,
// 	removeCloneOnHide: true,
// 	emptyInsertThreshold: 5,
// 	//
// 	setData(dataTransfer, dragEl) {
// 		dataTransfer.setData('Text', dragEl.textContent);
// 	},
// 	//
// 	onChoose(e) {
// 		console.log('onChoose', e);
// 	},
// 	onUnchoose(e) {
// 		console.log('onUnchoose', e);
// 	},
// 	onStart(e) {
// 		console.log('onStart', e);
// 	},
// 	onEnd(e) {
// 		var itemEl = e.item;
// 		e.to;
// 		e.from;
// 		e.oldIndex;
// 		e.newIndex;
// 		e.oldDraggableIndex;
// 		e.newDraggableIndex;
// 		e.clone
// 		e.pullMode;
// 		console.log('onEnd', e);
// 	},
// 	//
// 	onAdd(e) {
// 		console.log('onAdd', e);
// 	},

// 	onUpdate(e) {
// 		console.log('onUpdate', e);
// 	},

// 	onSort(e) {
// 		console.log('onSort', e);
// 	},

// 	onRemove(e) {
// 		console.log('onRemove', e);
// 	},

// 	onFilter(e) {
// 		console.log('onFilter', e);
// 	},

// 	onMove(e, originalEvent) {
// 		// e.dragged; // dragged HTMLElement
// 		// e.draggedRect; // DOMRect {left, top, right, bottom}
// 		// e.related; // HTMLElement on which have guided
// 		// e.relatedRect; // DOMRect
// 		// e.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
// 		// originalEvent.clientY; // mouse position
// 		console.log('onMove', e, originalEvent);
// 	},
// 	onClone(e) {
// 		var origEl = e.item;
// 		var cloneEl = e.clone;
// 		console.log('onClone', e);
// 	},

// 	onChange(e) {
// 		console.log('onChange', e);
// 	}
// }