/**
 * Bytez.com API Service
 * Integration for openai/gpt-oss-20b model
 * 
 * Note: This is a REFERENCE IMPLEMENTATION showing how the Bytez API
 * could be integrated. The actual API endpoints and authentication
 * method need to be verified with Bytez.com documentation.
 * 
 * Status: NOT ACTIVE - For reference/future use only
 */

// Configuration
const BYTEZ_API_KEY = process.env.REACT_APP_BYTEZ_API_KEY;
const BYTEZ_BASE_URL = process.env.REACT_APP_BYTEZ_ENDPOINT || 'https://api.bytez.com/v1';
const MODEL_ID = 'openai/gpt-oss-20b';

/**
 * System prompt for spiritual guidance
 * Optimized for Shankhnaad's Krishna Consciousness focus
 */
const SPIRITUAL_GUIDANCE_SYSTEM_PROMPT = `You are a spiritual guide for the Shankhnaad platform, providing wisdom based on the Bhagavad Gita and Krishna Consciousness. 
Respond with compassion, clarity, and spiritual insight. 
Draw from Vedic wisdom and the teachings of Lord Krishna when appropriate.
Keep responses thoughtful but concise.`;

/**
 * Check if Bytez API is configured
 * @returns {boolean} True if API key is available
 */
export const isBytezConfigured = () => {
  return !!BYTEZ_API_KEY;
};

/**
 * Call Bytez API for text generation
 * @param {string} prompt - The input prompt for the model
 * @param {Object} options - Optional parameters
 * @returns {Promise<Object>} API response with generated text
 */
export const callBytezAPI = async (prompt, options = {}) => {
  // Check if API is configured
  if (!isBytezConfigured()) {
    throw new Error('Bytez API key is not configured. Please set REACT_APP_BYTEZ_API_KEY in your .env file');
  }

  // Default options
  const {
    maxTokens = 1000,
    temperature = 0.7,
    topP = 0.9,
    systemPrompt = '',
  } = options;

  try {
    // Construct the API endpoint
    // IMPORTANT: The actual endpoint structure needs to be verified with Bytez.com documentation
    // This is an assumed structure. Actual endpoint may be different.
    // TODO: Verify endpoint structure at https://bytez.com/docs/api
    const endpoint = `${BYTEZ_BASE_URL}/models/${MODEL_ID}/generate`;

    // Prepare the request body
    // Note: The actual request format needs to be verified
    const requestBody = {
      prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: topP,
      stream: false, // Set to true for streaming responses
    };

    console.log('[Bytez API] Calling:', endpoint);
    console.log('[Bytez API] Model:', MODEL_ID);

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BYTEZ_API_KEY}`,
        // Additional headers may be required
      },
      body: JSON.stringify(requestBody),
    });

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Bytez API error: ${response.status} ${response.statusText}. ${
          errorData.error || errorData.message || ''
        }`
      );
    }

    // Parse the response
    const data = await response.json();
    
    console.log('[Bytez API] Response received');

    // Return standardized response format
    // Note: Adapt based on actual API response structure
    return {
      success: true,
      text: data.text || data.generated_text || data.choices?.[0]?.text || '',
      model: MODEL_ID,
      usage: data.usage || null,
      provider: 'bytez',
    };

  } catch (error) {
    console.error('[Bytez API] Error:', error);
    
    // Return error response
    return {
      success: false,
      error: error.message,
      model: MODEL_ID,
      provider: 'bytez',
    };
  }
};

/**
 * Call Bytez API with spiritual context
 * Optimized for Shankhnaad's spiritual guidance use case
 * @param {string} userMessage - User's question or message
 * @returns {Promise<Object>} API response with spiritual guidance
 */
export const callBytezForSpiritualGuidance = async (userMessage) => {
  return await callBytezAPI(userMessage, {
    systemPrompt: SPIRITUAL_GUIDANCE_SYSTEM_PROMPT,
    temperature: 0.7,
    maxTokens: 800,
  });
};

/**
 * Test Bytez API connection
 * @returns {Promise<Object>} Test result
 */
export const testBytezConnection = async () => {
  try {
    const testPrompt = 'Hello, are you working?';
    const response = await callBytezAPI(testPrompt, {
      maxTokens: 50,
      temperature: 0.5,
    });
    
    return {
      success: response.success,
      message: response.success 
        ? 'Bytez API connection successful' 
        : `Bytez API connection failed: ${response.error}`,
      response,
    };
  } catch (error) {
    return {
      success: false,
      message: `Bytez API test failed: ${error.message}`,
      error,
    };
  }
};

/**
 * Get model information
 * @returns {Object} Model metadata
 */
export const getBytezModelInfo = () => {
  return {
    modelId: MODEL_ID,
    provider: 'bytez.com',
    name: 'GPT-OSS-20B',
    description: 'Open source GPT model with 20 billion parameters',
    contextLength: '4096 tokens (estimated)', // Needs verification
    parameters: '20B',
    configured: isBytezConfigured(),
    task: 'text-generation',
  };
};

// Export all functions
export default {
  callBytezAPI,
  callBytezForSpiritualGuidance,
  testBytezConnection,
  isBytezConfigured,
  getBytezModelInfo,
};
