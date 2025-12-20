# Image Generation Setup Guide

## Problem
Google's Imagen API is **not available** through the standard Gemini API key. It requires Google Cloud Platform's Vertex AI, which needs additional setup and billing.

## Solution
We've integrated **Hugging Face's Stable Diffusion** as a free alternative for AI image generation.

## Setup Instructions

### Step 1: Get a Free Hugging Face API Token
1. Go to [https://huggingface.co/join](https://huggingface.co/join) and create a free account
2. Navigate to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
3. Click **"New token"**
4. Give it a name (e.g., "Shankhnaad App")
5. Select **"Read"** permission (sufficient for inference)
6. Copy the generated token (starts with `hf_...`)

### Step 2: Add Token to Environment
1. Open the `.env` file in the project root
2. Add your token:
   ```
   REACT_APP_HF_API_TOKEN=hf_your_token_here
   ```
3. Save the file

### Step 3: Restart the Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## Usage
Once configured, you can generate images by typing:
- "Generate image of Krishna"
- "Create image of a lotus flower"
- "Draw a spiritual temple"

## Free Tier Limits
- Hugging Face's free tier includes:
  - ✅ Unlimited API calls for inference
  - ✅ Access to thousands of models
  - ⚠️ May have rate limiting during high traffic
  - ⚠️ First request may take 10-20 seconds (model loading)

## Alternative Options

If you prefer other services:

### Option 1: Stability AI
- Sign up at [stability.ai](https://stability.ai)
- Get API key from [platform.stability.ai](https://platform.stability.ai)
- Update code to use Stability AI's endpoint

### Option 2: Replicate
- Sign up at [replicate.com](https://replicate.com)
- Free tier: $5 credit to start
- Use their Stable Diffusion models

### Option 3: Local Generation (Advanced)
- Install [Stable Diffusion Web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- Run locally on your machine
- Update code to point to `http://localhost:7860/api`

## Technical Details

The image generation function in `src/App.js` uses:
- **Model**: `stabilityai/stable-diffusion-xl-base-1.0`
- **Method**: Hugging Face Inference API
- **Format**: Base64 encoded PNG
- **Resolution**: 1024x1024 (default for SDXL)

## Troubleshooting

### "Creative energies blocked" error
This means the API token is missing or invalid. Follow the setup instructions above.

### "Model is loading" error
The model needs to "warm up" on first use. Wait 10-20 seconds and try again.

### CORS errors in browser
This shouldn't happen with Hugging Face API as it supports CORS. If you see this, check your browser extensions (ad blockers, etc.).

### Rate limiting
If you hit rate limits, wait a few minutes or upgrade to Hugging Face Pro ($9/month for unlimited inference).

## Support
- Hugging Face Docs: [huggingface.co/docs/api-inference](https://huggingface.co/docs/api-inference)
- Hugging Face Forum: [discuss.huggingface.co](https://discuss.huggingface.co)
