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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #080808; color: #f0f0f0; font-family: 'DM Sans', sans-serif; min-height: 100vh; }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(110,231,183,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 4px); }
          80% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -4px); }
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .ticker-track:hover { animation-play-state: paused; }

        input, select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f0f0f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          padding: 14px 18px;
          border-radius: 6px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }

        input:focus, select:focus {
          border-color: rgba(110,231,183,0.5);
          background: rgba(110,231,183,0.03);
        }

        input::placeholder { color: rgba(240,240,240,0.25); }

        select option { background: #111; color: #f0f0f0; }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: #6ee7b7;
          color: #080808;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.08em;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          animation: pulseGreen 2.5s ease-in-out infinite;
        }

        .submit-btn:hover:not(:disabled) {
          background: #a7f3d0;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(110,231,183,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          animation: none;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; }
        ::selection { background: rgba(110,231,183,0.2); }
      `}</style>

      {/* Scanline effect */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99, opacity: 0.025,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }} />

      {/* Ticker bar */}
      <div style={{
        background: "#6ee7b7", color: "#080808", padding: "8px 0",
        overflow: "hidden", position: "relative",
      }}>
        <div className="ticker-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", letterSpacing: "0.1em", whiteSpace: "nowrap", paddingRight: "48px" }}>
              AI FACT INTELLIGENCE &nbsp;·&nbsp; EVERY CLAIM VERIFIED &nbsp;·&nbsp; REAL SOURCES &nbsp;·&nbsp; NO SPIN &nbsp;·&nbsp; COMING SOON &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px 80px", position: "relative" }}>

        {/* Background glow */}
        <div style={{
          position: "fixed", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(110,231,183,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        <div style={{ width: "100%", maxWidth: "560px", animation: "fadeUp 0.7s ease both" }}>

          {/* Logo */}
          <div style={{ marginBottom: "48px", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginBottom: "32px",
            }}>
              <div style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#6ee7b7", boxShadow: "0 0 12px rgba(110,231,183,0.8)",
                animation: "pulseGreen 2s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(110,231,183,0.8)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Early Access
              </span>
            </div>

            {/* Main headline */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 14vw, 120px)",
              lineHeight: "0.9",
              letterSpacing: "-0.01em",
              color: "#f0f0f0",
              marginBottom: "8px",
              animation: "flicker 8s ease-in-out infinite",
            }}>
              TRUTH<span style={{ color: "#6ee7b7" }}>CORE</span>
            </h1>

            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(16px, 3vw, 22px)",
              letterSpacing: "0.2em",
              color: "rgba(240,240,240,0.35)",
              marginBottom: "28px",
              textTransform: "uppercase",
            }}>
              AI Fact Intelligence
            </p>

            <p style={{
              fontSize: "16px", color: "rgba(240,240,240,0.55)", lineHeight: "1.7",
              maxWidth: "420px", margin: "0 auto",
            }}>
              Paste any social media video or news article. Get every claim fact-checked with real sources in seconds. No spin. No agenda. Just truth.
            </p>
          </div>

          {/* Stats bar */}
          <div style={{
            display: "flex", gap: "1px", marginBottom: "40px",
            background: "rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden",
          }}>
            {[
              { label: "Platforms", value: "TikTok · IG · YT · X" },
              { label: "Per Analysis", value: "Up to 9 Claims" },
              { label: "Status", value: "Coming Soon" },
            ].map((stat, i) => (
              <div key={i} style={{
                flex: 1, padding: "14px 12px", textAlign: "center",
                background: "rgba(255,255,255,0.02)",
              }}>
                <div style={{ fontSize: "11px", color: "rgba(240,240,240,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>{stat.label}</div>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#6ee7b7" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Form or success */}
          {submitted ? (
            <div style={{
              background: "rgba(110,231,183,0.06)",
              border: "1px solid rgba(110,231,183,0.25)",
              borderRadius: "12px", padding: "40px 32px", textAlign: "center",
              animation: "fadeUp 0.4s ease",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚡</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", color: "#6ee7b7", letterSpacing: "0.05em", marginBottom: "10px" }}>
                YOU'RE IN
              </h2>
              <p style={{ fontSize: "15px", color: "rgba(240,240,240,0.5)", lineHeight: "1.6" }}>
                We'll hit you when access opens. Keep your eyes open — this drops soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <select
                value={useCase}
                onChange={e => setUseCase(e.target.value)}
                required
              >
                <option value="" disabled>How will you use Truthcore?</option>
                {USE_CASES.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>

              {error && (
                <p style={{ fontSize: "13px", color: "#f87171", padding: "4px 0" }}>{error}</p>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={loading || !name.trim() || !email.trim() || !useCase}
              >
                {loading ? "SECURING YOUR SPOT..." : "GET EARLY ACCESS →"}
              </button>

              <p style={{ fontSize: "12px", color: "rgba(240,240,240,0.2)", textAlign: "center", marginTop: "4px" }}>
                No spam. No BS. Just access when it drops.
              </p>
            </form>
          )}

          {/* Bottom tag */}
          <div style={{
            marginTop: "48px", paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "8px",
          }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", color: "rgba(240,240,240,0.15)", letterSpacing: "0.05em" }}>
              TRUTHCORE AI, INC.
            </span>
            <span style={{ fontSize: "12px", color: "rgba(240,240,240,0.2)" }}>
              © 2026
            </span>
          </div>
        </div>
      </main>
    </>
  )
}
