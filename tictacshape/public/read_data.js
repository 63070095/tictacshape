var ref = firebase.database().ref("Userstatus");
let readData = (snapshot) => {
        snapshot.forEach((data) => {
            console.log(data.key)
            var Uscore = data.val().score;
            var Puser = data.val().username;
            var Win = data.val().winCount;
            var Time = data.val().playTime;
            document.querySelector('#user_profile').innerHTML = `
            <div class="userItem">Username : ${Puser}</div>
            <div class="userItem">Score : ${Uscore}</div>
            <div class="userItem">Win : ${Win}</div>
            <div class="userItem">PlayTime : ${Time}</div>`;
            console.log(Puser);
});}

let getList = (user) => {
    if (user) {
        userListref.child(user.uid).on("value", (snapshot) => {
                readData(snapshot);
            });
        }
};

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");
let setupUI = (user) => {
    if (user) {
        loginItems.forEach((item) => (item.style.display = "block"));
        logoutItems.forEach((item) => (item.style.display = "none"));
    } else {
        loginItems.forEach((item) => (item.style.display = "none"));
        logoutItems.forEach((item) => (item.style.display = "block"));
    }
}
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log("User :", user);
//         getList(user);
//     } 
//     setTimeout(() =>{
//         setupUI(user);
//     }, 500)
    
//   });

// const btnLogout = document.querySelector("#btnLogout");
// btnLogout.addEventListener("click", function() {
//     firebase.auth().signOut();
//     console.log("Logout completed.");
//     window.location = "login.html";
// })
function logout(){
    firebase.auth().signOut();
    setTimeout(function(){
        window.location.href='login.html'
        alert('Logout Compelete')
    }, 1000);
}