"use client"

import { useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"

export function ChatbotWidget() {
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize chatbot functionality after component mounts
    const initializeChatbot = () => {
      let chatbotMinimized = true  // Start minimized
      let chatbotTyping = false
      let hasAutoOpened = false
      let chatMessages: Array<{ content: string, sender: "user" | "bot", timestamp: string }> = []
      let leadInfo: {
        name?: string,
        email?: string,
        phone?: string,
        company?: string,
        budget?: string,
        industry?: string,
        serviceType?: string
      } = {}

      // Configuration
      const WEBHOOK_URL = "https://n8n.srv888726.hstgr.cloud/webhook/7e412021-a840-4cee-8928-88f7c2fbd858/chat"

      // DOM elements
      const chatbotWidget = document.getElementById("minecore-chatbot-widget")
      const chatbotMessages = document.getElementById("minecore-chatbot-messages")
      const chatbotInput = document.getElementById("minecore-chatbot-input") as HTMLTextAreaElement
      const chatbotSendBtn = document.getElementById("minecore-chatbot-send-btn")
      const minimizeBtn = document.getElementById("minecore-minimize-btn")

      if (!chatbotWidget || !chatbotMessages || !chatbotInput || !chatbotSendBtn || !minimizeBtn) {
        return
      }

      // Event listeners
      chatbotInput.addEventListener("keydown", handleChatKeyDown)
      chatbotInput.addEventListener("input", autoResizeChatInput)
      minimizeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        toggleChatbot()
      })
      chatbotSendBtn.addEventListener("click", sendChatMessage)

      // Focus input when widget is clicked, or open if minimized
      chatbotWidget.addEventListener("click", () => {
        if (chatbotMinimized) {
          toggleChatbot()
        } else {
          chatbotInput.focus()
        }
      })

      // Auto-open when user scrolls down 15%
      const handleScroll = () => {
        if (hasAutoOpened) return

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )
        const windowHeight = window.innerHeight
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100

        if (scrollPercent >= 25 && chatbotMinimized) {
          hasAutoOpened = true
          setTimeout(() => {
            toggleChatbot()
          }, 2000) // Delay opening by 2 seconds after scroll trigger
        }
      }

      window.addEventListener("scroll", handleScroll)

      // Initialize as minimized
      chatbotWidget?.classList.add("minimized")
      if (minimizeBtn) {
        minimizeBtn.textContent = "+"
      }

      function toggleChatbot() {
        chatbotMinimized = !chatbotMinimized
        chatbotWidget?.classList.toggle("minimized", chatbotMinimized)
        if (minimizeBtn) {
          minimizeBtn.textContent = chatbotMinimized ? "+" : "−"
        }

        if (!chatbotMinimized) {
          setTimeout(() => chatbotInput.focus(), 300)
        }
      }

      function handleChatKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault()
          sendChatMessage()
        }
      }

      function autoResizeChatInput() {
        chatbotInput.style.height = "auto"
        chatbotInput.style.height = Math.min(chatbotInput.scrollHeight, 80) + "px"
      }

      async function sendChatMessage() {
        const message = chatbotInput.value.trim()
        if (!message || chatbotTyping) return

        // Add user message
        addChatMessage(message, "user")
        chatbotInput.value = ""
        autoResizeChatInput()

        // Show typing indicator
        showChatTyping()

        try {
          // Try different payload formats
          const payloadOptions = [
            { message: message },
            { text: message },
            { query: message },
            { input: message },
            { chatInput: message },
          ]

          let response
          let success = false

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
              })

              if (response.ok) {
                success = true
                break
              }
            } catch (error) {
              console.log("Payload failed:", payload, error)
            }
          }

          if (!success || !response) {
            throw new Error("All payload formats failed")
          }

          const data = await response.text()

          // Hide typing indicator
          hideChatTyping()

          // Try to parse as JSON, fallback to text
          let botMessage
          try {
            const jsonData = JSON.parse(data)
            botMessage =
              jsonData.message ||
              jsonData.output ||
              jsonData.text ||
              jsonData.response ||
              "Thank you for your message! Our team will get back to you soon."
          } catch {
            botMessage = data || "Thank you for your message! Our team will get back to you soon."
          }

          // Add bot response
          addChatMessage(botMessage, "bot")

          // Reset inactivity timer
          resetInactivityTimer()
        } catch (error) {
          console.error("Chatbot error:", error)
          hideChatTyping()

          // Contextual error message
          const userMessage = message.toLowerCase()
          let contextualError = "I'm having trouble connecting right now. "

          if (userMessage.includes("automation")) {
            contextualError += "I'd love to discuss our automation solutions! "
          } else if (userMessage.includes("price") || userMessage.includes("cost")) {
            contextualError += "For pricing information, "
          }

          contextualError +=
            "Please contact us at contact@minecoregroup.com or book a free consultation on our website."

          addChatMessage(contextualError, "bot")
        }
      }

      function addChatMessage(content: string, sender: "user" | "bot") {
        const messageDiv = document.createElement("div")
        messageDiv.className = `minecore-message ${sender}`

        const avatar = document.createElement("div")
        avatar.className = "minecore-message-avatar"
        avatar.textContent = sender === "user" ? "Y" : "M"

        const messageContent = document.createElement("div")
        messageContent.className = "minecore-message-content"

        // Convert URLs to clickable links for bot messages
        if (sender === "bot") {
          messageContent.innerHTML = convertLinksToClickable(content)
        } else {
          messageContent.textContent = content
        }

        messageDiv.appendChild(avatar)
        messageDiv.appendChild(messageContent)

        // Remove welcome message if it exists
        const welcomeMsg = chatbotMessages?.querySelector(".minecore-welcome-message")
        if (welcomeMsg) {
          welcomeMsg.remove()
        }

        chatbotMessages?.appendChild(messageDiv)
        scrollChatToBottom()

        // Track message
        chatMessages.push({
          content,
          sender,
          timestamp: new Date().toISOString()
        })

        if (sender === "user" || sender === "bot") {
          const infoFound = extractLeadInfo(content)
          if (infoFound) {
            saveChatbotLead()
          }
        }
      }

      function convertLinksToClickable(text: string): string {
        // ... (existing code) ...
        // URL regex pattern to match various URL formats
        const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gi

        return text.replace(urlPattern, (url) => {
          // Clean up any trailing punctuation that might be part of the sentence
          const cleanUrl = url.replace(/[.,;:!?]+$/, '')
          const trailingPunctuation = url.substring(cleanUrl.length)

          return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #ffffff; text-decoration: underline; font-weight: 500;">${cleanUrl}</a>${trailingPunctuation}`
        })
      }

      function showChatTyping() {
        if (chatbotTyping) return

        chatbotTyping = true
        if (chatbotSendBtn) {
          ; (chatbotSendBtn as HTMLButtonElement).disabled = true
        }

        const typingDiv = document.createElement("div")
        typingDiv.className = "minecore-message bot minecore-typing-indicator"
        typingDiv.id = "minecore-typing-indicator"

        const avatar = document.createElement("div")
        avatar.className = "minecore-message-avatar"
        avatar.textContent = "M"

        const typingDots = document.createElement("div")
        typingDots.className = "minecore-typing-dots"
        typingDots.innerHTML =
          '<div class="minecore-typing-dot"></div><div class="minecore-typing-dot"></div><div class="minecore-typing-dot"></div>'

        typingDiv.appendChild(avatar)
        typingDiv.appendChild(typingDots)

        chatbotMessages?.appendChild(typingDiv)
        scrollChatToBottom()
      }

      function hideChatTyping() {
        const typingIndicator = document.getElementById("minecore-typing-indicator")
        if (typingIndicator) {
          typingIndicator.remove()
        }
        chatbotTyping = false
        if (chatbotSendBtn) {
          ; (chatbotSendBtn as HTMLButtonElement).disabled = false
        }
      }

      function scrollChatToBottom() {
        if (chatbotMessages) {
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight
        }
        // Force scroll again after a small delay for images/dynamic content
        setTimeout(() => {
          if (chatbotMessages) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight
          }
        }, 100)
      }

      function getChatSessionId() {
        let sessionId = localStorage.getItem("minecore-chat-session-id")
        if (!sessionId) {
          sessionId = "minecore-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
          localStorage.setItem("minecore-chat-session-id", sessionId)
        }
        return sessionId
      }

      function extractLeadInfo(content: string): boolean {
        let foundNewInfo = false
        const lowerContent = content.toLowerCase()

        // Name Extraction (Stricter)
        const namePatterns = [
          /(?:name is|I am|call me) ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i,
          /(?:je m'appelle|mon nom est|c'est|suis) ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i,
          /(?:nice to meet you,?) ([A-Z][a-z]+)/i
        ]

        if (!leadInfo.name) {
          for (const pattern of namePatterns) {
            const match = content.match(pattern)
            if (match && match[1]) {
              const name = match[1].trim()
              // Validate: Capitalized, length > 2, not common words
              if (name.length > 2 && /^[A-Z]/.test(name) && !['Here', 'There', 'Hello', 'Bonjour', 'Merci', 'Sorry', 'Désolé', 'Oui', 'Non', 'Salut', 'Hey'].includes(name)) {
                leadInfo.name = name
                foundNewInfo = true
                break
              }
            }
          }
        }

        // Email Extraction
        if (!leadInfo.email) {
          const emailMatch = content.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
          if (emailMatch) {
            leadInfo.email = emailMatch[1]
            foundNewInfo = true
          }
        }

        // Phone Extraction
        if (!leadInfo.phone) {
          const phoneMatch = content.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i)
          if (phoneMatch) {
            leadInfo.phone = phoneMatch[1]
            foundNewInfo = true
          }
        }

        // Company Extraction
        if (!leadInfo.company) {
          const companyPatterns = [
            /(?:work(?:ing)?\s+(?:at|for)|from) ([A-Z][a-z0-9]+(?:\s[A-Z][a-z0-9]+)*)/i,
            /(?:je travaille (?:chez|pour)|société|entreprise) ([A-Z][a-z0-9]+(?:\s[A-Z][a-z0-9]+)*)/i
          ]
          for (const pattern of companyPatterns) {
            const match = content.match(pattern)
            if (match && match[1]) {
              const company = match[1].trim()
              if (company.length > 2 && !['Now', 'Moment', 'Ici', 'Maison'].includes(company)) {
                leadInfo.company = company
                foundNewInfo = true
                break
              }
            }
          }
        }

        // Budget Extraction
        if (!leadInfo.budget) {
          const budgetMatch = content.match(/(\$?\d+(?:[kK]|,\d{3})?)/)
          if (budgetMatch && (lowerContent.includes("budget") || lowerContent.includes("invest") || lowerContent.includes("coût") || lowerContent.includes("prix"))) {
            leadInfo.budget = budgetMatch[1] + "+"
            foundNewInfo = true
          }
        }

        // Industry Extraction
        if (!leadInfo.industry) {
          const industries = [
            { key: "Immobilier", keywords: ["immobilier", "real estate", "courtier", "maison", "appart"] },
            { key: "Technology", keywords: ["tech", "software", "logiciel", "saas", "app", "web"] },
            { key: "Health", keywords: ["santé", "health", "clinique", "medical", "docteur", "dentiste"] },
            { key: "Finance", keywords: ["finance", "banque", "assurance", "invest", "comptable"] },
            { key: "Retail", keywords: ["commerce", "retail", "vente", "boutique", "magasin", "e-com"] },
            { key: "Construction", keywords: ["construction", "renovation", "batiment", "entrepreneur"] }
          ]
          for (const ind of industries) {
            if (ind.keywords.some(k => lowerContent.includes(k))) {
              leadInfo.industry = ind.key
              foundNewInfo = true
              break
            }
          }
        }

        // Service Interest
        if (!leadInfo.serviceType) {
          if (lowerContent.includes("chatbot") || lowerContent.includes("chat bot")) leadInfo.serviceType = "Chatbot"
          else if (lowerContent.includes("voice") || lowerContent.includes("voix")) leadInfo.serviceType = "Voicebot"
          else if (lowerContent.includes("crm") || lowerContent.includes("gestion")) leadInfo.serviceType = "CRM"
          else if (lowerContent.includes("automat") || lowerContent.includes("ia")) leadInfo.serviceType = "Automations"

          if (leadInfo.serviceType) foundNewInfo = true
        }

        return foundNewInfo
      }

      async function saveChatbotLead() {
        if (!leadInfo.name && !leadInfo.email && !leadInfo.phone && !leadInfo.company) {
          return
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
          })

          if (response.ok) {
            console.log('Lead saved successfully')
          }
        } catch (error) {
          console.error('Error saving lead:', error)
        }
      }

      async function saveChatbotConversation() {
        if (chatMessages.length === 0) {
          return
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
          })

          if (response.ok) {
            console.log('Conversation saved successfully')
          }
        } catch (error) {
          console.error('Error saving conversation:', error)
        }
      }

      async function sendConversationSummary() {
        if (!leadInfo.email || chatMessages.length === 0) {
          return
        }

        try {
          const response = await fetch('/api/chatbot/send-summary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              leadEmail: leadInfo.email,
              leadName: leadInfo.name,
              conversationSummary: generateConversationSummary(),
              messages: chatMessages
            })
          })

          if (response.ok) {
            console.log('Summary email sent successfully')
          }
        } catch (error) {
          console.error('Error sending summary email:', error)
        }
      }

      function generateConversationSummary(): string {
        const userMessages = chatMessages.filter(msg => msg.sender === 'user')
        const botMessages = chatMessages.filter(msg => msg.sender === 'bot')

        let summary = "Based on our conversation, here's what we discussed:\n\n"

        if (leadInfo.company) {
          summary += `• Your company: ${leadInfo.company}\n`
        }

        summary += `• We discussed automation solutions that could help your business\n`
        summary += `• You expressed interest in learning more about our services\n`
        summary += `• We recommend scheduling a free consultation to discuss your specific needs\n\n`

        summary += "Our team specializes in helping businesses like yours reduce workload by 70% and increase revenue by 40% through intelligent automation."

        return summary
      }

      // Save lead and conversation periodically
      const saveInterval = setInterval(() => {
        saveChatbotLead()
        saveChatbotConversation()
      }, 30000) // Save every 30 seconds

      // Send summary when conversation ends (detect inactivity)
      let inactivityTimer: NodeJS.Timeout
      function resetInactivityTimer() {
        clearTimeout(inactivityTimer)
        inactivityTimer = setTimeout(() => {
          if (leadInfo.email) {
            sendConversationSummary()
          }
        }, 300000) // 5 minutes of inactivity
      }

      // Start inactivity timer
      resetInactivityTimer()

      // Return cleanup function
      return () => {
        window.removeEventListener("scroll", handleScroll)
        clearInterval(saveInterval)
        clearTimeout(inactivityTimer)
      }
    }

    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeChatbot, 100)

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <style>{`
        .minecore-chatbot-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 400px;
          height: 600px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 32px;
          box-shadow: 
            0 30px 60px -12px rgba(0, 0, 0, 0.25),
            0 18px 36px -18px rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.3);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          z-index: 10000;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .minecore-chatbot-widget.minimized {
          width: auto;
          height: 72px;
          background: transparent;
          box-shadow: none;
          border: none;
          display: flex;
          align-items: center;
          flex-direction: row;
          gap: 16px;
          cursor: pointer;
          overflow: visible;
          padding: 0;
        }

        .minecore-chatbot-trigger-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #000000, #2c2c2c);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          filter: url('#liquid-filter');
          position: relative;
          z-index: 2;
        }

        .minecore-chatbot-label {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .minecore-chatbot-widget.minimized .minecore-chatbot-label {
          opacity: 1;
          transform: translateX(0);
        }

        .minecore-chatbot-widget.minimized .minecore-chatbot-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .minecore-liquid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          filter: url('#liquid-filter');
          opacity: 0.6;
          pointer-events: none;
        }

        .minecore-blob {
          position: absolute;
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #000000 0%, #444444 100%);
          border-radius: 50%;
          filter: blur(20px);
          animation: minecore-liquid-move 20s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .minecore-blob-1 { top: -50px; left: -50px; background: linear-gradient(135deg, #000 0%, #333 100%); width: 250px; height: 250px; }
        .minecore-blob-2 { bottom: -50px; right: -50px; background: linear-gradient(135deg, #222 0%, #555 100%); width: 220px; height: 220px; animation-delay: -5s; }
        .minecore-blob-3 { top: 40%; left: 30%; background: linear-gradient(135deg, #444 0%, #111 100%); width: 180px; height: 180px; animation-delay: -10s; }

        @keyframes minecore-liquid-move {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(30px, 50px) rotate(120deg) scale(1.1); }
          66% { transform: translate(-20px, 30px) rotate(240deg) scale(0.9); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }

        @keyframes minecore-glow-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.2); }
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
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: #ffffff;
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 10;
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
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          max-width: 80%;
          padding: 14px 18px;
          border-radius: 20px;
          font-size: 14px;
          line-height: 1.55;
          word-wrap: break-word;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .minecore-message.bot .minecore-message-content {
          background: rgba(0, 0, 0, 0.85);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom-left-radius: 4px;
        }

        .minecore-message.user .minecore-message-content {
          background: linear-gradient(135deg, #000000, #222222);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom-right-radius: 4px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
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

        .minecore-typing-dot:nth-child(1) {
          animation-delay: 0ms;
        }

        .minecore-typing-dot:nth-child(2) {
          animation-delay: 150ms;
        }

        .minecore-typing-dot:nth-child(3) {
          animation-delay: 300ms;
        }

        @keyframes minecore-typingDot {
          0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
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
      `}</style>
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div id="minecore-chatbot-widget" className="minecore-chatbot-widget">
        <div className="minecore-liquid-bg">
          <div className="minecore-blob minecore-blob-1"></div>
          <div className="minecore-blob minecore-blob-2"></div>
          <div className="minecore-blob minecore-blob-3"></div>
        </div>

        <div className="minecore-chatbot-label">
          {t('chatbotTriggerLabel') || 'Discutez avec nous'}
        </div>

        <div className="minecore-chatbot-trigger-circle">
          <div className="minecore-chatbot-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>

        <div className="minecore-chatbot-header">
          <div className="minecore-chatbot-header-info">
            <div className="minecore-chatbot-avatar">M</div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "-0.01em" }}>Minecore AI</div>
              <div className="minecore-chatbot-status">
                <div className="minecore-status-dot"></div>
                {t('chatbotOnline')}
              </div>
            </div>
          </div>
          <button id="minecore-minimize-btn" className="minecore-minimize-btn">
            −
          </button>
        </div>

        <div id="minecore-chatbot-messages" className="minecore-chatbot-messages">
          <div className="minecore-welcome-message">
            <h3>{t('chatbotWelcomeTitle')}</h3>
            <p>{t('chatbotWelcomeMessage')}</p>
          </div>
        </div>

        <div className="minecore-chatbot-input-container">
          <div className="minecore-chatbot-input-wrapper">
            <textarea
              id="minecore-chatbot-input"
              className="minecore-chatbot-input"
              placeholder={t('chatbotPlaceholder')}
              rows={1}
            />
            <button id="minecore-chatbot-send-btn" className="minecore-chatbot-send-btn">
              ↑
            </button>
          </div>
        </div>
      </div>
    </>
  )
}