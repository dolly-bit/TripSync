import { ArrowRight, CalendarDays, Check, Compass, MapPin, UsersRound, WalletCards } from "lucide-react"
import { PageCallout, PageFrame } from "./SiteChrome.jsx"

const steps = [
  {
    number: "01",
    icon: UsersRound,
    title: "Start the trip. Bring your people.",
    copy: "Name the adventure, add the dates, and invite your crew. Everyone gets one place to see what is happening and add their two cents.",
    detail: "No more digging through old messages for the address.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Make a plan that moves with you.",
    copy: "Collect the places you love, shape them into a shared itinerary, and keep the details close. Plans change; your trip stays in sync.",
    detail: "The whole itinerary, right where everyone can find it.",
  },
  {
    number: "03",
    icon: WalletCards,
    title: "Split the little stuff. Enjoy the big stuff.",
    copy: "Track shared expenses as you go, see who covered what, and settle up without the awkward end-of-trip math.",
    detail: "Everyone knows where they stand. No scorekeeping.",
  },
]

function ItineraryPreview() {
  return (
    <div className="how-preview-card">
      <div className="preview-card-header">
        <div className="preview-card-icon"><Compass size={16} /></div>
        <div><span className="preview-label">YOUR NEXT ADVENTURE</span><strong>Lisbon, together</strong></div>
        <span className="preview-check"><Check size={14} /></span>
      </div>
      <div className="preview-trip-meta"><CalendarDays size={14} /> Sep 12–16 <span className="preview-going">4 going</span></div>
      <div className="preview-route"><span className="route-line" /><span className="route-stop"><MapPin size={15} /><span><strong>Land in Lisbon</strong><small>Friday · 10:20 AM</small></span></span><span className="route-stop"><MapPin size={15} /><span><strong>Pastéis in Belém</strong><small>Friday · 1:00 PM</small></span></span><span className="route-stop"><MapPin size={15} /><span><strong>Sunset by the water</strong><small>Friday · 7:15 PM</small></span></span></div>
      <div className="preview-card-footer"><span><Check size={13} /> Everyone is in the loop</span><span className="preview-avatars"><i>M</i><i>A</i><i>J</i><i>+1</i></span></div>
    </div>
  )
}

function HowItWorks() {
  return (
    <PageFrame>
      <section className="page-hero how-hero">
        <div className="page-hero-art" />
        <div className="page-hero-copy">
          <span className="page-eyebrow"><i /> HOW TRIPSYNC WORKS</span>
          <h1>Less planning.<br /><span>More adventure.</span></h1>
          <p>One shared place for the plan, the people, and the little details that make a trip feel like yours.</p>
          <a className="button button-primary" href="#the-steps">See the three steps <ArrowRight size={16} /></a>
        </div>
        <div className="page-hero-visual"><ItineraryPreview /><span className="hero-stamp"><Compass size={14} /> Plans that travel together</span></div>
      </section>

      <section className="steps-section" id="the-steps">
        <div className="section-heading-row"><div><span className="page-eyebrow"><i /> A VERY GOOD PLAN</span><h2>Three steps to <span>out-of-office.</span></h2></div><p>From the first “we should go” to the last photo dump, everybody stays in the loop.</p></div>
        <div className="steps-grid">
          {steps.map(({ number, icon: Icon, title, copy, detail }) => <article className="step-card" key={number}>
            <div className="step-card-top"><span className="step-number">{number}</span><span className="step-icon"><Icon size={19} /></span></div>
            <h3>{title}</h3><p>{copy}</p><div className="step-detail"><Check size={14} /> {detail}</div>
          </article>)}
        </div>
      </section>

      <section className="together-band"><div className="together-icon"><UsersRound size={20} /></div><div><span className="page-eyebrow">MADE FOR THE WHOLE CREW</span><h2>Different calendars.<br /><span>Same can&apos;t-wait-to-go.</span></h2></div><p>Everyone can add ideas, see the plan, and know what is next. No one has to be the full-time trip coordinator.</p></section>
      <PageCallout title="Good trips start with one invite.">Get your people together. The rest can fall into place.</PageCallout>
    </PageFrame>
  )
}

export default HowItWorks
