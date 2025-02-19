# CodeSage-AI-Powered-Code-Reviewer
Developed a full-stack Code Review Web App using React and Express.js. The app features a custom code editor with syntax highlighting and leverages the Google Generative AI API to deliver real-time, detailed reviews, offering feedback on code quality, best practices, and performance.

# Code Review Web App

This is a simple React-based web application that allows users to input JavaScript code, submit it for review, and receive feedback in markdown format.

## Features
- **Code Editor**: Supports syntax highlighting with Prism.js.
- **Code Review**: Sends the user's code to a backend server for review.
- **Markdown Rendering**: Displays review responses using `react-markdown` with syntax highlighting.
- **Error Handling**: Handles request errors and provides user-friendly messages.
- **Responsive UI**: Adjusts to different screen sizes.

## Tech Stack
- **Frontend**: React, `react-simple-code-editor`, `prismjs`, `react-markdown`, `rehype-highlight`
- **Backend (Expected API)**: Express.js (or any other backend handling POST requests to `/ai/get-review`)
- **Styling**: CSS with a dark mode-friendly theme



## Usage
1. Enter your code in the editor.
2. Click the **Review** button.
3. The review feedback will be displayed on the right panel.

## API Endpoint
The frontend expects an API at:
```
POST http://localhost:3000/ai/get-review
```
Request Body:
```json
{
  "code": "<user's code>"
}
```
Response:
```json
"Review content in markdown format."
```

## Troubleshooting
Frontend Issues:

-Ensure valid code is entered before clicking the review button.
-Verify that the backend server is running and accessible.

Backend Issues:

-Confirm that the backend is running on http://localhost:3000.
-Ensure that the .env file contains the correct GOOGLE_GEMINI_KEY.
-Check console logs for any errors from the AI service.



## File Structure

├── backend
│   ├── server.js
│   └── src
│       ├── app.js
│       ├── controllers
│       │   └── ai.controller.js
│       ├── routes
│       │   └── ai.routes.js
│       └── services
│           └── ai.services.js
└── frontend
    └── (React application files)


