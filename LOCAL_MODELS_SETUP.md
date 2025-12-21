# Local Models Setup Guide

## Overview

Shankhnaad now supports **running AI models locally in your browser** using Transformers.js! This eliminates API rate limits and provides a privacy-focused, offline-capable experience.

## 🎯 Benefits of Local Models

### Advantages
- ✅ **No API Keys Required** - Works without OpenRouter or Gemini API keys
- ✅ **No Rate Limits** - Use as much as you want, no restrictions
- ✅ **Privacy First** - All processing happens in your browser, data never leaves your device
- ✅ **Offline Capable** - Works offline after initial model download
- ✅ **Cost Free** - Zero API costs
- ✅ **No Service Outages** - Not affected by cloud API downtime

### Trade-offs
- ⚠️ **Initial Download** - First use downloads model (~80-400MB depending on model)
- ⚠️ **Slower Inference** - Browser-based inference is slower than cloud APIs
- ⚠️ **Quality** - Smaller models (1-2B parameters) vs cloud models (405B parameters)
- ⚠️ **Browser Requirements** - Requires modern browser with WebAssembly support
- ⚠️ **No Multimodal** - Currently text-only (no image/audio/video analysis)

## 🚀 Quick Start

### Step 1: Enable Local Models

1. Open the Shankhnaad app
2. Click the **Settings** icon (⚙️) in the sidebar
3. Toggle **"Use Local Model"** to ON (green)
4. Click **"Initialize local model"** if not already loaded

### Step 2: Wait for Model Download

- First time: Model downloads automatically (~250MB for TinyLLama)
- Progress shown in toast notifications
- Model is cached in browser for future use

### Step 3: Start Chatting!

- Once "Local model ready ✅" appears, start chatting
- All responses generated locally in your browser
- No API keys needed!

## 📋 Requirements

### Browser Compatibility

**Supported Browsers:**
- ✅ Chrome/Edge 90+
- ✅ Firefox 89+
- ✅ Safari 15+
- ✅ Opera 76+

**Required Features:**
- WebAssembly (required)
- IndexedDB (for model caching)
- WebGPU (optional, for acceleration)

**Memory Requirements:**
- Minimum: 2GB RAM
- Recommended: 4GB+ RAM for smooth operation

### Check Compatibility

The app automatically checks browser compatibility on load:
- If incompatible: Warning shown in settings
- If compatible with warnings: Suggestions shown (e.g., "WebGPU not available")

## 🤖 Available Models

### TinyLLama 1.1B (Default)
- **Size:** ~250MB
- **Speed:** Fast
- **Quality:** Good
- **Description:** Lightweight model, best balance of speed and quality
- **Recommended for:** Most users

### Phi-2
- **Size:** ~400MB
- **Speed:** Medium
- **Quality:** Better
- **Description:** Microsoft's efficient small model, better quality
- **Recommended for:** Users with better hardware

### DistilGPT2
- **Size:** ~80MB
- **Speed:** Very Fast
- **Quality:** Basic
- **Description:** Smallest model for testing and low-end devices
- **Recommended for:** Testing or very old devices

## ⚙️ Configuration

### Environment Variables

Add to your `.env` file:

```env
# Enable local models feature (default: true)
REACT_APP_ENABLE_LOCAL_MODELS=true

# Model preference: 'local', 'cloud', or 'auto' (default: 'auto')
REACT_APP_LOCAL_MODEL_PREFERENCE=auto
```

### Model Preference Modes

1. **`auto` (Recommended)**
   - Tries cloud API first (better quality)
   - Falls back to local model if rate limited
   - Uses local if no API keys configured

2. **`local`**
   - Always uses local model first
   - Falls back to cloud only if local fails
   - Best for privacy and avoiding rate limits

3. **`cloud`**
   - Always uses cloud API
   - Disables local model fallback
   - Best when API keys are unlimited

## 🔄 How It Works

### Smart Routing (Auto Mode)

```
User sends message
    ↓
Has media file? → YES → Use Cloud API (required for images/audio/video)
    ↓ NO
    ↓
Cloud API available? → YES → Try Cloud API
    ↓                           ↓
    NO                      Rate limited?
    ↓                           ↓ YES
    ↓                      Try Local Model
Use Local Model ←───────────────┘
```

### Technology Stack

- **Transformers.js** - Hugging Face's browser ML library
- **ONNX Runtime** - Optimized inference engine
- **WebAssembly** - Fast numerical computation
- **WebGPU** - GPU acceleration (when available)
- **IndexedDB** - Model caching

## 💡 Usage Tips

### Performance Optimization

1. **First Launch**: Model downloads once, takes 1-5 minutes depending on connection
2. **Subsequent Uses**: Model loads from cache in ~10-30 seconds
3. **GPU Acceleration**: Enable hardware acceleration in browser settings for best performance
4. **Close Tabs**: Close unused tabs to free memory for better performance

