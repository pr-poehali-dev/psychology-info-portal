import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "products" | "cabinet" | "contacts";

const HERO_IMG = "https://cdn.poehali.dev/projects/2fd18fbc-7f17-4b55-9c15-55e92611d57c/files/d92abcc7-12a5-41ef-bb74-479b6ad2f947.jpg";
const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/2fd18fbc-7f17-4b55-9c15-55e92611d57c/files/94d740e1-71db-4c7d-85d8-840413a8f8b9.jpg";

const products = [
  {
    id: 1,
    title: "Cognitive Mastery",
    subtitle: "Complete CBT Guide",
    price: "$49",
    oldPrice: "$89",
    tag: "tag-cyan",
    tagLabel: "Bestseller",
    desc: "A deep dive into Cognitive Behavioral Therapy techniques. Learn to rewire negative thought patterns, overcome anxiety, and build lasting resilience — backed by 40+ scientific studies.",
    features: ["120-page PDF guide", "7 practical worksheets", "Audio meditations", "Lifetime access"],
    icon: "Brain",
    colorIdx: 0,
  },
  {
    id: 2,
    title: "Emotional Intelligence",
    subtitle: "EQ Transformation Program",
    price: "$39",
    oldPrice: "$69",
    tag: "tag-violet",
    tagLabel: "Popular",
    desc: "Master your emotions before they master you. This program reveals the 5 pillars of EQ with actionable frameworks used by top executives and therapists worldwide.",
    features: ["98-page eBook", "Self-assessment tools", "Video masterclass", "Community access"],
    icon: "Heart",
    colorIdx: 1,
  },
  {
    id: 3,
    title: "Relationship Blueprint",
    subtitle: "Attachment & Bonding Science",
    price: "$59",
    oldPrice: "$99",
    tag: "tag-pink",
    tagLabel: "New",
    desc: "Understand attachment theory, decode relationship patterns, and build deeply fulfilling connections. Research-backed strategies for romantic, professional and family bonds.",
    features: ["150-page guide", "Partner exercises", "3 live Q&A sessions", "Private journal prompts"],
    icon: "Users",
    colorIdx: 2,
  },
  {
    id: 4,
    title: "Stress Decoded",
    subtitle: "Neuroscience of Calm",
    price: "$29",
    oldPrice: "$49",
    tag: "tag-cyan",
    tagLabel: "Quick Start",
    desc: "Science-backed stress management using the latest neuroscience. Includes somatic techniques, breathwork protocols, and a 21-day nervous system reset program.",
    features: ["75-page eBook", "21-day challenge", "Audio exercises", "Progress tracker"],
    icon: "Zap",
    colorIdx: 0,
  },
  {
    id: 5,
    title: "Shadow Work Journal",
    subtitle: "Jungian Self-Discovery",
    price: "$25",
    oldPrice: "$45",
    tag: "tag-violet",
    tagLabel: "Trending",
    desc: "Journey into your unconscious. Guided prompts and frameworks drawn from Jungian psychology to uncover hidden beliefs, heal old wounds, and unlock your authentic self.",
    features: ["200 journal prompts", "Integration exercises", "Archetype mapping", "PDF + printable"],
    icon: "Moon",
    colorIdx: 1,
  },
  {
    id: 6,
    title: "MindShift Bundle",
    subtitle: "All 5 Products — Best Value",
    price: "$149",
    oldPrice: "$291",
    tag: "tag-pink",
    tagLabel: "Save 49%",
    desc: "Everything you need for a complete psychological transformation. Get all 5 premium products at a massive discount — the full MindShift system in one package.",
    features: ["All 5 products", "Bonus masterclass", "1-on-1 consultation", "Priority support"],
    icon: "Sparkles",
    colorIdx: 2,
  },
];

