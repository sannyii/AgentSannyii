"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { FloatingOrbs, ParticleField } from "@/components/backgrounds";

// 消息类型
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// 生成状态
type GenerationState = "idle" | "thinking" | "generating" | "completed";

export default function CreatePage() {
  const [mode, setMode] = useState<"dialog" | "workbench">("dialog");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [generationState, setGenerationState] = useState<GenerationState>("idle");
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [adjustInput, setAdjustInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 开始创建 - 从对话框进入工作台
  const handleStartCreate = () => {
    if (!input.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages([userMessage]);
    
    // 切换到工作台模式
    setMode("workbench");
    
    // 开始生成
    startGeneration(input);
  };

  // 模拟 AI 生成过程
  const startGeneration = async (prompt: string) => {
    setGenerationState("thinking");
    
    // 模拟思考时间
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGenerationState("generating");
    
    // 模拟生成时间
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 生成示例 HTML（这里应该是实际调用 AI API）
    const demoHtml = generateDemoHtml(prompt);
    setGeneratedHtml(demoHtml);
    
    // 添加 AI 回复
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `已根据你的需求生成了工具："${prompt.slice(0, 30)}..."\n\n你可以在右侧预览效果，如需调整请在下方输入修改意见。`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
    
    setGenerationState("completed");
  };

  // 发送调整请求
  const handleAdjust = () => {
    if (!adjustInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: adjustInput,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setAdjustInput("");

    // 模拟调整
    setGenerationState("generating");
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "已根据你的反馈进行调整，请查看右侧预览。",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setGenerationState("completed");
    }, 1500);
  };

  // 提交/保存工具
  const handleSubmit = () => {
    // 下载生成的 HTML
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `custom-tool-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 生成示例 HTML
  const generateDemoHtml = (prompt: string) => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI 生成工具 | AgentSannyii</title>
  <style>
    :root {
      --void: #050508;
      --aurora-cyan: #00f5ff;
      --text-primary: #ffffff;
      --text-tertiary: rgba(255, 255, 255, 0.55);
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--void);
      color: var(--text-primary);
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      background: linear-gradient(135deg, var(--aurora-cyan), #bd34fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .prompt-box {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem;
      margin: 1rem 0;
      color: var(--text-tertiary);
    }
    .feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎉 AI 生成工具</h1>
    <p>根据你的需求生成的自定义工具</p>
    
    <div class="prompt-box">
      <strong>原始需求：</strong><br>
      ${prompt}
    </div>
    
    <h2>✨ 功能特性</h2>
    <div class="feature">✅ 单文件 HTML，无需安装</div>
    <div class="feature">✅ 完全离线可用</div>
    <div class="feature">✅ 极光梦境 UI 主题</div>
    <div class="feature">✅ 响应式设计</div>
    
    <h2>📝 使用说明</h2>
    <p>此文件由 AgentSannyii AI 生成。你可以：</p>
    <ul>
      <li>直接在浏览器中打开使用</li>
      <li>保存到本地离线使用</li>
      <li>分享给他人</li>
      <li>根据需要进一步修改</li>
    </ul>
    
    <p style="margin-top: 2rem; color: var(--text-tertiary);">
      Generated by AgentSannyii • ${new Date().toLocaleDateString()}
    </p>
  </div>
</body>
</html>`;
  };

  return (
    <>
      {/* Background Effects */}
      <div className="dream-bg" />
      <ParticleField />
      <FloatingOrbs />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="create-page">
        <AnimatePresence mode="wait">
          {/* 对话模式 */}
          {mode === "dialog" && (
            <DialogMode
              key="dialog"
              input={input}
              setInput={setInput}
              onSubmit={handleStartCreate}
            />
          )}

          {/* 工作台模式 */}
          {mode === "workbench" && (
            <WorkbenchMode
              key="workbench"
              messages={messages}
              generationState={generationState}
              generatedHtml={generatedHtml}
              adjustInput={adjustInput}
              setAdjustInput={setAdjustInput}
              onAdjust={handleAdjust}
              onSubmit={handleSubmit}
              messagesEndRef={messagesEndRef}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        .create-page {
          padding-top: 80px;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}

// ==================== 对话模式组件 ====================
interface DialogModeProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
}

function DialogMode({ input, setInput, onSubmit }: DialogModeProps) {
  return (
    <motion.div
      className="dialog-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dialog-container">
        {/* Header */}
        <motion.div
          className="dialog-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dialog-icon">🤖</div>
          <h1 className="dialog-title">创建你的专属工具</h1>
          <p className="dialog-subtitle">描述你的需求，AI 将为你生成一个单文件 HTML 工具</p>
        </motion.div>

        {/* Input Area */}
        <motion.div
          className="dialog-input-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <textarea
            className="dialog-textarea"
            placeholder={`描述你需要的工具...\n\n例如：\n• 一个将 CSV 转换为 JSON 的工具\n• 一个图片批量压缩器\n• 一个密码生成器，可以设置长度和字符类型`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                onSubmit();
              }
            }}
          />
          
          <div className="dialog-actions">
            <span className="dialog-hint">按 Cmd + Enter 发送</span>
            <motion.button
              className="dialog-submit-btn"
              onClick={onSubmit}
              disabled={!input.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>开始创建</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          className="dialog-examples"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="examples-title">示例需求：</p>
          <div className="examples-list">
            {[
              "文本格式化工具，去除多余空格和空行",
              "Base64 编码解码器，支持文件拖拽",
              "简单的待办事项清单，数据存储在本地",
            ].map((example, index) => (
              <button
                key={index}
                className="example-chip"
                onClick={() => setInput(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .dialog-mode {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 80px);
          padding: 2rem;
        }

        .dialog-container {
          width: 100%;
          max-width: 800px;
        }

        .dialog-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .dialog-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .dialog-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, var(--aurora-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .dialog-subtitle {
          color: var(--text-tertiary);
          font-size: 1.125rem;
        }

        .dialog-input-wrapper {
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 24px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: border-color 0.3s ease;
        }

        .dialog-input-wrapper:focus-within {
          border-color: var(--aurora-cyan);
          box-shadow: 0 0 0 3px rgba(0, 245, 255, 0.1);
        }

        .dialog-textarea {
          width: 100%;
          min-height: 200px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 1rem;
          line-height: 1.7;
          resize: vertical;
          outline: none;
        }

        .dialog-textarea::placeholder {
          color: var(--text-dim);
        }

        .dialog-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--text-muted);
        }

        .dialog-hint {
          font-size: 0.875rem;
          color: var(--text-dim);
        }

        .dialog-submit-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: var(--gradient-aurora);
          border: none;
          border-radius: 100px;
          color: var(--void);
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dialog-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }

        .dialog-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dialog-examples {
          text-align: center;
        }

        .examples-title {
          font-size: 0.875rem;
          color: var(--text-dim);
          margin-bottom: 1rem;
        }

        .examples-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }

        .example-chip {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--text-muted);
          border-radius: 100px;
          color: var(--text-tertiary);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .example-chip:hover {
          border-color: var(--aurora-cyan);
          color: var(--aurora-cyan);
          background: rgba(0, 245, 255, 0.05);
        }
      `}</style>
    </motion.div>
  );
}

// ==================== 工作台模式组件 ====================
interface WorkbenchModeProps {
  messages: Message[];
  generationState: GenerationState;
  generatedHtml: string;
  adjustInput: string;
  setAdjustInput: (value: string) => void;
  onAdjust: () => void;
  onSubmit: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

function WorkbenchMode({
  messages,
  generationState,
  generatedHtml,
  adjustInput,
  setAdjustInput,
  onAdjust,
  onSubmit,
  messagesEndRef,
}: WorkbenchModeProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <motion.div
      className="workbench-mode"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="workbench-header">
        <div className="workbench-title">
          <span className="workbench-icon">🛠️</span>
          <h2>工作台</h2>
          {generationState !== "completed" && (
            <span className="generation-status">
              {generationState === "thinking" && "🤔 AI 正在思考..."}
              {generationState === "generating" && "✨ 正在生成工具..."}
            </span>
          )}
        </div>
        <motion.button
          className="workbench-submit-btn"
          onClick={onSubmit}
          disabled={!generatedHtml}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>💾 保存并下载</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="workbench-content">
        {/* Left: Chat/Adjust Panel */}
        <div className="workbench-left">
          <div className="chat-panel">
            <h3 className="panel-title">💬 对话记录</h3>
            
            <div className="messages-list">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    {message.role === "user" ? "👤" : "🤖"}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading Indicator */}
              {generationState !== "idle" && generationState !== "completed" && (
                <motion.div
                  className="message assistant loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Adjust Input */}
            <div className="adjust-panel">
              <h4 className="adjust-title">🎨 调整需求</h4>
              <div className="adjust-input-wrapper">
                <textarea
                  className="adjust-textarea"
                  placeholder="描述你想要的调整..."
                  value={adjustInput}
                  onChange={(e) => setAdjustInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) {
                      onAdjust();
                    }
                  }}
                />
                <motion.button
                  className="adjust-send-btn"
                  onClick={onAdjust}
                  disabled={!adjustInput.trim() || generationState !== "completed"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  发送
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview Panel */}
        <div className="workbench-right">
          <div className="preview-panel">
            {/* Tabs */}
            <div className="preview-tabs">
              <button
                className={`preview-tab ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                👁️ 预览
              </button>
              <button
                className={`preview-tab ${activeTab === "code" ? "active" : ""}`}
                onClick={() => setActiveTab("code")}
              >
                📄 代码
              </button>
            </div>

            {/* Content */}
            <div className="preview-content">
              {activeTab === "preview" ? (
                generatedHtml ? (
                  <iframe
                    className="preview-iframe"
                    srcDoc={generatedHtml}
                    sandbox="allow-scripts allow-same-origin"
                    title="Generated Tool Preview"
                  />
                ) : (
                  <div className="preview-placeholder">
                    {generationState === "idle" ? (
                      <p>准备生成...</p>
                    ) : (
                      <>
                        <div className="loading-spinner" />
                        <p>
                          {generationState === "thinking" && "AI 正在思考你的需求..."}
                          {generationState === "generating" && "正在生成工具代码..."}
                        </p>
                      </>
                    )}
                  </div>
                )
              ) : (
                <pre className="code-block">
                  <code>{generatedHtml || "// 代码生成中..."}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .workbench-mode {
          padding: 2rem;
          max-width: 1600px;
          margin: 0 auto;
        }

        .workbench-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--text-muted);
        }

        .workbench-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .workbench-icon {
          font-size: 2rem;
        }

        .workbench-title h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .generation-status {
          font-size: 0.875rem;
          color: var(--aurora-cyan);
          padding: 0.375rem 0.875rem;
          background: rgba(0, 245, 255, 0.1);
          border-radius: 100px;
          margin-left: 1rem;
        }

        .workbench-submit-btn {
          padding: 0.75rem 1.5rem;
          background: var(--gradient-aurora);
          border: none;
          border-radius: 100px;
          color: var(--void);
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .workbench-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }

        .workbench-submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .workbench-content {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 2rem;
          height: calc(100vh - 250px);
        }

        @media (max-width: 1024px) {
          .workbench-content {
            grid-template-columns: 1fr;
            height: auto;
          }
        }

        /* Left Panel - Chat */
        .workbench-left {
          display: flex;
          flex-direction: column;
        }

        .chat-panel {
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 20px;
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .panel-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--text-muted);
        }

        .messages-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-right: 0.5rem;
          margin-bottom: 1rem;
        }

        .message {
          display: flex;
          gap: 0.75rem;
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .message-content {
          flex: 1;
          max-width: 80%;
        }

        .message-text {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--text-muted);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .message.user .message-text {
          background: rgba(0, 245, 255, 0.1);
          border-color: rgba(0, 245, 255, 0.2);
        }

        .message-time {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-top: 0.25rem;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 1rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--aurora-cyan);
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite both;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        /* Adjust Panel */
        .adjust-panel {
          border-top: 1px solid var(--text-muted);
          padding-top: 1rem;
        }

        .adjust-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          margin-bottom: 0.75rem;
        }

        .adjust-input-wrapper {
          display: flex;
          gap: 0.75rem;
        }

        .adjust-textarea {
          flex: 1;
          min-height: 60px;
          max-height: 120px;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--text-muted);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          resize: vertical;
          outline: none;
        }

        .adjust-textarea:focus {
          border-color: var(--aurora-cyan);
        }

        .adjust-send-btn {
          padding: 0.5rem 1rem;
          background: var(--gradient-aurora);
          border: none;
          border-radius: 8px;
          color: var(--void);
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .adjust-send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);
        }

        .adjust-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Right Panel - Preview */
        .workbench-right {
          display: flex;
          flex-direction: column;
        }

        .preview-panel {
          background: var(--void-card);
          border: 1px solid var(--text-muted);
          border-radius: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .preview-tabs {
          display: flex;
          border-bottom: 1px solid var(--text-muted);
        }

        .preview-tab {
          flex: 1;
          padding: 1rem;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preview-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .preview-tab.active {
          color: var(--aurora-cyan);
          border-bottom: 2px solid var(--aurora-cyan);
        }

        .preview-content {
          flex: 1;
          overflow: hidden;
          background: var(--void);
        }

        .preview-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .preview-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--text-tertiary);
        }

        .code-block {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 1.5rem;
          background: var(--void);
          color: var(--text-secondary);
          font-family: "SF Mono", Monaco, monospace;
          font-size: 0.875rem;
          line-height: 1.7;
          overflow: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--text-muted);
          border-top-color: var(--aurora-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
