var ref = firebase.database().ref("Userstatus");
let readData = (snapshot) => {
        snapshot.forEach((data) => {
            console.log(data.key)
            var score = data.val().score;
            var username = data.val().username;
            // document.querySelector('#user-profile-name').innerHTML = `${username} (${score})`;
            
});}

var ref = firebase.database().ref("MyList");

let readList = (snapshot) => {
    document.getElementById("main-content").innerHTML = "";

    const currentUser = firebase.auth().currentUser;
    // userListRef.child(currentUser.uid).once("value").then((snapshot) => {
        snapshot.forEach((data) => {
            var username = data.val().username;
            var score = data.val().score; 
            var time = data.val().playTime;
            
            const newDiv = `
            <ul class="list-group">
            <li class="list-group-item"><i class="fas fa-user"></i> Username: ${username}</li>
            <li class="list-group-item"><i class="fas fa-envelope"></i> Email: ${data.val().email}</li>
            <li class="list-group-item"><i ></i> Number of win : ${score}</li>
            <li class="list-group-item"><i ></i> Play Time : ${time}</li>
        </ul>`;

                const newElement = document.createRange().createContextualFragment(newDiv);
                document.getElementById("card-body").appendChild(newElement);
            });
        };
    ;

let deleteList = (event) => {
    const id = event.currentTarget.getAttribute('data-id');
    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).child(id).remove();
    console.log(`delete on id:${id}`);
}

let getList = (user) => {
    if (user) {
        userListRef.child(user.uid).on("value", (snapshot) => {
            readList(snapshot);
        });
    }
};

const logoutItems = document.querySelectorAll(".logged-out");
const loginItems = document.querySelectorAll(".logged-in");

let setupUI = (user) => {
    if (user) {
        loginItems.forEach((item) => (item.style.display = "inline-block"));
        logoutItems.forEach((item) => (item.style.display = "none"));
    } else {
        loginItems.forEach((item) => (item.style.display = "none"));
        logoutItems.forEach((item) => (item.style.display = "inline-block"));
    }
}