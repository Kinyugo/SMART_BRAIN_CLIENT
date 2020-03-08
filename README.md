# SMARTBRAIN

This is a project that uses the [Clarifai api](https://docs.clarifai.com/) to detect faces in photos.

## Setup

1. Setup the backend first.
2. Get your [clarifai api key](https://portal.clarifai.com/signup).
3. Create a file in the src directory and name it **clarifai-apikey.js**.
4. Export your api key from the file as a default export:

```javascript
const API_KEY = "your_api_key_here";
export default API_KEY;
```

5. Run `npm install` from the root directory.
6. Run `npm start` visit the [localhost](https://localhost:3000)
