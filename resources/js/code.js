'use strict';
//уведомление
//кружочки
//Перетаскивание на телефоне
//
window.onload = function () {

	let WRAPPER = document.querySelector('.wrapper');

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

		column.obj.querySelector('.form__btn').onclick = function () {
			let content = column.obj.querySelector('.textarea');
			let	obj = new Note (content.value, column.obj);
			content.value = '';
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
		let	hTitle = document.createElement('h3');

		let removeBtn = new Button('remove' , {mainProperty: mainColumn});
		let editBtn = new Button('edit' , {h: hTitle , context: contextCol.title});

		hTitle.innerHTML = title;

		divNotes.className = 'notes';
		form.className = 'form';
		textareaCol.className = 'form__textarea textarea';
		button.className = 'form__btn';
		mainColumn.className = 'column-note';

		button.innerHTML = 'Create';

		let red	= Math.round(Math.random() * 257 - 0.5);
		let	green = Math.round(Math.random() * 257 - 0.5);
		let	blue = Math.round(Math.random() * 257 - 0.5);
		let	color = '#' +
						(red = (red > 16) ? red.toString(16) : '0' + red.toString(16)) +
						(green = (green > 16) ? green.toString(16) : '0' + green.toString(16)) +
						(blue = (blue > 16) ? blue.toString(16) : '0' + blue.toString(16));

		mainColumn.style.background = color;

		form.appendChild(textareaCol);
		form.appendChild(button);
		mainColumn.appendChild(hTitle);
		mainColumn.appendChild(editBtn);
		mainColumn.appendChild(removeBtn);
		mainColumn.appendChild(divNotes);
		mainColumn.appendChild(form);
		contextCol.obj = mainColumn;
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

		div.appendChild(removeBtn);
		div.appendChild(editBtn);
		div.appendChild(divContent);
		parent.querySelector('.notes').appendChild(div);
	};

	function Button (type, obj) {
		let btn = document.createElement('button');
		if (type === 'remove') {
			btn.className = 'remove-note';
			btn.onclick = function () {
				obj.mainProperty.remove();
			};
		} else if (type === 'edit') {
			btn.className = 'edit-note';
			btn.onclick = function () {
				let textarea = document.querySelector('.edit-textarea');
				let	bg = document.querySelector('.pop-up-meny');
				textarea.value = obj.context;
				bg.style.display = 'block';
				document.querySelector('.save').onclick = function () {
					return function () {
						obj.h.innerHTML = textarea.value;
						obj.context = textarea.value;
						bg.style.display = 'none';
					};
				}();
				document.querySelector('.pop-up__bg').onclick = function () {
					bg.style.display = 'none';
				};
			};
		};
		return btn;
	};
}