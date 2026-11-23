import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Plane, Sparkles } from "lucide-react"
import "./auth.css"

export default function Auth({ initialMode = "signup" }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const isSignup = mode === "signup"

  function changeMode(nextMode) {
    setMode(nextMode)
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-page">
      <a className="auth-back" href="/" aria-label="Back to TripSync home"><ArrowLeft size={16} /> <span>Back to home</span></a>
      <section className="auth-layout" aria-label={isSignup ? "Create your TripSync account" : "Log in to TripSync"}>
        <aside className="auth-story">
          <div className="auth-story-image" />
          <a className="brand auth-brand" href="/" aria-label="TripSync home"><span className="brand-mark"><span /></span><span>trip<span className="brand-accent">sync</span></span></a>
          <div className="auth-story-content">
            <span className="auth-kicker"><Sparkles size={13} /> THE WORLD, BETTER TOGETHER</span>
            <h1>Good trips<br />start <em>together.</em></h1>
            <p>Bring your people. We&apos;ll bring the plan.</p>
            <div className="auth-quote"><span className="auth-stars">★★★★★</span><blockquote>“For once, planning the trip was almost as fun as taking it.”</blockquote><div className="auth-quote-by"><span className="quote-avatar">J</span><span><strong>Jamie L.</strong><small>TripSync traveler</small></span></div></div>
          </div>
          <div className="auth-story-foot"><Plane size={14} /> MADE FOR THE GETAWAY GROUP <span>© 2026 TripSync</span></div>
        </aside>

        <div className="auth-form-wrap">
          <div className="auth-form-inner">
            <div className="auth-mobile-brand"><a className="brand" href="/" aria-label="TripSync home"><span className="brand-mark"><span /></span><span>trip<span className="brand-accent">sync</span></span></a></div>
            <div className="auth-tabs" role="tablist" aria-label="Account access">
              <button type="button" role="tab" aria-selected={!isSignup} className={!isSignup ? "active" : ""} onClick={() => changeMode("login")}>Log in</button>
              <button type="button" role="tab" aria-selected={isSignup} className={isSignup ? "active" : ""} onClick={() => changeMode("signup")}>Sign up</button>
            </div>
            <div className="auth-heading"><span className="auth-eyebrow">{isSignup ? "YOUR NEXT CHAPTER" : "WELCOME BACK"}</span><h2>{isSignup ? "Let’s get you going." : "Good to see you."}</h2><p>{isSignup ? "Create an account and start planning something good." : "Pick up right where your next adventure begins."}</p></div>
            <button type="button" className="auth-google" onClick={() => setSubmitted(true)}><span className="google-mark" aria-hidden="true">G</span>{isSignup ? "Continue with Google" : "Log in with Google"}</button>
            <div className="auth-divider"><span>or with email</span></div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {isSignup && <label>Full name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>}
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>Password<span className="password-field"><input name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "At least 8 characters" : "Your password"} minLength={8} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
              {!isSignup && <div className="auth-forgot"><a href="mailto:hello@tripsync.app?subject=Reset%20my%20password">Forgot password?</a></div>}
              {submitted && <p className="auth-notice" role="status"><Check size={16} /> This form is ready to connect to your account service.</p>}
              <button className="auth-submit" type="submit">{isSignup ? "Create your account" : "Log in"}<ArrowRight size={16} /></button>
            </form>
            <p className="auth-terms">By continuing, you agree to our <a href="mailto:hello@tripsync.app?subject=Terms%20of%20service">Terms</a> and <a href="mailto:hello@tripsync.app?subject=Privacy%20policy">Privacy Policy</a>.</p>
            <div className="auth-switch">{isSignup ? "Already have an account?" : "New to TripSync?"} <button type="button" onClick={() => changeMode(isSignup ? "login" : "signup")}>{isSignup ? "Log in" : "Create an account"}</button></div>
          </div>
        </div>
      </section>
    </main>
  )
}
