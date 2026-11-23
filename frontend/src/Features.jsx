import { ArrowRight, CalendarDays, Check, Compass, MapPin, MessageCircle, UsersRound, WalletCards } from "lucide-react"
import { PageCallout, PageFrame } from "./SiteChrome.jsx"

const features = [
  { number: "01", icon: CalendarDays, title: "A plan everyone can find", copy: "Keep dates, reservations, and the day-by-day itinerary together. Updates stay visible to the whole group.", tag: "Shared itinerary" },
  { number: "02", icon: Compass, title: "A place for every good idea", copy: "Save the restaurant someone sent, the walk someone found, and all the little “we have to go here” moments.", tag: "Places & ideas" },
  { number: "03", icon: WalletCards, title: "Shared costs, less guesswork", copy: "Keep the group expenses in view as they happen, so the math does not take over the memories.", tag: "Expense tracking" },
  { number: "04", icon: UsersRound, title: "The whole crew, in the loop", copy: "Give everyone a voice in the plan and one source of truth when the group gets moving.", tag: "Crew coordination" },
]

function PlanPreview() {
  return <div className="feature-ui plan-ui"><div className="ui-topline"><span>THE PLAN</span><span>SEP 12 — 16 <CalendarDays size={12} /></span></div><div className="ui-day-row"><span className="selected">FRI<strong>12</strong></span><span>SAT<strong>13</strong></span><span>SUN<strong>14</strong></span><span>MON<strong>15</strong></span></div><div className="ui-event"><span className="ui-event-dot" /><span><strong>Check in & drop bags</strong><small>10:30 AM · The Alfama Stay</small></span><Check size={14} /></div><div className="ui-event"><span className="ui-event-dot mint-dot" /><span><strong>Lunch in the old town</strong><small>12:45 PM · Saved by Maya</small></span><span className="ui-avatar">M</span></div></div>
}

function MapPreview() {
  return <div className="feature-ui map-ui"><div className="map-contours"><i /><i /><i /><i /></div><span className="map-route-line" /><span className="map-ui-pin pin-a"><MapPin size={16} fill="currentColor" /></span><span className="map-ui-pin pin-b"><MapPin size={16} fill="currentColor" /></span><span className="map-place place-a">Alfama</span><span className="map-place place-b">Belém</span><span className="map-saved"><Compass size={13} /> 8 saved places</span></div>
}

function ExpensesPreview() {
  return <div className="feature-ui expenses-ui"><div className="ui-topline"><span>GROUP SPEND</span><span>BALI ’26</span></div><strong className="ui-total">$842<span>.50</span></strong><span className="ui-muted">shared across 4 friends</span><div className="ui-expense-row"><span className="expense-dot lavender-dot" /><span>Villa deposit</span><strong>$520</strong></div><div className="ui-expense-row"><span className="expense-dot cyan-dot" /><span>Groceries</span><strong>$186</strong></div><div className="ui-expense-row"><span className="expense-dot pink-dot" /><span>Ride to Ubud</span><strong>$136.50</strong></div></div>
}

function CrewPreview() {
  return <div className="feature-ui crew-ui"><div className="crew-orbit orbit-a" /><div className="crew-orbit orbit-b" /><div className="crew-center"><UsersRound size={24} /></div><span className="crew-bubble bubble-a">M</span><span className="crew-bubble bubble-b">J</span><span className="crew-bubble bubble-c">A</span><span className="crew-bubble bubble-d">+1</span><div className="crew-note"><MessageCircle size={13} /> Maya added 2 new ideas</div></div>
}

const previews = [PlanPreview, MapPreview, ExpensesPreview, CrewPreview]

function Features() {
  return (
    <PageFrame>
      <section className="page-hero features-hero">
        <div className="page-hero-art" />
        <div className="page-hero-copy">
          <span className="page-eyebrow"><i /> THE TRIPSYNC TOOLKIT</span>
          <h1>All the trip stuff.<br /><span>Finally together.</span></h1>
          <p>Less app-hopping, fewer “did anyone book that?” moments. Just the essentials for a trip that flows.</p>
          <a className="button button-primary" href="#everything">Explore the features <ArrowRight size={16} /></a>
        </div>
        <div className="feature-hero-stack"><PlanPreview /><div className="stack-tag"><Check size={13} /> One plan, shared</div></div>
      </section>

      <section className="feature-library" id="everything">
        <div className="section-heading-row"><div><span className="page-eyebrow"><i /> THE GOOD KIND OF ORGANIZED</span><h2>Everything in its <span>right place.</span></h2></div><p>Thoughtful tools for the real-life logistics, so you can keep your attention on the people and the place.</p></div>
        <div className="feature-library-grid">
          {features.map(({ number, icon: Icon, title, copy, tag }, index) => {
            const Preview = previews[index]
            return <article className={`library-card library-card-${number}`} key={number}>
              <div className="library-card-visual"><Preview /></div>
              <div className="library-card-copy"><div className="library-tag"><Icon size={13} /> {tag}</div><span className="feature-number">{number} / THE DETAILS</span><h3>{title}</h3><p>{copy}</p><a className="text-link" href="/how-it-works">See how it works <ArrowRight size={14} /></a></div>
            </article>
          })}
        </div>
      </section>
      <PageCallout title="Your next trip, minus the tabs." >Bring your group together and get to the good part sooner.</PageCallout>
    </PageFrame>
  )
}

export default Features
