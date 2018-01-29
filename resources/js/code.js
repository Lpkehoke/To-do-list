'use strict';
//уведомление
//кружочки
//перетаскивание (драгон дроп(не надо))
window.onload = function () {

	let WRAPPER = document.querySelector('.wrapper');
	let ALL_COLUMN = [];

	document.querySelector('.btn-for-new-column').onclick = function () {
		let column = new Column (document.querySelector('.title-new-column').value);
		ALL_COLUMN.push(column);
		console.log(ALL_COLUMN);
		column.obj.onmousedown = function (e) {
			if (e.target !== column.obj) return;

			let startLeft = column.obj.getBoundingClientRect().left;

			let emptyDiv = document.createElement('div');
			emptyDiv.className = 'empty-div';
			emptyDiv.style.order = column.id;

			WRAPPER.insertBefore(emptyDiv , column.obj);

			column.obj.style.position = 'absolute';
			column.obj.style.zIndex = 100;

			moveAt(e);

			document.onmousemove = function(e) {
				moveAt(e);
			};

			column.obj.onmouseup = function() {
				document.onmousemove = null;
				column.obj.onmouseup = null;
			};

			function moveAt(e) {
				if (e.pageX < startLeft && e.pageX > 16) {
					let a = column.id;
					let b = column.id - 1; // не  айди минус первого, а айди предыдцщего!!!!!!!!!!!!!
					ALL_COLUMN[a] = [ALL_COLUMN[b], ALL_COLUMN[b] = ALL_COLUMN[a]][0];
					// column.id = [ALL_COLUMN[column.id - 1].id, ALL_COLUMN[column.id - 1].id = column.id][0];
					ALL_COLUMN[a].id++;
					ALL_COLUMN[b].id--;
					// column.id--;
					emptyDiv.style.order = [ALL_COLUMN[a].obj.style.order , ALL_COLUMN[a].obj.style.order = emptyDiv.style.order][0];
					console.log(column.id);
					console.log(ALL_COLUMN);
					startLeft -= 256;
				};

				if (e.pageX > startLeft + 256) {
					let a = column.id;
					let b = column.id + 1;
					ALL_COLUMN[a] = [ALL_COLUMN[b], ALL_COLUMN[b] = ALL_COLUMN[a]][0];
					// column.id = [ALL_COLUMN[column.id - 1].id, ALL_COLUMN[column.id - 1].id = column.id][0];
					ALL_COLUMN[a].id--;
					ALL_COLUMN[b].id++;
					// column.id--;
					emptyDiv.style.order = [ALL_COLUMN[a].obj.style.order , ALL_COLUMN[a].obj.style.order = emptyDiv.style.order][0];
					console.log(column.id);
					console.log(ALL_COLUMN);
					startLeft += 256;
				};

				column.obj.style.left = e.pageX - column.obj.offsetWidth / 2 + 'px';
				column.obj.style.top = e.pageY - column.obj.offsetHeight / 2 + 'px';
			};
		};

		WRAPPER.insertBefore(column.obj , document.querySelector('.div-for-new-column'));

		column.obj.querySelector('.form__btn').onclick = function () {
			let content = column.obj.querySelector('.textarea');
			let	obj = new Note (content.value , column.obj);
			content.value = '';
		};

		document.querySelector('.title-new-column').value = '';
	};

	function Column (title) {
		if (!title) throw 'Enter title of column';
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

		let red	= Math.floor(Math.random() * 255);
		let	green = Math.floor(Math.random() * 255);
		let	blue = Math.floor(Math.random() * 255);
		let	color = '#' +
						(red = (red > 16) ? red.toString(16) : '0' + red.toString(16)) +
						(green = (green > 16) ? green.toString(16) : '0' + green.toString(16)) +
						(blue = (blue > 16) ? blue.toString(16) : '0' + blue.toString(16));

		mainColumn.style.background = color;
		mainColumn.style.order = ALL_COLUMN.length;

		contextCol.id = ALL_COLUMN.length;

		form.appendChild(textareaCol);
		form.appendChild(button);
		mainColumn.appendChild(hTitle);
		mainColumn.appendChild(editBtn);
		mainColumn.appendChild(removeBtn);
		mainColumn.appendChild(divNotes);
		mainColumn.appendChild(form);
		contextCol.obj = mainColumn;
	};

	function Note (str , parent) {
		if (!str) throw 'There is not content';
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

	function Button (type , obj) {
		let btn = document.createElement('button');
		if (type === 'remove') {
			btn.className = 'remove-note';
			btn.onclick = function () {
				obj.mainProperty.remove();
			};
		} else if (type === 'edit') {
			btn.className = 'edit-note';
			btn.onclick = function () { 										// btn
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
};
