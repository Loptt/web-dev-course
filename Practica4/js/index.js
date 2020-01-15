$('#number-chooser').on('submit', function(event) {
    let number = $('#number-choice').val();
    console.log(number);

    for (let i = 0; i < number; i++) {
        if (i % 15 === 0) {
            $('.js-results').append(`<div class="fizz-buzz-item fizzbuzz"><span>fizzbuzz</span></div>`);
        } else if (i % 5 === 0){
            $('.js-results').append(`<div class="fizz-buzz-item buzz"><span>buzz</span></div>`);
        } else if (i % 3 === 0) {
            $('.js-results').append(`<div class="fizz-buzz-item fizz"><span>fizz</span></div>`);
        } else {
            $('.js-results').append(`<div class="fizz-buzz-item"><span>` + i + `</span></div>`);
        }
    }
});