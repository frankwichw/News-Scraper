$(document).ready(function(){
    var scraper = require("../scripts/scrape.js");

    $(".button-scraper").on("click", function(){
        $.get("/api/scrape").then(function(data) {
 
            clearPage();
            
          });
        $('#modal1').modal('open');
    });

    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();

    $(".save-button").on("click", function(){


    });

    var clearPage = function(){
        $(".article-div").empty();
    };

});