// dependencies
var request = require("request");
var cheerio = require("cheerio");

var Scraper = function(callback) {

    // first grab the html url, getting all html inside
    request("https://www.nytimes.com/section/books?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Books&WT.nav=page", function(err, response) {
        var articleArray = [];

        // use cheerio to load response data
        var $ = cheerio.load(response.body);

        // grabbing each div with the class 'story-body'
        $("div.story-body").each(function(i, element) {

            // find h2 with class headline and link href with class story-link
            var articleTitle = $(element)
                .children("h2.headline")
                .text();

            var articleURL = $(element)
                .find("a")
                .attr("href");

            var articleObj = {
                title: articleTitle,
                url: articleURL,
            };

            if(articleObj.title.length > 0){
                articleArray.push(articleObj);
            }

        });
        // after loop finshes, use callback to send results:
        callback(articleArray);

    })
};

module.exports = Scraper;
