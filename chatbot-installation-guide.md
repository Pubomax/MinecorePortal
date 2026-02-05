# Minecore AI Chatbot Widget - Installation Guide

## Overview
This guide provides complete installation instructions for the Minecore AI chatbot widget across different platforms. The chatbot connects to an n8n automation workflow and provides intelligent responses to visitor queries.

## Features
- Glass-morphism design with smooth animations
- Auto-opens when user scrolls 15% down the page
- Responsive for mobile and desktop
- Minimizable circular widget
- Lead capture and conversation saving
- Bilingual support (English/French)
- Integration with n8n automation workflow

## Prerequisites
- n8n webhook URL (current: `https://n8n.srv888726.hstgr.cloud/webhook/7e412021-a840-4cee-8928-88f7c2fbd858/chat`)
- Basic knowledge of HTML/CSS/JavaScript
- Access to modify website files

---

## 1. WordPress Installation

### Method 1: Using a Custom HTML Block (Recommended)

1. **Add the following code to your WordPress theme's `functions.php` file:**

```php
// Add chatbot widget to WordPress footer
function minecore_chatbot_widget() {
    ?>
    <div id="minecore-chatbot-widget" class="minecore-chatbot-widget">
        <div class="minecore-chatbot-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        </div>
        <div class="minecore-chatbot-header">
            <div class="minecore-chatbot-header-info">
                <div class="minecore-chatbot-avatar">M</div>
                <div>
                    <div style="font-size: 14px; font-weight: 600;">Minecore AI</div>
                    <div class="minecore-chatbot-status">
                        <div class="minecore-status-dot"></div>
                        Online
                    </div>
                </div>
            </div>
            <button id="minecore-minimize-btn" class="minecore-minimize-btn">−</button>
        </div>
        <div id="minecore-chatbot-messages" class="minecore-chatbot-messages">
            <div class="minecore-welcome-message">
                <h3>Welcome to Minecore AI!</h3>
                <p>I'm here to help you learn about our automation solutions. How can I assist you today?</p>
            </div>
        </div>
        <div class="minecore-chatbot-input-container">
            <div class="minecore-chatbot-input-wrapper">
                <textarea id="minecore-chatbot-input" class="minecore-chatbot-input" placeholder="Type your message here..." rows="1"></textarea>
                <button id="minecore-chatbot-send-btn" class="minecore-chatbot-send-btn">↑</button>
            </div>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'minecore_chatbot_widget');
```

2. **Add the CSS to your theme's `style.css` file or in Customizer > Additional CSS:**

