var currentUser;
firebase.auth().onAuthStateChanged((user) => {
    getList(user);
});

var ref = firebase.database().ref("Userstatus");
let readData = (snapshot) => {
    snapshot.forEach((data) => {
        console.log(data.key)
        // var Uscore = data.val().score;
        var Puser = data.val().username;
        // var Win = data.val().winCount;
        // var Time = data.val().playTime;
        document.querySelector('#user_name').innerHTML = `${Puser}`;
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