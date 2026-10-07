function findEdit() {
	// Изменяем данные на латиницу
	document.getElementById('surname').innerText = 'BAGIROV';
	document.getElementById('name').innerText = 'ELNUR';
	document.getElementById('patronymic').innerText = 'AKRAM OGLY';
	document.getElementById('sex').innerText = 'MALE';
	document.getElementById('birthplace').innerText = 'City';
	document.getElementById('serianumber').innerText = 'Series';
	document.getElementById('issueDate').innerText = 'Date';
	document.getElementById('issuedBy').innerText = 'Issued By';
	document.getElementById('registrationAddress').innerText = 'City';
	document.getElementById('registrationDate').innerText = 'Date';

	// Вычисляем и отображаем возраст
	const birthYearNode = document.getElementById('birthyear');
	let birthYear = parseInt(birthYearNode.innerText);
	let currentYear = new Date().getFullYear();
	let age = currentYear - birthYear;
	console.log(age);
	const ageNode = document.getElementById('age');
	ageNode.innerText = age;
}

const nodeForClick = document.getElementById('for_click');
nodeForClick.addEventListener('click', findEdit);

function find_edit() {
	const new_node = document.getElementById('new');
	new_node.innerHTML = '<b>данные изменены!</b>';
}

const node_for_click = document.getElementById('for_click');
node_for_click.addEventListener('click', find_edit);
