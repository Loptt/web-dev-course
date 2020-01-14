let form = document.getElementById('commentForm');

document.getElementsByTagName("fieldset")[0].innerHTML += '<div id="error"></div>'

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let errorSpace = document.getElementById("error");

    errorSpace.innerHTML = "";

    if (event.target.fname.value === "") {
        errorSpace.innerHTML += '<p>Please provide a First Name</p>'
        console.log("First Name Empty");
    }

    if (event.target.lname.value === "") {
        errorSpace.innerHTML += '<p>Please provide a Last Name</p>'
        console.log("Last Name Empty");
    }

    if (event.target.email.value === "") {
        errorSpace.innerHTML += '<p>Please provide an email</p>'
        console.log("Email Empty")
    }

    if (event.target.tele.value === "") {
        errorSpace.innerHTML += '<p>Please provide a Phone Number</p>'
        console.log("Phone number Empty")
    }

    if (event.target.rate.value === "noselect") {
        errorSpace.innerHTML += '<p>Please provide a Rating</p>'
        console.log("Rate Empty")
    }

    if (event.target.visit.value === "") {
        errorSpace.innerHTML += '<p>Please select visit</p>'
        console.log("Viist Empty")
    }
})

function init() {

}