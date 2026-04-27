'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  FlaskConical, 
  Leaf, 
  Eye, 
  Droplets, 
  Beaker,
  CheckCheck,
  ArrowRight,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Instagram,
  ImageOff,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Utility Components ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/20 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Data ---

const brand = {
  name: "Jommy Naturals",
  tagline: "Purity in Every Drop, Potency in Every Batch",
  description: "Abuja's premier niche supplier of authentic organic raw materials for the beauty and cosmetic industry. We bridge the gap between nature's rarest offerings and your skincare formulations.",
  industry: "beauty",
  region: "nigeria"
};

const products = [
  { name: "Premium Python Oil", description: "Ethically sourced, high-clarity python oil ideal for advanced dermatological formulations.", price: "Price on Request", image: "https://picsum.photos/seed/beauty2/800/1000" },
  { name: "Pure Python Fat", description: "Authentic, unrefined fat rich in essential fatty acids for deep tissue skin repair products.", price: "Price on Request", image: "https://picsum.photos/seed/beauty3/800/1000" },
  { name: "Grade A Cold-Pressed Neem", description: "Highly potent organic neem oil sourced from the northern belts, perfect for acne-focused ranges.", price: "Price on Request", image: "https://picsum.photos/seed/beauty4/800/1000" },
  { name: "Artisanal Shea Concentrate", description: "Triple-filtered unrefined shea butter with maximum bioactive retention for luxury body butters.", price: "Price on Request", image: "https://picsum.photos/seed/beauty5/800/1000" }
];

const features = [
  { title: "Certified Authenticity", description: "Every batch of our python oil and fat is verified for purity and traditional extraction standards.", icon: <ShieldCheck className="w-6 h-6" /> },
  { title: "Formulation Ready", description: "Materials processed specifically to ensure stability and compatibility in cosmetic chemistry.", icon: <Beaker className="w-6 h-6" /> },
  { title: "Ethical Sourcing", description: "We maintain a transparent supply chain that respects local ecosystems and traditional knowledge.", icon: <Leaf className="w-6 h-6" /> }
];

const processSteps = [
  { number: "01", title: "Ethical Collection", description: "Materials are gathered through sustainable channels following strict niche supplier protocols." },
  { number: "02", title: "Cold-Extraction", description: "We utilize low-heat methods to ensure bioactive compounds like Vitamin E and Omega acids remain intact." },
  { number: "03", title: "Quality Validation", description: "Each batch is inspected for viscosity, color, and scent profile before being released for sale." }
];

const stats = [
  { number: "100%", label: "Pure Materials" },
  { number: "500+", label: "Formulators Served" },
  { number: "24hr", label: "Dispatch Time" }
];

const testimonials = [
  { name: "Dr. Amina Bello", role: "Lead Chemist, Abuja Organics", text: "The consistency of the python oil from Jommy Naturals is unmatched in the market. It transformed our healing balm line." },
  { name: "Emeka Nwosu", role: "Founder, LuxeSkin Labs", text: "Finally, a supplier that understands sourcing transparency. Their neem oil is the cleanest I have used in 10 years." }
];

