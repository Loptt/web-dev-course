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
        fetchDog();
    })
}

function init() {
    watchForm();
}

init();