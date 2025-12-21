# Shankhnaad AI - Spiritual Guidance Platform

**Live at:** [https://shankhnaad.krishnaconnect.org/](https://shankhnaad.krishnaconnect.org/)

A spiritual AI chatbot with **local and cloud AI models**, offering wisdom from the Bhagavad Gita and AI-enhanced image generation capabilities. Run models locally in your browser to avoid rate limits!

## ✨ Features

- 💬 **AI Chat**: Powered by OpenRouter (Llama 3.1 405B Instruct) with Gemini as fallback for reliable spiritual guidance
- 🖥️ **Local AI Models**: Run AI models directly in your browser - no API keys, no rate limits! (NEW!)
- 🎨 **AI Image Generation**: Create stunning artwork using Stable Diffusion with AI-enhanced prompts
- 🤖 **Intelligent Detection**: Automatically detects image requests in natural conversation
- 🖼️ **Image Preview**: Click to view full-size images in modal with download option
- 📖 **Scripture Integration**: Local RAG with Bhagavad Gita verses
- 🎙️ **Voice Input**: Speech-to-text for hands-free interaction
- 🔊 **Text-to-Speech**: Listen to AI responses
- 📱 **Responsive Design**: Optimized for all screen sizes
- 🎭 **Loading Animations**: Gemini-style loading with video support
- 🛡️ **Content Safety**: Explicit content filtering
- 🔄 **Smart Fallback**: Automatically switches between local and cloud models based on availability

## 🆕 Local Models - No Rate Limits!

**Run AI models locally in your browser!**

### Benefits
- ✅ No API keys required
- ✅ No rate limits - unlimited usage
- ✅ 100% privacy - data stays in your browser
- ✅ Works offline after initial model download
- ✅ Automatically used when cloud APIs are rate limited

### Quick Setup
1. Open Settings (⚙️)
2. Toggle "Use Local Model" ON
3. Wait for model download (~250MB first time)
4. Start chatting with no limits!

**See:** [LOCAL_MODELS_SETUP.md](./LOCAL_MODELS_SETUP.md) for detailed guide

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
   # Create .env file and add your API keys
   # REACT_APP_OPENROUTER_API_KEY is the primary API for chat and prompt enhancement
   # REACT_APP_GEMINI_API_KEY is used as fallback when OpenRouter has issues or for multimodal features
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

- ✅ **AI-Enhanced Prompts**: OpenRouter (Llama 3.1 405B) or Gemini automatically optimizes your prompts for better results
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
# Cloud AI APIs (Optional - if not set, local models will be used)
# Primary AI API - OpenRouter with Llama 3.1 405B Instruct (Free)
REACT_APP_OPENROUTER_API_KEY=your_openrouter_api_key

# Fallback AI API - used when OpenRouter has issues or for multimodal features
REACT_APP_GEMINI_API_KEY=your_gemini_api_key

# Local Models Configuration
# Enable local models (default: true)
REACT_APP_ENABLE_LOCAL_MODELS=true

# Model preference: 'local', 'cloud', or 'auto' (default: 'auto')
# - 'auto': Try cloud first, fallback to local if rate limited
# - 'local': Always use local model first
# - 'cloud': Always use cloud API
REACT_APP_LOCAL_MODEL_PREFERENCE=auto
```

**Note:** The app now works **without any API keys** using local models! Having cloud API keys provides the best of both worlds:
- Cloud APIs for better quality and multimodal features
- Local models as fallback to avoid rate limits

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
