const Slider = function (element) {
	let uicarousel_btn_prev = null;
	let uicarousel_btn_next = null;
	let uicarousel_container = null;
	let uicarousel_item = null;
	let index = 0;
	let currentIndex = 0;

	function getIndex() {
		const uicarousel_items =
			uicarousel_container.querySelectorAll(".uicarousel_item");
		for (let i = 0; i < uicarousel_items.length; i++) {
			if (uicarousel_items[i].classList.contains("current")) {
				return (index = i);
			}
		}
	}

	function prevToslide() {
		const targetIndex = getIndex();
		if (currentIndex === 0) {
			return false;
		}

		currentIndex = targetIndex - 1;

    updateItems();
	}

	function nextToslide() {
    const targetIndex = getIndex();

		const uicarousel_items = uicarousel_container.querySelectorAll(".uicarousel_item");
		if (currentIndex >= uicarousel_items.length - 1) {
			return false;
		}

		currentIndex = targetIndex + 1;

    updateItems();
	}

	function updateItems() {
		const currentItems =
			uicarousel_container.querySelectorAll(".uicarousel_item")[currentIndex];
		const active = uicarousel_container.querySelector(".current");

		if (active) {
			active.classList.remove("current");
		}

		currentItems.classList.add("current");
	}

	function onHandlerEvent() {
		uicarousel_btn_next.addEventListener("click", function () {
			nextToslide();
		});

		uicarousel_btn_prev.addEventListener("click", function () {
			prevToslide();
		});
	}

	function init() {
		uicarousel_btn_prev = element.querySelector(".uicarousel_btn_prev") || null;
		uicarousel_btn_next = element.querySelector(".uicarousel_btn_next") || null;
		uicarousel_container = element.querySelector(".uicarousel_items") || null;
		uicarousel_item = element.querySelectorAll(".uicarousel_item")[0] || null;

		if (uicarousel_btn_next || uicarousel_btn_prev) {
			onHandlerEvent();
		}

		updateItems();
	}

	init();
};

const mainSlider = new Slider(document.querySelector(".uicarousel"));
