'use strict';
window.onload = function () {
	let wrapper = document.querySelector('.wrapper');

	document.querySelector('.btn-for-new-column').onclick = function () {
		let column = new Column (document.querySelector('.title-new-column').value);
		document.querySelector('.wrapper').insertBefore(column.obj , document.querySelector('.div-for-new-column'));
			column.obj.querySelector('.form__btn').onclick = function create () {
			let content = column.obj.querySelector('.textarea'),
				obj = new Note (content.value , column.obj);
			content.value = '';
		};
		document.querySelector('.title-new-column').value = '';
	};


	function Column (title) {
		if (!title) throw 'Enter title of column';
		let contextCol = this;

		contextCol.title = title;

		let removeBtn = document.createElement('button'),
			editBtn = document.createElement('button');

		removeBtn.className = 'remove-note';
		editBtn.className = 'edit-note';


		let divNotes = document.createElement('div'),
			form = document.createElement('div'),
			textareaCol = document.createElement('textarea'),
			button = document.createElement('button'),
			mainColumn = document.createElement('div'),
			hTitle = document.createElement('h3');

		hTitle.innerHTML = title;

		divNotes.className = 'notes';
		form.className = 'form';
		textareaCol.className = 'form__textarea textarea';
		button.className = 'form__btn';
		mainColumn.className = 'column-note';

		button.innerHTML = 'Create';

		editBtn.onclick = function () {
			let textarea = document.querySelector('.edit-textarea'),
				bg = document.querySelector('.pop-up-meny');

			textarea.value = contextCol.title;
			bg.style.display = 'block';
			document.querySelector('.save').onclick = function () {
				return function () {
					hTitle.innerHTML = textarea.value;
					contextCol.title = textarea.value;
					bg.style.display = 'none';
				};
			}();
			document.querySelector('.pop-up__bg').onclick = function () {
				bg.style.display = 'none';
			};
		};

		removeBtn.onclick = function () {
			mainColumn.remove();
		};

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
		let context = this,
			div = document.createElement('div'),
			divContent = document.createElement('div'),
			removeBtn = document.createElement('button'),
			editBtn = document.createElement('button');
		context.content = str;

		removeBtn.className = 'remove-note';
		divContent.className = 'notes__note';
		editBtn.className = 'edit-note';

		divContent.innerHTML = str;

		div.appendChild(removeBtn);
		div.appendChild(editBtn);
		div.appendChild(divContent);
		parent.querySelector('.notes').appendChild(div);

		removeBtn.onclick = function () {
			div.remove();
		};

		editBtn.onclick = function () {
			let textarea = document.querySelector('.edit-textarea'),
				bg = document.querySelector('.pop-up-meny');

			textarea.value = context.content;
			bg.style.display = 'block';
			document.querySelector('.save').onclick = function () {
				return function () {
					divContent.innerHTML = textarea.value;
					context.content = textarea.value;
					bg.style.display = 'none';
				};
		}();
			document.querySelector('.pop-up__bg').onclick = function () {
				bg.style.display = 'none';
			};
		};
	};
};