function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
const resultsApp = document.getElementById('videoPlayer');

function init() {
    gapi.client.setApiKey("AIzaSyBmyogOtizklthGZI6j9_XFRgX7tvaNxFI");
    gapi.client.load("youtube", "v3", function () {
        // prepare request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(movieTrailer + 'trailer'),
            maxResults: 1
        });

        // execute request
        request.execute(function (response) {
            var results = response.result;
            console.log(movieTrailer);
            console.log(response);
            resultsApp.src="https://www.youtube.com/embed/" + results.items[0].id.videoId;
        });
    });
}