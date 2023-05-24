const Slider = function (element) {
	let uicarousel_btn_prev = null;
	let uicarousel_btn_next = null;
	let uicarousel_container = null;
	let uicarousel_item = null;
	let index = 0;
	let currentIndex = 0;

	const getIndex = () => {
		const uicarousel_items = Array.from(
			uicarousel_container.querySelectorAll(".uicarousel_item")
		);
		uicarousel_items.forEach((uicarousel_item, idx) => {
			if (uicarousel_item.classList.contains("current")) {
				index = idx;
			}
		});
		return index;
	};

	const setItems = () => {
		uicarousel_container.style.transform = `translateX(0)`;
		const nodes = Array.from(
			uicarousel_container.querySelectorAll(".uicarousel_item")
		);

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

	const nextToslide = () => {
		const uicarousel_items = Array.from(
			uicarousel_container.querySelectorAll(".uicarousel_item")
		);
		const targetIndex = getIndex();

		if (currentIndex >= uicarousel_items.length - 1) {
			moveToslide(0);
		} else {
			moveToslide(targetIndex + 1);
		}
	};

	const prevToslide = () => {
		const uicarousel_items = Array.from(
			uicarousel_container.querySelectorAll(".uicarousel_item")
		);
		const targetIndex = getIndex();
    
		if (currentIndex === 0) {
      moveToslide(uicarousel_items.length - 1);
		} else {
      moveToslide(targetIndex - 1);
		}
	};

	const moveToslide = (step) => {
		const currentItems =
			uicarousel_container.querySelectorAll(".uicarousel_item")[step];
		const active = uicarousel_container.querySelector(".current");

		if (active) {
			active.classList.remove("current");
		}

		currentItems.classList.add("current");

		currentIndex = step;
	};

	const onHandlerEvent = () => {
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
		uicarousel_item = element.querySelectorAll(".uicarousel_item")[0] || null;

		setItems();

		if (uicarousel_btn_next || uicarousel_btn_prev) {
			onHandlerEvent();
		}
	};

	init();
};

const mainSlider = new Slider(document.querySelector(".uicarousel"));
