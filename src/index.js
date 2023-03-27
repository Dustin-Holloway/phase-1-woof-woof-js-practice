let dogs = [];
let filter = false;

const filters = document.querySelector("#good-dog-filter");
const dogBar = document.querySelector("#dog-bar");

console.log(dogBar);
filters.addEventListener("click", (e) => {
  if (!filter) {
    filters.innerText = "Filter good dogs: ON";
    filter = true;
    showDogs(dogs.filter((d) => d.isGoodDog));
  } else {
    filters.innerText = "Filter good dogs: OFF";
    filter = false;
    showDogs(dogs);
  }
});

const showDogs = (dogs) => {
  dogBar.innerHTML = "";
  dogs.forEach(renderDog);
};

const renderDog = (dog) => {
  // dogBar.innerHTML = "";
  const spn = document.createElement("span");
  spn.textContent = dog.name;
  dogBar.append(spn);

  spn.addEventListener("click", (e) => {
    console.log("SUP");

    const imgInfo = document.createElement("img");
    const h2Info = document.createElement("h2");
    const btn = document.createElement("button");

    btn.addEventListener("click", (e) => {
      dogBar.innerHtml = "";

      btn.innerText = dog.isGoodDog !== true ? "Bad Dog!" : "Good Dog!";
      dog.isGoodDog = !dog.isGoodDog;
      updateValue(dog);
    });

    const dogInfo = document.querySelector("#dog-info");
    dogInfo.innerHTML = "";

    imgInfo.src = dog.image;
    h2Info.textContent = dog.name;
    btn.innerText = dog.isGoodDog === true ? "Bad Dog!" : "Good Dog!";

    dogInfo.append(imgInfo, h2Info, btn);
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
}

function fetchDog() {
  fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((results) => {
      dogs = results;
      showDogs(dogs);
    });
}

fetchDog();
