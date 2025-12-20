# Shankhnaad AI - Spiritual Guidance Platform

A spiritual AI chatbot powered by Google's Gemini AI, offering wisdom from the Bhagavad Gita and AI image generation capabilities.

## Features

- 💬 **AI Chat**: Powered by Gemini 2.5 Flash for spiritual guidance
- 🎨 **AI Image Generation**: Create spiritual artwork using Stable Diffusion
- 📖 **Scripture Integration**: Local RAG with Bhagavad Gita verses
- 🎙️ **Voice Input**: Speech-to-text for hands-free interaction
- 🔊 **Text-to-Speech**: Listen to AI responses
- 📱 **Responsive Design**: Works on desktop and mobile

## Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sharmamayankkkk/Shankhnaad.git
   cd Shankhnaad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy .env file and add your API keys
   # REACT_APP_GEMINI_API_KEY is required for chat
   # REACT_APP_HF_API_TOKEN is required for image generation
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 🎨 Image Generation Setup

**Great News**: Image generation with Stable Diffusion now works **out of the box** - no setup required!

We use Pollinations.ai's free Stable Diffusion service which requires:
- ❌ No API keys
- ❌ No signup
- ❌ No configuration
- ✅ Just works instantly!

Simply type: "Generate image of Krishna" or any other spiritual art prompt.

For more details, see: **[IMAGE_GENERATION_SETUP.md](./IMAGE_GENERATION_SETUP.md)**

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required for AI chat functionality
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Image generation now works without any token!
# (Removed REACT_APP_HF_API_TOKEN requirement)
```

## Getting Started with Create React App

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
