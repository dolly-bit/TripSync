import { useEffect } from "react"
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Compass, MapPin, Plus, Sparkles, WalletCards } from "lucide-react"
import Features from "./Features.jsx"
import HowItWorks from "./HowItWorks.jsx"
import Stories from "./Stories.jsx"
import Auth from "./Auth.jsx"

const stops = [
  { time: "09:30", title: "Coffee at The Barn", place: "Ubud, Bali", color: "mint" },
  { time: "12:00", title: "Rice terrace walk", place: "Tegallalang", color: "lavender" },
]

function AvatarStack() {
  return (
    <div className="avatar-stack" aria-label="Your four trip mates">
      <span className="avatar avatar-one">J</span>
      <span className="avatar avatar-two">M</span>
      <span className="avatar avatar-three">A</span>
      <span className="avatar avatar-four">+1</span>
    </div>
  )
}

function TripCard() {
  return (
    <div className="trip-card" aria-label="Preview of a shared trip itinerary">
      <div className="trip-card-top">
        <div className="trip-card-title">
          <span className="trip-icon"><Compass size={16} /></span>
          <div><span className="eyebrow">UP NEXT</span><strong>Bali, together</strong></div>
        </div>
        <button className="icon-button" aria-label="Open trip"><ArrowUpRight size={17} /></button>
      </div>
      <div className="trip-dates"><CalendarDays size={14} /> May 18 — 25 <span className="trip-status"><span /> 4 going</span></div>
      <div className="mini-map" aria-label="Stylized map of Bali">
        <div className="map-grid" />
        <span className="map-island island-one" />
        <span className="map-island island-two" />
        <span className="map-route route-one" />
        <span className="map-pin pin-one"><MapPin size={13} fill="currentColor" /></span>
        <span className="map-pin pin-two"><MapPin size={13} fill="currentColor" /></span>
        <span className="map-label label-one">UBUD</span>
        <span className="map-label label-two">CANGGU</span>
        <span className="map-chip"><Sparkles size={12} /> Your next adventure</span>
      </div>
      <div className="card-divider" />
      <div className="itinerary-heading"><span>MON, MAY 20</span><span>Day 2</span></div>
      <div className="itinerary-list">
        {stops.map((stop) => <div className="itinerary-row" key={stop.title}>
          <span className="stop-time">{stop.time}</span><span className={`stop-marker ${stop.color}`} />
          <div className="stop-copy"><strong>{stop.title}</strong><span>{stop.place}</span></div>
          <Check className="stop-check" size={15} />
        </div>)}
        <button className="add-stop"><Plus size={14} /> Add to the plan</button>
      </div>
      <div className="card-divider" />
      <div className="card-bottom">
        <div className="card-bottom-copy"><WalletCards size={16} /><span><strong>$248</strong> each so far</span></div>
        <AvatarStack />
      </div>
    </div>
  )
}

