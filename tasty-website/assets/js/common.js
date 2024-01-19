const BASE_URL = "http://localhost:8080/menus";

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const menuicon = document.querySelector("#menuIcon");
const toTop = document.querySelector(".toTop");

menuicon.addEventListener("click", function () {
  nav.classList.toggle("show");

  this.classList.contains("fa-bars")
    ? (this.className = "fa-solid fa-xmark")
    : (this.className = "fa-solid fa-bars");
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    header.classList.add("header-scroll");
    toTop.classList.add("active");
  } else {
    header.classList.remove("header-scroll");
    toTop.classList.remove("active");
  }
});

function setItemToLocalStorage(item) {
  localStorage.setItem("product", JSON.stringify(item));
}

function getItemToLocalStorage(item) {
  return JSON.parse(localStorage.getItem("product")) || [];
}
