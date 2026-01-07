# CanvasX – Visual Website Builder

## Project Overview
CanvasX is a web-based visual website builder that allows users to design web pages using
drag-and-drop blocks such as Hero, About, Gallery, Contact, Publications, and Footer.
Users can visually arrange these blocks on a canvas, edit their content in real time,
preview the layout, and export the final design as a standalone HTML file.

The project focuses on making basic website creation accessible to users who do not
have prior knowledge of HTML or CSS.

---

## Problem Statement
Creating structured web pages typically requires knowledge of frontend technologies
such as HTML, CSS, and JavaScript. This creates a barrier for beginners, designers,
and non-technical users.

CanvasX solves this problem by providing:
- A no-code visual editor
- Real-time preview of layouts
- One-click export to HTML

This allows users to focus on **design and content**, rather than code.

---

## Features
- User authentication (Sign up / Login) using Firebase
- Drag-and-drop block-based editor
- Editable content inside blocks (text, images, contact details)
- Live preview canvas
- Export designed page as a downloadable HTML file
- Responsive block resizing
- Clean separation between editor, preview, and export logic

---

## Usage Guide

### 1. Authentication
- Users can register or log in using email and password.
- Authentication is handled via Firebase Authentication.

### 2. Building a Page
- Add blocks (Hero, About, Gallery, Contact, etc.) to the canvas.
- Drag blocks to reposition them.
- Resize blocks to adjust layout.
- Edit text directly inside blocks.

### 3. Preview
- The preview shows how the page will look to end users.
- Content and layout updates reflect instantly.

### 4. Export
- Click the **Export Project** button.
- A complete HTML file is generated and downloaded.
- The exported file can be opened in any browser.

---

## Tech Stack

### Frontend
- React.js 
- JavaScript 
- HTML5 & CSS3

### Drag & Drop
- Interact.js – used for drag, resize, and drop interactions on the canvas

### Backend / Services
- Firebase Authentication – user login and registration
- Firebase Realtime Database – storing user and project data

### Tools & Libraries
- React Router – navigation
- React Toastify – user notifications
- Open-source UI library (Uiverse.io) – login and register page UI
- GitHub – version control

### AI Assistance
- Copilot
- ChatGPT


---

## Credits & Attributions

- React.js – Frontend framework
- Firebase – Authentication and Realtime Database
- Interact.js – Drag and resize functionality
- React Toastify – Notification system

### Open-source UI
- Login/Register UI inspired from:
  https://uiverse.io/Spacious74/selfish-dragon-64

### AI Tools
- Copilot – assisted with React, Interact.js, and Firebase integration ,used for debugging, understanding JavaScript concepts
- ChatGPT – used for debugging, understanding JavaScript concepts,
  React state management, export logic, and overall architectural guidance


## Setup & Installation

1. Clone the repository
   ```bash
   git clone https://github.com/25je0927-cpu/CanvasX-WebsiteMakerM



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
