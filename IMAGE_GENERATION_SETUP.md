# Image Generation Setup Guide

## Solution
We've integrated **Stable Diffusion** via Pollinations.ai for free AI image generation with **Gemini AI prompt enhancement** - **no API key or setup required!**

## How It Works

The app uses an advanced two-step process for superior image quality:

### Step 1: AI Prompt Enhancement
- Your prompt is sent to Google Gemini AI
- Gemini adds artistic details, quality tags, and composition guidance
- Example: "sunset" → "Breathtaking golden sunset over ocean, dramatic clouds with orange and pink hues, professional landscape photography, high quality, detailed, 8k resolution, atmospheric lighting"

### Step 2: Image Generation
- Enhanced prompt is sent to Pollinations.ai's Stable Diffusion
- Uses Flux model for high-quality 1024x1024 images
- Image is fetched and converted to blob URL for privacy
- Displayed with click-to-view modal for full-size preview

## Features

✅ **Zero Configuration**: No API keys or signup required  
✅ **AI-Enhanced Prompts**: Gemini optimizes every prompt automatically  
✅ **Intelligent Detection**: Recognizes 10+ image request patterns  
✅ **Flexible Input**: "Generate a image", "I want a picture", "Show me", etc.  
✅ **Conversational**: Works in natural chat flow  
✅ **Responsive**: Images adapt to all screen sizes  
✅ **Click-to-View**: Full-size modal preview with download  
✅ **Content Safety**: Explicit content automatically blocked  
✅ **High Quality**: 1024x1024 resolution with professional styling  

## Usage Examples

### Direct Commands
- "Generate image of Krishna" ✅
- "Generate a image of sunset" ✅
- "Create picture of lotus" ✅
- "Draw mountain landscape" ✅
- "Make photo of temple" ✅
- "Show me a peacock" ✅

### Conversational Requests
- "I want a picture of Krishna" ✅
- "I need an image of sunset" ✅
- "Can you generate a landscape?" ✅
- "Could you draw something beautiful?" ✅
- "Please create an image" ✅

### Short Forms
- "Picture of Krishna" ✅
- "Image for meditation" ✅
- "Photo showing lotus" ✅

## Technical Details

### Prompt Enhancement API
```javascript
const enhancePromptWithGemini = async (userPrompt) => {
  // Sends user prompt to Gemini with enhancement instructions
  // Returns optimized prompt with artistic details
  // Falls back to original prompt if enhancement fails
};
```

### Image Generation API
```javascript
const callStableDiffusionAPI = async (prompt) => {
  // 1. Filter explicit content
  // 2. Enhance prompt with Gemini AI
  // 3. Generate image via Pollinations.ai
  // 4. Convert to blob URL for privacy
  // 5. Return image data with blob reference
};
```

### Pattern Detection
Supports multiple patterns:
- Direct commands: `generate|create|draw|make|show|paint|illustrate`
- Request patterns: `i want|i need|can you|could you|please`
- Short forms: `image of|picture of|photo of`
- Question forms: `what would|how would|can you show me`

## Loading Animation

The app includes a Gemini-style loading animation:
- **With custom video**: Place `loading.mp4` in `public/` folder
- **Without video**: Uses animated circles (Gemini-style)
- Shows "Shankhnaad is thinking..." with bouncing dots
- Smooth fade-in/fade-out animations

## Content Safety

Blocks explicit keywords:
- `nude`, `naked`, `nsfw`, `explicit`, `porn`, `sex`, `violence`, `gore`, `blood`

Shows appropriate message when blocked:
> 🚫 **Content Blocked**  
> I cannot generate images with explicit or inappropriate content. Please provide a different prompt.

## Responsive Design

Images adapt to screen size:
- Mobile (xs): max-width 320px
- Small (sm): max-width 384px  
- Medium (md): max-width 448px
- Large (lg): max-width 512px

## Image Preview Modal

Click any generated image to:
- View full-size in dark overlay
- Download with single click
- Close with X button or click outside
- Responsive on all devices

## How the Code Works

1. **User types prompt** → "sunset"
2. **Detection** → Pattern matcher identifies image request
3. **Content filter** → Checks for explicit keywords
4. **Gemini enhancement** → "Breathtaking golden sunset over ocean, dramatic clouds..."
5. **Pollinations.ai** → Generates 1024x1024 image
6. **Blob conversion** → Hides service URL
7. **Display** → Shows in chat with click-to-view

## Troubleshooting

### Image not loading
- **Check internet connection** - Images loaded from Pollinations.ai
- **Disable ad blockers** - May block image domain
- **Try different browser** - Chrome/Firefox/Safari
- **Wait and retry** - Service may be temporarily busy

### Image quality
- Gemini AI automatically optimizes prompts for best results
- Each generation is unique (timestamp seed)
- High-quality Flux model produces professional results

### Loading animation not showing
- Place `loading.mp4` in `public/` folder for custom animation
- Falls back to animated circles if video unavailable
- Check browser console for errors

## Support

- **Pollinations.ai**: [pollinations.ai](https://pollinations.ai)
- **Gemini AI**: Used for prompt enhancement only
- **Issues**: Report on GitHub
