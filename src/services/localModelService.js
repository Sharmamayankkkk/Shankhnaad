/**
 * Local Model Service
 * 
 * This service provides local LLM inference using Transformers.js (Hugging Face models in the browser)
 * Benefits:
 * - No API keys required
 * - No rate limits
 * - Privacy: data stays in browser
 * - Works offline after initial model download
 * 
 * Limitations:
 * - First load downloads model (~100-400MB depending on model)
 * - Slower inference than cloud APIs
 * - Requires modern browser with WebGPU support for best performance
 */

import { pipeline, env } from '@xenova/transformers';

// Configure transformers.js
env.allowLocalModels = false; // Use CDN models
env.allowRemoteModels = true;

// Model cache
let textGenerationPipeline = null;
let isModelLoading = false;
let modelLoadError = null;

// Available models (ordered by size/performance)
export const AVAILABLE_MODELS = {
  // Small, fast models (recommended for most users)
  TINYLLAMA: {
    id: 'Xenova/TinyLLama-1.1B-Chat-v1.0',
    name: 'TinyLLama 1.1B',
    size: '~250MB',
    speed: 'Fast',
    quality: 'Good',
    description: 'Lightweight model, best for quick responses'
  },
  PHI2: {
    id: 'Xenova/phi-2',
    name: 'Phi-2',
    size: '~400MB',
    speed: 'Medium',
    quality: 'Better',
    description: 'Microsoft\'s efficient small model'
  },
  // Fallback tiny model for testing
  DISTILGPT2: {
    id: 'Xenova/distilgpt2',
    name: 'DistilGPT2',
    size: '~80MB',
    speed: 'Very Fast',
    quality: 'Basic',
    description: 'Fastest, smallest model for testing'
  }
};

// Default model
export const DEFAULT_MODEL = AVAILABLE_MODELS.TINYLLAMA;

/**
 * Initialize the local model pipeline
 * @param {string} modelId - Model identifier from AVAILABLE_MODELS
 * @param {Function} progressCallback - Callback for download progress
 * @returns {Promise<boolean>} - Success status
 */
export const initializeLocalModel = async (modelId = DEFAULT_MODEL.id, progressCallback = null) => {
  if (textGenerationPipeline && !modelLoadError) {
    console.log('✅ [Local Model] Already initialized');
    return true;
  }

  if (isModelLoading) {
    console.log('⏳ [Local Model] Already loading...');
    return false;
  }

  try {
    isModelLoading = true;
    modelLoadError = null;

    console.log('🚀 [Local Model] Initializing:', modelId);
    
    if (progressCallback) {
      progressCallback({ status: 'loading', message: 'Loading local model...' });
    }

    // Create text generation pipeline
    textGenerationPipeline = await pipeline('text-generation', modelId, {
      progress_callback: (progress) => {
        console.log('📦 [Local Model] Download progress:', progress);
        if (progressCallback && progress.status === 'progress') {
          const percent = progress.loaded && progress.total 
            ? Math.round((progress.loaded / progress.total) * 100)
            : 0;
          progressCallback({
            status: 'downloading',
            message: `Downloading model: ${percent}%`,
            progress: percent
          });
        }
      }
    });

    console.log('✅ [Local Model] Initialized successfully!');
    
    if (progressCallback) {
      progressCallback({ status: 'ready', message: 'Local model ready!' });
    }

    isModelLoading = false;
    return true;

  } catch (error) {
    console.error('❌ [Local Model] Initialization failed:', error);
    modelLoadError = error.message;
    isModelLoading = false;
    
    if (progressCallback) {
      progressCallback({ 
        status: 'error', 
        message: `Failed to load model: ${error.message}` 
      });
    }
    
    return false;
  }
};

/**
 * Generate text using the local model
 * @param {string} prompt - The input prompt
 * @param {Object} options - Generation options
 * @returns {Promise<string>} - Generated text
 */
