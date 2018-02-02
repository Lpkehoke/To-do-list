'use strict'
//Перетаскивание на телефоне
//Перетаскивание записей
//СДелать сворачивание на зеленый кружок
//Сделать запись в local storage
window.onload = function () {

	let WRAPPER = document.querySelector('.wrapper');
	let POP_UP_BG = document.querySelector('.pop-up-meny');

	document.querySelector('.btn-for-new-column').onclick = function () {
		let column = new Column (document.querySelector('.title-new-column').value);

		column.obj.onmousedown = function (e) {
			if (e.target !== column.obj) return;

			let startLeft = column.obj.getBoundingClientRect().left;
			let emptyDiv = document.createElement('div');

			emptyDiv.className = 'empty-div';

			WRAPPER.insertBefore(emptyDiv , column.obj);

			column.obj.style.position = 'absolute';
			column.obj.style.zIndex = 100;

			WRAPPER.appendChild(column.obj);

			moveAt(e);

			document.onmousemove = function(e) {
				moveAt(e);
			};

			column.obj.onmouseup = function() {
				WRAPPER.insertBefore(column.obj, emptyDiv);
				column.obj.style.position = 'relative';
				column.obj.style.left = 0;
				column.obj.style.top = 0;
				column.obj.style.zIndex = 1;
				emptyDiv.remove();
				document.onmousemove = null;
				column.obj.onmouseup = null;
			};

			function moveAt(e) {
				if (e.pageX < startLeft && e.pageX > 16) {
					let pred = emptyDiv.previousElementSibling;

					emptyDiv.remove();
					WRAPPER.insertBefore(emptyDiv, pred);
					startLeft -= 256;
				};

				if (e.pageX > startLeft + 256 && e.pageX < WRAPPER.lastElementChild.previousElementSibling.getBoundingClientRect().left) {
					let post = emptyDiv.nextElementSibling.nextElementSibling;

					emptyDiv.remove();
					WRAPPER.insertBefore(emptyDiv, post);

					startLeft += 256;
				};

				column.obj.style.left = e.pageX - column.obj.offsetWidth / 2 + 'px';
				column.obj.style.top = e.pageY - column.obj.offsetHeight / 2 + 'px';
			};
		};

		WRAPPER.insertBefore(column.obj , document.querySelector('.div-for-new-column'));

		console.log(column.obj.firstElementChild);
		let ourTitle = column.obj.firstElementChild;

		ourTitle.style.height = ( 3 + ourTitle.scrollHeight ) + "px";
		console.log('oshibka');

		column.obj.querySelector('.form__btn').onclick = function () {
			let content = column.obj.querySelector('.textarea');
			let	obj = new Note (content.value, column.obj);
			content.value = '';
			let textarea = column.obj.querySelector('.form__textarea');
			textarea.style.height = "";
			textarea.style.height = ( 3 + textarea.scrollHeight ) + "px";
		};


		document.querySelector('.title-new-column').value = '';
	};

	function Column (title) {
		if (!title) title  = 'Title';
		let contextCol = this;

		contextCol.title = title;

		let divNotes = document.createElement('div');
		let	form = document.createElement('div');
		let	textareaCol = document.createElement('textarea');
		let	button = document.createElement('button');
		let	mainColumn = document.createElement('div');
		let	hTitle = document.createElement('textarea');

		let removeBtn = new Button('remove' , {mainProperty: mainColumn});

		hTitle.innerHTML = title;
		hTitle.className = 'title-default';

		hTitle.onkeyup = function () {
			hTitle.style.height = "";
			hTitle.style.height = ( 3 + hTitle.scrollHeight ) + "px";
		};

		divNotes.className = 'notes';
		form.className = 'form';
		textareaCol.className = 'form__textarea textarea';
		button.className = 'form__btn';
		mainColumn.className = 'column-note';

		button.innerHTML = 'Create';

		textareaCol.onkeyup = function () {
			textareaCol.style.height = "";
			textareaCol.style.height = ( 3 + textareaCol.scrollHeight ) + "px";
		};

		mainColumn.style.background = getColor();

		form.appendChild(textareaCol);
		form.appendChild(button);
		mainColumn.appendChild(hTitle);
		mainColumn.appendChild(removeBtn);
		mainColumn.appendChild(divNotes);
		mainColumn.appendChild(form);
		contextCol.obj = mainColumn;

		function getColor () {
			let red	= Math.round(Math.random() * 257 - 0.5);
			let	green = Math.round(Math.random() * 257 - 0.5);
			let	blue = Math.round(Math.random() * 257 - 0.5);
			let	color = '#' +
							(red = (red > 16) ? red.toString(16) : '0' + red.toString(16)) +
							(green = (green > 16) ? green.toString(16) : '0' + green.toString(16)) +
							(blue = (blue > 16) ? blue.toString(16) : '0' + blue.toString(16));
			return color;
		};
	};

	function Note (str, parent) {
		if (!str) str = 'New note';
		let context = this;
		let	div = document.createElement('div');
		let	divContent = document.createElement('div');
		context.content = str;

		divContent.className = 'notes__note';

		divContent.innerHTML = str;

		let removeBtn = new Button('remove' , {mainProperty: div});
		let editBtn = new Button('edit' , {h: divContent , context: context.content});

		divContent.onclick = function () {
			popUp('edit');
			let textarea = document.querySelector('.edit-textarea');
			textarea.value = context.content;
			document.querySelector('.save').onclick = function () {
				return function () {
					divContent.innerHTML = textarea.value;
					context.content = textarea.value;
					POP_UP_BG.style.display = 'none';
				};
			}();
		};

		div.appendChild(removeBtn);
		div.appendChild(editBtn);
		div.appendChild(divContent);
		parent.querySelector('.notes').appendChild(div);
	};

	function Button (type, obj) {
		let btn = document.createElement('button');
		let menu = document.querySelector('.pop-up-meny'); //c латинского - мену

		if (type === 'remove') {
			btn.className = 'remove-note';
			btn.innerHTML = '&#10060';

			btn.onclick = function () {
				popUp(type);
				let removeBtn = document.getElementsByClassName('remove__btn');

				removeBtn[0].onclick = function () {
					obj.mainProperty.remove();
					menu.style.display = 'none';
				};
				removeBtn[1].onclick = function () {
					menu.style.display = 'none';
				};
			};
		} else if (type === 'edit') {
			btn.className = 'edit-note';
			btn.innerHTML = '...';
		};
		return btn;

		};


	function popUp (type) {
		let menu = document.querySelector('.pop-up-meny');

		POP_UP_BG.style.display = 'block';
		menu.setAttribute('data-status', type);
		let contentPopUp = menu.getElementsByClassName('pop-up__element');

		if (type === 'edit') { /// костыль!! нужно убрать!!***********************
			contentPopUp[1].style.display = 'none';
			contentPopUp[0].style.display = 'flex';
		}
		else if (type === 'remove') {
			contentPopUp[0].style.display = 'none';
			contentPopUp[1].style.display = 'flex';
		}

		document.querySelector('.pop-up__bg').onclick = function () {
			POP_UP_BG.style.display = 'none';
		};
	};

};