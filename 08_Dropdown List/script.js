const dropdownContainers = document.querySelectorAll('.dropdown-container');

    const closeAllDropdown = function (element) {
        const dropdowns = document.querySelectorAll('.dropdown');
        const selectItems = document.querySelectorAll('.list-items');
        const searchField = document.querySelectorAll('.dropdown__search');
        for (let i = 0; i < dropdowns.length; i++) {
            if (element == dropdowns[i]) {
                dropdowns[i].classList.toggle('focus');
                selectItems[i].classList.toggle('hide');
            } else if (element.path && element.path[2] == searchField[i]) {
                break;                
            } else {
                dropdowns[i].classList.remove('focus');
                selectItems[i].classList.add('hide');
            }
        }
    }

    const updateListToSelectBox = function (element) {
        // Find selectBox in dropdown-container
        let selectBox = element.parentNode.parentNode.querySelector('select');
        let dropdown = element.parentNode.previousSibling;

        // Check each item in select box
        for (let i = 0; i < selectBox.length; i++) {
            if (selectBox.options[i].innerHTML == element.innerHTML) {
                selectBox.selectedIndex = i;
                dropdown.innerHTML = element.innerHTML;
                // Clear state of old element 
                let prevSelect = element.parentNode.querySelector('.same-as-selected');
                if (prevSelect) {
                    prevSelect.classList.remove('same-as-selected');
                }
                // Add state of current select item
                element.classList.add('same-as-selected');
                break;
            }
        }
    }

    const getValidItems = function(data, element) {
        let listItems = element.parentNode.querySelectorAll('.item');
        
        listItems.forEach(function (item) {
            if (item.innerHTML.includes(data)) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    }

    const plusItem = function (position, element) {
        let listItems = element.parentNode.querySelectorAll('.item');
        for (let i = 0; i < listItems.length; i++) {
            let currentPos = i + position;
            if (listItems[i].classList.contains('same-as-selected')) {
                if ( currentPos >= 0 && currentPos < listItems.length) {
                    listItems[i].classList.remove('same-as-selected');
                    listItems[currentPos].classList.add('same-as-selected');
                }
                break;
            } else if (i + 1 == listItems.length) {
                listItems[0].classList.add('same-as-selected');
            }
        }
    }

    const submitCurrentPos = function (element) {
        element.parentNode.querySelector('.same-as-selected').click();
    }

    const searchHandle = function(key, element) {
        switch (key) {
            case 'ArrowUp':
                plusItem(-1, element); break;
            case 'ArrowDown':
                plusItem(+1, element); break;
            case 'NumpadEnter':  
            case 'Enter':
                submitCurrentPos(element); break;
            default: {
                let input = element.childNodes[0].childNodes[0];
                getValidItems(input.value, element);
            }
        }
    }

    for (let i = 0; i < dropdownContainers.length; i++) {
        let selectBox = dropdownContainers[i].querySelector('select');

        let search = document.createElement("div");
        search.classList.add('dropdown__search');
        search.innerHTML = '<div class="search-icon" aria-hidden="true" data-icon="&#x55;"><input type="text"></div>';
        search.addEventListener('keydown', function(e) { 
            if (e.code == 'NumpadEnter' || e.code == 'Enter') {
                e.preventDefault();
            }
        });

        search.addEventListener('keyup', function(e) { 
            searchHandle(e.code, this); 
        });

        let dropdownIcon = document.createElement("div");
        dropdownIcon.setAttribute('aria-hidden', 'true');
        dropdownIcon.setAttribute('data-icon', 'C');
        dropdownIcon.classList.add('dropdown__icon');

        /* Create a new DIV that will act as the selected item list: */
        let dropdown = document.createElement("div");
        dropdown.classList.add('dropdown');
        dropdown.innerHTML = selectBox.options[selectBox.selectedIndex].innerHTML;
        dropdownContainers[i].appendChild(dropdownIcon);
        dropdownContainers[i].appendChild(dropdown);

        /* Create a new DIV that will contain the option list: */
        let optionList = document.createElement("div");
        optionList.classList.add('list-items', 'hide');
        optionList.appendChild(search);

        for (let j = 0; j < selectBox.length; j++) {
            /* Create a new DIV that will act as an item: */
            let item = document.createElement("div");
            item.classList.add('item');
            item.innerHTML = selectBox.options[j].innerHTML;
            if (j == selectBox.options.selectedIndex) {
                item.classList.add('same-as-selected'); 
            }

            /* Update the original select box, and the selected item:*/
            item.addEventListener('click', function (event) { updateListToSelectBox(event.target) });
            optionList.appendChild(item);
        }
        
        optionList.addEventListener('mouseenter', function () {
            let selectedItem = this.querySelector('.same-as-selected');
            if (selectedItem) {
                selectedItem.classList.remove('same-as-selected');
            }
        });

        dropdownContainers[i].appendChild(optionList);

        dropdown.addEventListener('click', function(event) {
            /* when the select box is clicked, close any other select boxes,
               and open/close the current select box:*/
            event.stopPropagation();
            closeAllDropdown(this);
            this.nextSibling.querySelector('input').focus();
        });
    }

    /* if the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener('click', closeAllDropdown);