export const generateLocalText = async (prompt, options = {}) => {
  // Check if model is initialized
  if (!textGenerationPipeline) {
    console.warn('⚠️ [Local Model] Not initialized, attempting to initialize...');
    const initialized = await initializeLocalModel();
    if (!initialized) {
      throw new Error('Failed to initialize local model. Please try again or use cloud API.');
    }
  }

  if (modelLoadError) {
    throw new Error(`Local model error: ${modelLoadError}`);
  }

  try {
    console.log('🤖 [Local Model] Generating response...');
    console.log('📝 [Local Model] Prompt:', prompt.substring(0, 100) + '...');

    const defaultOptions = {
      max_new_tokens: 512,
      temperature: 0.7,
      top_k: 50,
      top_p: 0.95,
      repetition_penalty: 1.1,
      do_sample: true,
      ...options
    };

    const result = await textGenerationPipeline(prompt, defaultOptions);

    console.log('✅ [Local Model] Generation complete');
    
    // Extract the generated text
    const generatedText = result[0]?.generated_text || '';
    
    // Remove the prompt from the response if it's included
    let response = generatedText;
    if (generatedText.startsWith(prompt)) {
      response = generatedText.slice(prompt.length).trim();
    }

    return response;

  } catch (error) {
    console.error('❌ [Local Model] Generation failed:', error);
    throw new Error(`Local model generation failed: ${error.message}`);
  }
};

/**
 * Format chat history and current prompt for the model
 * @param {Array} history - Chat history
 * @param {string} currentPrompt - Current user prompt
 * @param {string} systemInstruction - System instruction
 * @returns {string} - Formatted prompt
 */
export const formatChatPrompt = (history, currentPrompt, systemInstruction = '') => {
  // Format for chat models (using ChatML or similar format)
  let formattedPrompt = '';

  // Add system instruction
  if (systemInstruction) {
    formattedPrompt += `<|system|>\n${systemInstruction}\n`;
  }

  // Add conversation history (last 5 messages to keep context manageable)
  const recentHistory = history.slice(-5);
  recentHistory.forEach(msg => {
    if (msg.role === 'user') {
      const content = typeof msg.content === 'string' 
        ? msg.content 
        : (msg.drafts?.[msg.currentDraftIndex] || '');
      formattedPrompt += `<|user|>\n${content}\n`;
    } else if (msg.role === 'model') {
      const content = typeof msg.content === 'string' 
        ? msg.content 
        : (msg.drafts?.[msg.currentDraftIndex] || '');
      formattedPrompt += `<|assistant|>\n${content}\n`;
    }
  });

  // Add current prompt
  formattedPrompt += `<|user|>\n${currentPrompt}\n<|assistant|>\n`;

  return formattedPrompt;
};

/**
 * Check if local model is available and ready
 * @returns {Object} - Status object
 */
export const getLocalModelStatus = () => {
  return {
    available: !!textGenerationPipeline,
    loading: isModelLoading,
    error: modelLoadError,
    ready: !!textGenerationPipeline && !isModelLoading && !modelLoadError
  };
};

/**
 * Unload the local model to free memory
 */
export const unloadLocalModel = () => {
  if (textGenerationPipeline) {
    console.log('🗑️ [Local Model] Unloading model...');
    textGenerationPipeline = null;
    modelLoadError = null;
  }
};

/**
 * Check browser compatibility
 * @returns {Object} - Compatibility information
 */
export const checkBrowserCompatibility = () => {
  const compatibility = {
    supported: true,
    warnings: [],
    features: {}
  };

  // Check for WebAssembly support (required)
  compatibility.features.webassembly = typeof WebAssembly !== 'undefined';
  if (!compatibility.features.webassembly) {
    compatibility.supported = false;
    compatibility.warnings.push('WebAssembly not supported');
  }

  // Check for WebGPU support (optional, for acceleration)
  compatibility.features.webgpu = 'gpu' in navigator;
  if (!compatibility.features.webgpu) {
    compatibility.warnings.push('WebGPU not available (will use CPU, slower)');
  }

  // Check available memory (optional)
  if (performance.memory) {
    const memoryMB = performance.memory.jsHeapSizeLimit / (1024 * 1024);
    compatibility.features.availableMemory = Math.round(memoryMB);
    if (memoryMB < 500) {
      compatibility.warnings.push('Low memory available (may be slow)');
    }
  }

  return compatibility;
};
