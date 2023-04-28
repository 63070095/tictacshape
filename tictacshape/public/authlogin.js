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
        //window.location = "index.html";
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
        
    } 
    setTimeout(() =>{
        setupUI(user)
        readData(user)
    }, 500)
    
  });

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");
  
let setupUI = (user) => {
    if (user) {
        document.querySelector('#user_profile').innerHTML = user.email;
        loginItems.forEach((item) => (item.style.display = "block"));
        logoutItems.forEach((item) => (item.style.display = "none"));
    } else {
        loginItems.forEach((item) => (item.style.display = "none"));
        logoutItems.forEach((item) => (item.style.display = "block"));
    }
}

const btnLogout = document.querySelector("#btnLogout");
btnLogout.addEventListener("click", function() {
    firebase.auth().signOut();
    console.log("Logout completed.");
})

var ref = firebase.database().ref("Userstatus");
let readData = (snapshot) => {
        snapshot.forEach((data) => {
            console.log(data.key)
            var score = data.val().Uscore;
            var username = data.val().username;
            document.querySelector('#user_profile').innerHTML = `${username} (${score})`;
            
});}