```css
/* Minecore Chatbot Widget Styles */
.minecore-chatbot-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 380px;
    height: 500px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    z-index: 10000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.minecore-chatbot-widget.minimized {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: minecore-glow-pulse 2s ease-in-out infinite;
}

@keyframes minecore-glow-pulse {
    0% { box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0px rgba(255, 255, 255, 0.3); }
    50% { box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px 8px rgba(255, 255, 255, 0.15); }
    100% { box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0px rgba(255, 255, 255, 0.3); }
}

.minecore-chatbot-widget.minimized .minecore-chatbot-header,
.minecore-chatbot-widget.minimized .minecore-chatbot-messages,
.minecore-chatbot-widget.minimized .minecore-chatbot-input-container {
    display: none;
}

.minecore-chatbot-icon {
    display: none;
    width: 24px;
    height: 24px;
    color: #ffffff;
    opacity: 0.9;
}

.minecore-chatbot-widget.minimized .minecore-chatbot-icon {
    display: block;
}

.minecore-chatbot-header {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(40, 40, 40, 0.8));
    backdrop-filter: blur(10px);
    color: #ffffff;
    padding: 20px;
    border-radius: 20px 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.minecore-chatbot-header-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.minecore-chatbot-avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #000000, #404040);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #ffffff;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.minecore-chatbot-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    opacity: 0.9;
}

.minecore-status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: minecore-pulse 2s infinite;
}

@keyframes minecore-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
}

.minecore-minimize-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    cursor: pointer;
    font-size: 18px;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
}

.minecore-minimize-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}

.minecore-chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.minecore-chatbot-messages::-webkit-scrollbar {
    width: 4px;
}

.minecore-chatbot-messages::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.minecore-chatbot-messages::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.minecore-message {
    display: flex;
    gap: 12px;
    animation: minecore-slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes minecore-slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.minecore-message.user {
    flex-direction: row-reverse;
}

.minecore-message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    flex-shrink: 0;
}

.minecore-message.bot .minecore-message-avatar {
    background: linear-gradient(135deg, #000000, #404040);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.minecore-message.user .minecore-message-avatar {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}

.minecore-message-content {
    max-width: 75%;
    padding: 14px 18px;
    border-radius: 20px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
    backdrop-filter: blur(10px);
}

.minecore-message.bot .minecore-message-content {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(30, 30, 30, 0.7));
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom-left-radius: 8px;
    backdrop-filter: blur(10px);
}

.minecore-message.user .minecore-message-content {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(60, 60, 60, 0.8));
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom-right-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
}

.minecore-message-content a {
    color: #ffffff !important;
    text-decoration: underline !important;
    font-weight: 500 !important;
    transition: all 0.2s ease;
}

.minecore-message-content a:hover {
    color: #e5e5e5 !important;
    text-decoration: none !important;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 4px;
    border-radius: 4px;
}

.minecore-typing-indicator {
    display: flex;
    gap: 12px;
    align-items: center;
}

.minecore-typing-dots {
    display: flex;
    gap: 4px;
    padding: 14px 18px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    border-bottom-left-radius: 8px;
}

.minecore-typing-dot {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: minecore-typingDot 1.5s infinite;
}

.minecore-typing-dot:nth-child(1) { animation-delay: 0ms; }
.minecore-typing-dot:nth-child(2) { animation-delay: 150ms; }
.minecore-typing-dot:nth-child(3) { animation-delay: 300ms; }

@keyframes minecore-typingDot {
    0%, 60%, 100% { transform: scale(1); opacity: 0.6; }
    30% { transform: scale(1.2); opacity: 1; }
}

.minecore-chatbot-input-container {
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0 0 20px 20px;
    backdrop-filter: blur(10px);
}

.minecore-chatbot-input-wrapper {
    display: flex;
    gap: 12px;
    align-items: flex-end;
}

.minecore-chatbot-input {
    flex: 1;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(30, 30, 30, 0.7));
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    padding: 12px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
    min-height: 44px;
    max-height: 80px;
}

.minecore-chatbot-input:focus {
    border-color: rgba(255, 255, 255, 0.25);
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(40, 40, 40, 0.75));
}

.minecore-chatbot-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.minecore-chatbot-send-btn {
    background: linear-gradient(135deg, #000000, #404040);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    padding: 12px;
    border-radius: 50%;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.minecore-chatbot-send-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #202020, #606060);
    transform: scale(1.05);
}

.minecore-chatbot-send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.minecore-welcome-message {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    padding: 40px 20px;
    line-height: 1.6;
}

.minecore-welcome-message h3 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
}

.minecore-welcome-message p {
    margin: 0;
    opacity: 0.9;
}

/* Mobile Responsive */
@media (max-width: 480px) {
    .minecore-chatbot-widget {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0;
        border: none;
    }
    
    .minecore-chatbot-widget.minimized {
        height: 70px;
        width: 200px;
        bottom: 20px;
        right: 20px;
        border-radius: 20px;
    }
    
    .minecore-chatbot-header {
        border-radius: 0;
    }
    
    .minecore-chatbot-input-container {
        border-radius: 0;
    }
}
```

3. **Add the JavaScript functionality to your theme's `functions.php` file:**

```php
// Enqueue chatbot JavaScript
function minecore_chatbot_scripts() {
    wp_enqueue_script('minecore-chatbot', get_template_directory_uri() . '/js/minecore-chatbot.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'minecore_chatbot_scripts');
```

