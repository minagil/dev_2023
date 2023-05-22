const Tab = function (el) {
	let tabs_link_buttons = null;
	let tabs_panels = null;
	let index = 0;

	function getIndex() {
		return index;
	}

	function setIndex(element) {
		const tabs_items = el.querySelectorAll(".tabs_list_item");
		for (let i = 0; i < tabs_items.length; i++) {
			if (tabs_items[i] === element) {
				return (index = i);
			}
		}
	}

	function onHandlerTab() {
		const tabs_list = el.querySelector(".tabs_list");
		tabs_list.addEventListener("click", function (e) {
			const targetId = e.target;
			setIndex(targetId.parentElement);
			hiOrder(onTabActive)(getIndex);
		});
	}

	function hiOrder(func) {
		return function () {
			return func(index);
		};
	}

	function onTabActive(index) {
		const _index = index;
		const tabs_items = el.querySelectorAll(".tabs_list_item");

		[...tabs_items, ...tabs_panels].forEach((tabs_content) =>
			tabs_content.classList.remove("active")
		);

		// for (let i = 0; i < tabs_items.length; i++) {
		// 	tabs_items[i].classList.remove("active");
		// 	tabs_panels[i].classList.remove("active");
		// }

		tabs_items[_index].classList.add("active");
		tabs_panels[_index].classList.add("active");
	}

	function init() {
		tabs_link_buttons = el.querySelectorAll(".tabs_link_button") || null;
		tabs_panels = el.querySelectorAll(".tabs_panel") || null;

		onHandlerTab();
	}

	init();
};
