function fetchDog() {
    let url = "https://dog.ceo/api/breeds/image/random";
    let settings = {
        method: "GET"
    };

    fetch(url, settings).then((response) => {
        if (response.ok) {
            return response.json();
        }

        throw new Error(response.statusText);
    }).then((responseJSON) => {
        displayResults(responseJSON)
    })
}

function fetchDog2() {
    let url = "https://dog.ceo/api/breeds/image/random";

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    let results = document.getElementsByClassName('results');
    results[0].innerHTML = 
        `<h1>Your random image<h1>
        <p>
            <img src="${responseJSON.message}" />
        </p>`;
}

function watchForm() {
    let form = document.getElementById('randomDog');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        fetchDog2();
    })
}

function init() {
    watchForm();
}

init();