4. **Create a file `js/minecore-chatbot.js` in your theme directory with the following content:**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot functionality
    let chatbotMinimized = true;
    let chatbotTyping = false;
    let hasAutoOpened = false;
    let chatMessages = [];
    let leadInfo = {};

    // Configuration
    const WEBHOOK_URL = "https://n8n.srv888726.hstgr.cloud/webhook/7e412021-a840-4cee-8928-88f7c2fbd858/chat";

    // DOM elements
    const chatbotWidget = document.getElementById("minecore-chatbot-widget");
    const chatbotMessages = document.getElementById("minecore-chatbot-messages");
    const chatbotInput = document.getElementById("minecore-chatbot-input");
    const chatbotSendBtn = document.getElementById("minecore-chatbot-send-btn");
    const minimizeBtn = document.getElementById("minecore-minimize-btn");

    if (!chatbotWidget || !chatbotMessages || !chatbotInput || !chatbotSendBtn || !minimizeBtn) {
        return;
    }

    // Event listeners
    chatbotInput.addEventListener("keydown", handleChatKeyDown);
    chatbotInput.addEventListener("input", autoResizeChatInput);
    minimizeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleChatbot();
    });
    chatbotSendBtn.addEventListener("click", sendChatMessage);

    // Focus input when widget is clicked, or open if minimized
    chatbotWidget.addEventListener("click", () => {
        if (chatbotMinimized) {
            toggleChatbot();
        } else {
            chatbotInput.focus();
        }
    });

    // Auto-open when user scrolls down 15%
    const handleScroll = () => {
        if (hasAutoOpened) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        if (scrollPercent >= 15 && chatbotMinimized) {
            hasAutoOpened = true;
            toggleChatbot();
        }
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize as minimized
    chatbotWidget.classList.add("minimized");
    minimizeBtn.textContent = "+";

    function toggleChatbot() {
        chatbotMinimized = !chatbotMinimized;
        chatbotWidget.classList.toggle("minimized", chatbotMinimized);
        minimizeBtn.textContent = chatbotMinimized ? "+" : "−";

        if (!chatbotMinimized) {
            setTimeout(() => chatbotInput.focus(), 300);
        }
    }

    function handleChatKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendChatMessage();
        }
    }

    function autoResizeChatInput() {
        chatbotInput.style.height = "auto";
        chatbotInput.style.height = Math.min(chatbotInput.scrollHeight, 80) + "px";
    }

    async function sendChatMessage() {
        const message = chatbotInput.value.trim();
        if (!message || chatbotTyping) return;

        // Add user message
        addChatMessage(message, "user");
        chatbotInput.value = "";
        autoResizeChatInput();

        // Show typing indicator
        showChatTyping();

        try {
            // Try different payload formats
            const payloadOptions = [
                { message: message },
                { text: message },
                { query: message },
                { input: message },
                { chatInput: message },
            ];

            let response;
            let success = false;

            for (const payload of payloadOptions) {
                try {
                    response = await fetch(WEBHOOK_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...payload,
                            timestamp: new Date().toISOString(),
                            sessionId: getChatSessionId(),
                        }),
                    });

                    if (response.ok) {
                        success = true;
                        break;
                    }
                } catch (error) {
                    console.log("Payload failed:", payload, error);
                }
            }

            if (!success || !response) {
                throw new Error("All payload formats failed");
            }

            const data = await response.text();

            // Hide typing indicator
            hideChatTyping();

            // Try to parse as JSON, fallback to text
            let botMessage;
            try {
                const jsonData = JSON.parse(data);
                botMessage = jsonData.message || jsonData.output || jsonData.text || jsonData.response || "Thank you for your message! Our team will get back to you soon.";
            } catch {
                botMessage = data || "Thank you for your message! Our team will get back to you soon.";
            }

            // Add bot response
            addChatMessage(botMessage, "bot");
            
            // Reset inactivity timer
            resetInactivityTimer();
        } catch (error) {
            console.error("Chatbot error:", error);
            hideChatTyping();

            // Contextual error message
            const userMessage = message.toLowerCase();
            let contextualError = "I'm having trouble connecting right now. ";

            if (userMessage.includes("automation")) {
                contextualError += "I'd love to discuss our automation solutions! ";
            } else if (userMessage.includes("price") || userMessage.includes("cost")) {
                contextualError += "For pricing information, ";
            }

            contextualError += "Please contact us at contact@minecoregroup.com or book a free consultation on our website.";

            addChatMessage(contextualError, "bot");
        }
    }

    function addChatMessage(content, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `minecore-message ${sender}`;

        const avatar = document.createElement("div");
        avatar.className = "minecore-message-avatar";
        avatar.textContent = sender === "user" ? "Y" : "M";

        const messageContent = document.createElement("div");
        messageContent.className = "minecore-message-content";
        
        // Convert URLs to clickable links for bot messages
        if (sender === "bot") {
            messageContent.innerHTML = convertLinksToClickable(content);
        } else {
            messageContent.textContent = content;
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        // Remove welcome message if it exists
        const welcomeMsg = chatbotMessages.querySelector(".minecore-welcome-message");
        if (welcomeMsg) {
            welcomeMsg.remove();
        }

        chatbotMessages.appendChild(messageDiv);
        scrollChatToBottom();
        
        // Track message
        chatMessages.push({
            content,
            sender,
            timestamp: new Date().toISOString()
        });
        
        // Extract lead information from bot messages
        if (sender === "bot") {
            extractLeadInfo(content);
        }
    }

    function convertLinksToClickable(text) {
        const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gi;
        
        return text.replace(urlPattern, (url) => {
            const cleanUrl = url.replace(/[.,;:!?]+$/, '');
            const trailingPunctuation = url.substring(cleanUrl.length);
            
            return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #ffffff; text-decoration: underline; font-weight: 500;">${cleanUrl}</a>${trailingPunctuation}`;
        });
    }

    function showChatTyping() {
        if (chatbotTyping) return;

        chatbotTyping = true;
        chatbotSendBtn.disabled = true;

        const typingDiv = document.createElement("div");
        typingDiv.className = "minecore-message bot minecore-typing-indicator";
        typingDiv.id = "minecore-typing-indicator";

        const avatar = document.createElement("div");
        avatar.className = "minecore-message-avatar";
        avatar.textContent = "M";

        const typingDots = document.createElement("div");
        typingDots.className = "minecore-typing-dots";
        typingDots.innerHTML = '<div class="minecore-typing-dot"></div><div class="minecore-typing-dot"></div><div class="minecore-typing-dot"></div>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingDots);

        chatbotMessages.appendChild(typingDiv);
        scrollChatToBottom();
    }

    function hideChatTyping() {
        const typingIndicator = document.getElementById("minecore-typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
        chatbotTyping = false;
        chatbotSendBtn.disabled = false;
    }

    function scrollChatToBottom() {
        if (chatbotMessages) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }

    function getChatSessionId() {
        let sessionId = localStorage.getItem("minecore-chat-session-id");
        if (!sessionId) {
            sessionId = "minecore-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("minecore-chat-session-id", sessionId);
        }
        return sessionId;
    }

    function extractLeadInfo(content) {
        // Extract name from patterns like "Nice to meet you, [Name]!"
        const nameMatch = content.match(/nice to meet you,?\s+([^!,.]+)/i);
        if (nameMatch) {
            leadInfo.name = nameMatch[1].trim();
        }
        
        // Extract email from patterns
        const emailMatch = content.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
        if (emailMatch) {
            leadInfo.email = emailMatch[1];
        }
        
        // Extract phone from patterns
        const phoneMatch = content.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i);
        if (phoneMatch) {
            leadInfo.phone = phoneMatch[1];
        }
        
        // Extract company from patterns
        const companyMatch = content.match(/work(?:ing)?\s+(?:at|for)\s+([^,.!?]+)/i);
        if (companyMatch) {
            leadInfo.company = companyMatch[1].trim();
        }
    }

    // Save lead and conversation periodically
    const saveInterval = setInterval(() => {
        // Add your API calls here to save lead info and conversations
        // saveChatbotLead();
        // saveChatbotConversation();
    }, 30000); // Save every 30 seconds

    // Send summary when conversation ends (detect inactivity)
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (leadInfo.email) {
                // sendConversationSummary();
            }
        }, 300000); // 5 minutes of inactivity
    }

    // Start inactivity timer
    resetInactivityTimer();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(saveInterval);
        clearTimeout(inactivityTimer);
    });
});
```

### Method 2: Using a Plugin (Custom Plugin)

Create a custom plugin file `wp-content/plugins/minecore-chatbot/minecore-chatbot.php`:

```php
<?php
/**
 * Plugin Name: Minecore AI Chatbot
 * Description: Intelligent AI chatbot widget for lead generation and customer support
 * Version: 1.0.0
 * Author: Minecore Group
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MinecoreChatbot {
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_chatbot'));
    }

    public function enqueue_scripts() {
        wp_enqueue_script('minecore-chatbot-js', plugin_dir_url(__FILE__) . 'assets/chatbot.js', array(), '1.0.0', true);
        wp_enqueue_style('minecore-chatbot-css', plugin_dir_url(__FILE__) . 'assets/chatbot.css', array(), '1.0.0');
    }

    public function render_chatbot() {
        include plugin_dir_path(__FILE__) . 'templates/chatbot-widget.html';
    }
}

new MinecoreChatbot();
```

---

## 2. HTML/CSS/JavaScript Website Installation

### Complete HTML Implementation

Add the following code just before the closing `</body>` tag:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <style>
        /* Include the complete CSS from the WordPress section above */
        /* Copy all the CSS rules from the WordPress CSS section */
    </style>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Minecore Chatbot Widget -->
    <div id="minecore-chatbot-widget" class="minecore-chatbot-widget">
        <div class="minecore-chatbot-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        </div>
        <div class="minecore-chatbot-header">
            <div class="minecore-chatbot-header-info">
                <div class="minecore-chatbot-avatar">M</div>
                <div>
                    <div style="font-size: 14px; font-weight: 600;">Minecore AI</div>
                    <div class="minecore-chatbot-status">
                        <div class="minecore-status-dot"></div>
                        Online
                    </div>
                </div>
            </div>
            <button id="minecore-minimize-btn" class="minecore-minimize-btn">−</button>
        </div>
        <div id="minecore-chatbot-messages" class="minecore-chatbot-messages">
            <div class="minecore-welcome-message">
                <h3>Welcome to Minecore AI!</h3>
                <p>I'm here to help you learn about our automation solutions. How can I assist you today?</p>
            </div>
        </div>
        <div class="minecore-chatbot-input-container">
            <div class="minecore-chatbot-input-wrapper">
                <textarea id="minecore-chatbot-input" class="minecore-chatbot-input" placeholder="Type your message here..." rows="1"></textarea>
                <button id="minecore-chatbot-send-btn" class="minecore-chatbot-send-btn">↑</button>
            </div>
        </div>
    </div>

    <script>
        // Include the complete JavaScript from the WordPress section above
        // Copy all the JavaScript code from the WordPress JavaScript section
    </script>
