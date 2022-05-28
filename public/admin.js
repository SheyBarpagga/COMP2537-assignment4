document.addEventListener("DOMContentLoaded", () => {

})

function getUser() {

    fetch(`https://pokedex-assignment3.herokuapp.com/user`)
    .then(response => response.json())
    .then(function(data) {
        var id = sessionStorage.getItem("user");
        var table = document.getElementById("user-table");
        for (const element of data) {
            
        }
    })
}