document.addEventListener("DOMContentLoaded", function () {
    const thumbnailForm = document.getElementById("thumbnailForm");
    const videoUrlInput = document.getElementById("videoUrl");
    const thumbnailPreview = document.getElementById("thumbnailPreview");
    const thumbnailImage = document.getElementById("thumbnailImage");

    thumbnailForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const videoUrl = videoUrlInput.value;
        const videoId = extractVideoId(videoUrl);

        if (videoId) {
            fetchThumbnail(videoId)
                .then(thumbnailUrl => {
                    thumbnailImage.src = thumbnailUrl;
                    thumbnailPreview.classList.remove("hidden");
                })
                .catch(error => {
                    console.error("Error fetching thumbnail:", error);
                });
        }
    });

    function extractVideoId(url) {
        const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/v\/|\/vi\/|\/u\/\w\/|\/embed\/|\/v\/|e\/|vi\/|u\/\w\/|embed\/|v\/|u\/\w\/|watch\?v=|\/watch\?v=|\/watch\?feature=player_embedded&v=|%2Fvideos%2F|\/%3Fv%3D|^v=)([^#\&\?]*).*/);
        return videoIdMatch ? videoIdMatch[1] : null;
    }

    function fetchThumbnail(videoId) {
        const apiKey = "YOUR_YOUTUBE_API_KEY";
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const thumbnailUrl = data.items[0].snippet.thumbnails.high.url;
                return thumbnailUrl;
            });
    }
});
