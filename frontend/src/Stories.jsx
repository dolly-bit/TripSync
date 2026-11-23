import { ArrowRight, ArrowUpRight, Compass, MapPin, Sparkles, UsersRound } from "lucide-react"
import { PageCallout, PageFrame } from "./SiteChrome.jsx"

const stories = [
  { category: "THE FRIENDS REUNION", place: "PORTUGAL · 5 DAYS", title: "Five calendars. One table by the water.", copy: "A long-overdue catch-up, planned around the things everyone wanted to do: slow mornings, one very good seafood lunch, and enough room to wander.", color: "story-lilac", icon: UsersRound },
  { category: "THE BIG FAMILY TRIP", place: "JAPAN · 10 DAYS", title: "A little structure. A lot of serendipity.", copy: "Different arrival times and a wish list that kept growing. A shared itinerary made it easier to meet up—and easier to go off-script.", color: "story-cyan", icon: Compass },
  { category: "THE QUICK GETAWAY", place: "MEXICO · 3 DAYS", title: "From “we should” to “we made it.”", copy: "A free weekend, a few saved spots, and a plan that came together without a hundred-message thread. The best part was being there.", color: "story-pink", icon: Sparkles },
]

function StoryArtwork({ story, index }) {
  const Icon = story.icon
  return <div className={`story-art ${story.color} story-art-${index + 1}`} aria-hidden="true"><span className="story-sun" /><span className="story-horizon horizon-one" /><span className="story-horizon horizon-two" /><span className="story-art-stamp"><Icon size={17} /></span><span className="story-art-place"><MapPin size={12} /> {story.place.split(" · ")[0]}</span></div>
}

function Stories() {
  return (
    <PageFrame>
      <section className="page-hero stories-hero">
        <div className="page-hero-art" />
        <div className="page-hero-copy">
          <span className="page-eyebrow"><i /> STORIES FROM THE ROAD</span>
          <h1>The best part<br />is <span>being there.</span></h1>
          <p>Every great trip starts somewhere. Here are a few familiar kinds of “we should go” that turned into “remember when?”</p>
          <a className="button button-primary" href="#trip-stories">Read the trip notes <ArrowRight size={16} /></a>
        </div>
        <div className="story-featured-card">
          <StoryArtwork story={stories[0]} index={0} />
          <div className="story-featured-copy"><span className="page-eyebrow">A TRIP NOTE · PORTUGAL</span><h2>Same crew.<br /><span>New favorite place.</span></h2><div className="featured-meta"><UsersRound size={14} /> A friends reunion <span /> <MapPin size={14} /> Lisbon & beyond</div></div>
        </div>
      </section>

      <section className="story-list-section" id="trip-stories">
        <div className="section-heading-row"><div><span className="page-eyebrow"><i /> EVERY TRIP HAS ITS OWN RHYTHM</span><h2>Pick your kind of <span>adventure.</span></h2></div><p>Real life is not a perfect itinerary. It is people, places, and a few happy detours.</p></div>
        <div className="story-grid">
          {stories.map((story, index) => <article className="story-card" key={story.title}>
            <StoryArtwork story={story} index={index} />
            <div className="story-card-copy"><div className="story-meta"><span>{story.category}</span><span>{story.place}</span></div><h3>{story.title}</h3><p>{story.copy}</p><a href="/how-it-works" className="text-link">Make a plan like this <ArrowUpRight size={14} /></a></div>
          </article>)}
        </div>
      </section>
      <section className="story-quote-band"><div className="quote-sparkle"><Sparkles size={18} /></div><blockquote>“We should go” is a pretty wonderful place to start.</blockquote><p>TripSync keeps the plan together. The memories are all yours.</p></section>
      <PageCallout title="Your story is next." >Start with the people. We&apos;ll help with the plan.</PageCallout>
    </PageFrame>
  )
}

export default Stories