const pageRoutes = {
  "/how-it-works": { component: HowItWorks, title: "How TripSync Works — Plan Together, Travel Better", description: "See how TripSync brings your people, itinerary, and shared expenses together in three easy steps." },
  "/features": { component: Features, title: "TripSync Features — Everything Your Group Trip Needs", description: "Explore shared itineraries, saved places, group expenses, and trip coordination tools from TripSync." },
  "/stories": { component: Stories, title: "TripSync Stories — The Best Part Is Being There", description: "Find inspiration for your next group getaway and see how a little planning makes room for the good stuff." },
  "/login": { component: () => <Auth initialMode="login" />, title: "Log in — TripSync", description: "Log in to your TripSync account and pick up where your next adventure begins." },
  "/signup": { component: () => <Auth initialMode="signup" />, title: "Sign up — TripSync", description: "Create a TripSync account and start planning your next group adventure." },
}

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"
  const page = pageRoutes[currentPath]

  useEffect(() => {
    if (!page) return
    document.title = page.title
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description)
  }, [page])

  if (page) {
    const Page = page.component
    return <Page />
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-art" />
        <div className="hero-glow" />
        <header className="site-header">
          <a className="brand" href="#top" aria-label="TripSync home"><span className="brand-mark"><span /></span><span>trip<span className="brand-accent">sync</span></span></a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="/how-it-works">How it works</a><a href="/features">Features</a><a href="/stories">Stories</a>
          </nav>
          <div className="header-actions"><a className="sign-in" href="/login">Log in</a><a className="button button-small button-outline" href="/signup">Get started <ArrowUpRight size={14} /></a></div>
        </header>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-stars"><Sparkles size={13} /></span> THE WORLD, BETTER TOGETHER</div>
            <h1>Good trips.<br /><span className="headline-soft">No group chat</span><br /><span className="headline-accent">required.</span></h1>
            <p className="hero-description">Every plan, place, and split — all in sync. Spend less time figuring it out and more time out there.</p>
            <div className="hero-actions"><a href="/signup" className="button button-primary">Plan your first trip <ArrowRight size={16} /></a><a href="/how-it-works" className="button button-quiet">See how it works <span className="play-icon">▶</span></a></div>
            <div className="social-proof"><AvatarStack /><div><div className="rating">★★★★★ <span>4.9/5</span></div><p>Made for the trips you&apos;ll talk about forever</p></div></div>
          </div>
          <div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /><TripCard /><div className="floating-note note-top"><span className="note-icon"><Check size={13} /></span><span><strong>Everyone&apos;s in</strong><small>Trip plans are in sync</small></span></div><div className="floating-note note-bottom"><span className="note-icon note-icon-pink"><WalletCards size={14} /></span><span><strong>Split, then forget it</strong><small>All expenses, accounted for</small></span></div></div>
        </div>
        <a href="/how-it-works" className="scroll-cue" aria-label="Read how TripSync works"><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
        <div className="hero-index"><span>01</span><i /> 03</div>
      </section>

      <section className="trust-strip" aria-label="TripSync benefits"><span>MADE FOR THE GETAWAY GROUP</span><div><span><Check size={13} /> One shared plan</span><span><Check size={13} /> No spreadsheet energy</span><span><Check size={13} /> Less "wait, who paid?"</span></div></section>

      <section className="features-section" id="features">
        <div className="section-intro" id="how-it-works"><span className="section-label"><span /> THE GOOD KIND OF ORGANIZED</span><h2>From “we should go”<br />to <span>we&apos;re here.</span></h2><p>All the moving parts of a group trip, finally moving together.</p></div>
        <div className="feature-grid">
          <article className="feature-card feature-card-wide"><div className="feature-visual plan-visual"><div className="plan-top"><span>THE PLAN</span><span className="plan-date">MAY 18 — 25, 2026 <ChevronDown size={12} /></span></div><div className="plan-days"><div className="day active"><span>MON</span><strong>18</strong></div><div className="day"><span>TUE</span><strong>19</strong></div><div className="day"><span>WED</span><strong>20</strong></div><div className="day"><span>THU</span><strong>21</strong></div></div><div className="plan-event"><span className="event-line" /><span className="event-time">10:00</span><span className="event-dot" /><div><strong>Temple in the clouds</strong><small>Everyone added this</small></div><span className="event-avatar">M</span></div><div className="plan-event plan-event-second"><span className="event-line" /><span className="event-time">14:30</span><span className="event-dot event-dot-lilac" /><div><strong>Lunch by the water</strong><small>Saved by Alex</small></div><span className="event-avatar event-avatar-pink">A</span></div></div><div className="feature-text"><span className="feature-number">01 / THE PLAN</span><h3>One plan.<br />Everybody in.</h3><p>Build the itinerary together. See what&apos;s next, add your spots, and leave the “what are we doing today?” texts behind.</p><a href="#get-started" className="text-link">Explore shared itineraries <ArrowRight size={15} /></a></div></article>
          <article className="feature-card feature-card-expenses"><div className="feature-visual expense-visual"><div className="expense-heading"><span>TRIP TOTAL</span><span className="expense-month">BALI ’26 <ChevronDown size={12} /></span></div><strong className="expense-total">$1,284<span>.50</span></strong><div className="expense-sub">split between 4 friends</div><div className="expense-bars"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="expense-people"><span>You&apos;re owed <strong>$86.25</strong></span><span className="settled-label"><Check size={12} />Looking good</span></div></div><div className="feature-text"><span className="feature-number">02 / THE SPLIT</span><h3>Goodbye, awkward math.</h3><p>Keep tabs on shared costs without keeping score. Everyone knows where they stand.</p><a href="#get-started" className="text-link">See how expenses work <ArrowRight size={15} /></a></div></article>
        </div>
      </section>

      <section className="closing" id="testimonials"><div className="closing-glow" /><div className="closing-kicker"><Sparkles size={14} /> YOUR NEXT STORY STARTS HERE</div><h2>Make room for<br /><span>the good stuff.</span></h2><p>Bring the people. We&apos;ll bring the plan.</p><a className="button button-primary" id="get-started" href="mailto:hello@tripsync.app?subject=Let%20me%20plan%20a%20trip">Let&apos;s plan a trip <ArrowRight size={16} /></a><div className="closing-star star-left">✳</div><div className="closing-star star-right">✳</div></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /></span><span>trip<span className="brand-accent">sync</span></span></a><span>Good trips, in sync.</span><span>© 2026 TripSync</span></footer>
    </main>
  )
}

export default App
