const inputsAll = document.querySelectorAll("input");
const tBody = document.querySelector("tbody");

const form = document.querySelector("form");
const search = document.querySelector("#search");

const sortBtn = document.querySelector(".sort-btn");
const select = document.querySelector("select");

let favsProducts = getItemToLocalStorage();

let array = [];
let menuCopy = [];

async function getMenuData() {
  const res = await axios(`${BASE_URL}`);
  array = res.data;
  menuCopy = structuredClone(array);

  //   console.log(res.data);
  drawTable(array);
}

getMenuData();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trEelemet = document.createElement("tr");
    trEelemet.innerHTML += `

    <td><img src="${element.image}" alt="" /></td>
    <td>${element.title}</td>
    <td>${element.desc}</td>
    <td>${element.price}</td>
    <td><button onclick="deleteBtn(${element.id},this)">Delete</button> <button onclick="editBtn(${element.id})">Edit</button></td>    
    `;
    tBody.append(trEelemet);
  });
}

// ===========SEARCH

search.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = array.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawTable(filtered);
});

//============SORT

sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Ascending") {
    sortBtn.innerText = "Descending";
    sorted = array.sort((a, b) => a.price - b.price);
  } else if (sortBtn.innerText === "Descending") {
    sorted = array.sort((a, b) => b.price - a.price);
    sortBtn.innerText = "Default";
  } else {
    sortBtn.innerText = "Ascending";
    sorted = menuCopy;
  }
  drawTable(sorted);
});

// =============DELETE-BTN

async function deleteBtn(id, btn) {
  if (confirm("silmek istedigine eminmisiniz??")) {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("tr").remove();
    favsProducts = favsProducts.filter((item) => item.id !== id);
    setItemToLocalStorage(favsProducts);
  }
}

//====== EDIT-BTN

let editId = null;

async function editBtn(id) {
  window.scrollTo(0, 0);
  editId = id;
  const res = await axios(`${BASE_URL}/${id}`);

  inputsAll[1].value = res.data.title;
  inputsAll[2].value = res.data.desc;
  inputsAll[3].value = res.data.price;
  select.value = res.data.category;
}

form.addEventListener("submit", async function () {
  let obj = {
    image: `./assets/images/${inputsAll[0].value.split("\\")[2]}`,
    title: inputsAll[1].value,
    desc: inputsAll[2].value,
    price: inputsAll[3].value,
    category: select.value,
  };

  if (!editId) {
    if (
      inputsAll[0].value !== "" &&
      inputsAll[1].value !== "" &&
      inputsAll[2].value !== "" &&
      inputsAll[3].value !== "" &&
      select.value !== ""
    ) {
      await axios.post(`${BASE_URL}`, obj);
    } else {
      alert("zehmet olmasa inputlari doldurun:))");
    }
  } else {
    await axios.patch(`${BASE_URL}/${editId}`, obj);
  }
});
