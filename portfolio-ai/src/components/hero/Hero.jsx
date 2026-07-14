import "../../styles/hero.css";
import profileImg from "../../assets/profile.jpg";
import { useState, useEffect, useRef } from "react";
import { askAI } from "../../services/api"; // ✅ use API service

const renderTextWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  
  let parts = text.split(urlRegex);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <a key={'url-'+i} href={parts[i]} target="_blank" rel="noreferrer" style={{color: '#2563eb', textDecoration: 'underline'}}>{parts[i]}</a>;
  }
  
  parts = parts.flatMap((part, idx) => {
    if (typeof part === 'string') {
      const emailParts = part.split(emailRegex);
      for (let j = 1; j < emailParts.length; j += 2) {
        emailParts[j] = <a key={'email-'+idx+'-'+j} href={`mailto:${emailParts[j]}`} style={{color: '#2563eb', textDecoration: 'underline'}}>{emailParts[j]}</a>;
      }
      return emailParts;
    }
    return part;
  });

  return parts;
};

function Hero() {
  const [question, setQuestion] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");

  const canvasRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // ✅ RENAMED (no collision)
  const handleAsk = async (customQuestion) => {
    const finalQuestion = customQuestion || question;
    if (!finalQuestion.trim()) return;

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    setDisplayedAnswer("");

    const data = await askAI(finalQuestion); // ✅ API call
    const fullText = String(data.reply || "");

    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      const char = fullText.charAt(i); // Capture character synchronously
      setDisplayedAnswer(prev => prev + char);
      i++;
      if (i >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 18);
  };

  /* 🎨 BACKGROUND MOUSE COLOR TRAIL (UNCHANGED) */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(255, 0, 150, 0.25)",
      "rgba(0, 200, 255, 0.25)",
      "rgba(0, 255, 150, 0.25)",
      "rgba(255, 200, 0, 0.25)",
      "rgba(180, 0, 255, 0.25)"
    ];

    function drawBlob(x, y) {
      const radius = 160;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const color = colors[Math.floor(Math.random() * colors.length)];
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function fade() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      ctx.fillRect(0, 0, width, height);
      requestAnimationFrame(fade);
    }

    fade();

    const handleMouseMove = (e) => {
      drawBlob(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero-container">
      <canvas ref={canvasRef} id="bg-canvas"></canvas>
      <div className="fade-bg"></div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-name">Hey, I am Prajwal K M</h1>
          <h1 className="hero-role">Backend Engineer | DevOps Enthusiast</h1>
        </div>

        <div className="hero-image">
          <img src={profileImg} alt="Profile" />
        </div>

        <div className="hero-boxes">
          <div className="hero-box" onClick={() => handleAsk("Tell me about yourself, your background and skills")}>
            <span className="emoji-slot">👤</span>
            <span>Me</span>
          </div>

          <div className="hero-box" onClick={() => handleAsk("What projects have you worked on?")}>
            <span className="emoji-slot">💼</span>
            <span>Projects</span>
          </div>

          <div className="hero-box" onClick={() => handleAsk("What skills do you have as a developer")}>
            <span className="emoji-slot">🧠</span>
            <span>Skills</span>
          </div>

          <div className="hero-box" onClick={() => handleAsk("How can someone contact you? Give your contact details or social profiles")}>
            <span className="emoji-slot">📞</span>
            <span>Contact</span>
          </div>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hero-box">
             <span className="emoji-slot">👁️</span>
             <span>View Resume</span>
          </a>

          <a href="/resume.pdf" download="Prajwal_KM_Resume.pdf" className="hero-box">
             <span className="emoji-slot">📥</span>
             <span>Download Resume</span>
          </a>
        </div>

        {/* CHAT BOX */}
        <div className={`hero-chat ${displayedAnswer ? "expanded" : ""}`}>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAsk();
                }
              }}
            />
            <button onClick={() => handleAsk()} className="send-btn">
              <span style={{ color: "#fff" }}>➜</span>
            </button>
          </div>

          {displayedAnswer && (
            <div className="chat-answer">
              {renderTextWithLinks(displayedAnswer)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
