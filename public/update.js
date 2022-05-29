$(document).ready(() => {
    user = sessionStorage.getItem("update");
    $("#label").html(`User: ${user}`);
    $("#update").on("click", updateUser);
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
    email = $("#email").val();
    password = $("#password").val();
    type = $("#type").val();

    $.ajax({
        url: "https://fathomless-fortress-22361.herokuapp.com/admin/delete",
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