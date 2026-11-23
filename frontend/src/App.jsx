import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Bell, CalendarDays, Check, ChevronDown, ChevronLeft,
  ChevronRight, CircleHelp, Compass, CreditCard, FileText, Globe2, Heart, LayoutDashboard,
  LogOut, MapPin, Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, Sparkles,
  Users, Wallet, X, Plane, Clock3, Upload, Download, Trash2, Send, Eye, EyeOff,
  Mountain, Waves, Camera, Luggage, Sun, CircleDollarSign, ListTodo, CheckCircle2
} from 'lucide-react'

const API = ''
const readToken = () => localStorage.getItem('tripsync_token')
async function request(path, options = {}) {
  const headers = { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) }
  if (readToken()) headers.Authorization = `Bearer ${readToken()}`
  const response = await fetch(`${API}${path}`, { ...options, headers })
  if (response.status === 204) return null
  const type = response.headers.get('content-type') || ''
  const payload = type.includes('application/json') ? await response.json() : await response.text()
  if (!response.ok) {
    const message = typeof payload === 'string' ? payload : payload.message || payload.detail || payload.error || JSON.stringify(payload)
    throw new Error(message || `Request failed (${response.status})`)
  }
  return payload
}
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value || 0))
const dateLabel = value => value ? new Date(value + (value.length === 10 ? 'T12:00:00' : '')).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date flexible'
const destinationPhotos = {
  'El Nido': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=900&q=85',
  'Santorini': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=85',
  'Iceland': 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=900&q=85',
  'Kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85',
  'Amalfi': 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=900&q=85',
  'Marrakech': 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=900&q=85'
}
const destinations = [
  { name: 'El Nido, Philippines', region: 'Tropical paradise', price: '$899', rating: '4.8', image: destinationPhotos['El Nido'], tag: 'Island escape' },
  { name: 'Santorini, Greece', region: 'Islands of romance', price: '$1,099', rating: '4.7', image: destinationPhotos.Santorini, tag: 'Slow summer' },
  { name: 'Iceland', region: 'Land of fire & ice', price: '$1,299', rating: '4.6', image: destinationPhotos.Iceland, tag: 'Wild nature' }
]
const cx = (...parts) => parts.filter(Boolean).join(' ')

function Brand({ light = false }) {
  return <a className={cx('brand', light && 'brand-light')} href="#" aria-label="TripSync home"><span className="brand-mark"><Plane size={18} /></span><span>trip<span>sync</span><small>GO FURTHER, TOGETHER</small></span></a>
}

function ScrollJourney() {
  const target = useRef(null)
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], [1.12, 1, 1.18])
  const imageX = useTransform(scrollYProgress, [0, .5, 1], ['0%', '-4%', '2%'])
  const firstOpacity = useTransform(scrollYProgress, [0, .22, .38], [1, 1, 0])
  const secondOpacity = useTransform(scrollYProgress, [.28, .48, .68], [0, 1, 0])
  const thirdOpacity = useTransform(scrollYProgress, [.6, .78, 1], [0, 1, 1])
  const titleY = useTransform(scrollYProgress, [0, .3, .65, 1], ['0%', '-20%', '-42%', '-65%'])
  const progressWidth = useTransform(scrollYProgress, v => (v * 100) + '%')
  return <section className="scroll-journey" ref={target} id="journey">
    <div className="scroll-journey-sticky">
      <motion.div className="scroll-journey-image" style={{ scale:imageScale, x:imageX }}>
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=90" alt="Towering mountains above the clouds"/>
      </motion.div>
      <div className="scroll-journey-overlay"/>
      <div className="scroll-journey-top"><span>TRIPSYNC JOURNAL</span><span>01 — 03</span></div>
      <motion.div className="scroll-journey-copy" style={{ y:titleY }}>
        <motion.article style={{ opacity:firstOpacity }}><span>01 / FIND YOUR ELSEWHERE</span><h2>Leave the<br/><em>ordinary</em><br/>behind.</h2><p>There is a whole world waiting beyond your usual route.</p></motion.article>
        <motion.article style={{ opacity:secondOpacity }}><span>02 / BRING YOUR PEOPLE</span><h2>Better places.<br/><em>Better</em><br/>together.</h2><p>Turn “we should go” into a plan everyone can shape.</p></motion.article>
        <motion.article style={{ opacity:thirdOpacity }}><span>03 / MAKE IT YOURS</span><h2>Collect moments.<br/><em>Not</em> checklists.</h2><p>Keep the details in sync, then get out there and live it.</p></motion.article>
      </motion.div>
      <div className="scroll-journey-bottom"><span>KEEP SCROLLING</span><div className="journey-progress"><motion.i style={{ width:progressWidth }}/></div><span>THE WORLD IS YOURS</span></div>
      <motion.div className="journey-number" style={{ opacity:firstOpacity }}>01</motion.div>
      <motion.div className="journey-number" style={{ opacity:secondOpacity }}>02</motion.div>
      <motion.div className="journey-number" style={{ opacity:thirdOpacity }}>03</motion.div>
    </div>
  </section>
}

