/**
 * Model Configuration
 * Centralized configuration for all AI models used in Shankhnaad
 */

export const AI_MODELS = {
  // Primary model - OpenRouter Llama 3.1 405B
  OPENROUTER: {
    id: 'openrouter-llama-405b',
    name: 'Llama 3.1 405B',
    provider: 'OpenRouter',
    displayName: 'Llama 3.1 405B (Primary)',
    modelId: 'meta-llama/llama-3.1-405b-instruct',
    description: 'High-performance 405B parameter model for complex reasoning',
    contextLength: 128000,
    parameters: '405B',
    priority: 1,
    active: true,
    envKey: 'REACT_APP_OPENROUTER_API_KEY',
    features: ['chat', 'spiritual-guidance', 'prompt-enhancement'],
  },

  // Fallback model - Google Gemini
  GEMINI: {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    displayName: 'Gemini Pro (Fallback)',
    modelId: 'gemini-pro',
    description: 'Multimodal AI with excellent reliability',
    contextLength: 32000,
    parameters: 'Unknown',
    priority: 2,
    active: true,
    envKey: 'REACT_APP_GEMINI_API_KEY',
    features: ['chat', 'spiritual-guidance', 'multimodal', 'prompt-enhancement'],
  },

  // Optional model - Bytez GPT-OSS-20B
  BYTEZ_GPT_OSS: {
    id: 'bytez-gpt-oss-20b',
    name: 'GPT-OSS-20B',
    provider: 'Bytez.com',
    displayName: 'GPT-OSS-20B (Optional)',
    modelId: 'openai/gpt-oss-20b',
    description: 'Open source 20B parameter model for fast inference',
    contextLength: 4096, // Estimated - needs verification
    parameters: '20B',
    priority: 3,
    active: false, // Not active by default - requires verification
    envKey: 'REACT_APP_BYTEZ_API_KEY',
    features: ['chat', 'spiritual-guidance'],
    status: 'under-evaluation',
    reference: 'https://bytez.com/models?modelId=openai/gpt-oss-20b&task=text-generation',
    notes: 'Requires API verification. See MODEL_EVALUATION.md for details.',
  },
};

/**
 * Get list of configured models
 * @returns {Array} Array of configured model objects
 */
export const getConfiguredModels = () => {
  return Object.values(AI_MODELS).filter(model => {
    const envKey = process.env[model.envKey];
    return envKey && envKey.trim() !== '';
  });
};

/**
 * Get active models
 * @returns {Array} Array of active model objects
 */
export const getActiveModels = () => {
  return Object.values(AI_MODELS).filter(model => model.active);
};

/**
 * Get model by ID
 * @param {string} modelId - The model ID
 * @returns {Object|null} Model configuration or null
 */
export const getModelById = (modelId) => {
  return Object.values(AI_MODELS).find(model => model.id === modelId) || null;
};

/**
 * Check if a specific model is configured
 * @param {string} modelKey - The model key from AI_MODELS
 * @returns {boolean} True if model is configured
 */
export const isModelConfigured = (modelKey) => {
  const model = AI_MODELS[modelKey];
  if (!model) return false;
  
  const envKey = process.env[model.envKey];
  return !!(envKey && envKey.trim() !== '');
};

/**
 * Get models sorted by priority
 * @returns {Array} Array of models sorted by priority (lowest number = highest priority)
 */
export const getModelsByPriority = () => {
  return Object.values(AI_MODELS)
    .filter(model => model.active)
    .sort((a, b) => a.priority - b.priority);
};

/**
 * Model feature flags
 */
export const MODEL_FEATURES = {
  CHAT: 'chat',
  SPIRITUAL_GUIDANCE: 'spiritual-guidance',
  PROMPT_ENHANCEMENT: 'prompt-enhancement',
  MULTIMODAL: 'multimodal',
  IMAGE_ANALYSIS: 'image-analysis',
  STREAMING: 'streaming',
};

/**
 * Get models that support a specific feature
 * @param {string} feature - The feature to check
 * @returns {Array} Array of models supporting the feature
 */
export const getModelsByFeature = (feature) => {
  return Object.values(AI_MODELS)
    .filter(model => model.active && model.features.includes(feature));
};

/**
 * Default model selection strategy
 * Returns the highest priority configured model
 * @returns {Object|null} Selected model or null
 */
export const getDefaultModel = () => {
  const configuredModels = getConfiguredModels();
  const activeModels = configuredModels.filter(m => m.active);
  
  if (activeModels.length === 0) return null;
  
  return activeModels.sort((a, b) => a.priority - b.priority)[0];
};

/**
 * Fallback model selection
 * Returns next available model in priority order
 * @param {string} excludeModelId - Model ID to exclude (e.g., failed model)
 * @returns {Object|null} Fallback model or null
 */
export const getFallbackModel = (excludeModelId) => {
  const models = getModelsByPriority()
    .filter(m => m.id !== excludeModelId && isModelConfigured(m.id.toUpperCase().replace(/-/g, '_')));
  
  return models.length > 0 ? models[0] : null;
};

/**
 * Model comparison data for evaluation
 */
export const MODEL_COMPARISON = {
  qualityScore: {
    'openrouter-llama-405b': 95,
    'gemini-pro': 90,
    'bytez-gpt-oss-20b': 75, // Estimated - smaller model
  },
  speedScore: {
    'openrouter-llama-405b': 70,
    'gemini-pro': 85,
    'bytez-gpt-oss-20b': 90, // Estimated - smaller model
  },
  reliabilityScore: {
    'openrouter-llama-405b': 85,
    'gemini-pro': 95,
    'bytez-gpt-oss-20b': 'TBD', // Needs verification
  },
};

export default {
  AI_MODELS,
  getConfiguredModels,
  getActiveModels,
  getModelById,
  isModelConfigured,
  getModelsByPriority,
  MODEL_FEATURES,
  getModelsByFeature,
  getDefaultModel,
  getFallbackModel,
  MODEL_COMPARISON,
};
