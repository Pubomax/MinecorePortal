"use client"

import { useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"

export function ChatbotWidget() {
  const { t } = useLanguage();

  useEffect(() => {
    const initializeChatbot = () => {
      let chatbotMinimized = true
      let chatbotTyping = false
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

      const WEBHOOK_URL = "https://n8n.srv888726.hstgr.cloud/webhook/7e412021-a840-4cee-8928-88f7c2fbd858/chat"

      const chatbotWidget = document.getElementById("minecore-chatbot-widget")
      const chatbotMessages = document.getElementById("minecore-chatbot-messages")
      const chatbotInput = document.getElementById("minecore-chatbot-input") as HTMLTextAreaElement
      const chatbotSendBtn = document.getElementById("minecore-chatbot-send-btn")
      const minimizeBtn = document.getElementById("minecore-minimize-btn")

      if (!chatbotWidget || !chatbotMessages || !chatbotInput || !chatbotSendBtn || !minimizeBtn) {
        return
      }

      chatbotInput.addEventListener("keydown", handleChatKeyDown)
      chatbotInput.addEventListener("input", autoResizeChatInput)
      minimizeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        toggleChatbot()
      })
      chatbotSendBtn.addEventListener("click", sendChatMessage)

      chatbotWidget.addEventListener("click", () => {
        if (chatbotMinimized) {
          toggleChatbot()
        } else {
          chatbotInput.focus()
        }
      })

      // Start minimized
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
        chatbotInput.style.height = Math.min(chatbotInput.scrollHeight, 72) + "px"
      }

      async function sendChatMessage() {
        const message = chatbotInput.value.trim()
        if (!message || chatbotTyping) return

        addChatMessage(message, "user")
        chatbotInput.value = ""
        autoResizeChatInput()
        showChatTyping()

        try {
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
                headers: { "Content-Type": "application/json" },
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

          if (!success || !response) throw new Error("All payload formats failed")

          const data = await response.text()
          hideChatTyping()

          let botMessage
          try {
            const jsonData = JSON.parse(data)
            botMessage = jsonData.message || jsonData.output || jsonData.text || jsonData.response || "Thank you for your message! Our team will get back to you soon."
          } catch {
            botMessage = data || "Thank you for your message! Our team will get back to you soon."
          }

          addChatMessage(botMessage, "bot")
          resetInactivityTimer()
        } catch (error) {
          console.error("Chatbot error:", error)
          hideChatTyping()

          const userMessage = message.toLowerCase()
          let contextualError = "I'm having trouble connecting right now. "
          if (userMessage.includes("automation")) {
            contextualError += "I'd love to discuss our automation solutions! "
          } else if (userMessage.includes("price") || userMessage.includes("cost")) {
            contextualError += "For pricing information, "
          }
          contextualError += "Please contact us at contact@minecoregroup.com or book a free consultation on our website."
          addChatMessage(contextualError, "bot")
        }
      }

      function addChatMessage(content: string, sender: "user" | "bot") {
        const messageDiv = document.createElement("div")
        messageDiv.className = `mc-msg ${sender}`

        const avatar = document.createElement("div")
        avatar.className = "mc-msg-avatar"
        avatar.textContent = sender === "user" ? "Y" : "M"

        const messageContent = document.createElement("div")
        messageContent.className = "mc-msg-content"

        if (sender === "bot") {
          messageContent.innerHTML = convertLinksToClickable(content)
        } else {
          messageContent.textContent = content
        }

        messageDiv.appendChild(avatar)
        messageDiv.appendChild(messageContent)

        const welcomeMsg = chatbotMessages?.querySelector(".mc-welcome")
        if (welcomeMsg) welcomeMsg.remove()

        chatbotMessages?.appendChild(messageDiv)
        scrollChatToBottom()

        chatMessages.push({ content, sender, timestamp: new Date().toISOString() })

        if (sender === "user" || sender === "bot") {
          const infoFound = extractLeadInfo(content)
          if (infoFound) saveChatbotLead()
        }
      }

      function convertLinksToClickable(text: string): string {
        const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+)/gi
        return text.replace(urlPattern, (url) => {
          const cleanUrl = url.replace(/[.,;:!?]+$/, '')
          const trailingPunctuation = url.substring(cleanUrl.length)
          return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color: #D4F87B; text-decoration: underline;">${cleanUrl}</a>${trailingPunctuation}`
        })
      }

      function showChatTyping() {
        if (chatbotTyping) return
        chatbotTyping = true
        if (chatbotSendBtn) (chatbotSendBtn as HTMLButtonElement).disabled = true

        const typingDiv = document.createElement("div")
        typingDiv.className = "mc-msg bot mc-typing"
        typingDiv.id = "mc-typing"

        const avatar = document.createElement("div")
        avatar.className = "mc-msg-avatar"
        avatar.textContent = "M"

        const typingDots = document.createElement("div")
        typingDots.className = "mc-dots"
        typingDots.innerHTML = '<div class="mc-dot"></div><div class="mc-dot"></div><div class="mc-dot"></div>'

        typingDiv.appendChild(avatar)
        typingDiv.appendChild(typingDots)
        chatbotMessages?.appendChild(typingDiv)
        scrollChatToBottom()
      }

      function hideChatTyping() {
        document.getElementById("mc-typing")?.remove()
        chatbotTyping = false
        if (chatbotSendBtn) (chatbotSendBtn as HTMLButtonElement).disabled = false
      }

      function scrollChatToBottom() {
        if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight
        setTimeout(() => { if (chatbotMessages) chatbotMessages.scrollTop = chatbotMessages.scrollHeight }, 100)
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

        const namePatterns = [
          /(?:name is|I am|call me) ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i,
          /(?:je m'appelle|mon nom est|c'est|suis) ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i,
        ]
        if (!leadInfo.name) {
          for (const pattern of namePatterns) {
            const match = content.match(pattern)
            if (match && match[1]) {
              const name = match[1].trim()
              if (name.length > 2 && /^[A-Z]/.test(name) && !['Here', 'There', 'Hello', 'Bonjour', 'Merci', 'Sorry', 'Oui', 'Non', 'Salut', 'Hey'].includes(name)) {
                leadInfo.name = name
                foundNewInfo = true
                break
              }
            }
          }
        }

        if (!leadInfo.email) {
          const emailMatch = content.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
          if (emailMatch) { leadInfo.email = emailMatch[1]; foundNewInfo = true }
        }

        if (!leadInfo.phone) {
          const phoneMatch = content.match(/(\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i)
          if (phoneMatch) { leadInfo.phone = phoneMatch[1]; foundNewInfo = true }
        }

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

        if (!leadInfo.budget) {
          const budgetMatch = content.match(/(\$?\d+(?:[kK]|,\d{3})?)/)
          if (budgetMatch && (lowerContent.includes("budget") || lowerContent.includes("invest") || lowerContent.includes("coût") || lowerContent.includes("prix"))) {
            leadInfo.budget = budgetMatch[1] + "+"
            foundNewInfo = true
          }
        }

        if (!leadInfo.industry) {
          const industries = [
            { key: "Immobilier", keywords: ["immobilier", "real estate", "courtier"] },
            { key: "Technology", keywords: ["tech", "software", "logiciel", "saas"] },
            { key: "Health", keywords: ["santé", "health", "clinique", "medical"] },
            { key: "Finance", keywords: ["finance", "banque", "assurance", "comptable"] },
            { key: "Retail", keywords: ["commerce", "retail", "vente", "boutique"] },
            { key: "Construction", keywords: ["construction", "renovation", "batiment"] }
          ]
          for (const ind of industries) {
            if (ind.keywords.some(k => lowerContent.includes(k))) {
              leadInfo.industry = ind.key
              foundNewInfo = true
              break
            }
          }
        }

        if (!leadInfo.serviceType) {
          if (lowerContent.includes("chatbot")) leadInfo.serviceType = "Chatbot"
          else if (lowerContent.includes("voice") || lowerContent.includes("voix")) leadInfo.serviceType = "Voicebot"
          else if (lowerContent.includes("crm")) leadInfo.serviceType = "CRM"
          else if (lowerContent.includes("automat") || lowerContent.includes("ia")) leadInfo.serviceType = "Automations"
          if (leadInfo.serviceType) foundNewInfo = true
        }

        return foundNewInfo
      }

      async function saveChatbotLead() {
        if (!leadInfo.name && !leadInfo.email && !leadInfo.phone && !leadInfo.company) return
        try {
          await fetch('/api/chatbot/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: getChatSessionId(), ...leadInfo })
          })
        } catch (error) {
          console.error('Error saving lead:', error)
        }
      }

      const saveInterval = setInterval(() => { saveChatbotLead() }, 30000)

      let inactivityTimer: NodeJS.Timeout
      function resetInactivityTimer() {
        clearTimeout(inactivityTimer)
        inactivityTimer = setTimeout(() => {}, 300000)
      }
      resetInactivityTimer()

      return () => {
        clearInterval(saveInterval)
        clearTimeout(inactivityTimer)
      }
    }

    const timeoutId = setTimeout(initializeChatbot, 100)
    return () => { clearTimeout(timeoutId) }
  }, [])

  return (
    <>
      <style>{`
        /* ── Widget shell ── */
        .mc-widget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 340px;
          height: 460px;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          box-shadow:
            0 24px 48px -12px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
          display: flex;
          flex-direction: column;
          z-index: 10000;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        /* ── Minimized state ── */
        .mc-widget.minimized {
          width: auto;
          height: auto;
          background: transparent;
          box-shadow: none;
          border: none;
          display: flex;
          align-items: center;
          flex-direction: row;
          gap: 12px;
          cursor: pointer;
          overflow: visible;
          padding: 0;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .mc-trigger {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .mc-widget.minimized:hover .mc-trigger {
          transform: scale(1.08);
          box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        .mc-label {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: rgba(255, 255, 255, 0.85);
          padding: 8px 14px;
          border-radius: 14px;
          font-weight: 500;
          font-size: 13px;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateX(8px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .mc-widget.minimized .mc-label {
          opacity: 1;
          transform: translateX(0);
        }

        .mc-icon {
          display: none;
          width: 22px;
          height: 22px;
          color: rgba(255, 255, 255, 0.85);
        }

        .mc-widget.minimized .mc-icon { display: block; }

        .mc-widget.minimized .mc-header,
        .mc-widget.minimized .mc-messages,
        .mc-widget.minimized .mc-input-area { display: none; }

        /* ── Header ── */
        .mc-header {
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
        }

        .mc-header-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mc-avatar {
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          font-size: 11px;
        }

        .mc-title {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .mc-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        .mc-status-dot {
          width: 6px;
          height: 6px;
          background: #34d399;
          border-radius: 50%;
          animation: mc-pulse 2s infinite;
        }

        @keyframes mc-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .mc-min-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 16px;
          padding: 4px 10px;
          border-radius: 8px;
          transition: all 0.2s;
          line-height: 1;
        }

        .mc-min-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        /* ── Messages ── */
        .mc-messages {
          flex: 1;
          padding: 12px 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mc-messages::-webkit-scrollbar { width: 3px; }
        .mc-messages::-webkit-scrollbar-track { background: transparent; }
        .mc-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

        .mc-msg {
          display: flex;
          gap: 8px;
          animation: mc-slide 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes mc-slide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mc-msg.user { flex-direction: row-reverse; }

        .mc-msg-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .mc-msg.bot .mc-msg-avatar {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mc-msg.user .mc-msg-avatar {
          background: rgba(212, 248, 123, 0.15);
          color: #D4F87B;
          border: 1px solid rgba(212, 248, 123, 0.2);
        }

        .mc-msg-content {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .mc-msg.bot .mc-msg-content {
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom-left-radius: 4px;
        }

        .mc-msg.user .mc-msg-content {
          background: rgba(212, 248, 123, 0.12);
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(212, 248, 123, 0.15);
          border-bottom-right-radius: 4px;
        }

        .mc-msg-content a {
          color: #D4F87B !important;
          text-decoration: underline !important;
        }

        /* ── Typing dots ── */
        .mc-dots {
          display: flex;
          gap: 4px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
        }

        .mc-dot {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: mc-bounce 1.4s infinite;
        }
        .mc-dot:nth-child(1) { animation-delay: 0ms; }
        .mc-dot:nth-child(2) { animation-delay: 150ms; }
        .mc-dot:nth-child(3) { animation-delay: 300ms; }

        @keyframes mc-bounce {
          0%, 60%, 100% { transform: scale(1); opacity: 0.4; }
          30% { transform: scale(1.3); opacity: 1; }
        }

        /* ── Welcome ── */
        .mc-welcome {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          padding: 16px 12px;
          line-height: 1.5;
        }

        .mc-welcome h3 {
          margin: 0 0 6px 0;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .mc-welcome p {
          margin: 0;
        }

        /* ── Input ── */
        .mc-input-area {
          padding: 12px 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
        }

        .mc-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .mc-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13px;
          font-family: inherit;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          min-height: 38px;
          max-height: 72px;
        }

        .mc-input:focus {
          border-color: rgba(255, 255, 255, 0.18);
        }

        .mc-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .mc-send {
          background: rgba(212, 248, 123, 0.15);
          border: 1px solid rgba(212, 248, 123, 0.2);
          color: #D4F87B;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
          border-radius: 50%;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          height: 38px;
        }

        .mc-send:hover:not(:disabled) {
          background: rgba(212, 248, 123, 0.25);
        }

        .mc-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .mc-widget {
            width: calc(100% - 16px);
            height: 420px;
            bottom: 8px;
            right: 8px;
            border-radius: 20px;
          }

          .mc-widget.minimized {
            height: auto;
            width: auto;
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
      <div id="minecore-chatbot-widget" className="mc-widget">

        <div className="mc-label">
          {t('chatbotHelpLabel') || "If you need help, I'm here"}
        </div>

        <div className="mc-trigger">
          <div className="mc-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </div>

        <div className="mc-header">
          <div className="mc-header-info">
            <div className="mc-avatar">M</div>
            <div>
              <div className="mc-title">Minecore AI</div>
              <div className="mc-status">
                <div className="mc-status-dot"></div>
                {t('chatbotOnline')}
              </div>
            </div>
          </div>
          <button id="minecore-minimize-btn" className="mc-min-btn">−</button>
        </div>

        <div id="minecore-chatbot-messages" className="mc-messages">
          <div className="mc-welcome">
            <h3>{t('chatbotWelcomeTitle')}</h3>
            <p>{t('chatbotWelcomeMessage')}</p>
          </div>
        </div>

        <div className="mc-input-area">
          <div className="mc-input-row">
            <textarea
              id="minecore-chatbot-input"
              className="mc-input"
              placeholder={t('chatbotPlaceholder')}
              rows={1}
            />
            <button id="minecore-chatbot-send-btn" className="mc-send">↑</button>
          </div>
        </div>
      </div>
    </>
  )
}
