// Карточки вкусов берутся из отдельного файла, а не дублируются в HTML.
// Данные одной карточки: название, описание, путь к фото, alt-текст и подпись.
const flavors = [
  {
    name: "Original",
    description: "Классический вкус Dr Pepper с фруктовыми и пряными нотами.",
    image: "../classic1.jpg",
    imageAlt: "Классический Dr Pepper",
    note: "Классика"
  },
  {
    name: "Cherry",
    description: "Вариант с яркой вишнёвой нотой.",
    image: "../cherry.jpg",
    imageAlt: "Dr Pepper Cherry",
    note: "Вишнёвый"
  },
  {
    name: "Vanilla Float",
    description: "Вариант с мягким ванильным характером.",
    image: "../vanilla.jpg",
    imageAlt: "Dr Pepper Vanilla Float",
    note: "Ванильный"
  },
  {
    name: "Zero Sugar",
    description: "Версия без сахара с фирменным вкусом Dr Pepper.",
    image: "../zerosugar.jpeg",
    imageAlt: "Dr Pepper Zero Sugar",
    note: "Без сахара"
  }
];

const flavorList = document.getElementById("flavor-list");

// Каждая запись массива становится отдельной карточкой вкуса на странице.
// Меняя этот массив, можно менять карточки без ручного копирования HTML.
flavorList.innerHTML = flavors.map((flavor) => {
  const image = `<img class="product-image" src="${flavor.image}" alt="${flavor.imageAlt}">`;

  return `
    <article class="col">
      <div class="product-card">
        ${image}
        <div class="card-body">
          <p class="eyebrow mb-2">${flavor.note}</p>
          <h2 class="h4 card-title">${flavor.name}</h2>
          <p class="card-text">${flavor.description}</p>
          <a class="btn btn-outline-dark btn-sm" href="forms.html#order">Выбрать для заказа</a>
        </div>
      </div>
    </article>
  `;
}).join("");
