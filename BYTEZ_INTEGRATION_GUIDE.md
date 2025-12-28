# Bytez.com Model Integration Guide

## Overview

This document provides a complete guide for integrating the `openai/gpt-oss-20b` model from Bytez.com into the Shankhnaad spiritual AI chatbot.

## Model Information

- **Model ID**: `openai/gpt-oss-20b`
- **Provider**: [Bytez.com](https://bytez.com)
- **Model Type**: Text Generation
- **Parameters**: 20 Billion
- **Reference URL**: https://bytez.com/models?modelId=openai/gpt-oss-20b&task=text-generation

## Current Status

⚠️ **Under Evaluation** - The Bytez API integration is provided as a reference implementation. Before using in production:

1. Verify API endpoint structure with Bytez.com
2. Obtain valid API credentials
3. Test response quality for spiritual guidance use case
4. Compare performance with existing models
5. Validate pricing and rate limits

## Files Included

### Core Implementation
- **`src/services/bytezAPI.js`** - API client for Bytez.com
  - `callBytezAPI()` - General text generation
  - `callBytezForSpiritualGuidance()` - Optimized for spiritual context
  - `testBytezConnection()` - Connection testing
  - `getBytezModelInfo()` - Model metadata

### Configuration
- **`src/config/models.js`** - Centralized model configuration
  - Defines all available models
  - Priority and fallback logic
  - Feature flags per model
  - Model comparison metrics

### Testing
- **`src/services/bytezAPI.test.js`** - Test suite
  - Configuration tests
  - API call tests
  - Error handling tests
  - Integration scenarios

### Documentation
- **`MODEL_EVALUATION.md`** - Comprehensive evaluation
  - Technical analysis
  - Comparison with current models
  - Recommendations
  - Implementation plan

## Setup Instructions

### Step 1: Obtain API Key

1. Visit [Bytez.com](https://bytez.com)
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key for the `openai/gpt-oss-20b` model
5. Note the API endpoint URL

### Step 2: Configure Environment

Add to your `.env` file:

```env
# Bytez.com API Configuration
REACT_APP_BYTEZ_API_KEY=your_bytez_api_key_here
REACT_APP_BYTEZ_ENDPOINT=https://api.bytez.com/v1
```

### Step 3: Verify API Structure

The reference implementation assumes a structure like:

```javascript
// Endpoint
POST https://api.bytez.com/v1/models/openai/gpt-oss-20b/generate

// Headers
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}

// Request Body
{
  "prompt": "Your prompt here",
  "max_tokens": 1000,
  "temperature": 0.7,
  "top_p": 0.9
}
```

**Important**: Verify this structure with Bytez.com's official documentation and update `bytezAPI.js` accordingly.

### Step 4: Test Connection

```javascript
import { testBytezConnection } from './services/bytezAPI';

const result = await testBytezConnection();
console.log(result);
// Expected: { success: true, message: "Bytez API connection successful", ... }
```

### Step 5: Activate Model

In `src/config/models.js`, change:

```javascript
BYTEZ_GPT_OSS: {
  // ... other config
  active: false,  // Change to true
}
```

## Usage Examples

### Basic Text Generation

```javascript
import { callBytezAPI } from './services/bytezAPI';

const response = await callBytezAPI('What is the meaning of life?', {
  maxTokens: 500,
  temperature: 0.7,
});

console.log(response.text);
```

### Spiritual Guidance

```javascript
import { callBytezForSpiritualGuidance } from './services/bytezAPI';

const response = await callBytezForSpiritualGuidance(
  'How can I overcome anxiety?'
);

console.log(response.text);
```

### Integration with Fallback System

```javascript
import { callBytezForSpiritualGuidance } from './services/bytezAPI';
import { getDefaultModel, getFallbackModel } from './config/models';

async function getAIResponse(userMessage) {
  let model = getDefaultModel();
  
  while (model) {
    try {
      if (model.id === 'bytez-gpt-oss-20b') {
        const response = await callBytezForSpiritualGuidance(userMessage);
        if (response.success) {
          return response.text;
        }
      }
      // Try other models...
      
    } catch (error) {
      console.error(`${model.name} failed:`, error);
      model = getFallbackModel(model.id);
    }
  }
  
  return 'Sorry, all AI services are currently unavailable.';
}
```

## Integration with Main App

To integrate with the main application:

1. **Import in App.js**:
```javascript
import { callBytezForSpiritualGuidance } from './services/bytezAPI';
import { getModelById, isModelConfigured } from './config/models';
```

2. **Add to Model Selection**:
```javascript
const availableModels = [
  { id: 'openrouter', name: 'Llama 3.1 405B (Best Quality)' },
  { id: 'gemini', name: 'Gemini Pro (Reliable)' },
  { id: 'bytez', name: 'GPT-OSS-20B (Fast)', 
    available: isModelConfigured('BYTEZ_GPT_OSS') },
];
```

3. **Handle Model Selection**:
```javascript
async function callSelectedModel(userMessage, selectedModel) {
  switch(selectedModel) {
    case 'bytez':
      return await callBytezForSpiritualGuidance(userMessage);
    case 'openrouter':
      return await callOpenRouterAPI(userMessage);
    case 'gemini':
      return await callGeminiAPI(userMessage);
    default:
      return await callDefaultModel(userMessage);
  }
}
```

## Performance Considerations

### Expected Performance

| Metric | GPT-OSS-20B | Llama 3.1 405B | Gemini Pro |
|--------|-------------|----------------|------------|
| Response Time | ~1-2s | ~3-5s | ~2-3s |
| Quality | Good | Excellent | Excellent |
| Cost | Low | Medium | Low |
| Reliability | TBD | Good | Excellent |

### Optimization Tips

1. **Caching**: Cache frequent queries
2. **Batching**: Group multiple requests if API supports it
3. **Token Management**: Use appropriate max_tokens for use case
4. **Temperature**: Lower temperature (0.5-0.7) for consistent responses
5. **Fallback**: Always have fallback to other models

## Troubleshooting

### API Key Issues

```
Error: Bytez API key is not configured
```
**Solution**: Ensure `REACT_APP_BYTEZ_API_KEY` is set in `.env`

### Connection Failures

```
Error: Bytez API error: 401 Unauthorized
```
**Solution**: Verify API key is valid and has proper permissions

### Rate Limiting

```
Error: Bytez API error: 429 Too Many Requests
```
**Solution**: 
- Implement request throttling
- Use exponential backoff
- Consider upgrading API plan

### Poor Response Quality

**Solutions**:
- Adjust temperature parameter
- Improve system prompt
- Add more context to prompts
- Consider using larger model for complex queries

## Security Best Practices

1. **Environment Variables**: Never commit API keys
2. **Key Rotation**: Rotate keys regularly
3. **Rate Limiting**: Implement client-side rate limiting
4. **Input Validation**: Sanitize all user inputs
5. **Error Messages**: Don't expose API keys in errors
6. **HTTPS Only**: Always use secure connections

## Cost Management

1. **Monitor Usage**: Track API calls and token usage
2. **Set Limits**: Implement usage caps per user/session
3. **Optimize Prompts**: Use concise prompts
4. **Cache Results**: Cache common queries
5. **Fallback Strategy**: Use cheaper models for simple queries

## Testing Checklist

Before deploying to production:

- [ ] API key properly configured
- [ ] Connection test passes
- [ ] Response quality acceptable for spiritual guidance
- [ ] Error handling works correctly
- [ ] Fallback mechanism functional
- [ ] Rate limiting implemented
- [ ] Cost tracking in place
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] User acceptance testing done

## Comparison with Current Models

### Advantages
- ✅ Faster response times (smaller model)
- ✅ Lower cost per request
- ✅ Open source variant
- ✅ Good for simple queries

### Disadvantages
- ❌ Less sophisticated reasoning
- ❌ Smaller context window
- ❌ Unverified reliability
- ❌ New API to maintain

## Recommendation

**Current Recommendation**: Keep Bytez as an **optional third choice**

### When to Use Bytez GPT-OSS-20B:
- Fast, simple responses needed
- Cost optimization is priority
- Primary models experiencing issues
- User preference for faster responses

### When NOT to Use:
- Complex spiritual questions requiring deep reasoning
- Long context conversations
- When highest quality is required
- Critical guidance scenarios

## Support and Resources

- **Bytez.com Documentation**: [Check official docs]
- **Model Page**: https://bytez.com/models?modelId=openai/gpt-oss-20b&task=text-generation
- **Project Issues**: Report on GitHub
- **Evaluation Document**: See `MODEL_EVALUATION.md`

## Future Enhancements

Potential improvements if Bytez is adopted:

1. **Streaming Responses**: Implement if API supports it
2. **Fine-tuning**: Explore model fine-tuning options
3. **Prompt Templates**: Create optimized prompt library
4. **A/B Testing**: Compare with other models systematically
5. **Usage Analytics**: Track quality and performance metrics
6. **Cost Analytics**: Monitor and optimize spending

## Conclusion

The Bytez GPT-OSS-20B model integration is **ready for testing** but requires verification before production use. Follow the setup instructions, test thoroughly, and compare with existing models to determine if it meets the quality standards for Shankhnaad's spiritual guidance use case.

For detailed evaluation results, see [MODEL_EVALUATION.md](./MODEL_EVALUATION.md).

---

**Last Updated**: 2025-12-28  
**Status**: Reference Implementation  
**Next Steps**: API verification and quality testing
