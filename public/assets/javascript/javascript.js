$(document).ready(function(){
    // $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();

    var scrapeArticles = function(){
        $.get("/api/scrape").then(function(response) {
            var message = response.response;
            $('#modal1').modal('open');
            $("#message-h3").text(message);
        });

    };

    var renderArticles = function(){
        $(".article-div").empty();
        console.log("render articles function ran");
        $.get("/api/unsaved").then(function(response) {
            for (var i = 0; i < response.length; i++){
                var articleDiv = $("<div>");

                articleDiv.addClass("row");

                var divHTML = "<div class='col s12 m12'><div class='card'><div class='card-content'><h3 class='left-align headline-text'><a href='" + response[i].url + "'>" + response[i].title + "</a></h3><button class='save-articles btn-floating btn-large waves-effect waves-light red' id='" + response[i]._id + "'><i class='material-icons'>add</i></button></div></div></div>";

                articleDiv.html(divHTML);

                $(".article-div").append(articleDiv);
            }

        });
    };

    var initiateHomePage = function(){
        $(".article-div").empty();
 
        $.get("/api/unsaved").then(function(response) {
            for (var i = 0; i < response.length; i++){
                var articleDiv = $("<div>");

                articleDiv.addClass("row");

                var divHTML = "<div class='col s12 m12'><div class='card'><div class='card-content'><h3 class='left-align headline-text'><a href='" + response[i].url + "'>" + response[i].title + "</a></h3><button class='save-articles btn-floating btn-large waves-effect waves-light red' id='" + response[i]._id + "'><i class='material-icons'>add</i></button></div></div></div>";

                articleDiv.html(divHTML);

                $(".article-div").append(articleDiv);
            }

        });
    };

    $(".button-scraper").on("click", function(){
        scrapeArticles();
        renderArticles();
    });


    $(".article-div").on("click", ".save-articles", function(){
        event.preventDefault();
        var articleID = {
            id: $(this).attr("id")
        };
        console.log(articleID);

        $.ajax("/api/savearticle", {
            type: "PUT",
            data: articleID
        }).then(
            function () {
                renderArticles();
            }
        );
    });

    initiateHomePage();

    // ***** SAVE PAGE JAVASCRIPT *****

    var initiateSavedPage = function(){
        $(".saved-article-div").empty();
 
        $.get("/api/saved").then(function(response) {
            for (var i = 0; i < response.length; i++){
                var savedArticleDiv = $("<div>");

                savedArticleDiv.addClass("row");

                var divHTML = "<div class='col s12 m12'><div class='card'><div class='card-content'><h3 class='left-align headline-text'><a href='" + response[i].url + "'>" + response[i].title + "</a></h3><button class='add-note btn-floating btn-large waves-effect waves-light green' id='" + response[i]._id + "'><i class='material-icons'>add</i></button><button class='read-notes btn-floating btn-large waves-effect waves-light blue'><i class='material-icons'>dehaze</i></button></div></div></div>";

                savedArticleDiv.html(divHTML);

                $(".saved-article-div").append(savedArticleDiv);
            }
        });
    };

    var clickedArticleId;

    $(".saved-article-div").on("click", ".add-note", function(){
        clickedArticleId = $(this).attr("id");
        $('#modal2').modal('open');
    });

    $(".saved-article-div").on("click", ".read-notes", function(){
        $('#modal3').modal('open');
    });

    $("#submit-button").on("click", function(){
        var noteBody = {
            _articleId: clickedArticleId,
            body: $("#note").val().trim()
        };
        
        $.ajax("/api/notes", {
            type: "POST",
            data: noteBody
        }).then(
            function() {
                console.log("note added");
            }
        );
    });

    initiateSavedPage();

});