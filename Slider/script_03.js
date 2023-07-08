const Slider = function (element) {
	let uicarousel_btn_prev = null;
	let uicarousel_btn_next = null;
	let uicarousel_container = null;
	let itemWidth = null;
	let slideLength = null;
	let uicarousel_items = [];
	let currentIndex = 0;
	let index = 0;
	let isSliding = false;
	let isBtnWorking = false;

	const createClones = () => {
		const nodes = Array.from(uicarousel_items);
		nodes.forEach((node) => {
			const clone = node.cloneNode(true);
			clone.classList.add("clone");
			uicarousel_container.append(clone);
		});
		nodes.reverse().forEach((node) => {
			const clone = node.cloneNode(true);
			clone.classList.add("clone");
			uicarousel_container.prepend(clone);
		});
	};

	const updateItemWidth = () => {
		const newItemLength = Array.from(uicarousel_container.children).length;
		const totalWidthItem = itemWidth * newItemLength;
		uicarousel_container.style.width = `${totalWidthItem}px`;
	};

	const setInitialItemPos = () => {
		const cloneItems = Array.from(uicarousel_container.children);
		const items = cloneItems.filter(
			(cloneItem) => !cloneItem.classList.contains("clone")
		);
		const currentItemWidth = itemWidth * items.length;
		uicarousel_container.style.transform = `translateX(${-currentItemWidth}px)`;
		items[0].classList.add("current");
	};

	const moveToslide = (step) => {
		if (isSliding) return;
		isSliding = true;
		setTimeout(() => {
			isSliding = false;
		}, 500);

		uicarousel_container.style.transition = "0.5s";
		uicarousel_container.style.left = `${-step * itemWidth}px`;

		currentIndex = step;

		uicarousel_container.addEventListener("transitionend", () => {
			uicarousel_container.style.transition = "0s";
			uicarousel_container.style.left = `${-currentIndex * itemWidth}`;
		});

		console.log(currentIndex, step);
	};

	const prevToSlide = () => {
		const minIndex = -(slideLength - 1);
		if (currentIndex <= minIndex) {
			console.log("ddd");
			setTimeout(() => {
				uicarousel_container.style.transition = "0s";
				uicarousel_container.style.left = "0px";
				currentIndex = 0;
			}, 500);
		}
		moveToslide(currentIndex - 1);
	};

	const nextToSlide = () => {
		if (currentIndex >= slideLength - 1) {
			setTimeout(() => {
				uicarousel_container.style.transition = "0s";
				uicarousel_container.style.left = "0px";
				currentIndex = 0;
			}, 500);
		}
		moveToslide(currentIndex + 1);
	};

	const setButton = () => {
		uicarousel_btn_next.addEventListener("click", () => {
			if (isBtnWorking) return;
			isBtnWorking = true;

			setTimeout(() => {
				nextToSlide();
				isBtnWorking = false;
			});
		});
		uicarousel_btn_prev.addEventListener("click", () => {
			if (isBtnWorking) return;
			isBtnWorking = false;

			setTimeout(() => {
				prevToSlide();
			});
		});
	};

	const init = () => {
		uicarousel_btn_prev = element.querySelector(".uicarousel_btn_prev") || null;
		uicarousel_btn_next = element.querySelector(".uicarousel_btn_next") || null;
		uicarousel_container = element.querySelector(".uicarousel_items") || null;
		uicarousel_items = element.querySelectorAll(".uicarousel_item") || null;
		itemWidth = uicarousel_items[0].offsetWidth;
		slideLength = uicarousel_items.length;

		createClones();
		updateItemWidth();
		setInitialItemPos();

		if (uicarousel_btn_next || uicarousel_btn_prev) {
			setButton();
		}
	};

	init();
};

const mainSlider = new Slider(document.querySelector(".uicarousel"));
