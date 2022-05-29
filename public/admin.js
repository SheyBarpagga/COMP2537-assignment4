$(document).ready(() => {
    getUser();
    $("#add").bind("click", createUser);
})

function getUser() {

    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/user",
        type: "get",
        success: function(data) {
        var id = sessionStorage.getItem("user");
        var table = document.getElementById("user-table");
        data = $.parseJSON(data);
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
                sessionStorage.setItem("update", `${element._id}`);
                return window.location.href = "/update.html";
            })

            id.appendChild(document.createTextNode(`${element._id}`));
            email.appendChild(document.createTextNode(`${element.email}`));
            type.appendChild(document.createTextNode(`${element.type}`));
            update.appendChild(updateA);

        }
    }
    })
}

function createUser() {

    email = $("#email").val();
    password = $("#password").val();
    type = $("#type").val();

    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/admin/insert",
        type: "put",
        data: {
            email: `${email}`,
            password: `${password}`,
            type: `${type}`
        },
        success: function() {
            window.location.href = '/admin.html'
        }
    })
}