let id = new URLSearchParams(window.location.search).get("id");

const details = document.querySelector(".details-section");

async function getDetails() {
  const res = await axios(`${BASE_URL}/${id}`);
  //   console.log(res.data);

  details.innerHTML = `
<div class="details-left">
            <img src="${res.data.image}" alt="" />
          </div>
          <div class="details-right">
            <h1>${res.data.title}</h1>
            <p>${res.data.desc}</p>
            <p>${res.data.price}</p>
            <button onclick="goBack()">Go Back</button>
          </div>
`;
}

getDetails();

function goBack() {
  window.history.back();
}
