const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", loginUser);
  
const loginFeedback = document.querySelector("#feedback-msg-login");
  //const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"));

function loginUser(event){
    event.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        loginFeedback.style = "color: green";
        loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Login succeed!.";
        setTimeout(() =>{
            loginForm.reset();
            loginFeedback.innerHTML = "";
        }, 1000)
        window.location = "indexmain.html";
    })
    .catch((error) => {
        loginFeedback.style = "color: crimson";
        loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
        loginForm.reset();
    })
}

//const username = signupForm["username"].value;
//const profileName = document.querySelector(".name");
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User :", user);
        getList(user);
    } 
    setTimeout(() =>{
        setupUI(user);
    }, 500)
    
  });

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener("click", function() {
    firebase.auth().signOut();
    console.log("Logout completed.");
    window.location = "login.html";
})
