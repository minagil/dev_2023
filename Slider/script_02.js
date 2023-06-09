const Slider = function (element) {
	let uicarousel_btn_prev = null;
	let uicarousel_btn_next = null;
	let uicarousel_container = null;
	let uicarousel_items = [];
	let currentIndex = null;
	let index = 0;

	const createClones = () => {
		const nodes = Array.from(uicarousel_items);
		nodes.forEach((node) => {
			const clone = node.cloneNode(true);
			clone.setAttribute("class", "uicarousel_item");
			uicarousel_container.append(clone);
		});
		nodes.reverse().forEach((node) => {
			const clone = node.cloneNode(true);
			clone.setAttribute("class", "uicarousel_item");
			uicarousel_container.prepend(clone);
		});
	};

	const getIndex = () => {
		uicarousel_items.forEach((uicarousel_item, idx) => {
			if (uicarousel_item.classList.contains("current")) {
				index = idx;
			}
		});
		return index;
	};

	const setItemIndex = () => {
		const _index = getIndex();
		// console.log(_index);
		moveToslide(_index);
	};

	const setItems = () => {
		uicarousel_container.style.transform = `translateX(0)`;
	};

	const nextToslide = () => {
		if (currentIndex >= uicarousel_items.length - 1) {
			moveToslide(0);
		} else {
			moveToslide(currentIndex + 1);
		}
	};

	const prevToslide = () => {
		if (currentIndex === 0) {
			moveToslide(uicarousel_items.length - 1);
		} else {
			moveToslide(currentIndex - 1);
		}
	};

	const moveToslide = (index) => {
		const currentItems =
			uicarousel_container.querySelectorAll(".uicarousel_item")[index];
		const ItemWidth =
			uicarousel_container.querySelectorAll(".uicarousel_item")[0].offsetWidth;
		const active = uicarousel_container.querySelector(".current");

		uicarousel_container.style.transform = `translateX(-${
			ItemWidth * index
		}px)`;

		if (active) active.classList.remove("current");
		currentItems.classList.add("current");

		currentIndex = index;
	};

	const setButton = () => {
		uicarousel_btn_next.addEventListener("click", () => {
			nextToslide();
		});
		uicarousel_btn_prev.addEventListener("click", () => {
			prevToslide();
		});
	};

	const init = () => {
		uicarousel_btn_prev = element.querySelector(".uicarousel_btn_prev") || null;
		uicarousel_btn_next = element.querySelector(".uicarousel_btn_next") || null;
		uicarousel_container = element.querySelector(".uicarousel_items") || null;
		uicarousel_items = element.querySelectorAll(".uicarousel_item") || null;

		createClones();
		setItemIndex();
		setItems();

		if (uicarousel_btn_next || uicarousel_btn_prev) {
			setButton();
		}
	};

	init();
};

const mainSlider = new Slider(document.querySelector(".uicarousel"));
