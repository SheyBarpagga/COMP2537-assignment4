$(document).ready(() => {
    thisUser = sessionStorage.getItem("user");
    user = sessionStorage.getItem("update");

    $("#label").html(`User: ${user}`);
    $("#update").on("click", updateUser);

    if(!(thisUser === user)) {
        $("#delete").on("click", deleteUser);
    } else {
        $("#delete").remove();
    }
})

function updateUser() {

    id = sessionStorage.getItem("update");
    email = $("#email").val();
    password = $("#password").val();
    type = $("#type").val();

    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/admin/update",
        type: "post",
        data: {
            id: `${id}`,
            email: `${email}`,
            password: `${password}`,
            type: `${type}`
        },
        success: function() {
            window.location.href = '/admin.html';
        }
    })
}

function deleteUser() {

    id = sessionStorage.getItem("update");
    id = id.trim();
    email = $("#email").val();
    password = $("#password").val();
    type = $("#type").val();

    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/admin/delete",
        type: "get",
        data: {
            id: `${id}`
        },
        success: function() {
            window.location.href = '/admin.html';
        }
    })
}