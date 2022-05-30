document.addEventListener("DOMContentLoaded", () => {

    var enter = document.getElementById("login");
    enter.addEventListener("click", () => {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        fetch("/user")
        .then(response => response.json())
        .then(function(data) {
            data.forEach(element => {
                console.log(element.email)
                if(((element.email).trim().localeCompare(email)) == 0 && ((element.password).trim().localeCompare(password)) == 0) {
                    if((element.type).trim().localeCompare('admin') == 0) {
                        sessionStorage.setItem("logged-in", true);
                        sessionStorage.setItem("user", `${element._id}`);
                        sessionStorage.setItem("cart", []);
                        sessionStorage.setItem("admin", "y");
                        return window.location.href = "/admin.html";
                    }
                    sessionStorage.setItem("logged-in", true);
                    sessionStorage.setItem("user", `${element._id}`);
                    sessionStorage.setItem("cart", []);
                    sessionStorage.setItem("admin", "n");
                    return window.location.href = "/user.html";
                } else {
                    document.getElementById("email").style.borderColor = "red";
                    document.getElementById("password").style.borderColor = "red";
                }
            });
        })
    })

})