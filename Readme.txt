


Use requirements.txt for installing .venv =>  pip install -r requirements.txt  
create a .env file for google api GOOGLE_API_KEY="your_gemini_api_key"
install node modules: npm install

Steps to make this work:
1.cd extension-frontend 
npm install
npm run build

2. Open Eclispe IDE and import extension-backend as existing maven project
3. run the spring boot application to run the server

4. Go to extensions tab in google chrome and toggle developer mode "on"
5. Click load unpacked and select the dist folder under extension-frontend
6. Enable the extension in the extensions tab
7. Go to youtube.com and click on a video
8. Click the extension
9. Enjoy!!