### When to Use Local vs Cloud

**Use Local Model When:**
- ✅ You're hitting API rate limits
- ✅ Privacy is a concern (sensitive questions)
- ✅ No internet connection (after initial download)
- ✅ Want to avoid API costs
- ✅ Text-only conversations

**Use Cloud API When:**
- ✅ Need best quality responses
- ✅ Need fast responses
- ✅ Analyzing images, audio, or video
- ✅ Complex reasoning or long context
- ✅ You have unlimited API access

### Troubleshooting

**Model won't load:**
- Clear browser cache and try again
- Check available disk space (need ~1GB free)
- Try different browser
- Disable aggressive ad blockers

**Model is slow:**
- Close unused browser tabs
- Enable hardware acceleration in browser settings
- Use smaller model (DistilGPT2)
- Consider using cloud API for better speed

**Out of memory errors:**
- Close other tabs and applications
- Restart browser
- Use smaller model
- Consider cloud API for limited memory devices

## 🔐 Privacy & Security

### Data Privacy

- **100% Local Processing**: All inference happens in your browser
- **No Data Transmission**: Your messages never leave your device
- **No Logging**: Local models don't log conversations
- **Browser Storage Only**: Models cached in browser's IndexedDB

### Security Considerations

- Models are downloaded from Hugging Face CDN
- Files are verified using checksums
- No external requests during inference (after download)
- Same-origin policy enforced

## 📊 Model Comparison

| Feature | Local Model | Cloud API |
|---------|-------------|-----------|
| Rate Limits | None | 5-10 req/min (free tier) |
| Privacy | 100% Private | Data sent to API |
| Setup | One-click | API key needed |
| Quality | Good (1-2B) | Excellent (405B) |
| Speed | Medium-Slow | Fast |
| Multimodal | No | Yes |
| Offline | Yes (after download) | No |
| Cost | Free | Free tier limited |

## 🛠️ Advanced Configuration

### Changing Default Model

Edit `src/services/localModelService.js`:

```javascript
// Change DEFAULT_MODEL to use different model
export const DEFAULT_MODEL = AVAILABLE_MODELS.PHI2; // or TINYLLAMA, DISTILGPT2
```

### Adding Custom Models

Add to `AVAILABLE_MODELS` in `localModelService.js`:

```javascript
CUSTOM_MODEL: {
  id: 'Xenova/your-model-name',
  name: 'Custom Model',
  size: '~XMB',
  speed: 'Fast/Medium/Slow',
  quality: 'Basic/Good/Better',
  description: 'Your model description'
}
```

### Adjusting Generation Parameters

Modify in `App.js` where `callLocalModelAPI` is called:

```javascript
const response = await generateLocalText(formattedPrompt, {
  max_new_tokens: 512,    // Increase for longer responses
  temperature: 0.7,       // 0.1-1.0, higher = more creative
  top_k: 50,             // Top K sampling
  top_p: 0.95,           // Nucleus sampling
  repetition_penalty: 1.1 // Prevent repetition
});
```

## 📚 Technical Details

### Model Loading Process

1. Check if model exists in IndexedDB cache
2. If not cached, download from Hugging Face CDN
3. Store model files in IndexedDB (persists across sessions)
4. Load model into memory using ONNX Runtime
5. Ready for inference!

### Memory Usage

- **TinyLLama 1.1B**: ~500MB RAM during inference
- **Phi-2**: ~800MB RAM during inference
- **DistilGPT2**: ~200MB RAM during inference

### Browser Storage

- Models stored in IndexedDB
- Takes ~250-400MB browser storage
- Can be cleared via browser settings
- Automatically re-downloads if needed

## 🔮 Future Enhancements

Planned improvements:

- [ ] Support for larger models (3B-7B parameters)
- [ ] Multimodal local models (image understanding)
- [ ] Model selection in UI (switch between models)
- [ ] Streaming responses for local models
- [ ] Quantized models for better performance
- [ ] WebGPU optimization for faster inference
- [ ] Model download progress UI
- [ ] Background model updates

## 🤝 Contributing

Want to improve local model support?

1. Test different models and report performance
2. Suggest optimizations for better speed
3. Help with browser compatibility testing
4. Contribute to documentation
5. Submit issues on GitHub

## 📞 Support

**Issues:**
- GitHub: [github.com/Sharmamayankkkk/Shankhnaad/issues](https://github.com/Sharmamayankkkk/Shankhnaad/issues)

**Documentation:**
- [README.md](./README.md) - General setup
- [IMAGE_GENERATION_SETUP.md](./IMAGE_GENERATION_SETUP.md) - Image generation
- [STABLE_DIFFUSION_IMPLEMENTATION.md](./STABLE_DIFFUSION_IMPLEMENTATION.md) - Technical details

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Status:** ✅ Production Ready
