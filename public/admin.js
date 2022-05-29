document.addEventListener("DOMContentLoaded", () => {
    getUser();
})

function getUser() {

    fetch(`https://pokedex-assignment3.herokuapp.com/user`)
    .then(response => response.json())
    .then(function(data) {
        var id = sessionStorage.getItem("user");
        var table = document.getElementById("user-table");
        for (const element of data) {

            tr = table.insertRow();

            var id = tr.insertCell();
            var email = tr.insertCell();
            var type = tr.insertCell();
            var update = tr.insertCell();

            updateA = document.createElement("a");
            updateA.setAttribute("id", `${element._id}`);
            updateA.innerHTML = "Update";
            updateA.classList.add("abutton");

            updateA.addEventListener("click", () => {
                window.location.href = "/update";
            })

            id.appendChild(document.createTextNode(`${element._id}`));
            email.appendChild(document.createTextNode(`${element.email}`));
            type.appendChild(document.createTextNode(`${element.type}`));
            update.appendChild(updateA);
        }
    })
}