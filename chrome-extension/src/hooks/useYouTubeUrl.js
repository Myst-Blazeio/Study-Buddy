export const fetchYouTubeUrl = async () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0]?.url || null;
            if (url && url.includes("youtube.com/watch")) {
                resolve(url);
            } else {
                alert("❌ Please open a YouTube video tab.");
                resolve(null);
            }
        });
    });
};