</body>
</html>
```

---

## 3. PHP Website Integration

### For PHP-based websites (Laravel, CodeIgniter, etc.)

1. **Create a separate CSS file `assets/css/minecore-chatbot.css`:**
```css
/* Include the complete CSS from the WordPress section above */
```

2. **Create a separate JavaScript file `assets/js/minecore-chatbot.js`:**
```javascript
/* Include the complete JavaScript from the WordPress section above */
```

3. **Create a PHP partial file `includes/chatbot-widget.php`:**
```php
<?php
// Chatbot widget partial
?>
<div id="minecore-chatbot-widget" class="minecore-chatbot-widget">
    <div class="minecore-chatbot-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    </div>
    <div class="minecore-chatbot-header">
        <div class="minecore-chatbot-header-info">
            <div class="minecore-chatbot-avatar">M</div>
            <div>
                <div style="font-size: 14px; font-weight: 600;">Minecore AI</div>
                <div class="minecore-chatbot-status">
                    <div class="minecore-status-dot"></div>
                    Online
                </div>
            </div>
        </div>
        <button id="minecore-minimize-btn" class="minecore-minimize-btn">−</button>
    </div>
    <div id="minecore-chatbot-messages" class="minecore-chatbot-messages">
        <div class="minecore-welcome-message">
            <h3>Welcome to Minecore AI!</h3>
            <p>I'm here to help you learn about our automation solutions. How can I assist you today?</p>
        </div>
    </div>
    <div class="minecore-chatbot-input-container">
        <div class="minecore-chatbot-input-wrapper">
            <textarea id="minecore-chatbot-input" class="minecore-chatbot-input" placeholder="Type your message here..." rows="1"></textarea>
            <button id="minecore-chatbot-send-btn" class="minecore-chatbot-send-btn">↑</button>
        </div>
    </div>