function Landing({ onAuth }) {
  const [query, setQuery] = useState('')
  const [menu, setMenu] = useState(false)
  const titleWords = ['The world', 'is better', 'together.']
  return <div className="landing cinematic-landing">
    <header className="site-nav wrap">
      <Brand light />
      <nav className={menu ? 'nav-links nav-open' : 'nav-links'}>
        <a href="#destinations" onClick={() => setMenu(false)}>Destinations</a><a href="#journey" onClick={() => setMenu(false)}>The journey</a><a href="#features" onClick={() => setMenu(false)}>Why TripSync</a>
      </nav>
      <div className="nav-actions"><button className="nav-login" onClick={() => onAuth('login')}>Log in</button><button className="btn btn-mint btn-small" onClick={() => onAuth('register')}>Create your trip <ArrowUpRight size={15}/></button></div>
      <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Menu /></button>
    </header>
    <main>
      <section className="hero cinematic-hero">
        <div className="cinema-backdrop">
          <div className="cinema-image cinema-image-back"/><div className="cinema-image cinema-image-front"/><div className="cinema-vignette"/>
          <motion.div className="cinema-sun" animate={{ y:[0,-22,0], scale:[1,1.08,1] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut' }}/>
          <motion.div className="cinema-cloud cloud-one" animate={{ x:[-45,50,-45] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut' }}/>
          <motion.div className="cinema-cloud cloud-two" animate={{ x:[35,-40,35] }} transition={{ duration:23, repeat:Infinity, ease:'easeInOut' }}/>
          <motion.div className="floating-plane" animate={{ x:[-30,55,-30], y:[0,-24,0], rotate:[-8,3,-8] }} transition={{ duration:11, repeat:Infinity, ease:'easeInOut' }}><Plane size={30}/></motion.div>
          <motion.div className="hero-orbit orbit-a" animate={{ rotate:360 }} transition={{ duration:48, repeat:Infinity, ease:'linear' }}/>
          <motion.div className="hero-orbit orbit-b" animate={{ rotate:-360 }} transition={{ duration:65, repeat:Infinity, ease:'linear' }}/>
        </div>
        <div className="hero-copy cinematic-copy">
          <motion.div className="eyebrow" initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8 }}><span className="eyebrow-dot"/> FOR THE PLACES THAT STAY WITH YOU</motion.div>
          <h1>{titleWords.map((word,i)=><motion.span className={i===2?'headline-accent':''} key={word} initial={{ opacity:0, y:100, rotateX:-50, filter:'blur(12px)' }} animate={{ opacity:1, y:0, rotateX:0, filter:'blur(0px)' }} transition={{ duration:1.15, delay:.25+i*.22, ease:[.16,1,.3,1] }}>{word}{i!==2?' ':''}</motion.span>)}</h1>
          <motion.p className="hero-lead" initial={{ opacity:0, y:25 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, delay:1 }}>The best journeys aren't planned alone. Bring your people, shape the adventure and keep every little detail in sync.</motion.p>
          <motion.div className="hero-search" initial={{ opacity:0, y:30, scale:.96 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:.8, delay:1.2 }}><div className="search-field"><MapPin size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Where should we go?"/></div><button className="btn btn-mint" onClick={() => onAuth('register')}>Start exploring <ArrowRight size={16}/></button></motion.div>
          <motion.div className="hero-trust" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}><div className="avatar-stack"><i>J</i><i>M</i><i>A</i><i>+</i></div><span><b>One trip. Your whole crew.</b><small>Less planning chaos. More stories.</small></span></motion.div>
        </div>
        <div className="scene-coordinate">27° 10' N &nbsp; 78° 02' E <span>— SOMEWHERE WORTH GOING</span></div>
        <a className="scroll-cue" href="#journey"><span>SCROLL TO WANDER</span><motion.i animate={{ y:[0,12,0] }} transition={{ duration:1, repeat:Infinity }}>↓</motion.i></a>
        <div className="hero-side-label">MADE FOR THE JOURNEY <span>↗</span></div>
      </section>
      <ScrollJourney/>
      <section className="feature-strip wrap" id="features">
        <div className="strip-intro"><span className="eyebrow">THE WHOLE JOURNEY</span><h2>All the moving parts.<br/><em>Finally in one place.</em></h2></div>
        <div className="strip-feature"><span><Users/></span><b>Better together</b><small>Invite your crew and make decisions as a team.</small></div>
        <div className="strip-feature"><span><ListTodo/></span><b>Plans that flow</b><small>Build day-by-day itineraries without the mess.</small></div>
        <div className="strip-feature"><span><CircleDollarSign/></span><b>Money, sorted</b><small>Track shared costs and see who owes what.</small></div>
      </section>
      <section className="destinations-section" id="destinations"><div className="wrap">
        <motion.div className="section-heading" initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}><div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>Somewhere <em>out there.</em></h2></div><button className="text-link" onClick={() => onAuth('register')}>Find your next trip <ArrowUpRight size={16}/></button></motion.div>
        <div className="destination-grid">{destinations.map((d,i)=><motion.article className="destination-card" key={d.name} initial={{ opacity:0, y:70, rotate:i===1?2:0, scale:.94 }} whileInView={{ opacity:1, y:0, rotate:0, scale:1 }} viewport={{ once:true, amount:.25 }} transition={{ delay:i*.16, duration:1, ease:[.16,1,.3,1] }}><img src={d.image} alt={d.name}/><div className="destination-gradient"/><span className="destination-tag">{d.tag}</span><button className="heart-btn" aria-label="Save destination"><Heart size={17}/></button><div className="destination-info"><div className="destination-meta"><span>★ {d.rating}</span><span>FROM {d.price}</span></div><h3>{d.name}</h3><p>{d.region}</p></div></motion.article>)}</div>
      </div></section>
      <section className="how-section wrap" id="how">
        <motion.div className="how-image" initial={{ opacity:0, x:-70, rotate:-2 }} whileInView={{ opacity:1, x:0, rotate:0 }} viewport={{ once:true }} transition={{ duration:1 }}><img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=85" alt="Friends travelling together"/><span className="image-stamp">THE BEST<br/>PLANS ARE<br/><i>SHARED.</i></span></motion.div>
        <motion.div className="how-copy" initial={{ opacity:0, x:70 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:1 }}><span className="eyebrow">FROM “WE SHOULD GO” TO “WE DID”</span><h2>Less coordinating.<br/><em>More living.</em></h2><p>TripSync gives your group a home base for the whole adventure — so the planning feels like part of the fun, not a second job.</p><div className="steps"><div><span>01</span><b>Start with a place</b><small>Create a trip and set the dates, destination and vibe.</small></div><div><span>02</span><b>Bring everyone in</b><small>Invite your people and keep the whole crew in the loop.</small></div><div><span>03</span><b>Make it happen</b><small>Plan days, share costs, save documents and go.</small></div></div><button className="btn btn-dark" onClick={() => onAuth('register')}>Make your first trip <ArrowRight size={16}/></button></motion.div>
      </section>
      <section className="closing-cta wrap"><div><span className="eyebrow">YOUR NEXT CHAPTER STARTS SOMEWHERE</span><h2>Good trips don't<br/>plan <em>themselves.</em></h2></div><button className="btn btn-mint btn-large" onClick={() => onAuth('register')}>Let's make a plan <ArrowUpRight size={17}/></button><div className="cta-orbit orbit-one"/><div className="cta-orbit orbit-two"/></section>
    </main>
    <footer className="site-footer wrap"><Brand light/><span>Made for the miles and memories.</span><span>© 2026 TripSync</span></footer>
  </div>
}

