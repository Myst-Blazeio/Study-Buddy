// /src/content/contentScript.js
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "SHOW_TOOLBAR") {
        const alreadyInjected = document.getElementById("yt-ai-toolbar");
        if (!alreadyInjected) {
            import("./injectedUI.jsx");
        }
    }
});

// Also inject toolbar on page load if already logged in
if (localStorage.getItem("loggedIn") === "true") {
    import("./injectedUI.jsx");
}