</div>
```

4. **Include in your main layout file:**
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
    <link rel="stylesheet" href="assets/css/minecore-chatbot.css">
</head>
<body>
    <!-- Your website content -->
    
    <?php include 'includes/chatbot-widget.php'; ?>
    
    <script src="assets/js/minecore-chatbot.js"></script>
</body>
</html>
```

---

## 4. Configuration Options

### Customizing the Webhook URL

To use your own n8n webhook URL, update the `WEBHOOK_URL` constant in the JavaScript:

```javascript
const WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE";
```

### Customizing Colors and Appearance

You can customize the chatbot appearance by modifying the CSS variables:

```css
:root {
    --chatbot-primary-color: #000000;
    --chatbot-secondary-color: #404040;
    --chatbot-accent-color: #10b981;
    --chatbot-text-color: #ffffff;
    --chatbot-background-alpha: 0.1;
}
```

### Customizing Messages

Update the welcome message and other text in the HTML:

```html
<div class="minecore-welcome-message">
    <h3>Welcome to Your Company!</h3>
    <p>Your custom welcome message here...</p>
</div>
```

### Auto-open Settings

Modify the scroll percentage threshold for auto-opening:

```javascript
if (scrollPercent >= 15 && chatbotMinimized) { // Change 15 to your desired percentage
    hasAutoOpened = true;
    toggleChatbot();
}
```

