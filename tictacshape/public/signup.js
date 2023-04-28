// const signupForm = document.querySelector("#signup-form");
// signupForm.addEventListener("submit", createUser);

// const signupFeedback = document.querySelector("#feedback-msg-signup");

// function createUser(event){
//     event.preventDefault();
//     const userListRef = firebase.database().ref("UserList");
//     const username = signupForm["username"].value;
//     const email = signupForm["email"].value;
//     const password = signupForm["password"].value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(() => {
//         signupFeedback.style = "color: green";
//         signupFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Signup completed.";
//         const currentUser = firebase.auth().currentUser;
//         userListRef.child(currentUser.uid).set({
//         username: username,
//         score: 0,
//         winstr: 0,})
//         setTimeout(() =>{
//             signupForm.reset();
//             signupFeedback.innerHTML = "";
//         }, 1000)
//     })
//     .catch((error) => {
//         signupFeedback.style = "color: crimson";
//         signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
//         signupForm.reset();
//     })
// }

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", createUser);

const signupFeedback = document.querySelector("#feedback-msg-signup");

function createUser(event){
    event.preventDefault();
    const userListRef = firebase.database().ref("Userstatus");
    const username = signupForm["username"].value;
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        signupFeedback.style = "color: green";
        signupFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Signup completed.";
        const currentUser = firebase.auth().currentUser;
        userListRef.child(currentUser.uid).push({
        username: username,
        score: 0,
        winCount: 0,
        playTime: 0,
    })
        setTimeout(() =>{
            signupForm.reset();
            signupFeedback.innerHTML = "";
        }, 1000)
    })
    .catch((error) => {
        signupFeedback.style = "color: crimson";
        signupFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
        signupForm.reset();
    })
}
