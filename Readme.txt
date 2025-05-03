# Eva - Your Study Buddy Chrome Extension for YouTube

Eva is a Chrome extension designed to enhance your YouTube study sessions with a suite of powerful tools:

## Features
1. **AI Tutor**: Integrated chatbot to resolve real-time doubts and queries during study sessions.
2. **Quick Notes**: Take manual notes and enhance them using the built-in notes enhancement feature.
3. **Video Summarizer**: Summarize entire videos into study notes and download them as a PDF.

---

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites
- Install dependencies using `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```
- Create a `.env` file and add your Google API key:
    ```plaintext
    GOOGLE_API_KEY="your_gemini_api_key"
    ```
- Install Node.js dependencies:
    ```bash
    npm install
    ```

---

### Steps to Run

1. **Frontend Setup**:
     - Navigate to the `extension-frontend` directory:
         ```bash
         cd extension-frontend
         ```
     - Install dependencies and build the project:
         ```bash
         npm install
         npm run build
         ```

2. **Backend Setup**:
     - Open Eclipse IDE and import the `extension-backend` as an existing Maven project.
     - Run the Spring Boot application to start the server.

3. **Load the Extension in Chrome**:
     - Open the Chrome browser and go to the Extensions tab.
     - Toggle **Developer Mode** to "ON".
     - Click **Load Unpacked** and select the `dist` folder under `extension-frontend`.
     - Enable the extension in the Extensions tab.

4. **Using the Extension**:
     - Go to [YouTube](https://www.youtube.com) and play a video.
     - Click on the Eva extension icon.
     - Start enjoying the features!

---

## Enjoy Learning with Eva!
