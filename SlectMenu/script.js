const SelectMenuDropDown = function (el) {
	let selectmenuTitle = null;
	let selectmenuList = null;
	const _this = this;
	let isOpen = false;
	let index = 0;

	this.open = function () {
		selectmenuList.style.display = "block";
	};

	this.close = function () {
		selectmenuList.style.display = "none";
	};

	function getIndex() {
		return index;
	}

	function setIndex(idx) {
		index = idx;
	}

	function setTitle() {
		selectmenuTitle.addEventListener("click", function () {
			if (!isOpen) {
				_this.open();
				isOpen = true;
			} else {
				_this.close();
				isOpen = false;
			}
		});
	}

	function setList() {
		selectmenuList.style.display = "none";
		const nodes = Array.from(selectmenuList.children);
		nodes.forEach(function (node, idx) {
			node.addEventListener("click", function () {
				setIndex(idx);
				setChangeIndex();
			});
		});
	}

	function setChangeIndex() {
		const result = getIndex();
		console.log(result);
	}

	function init() {
		selectmenuTitle = el.querySelector(".selectmenu_title") || null;
		selectmenuList = el.querySelector(".selectmenu_list") || null;

		setTitle();
		setList();
	}

	init();
};
