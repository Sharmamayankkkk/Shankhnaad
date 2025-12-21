# Shankhnaad AI - Spiritual Guidance Platform

**Live at:** [https://shankhnaad.krishnaconnect.org/](https://shankhnaad.krishnaconnect.org/)

A spiritual AI chatbot powered by Google's Gemini AI, offering wisdom from the Bhagavad Gita and AI-enhanced image generation capabilities.

## ✨ Features

- 💬 **AI Chat**: Powered by Gemini 2.5 Flash for spiritual guidance
- 🎨 **AI Image Generation**: Create stunning artwork using Stable Diffusion with AI-enhanced prompts
- 🤖 **Intelligent Detection**: Automatically detects image requests in natural conversation
- 🖼️ **Image Preview**: Click to view full-size images in modal with download option
- 📖 **Scripture Integration**: Local RAG with Bhagavad Gita verses
- 🎙️ **Voice Input**: Speech-to-text for hands-free interaction
- 🔊 **Text-to-Speech**: Listen to AI responses
- 📱 **Responsive Design**: Optimized for all screen sizes
- 🎭 **Loading Animations**: Gemini-style loading with video support
- 🛡️ **Content Safety**: Explicit content filtering

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
   # Create .env file and add your Gemini API key
   # REACT_APP_GEMINI_API_KEY is required for chat and prompt enhancement
   ```

4. (Optional) Add custom loading animation:
   ```bash
   # Place your loading.mp4 video in public/ folder for custom loading animation
   # Falls back to animated circles if video not found
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🎨 Image Generation Features

**Zero Configuration Required!**

- ✅ **AI-Enhanced Prompts**: Gemini automatically optimizes your prompts for better results
- ✅ **Flexible Detection**: Works with "Generate a image", "I want a picture of", "Show me", etc.
- ✅ **No API Keys**: Uses free Pollinations.ai Stable Diffusion service
- ✅ **Responsive Images**: Adapts to all screen sizes
- ✅ **Click-to-View**: Full-size image modal with download
- ✅ **Content Safety**: Blocks explicit content automatically

### Example Prompts:
- "Generate image of Krishna"
- "I want a picture of a sunset"
- "Show me a lotus flower"
- "Can you create a mountain landscape?"

For more details, see: **[IMAGE_GENERATION_SETUP.md](./IMAGE_GENERATION_SETUP.md)**

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required for AI chat and prompt enhancement
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Image generation works without any token!
```

## 🎭 Custom Loading Animation

To add a custom loading animation:
1. Place `loading.mp4` in the `public/` folder
2. The app will automatically use it during AI responses
3. Falls back to Gemini-style animated circles if video unavailable

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
