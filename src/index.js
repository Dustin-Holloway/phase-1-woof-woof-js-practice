const renderedDogs = (dogos) => {
  renderDogs(dogos);
};

//eventListeners

const filter = document.querySelector("#good-dog-filter");
filter.addEventListener("click", (e) => {
  if (filter.innerText.includes("OFF")) {
    filter.innerText = "Filter good dogs: ON";
  } else {
    filter.innerText = "Filter good dogs: OFF";
  }
});

//   if (!this.dataset.click) {
//     this.setAttribute("data-click", "true");
//     this.innerText = "Filter good dogs: ON";
//   } else {
//     this.setAttribute("data-click", "false");
//     this.innerText = "FILTER";
//     // this.removeAttribute((innerText = "Filter good dogs: ON"));
//   }
// filter.innerText = "Filter good dogs: ON";
const renderDogs = (dogos) => {
  const dogBar = document.querySelector("#dog-bar");
  const spn = document.createElement("span");
  spn.textContent = dogos.name;
  dogBar.append(spn);

  spn.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.remove();
    const imgInfo = document.createElement("img");
    const h2Info = document.createElement("h2");
    const btn = document.createElement("button");
    console.log(dogos.isGoodDog);
    // debugger;
    btn.addEventListener("click", (e) => {
      dogos.isGoodDog = !dogos.isGoodDog;
      // debugger;
      console.log(dogos.isGoodDog);
      btn.innerText = dogos.isGoodDog !== true ? "Bad Dog!" : "Good Dog!";
      console.log(dogos);
      updateValue(dogos);
    });

    const dogInfo = document.querySelector("#dog-info");
    dogInfo.innerHTML = "";

    imgInfo.src = dogos.image;
    h2Info.textContent = dogos.name;
    btn.innerText = dogos.isGoodDog === true ? "Bad Dog!" : "Good Dog!";

    dogInfo.append(imgInfo, h2Info, btn);
    // return renderDogs(dogos);
  });
};

function updateValue(dogos) {
  fetch(`http://localhost:3000/pups/${dogos.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dogos),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  // .then((data) => console.log(data));
}

function fetchDog() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((dogs) => {
      const dogos = Object.values(dogs);
      console.log(dogos);
      // arrayOfDogObj.push(dogos);
      // console.log(arrayOfDogObj);
      dogos.forEach(renderedDogs);
    });
}

fetchDog();
