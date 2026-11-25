// Загружаем JSON-файл с данными о студенте, программе и её участниках.
fetch("./data/program.json")
  // Преобразуем JSON-текст ответа в JavaScript-объект.
  .then(response => response.json())
  // Записываем полученные данные в элементы страницы.
  .then(data => {
    // Показываем основные сведения о студенте.
    document.querySelector("#student-name").textContent = data.student.name;
    document.querySelector("#student-group").textContent = data.student.group;
    document.querySelector("#student-photo").src = data.student.photo;
    document.querySelector("#student-photo").alt = data.student.alt;
    document.querySelector("#student-email").href = `mailto:${data.student.email}`;
    document.querySelector("#student-email").textContent = data.student.email;
    document.querySelector("#student-works").innerHTML = data.student.works
      .map((work) => `
        <li>
          <a href="${work.url}" target="_blank" rel="noopener">${work.title}</a>
          · <a href="${work.requirementsUrl}" target="_blank" rel="noopener">требования к работе</a>
        </li>
      `)
      .join("");

    // Подставляем сведения об образовательной программе.
    document.title = data.program.title;
    document.querySelector("#program-faculty").textContent = data.program.faculty;
    document.querySelector("#program-title").textContent = data.program.title;
    document.querySelector("#program-description").textContent = data.program.description;
    document.querySelector("#program-details").textContent = data.program.details;
    document.querySelector("#programUrl").innerHTML =
      `<br><a href="${data.program.programUrl}" target="_blank" rel="noopener">${data.program.programUrl}</a>`;

    // Создаём HTML-карточку для каждого участника массива people.
    document.querySelector("#people-list").innerHTML = data.people
      .map(person => `
        <article class="col">
          <div class="person-card p-4">
            <img class="person-photo mb-4" src="${person.photo}" alt="${person.alt}">
            <h3 class="h4">${person.name}</h3>
            <p class="mb-2"><strong>Роль:</strong> ${person.role}</p>
            ${person.email ? `<p class="mb-2"><a href="mailto:${person.email}">${person.email}</a></p>` : ""}
            <a href="${person.siteUrl}" target="_blank" rel="noopener">Страница сотрудника на сайте ВШЭ</a>
          </div>
        </article>
      `)
      .join("");
  })
  // Если загрузить файл или обработать данные не удалось, выводим ошибку в консоль.
  .catch(error => console.error("Не удалось загрузить данные о программе:", error));
