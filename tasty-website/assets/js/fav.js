const favSection = document.querySelector(".favs-section");
const favCounter = document.querySelector(".counter");

let favsProducts = getItemToLocalStorage();
calculate(favsProducts.length);

function drawCards(data) {
  favSection.innerHTML = "";
  data.forEach((element) => {
    favSection.innerHTML += `
    <div class="favs-card">
            <img src="${element.image}" alt="" />
            <i class="fa-solid fa-heart" onclick="removeFav(${element.id},this)"></i>

            <div class="info">
              <h1>${element.title}</h1>
              <p>${element.desc}</p>
              <p>${element.price}</p>
            </div>
          </div>
    `;
  });
}

drawCards(favsProducts);

function calculate(count) {
  favCounter.textContent = count;
}

function removeFav(id, btn) {
  favsProducts = favsProducts.filter((item) => item.id !== id);

  btn.closest(".favs-card").remove();
  calculate(favsProducts.length);
  setItemToLocalStorage(favsProducts);
}
