# Image Generation Setup Guide

## Solution
We've integrated **Stable Diffusion** via Pollinations.ai for free AI image generation - **no API key or setup required!**

## How It Works

The app now uses Pollinations.ai's free Stable Diffusion service:
- ✅ **No API key needed**
- ✅ **No signup required**  
- ✅ **Completely free**
- ✅ **Instant image generation**
- ✅ **High quality 1024x1024 images**

The implementation uses the Flux model (based on Stable Diffusion) which generates images on-demand via URL.

## Usage
Simply type commands like:
- "Generate image of Krishna"
- "Create image of a lotus flower"
- "Draw a spiritual temple"
- "Make image of a divine mandala"

The app will automatically generate a beautiful AI image using Stable Diffusion!

## Technical Details

- **Service**: Pollinations.ai
- **Model**: Flux (Stable Diffusion based)
- **Resolution**: 1024x1024 pixels
- **Format**: PNG via direct URL
- **Prompt Enhancement**: Automatic spiritual art style prefix
- **Customization**: Each image gets a unique seed for variety

## How the Code Works

The `callStableDiffusionAPI` function in `src/App.js`:
1. Takes the user's prompt
2. Adds a spiritual art style prefix
3. Generates a unique Pollinations.ai URL
4. Returns the URL which loads the AI-generated image

```javascript
// Example URL generated:
// https://image.pollinations.ai/prompt/[encoded_prompt]?width=1024&height=1024&model=flux&nologo=true&enhance=true&seed=[timestamp]
```

## Troubleshooting

### Image not loading
- **Check your internet connection** - Images are loaded from Pollinations.ai
- **Disable ad blockers** - Some ad blockers may block the image domain
- **Try a different browser** - If one browser blocks it, try Chrome/Firefox/Safari
- **Wait and retry** - The service may be temporarily busy

### Image quality
The Flux model (Stable Diffusion) generates high-quality spiritual art. Each generation is unique due to the seed parameter.

## Support
- Pollinations.ai: [pollinations.ai](https://pollinations.ai)
- Issues: Report on GitHub if you encounter problems
