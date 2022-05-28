document.addEventListener("DOMContentLoaded", () => {
    prevOrder()
    tl()
}) 

function prevOrder() {
    fetch(`https://pokedex-assignment3.herokuapp.com/carts/get`)
    .then(response => response.json())
    .then(function(data) {
        var id = sessionStorage.getItem("user");
        var orders = document.getElementById("orders");
        for (const element of data) {
            if (element.id == id) {
                var box = document.createElement("div");
                var temp = element.pokemon;
                var v = document.createElement("p");
                v.innerHTML = `${temp}`;
                box.appendChild(v);
                orders.appendChild(box)
            }
        }
    })
}

function tl() {
    fetch(`https://pokedex-assignment3.herokuapp.com/times/getAllEvents`)
    .then(response => response.json())
    .then(function(data) {
        var tl = document.getElementById("timeline");
        for(var x = 0; x < 2; x ++) {
            var temp = document.createElement("p")
            temp.innerHTML = `${data[x].time}`
            tl.appendChild(temp);
        }
    })

}