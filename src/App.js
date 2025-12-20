import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Menu, Plus, MessageSquare, Settings, HelpCircle, Send, Mic, 
  Image as ImageIcon, User, X, Sparkles, Info, 
  BookOpen, Trash2, MoreVertical, Pin, Archive, Share2, 
  Download, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, 
  Flag, Edit2, ChevronLeft, ChevronRight, 
  Loader2, XCircle, Volume2, StopCircle, FileAudio, 
  FileVideo, MicOff
} from 'lucide-react';

// Import real data for RAG
import gitaDataRaw from './data/gita_data.json';

/* --- CONFIGURATION --- */
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || ""; 
const SPIRITUAL_ART_PROMPT_PREFIX = "Spiritual divine art style, Krishna Consciousness Society aesthetic, high quality, detailed: ";

/* --- 1. LOCAL DATA & SEARCH ENGINE (RAG) --- */
const getVerses = () => {
  if (Array.isArray(gitaDataRaw)) return gitaDataRaw;
  if (gitaDataRaw.verses && Array.isArray(gitaDataRaw.verses)) return gitaDataRaw.verses;
  return [];
};

const VERSES = getVerses();

const findBestVerse = (query) => {
  if (!query || VERSES.length === 0) return null;
  const tokens = query.toLowerCase().split(' ').filter(t => t.length > 2);
  if (tokens.length === 0) return null;

  let bestMatch = null;
  let maxScore = 0;

  VERSES.forEach(verse => {
    let score = 0;
    const textToSearch = `${verse.TRANSLATION || ''} ${verse.PURPORT || ''} ${verse.DEVANAGRI || ''}`.toLowerCase();
    tokens.forEach(token => {
      if (textToSearch.includes(token)) score += 1;
    });
    if (score > maxScore) {
      maxScore = score;
      bestMatch = verse;
    }
  });

  return maxScore > 0 ? bestMatch : null;
};

