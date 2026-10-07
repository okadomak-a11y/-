// Эта функция переводит значения паспорта на латиницу и считает возраст.
function findEdit() {
	// Изменяем данные на латиницу
	document.getElementById('surname').innerText = 'BAGIROV';
	document.getElementById('name').innerText = 'ELNUR';
	document.getElementById('patronymic').innerText = 'AKRAM OGLY';
	document.getElementById('sex').innerText = 'MALE';
	document.getElementById('birthplace').innerText = 'City';
	document.getElementById('serianumber').innerText = 'Series';
	document.getElementById('issuedBy').innerText = 'Issued By';
	document.getElementById('registrationAddress').innerText = 'City';

	// Вычисляем возраст по году рождения и показываем его на странице.
	const birthYearNode = document.getElementById('birthyear');
	let birthYear = parseInt(birthYearNode.innerText);
	let currentYear = new Date().getFullYear();
	let age = currentYear - birthYear;
	console.log(age);
	const ageNode = document.getElementById('age');
	ageNode.innerText = age;
}

// При нажатии кнопки выполняется перевод данных.
const nodeForClick = document.getElementById('for_click');
nodeForClick.addEventListener('click', findEdit);

// Заменяем подпись под паспортом после нажатия той же кнопки.
function find_edit() {
	const new_node = document.getElementById('new');
	new_node.innerHTML = '<b>данные изменены!</b>';
}

const node_for_click = document.getElementById('for_click');
node_for_click.addEventListener('click', find_edit);
