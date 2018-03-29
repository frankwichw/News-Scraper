$(document).ready(function(){
    // $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();

    $(".button-scraper").on("click", function(){
        scrapeArticles();
        $('#modal1').modal('open');
    });

    $(".save-button").on("click", function(){

    });

    var scrapeArticles = function(){
        $.get("/api/scrape").then(function(response) {
            console.log(response);
            renderArticles();
        });
    };

    var renderArticles = function(){
        $(".article-div").empty();
        $.get("/api/unsaved").then(function(response) {
            console.log(response);
            for (var i = 0; i < response.length; i++){
                var html = "<div class='row'><div class='col s12 m12'><div class='card'><div class='card-content'><h3 class='left-align headline-text'><a href='" + response[i].url + "'>" + response[i].title + "</a></h3><a class='btn-floating btn-large waves-effect waves-light red save-button'><i class='material-icons' id='save-article'>add</i></a></div></div></div></div>";
            }

        });
    }

});