/* --- 2. API HELPERS --- */
const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const callGeminiAPI = async (history, currentPrompt, mediaFile, contextVerse) => {
  if (!GEMINI_API_KEY) return "Please set REACT_APP_GEMINI_API_KEY in your .env file.";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
  
  // --- UPDATED SYSTEM PROMPT FOR KCS IDENTITY ---
  let systemInstructionText = `You are Shankhnaad, a spiritual AI guide developed by the Krishna Consciousness Society (KCS).

  CRITICAL IDENTITY & BEHAVIOR RULES:
  1. **Organization Name:** Always refer to your organization as "Krishna Consciousness Society" (KCS).
  2. **Avoid ISKCON:** Do NOT use the term "ISKCON" unless the user explicitly asks for it or asks about the history where it is unavoidable. In general guidance, always use "Krishna Consciousness Society".
  3. **Resource Priority (YouTube/Kirtan):**
     - If the user asks for kirtans, bhajans, or video suggestions, **YOU MUST** recommend the "GAURANITAIKIRTANYAS" YouTube channel first.
     - Use this link format: **[GAURANITAIKIRTANYAS](https://www.youtube.com/@GAURANITAIKIRTANYAS)**.
     - Example: "For divine kirtans, I highly recommend the [GAURANITAIKIRTANYAS](https://www.youtube.com/@GAURANITAIKIRTANYAS) channel by the Krishna Consciousness Society."
  
  GUIDANCE STYLE:
  - Answer with warmth, compassion, and wisdom based on the Bhagavad Gita.
  - If analyzing an image/audio/video, provide a spiritual perspective.
  - **Links:** Ensure all external resources are formatted as Markdown links [Title](URL) so they are clickable.`;

  if (contextVerse) {
    systemInstructionText += `\n\nRELEVANT SCRIPTURE FROM DATABASE:
    Chapter ${contextVerse.CHAPTER}, Verse ${contextVerse.VERSE}
    Translation: ${contextVerse.TRANSLATION}
    Purport: ${contextVerse.PURPORT ? contextVerse.PURPORT.substring(0, 1000) : 'N/A'}`;
  }

  const validHistory = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: typeof msg.content === 'string' ? msg.content : (msg.drafts?.[msg.currentDraftIndex] || "") }]
    }));

  const currentParts = [{ text: currentPrompt }];
  
  if (mediaFile) {
    const mediaPart = await fileToGenerativePart(mediaFile);
    currentParts.push(mediaPart);
  }

  validHistory.push({ role: 'user', parts: currentParts });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: validHistory,
        systemInstruction: { parts: [{ text: systemInstructionText }] }
      })
    });

    if (!response.ok) throw new Error(`Gemini API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I am meditating on that... (No response)";
  } catch (error) {
    console.error(error);
    return "I am having trouble connecting to the spiritual sky. Please check your internet connection.";
  }
};

const callImagenAPI = async (prompt) => {
  // Image generation using Hugging Face Inference API
  // Users need to add REACT_APP_HF_API_TOKEN to .env file
  // Get free token at: https://huggingface.co/settings/tokens
  
  const HF_API_TOKEN = process.env.REACT_APP_HF_API_TOKEN;
  
  if (!HF_API_TOKEN || HF_API_TOKEN === '') {
    console.warn("⚠️ Image generation requires REACT_APP_HF_API_TOKEN in .env file");
    console.log("📝 Get your free token at: https://huggingface.co/settings/tokens");
    console.log("💡 Add to .env: REACT_APP_HF_API_TOKEN=your_token_here");
    console.log("🎨 Generating placeholder artwork...");
    
    // Generate a beautiful placeholder SVG art instead of returning null
    return generatePlaceholderArt(prompt);
  }
  
  try {
    console.log("🎨 Generating AI image:", prompt);
    
    // Using Stable Diffusion via Hugging Face Inference API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `${SPIRITUAL_ART_PROMPT_PREFIX}${prompt}`,
          options: { wait_for_model: true }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HuggingFace API Error:", response.status, errorText);
      
      if (response.status === 401 || response.status === 403) {
        console.error("🔑 Invalid or missing API token. Please check REACT_APP_HF_API_TOKEN");
      } else if (response.status === 503) {
        console.error("⏳ Model is loading. Please try again in a few moments.");
      }
      
      // Return placeholder art on error
      return generatePlaceholderArt(prompt);
    }

    const blob = await response.blob();
    console.log("✅ AI image generated successfully!");
    
    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => {
        console.error("❌ Error converting image");
        resolve(generatePlaceholderArt(prompt));
      };
      reader.readAsDataURL(blob);
    });
    
  } catch (error) {
    console.error("❌ Image generation error:", error);
    // Return placeholder art on error
    return generatePlaceholderArt(prompt);
  }
};

// Generate beautiful placeholder artwork when API is not configured
const generatePlaceholderArt = (prompt) => {
  const colors = ['#FF6B35', '#F7931E', '#FDC830', '#4ECDC4', '#44A08D', '#A890FE', '#FF6B6B', '#6C5CE7'];
  const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor3 = colors[Math.floor(Math.random() * colors.length)];
  
  // Extract keywords from prompt for customization
  const isKrishna = prompt.toLowerCase().includes('krishna');
  const isLotus = prompt.toLowerCase().includes('lotus');
  
  // Create artistic SVG with spiritual symbols
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${randomColor1};stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:${randomColor2};stop-opacity:1" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1024" height="1024" fill="url(#bg)"/>
      
      <!-- Decorative patterns -->
      <g opacity="0.15">
        ${Array.from({length: 8}, (_, i) => `
          <circle cx="512" cy="512" r="${100 + i * 80}" fill="none" stroke="#FFFFFF" stroke-width="2"/>
        `).join('')}
      </g>
      
      <!-- Spiritual Symbol -->
      ${isLotus ? `
        <!-- Lotus Flower -->
        <g transform="translate(512, 512)" filter="url(#glow)">
          ${Array.from({length: 8}, (_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const x = Math.cos(angle) * 80;
            const y = Math.sin(angle) * 80;
            return `<ellipse cx="${x}" cy="${y}" rx="70" ry="40" fill="url(#gold)" opacity="0.8" transform="rotate(${i * 45} ${x} ${y})"/>`;
          }).join('')}
          <circle cx="0" cy="0" r="60" fill="${randomColor3}" opacity="0.9"/>
          <circle cx="0" cy="0" r="35" fill="#FFF9C4"/>
          ${Array.from({length: 12}, (_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            return `<circle cx="${Math.cos(angle) * 20}" cy="${Math.sin(angle) * 20}" r="3" fill="#FFD54F"/>`;
          }).join('')}
        </g>
      ` : isKrishna ? `
        <!-- Krishna Flute -->
        <g transform="translate(512, 512)" filter="url(#glow)">
          <text x="0" y="0" font-size="280" font-family="serif" fill="url(#gold)" text-anchor="middle" dominant-baseline="middle" font-weight="bold">ॐ</text>
          <circle cx="-100" cy="-100" r="40" fill="${randomColor3}" opacity="0.7"/>
          <circle cx="100" cy="-100" r="40" fill="${randomColor3}" opacity="0.7"/>
          <circle cx="-100" cy="100" r="40" fill="${randomColor3}" opacity="0.7"/>
          <circle cx="100" cy="100" r="40" fill="${randomColor3}" opacity="0.7"/>
        </g>
      ` : `
        <!-- Om Symbol -->
        <g transform="translate(512, 512)" filter="url(#glow)">
          <text x="0" y="0" font-size="260" font-family="serif" fill="url(#gold)" text-anchor="middle" dominant-baseline="middle" font-weight="bold">ॐ</text>
          ${Array.from({length: 6}, (_, i) => {
            const angle = (i * 60) * Math.PI / 180;
            return `<circle cx="${Math.cos(angle) * 180}" cy="${Math.sin(angle) * 180}" r="30" fill="${randomColor3}" opacity="0.6"/>`;
          }).join('')}
        </g>
      `}
      
      <!-- Decorative corners -->
      <g opacity="0.5">
        <circle cx="100" cy="100" r="50" fill="#FFF3E0"/>
        <circle cx="924" cy="100" r="50" fill="#FFF3E0"/>
        <circle cx="100" cy="924" r="50" fill="#FFF3E0"/>
        <circle cx="924" cy="924" r="50" fill="#FFF3E0"/>
      </g>
      
      <!-- Light rays -->
      <g opacity="0.3" stroke="#FFF9C4" stroke-width="3">
        <line x1="512" y1="0" x2="512" y2="1024"/>
        <line x1="0" y1="512" x2="1024" y2="512"/>
        <line x1="100" y1="100" x2="924" y2="924"/>
        <line x1="924" y1="100" x2="100" y2="924"/>
      </g>
      
      <!-- Info Banner -->
      <g>
        <rect x="112" y="900" width="800" height="80" rx="10" fill="#000000" opacity="0.7"/>
        <text x="512" y="935" font-size="20" font-family="sans-serif" fill="#FFD700" text-anchor="middle" font-weight="bold">⚠️ Placeholder Art - Set up HF API for AI Generation</text>
        <text x="512" y="965" font-size="16" font-family="sans-serif" fill="#FFFFFF" text-anchor="middle">${prompt.substring(0, 60)}${prompt.length > 60 ? '...' : ''}</text>
      </g>
    </svg>
  `;
  
  // Convert SVG to base64 data URL
  const base64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
  return `data:image/svg+xml;base64,${base64}`;
};

