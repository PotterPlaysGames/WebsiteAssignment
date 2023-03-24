//assigns the ID's "login-form," "login-form-submit" and "login-error-msg" to the respective variables
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

//Listens for the login button
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    //checks the username and password fields and if they are correct, runs greetingResult, takes you to the home page and sets Login to true.
    if (username === "student" && password === "student") {
        alert("Login Success!");
        location.href = "../view/index.html"
        localStorage.setItem("Login", true)
    } else {
        //if the user and pass are wrong, it will show loginErrorMsg.
        loginErrorMsg.style.opacity = 1;
    }
})




