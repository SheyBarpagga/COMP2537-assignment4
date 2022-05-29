
var pokemonData = [];
var counter = 1;
var boxCounter = 1;

document.addEventListener("DOMContentLoaded", () => {
    SearchName();
    SearchHeight();
    SearchWeight();
})

function clearChildren() {
    if(document.getElementById("colOne").hasChildNodes()) {
        document.getElementById("colOne").innerHTML = "";
        document.getElementById("colTwo").innerHTML = "";
        document.getElementById("colThree").innerHTML = "";
    }
}

function SearchName() {
    var x = document.createElement("a");
    x.classList.add("sbutton");
    x.style.cssText = "background-color: black;color: white;padding: 1%;text-align: center;text-decoration: none;display: inline-block;";
    x.addEventListener("click",function() {
        clearChildren();
        var temp = document.getElementById("name").value;
        console.log(temp);
        console.log(pokemonData);
        for (var y = 1; y < 899; y++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${y}`)

            .then(response => response.json())

            .then(function(data) {
                if(temp === data.name) {
                    addItem(data);
                }
            })
        }
    })
    x.innerText = "Search Name"
    document.getElementById("name-container").appendChild(x);
    var temp = document.getElementById("name").value;
    addNewEvent(`name ${temp}`);

}

function SearchWeight() {
    var x = document.createElement("a");
    x.classList.add("sbutton");
    x.style.cssText = "background-color: black;color: white;padding: 1%;text-align: center;text-decoration: none;display: inline-block;";

    x.addEventListener("click", function() {
        clearChildren();
        var temp = document.getElementById("weight").value;

        for (var y = 1; y < 200; y++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${y}`)

            .then(response => response.json())
            .then(function(data) {
                if(String(temp )=== String(data.weight)) {
                    addItem(data);
                }
            })
        }
    })
    x.innerText = "Search Weight"
    document.getElementById("weight-container").appendChild(x);
    var temp = document.getElementById("weight").value;
    addNewEvent(`weight ${temp}`);
}

function SearchHeight() {
    var x = document.createElement("a");
    x.classList.add("sbutton");
    x.style.cssText = "background-color: black;color: white;padding: 1%;text-align: center;text-decoration: none;display: inline-block;";
    x.addEventListener("click", function() {
        clearChildren();
        var temp = document.getElementById("height").value;
        
        for (var y = 1; y < 200; y++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${y}`)

            .then(response => response.json())
            .then(function(data) {
                if(String(temp) === String(data.height)) {
                    addItem(data);
                }
            })
        }
    })
    x.innerText = "Search Height"
    document.getElementById("height-container").appendChild(x);
    var temp = document.getElementById("height").value;
    addNewEvent(`Height ${temp}`);
}

function addItem(pokemon) {
    let pokeCont = document.createElement("div");
    let pokemonIMG = document.createElement("img");
    var pokeLink = document.createElement("a");

    pokemonIMG.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;

    let imgBox = document.createElement("div");
    imgBox.style.width = "200px";

    pokeCont.classList.add("poke-container");
    pokemonIMG.classList.add("pokemon-image");

    imgBox.appendChild(pokemonIMG);
    imgBox.classList.add("imgBox");


    let name = document.createElement("h3");
    name.innerText = pokemon.name;
    name.style.alignSelf = "center";
    
    let id = document.createElement("p");
    id.innerText = "#" + pokemon.id;
    id.style.alignSelf = "center";


    pokeCont.appendChild(name);
    pokeCont.appendChild(imgBox);

    pokeCont.appendChild(id);
    
    pokeLink.appendChild(pokeCont);
    pokeLink.href = "profile.html";
    let mainCont = document.getElementById("main-container");


    let colOne = document.getElementById("colOne");
    let colTwo = document.getElementById("colTwo");
    let colThree = document.getElementById("colThree");

    if(boxCounter == 1) {
        colOne.appendChild(pokeLink);
    } else if(boxCounter == 2) {
        colTwo.appendChild(pokeLink);
    } else {
        colThree.appendChild(pokeLink);
    }

    mainCont.appendChild(colOne);
    mainCont.appendChild(colTwo);
    mainCont.appendChild(colThree);

    if(boxCounter == 3) {
        boxCounter = 0;
    }
    boxCounter++;

    pokeLink.addEventListener("click", () => {
        console.log(pokeLink);
        sessionStorage.setItem("pokemon", pokeLink.firstChild.firstChild.textContent);
        addNewEvent(pokeLink.firstChild.firstChild.textContent);
        })
}

function addNewEvent(poke_name) {
    var now = new Date(Date.now());
    var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    console.log(formatted);
    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/times/insert",
        type: "put",
        data: {
            text: `${poke_name}`,
            hits: 1,
            time: now
        },
        success: (res)=>{console.log(res)}
    })
}