// --- Sections ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <span className="font-heading font-bold text-primary text-xl">JN</span>
          </div>
          <span className="font-heading font-bold text-white text-2xl tracking-tight hidden sm:block">Jommy Naturals</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Materials', 'Story', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/80 hover:text-accent transition-colors uppercase tracking-widest">{item}</a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">Request Catalog</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary shadow-2xl transition-transform duration-500 flex flex-col p-10 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button className="self-end text-white mb-12" onClick={() => setMobileOpen(false)}>
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Home', 'Materials', 'Story', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block text-3xl font-heading text-white">{item}</a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-block mt-4 bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg w-full text-center">Request Catalog</a>
          </div>
          <div className="mt-auto">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Location</p>
            <p className="text-white/80">Abuja, Nigeria</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden pt-20">
      <div className="flex flex-col justify-center px-8 md:px-20 py-20 relative">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-80">Premium Raw Materials</p>
          <h1 className="font-heading text-6xl md:text-[5.5rem] font-bold text-white leading-[0.95] tracking-tight">
            The Gold Standard of <br />
            <span className="italic text-accent">Raw Potency</span>
          </h1>
          <p className="text-white/60 mt-8 text-xl max-w-lg leading-relaxed font-light">
            Supplying Abuja&apos;s elite formulators with authentic animal-derived oils and botanical extracts. No fillers, no compromises.
          </p>
          <div className="flex gap-6 mt-12 flex-wrap">
            <a href="#contact" className="bg-accent text-primary px-10 py-4 font-bold text-base hover:brightness-110 hover:scale-[1.02] transition-all duration-300 rounded-full shadow-lg shadow-black/20">
              Request Catalog
            </a>
            <a href="#materials" className="border border-white/20 text-white px-10 py-4 font-medium text-base hover:bg-white/5 transition-all duration-300 rounded-full">
              Explore Materials
            </a>
          </div>
          <div className="mt-20 flex gap-12 border-t border-white/10 pt-10">
            {stats.slice(0, 2).map((s, i) => (
              <div key={i}>
                <p className="font-heading text-4xl font-bold text-white">{s.number}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={ref as any} className="relative min-h-[40vh] md:min-h-full overflow-hidden">
        <SafeImage 
          src="https://picsum.photos/seed/forest1/1200/1600" 
          alt="Premium raw oils texture" 
          fill 
          className={`object-cover transition-all duration-[2000ms] ease-out ${isVisible ? 'scale-100 scale-x-100' : 'scale-110 scale-x-0'}`} 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
      </div>
    </section>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto opacity-30">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="features" ref={ref as any} className="py-28 px-6 bg-secondary text-primary">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold leading-tight">Why Formulators Trust Jommy Naturals</h2>
          </div>
          <div className="pb-2">
            <p className="text-primary/60 text-lg max-w-md">Uncompromising standards for the personal care industry, ensuring sharp delivery of active compounds.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-8">
                {f.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-primary/60 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="process" ref={ref as any} className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">Signature Quality</p>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-10">Sourcing Transparency</h2>
            <div className="space-y-12 relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-white/10" />
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 relative z-10 transition-colors group-hover:bg-accent group-hover:text-primary">
                    <span className="font-mono text-xs font-bold text-accent group-hover:text-primary transition-colors">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                    <p className="text-white/40 leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[4/5] rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src="https://picsum.photos/seed/forest7/1000/1250" alt="Process demonstration" fill className="object-cover" />
            <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <p className="text-white text-lg italic leading-relaxed">&ldquo;Authenticity isn&apos;t a marketing buzzword for us—it is the foundation of our supply chain.&rdquo;</p>
              <p className="text-accent text-sm font-mono mt-4 uppercase tracking-widest">Jommy Naturals Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Materials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="materials" ref={ref as any} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-6">Our Material Catalog</h2>
          <p className="text-primary/50 text-lg max-w-xl mx-auto">Discover rare ingredients that elevate your cosmetic brand&apos;s performance with proper organic potency.</p>
        </div>
        
        <div className="space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-sm font-bold tracking-widest uppercase mb-4 block">Material Selection 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">{p.name}</h3>
                <p className="text-primary/60 mt-5 text-xl leading-relaxed font-light">{p.description}</p>
                <div className="mt-10 flex flex-col gap-6 items-start md:items-inherit">
                  <span className="text-3xl font-heading font-bold text-primary border-b-2 border-accent pb-1">{p.price}</span>
                  <a href="#contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center gap-3 group w-fit">
                    Enquire Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="story" ref={ref as any} className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-10 leading-[0.95]">Authenticity is <br />Our <span className="italic text-accent underline decoration-accent/20 underline-offset-8">Signature</span></h2>
            <p className="text-white/60 text-xl leading-relaxed font-light mb-12 max-w-xl">
              Jommy Naturals was founded on a simple realization: the skincare industry in Nigeria deserves better than diluted materials. Based in the heart of Abuja, we have built a reputation as the most trusted niche supplier.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <p className="font-heading text-5xl font-bold text-accent mb-2">{s.number}</p>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-sm">
            <h3 className="font-heading text-3xl text-white mb-8">Our Abuja Presence</h3>
            <p className="text-white/50 mb-8 leading-relaxed italic">
              &ldquo;Based in the FCT, we serve a nationwide clientele of high-end formulators and boutique beauty brands who require sharp delivery and uncompromising purity.&rdquo;
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/70">
                <MapPin className="text-accent" size={20} />
                <span>Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Phone className="text-accent" size={20} />
                <span>+234 WhatsApp Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-28 px-6 bg-accent/5">
      <div className="max-w-6xl mx-auto" ref={ref as any}>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary text-center mb-20">Formulator Feedback</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className={`bg-white p-12 rounded-[2.5rem] border border-accent/20 shadow-sm relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent" />)}
              </div>
              <p className="text-primary/70 text-xl italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-5 pt-8 border-t border-accent/10">
                <div className="w-14 h-14 rounded-full bg-primary text-accent flex items-center justify-center font-heading text-2xl font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-primary">{t.name}</p>
                  <p className="text-primary/40 text-sm font-medium uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref as any} className="py-28 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-80">Order Now</p>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-6">Secure Your Batch</h2>
        <p className="text-primary/50 mb-12 text-lg max-w-lg mx-auto">Connect directly with our sourcing team to request a material catalog or place a wholesale order.</p>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {sent ? (
            <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white rounded-[2.5rem] border border-accent/30 shadow-2xl">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-8 border border-accent/40 relative animate-float">
                <CheckCheck size={40} className="text-primary" />
              </div>
              <h3 className="font-heading text-4xl font-bold text-primary mb-4">Request Received</h3>
              <p className="text-primary/60 max-w-sm text-lg">Thank you. Our dispatch team will contact you shortly to confirm current batch availability.</p>
              <button onClick={() => setSent(false)} className="mt-10 text-primary font-bold hover:text-accent transition-colors">Send another enquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 md:p-14 rounded-[2.5rem] border border-accent/20 shadow-xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid sm:grid-cols-2 gap-6 mb-6">
                {(['name', 'email'] as const).map(field => (
                  <div key={field} className="relative group">
                    <label className="block text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-2 ml-1">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required
                      className="w-full bg-secondary/50 border border-primary/5 rounded-2xl px-6 py-4 text-primary placeholder-primary/20 text-sm outline-none transition-all focus:border-accent focus:bg-white"
                    />
                  </div>
                ))}
              </div>
              <div className="relative z-10 grid sm:grid-cols-1 gap-6 mb-6">
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-2 ml-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-secondary/50 border border-primary/5 rounded-2xl px-6 py-4 text-primary placeholder-primary/20 text-sm outline-none transition-all focus:border-accent focus:bg-white"
                  />
                </div>
                <div className="relative group">
                  <label className="block text-[10px] uppercase tracking-widest text-primary/40 font-bold mb-2 ml-1">Materials of Interest</label>
                  <textarea rows={4}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-secondary/50 border border-primary/5 rounded-2xl px-6 py-4 text-primary placeholder-primary/20 text-sm outline-none resize-none transition-all focus:border-accent focus:bg-white"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:brightness-110 shadow-lg transition-all disabled:opacity-60 flex justify-center items-center gap-3 group">
                {loading ? <Loader2 className="animate-spin" /> : <>Send Enquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary pt-28 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <span className="font-heading font-bold text-primary text-2xl">JN</span>
            </div>
            <span className="font-heading font-bold text-white text-3xl tracking-tight">Jommy Naturals</span>
          </div>
          <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
            The gold standard for high-end cosmetic raw materials in Nigeria. Authentic, potent, and ethically sourced.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.link/m86z06" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all">
              <Phone size={18} />
            </a>
            <a href="https://instagram.com/jommy_naturals" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading text-xl text-white font-bold mb-8">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Materials', 'Story', 'Transparency', 'Contact'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-accent transition-colors text-sm uppercase tracking-widest">{link}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-heading text-xl text-white font-bold mb-8">Abuja HQ</h4>
          <p className="text-white/40 text-sm leading-relaxed mb-4 flex items-start gap-3">
            <MapPin size={16} className="shrink-0 mt-1" />
            Abuja, Federal Capital Territory, Nigeria
          </p>
          <p className="text-white/40 text-sm flex items-start gap-3">
            <Mail size={16} className="shrink-0 mt-1" />
            jommy.naturals@email.com
          </p>
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Jommy Naturals. Proper Organic Potency.
        </p>
        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
          Crafted for Abuja&apos;s Elite Formulators
        </p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <SectionDivider />
      <Features />
      <Process />
      <Materials />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}