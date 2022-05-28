let price = 0;
const cart = sessionStorage.getItem("cart");
const cartItems = cart.split(" ");

document.addEventListener("DOMContentLoaded", () => {
    var l = sessionStorage.getItem("loggedin");
    if (l == "false") {
        return window.location.href = "/login.html";
    }
    getPoke();
    // document.getElementById("checkout").addEventListener("click", checkout())

})

function getPoke() {
    for(var x = 1; x < cartItems.length; x++) {

        fetch(`https://pokeapi.co/api/v2/pokemon/${cartItems[x]}`)

        .then(response => response.json())

        .then(function(pokepokemon) {
            getPokepokemon(pokepokemon);
        })
    }
    document.getElementById("total").innerHTML = `${price}`
}

function getPokepokemon(pokemon) {
 
    let pokeCont = document.createElement("div");
    let pokemonIMG = document.createElement("img");
    var pokeLink = document.createElement("a");

    pokemonIMG.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

    let imgBox = document.createElement("div");

    pokeCont.classList.add("poke-container");
    pokemonIMG.classList.add("pokemon-image");

    imgBox.appendChild(pokemonIMG);
    imgBox.classList.add("imgBox");

    let name = document.createElement("h3");

    if(pokemon.id < 300) {
        name.innerText = `${pokemon.name} $30`;
        price +=30;
    } else if(pokemon.id < 600) {
        name.innerText = `${pokemon.name} $20`;
        price +=20;
    } else {
        name.innerText = `${pokemon.name} $10`;
        price +=10;
    }

    name.style.alignSelf = "center";


    let id = document.createElement("p");
    id.innerText = "#" + pokemon.id;
    id.style.alignSelf = "center";


    pokeLink.appendChild(imgBox);
    pokeCont.appendChild(name);
    pokeCont.appendChild(pokeLink);
    pokeCont.appendChild(id);

    pokeLink.href = "profile.html";
    let mainCont = document.getElementById("cart");

    mainCont.appendChild(pokeCont);

    pokeLink.addEventListener("click", () => {
        console.log(pokeLink);
        sessionStorage.setItem("pokemon", pokemon.name);
    })
}




