document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("loggedin")) {
        return window.location.href = "/login.html";
    }
    getProfile();
})


function getProfile() {

    let pokemon = sessionStorage.getItem("pokemon");

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    .then(response => response.json())

    .then(function(pokemonData) {
        getData(pokemonData)
    })
}

function getData(pokemon) {

    let pokeCont = document.createElement("div");
    let pokemonIMG = document.createElement("img");
    let typeList = document.createElement("ul");
    pokemonIMG.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

    let imgBox = document.createElement("div");
    imgBox.style.width = "50vw";

    pokemonIMG.classList.add("pokemon-image");
    pokeCont.classList.add("poke-container");

    imgBox.appendChild(pokemonIMG);
    imgBox.classList.add("imgBox");

    pokemon.types.forEach(function(type) {
        let temp = document.createElement("li");
        temp.innerText = type["type"]["name"];
        typeList.appendChild(temp);
    })

    let name = document.createElement("h2");
    name.innerText = pokemon.name;
    name.style.alignSelf = "center";

    let height = document.createElement("p");
    height.innerText = "Height: " +  pokemon.height;
    height.style.alignSelf = "center";

    let typeText = document.createElement("p");
    typeText.innerText = "Types:";
    typeText.style.alignSelf = "center";

    let id = document.createElement("p");
    id.innerText = "#" + pokemon.id;
    id.style.alignSelf = "center";

    pokeCont.appendChild(name);
    pokeCont.appendChild(imgBox);
    pokeCont.appendChild(id);
    pokeCont.appendChild(height);
    pokeCont.appendChild(typeText);
    pokeCont.appendChild(typeList);

    let mainCont = document.getElementById("main-container");

    mainCont.appendChild(pokeCont);

}

