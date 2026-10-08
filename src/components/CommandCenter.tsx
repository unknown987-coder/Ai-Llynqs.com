import { useState } from "react";

import {
  ArrowUp,
  Bot,
  CheckCircle2,
  Instagram,
  Linkedin,
  Sparkles,
  Twitter,
} from "lucide-react";

const suggestions = [
  "Create a social campaign",
  "Analyze my workflow",
  "Build an AI agent",
];

export default function CommandCenter() {
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const runAgent = () => {
    if (!input.trim() || running) return;

    setRunning(true);
    setCompleted(false);

    setTimeout(() => {
      setRunning(false);
      setCompleted(true);
    }, 2200);
  };

  return (
    <section className="command-section">
      <div className="command-header">
        <div>
          <span className="eyebrow">LIVE AI EXPERIENCE</span>

          <h2>
            Tell AI what to do.
            <br />
            <span>Watch it execute.</span>
          </h2>
        </div>

        <p>
          This is how your future AI workforce can interact with your
          business.
        </p>
      </div>

      <div className="command-shell">
        {/* SIDEBAR */}
        <div className="command-sidebar">
          <div className="sidebar-brand">
            <div className="mini-logo">
              <Sparkles size={16} />
            </div>

            <div>
              <strong>aiLLynqs</strong>
              <span>Command Center</span>
            </div>
          </div>

          <div className="agent-list">
            <div className="agent-item active">
              <Bot size={17} />
              <span>Social Agent</span>
              <i />
            </div>

            <div className="agent-item">
              <Sparkles size={17} />
              <span>Creative Agent</span>
            </div>

            <div className="agent-item">
              <Sparkles size={17} />
              <span>Research Agent</span>
            </div>
          </div>

          <div className="sidebar-footer">
            <span>AGENTS ONLINE</span>
            <strong>03</strong>
          </div>
        </div>

        {/* MAIN */}
        <div className="command-main">
          <div className="command-topbar">
            <div>
              <span>ACTIVE AGENT</span>
              <strong>Social Agent</strong>
            </div>

            <div className="online-badge">
              <i />
              ONLINE
            </div>
          </div>

          <div className="agent-conversation">
            <div className="ai-message">
              <div className="message-icon">
                <Sparkles size={15} />
              </div>

              <div>
                <span>aiLLynqs AI</span>

                <p>
                  What would you like me to automate for you?
                </p>
              </div>
            </div>

            {running && (
              <div className="thinking">
                <span className="thinking-dot" />
                <span className="thinking-dot" />
                <span className="thinking-dot" />

                <p>Agent is thinking...</p>
              </div>
            )}

            {completed && (
              <div className="execution-result">
                <div className="result-title">
                  <CheckCircle2 size={17} />
                  Workflow completed
                </div>

                <div className="result-items">
                  <span>
                    <Instagram size={14} />
                    Instagram
                  </span>

                  <span>
                    <Linkedin size={14} />
                    LinkedIn
                  </span>

                  <span>
                    <Twitter size={14} />
                    X / Twitter
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  setCompleted(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="command-input">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  runAgent();
                }
              }}
              placeholder="Tell your AI agent what to do..."
            />

            <button
              onClick={runAgent}
              disabled={running}
              aria-label="Run agent"
            >
              <ArrowUp size={18} />
            </button>
          </div>

          <div className="command-note">
            <span>⌘</span>
            AI agent demo · No real actions are performed yet
          </div>
        </div>
      </div>
    </section>
  );
}