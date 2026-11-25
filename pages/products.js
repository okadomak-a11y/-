// Загружаем список вкусов из отдельного JSON-файла.
fetch("./data/products.json")
  // Преобразуем JSON-текст ответа в JavaScript-объект.
  .then(response => response.json())
  // Создаём карточки, строки таблицы и изображения альбома из одного списка.
  .then(data => {
    // Каждая запись массива flavors становится карточкой на странице.
    document.querySelector("#flavor-list").innerHTML = data.flavors
      .map(flavor => `
        <article class="col">
          <div class="product-card">
            <img class="product-image" src="${flavor.image}" alt="${flavor.imageAlt}">
            <div class="card-body">
              <p class="eyebrow mb-2">${flavor.note}</p>
              <h2 class="h4 card-title">${flavor.name}</h2>
              <p class="card-text">${flavor.description}</p>
              <a class="btn btn-outline-dark btn-sm" href="forms.html#order">Выбрать для заказа</a>
            </div>
          </div>
        </article>
      `)
      .join("");

    // Из тех же данных формируем сравнение, чтобы оно совпадало с карточками.
    document.querySelector("#flavor-comparison").innerHTML = data.flavors
      .map(flavor => `
        <tr>
          <th scope="row">${flavor.name}</th>
          <td>${flavor.feature}</td>
          <td>${flavor.suitableFor}</td>
        </tr>
      `)
      .join("");

    // Создаём элементы альбома с фотографиями тех же вкусов.
    document.querySelector("#flavor-gallery").innerHTML = data.flavors
      .map(flavor => `
        <figure class="col mb-0">
          <a href="${flavor.image}" target="_blank" rel="noopener">
            <img class="product-image rounded-3" src="${flavor.image}" alt="Открыть фотографию ${flavor.imageAlt}">
          </a>
          <figcaption class="small mt-2">${flavor.name}</figcaption>
        </figure>
      `)
      .join("");
  })
  // Если JSON не загрузился или его нельзя разобрать, сообщаем об этом в консоли.
  .catch(error => console.error("Не удалось загрузить список вкусов:", error));
