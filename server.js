const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/get-thumbnail", async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const videoId = extractVideoId(videoUrl);

    if (videoId) {
        try {
            const thumbnailUrl = await fetchThumbnail(videoId);
            res.status(200).json({ thumbnailUrl });
        } catch (error) {
            console.error("Error fetching thumbnail:", error);
            res.status(500).json({ error: "An error occurred while fetching the thumbnail." });
        }
    } else {
        res.status(400).json({ error: "Invalid YouTube URL." });
    }
});

function extractVideoId(url) {
    // ... Same extraction function as shown in the previous example ...
}

async function fetchThumbnail(videoId) {
    const apiKey = "YOUR_YOUTUBE_API_KEY";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items[0] && data.items[0].snippet.thumbnails && data.items[0].snippet.thumbnails.high) {
        return data.items[0].snippet.thumbnails.high.url;
    } else {
        throw new Error("Thumbnail not found.");
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
