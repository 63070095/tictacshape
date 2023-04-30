var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    getList(user);
});

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
    ref.child(user.uid).on("value", (snapshot) => {
            readData(snapshot);
        });
    }
};

function logout(){
    firebase.auth().signOut();
    setTimeout(function(){
        window.location.href='login.html'
        alert('Logout Compelete')
    }, 1000);
}