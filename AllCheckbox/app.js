const AllCheckBox = function(selector){
  const checkAllBox = document.querySelector(selector);
  const checkAll = checkAllBox.querySelector('.checkAll');
  const checkboxes = checkAllBox.querySelectorAll('input[name="skills"]');
  const checkedLists = [];
  
  checkAll.addEventListener('click', () => {
    const isChecked = checkAll.getAttribute('aria-checked');
    if(isChecked === 'false'){
      checkAll.setAttribute('aria-checked', 'true');
    }else{
      checkAll.setAttribute('aria-checked', 'false');
    }
  });

  checkboxes.forEach((checkbox, idx) => {
    checkbox.addEventListener('click', (e) => {
      if(e.target.checked){
        e.target.checked = true;
      }else{
        e.target.checked = false;
      }
      checkedLists.push(e.target);
      checkedFilter();
    });

  });

  function checkedFilter() {
    const newCheckLists = [];
    checkedLists.forEach((el) => {
			if (!newCheckLists.includes(el)) {
				newCheckLists.push(el);
			}
		});

		const checkList = newCheckLists.filter(
			(checkedList) => checkedList.checked === true
		);
    
		
    if (checkboxes.length === checkList.length) {
			checkAll.setAttribute("aria-checked", "true");
		} else {
			checkAll.setAttribute("aria-checked", "false");
		}
	}

}