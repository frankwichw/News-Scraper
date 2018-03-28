// dependencies
var request = require("request");
var cheerio = require("cheerio");


// first grab the html url, getting all html inside
var scraper = function(callback) {
    request("https://www.nytimes.com/section/books?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Books&WT.nav=page").then(function(response) {
        // saving an emtpy array to push looped data into
        var articles = [];
        // Now, we grab every h2 within an article tag, and do the following:
        $("div.story-body").each(function(i, element) {
            // use cheerio to load response data
            var $ = cheerio.load(response.data);

            // empty object to save result in and later send
            var result = {};

            // find h2 with class headline and link href with class story-link
            result.title = $(this)
                .children("h2.headline")
                .text();
            result.link = $(this)
                .children("a.story-link")
                .attr("href");

            articles.push(result);
        });

        // after loop done, use callback to send results:
        callback(articles);

    })
};

module.exports = scraper;
