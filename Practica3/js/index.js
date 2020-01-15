$('.thumbnail').on("click", function(event) {
    $('.hero').find('img').attr("src", $(this).find('img').attr("src"));
});

