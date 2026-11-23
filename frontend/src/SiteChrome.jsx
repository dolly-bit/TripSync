import { ArrowRight, ArrowUpRight } from "lucide-react"

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/features", label: "Features" },
  { href: "/stories", label: "Stories" },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="TripSync home">
        <span className="brand-mark"><span /></span>
        <span>trip<span className="brand-accent">sync</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="sign-in" href="/#get-started">Log in</a>
        <a className="button button-small button-outline" href="/#get-started">Get started <ArrowUpRight size={14} /></a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer page-footer">
      <a className="brand footer-brand" href="/" aria-label="TripSync home"><span className="brand-mark"><span /></span><span>trip<span className="brand-accent">sync</span></span></a>
      <nav aria-label="Footer navigation">
        {navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <span>© 2026 TripSync</span>
    </footer>
  )
}

export function PageFrame({ children }) {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}

export function PageCallout({ title, children }) {
  return (
    <section className="page-callout">
      <div>
        <span className="page-eyebrow">YOUR NEXT TRIP IS WAITING</span>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      <a className="button button-primary" href="mailto:hello@tripsync.app?subject=Let%20me%20plan%20a%20trip">Let&apos;s plan a trip <ArrowRight size={16} /></a>
    </section>
  )
}
