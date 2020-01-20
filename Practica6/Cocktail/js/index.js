function fetchDrink(term) {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`;
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            console.log(responseJSON);
            displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    let drinks = responseJSON.drinks;

    $('#jsResult').html("");
    
    drinks.forEach((drink) => {
        let ingredientsHTML = "";

        for (let i = 1; i <= 15; i++) {
            let ingTerm = `strIngredient${i}`;
            let ingQty = `strMeasure${i}`;
            if (drink[ingTerm] == null) {
                console.log("No ingredient " + i);
                break;
            } else {
                if (drink[ingQty] == null) {
                    ingredientsHTML += `<li>${drink[ingTerm]}</li>`;                  
                } else {
                    ingredientsHTML += `<li>${drink[ingQty]} ${drink[ingTerm]}</li>`;
                }
            }
        }
        $('#jsResult').append(`
            <div class="drink">
                <h1>${drink.strDrink}</h1>
                <img src="${drink.strDrinkThumb}">
                <h3>Ingredientes</h3>
                <ul>${ingredientsHTML}</ul>
            </div>
        `);
    });
}

function watchForm() {
    $('#form').on('submit', function(event) {
        event.preventDefault();
        let term = $('#term').val();

        if (term == "") {
            console.log("Empty term");
            return;
        }

        fetchDrink(term);
        $('#term').val("");
    });

}

function init() {
    watchForm();
}

init();