---

## 5. API Integration (Optional)

### Lead Capture API

If you want to capture leads from the chatbot, add these API endpoints:

```javascript
// Add these functions to your JavaScript implementation
async function saveChatbotLead() {
    if (!leadInfo.name && !leadInfo.email && !leadInfo.phone && !leadInfo.company) {
        return;
    }

    try {
        const response = await fetch('/api/chatbot/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: getChatSessionId(),
                ...leadInfo
            })
        });

        if (response.ok) {
            console.log('Lead saved successfully');
        }
    } catch (error) {
        console.error('Error saving lead:', error);
    }
}

async function saveChatbotConversation() {
    if (chatMessages.length === 0) {
        return;
    }

    try {
        const response = await fetch('/api/chatbot/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: getChatSessionId(),
                messages: chatMessages
            })
        });

        if (response.ok) {
            console.log('Conversation saved successfully');
        }
    } catch (error) {
        console.error('Error saving conversation:', error);
    }
}
```

### PHP API Endpoints

Create API endpoints in PHP to handle lead and conversation data:

```php
<?php
// api/chatbot/leads.php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate and sanitize input
    $sessionId = filter_var($input['sessionId'], FILTER_SANITIZE_STRING);
    $name = filter_var($input['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($input['phone'], FILTER_SANITIZE_STRING);
    $company = filter_var($input['company'], FILTER_SANITIZE_STRING);
    
    // Save to database
    // $pdo = new PDO("mysql:host=localhost;dbname=your_database", $username, $password);
    // $stmt = $pdo->prepare("INSERT INTO chatbot_leads (session_id, name, email, phone, company) VALUES (?, ?, ?, ?, ?)");
    // $stmt->execute([$sessionId, $name, $email, $phone, $company]);
    
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Method not allowed']);
}
?>
```

