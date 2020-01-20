function fetchUser(term) {
    let url = `https://api.github.com/users/${term}/repos`
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
    let repos = responseJSON;

    $('#jsResult').html("");
    
    repos.forEach((repo) => {
        
        $('#jsResult').append(`
            <div class="repo">
                <h1>${repo.name}</h1>
                <p>URL: <a target="_blank" href="${repo.svn_url}">${repo.svn_url}</a></p>
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

        fetchUser(term);
        $('#term').val("");
    });

}

function init() {
    watchForm();
}

init();