function AuthModal({ mode, onClose, onSuccess, onMode }) {
  const [kind, setKind] = useState(mode || 'login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => setKind(mode || 'login'), [mode])
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('')
    try {
      if (kind === 'register') await request('/auth/register', { method: 'POST', body: JSON.stringify({ fullName, email, password }) })
      const data = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      localStorage.setItem('tripsync_token', data.accessToken)
      onSuccess(data.accessToken)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><motion.div className="auth-modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
    <button className="modal-close" onClick={onClose}><X size={18}/></button><Brand/>
    <span className="eyebrow">{kind === 'login' ? 'WELCOME BACK' : 'YOUR NEXT ADVENTURE'}</span>
    <h2>{kind === 'login' ? 'Pick up where you left off.' : 'Let’s get you out there.'}</h2>
    <p>{kind === 'login' ? 'Sign in to see what your crew is planning.' : 'Create your account and bring your people along.'}</p>
    <form onSubmit={submit}>
      {kind === 'register' && <label>Your name<input required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Alex Morgan"/></label>}
      <label>Email address<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"/></label>
      <label>Password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters"/></label>
      {error && <div className="form-error">{error}</div>}
      <button className="btn btn-dark btn-full" disabled={busy}>{busy ? 'One moment…' : kind === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={16}/></button>
    </form>
    <div className="auth-switch">{kind === 'login' ? 'New around here?' : 'Already have an account?'} <button onClick={() => { setKind(kind === 'login' ? 'register' : 'login'); onMode(kind === 'login' ? 'register' : 'login') }}>{kind === 'login' ? 'Create an account' : 'Sign in'}</button></div>
  </motion.div></div>
}

function Modal({ title, subtitle, onClose, children }) {
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><motion.div className="form-modal" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="modal-head"><div><span className="eyebrow">TRIPSYNC WORKSPACE</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="modal-close" onClick={onClose}><X size={18}/></button></div>{children}</motion.div></div>
}

function Field({ label, children }) { return <label className="field-label">{label}{children}</label> }
function Empty({ icon: Icon = Compass, title, body, action, onClick }) {
  return <div className="empty-state"><span><Icon size={24}/></span><h3>{title}</h3><p>{body}</p>{action && <button className="btn btn-dark" onClick={onClick}><Plus size={16}/>{action}</button>}</div>
}

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('overview')
  const [trips, setTrips] = useState([])
  const [selected, setSelected] = useState(null)
  const [itineraries, setItineraries] = useState([])
  const [members, setMembers] = useState([])
  const [balances, setBalances] = useState([])
  const [documents, setDocuments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [modal, setModal] = useState('')
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)
  const [profileName, setProfileName] = useState('Traveller')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const currentTrip = useMemo(() => trips.find(t => t.id === selected) || null, [trips, selected])
  const firstName = profileName.split(' ')[0] || 'Traveller'
  const upcoming = trips.filter(t => !t.endDate || t.endDate >= new Date().toISOString().slice(0,10))
  const filteredTrips = trips.filter(t => `${t.title} ${t.destination}`.toLowerCase().includes(search.toLowerCase()))

  async function loadTrips() {
    const data = await request('/api/trips')
    setTrips(Array.isArray(data) ? data : [])
    if (data?.length && !selected) setSelected(data[0].id)
  }
  async function loadNotifications() {
    try { const data = await request('/api/notifications'); setNotifications(Array.isArray(data) ? data : []) } catch { setNotifications([]) }
  }
  async function loadTripDetails(id) {
    if (!id) { setItineraries([]); setMembers([]); setBalances([]); setDocuments([]); return }
    const results = await Promise.allSettled([
      request(`/api/trips/${id}/itineraries`), request(`/api/trips/${id}/members`),
      request(`/api/trips/${id}/balances`), request(`/api/trips/${id}/documents`)
    ])
    setItineraries(results[0].status === 'fulfilled' ? results[0].value || [] : [])
    setMembers(results[1].status === 'fulfilled' ? results[1].value || [] : [])
    setBalances(results[2].status === 'fulfilled' ? results[2].value || [] : [])
    setDocuments(results[3].status === 'fulfilled' ? results[3].value || [] : [])
  }
  useEffect(() => {
    const payload = token.split('.')[1]
    try { const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))); setProfileName(decoded.name || decoded.fullName || decoded.sub?.split('@')[0] || 'Traveller') } catch {}
    loadTrips().catch(e => setError(e.message)); loadNotifications()
  }, [])
  useEffect(() => { loadTripDetails(selected).catch(e => setError(e.message)) }, [selected])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 3200); return () => clearTimeout(id) }, [toast])

  async function action(fn, success) {
    setBusy(true); setError('')
    try { await fn(); if (success) setToast(success); await loadTrips(); if (selected) await loadTripDetails(selected); await loadNotifications(); setModal('') }
    catch (e) { setError(e.message) } finally { setBusy(false) }
  }
  const nav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'trips', label: 'My trips', icon: Compass },
    { id: 'itinerary', label: 'Itinerary', icon: CalendarDays },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
    { id: 'team', label: 'Travel crew', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText }
  ]

  return <div className="app-shell">
    <aside className="sidebar">
      <Brand light/><div className="side-label">WORKSPACE</div>
      <nav className="side-nav">{nav.map(n => <button key={n.id} className={cx(tab === n.id && 'active')} onClick={() => setTab(n.id)}><n.icon size={18}/>{n.label}{n.id === 'team' && members.length > 0 && <small>{members.length}</small>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-help"><span><CircleHelp size={17}/></span><b>Need a hand?</b><small>Your next adventure is closer than you think.</small><button onClick={() => setToast('Help centre coming soon.')}>Visit help centre <ArrowUpRight size={13}/></button></div><button className="profile-row" onClick={onLogout}><span className="profile-avatar">{firstName[0]?.toUpperCase()}</span><span><b>{profileName}</b><small>Personal account</small></span><LogOut size={16}/></button></div>
    </aside>
    <main className="dashboard-main">
      <header className="dash-topbar"><div className="breadcrumb">Workspace <ChevronRight size={14}/><b>{nav.find(n => n.id === tab)?.label || 'Overview'}</b></div><div className="top-actions"><span className="status-pill"><i/> All systems ready</span><button className="icon-btn notification-btn" onClick={() => setTab('overview')}><Bell size={18}/>{notifications.filter(n => !n.read).length > 0 && <i/>}</button><span className="top-avatar">{firstName[0]?.toUpperCase()}</span></div></header>
      <div className="dash-content">
        {error && <div className="inline-error">{error}<button onClick={() => setError('')}><X size={14}/></button></div>}
        {tab === 'overview' && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="welcome-row"><div><span className="eyebrow">MONDAY, YOUR NEXT CHAPTER</span><h1>Good to see you, {firstName}<span className="wave">✳</span></h1><p>Ready to turn those “one day” plans into actual plans?</p></div><button className="btn btn-dark" onClick={() => setModal('trip')}><Plus size={16}/> Create a trip</button></div>
          <div className="stats-grid"><div className="stat-card stat-dark"><span className="stat-icon"><Compass size={18}/></span><small>YOUR JOURNEYS</small><strong>{trips.length.toString().padStart(2,'0')}</strong><span>Trips in your orbit</span><div className="stat-decoration">✳</div></div><div className="stat-card"><span className="stat-icon"><Users size={18}/></span><small>YOUR CREW</small><strong>{members.length.toString().padStart(2,'0')}</strong><span>People on this trip</span></div><div className="stat-card"><span className="stat-icon"><CalendarDays size={18}/></span><small>UP NEXT</small><strong>{upcoming.length.toString().padStart(2,'0')}</strong><span>Upcoming adventures</span></div><div className="stat-card"><span className="stat-icon"><FileText size={18}/></span><small>TRIP FILES</small><strong>{documents.length.toString().padStart(2,'0')}</strong><span>Shared documents</span></div></div>
          <div className="content-grid"><section className="panel trips-panel"><div className="panel-heading"><div><span className="eyebrow">YOUR CALENDAR</span><h2>On the horizon</h2></div><button className="text-link" onClick={() => setTab('trips')}>All trips <ArrowRight size={15}/></button></div>
            {trips.length ? <div className="mini-trip-list">{trips.slice(0,3).map((t,i) => <button className="mini-trip" key={t.id} onClick={() => { setSelected(t.id); setTab('itinerary') }}><img src={destinationPhotos[Object.keys(destinationPhotos).find(k => t.destination?.includes(k))] || destinations[i % 3].image} alt=""/><span className="mini-trip-main"><b>{t.title}</b><small><MapPin size={12}/>{t.destination}</small></span><span className="mini-trip-date">{dateLabel(t.startDate)}<small>{dateLabel(t.endDate)}</small></span><ChevronRight size={17}/></button>)}</div> : <Empty icon={Plane} title="Your map is still blank" body="Start with a destination. The rest will fall into place." action="Create your first trip" onClick={() => setModal('trip')}/>}
          </section><section className="panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">THE LITTLE THINGS</span><h2>Recent updates</h2></div><span className="live-dot">LIVE</span></div>
            {notifications.length ? <div className="notification-list">{notifications.slice(0,5).map(n => <div className="notification-item" key={n.id}><span className="notification-icon"><Bell size={15}/></span><div><b>{n.title}</b><p>{n.message}</p><small>{dateLabel(n.createdAt?.slice(0,10))}</small></div>{!n.read && <button className="tiny-check" title="Mark read" onClick={() => action(() => request(`/api/notifications/${n.id}/read`, { method: 'PATCH' }), 'Marked as read')}><Check size={14}/></button>}</div>)}</div> : <div className="quiet-empty"><Bell size={22}/><p>All quiet for now.<br/>Your updates will show up here.</p></div>}
          </section></div>
          <div className="inspiration-banner"><div><span className="eyebrow">A GOOD IDEA IS A GOOD START</span><h2>Somewhere new is<br/><em>calling your name.</em></h2><p>Pick a place. Bring your people. We’ll keep the details together.</p><button className="btn btn-mint" onClick={() => setModal('trip')}>Start a new adventure <ArrowRight size={15}/></button></div><img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=85" alt="Mountain lake"/></div>
        </motion.div>}

        {tab === 'trips' && <section className="page-section"><div className="page-title-row"><div><span className="eyebrow">YOUR PERSONAL TRAVEL LOG</span><h1>All your <em>journeys.</em></h1><p>Every plan, every person, every little detail.</p></div><button className="btn btn-dark" onClick={() => setModal('trip')}><Plus size={16}/> New trip</button></div><div className="trip-toolbar"><div className="search-input"><Search size={16}/><input placeholder="Search trips or destinations" value={search} onChange={e => setSearch(e.target.value)}/></div><span>{filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}</span></div>
          {filteredTrips.length ? <div className="trip-card-grid">{filteredTrips.map((t,i) => <article className="trip-card" key={t.id}><div className="trip-card-image"><img src={destinationPhotos[Object.keys(destinationPhotos).find(k => t.destination?.includes(k))] || destinations[i % 3].image} alt={t.destination}/><span className="trip-card-status">{t.status || 'PLANNING'}</span><button className="trip-more" onClick={() => setSelected(t.id)}><MoreHorizontal size={18}/></button></div><div className="trip-card-body"><span className="eyebrow">{dateLabel(t.startDate)} — {dateLabel(t.endDate)}</span><h3>{t.title}</h3><p><MapPin size={14}/>{t.destination}</p><div className="trip-card-foot"><span><Users size={14}/> Open crew workspace</span><button onClick={() => { setSelected(t.id); setTab('itinerary') }}>Open trip <ArrowUpRight size={14}/></button></div></div></article>)}</div> : <Empty icon={Compass} title="No journeys found" body="Try a different search, or create a new trip to get started." action="Create a trip" onClick={() => setModal('trip')}/>}
        </section>}

        {tab === 'itinerary' && <section className="page-section"><div className="page-title-row"><div><span className="eyebrow">THE PLAN, DAY BY DAY</span><h1>Your <em>itinerary.</em></h1><p>Turn a destination into a collection of moments.</p></div><button className="btn btn-dark" disabled={!currentTrip} onClick={() => setModal('day')}><Plus size={16}/> Add a day</button></div><TripPicker trips={trips} selected={selected} onChange={setSelected}/>{currentTrip ? <><div className="selected-trip-banner"><img src={destinationPhotos[Object.keys(destinationPhotos).find(k => currentTrip.destination?.includes(k))] || destinations[0].image}/><div><span className="eyebrow">CURRENTLY PLANNING</span><h2>{currentTrip.title}</h2><p><MapPin size={14}/>{currentTrip.destination} <span>·</span> {dateLabel(currentTrip.startDate)} — {dateLabel(currentTrip.endDate)}</p></div><button className="btn btn-light" onClick={() => setModal('activity')}><Plus size={15}/> Add activity</button></div>
          {itineraries.length ? <div className="timeline">{itineraries.map((day,i) => <div className="timeline-day" key={day.id}><div className="day-marker"><span>DAY</span><b>{String(i+1).padStart(2,'0')}</b></div><div className="day-content"><div className="day-heading"><div><span className="eyebrow">{dateLabel(day.date)}</span><h3>Day {i+1}</h3>{day.notes && <p>{day.notes}</p>}</div><button className="btn btn-outline btn-small" onClick={() => setModal('activity')}><Plus size={14}/> Activity</button></div>{(day.activities || []).length ? <div className="activity-list">{day.activities.map(a => <div className="activity-row" key={a.id}><span className="activity-time">{a.startTime?.slice(0,5) || '—'}</span><span className="activity-bullet"/><div className="activity-detail"><b>{a.title}</b><p>{a.description || a.location || 'Add a note to this activity'}</p>{a.location && <small><MapPin size={12}/>{a.location}</small>}</div>{a.estimatedCost != null && <span className="activity-cost">{money(a.estimatedCost)}</span>}</div>)}</div> : <p className="muted-empty">No activities yet. Add the first stop to this day.</p>}</div></div>)}</div> : <Empty icon={CalendarDays} title="The days are yours to shape" body="Add your first itinerary day, then fill it with places, plans and little detours." action="Add the first day" onClick={() => setModal('day')}/>}</> : <Empty icon={Plane} title="Choose a trip to begin" body="Select one of your trips above, or create a new one." action="Create a trip" onClick={() => setModal('trip')}/>}</section>}

        {tab === 'expenses' && <section className="page-section"><div className="page-title-row"><div><span className="eyebrow">NO MORE “I’LL SEND YOU LATER”</span><h1>Money, <em>made simple.</em></h1><p>Keep shared costs clear and the good vibes intact.</p></div><button className="btn btn-dark" disabled={!currentTrip} onClick={() => setModal('expense')}><Plus size={16}/> Add expense</button></div><TripPicker trips={trips} selected={selected} onChange={setSelected}/>{currentTrip ? <><div className="money-summary"><div><span className="eyebrow">CREW BALANCES</span><h2>Everyone, <em>in the clear.</em></h2><p>Live balances for {currentTrip.title}.</p></div><span className="money-icon"><Wallet size={24}/></span></div>{balances.length ? <div className="balance-grid">{balances.map(b => <div className="balance-card" key={b.userId}><span className="balance-avatar">{b.fullName?.[0] || '?'}</span><div><b>{b.fullName}</b><small>Paid {money(b.totalPaid)} · Share {money(b.totalShare)}</small></div><strong className={Number(b.netBalance) >= 0 ? 'positive' : 'negative'}>{Number(b.netBalance) >= 0 ? '+' : ''}{money(b.netBalance)}</strong></div>)}</div> : <Empty icon={CreditCard} title="A clean slate" body="No balance activity yet. Add an expense and split it with your crew." action="Add first expense" onClick={() => setModal('expense')}/>}<div className="info-note"><ShieldCheck size={17}/><span><b>Transparent by design.</b> Every split is visible to trip members. Add expenses with an exact share for each person.</span></div></> : <Empty icon={Wallet} title="Select a trip first" body="Your expense board lives inside each trip."/>}</section>}

        {tab === 'team' && <section className="page-section"><div className="page-title-row"><div><span className="eyebrow">YOUR PEOPLE, YOUR ADVENTURE</span><h1>The travel <em>crew.</em></h1><p>Good company makes every destination better.</p></div><button className="btn btn-dark" disabled={!currentTrip} onClick={() => setModal('invite')}><Plus size={16}/> Invite someone</button></div><TripPicker trips={trips} selected={selected} onChange={setSelected}/>{currentTrip ? <><div className="team-intro"><Users size={22}/><div><b>{members.length} people in this crew</b><small>Invite friends, family or your favourite co-pilots.</small></div></div><div className="member-list">{members.map((m,i) => <div className="member-row" key={m.userId || i}><span className="member-avatar" style={{ '--avatar-hue': (i*53+145)%360 }}>{(m.fullName || m.email || 'T')[0]}</span><div><b>{m.fullName || m.email}</b><small>{m.email || 'Trip member'}</small></div><span className="role-pill">{m.role || 'MEMBER'}</span></div>)}</div>{!members.length && <Empty icon={Users} title="Your crew is waiting" body="Invite the people who make every trip a good story." action="Invite your crew" onClick={() => setModal('invite')}/>}</> : <Empty icon={Users} title="Select a trip first" body="Choose a trip to manage its members."/>}</section>}

        {tab === 'documents' && <section className="page-section"><div className="page-title-row"><div><span className="eyebrow">THE IMPORTANT LITTLE THINGS</span><h1>Trip <em>documents.</em></h1><p>Keep tickets, confirmations and useful files close.</p></div><button className="btn btn-dark" disabled={!currentTrip} onClick={() => setModal('upload')}><Upload size={16}/> Upload file</button></div><TripPicker trips={trips} selected={selected} onChange={setSelected}/>{currentTrip ? documents.length ? <div className="document-list">{documents.map(d => <div className="document-row" key={d.id}><span className="document-icon"><FileText size={20}/></span><div><b>{d.originalFileName}</b><small>{d.contentType || 'File'} · {(d.fileSize/1024).toFixed(0)} KB · Added {dateLabel(d.createdAt?.slice(0,10))}</small></div><button className="icon-btn" title="Download" onClick={async () => { try { const res = await fetch(`/api/trips/${selected}/documents/${d.id}/download`, { headers: { Authorization: `Bearer ${token}` } }); if (!res.ok) throw new Error('Download failed'); const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download=d.originalFileName; a.click(); URL.revokeObjectURL(url) } catch(e) { setError(e.message) } }}><Download size={17}/></button></div>)}</div> : <Empty icon={FileText} title="Your trip folder is empty" body="Upload confirmations, tickets and other files your crew needs." action="Upload a document" onClick={() => setModal('upload')}/> : <Empty icon={FileText} title="Select a trip first" body="Documents are shared within each trip."/>}</section>}
      </div>
    </main>

    {modal === 'trip' && <Modal title="A new adventure." subtitle="Start with the basics. You can fill in the details as you go." onClose={() => setModal('')}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); action(() => request('/api/trips', { method:'POST', body:JSON.stringify({ title:f.get('title'), destination:f.get('destination'), description:f.get('description'), startDate:f.get('startDate'), endDate:f.get('endDate') }) }), 'Your trip is on the map.') }}><Field label="Trip name"><input name="title" required placeholder="The summer we finally went"/></Field><Field label="Destination"><input name="destination" required placeholder="Lisbon, Portugal"/></Field><Field label="Start date"><input name="startDate" type="date" required/></Field><Field label="End date"><input name="endDate" type="date" required/></Field><Field label="A note for the crew"><textarea name="description" placeholder="What are we dreaming up?" rows="3"/></Field><button className="btn btn-dark btn-full" disabled={busy}>Create trip <ArrowRight size={16}/></button></form></Modal>}
    {modal === 'day' && currentTrip && <Modal title="Add a day to the plan." subtitle="Give this day a date and a little context." onClose={() => setModal('')}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f=new FormData(e.currentTarget); action(() => request(`/api/trips/${selected}/itineraries`, { method:'POST', body:JSON.stringify({ date:f.get('date'), note:f.get('note') }) }), 'Day added to your itinerary.') }}><Field label="Date"><input type="date" name="date" required defaultValue={currentTrip.startDate}/></Field><Field label="Day notes"><textarea name="note" rows="3" placeholder="Keep it flexible, leave room to wander…"/></Field><button className="btn btn-dark btn-full" disabled={busy}>Add itinerary day <ArrowRight size={16}/></button></form></Modal>}
    {modal === 'activity' && currentTrip && <Modal title="Add a moment." subtitle="Add a stop to the first available itinerary day." onClose={() => setModal("")}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f=new FormData(e.currentTarget); const day=itineraries[0]; if(!day) { setError('Add an itinerary day first.'); setModal('day'); return } action(() => request(`/api/trips/${selected}/itineraries/${day.id}/activities`, { method:'POST', body:JSON.stringify({ title:f.get('title'), description:f.get('description'), location:f.get('location'), startTime:f.get('startTime'), endTime:f.get('endTime'), estimatedCost:f.get('estimatedCost') || 0, displayOrder:(day.activities || []).length }) }), 'Activity added.') }}><Field label="Activity"><input name="title" required placeholder="Sunset boat ride"/></Field><Field label="Location"><input name="location" placeholder="Old harbour"/></Field><Field label="Description"><textarea name="description" rows="2" placeholder="A little detail…"/></Field><div className="form-two"><Field label="Start"><input type="time" name="startTime" required/></Field><Field label="End"><input type="time" name="endTime" required/></Field></div><Field label="Estimated cost"><input type="number" min="0" step=".01" name="estimatedCost" placeholder="0.00"/></Field><button className="btn btn-dark btn-full" disabled={busy}>Save activity <ArrowRight size={16}/></button></form></Modal>}
    {modal === 'expense' && currentTrip && <Modal title="Log a shared expense." subtitle="Add the total and split it across the crew." onClose={() => setModal("")}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f=new FormData(e.currentTarget); const ids=members.map(m=>m.userId).filter(Boolean); const amount=Number(f.get('amount')); action(() => request(`/api/trips/${selected}/expenses`, { method:'POST', body:JSON.stringify({ title:f.get('title'), description:f.get('description'), category:f.get('category'), amount, expenseDate:f.get('expenseDate'), splits:ids.map(userId=>({ userId, shareAmount:Number((amount/ids.length).toFixed(2)) })) }) }), 'Expense saved and split.') }}><Field label="What was it for?"><input name="title" required placeholder="Dinner by the water"/></Field><div className="form-two"><Field label="Category"><select name="category"><option>FOOD</option><option>ACCOMMODATION</option><option>TRANSPORT</option><option>ACTIVITIES</option><option>SHOPPING</option><option>OTHER</option></select></Field><Field label="Total amount"><input type="number" name="amount" min=".01" step=".01" required placeholder="120.00"/></Field></div><Field label="Date"><input name="expenseDate" type="date" required defaultValue={new Date().toISOString().slice(0,10)}/></Field><Field label="Note"><textarea name="description" rows="2" placeholder="Optional details"/></Field><p className="form-hint">This quick split divides the total equally between all current trip members. You can adjust individual shares through the API if needed.</p><button className="btn btn-dark btn-full" disabled={busy || !members.length}>Save expense <ArrowRight size={16}/></button>{!members.length && <p className="form-hint">Add crew members before logging a split expense.</p>}</form></Modal>}
    {modal === 'invite' && currentTrip && <Modal title="Bring your people in." subtitle="Invite a travel companion by email." onClose={() => setModal('')}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f=new FormData(e.currentTarget); action(() => request(`/api/trips/${selected}/invitations`, { method:'POST', body:JSON.stringify({ email:f.get('email'), role:f.get('role') }) }), 'Invitation created.') }}><Field label="Their email"><input name="email" type="email" required placeholder="friend@example.com"/></Field><Field label="Their role"><select name="role"><option>EDITOR</option><option>VIEWER</option></select></Field><p className="form-hint">The backend invitation service handles the invitation workflow. Email delivery depends on your server mail configuration.</p><button className="btn btn-dark btn-full" disabled={busy}>Send invitation <Send size={16}/></button></form></Modal>}
    {modal === 'upload' && currentTrip && <Modal title="Add to the trip folder." subtitle="Keep a copy of the details everyone needs." onClose={() => setModal('')}><form className="form-grid" onSubmit={e => { e.preventDefault(); const f=new FormData(e.currentTarget); action(() => request(`/api/trips/${selected}/documents`, { method:'POST', body:(() => { const d=new FormData(); d.append('file', f.get('file')); return d })() }), 'Document uploaded.') }}><Field label="Choose a file"><input type="file" name="file" required/></Field><p className="form-hint">Maximum file size: 10 MB.</p><button className="btn btn-dark btn-full" disabled={busy}>Upload document <Upload size={16}/></button></form></Modal>}
    <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}><CheckCircle2 size={18}/>{toast}</motion.div>}</AnimatePresence>
  </div>
}

function TripPicker({ trips, selected, onChange }) {
  return <div className="trip-picker"><MapPin size={15}/><select value={selected || ''} onChange={e => onChange(Number(e.target.value))}><option value="">Choose a trip</option>{trips.map(t => <option key={t.id} value={t.id}>{t.title} · {t.destination}</option>)}</select><ChevronDown size={15}/></div>
}

export default function App() {
  const [token, setToken] = useState(readToken())
  const [authMode, setAuthMode] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  function openAuth(mode) { setAuthMode(mode); setShowAuth(true) }
  function logout() { localStorage.removeItem('tripsync_token'); setToken(null) }
  return token ? <Dashboard token={token} onLogout={logout}/> : <><Landing onAuth={openAuth}/>{showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onMode={setAuthMode} onSuccess={t => { setToken(t); setShowAuth(false) }}/>}</>
}