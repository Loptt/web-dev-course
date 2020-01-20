function fetchNews(term) {
    let url = 'https://newsapi.org/v2/top-headlines?' +
    'q=' + term + "&" +
    'apiKey=6586b346634c444fb04a127d1685a3f2';
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
    let articles = responseJSON.articles;

    $('#jsResult').html("");
    
    articles.forEach((article) => {
        $('#jsResult').append(`
            <div class="article">
                <h1>${article.title}</h1>
                <img src="${article.urlToImage}">
                <h4>By: ${article.author}</h4>
                <p>${article.description}</p>
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

        fetchNews(term);
        $('#term').val("");
    });

}

function init() {
    watchForm();
}

init();