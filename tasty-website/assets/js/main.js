const menuCards = document.querySelector(".menu-cards");
const categoryBtn = document.querySelectorAll(".categoryBtn");
const favCounter = document.querySelector(".counter");

categoryBtn.forEach((item) =>
  item.addEventListener("click", function () {
    document.querySelector(".categoryBtn.active").classList.remove("active");
    this.classList.add("active");
  })
);

let menus = [];

async function getAllData() {
  const res = await axios(`${BASE_URL}`);

  menus = res.data;

  //   drawCards(res.data);
  let filtered = menus.filter(
    (item) => item.category.toLocaleLowerCase() === "main"
  );
  drawCards(filtered);
  //   console.log(filtered);
}

getAllData();

let categoryName = "main";

function drawCards(data) {
  menuCards.innerHTML = "";

  data.forEach((element) => {
    menuCards.innerHTML += `
    <div class="menu-card">
    <i class="${
      favsProducts.some((item) => item.id === element.id)
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart"
    }" onclick="addToFav(${element.id},this)"></i>
    <div class="card-right">
      <img src="${element.image}" alt="" />
      <div>
        <h5>${element.title}</h5>
        <p>${element.desc}</p>
        <a href="details.html?id=${element.id}">Read More</a>
      </div>
    </div>
    <div class="card-left">
      <p>$ ${element.price}.00</p>
    </div>
  </div>
    `;
  });
}

categoryBtn.forEach((item) => {
  item.addEventListener("click", function () {
    categoryName = this.innerText;
    let filtered = menus.filter((item) => item.category === categoryName);

    drawCards(filtered);
  });
});

// ==========FAVORITE

let favsProducts = getItemToLocalStorage();
calculate(favsProducts.length);

function addToFav(id, icon) {
  icon.className === "fa-regular fa-heart"
    ? (icon.className = "fa-solid fa-heart")
    : (icon.className = "fa-regular fa-heart");

  let favs = getItemToLocalStorage();

  let bool = favs.find((item) => item.id == id);

  let product = menus.find((item) => item.id === id);
  // console.log(product);
  if (bool) {
    favs = favs.filter((item) => item.id !== id);
  } else {
    favs.push(product);
  }

  setItemToLocalStorage(favs);
  calculate(favs.length);
}

function calculate(count) {
  favCounter.textContent = count;
}
