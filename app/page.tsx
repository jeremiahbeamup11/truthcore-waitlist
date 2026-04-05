"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const USE_CASES = [
  "Fact-checking news articles",
  "Verifying social media videos",
  "Research & journalism",
  "Personal media literacy",
  "Education",
  "Other",
]

export default function WaitlistPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [useCase, setUseCase] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !useCase) return
    setLoading(true)
    setError("")

    const { error: sbError } = await supabase
      .from("waitlist")
      .insert({ name: name.trim(), email: email.trim(), use_case: useCase })

    setLoading(false)

    if (sbError) {
      if (sbError.code === "23505") {
        setError("You're already on the list.")
      } else {
        setError("Something went wrong. Try again.")
      }
      return
    }

    setSubmitted(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0a0a0c; color: #e8eaf0; font-family: 'Syne', sans-serif; min-height: 100vh; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawRing { to { stroke-dashoffset: 0; } }
        @keyframes drawC    { to { stroke-dashoffset: 0; } }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes glowFade { to { opacity: 1; } }
        @keyframes liveDot  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes pulseBtn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(125,127,124,0.3); }
          50%       { box-shadow: 0 0 0 8px rgba(125,127,124,0); }
        }

        ::selection { background: rgba(125,127,124,0.18); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0c; }
        ::-webkit-scrollbar-thumb { background: #252528; border-radius: 2px; }

        input, select {
          background: rgba(255,255,255,0.028);
          border: 1px solid rgba(255,255,255,0.085);
          color: #e0e2e8;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          padding: 13px 16px;
          border-radius: 10px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        input:focus, select:focus {
          border-color: rgba(125,127,124,0.35);
          background: rgba(125,127,124,0.04);
        }
        input::placeholder { color: rgba(232,234,240,0.18); }
        select option { background: #111; color: #e0e2e8; }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: #7d7f7c;
          color: #0a0a0c;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          animation: pulseBtn 2.5s ease-in-out infinite;
        }
        .submit-btn:hover:not(:disabled) {
          background: #9a9c99;
          transform: translateY(-1px);
        }
        .submit-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          animation: none;
        }
      `}</style>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "56px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", background: "rgba(10,10,12,0.88)", backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <svg viewBox="0 0 100 100" width="22" height="22" fill="none">
            <circle cx="50" cy="50" r="43" stroke="#5a5c5a" strokeWidth="6" fill="none"
              style={{ strokeDasharray: "270", strokeDashoffset: "270", animation: "drawRing 1.1s cubic-bezier(0.4,0,0.2,1) 0.15s forwards" }} />
            <path d="M 76 26 A 32 32 0 1 0 76 74" stroke="#7d7f7c" strokeWidth="6" strokeLinecap="round" fill="none"
              style={{ strokeDasharray: "130", strokeDashoffset: "130", animation: "drawC 0.75s cubic-bezier(0.4,0,0.2,1) 0.95s forwards" }} />
            <line x1="61" y1="40" x2="87" y2="40" stroke="#9a9c99" strokeWidth="6" strokeLinecap="round"
              style={{ strokeDasharray: "26", strokeDashoffset: "26", animation: "drawLine 0.35s cubic-bezier(0.4,0,0.2,1) 1.55s forwards" }} />
            <line x1="74" y1="40" x2="74" y2="66" stroke="#9a9c99" strokeWidth="6" strokeLinecap="round"
              style={{ strokeDasharray: "26", strokeDashoffset: "26", animation: "drawLine 0.35s cubic-bezier(0.4,0,0.2,1) 1.82s forwards" }} />
          </svg>
          <span style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "0.04em", fontFamily: "'Syne', sans-serif", color: "#d8dade" }}>TRUTHCORE</span>
        </div>
      </nav>

      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: "440px", animation: "fadeUp 0.5s ease" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            {/* Animated logo */}
            <div style={{ width: "64px", height: "64px", margin: "0 auto 20px" }}>
              <svg viewBox="0 0 100 100" width="64" height="64" fill="none">
                <circle cx="50" cy="50" r="43" stroke="#5a5c5a" strokeWidth="6" fill="none"
                  style={{ strokeDasharray: "270", strokeDashoffset: "270", animation: "drawRing 1.1s cubic-bezier(0.4,0,0.2,1) 0.15s forwards" }} />
                <circle cx="50" cy="50" r="43" stroke="rgba(125,127,124,0.08)" strokeWidth="14" fill="none"
                  style={{ opacity: 0, animation: "glowFade 0.9s ease 1.8s forwards" }} />
                <path d="M 76 26 A 32 32 0 1 0 76 74" stroke="#7d7f7c" strokeWidth="6" strokeLinecap="round" fill="none"
                  style={{ strokeDasharray: "130", strokeDashoffset: "130", animation: "drawC 0.75s cubic-bezier(0.4,0,0.2,1) 0.95s forwards" }} />
                <line x1="61" y1="40" x2="87" y2="40" stroke="#9a9c99" strokeWidth="6" strokeLinecap="round"
                  style={{ strokeDasharray: "26", strokeDashoffset: "26", animation: "drawLine 0.35s cubic-bezier(0.4,0,0.2,1) 1.55s forwards" }} />
                <line x1="74" y1="40" x2="74" y2="66" stroke="#9a9c99" strokeWidth="6" strokeLinecap="round"
                  style={{ strokeDasharray: "26", strokeDashoffset: "26", animation: "drawLine 0.35s cubic-bezier(0.4,0,0.2,1) 1.82s forwards" }} />
              </svg>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7d7f7c", animation: "liveDot 2.5s ease-in-out infinite", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", color: "rgba(232,234,240,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" as const, fontFamily: "'Syne', sans-serif" }}>
                Coming Soon
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: "800", letterSpacing: "-0.03em", color: "#d8dade", fontFamily: "'Syne', sans-serif", marginBottom: "10px", lineHeight: "1.1" }}>
              Fact-check anything.
            </h1>

            <p style={{ fontSize: "13px", color: "rgba(232,234,240,0.3)", fontFamily: "'Syne', sans-serif", lineHeight: "1.65", maxWidth: "340px", margin: "0 auto" }}>
              Paste any TikTok, YouTube, Instagram, X, or article link. Get every claim verified with real sources in seconds.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "1px", marginBottom: "28px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", overflow: "hidden" }}>
            {[
              { label: "Platforms", value: "TikTok · IG · YT · X" },
              { label: "Per Analysis", value: "Every Claim" },
              { label: "Sources", value: "Live & Verified" },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, padding: "12px 10px", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: "10px", color: "rgba(232,234,240,0.22)", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontFamily: "'Syne', sans-serif", marginBottom: "3px" }}>{stat.label}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#9a9c99", fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Form or success */}
          {submitted ? (
            <div style={{ background: "rgba(125,127,124,0.05)", border: "1px solid rgba(125,127,124,0.18)", borderRadius: "14px", padding: "36px 28px", textAlign: "center", animation: "fadeUp 0.4s ease" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(125,127,124,0.1)", border: "1px solid rgba(125,127,124,0.22)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "18px" }}>✓</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: "800", color: "#d8dade", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                You're on the list.
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(232,234,240,0.35)", lineHeight: "1.6", fontFamily: "'Syne', sans-serif" }}>
                We'll notify you the moment Truthcore launches.
              </p>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.065)", borderRadius: "14px", padding: "24px" }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#d8dade", fontFamily: "'Syne', sans-serif", marginBottom: "16px" }}>
                Join the waitlist
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                  <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <select value={useCase} onChange={e => setUseCase(e.target.value)} required>
                  <option value="" disabled>How will you use Truthcore?</option>
                  {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                {error && (
                  <p style={{ fontSize: "12px", color: "#f87171", fontFamily: "'Syne', sans-serif" }}>{error}</p>
                )}
                <button type="submit" className="submit-btn" disabled={loading || !name.trim() || !email.trim() || !useCase}>
                  {loading ? "Joining..." : "Join the waitlist →"}
                </button>
                <p style={{ fontSize: "11px", color: "rgba(232,234,240,0.18)", textAlign: "center", fontFamily: "'Syne', sans-serif" }}>
                  No spam. We'll only email you when we launch.
                </p>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", fontSize: "11px", color: "rgba(232,234,240,0.11)", fontFamily: "'Syne', sans-serif", background: "rgba(10,10,12,0.93)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span>© 2026 Truthcore AI, Inc.</span>
      </div>
    </>
  )
}