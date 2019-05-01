function init() {
    gapi.client.setApiKey("AIzaSyBmyogOtizklthGZI6j9_XFRgX7tvaNxFI");
    gapi.client.load("youtube", "v3", function () {
        // prepare request
        var search = movieTitle.concat(' trailer ' + movieYear).replace(/%20/g, '+')
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(search),
            maxResults: 1
        });

        // execute request
        request.execute(function (response) {
            var results = response.result;
            console.log(search);
            $("results").append(results.items[0].id.videoId + ' ' + results.items[0].snippet.title);
        });
    });
}