---

## 6. Testing and Troubleshooting

### Testing the Installation

1. **Visual Test**: Check if the chatbot widget appears in the bottom-right corner
2. **Interaction Test**: Click the widget to open/close it
3. **Message Test**: Send a test message to verify webhook connectivity
4. **Auto-open Test**: Scroll down 15% to test auto-opening
5. **Mobile Test**: Test on mobile devices for responsiveness

### Common Issues and Solutions

**Issue: Chatbot not appearing**
- Check if all CSS and JavaScript files are properly loaded
- Verify the HTML structure is correct
- Check browser console for JavaScript errors

**Issue: Messages not sending**
- Verify the webhook URL is correct and accessible
- Check network tab in browser developer tools
- Ensure n8n workflow is active and running

**Issue: Styling issues**
- Verify CSS is loading correctly
- Check for CSS conflicts with existing styles
- Use browser developer tools to inspect elements

**Issue: Auto-open not working**
- Check if the scroll event listener is attached
- Verify the scroll percentage calculation
- Test on different page lengths

---

## 7. Security Considerations

### Content Security Policy (CSP)

If your website uses CSP, add these rules:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    script-src 'self' 'unsafe-inline'; 
    style-src 'self' 'unsafe-inline'; 
    connect-src 'self' https://n8n.srv888726.hstgr.cloud;
">
```

### Input Sanitization

Always sanitize user inputs on the backend:

```php
$message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
```

### Rate Limiting

Implement rate limiting to prevent spam:

```javascript
// Add rate limiting to prevent spam
const messageTimestamps = [];
const RATE_LIMIT = 5; // messages per minute
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit() {
    const now = Date.now();
    const recentMessages = messageTimestamps.filter(timestamp => now - timestamp < RATE_WINDOW);
    
    if (recentMessages.length >= RATE_LIMIT) {
        return false;
    }
    
    messageTimestamps.push(now);
    return true;
}
```

---

## 8. Performance Optimization

### Lazy Loading

Load the chatbot only when needed:

```javascript
// Load chatbot on user interaction or scroll
let chatbotLoaded = false;

function loadChatbot() {
    if (chatbotLoaded) return;
    
    // Load chatbot CSS and JavaScript
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/minecore-chatbot.css';
    document.head.appendChild(link);
    
    // Initialize chatbot
    initializeChatbot();
    chatbotLoaded = true;
}

// Load on scroll or user interaction
window.addEventListener('scroll', loadChatbot, { once: true });
document.addEventListener('click', loadChatbot, { once: true });
```

### Minification

Minify CSS and JavaScript for production:

```bash
# Using UglifyJS for JavaScript
uglifyjs minecore-chatbot.js -o minecore-chatbot.min.js

# Using cssnano for CSS
cssnano minecore-chatbot.css minecore-chatbot.min.css
```

---

## 9. Browser Compatibility

The chatbot is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Polyfills for Older Browsers

Add polyfills for older browser support:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch,Promise"></script>
```

---

## 10. Maintenance and Updates

### Regular Updates

1. **Update webhook URL** if n8n instance changes
2. **Update styling** to match website theme changes
3. **Monitor performance** and optimize as needed
4. **Test functionality** after website updates

### Backup Strategy

Always backup your chatbot configuration:

```bash
# Backup chatbot files
cp -r chatbot-files/ chatbot-backup-$(date +%Y%m%d)/
```

---

## Support and Contact

For technical support or customization requests:
- Email: contact@minecoregroup.com
- Website: https://minecoregroup.com

---

This installation guide provides everything needed to implement the Minecore AI chatbot on any website platform. The widget is fully responsive, feature-rich, and integrates seamlessly with your existing n8n automation workflow.