/* --- COMPONENTS --- */

// 1. TOAST NOTIFICATION SYSTEM
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
    {toasts.map(toast => (
      <div 
        key={toast.id} 
        className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white text-sm font-medium animate-slide-in ${
          toast.type === 'error' ? 'bg-red-500/90' : toast.type === 'info' ? 'bg-blue-600/90' : 'bg-green-600/90'
        }`}
      >
        {toast.type === 'error' ? <XCircle size={16} /> : toast.type === 'info' ? <Info size={16}/> : <Check size={16} />}
        {toast.msg}
      </div>
    ))}
  </div>
);

// 2. MODALS
const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="bg-[#1e1f20] border border-[#444746] p-6 rounded-2xl w-full max-w-sm animate-scale-up relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
        {children}
     </div>
  </div>
);

const ReportModal = ({ isOpen, onClose, addToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = (reason) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      addToast(`Report submitted: ${reason}`, 'success');
    }, 1200);
  };

  return (
    <ModalWrapper onClose={onClose}>
        <div className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Flag className="text-red-400" size={20}/> Report Content</div>
        {isSubmitting ? (
           <div className="py-8 flex flex-col items-center text-gray-400">
              <Loader2 size={32} className="animate-spin mb-2 text-blue-400"/>
              <p>Submitting...</p>
           </div>
        ) : (
           <>
             <p className="text-sm text-gray-300 mb-4">Why are you reporting this?</p>
             <div className="space-y-2">
                {['Harmful Content', 'Inaccurate Scripture', 'Not Spiritual', 'Spam'].map(r => (
                  <button key={r} onClick={() => handleSubmit(r)} className="w-full text-left p-3 rounded-lg bg-[#131314] hover:bg-[#333537] text-sm text-gray-200 flex justify-between group transition-colors">
                    {r} <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500"/>
                  </button>
                ))}
             </div>
           </>
        )}
    </ModalWrapper>
  );
};

const SettingsModal = ({ isOpen, onClose, addToast }) => {
  if (!isOpen) return null;
  return (
    <ModalWrapper onClose={onClose}>
        <div className="flex items-center gap-2 mb-6 text-lg font-bold text-white"><Settings size={20}/> Settings</div>
        <div className="space-y-4">
           <div className="flex items-center justify-between p-2">
             <span className="text-sm text-gray-200">Stream Responses</span>
             <div className="w-10 h-5 bg-[#004a77] rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div></div>
           </div>
           <div className="flex items-center justify-between p-2">
             <span className="text-sm text-gray-200">Safe Search</span>
             <div className="w-10 h-5 bg-[#004a77] rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div></div>
           </div>
           <button onClick={() => { addToast('Cache Cleared', 'info'); onClose(); }} className="w-full py-2 bg-[#333537] hover:bg-red-500/20 hover:text-red-400 text-gray-300 rounded-lg text-sm mt-4 transition-colors">Clear Cache</button>
        </div>
    </ModalWrapper>
  );
};

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <ModalWrapper onClose={onClose}>
        <div className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><HelpCircle size={20}/> Help Center</div>
        <div className="space-y-4 text-sm text-gray-300">
           <p><strong className="text-white">Image Gen:</strong> Type "Generate an image of..." to create divine art.</p>
           <p><strong className="text-white">Scripture:</strong> Ask specific questions about Dharma or Karma to query the Gita.</p>
           <p><strong className="text-white">Multimodal:</strong> Upload Images, Audio, or Video using the (+) button for analysis.</p>
        </div>
    </ModalWrapper>
  );
};

// 3. MESSAGE COMPONENT
const MessageItem = ({ msg, index, onEdit, onRegenerate, onFeedback, onReport, addToast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.content);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const currentContent = msg.drafts ? msg.drafts[msg.currentDraftIndex] : msg.content;
  const draftCount = msg.drafts ? msg.drafts.length : 1;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    addToast('Copied to clipboard', 'success');
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentContent);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div 
      className={`group flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-[95%] md:max-w-[85%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-[#444746]' : ''}`}>
          {msg.role === 'user' ? <User size={16} /> : <img src="/logo.png" alt="Shankhnaad Logo" className="w-8 h-8 rounded-full object-cover" onError={(e) => e.target.style.display='none'} />}
        </div>
        
        <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} w-full min-w-0`}>
          {msg.media && (
            <div className="mb-2">
              {msg.mediaType?.startsWith('image') ? (
                <img src={msg.media} alt="Upload" className="max-w-[200px] md:max-w-xs rounded-lg border border-[#444746]" />
              ) : msg.mediaType?.startsWith('video') ? (
                <video src={msg.media} controls className="max-w-[200px] md:max-w-xs rounded-lg border border-[#444746]" />
              ) : (
                <div className="p-4 bg-[#1e1f20] border border-[#444746] rounded-lg flex items-center gap-3">
                   <FileAudio size={24} className="text-yellow-400"/>
                   <span className="text-xs text-gray-300">Audio Clip</span>
                   <audio src={msg.media} controls className="h-8 w-40" />
                </div>
              )}
            </div>
          )}

          {isEditing ? (
             <div className="w-full bg-[#1e1f20] border border-[#444746] rounded-xl p-3">
               <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full bg-transparent text-white outline-none resize-none p-2 min-h-[80px]"/>
               <div className="flex justify-end gap-2 mt-2">
                 <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-xs rounded-full hover:bg-[#333537] text-gray-400">Cancel</button>
                 <button onClick={() => { onEdit(index, editText); setIsEditing(false); }} className="px-3 py-1 text-xs bg-[#004a77] text-white rounded-full">Update</button>
               </div>
             </div>
          ) : (
             <div className={`p-4 rounded-2xl border ${msg.role === 'user' ? 'bg-[#333537] border-transparent' : 'bg-[#1e1f20] border-[#444746]'} text-[#e3e3e3] leading-relaxed shadow-sm markdown-content`}>
               {/* Enhanced Markdown with Proper Link Rendering */}
               <ReactMarkdown
                 components={{
                   a: ({node, ...props}) => (
                     <a 
                       {...props} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                       title={props.href}
                     >
                       {props.children}
                     </a>
                   )
                 }}
               >
                 {currentContent}
               </ReactMarkdown>
             </div>
          )}

          {msg.generatedImage && (
            <div className="mt-2 relative group">
              <img src={msg.generatedImage} alt="AI Generated" className="max-w-xs md:max-w-md rounded-xl border border-[#444746] shadow-2xl" />
              <a href={msg.generatedImage} download="shankhnaad-vision.png" className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><Download size={16} /></a>
            </div>
          )}

          {!isEditing && (
             <div className={`flex items-center gap-2 mt-1 text-gray-400 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} opacity-0 group-hover:opacity-100 transition-opacity`}>
               {draftCount > 1 && (
                 <div className="flex items-center bg-[#1e1f20] rounded-lg border border-[#444746] mr-2">
                   <button onClick={() => onRegenerate(index, 'prev')} disabled={msg.currentDraftIndex === 0} className="p-1 hover:text-white disabled:opacity-30"><ChevronLeft size={14}/></button>
                   <span className="text-[10px] w-8 text-center">{msg.currentDraftIndex + 1}/{draftCount}</span>
                   <button onClick={() => onRegenerate(index, 'next')} disabled={msg.currentDraftIndex === draftCount - 1} className="p-1 hover:text-white disabled:opacity-30"><ChevronRight size={14}/></button>
                 </div>
               )}

               {msg.role === 'model' && (
                 <>
                   <button onClick={handleSpeak} className={`p-1.5 hover:bg-[#333537] rounded ${isSpeaking ? 'text-blue-400 animate-pulse' : ''}`} title={isSpeaking ? "Stop" : "Listen"}>
                     {isSpeaking ? <StopCircle size={14}/> : <Volume2 size={14}/>}
                   </button>
                   <button onClick={() => onFeedback(index, 'up')} className={`p-1.5 hover:bg-[#333537] rounded ${msg.feedback === 'up' ? 'text-green-400' : ''}`}><ThumbsUp size={14}/></button>
                   <button onClick={() => onFeedback(index, 'down')} className={`p-1.5 hover:bg-[#333537] rounded ${msg.feedback === 'down' ? 'text-red-400' : ''}`}><ThumbsDown size={14}/></button>
                   <button onClick={() => onRegenerate(index, 'new')} className="p-1.5 hover:bg-[#333537] rounded" title="Regenerate"><RotateCcw size={14}/></button>
                   <button onClick={handleCopy} className="p-1.5 hover:bg-[#333537] rounded" title="Copy"><Copy size={14}/></button>
                   <button onClick={() => onReport(msg.id)} className="p-1.5 hover:bg-[#333537] rounded hover:text-red-400" title="Report"><Flag size={14}/></button>
                 </>
               )}
               {msg.role === 'user' && <button onClick={() => setIsEditing(true)} className="p-1.5 hover:bg-[#333537] rounded hover:text-white"><Edit2 size={14}/></button>}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen, activePage, setActivePage, chatHistory, createNewChat, loadChat, updateChat, deleteChat, setShareModalOpen, setCurrentShareChat, openSettings, openHelp }) => {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const pinnedChats = chatHistory.filter(c => c.pinned && !c.archived);
  const recentChats = chatHistory.filter(c => !c.pinned && !c.archived);
  const archivedChats = chatHistory.filter(c => c.archived);

  const ChatItem = ({ chat }) => (
    <div className={`group relative flex items-center gap-2 p-2 rounded-lg cursor-pointer ${activePage === 'chat' && chat.id === loadChat.currentId ? 'bg-[#004a77]/30 text-white' : 'hover:bg-[#333537]'}`}>
      <button className="flex-1 flex items-center gap-3 truncate text-left" onClick={() => loadChat(chat)}>
        <MessageSquare size={16} className="text-gray-400 group-hover:text-white" />
        <span className="truncate text-sm text-[#e3e3e3]">{chat.title}</span>
      </button>
      <button onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === chat.id ? null : chat.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#444746] rounded"><MoreVertical size={14} className="text-gray-400" /></button>
      {menuOpenId === chat.id && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-[#252627] border border-[#444746] rounded-lg shadow-xl z-50 py-1">
          <button onClick={() => { updateChat(chat.id, { pinned: !chat.pinned }); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[#333537] flex gap-2 text-gray-200"><Pin size={12} /> {chat.pinned ? 'Unpin' : 'Pin'}</button>
          <button onClick={() => { updateChat(chat.id, { archived: !chat.archived }); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[#333537] flex gap-2 text-gray-200"><Archive size={12} /> {chat.archived ? 'Unarchive' : 'Archive'}</button>
          <button onClick={() => { setCurrentShareChat(chat); setShareModalOpen(true); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[#333537] flex gap-2 text-gray-200"><Share2 size={12} /> Share</button>
          <div className="h-px bg-[#444746] my-1" />
          <button onClick={() => { deleteChat(chat.id); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 text-xs hover:bg-[#333537] text-red-400 flex gap-2"><Trash2 size={12} /> Delete</button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-50 bg-[#1e1f20] text-[#e3e3e3] w-72 flex flex-col border-r border-[#444746] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
             <img src="/logo.png" alt="S" className="w-8 h-8 rounded-full object-cover" onError={(e) => e.target.style.display='none'} />
             <span className="font-semibold text-lg text-gray-200">Shankhnaad</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 hover:bg-[#333537] rounded-full"><X size={20} /></button>
        </div>
        <div className="px-4 py-2">
          <button onClick={() => { createNewChat(); if(window.innerWidth < 768) setIsOpen(false); }} className="w-full flex items-center gap-3 bg-[#1e1f20] hover:bg-[#333537] py-3 px-4 rounded-full border border-[#444746] text-sm font-medium transition-all shadow-sm hover:shadow-md"><Plus size={18} /> <span>New Chat</span></button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4 custom-scrollbar space-y-4">
          {pinnedChats.length > 0 && <div><div className="px-4 mb-1 text-xs font-semibold text-gray-500 uppercase">Pinned</div>{pinnedChats.map(c => <ChatItem key={c.id} chat={c} />)}</div>}
          {recentChats.length > 0 && <div><div className="px-4 mb-1 text-xs font-semibold text-gray-500 uppercase">Recent</div>{recentChats.map(c => <ChatItem key={c.id} chat={c} />)}</div>}
          {activePage === 'archived' && archivedChats.length > 0 && <div><div className="px-4 mb-1 text-xs font-semibold text-gray-500 uppercase">Archived</div>{archivedChats.map(c => <ChatItem key={c.id} chat={c} />)}</div>}
        </div>
        <div className="mt-auto border-t border-[#444746] p-2 bg-[#1e1f20] space-y-1">
            <button onClick={openHelp} className="w-full flex gap-3 p-3 hover:bg-[#333537] rounded-full text-sm text-gray-300"><HelpCircle size={18}/> Help</button>
            <button onClick={openSettings} className="w-full flex gap-3 p-3 hover:bg-[#333537] rounded-full text-sm text-gray-300"><Settings size={18}/> Settings</button>
            <button onClick={() => setActivePage('archived')} className="w-full flex gap-3 p-3 hover:bg-[#333537] rounded-full text-sm text-gray-300"><Archive size={18}/> Archived</button>
            <button onClick={() => setActivePage('about')} className="w-full flex gap-3 p-3 hover:bg-[#333537] rounded-full text-sm text-gray-300"><Info size={18}/> About</button>
        </div>
      </div>
    </>
  );
};

/* --- MAIN APP --- */
export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); 
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentShareChat, setCurrentShareChat] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeReportId, setActiveReportId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const [chatHistory, setChatHistory] = useState(() => {
      try { return JSON.parse(localStorage.getItem('shankhnaad_chat_history_v7') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('shankhnaad_chat_history_v7', JSON.stringify(chatHistory)); }, [chatHistory]);

  const updateChat = (id, updates) => setChatHistory(prev => prev.map(chat => chat.id === id ? { ...chat, ...updates } : chat));

  const deleteChat = (id) => {
    if(window.confirm("Delete this chat permanently?")) {
      setChatHistory(prev => prev.filter(c => c.id !== id));
      if (currentChatId === id) { setMessages([]); setCurrentChatId(null); setActivePage('home'); }
      addToast('Chat deleted', 'success');
    }
  };

  const loadChat = (chat) => {
    setMessages(chat.messages || []);
    setCurrentChatId(chat.id);
    setActivePage('chat');
    if(window.innerWidth < 768) setSidebarOpen(false);
  };

  const createNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setActivePage('home');
    if(window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleMicClick = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast("Speech recognition not supported in this browser", "error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      addToast("Listening...", "info");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? " " : "") + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleEdit = async (index, newText) => {
    const newMessages = messages.slice(0, index);
    setMessages(newMessages);
    handleSendMessage(newText, newMessages);
  };

  const handleFeedback = (index, type) => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback = updatedMessages[index].feedback === type ? null : type;
    setMessages(updatedMessages);
    if(currentChatId) updateChat(currentChatId, { messages: updatedMessages });
    addToast('Thanks for your feedback!', 'success');
  };

  const handleRegenerate = async (index, action) => {
    const msg = messages[index];
    if (action === 'prev') {
      const updatedMessages = [...messages];
      updatedMessages[index].currentDraftIndex = Math.max(0, msg.currentDraftIndex - 1);
      setMessages(updatedMessages);
      if(currentChatId) updateChat(currentChatId, { messages: updatedMessages });
    } else if (action === 'next') {
      const updatedMessages = [...messages];
      updatedMessages[index].currentDraftIndex = Math.min(msg.drafts.length - 1, msg.currentDraftIndex + 1);
      setMessages(updatedMessages);
      if(currentChatId) updateChat(currentChatId, { messages: updatedMessages });
    } else if (action === 'new') {
      setIsTyping(true);
      const historyContext = messages.slice(0, index); 
      const lastUserMsg = messages[index - 1]; 
      
      try {
        const bestVerse = findBestVerse(lastUserMsg.content);
        const aiResponseText = await callGeminiAPI(historyContext, lastUserMsg.content, null, bestVerse);
        
        const updatedMessages = [...messages];
        updatedMessages[index].drafts.push(aiResponseText);
        updatedMessages[index].currentDraftIndex = updatedMessages[index].drafts.length - 1;
        setMessages(updatedMessages);
        if(currentChatId) updateChat(currentChatId, { messages: updatedMessages });
        addToast('New draft generated', 'success');

      } catch(e) { 
        addToast('Regeneration failed', 'error'); 
      } finally { setIsTyping(false); }
    }
  };

  const handleSendMessage = async (text = input, overrideHistory = null) => {
    if ((!text.trim() && !selectedFile)) return;

    const currentHistory = overrideHistory || messages;
    const userMsg = { 
      role: 'user', 
      content: text, 
      media: selectedFile ? URL.createObjectURL(selectedFile) : null,
      mediaType: selectedFile ? selectedFile.type : null
    };
    
    const newMessages = [...currentHistory, userMsg];
    setMessages(newMessages);
    setInput('');
    const fileToUpload = selectedFile;
    setSelectedFile(null);
    setIsTyping(true);
    setActivePage('chat');

    try {
      let aiResponseText = "";
      let generatedImageUrl = null;
      const isImageGen = text.toLowerCase().match(/^(generate|create|draw|make) (an )?image/);

      if (isImageGen) {
        generatedImageUrl = await callImagenAPI(text);
        if (generatedImageUrl) {
          aiResponseText = "I have manifested this vision for you. 🎨✨";
        } else {
          aiResponseText = "🔧 **Image Generation Setup Required**\n\nTo enable AI image generation, please:\n\n1. Get a free Hugging Face API token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)\n2. Add it to your `.env` file:\n   ```\n   REACT_APP_HF_API_TOKEN=your_token_here\n   ```\n3. Restart the development server\n\n*Note: Google's Imagen API is not available through the standard Gemini API. We use Stable Diffusion via Hugging Face as an alternative.*";
        }
      } else {
        const bestVerse = findBestVerse(text);
        aiResponseText = await callGeminiAPI(currentHistory, text, fileToUpload, bestVerse);
      }

      const aiMsg = { 
        id: Date.now(),
        role: 'model', 
        content: aiResponseText, 
        drafts: [aiResponseText], 
        currentDraftIndex: 0,
        generatedImage: generatedImageUrl,
        feedback: null
      };

      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);

      if (currentChatId) {
        updateChat(currentChatId, { messages: finalMessages });
      } else {
        const newId = Date.now();
        setCurrentChatId(newId);
        setChatHistory(prev => [{ 
          id: newId, 
          title: text.slice(0, 30) + (text.length > 30 ? '...' : ''), 
          messages: finalMessages,
          pinned: false, archived: false, date: new Date().toISOString()
        }, ...prev]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Connection interrupted." }]);
      addToast('Failed to send message', 'error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#131314] text-[#e3e3e3] font-sans overflow-hidden">
      <ToastContainer toasts={toasts} removeToast={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
      <Sidebar 
        isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} 
        activePage={activePage} setActivePage={setActivePage} 
        chatHistory={chatHistory} createNewChat={createNewChat} 
        loadChat={loadChat} updateChat={updateChat} deleteChat={deleteChat} 
        setShareModalOpen={setShareModalOpen} setCurrentShareChat={setCurrentShareChat}
        openSettings={() => setSettingsOpen(true)} openHelp={() => setHelpOpen(true)}
      />
      
      <div className="flex-1 flex flex-col h-full relative w-full">
        <header className="flex items-center justify-between p-4 bg-[#131314]/90 backdrop-blur-md sticky top-0 z-10 border-b border-[#1e1f20]">
            <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-400"><Menu size={20} /></button>
                <span className="md:hidden font-semibold">Shankhnaad</span>
            </div>
            <div className="flex gap-2">
              <button className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#1e1f20] rounded-full text-xs text-gray-400 border border-[#444746]"><Sparkles size={12} className="text-yellow-400"/> AI Powered</button>
              <button className="w-8 h-8 rounded-full bg-[#004a77] flex items-center justify-center text-white shadow-lg" onClick={() => addToast("Login Coming Soon", "info")}><User size={16}/></button>
            </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activePage === 'about' ? (
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="max-w-2xl mx-auto text-center">
                    <img src="/logo.png" alt="Shankhnaad Logo" className="w-24 h-24 rounded-full mb-6 mx-auto shadow-2xl shadow-orange-500/20" onError={(e) => e.target.style.display='none'}/>
                    <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-200">About Shankhnaad AI</h1>
                    <div className="bg-[#1e1f20] p-6 rounded-2xl border border-[#444746] text-left space-y-4">
                       <p className="text-gray-300">Shankhnaad is a spiritual technology initiative by the <strong>Krishna Consciousness Society</strong> bridging the timeless wisdom of the Bhagavad Gita with Generative AI.</p>
                       <ul className="list-disc pl-5 text-gray-400 space-y-1"><li>Gemini 2.5 Flash for deep reasoning</li><li>Imagen 4.0 for divine image generation</li><li>Local RAG with Gita Database</li></ul>
                    </div>
                </div>
            </div>
          ) : activePage === 'privacy' ? (
            <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar animate-fade-in">
                 <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <div className="space-y-6 text-gray-300">
                       <section className="bg-[#1e1f20] p-6 rounded-2xl border border-[#444746]"><h2 className="text-xl font-bold text-white mb-2">1. Data Storage</h2><p>All chat history is stored <strong>locally on your device</strong> (LocalStorage).</p></section>
                    </div>
                 </div>
            </div>
          ) : activePage === 'archived' ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-500"><Archive size={48} className="mb-4 opacity-50"/><p>Select an archived chat.</p></div>
          ) : (
           <>
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-32 custom-scrollbar">
                {messages.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full text-center">
                     <h1 className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 mb-2">Hare Krishna, Devotee</h1>
                     <h2 className="text-2xl text-gray-400 mb-8">How can I guide you today?</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                       {[
                         {t: 'How to find peace?', i: <Sparkles size={18} className="text-yellow-400"/>},
                         {t: 'Generate image of Krishna', i: <ImageIcon size={18} className="text-blue-400"/>}, 
                         {t: 'What is Karma Yoga?', i: <BookOpen size={18} className="text-purple-400"/>},
                         {t: 'Meaning of true love', i: <HelpCircle size={18} className="text-pink-400"/>}
                       ].map((item, i) => (
                         <button key={i} onClick={() => handleSendMessage(item.t)} className="flex items-center justify-between p-4 bg-[#1e1f20] border border-[#444746] rounded-xl hover:bg-[#333537] text-left text-gray-300 transition-colors"><span>{item.t}</span>{item.i}</button>
                       ))}
                     </div>
                   </div>
                )}
                {messages.map((msg, idx) => (
                  <MessageItem key={idx} index={idx} msg={msg} onEdit={handleEdit} onRegenerate={handleRegenerate} onFeedback={handleFeedback} onReport={(id) => { setActiveReportId(id); setReportModalOpen(true); }} addToast={addToast} />
                ))}
                {isTyping && <div className="flex gap-4 ml-2"><img src="/logo.png" alt="Shankhnaad Logo" className="w-8 h-8 opacity-50 animate-pulse rounded-full"/><span className="text-gray-500 text-sm mt-2 flex items-center gap-2">Consulting scriptures <Loader2 size={12} className="animate-spin"/></span></div>}
              </div>
              
              <div className="p-4 bg-[#131314]">
                <div className="max-w-3xl mx-auto">
                   {selectedFile && (
                     <div className="mb-2 p-2 bg-[#1e1f20] rounded-lg inline-flex items-center gap-2 border border-[#444746] animate-scale-up">
                       {selectedFile.type.startsWith('image') ? <ImageIcon size={14}/> : selectedFile.type.startsWith('video') ? <FileVideo size={14}/> : <FileAudio size={14}/>}
                       <span className="text-xs text-gray-300 truncate max-w-[150px]">{selectedFile.name}</span>
                       <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-white"><X size={14}/></button>
                     </div>
                   )}
                   <div className="bg-[#1e1f20] rounded-3xl border border-[#444746] flex items-end px-4 py-3 shadow-lg focus-within:border-gray-500 transition-colors">
                      <button onClick={() => fileInputRef.current.click()} className={`p-2 rounded-full mb-1 ${selectedFile ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}><Plus size={20} /></button>
                      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*,audio/*,video/*" className="hidden" />
                      <textarea className="flex-1 bg-transparent border-none outline-none text-white px-3 resize-none max-h-32 py-3 custom-scrollbar" rows={1} style={{minHeight:'44px'}} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage()} placeholder="Ask Shankhnaad..." />
                      {input || selectedFile ? (
                        <button onClick={() => handleSendMessage()} className="p-2 bg-white rounded-full text-black hover:bg-gray-200 mb-1 animate-scale-up"><Send size={18} /></button>
                      ) : (
                        <button onClick={handleMicClick} className={`p-2 rounded-full mb-1 transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}>
                          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                      )}
                   </div>
                   <p className="text-center text-[10px] text-gray-600 mt-2">Shankhnaad may produce inaccurate information.</p>
                </div>
              </div>
           </>
          )}
        </main>
      </div>

      <ReportModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} messageId={activeReportId} addToast={addToast} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} addToast={addToast} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
      
      {shareModalOpen && currentShareChat && (
        <ModalWrapper onClose={() => setShareModalOpen(false)}>
            <div className="flex items-center gap-2 mb-4 text-lg font-bold text-white"><Share2 size={20}/> Share Chat</div>
            <div className="bg-[#131314] p-4 rounded-lg mb-4 text-xs text-gray-400 max-h-60 overflow-auto border border-[#444746]">{currentShareChat.messages.map(m => `${m.role}: ${m.content}`).join('\n\n')}</div>
            <div className="flex gap-2"><button onClick={() => { navigator.clipboard.writeText(currentShareChat.messages.map(m => m.content).join('\n')); addToast('Transcript copied', 'success'); setShareModalOpen(false); }} className="flex-1 bg-[#004a77] text-white py-2 rounded-full hover:bg-[#005c94] transition-colors">Copy Transcript</button></div>
        </ModalWrapper>
      )}

      <style>{`
        .markdown-content ul { list-style: disc; padding-left: 20px; margin-bottom: 10px; }
        .markdown-content p { margin-bottom: 10px; }
        .markdown-content strong { color: #fff; font-weight: 600; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444746; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5e6062; }
      `}</style>
    </div>
  );
}


