$(document).ready(function(){
    var scraper = require("../scripts/scrape.js");

    $(".button-scraper").on("click", function(){
        // scrape
        // let users know in modal how many documents were saved
        // send scrape data to routes to be saved to database
        $('#modal1').modal('open');
    });

    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();

        $(".save-button").on("click", function(){


        });

});