const whyUs = [
  { icon: "FlaskConical", title: "Evidence-Based Only", desc: "Every method is rooted in peer-reviewed research and validated clinical practice — no pseudoscience, ever." },
  { icon: "Target", title: "Practical & Actionable", desc: "Not just theory. Each product includes step-by-step tools you can use the same day you get them." },
  { icon: "ShieldCheck", title: "Proven Results", desc: "Over 12,000 students across 40+ countries report measurable improvements in just 3 weeks of practice." },
  { icon: "Clock", title: "Learn at Your Pace", desc: "Lifetime access to all purchased materials. Revisit any time, from any device, with no subscriptions." },
  { icon: "Star", title: "Expert Curated", desc: "Content created and reviewed by licensed psychologists with 10+ years of clinical experience." },
  { icon: "Lock", title: "Secure Payments", desc: "All transactions are protected with bank-level encryption. We support Stripe, PayPal, and 50+ local methods." },
];

const testimonials = [
  { name: "Sarah M.", role: "Therapist, New York", text: "MindShift's CBT guide is the most practical resource I've seen. I recommend it to all my clients.", stars: 5 },
  { name: "David K.", role: "Entrepreneur, London", text: "The EQ program completely transformed how I lead my team. ROI in the first week.", stars: 5 },
  { name: "Yuki T.", role: "Student, Tokyo", text: "Shadow Work Journal helped me heal patterns I'd carried for 20 years. Incredible value.", stars: 5 },
];

const purchases = [
  { product: "Cognitive Mastery", date: "Apr 12, 2026", status: "Active", price: "$49" },
  { product: "Shadow Work Journal", date: "Mar 28, 2026", status: "Active", price: "$25" },
];

