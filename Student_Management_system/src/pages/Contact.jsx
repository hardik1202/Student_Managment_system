import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="page">
      <h1>Contact office</h1>
      <p className="lead">Send a note to the academic office. This is a controlled form.</p>

      <button type="button" className="ghost" onClick={() => setShowHelp((v) => !v)}>
        {showHelp ? "Hide help" : "Show help"}
      </button>
      {showHelp && (
        <p className="help">
          Type your enquiry below. The character count updates as you type. Nothing is sent to a
          mail server in this lab build.
        </p>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message"
        rows={6}
      />
      <p className="muted">{message.length} characters</p>
      <p className="preview">{message || "Your message will appear here in real time."}</p>
    </div>
  );
}
