'use strict';
window.onload = function () {
	let allBlockNotes = [];

	function Note (str) {
		let context = this;
		if (!str) throw 'There is not content';
		context.content = str;
		let div = document.createElement('div'),
			divContent = document.createElement('div'),
			removeBtn = document.createElement('button'),
			editBtn = document.createElement('button');

		removeBtn.className = 'remove-note';
		divContent.className = 'notes__note';
		editBtn.className = 'edit-note';

		divContent.innerHTML = str;

		div.appendChild(removeBtn);
		div.appendChild(editBtn);
		div.appendChild(divContent);
		document.querySelector('.notes').appendChild(div);

		removeBtn.onclick = function () {
			div.remove();
		};

		editBtn.onclick = function () {
			let textarea = document.querySelector('.edit-textarea'),
				bg = document.querySelector('.pop-up-meny');
			textarea.value = context.content;
			bg.style.display = 'block';
			document.querySelector('.save').onclick = function () {
				return function (){
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

	document.querySelector('.form__btn').onclick = function create () {
		let content = document.querySelector('.textarea'),
			obj = new Note (content.value);
		content.value = '';
	};
};