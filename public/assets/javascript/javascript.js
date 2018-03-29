$(document).ready(function(){
    // $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();

    $(".button-scraper").on("click", function(){
        scrapeArticles();
        // $('#modal1').modal('open');
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
        $.get("api/getarticles").then(function(response) {
            console.log(response);
        });
    }

});