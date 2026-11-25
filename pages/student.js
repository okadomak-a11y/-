// Получаем обязательный элемент по id; если его нет, сразу показываем ошибку разметки.
function getRequiredElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Не найден обязательный элемент страницы: #${id}`);
  }
  return element;
}

// Создаём ссылку с подписью и настройками для безопасного открытия новой вкладки.
function createExternalLink(url, text) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = text;
  return link;
}

// Заполняем личную карточку студента и список его контрольных работ.
function renderStudent(data) {
  const photo = getRequiredElement("student-photo");
  photo.src = data.photo;
  photo.alt = data.alt;
  getRequiredElement("student-name").textContent = data.name;
  getRequiredElement("student-group").textContent = data.group;

  const email = getRequiredElement("student-email");
  email.href = `mailto:${data.email}`;
  email.textContent = data.email;

  const worksList = getRequiredElement("student-works");
  data.works.forEach((work) => {
    const item = document.createElement("li");
    item.append(createExternalLink(work.url, work.title));
    item.append(document.createTextNode(" · "));
    item.append(createExternalLink(work.requirementsUrl, "требования к работе"));
    worksList.append(item);
  });
}

// Выводим название, описание и официальный адрес образовательной программы.
function renderProgram(data) {
  getRequiredElement("program-faculty").textContent = data.faculty;
  getRequiredElement("program-title").textContent = data.title;
  document.title = data.title;

  const description = getRequiredElement("program-description");
  description.replaceChildren();
  const summary = document.createElement("p");
  summary.textContent = data.description;
  const details = document.createElement("p");
  details.className = "mb-4";
  details.textContent = data.details;
  description.append(summary, details);

  const programLink = getRequiredElement("program-link");
  programLink.href = data.programUrl;
  programLink.textContent = data.programUrl;
}

// Для каждого участника команды создаём карточку с фотографией, ролью и профилем.
function renderTeam(members) {
  const teamContainer = getRequiredElement("program-team");

  members.forEach((member) => {
    const column = document.createElement("article");
    column.className = "col";

    const card = document.createElement("div");
    card.className = "person-card p-4";

    const photo = document.createElement("img");
    photo.className = "person-photo mb-4";
    photo.src = member.photo;
    photo.alt = member.alt;

    const name = document.createElement("h3");
    name.className = "h4";
    name.textContent = member.name;

    const role = document.createElement("p");
    role.className = "mb-2";
    const roleLabel = document.createElement("strong");
    roleLabel.textContent = "Роль: ";
    role.append(roleLabel, document.createTextNode(member.role));

    card.append(photo, name, role);
    // Почту сотрудника показываем только если она указана в файле данных.
    if (member.email) {
      const email = document.createElement("p");
      email.className = "mb-2";
      const emailLink = document.createElement("a");
      emailLink.href = `mailto:${member.email}`;
      emailLink.textContent = member.email;
      email.append(emailLink);
      card.append(email);
    }
    card.append(createExternalLink(member.siteUrl, "Страница сотрудника на сайте ВШЭ"));
    column.append(card);
    teamContainer.append(column);
  });
}

// Загружаем JSON через HTTP, как в примере преподавателя, и выводим все разделы страницы.
fetch("./data/program.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Не удалось загрузить файл данных: HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (!data.program || !data.student || !Array.isArray(data.people)) {
      throw new Error("В program.json отсутствует программа, студент или список участников.");
    }

    renderStudent(data.student);
    renderProgram(data.program);
    renderTeam(data.people);
  })
  .catch((error) => {
    console.error("Не удалось загрузить данные о программе:", error);
    const errorMessage = document.getElementById("student-data-error");
    if (errorMessage) {
      errorMessage.textContent = "Не удалось загрузить данные страницы. Откройте сайт через веб-сервер и проверьте файл data/program.json.";
      errorMessage.classList.remove("d-none");
    }
  });