const CARD_COLORS = [
  { bg: "rgba(0,255,209,0.08)", border: "rgba(0,255,209,0.25)", icon: "var(--neon-cyan)", btn: "linear-gradient(135deg,#00FFD1,#00B4D8)", btnShadow: "0 0 20px rgba(0,255,209,0.4)" },
  { bg: "rgba(155,93,229,0.08)", border: "rgba(155,93,229,0.25)", icon: "#C084FC", btn: "linear-gradient(135deg,#9B5DE5,#6D28D9)", btnShadow: "0 0 20px rgba(155,93,229,0.4)" },
  { bg: "rgba(241,91,181,0.08)", border: "rgba(241,91,181,0.25)", icon: "#F15BB5", btn: "linear-gradient(135deg,#F15BB5,#9B5DE5)", btnShadow: "0 0 20px rgba(241,91,181,0.4)" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Products", page: "products" },
    { label: "Cabinet", page: "cabinet" },
    { label: "Contacts", page: "contacts" },
  ];

  return (
    <div className="min-h-screen text-white relative" style={{ background: "hsl(225,20%,5%)" }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(155,93,229,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,255,209,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(241,91,181,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(8,9,18,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,209,0.08)" }}>
        <button onClick={() => nav("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00FFD1,#9B5DE5)", boxShadow: "0 0 16px rgba(0,255,209,0.5)" }}>
            <Icon name="Brain" size={15} className="text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "Syne,sans-serif", color: "#00FFD1", textShadow: "0 0 16px rgba(0,255,209,0.5)" }}>MindShift</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => nav(item.page)}
              className="text-sm font-medium transition-all duration-300 relative group"
              style={{ color: page === item.page ? "#00FFD1" : "rgba(255,255,255,0.55)", fontFamily: "DM Sans,sans-serif" }}>
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                style={{ background: "#00FFD1", width: page === item.page ? "100%" : "0%" }} />
            </button>
          ))}
        </div>

        <button className="hidden md:block px-5 py-2 rounded-full text-sm font-bold transition-all"
          style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 20px rgba(0,255,209,0.35)" }}
          onClick={() => nav("products")}>
          Get Started
        </button>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "#00FFD1" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-16 px-6 flex flex-col gap-4"
          style={{ background: "rgba(8,9,18,0.97)", backdropFilter: "blur(20px)" }}>
          {navItems.map((item) => (
            <button key={item.page} onClick={() => nav(item.page)}
              className="text-2xl font-bold text-left py-4 border-b"
              style={{ fontFamily: "Syne,sans-serif", borderColor: "rgba(0,255,209,0.1)", color: page === item.page ? "#00FFD1" : "white" }}>
              {item.label}
            </button>
          ))}
          <button className="mt-4 py-3 rounded-full font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif" }}
            onClick={() => nav("products")}>
            Get Started
          </button>
        </div>
      )}

      {/* ===================== HOME ===================== */}
      {page === "home" && (
        <div className="relative z-10">
          {/* Hero */}
          <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
              <div style={{ animation: "slide-up 0.7s ease-out both" }}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-widest"
                  style={{ background: "rgba(0,255,209,0.1)", border: "1px solid rgba(0,255,209,0.3)", color: "#00FFD1", fontFamily: "Syne,sans-serif" }}>
                  🧠 PSYCHOLOGY · SCIENCE · GROWTH
                </span>
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "Syne,sans-serif" }}>
                  Transform Your<br />
                  <span style={{ color: "#00FFD1", textShadow: "0 0 30px rgba(0,255,209,0.5)" }}>Mind.</span><br />
                  <span style={{ color: "#C084FC" }}>Unlock Your</span><br />
                  <span style={{ color: "#F15BB5" }}>Potential.</span>
                </h1>
                <p className="text-base md:text-lg mb-8 max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "DM Sans,sans-serif" }}>
                  Premium psychology knowledge, distilled into actionable guides, courses and journals.
                  Evidence-based. Beautifully designed. Life-changing results.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button onClick={() => nav("products")}
                    className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 30px rgba(0,255,209,0.45)" }}>
                    Explore Products
                  </button>
                  <button onClick={() => nav("contacts")}
                    className="px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
                    style={{ border: "1.5px solid #00FFD1", color: "#00FFD1", fontFamily: "Syne,sans-serif", background: "rgba(0,255,209,0.05)" }}>
                    Talk to Us
                  </button>
                </div>

                <div className="flex gap-8 mt-12 flex-wrap">
                  {[["12,000+", "Students"], ["4.9★", "Rating"], ["40+", "Countries"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="text-2xl font-bold" style={{ fontFamily: "Syne,sans-serif", color: "#00FFD1", textShadow: "0 0 16px rgba(0,255,209,0.5)" }}>{val}</div>
                      <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden md:block" style={{ animation: "fade-in-scale 0.8s ease-out 0.3s both" }}>
                <div style={{ animation: "float 5s ease-in-out infinite" }}>
                  <img src={HERO_IMG} alt="Psychology mind art"
                    className="w-full rounded-3xl object-cover"
                    style={{ maxHeight: 500, border: "1px solid rgba(0,255,209,0.15)", boxShadow: "0 0 60px rgba(0,255,209,0.12), 0 0 120px rgba(155,93,229,0.08)" }} />
                </div>
                <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl flex items-center gap-2"
                  style={{ background: "rgba(8,9,18,0.9)", border: "1px solid rgba(0,255,209,0.25)", backdropFilter: "blur(12px)", animation: "float 5s ease-in-out 1s infinite" }}>
                  <Icon name="TrendingUp" size={15} style={{ color: "#00FFD1" }} />
                  <span className="text-sm font-semibold">New purchase every 4 min</span>
                </div>
              </div>
            </div>
          </section>

          {/* Ticker */}
          <div className="overflow-hidden py-5" style={{ borderTop: "1px solid rgba(0,255,209,0.08)", borderBottom: "1px solid rgba(0,255,209,0.08)", background: "rgba(0,255,209,0.02)" }}>
            <div className="flex gap-16 whitespace-nowrap w-max" style={{ animation: "ticker 30s linear infinite" }}>
              {["Cognitive Behavioral Therapy", "Emotional Intelligence", "Attachment Theory", "Neuroscience of Stress", "Shadow Work", "Jungian Psychology", "Mindfulness Science", "Positive Psychology", "Cognitive Behavioral Therapy", "Emotional Intelligence", "Attachment Theory", "Neuroscience of Stress", "Shadow Work", "Jungian Psychology", "Mindfulness Science", "Positive Psychology"].map((t, i) => (
                <span key={i} className="text-xs font-semibold tracking-widest flex items-center gap-4"
                  style={{ color: i % 2 === 0 ? "#00FFD1" : "rgba(255,255,255,0.35)", fontFamily: "Syne,sans-serif" }}>
                  {t.toUpperCase()} <span style={{ color: "rgba(0,255,209,0.25)" }}>◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-widest"
                style={{ background: "rgba(155,93,229,0.1)", border: "1px solid rgba(155,93,229,0.3)", color: "#C084FC", fontFamily: "Syne,sans-serif" }}>
                WHY MINDSHIFT?
              </span>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Syne,sans-serif" }}>
                The Difference That<br />
                <span style={{ color: "#C084FC" }}>Changes Everything</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {whyUs.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl transition-all duration-400 cursor-default group"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,209,0.25)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(0,255,209,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,255,209,0.08)", border: "1px solid rgba(0,255,209,0.15)" }}>
                    <Icon name={item.icon} size={20} style={{ color: "#00FFD1" }} />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Syne,sans-serif" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "DM Sans,sans-serif" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-widest"
                  style={{ background: "rgba(241,91,181,0.1)", border: "1px solid rgba(241,91,181,0.3)", color: "#F15BB5", fontFamily: "Syne,sans-serif" }}>
                  SOCIAL PROOF
                </span>
                <h2 className="text-4xl font-bold" style={{ fontFamily: "Syne,sans-serif" }}>
                  Real People.<br /><span style={{ color: "#F15BB5" }}>Real Transformation.</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-6 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(155,93,229,0.2)" }}>
                    <div className="flex mb-3">
                      {Array(t.stars).fill(0).map((_, si) => (
                        <span key={si} style={{ color: "#FEE440", fontSize: "0.9rem" }}>★</span>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans,sans-serif" }}>"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#00FFD1,#9B5DE5)", color: "#0a0b12" }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{t.name}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 px-6 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Syne,sans-serif" }}>
                Start Your Journey<br />
                <span style={{ color: "#00FFD1", textShadow: "0 0 30px rgba(0,255,209,0.5)" }}>Today.</span>
              </h2>
              <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans,sans-serif" }}>
                Join 12,000+ people who have already transformed their psychology with MindShift materials.
              </p>
              <button onClick={() => nav("products")}
                className="px-10 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 40px rgba(0,255,209,0.4)" }}>
                Browse All Products →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ===================== PRODUCTS ===================== */}
      {page === "products" && (
        <div className="relative z-10 pt-28 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-widest"
              style={{ background: "rgba(0,255,209,0.1)", border: "1px solid rgba(0,255,209,0.3)", color: "#00FFD1", fontFamily: "Syne,sans-serif" }}>
              OUR LIBRARY
            </span>
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "Syne,sans-serif" }}>
              Premium Psychology<br />
              <span style={{ color: "#00FFD1", textShadow: "0 0 30px rgba(0,255,209,0.5)" }}>Knowledge Store</span>
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "DM Sans,sans-serif" }}>
              Each product is crafted by licensed psychologists and designed to deliver tangible results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => {
              const c = CARD_COLORS[p.colorIdx];
              return (
                <div key={p.id} className="rounded-2xl overflow-hidden flex flex-col transition-all duration-400"
                  style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${c.border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${c.bg}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                        <Icon name={p.icon} size={22} style={{ color: c.icon }} />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wider"
                        style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.icon, fontFamily: "Syne,sans-serif" }}>
                        {p.tagLabel}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "Syne,sans-serif" }}>{p.title}</h3>
                    <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans,sans-serif" }}>{p.subtitle}</p>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.58)", fontFamily: "DM Sans,sans-serif" }}>{p.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {p.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans,sans-serif" }}>
                          <Icon name="Check" size={13} style={{ color: c.icon, flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold" style={{ fontFamily: "Syne,sans-serif", color: c.icon }}>{p.price}</span>
                      <span className="text-sm ml-2 line-through" style={{ color: "rgba(255,255,255,0.28)" }}>{p.oldPrice}</span>
                    </div>
                    <button className="px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                      style={{ background: c.btn, color: "white", fontFamily: "Syne,sans-serif", boxShadow: c.btnShadow }}>
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Products image banner */}
          <div className="mt-16 rounded-3xl overflow-hidden relative" style={{ border: "1px solid rgba(0,255,209,0.12)" }}>
            <img src={PRODUCTS_IMG} alt="Product collection" className="w-full object-cover" style={{ maxHeight: 280 }} />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(8,9,18,0.7)" }}>
              <div className="text-center px-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 tracking-widest"
                  style={{ background: "rgba(241,91,181,0.15)", border: "1px solid rgba(241,91,181,0.4)", color: "#F15BB5", fontFamily: "Syne,sans-serif" }}>
                  LIMITED OFFER
                </span>
                <h3 className="text-3xl font-bold mt-1" style={{ fontFamily: "Syne,sans-serif" }}>
                  Bundle & Save <span style={{ color: "#00FFD1", textShadow: "0 0 20px rgba(0,255,209,0.5)" }}>49%</span>
                </h3>
                <p className="text-sm mt-2 mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>Get all 5 products for $149 instead of $291</p>
                <button className="px-8 py-3 rounded-full font-bold hover:scale-105 transition-all"
                  style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 30px rgba(0,255,209,0.4)" }}>
                  Get the Bundle →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CABINET ===================== */}
      {page === "cabinet" && (
        <div className="relative z-10 pt-28 pb-24 px-6 max-w-xl mx-auto">
          {!loggedIn ? (
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(0,255,209,0.2)" }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(0,255,209,0.1)", border: "1px solid rgba(0,255,209,0.25)" }}>
                  <Icon name="User" size={28} style={{ color: "#00FFD1" }} />
                </div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "Syne,sans-serif" }}>Personal Cabinet</h2>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>Sign in to access your purchases</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.45)" }}>Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,209,0.18)", fontFamily: "DM Sans,sans-serif" }} />
                </div>
                <div>
                  <label className="text-xs font-medium mb-2 block" style={{ color: "rgba(255,255,255,0.45)" }}>Password</label>
                  <input value={password} onChange={e => setPassword(e.target.value)}
                    type="password" placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,209,0.18)", fontFamily: "DM Sans,sans-serif" }} />
                </div>
                <button className="w-full py-3 rounded-xl font-bold text-sm mt-2 hover:scale-[1.02] transition-all"
                  style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 25px rgba(0,255,209,0.35)" }}
                  onClick={() => setLoggedIn(true)}>
                  Sign In
                </button>
                <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "DM Sans,sans-serif" }}>
                  No account?{" "}
                  <button className="hover:underline" style={{ color: "#00FFD1" }}>Create one free</button>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold" style={{ fontFamily: "Syne,sans-serif" }}>My Cabinet</h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans,sans-serif" }}>Welcome back, {email || "User"}</p>
                </div>
                <button onClick={() => setLoggedIn(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                  style={{ border: "1.5px solid #00FFD1", color: "#00FFD1", fontFamily: "Syne,sans-serif", background: "rgba(0,255,209,0.05)" }}>
                  Sign Out
                </button>
              </div>

              <div className="p-6 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(0,255,209,0.18)" }}>
                <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "Syne,sans-serif" }}>
                  <Icon name="ShoppingBag" size={16} style={{ color: "#00FFD1" }} />
                  My Purchases
                </h3>
                <div className="space-y-3">
                  {purchases.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl"
                      style={{ background: "rgba(0,255,209,0.04)", border: "1px solid rgba(0,255,209,0.1)" }}>
                      <div>
                        <div className="font-semibold text-sm">{p.product}</div>
                        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans,sans-serif" }}>{p.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm" style={{ color: "#00FFD1", fontFamily: "Syne,sans-serif" }}>{p.price}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: "rgba(0,255,209,0.1)", border: "1px solid rgba(0,255,209,0.25)", color: "#00FFD1" }}>
                          {p.status}
                        </span>
                        <button style={{ color: "#00FFD1" }}>
                          <Icon name="Download" size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 25px rgba(0,255,209,0.3)" }}
                onClick={() => nav("products")}>
                Browse More Products
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===================== CONTACTS ===================== */}
      {page === "contacts" && (
        <div className="relative z-10 pt-28 pb-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-widest"
              style={{ background: "rgba(241,91,181,0.1)", border: "1px solid rgba(241,91,181,0.3)", color: "#F15BB5", fontFamily: "Syne,sans-serif" }}>
              GET IN TOUCH
            </span>
            <h2 className="text-5xl font-bold" style={{ fontFamily: "Syne,sans-serif" }}>
              We're Here to<br /><span style={{ color: "#F15BB5" }}>Help You Grow</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(0,255,209,0.18)" }}>
              {!contactSent ? (
                <>
                  <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "Syne,sans-serif" }}>Send a Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>Your Name</label>
                      <input value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,209,0.15)", fontFamily: "DM Sans,sans-serif" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>Email</label>
                      <input value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        type="email" placeholder="alex@email.com"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,209,0.15)", fontFamily: "DM Sans,sans-serif" }} />
                    </div>
                    <div>
                      <label className="text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>Message</label>
                      <textarea value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4} placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,209,0.15)", fontFamily: "DM Sans,sans-serif" }} />
                    </div>
                    <button className="w-full py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                      style={{ background: "linear-gradient(135deg,#00FFD1,#00B4D8)", color: "#0a0b16", fontFamily: "Syne,sans-serif", boxShadow: "0 0 25px rgba(0,255,209,0.35)" }}
                      onClick={() => setContactSent(true)}>
                      Send Message →
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(0,255,209,0.12)", border: "1px solid rgba(0,255,209,0.35)", boxShadow: "0 0 30px rgba(0,255,209,0.3)" }}>
                    <Icon name="Check" size={28} style={{ color: "#00FFD1" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Syne,sans-serif" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.48)", fontFamily: "DM Sans,sans-serif" }}>We'll get back to you within 24 hours.</p>
                  <button className="mt-6 px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all"
                    style={{ border: "1.5px solid #00FFD1", color: "#00FFD1", fontFamily: "Syne,sans-serif", background: "rgba(0,255,209,0.05)" }}
                    onClick={() => setContactSent(false)}>
                    Send Another
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {[
                { icon: "Mail", label: "Email", val: "hello@mindshift.app" },
                { icon: "MessageCircle", label: "Live Chat", val: "Available Mon–Fri, 9am–6pm EST" },
                { icon: "MapPin", label: "Location", val: "Remote-first — serving the world" },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl flex items-center gap-4"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,255,209,0.08)", border: "1px solid rgba(0,255,209,0.15)" }}>
                    <Icon name={c.icon} size={18} style={{ color: "#00FFD1" }} />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans,sans-serif" }}>{c.label}</div>
                    <div className="font-semibold text-sm">{c.val}</div>
                  </div>
                </div>
              ))}

              <div className="p-6 rounded-2xl" style={{ background: "rgba(155,93,229,0.06)", border: "1px solid rgba(155,93,229,0.2)" }}>
                <h4 className="font-bold mb-3" style={{ fontFamily: "Syne,sans-serif" }}>
                  <Icon name="ShieldCheck" size={15} style={{ color: "#C084FC", display: "inline", marginRight: 6 }} />
                  Payment Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Stripe", "PayPal", "Visa", "Mastercard", "Apple Pay"].map((pm) => (
                    <span key={pm} className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(155,93,229,0.1)", border: "1px solid rgba(155,93,229,0.25)", color: "#C084FC", fontFamily: "Syne,sans-serif" }}>
                      {pm}
                    </span>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans,sans-serif" }}>
                  All transactions are encrypted with 256-bit SSL. Your payment data is never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(0,255,209,0.08)" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00FFD1,#9B5DE5)" }}>
            <Icon name="Brain" size={12} className="text-black" />
          </div>
          <span className="font-bold" style={{ fontFamily: "Syne,sans-serif", color: "#00FFD1", textShadow: "0 0 12px rgba(0,255,209,0.4)" }}>MindShift</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "DM Sans,sans-serif" }}>
          © 2026 MindShift. Premium Psychology Knowledge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}