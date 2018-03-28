// dependencies
var request = require("request");
var cheerio = require("cheerio");
var Models = require("../models");


var Scraper = function(callback) {
    // first grab the html url, getting all html inside
    request("https://www.nytimes.com/section/books?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Books&WT.nav=page").then(function(response) {
        var articleArray = [];
        // grabbing each div with the class 'story-body'
        $("div.story-body").each(function(i, element) {
            // use cheerio to load response data
            var $ = cheerio.load(response.data);

            // empty object to save result in and later send
            var articleObj = {};

            // find h2 with class headline and link href with class story-link
            articleObj.title = $(this)
                .children("h2.headline")
                .text();
            articleObj.url = $(this)
                .children("a.story-link")
                .attr("href");
            articleObj.saved = false;

            articleArray.push(articleObj);
        });

        // after loop finshes, use callback to send results:
        callback(articleArray);

    })
};

module.exports = Scraper;
