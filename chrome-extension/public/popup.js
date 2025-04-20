document.getElementById('startButton').addEventListener('click', function () {
    // Get the URL of the currently playing YouTube video
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const videoUrl = tabs[0].url;

        if (videoUrl && videoUrl.includes('youtube.com/watch')) {
            // Send the video URL to the backend for processing
            fetch('http://localhost:8080/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ youtubeUrl: videoUrl })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Video summarized:', data);
                    document.getElementById('startButton').disabled = true; // Disable Start Now button
                    document.getElementById('exportButton').disabled = false; // Enable Export PDF button
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('Please open a YouTube video.');
        }
    });
});

document.getElementById('exportButton').addEventListener('click', function () {
    // Send request to backend to generate the PDF
    fetch('http://localhost:8080/api/generateSummary?videoText=your_video_text_here')
        .then(response => response.blob())
        .then(blob => {
            // Create a URL for the PDF and trigger the download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'summary.pdf';
            link.click();
            window.URL.revokeObjectURL(url); // Clean up
        })
        .catch(error => console.error('Error:', error));
});
