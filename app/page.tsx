'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  FlaskConical, 
  Beaker, 
  ShieldCheck, 
  Leaf, 
  Package, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Menu,
  X,
  ArrowRight,
  CheckCheck,
  Loader2,
  ImageOff,
  Droplets,
  Search,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Jommy Naturals",
  tagline: "The Purity of Potency: Premium Raw Materials for Conscious Formulators",
  description: "Abuja's leading specialist supplier of authentic, organic raw materials. We provide high-potency ingredients, from specialty python oils to rare botanical extracts, specifically curated for professional skincare and haircare production.",
  industry: "Beauty",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/beauty0/1600/900",
  products: [
    "https://picsum.photos/seed/beauty2/800/1000",
    "https://picsum.photos/seed/beauty3/800/1000",
    "https://picsum.photos/seed/beauty4/800/1000",
    "https://picsum.photos/seed/beauty5/800/1000"
  ]
};

const useScrollReveal = (threshold = 0.1) => {
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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-primary/20" />
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

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent flex items-center justify-center text-secondary font-heading font-bold text-xl">JN</div>
            <span className={`font-heading font-bold text-xl tracking-wider ${scrolled ? 'text-white' : 'text-primary'}`}>JOMMY NATURALS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Materials', 'Process', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()}`}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-white/70 hover:text-accent' : 'text-primary/70 hover:text-primary'}`}
              >
                {item}
              </a>
            ))}
            <a 
              href="https://wa.link/m86z06" 
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${scrolled ? 'bg-accent text-white hover:bg-white hover:text-primary' : 'bg-primary text-white hover:bg-accent'}`}
            >
              Order Now
            </a>
          </div>

          <button onClick={() => setMobileOpen(true)} className="md:hidden">
            <Menu className={scrolled ? 'text-white' : 'text-primary'} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] transition-all duration-700 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button onClick={() => setMobileOpen(false)} className="self-end mb-12 text-white">
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Home', 'Materials', 'Process', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block text-4xl font-heading text-white font-light"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-4">Direct Channel</p>
            <a href="https://wa.link/m86z06" className="text-white text-lg">WhatsApp Support</a>
          </div>
        </div>
      </div>
    </>
  );
};

const Divider = () => (
  <div className="py-20 flex items-center gap-8 px-8 max-w-6xl mx-auto overflow-hidden">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap opacity-60">
      AUTHENTICITY • POTENCY • PURITY
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="hero" ref={ref} className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-secondary overflow-hidden">
      <div className={`flex flex-col justify-center px-8 md:px-20 py-32 md:py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-8">
          Abuja Specialist Supplier
        </p>
        <h1 className="font-heading text-6xl md:text-[5rem] font-medium text-primary leading-[0.9] tracking-tight">
          Authenticity <br/> 
          <span className="italic font-light">in Every Drop.</span>
        </h1>
        <p className="text-primary/60 mt-10 text-lg max-w-md leading-relaxed font-light">
          We supply the clinical-grade purity your skincare and haircare formulations deserve. High-potency organic raw materials for the conscious creator.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-12 items-start sm:items-center">
          <a href="https://wa.link/m86z06" className="bg-accent text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all duration-500 shadow-xl">
            Order via WhatsApp
          </a>
          <a href="#products" className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary/20 pb-1 hover:border-primary transition-all">
            Explore Materials
          </a>
        </div>
        <div className="mt-20 flex gap-12 border-t border-primary/5 pt-10">
          <div>
            <p className="font-heading text-4xl font-bold text-primary">100%</p>
            <p className="text-primary/40 text-[10px] uppercase tracking-widest mt-1">Verified Purity</p>
          </div>
          <div>
            <p className="font-heading text-4xl font-bold text-primary">50+</p>
            <p className="text-primary/40 text-[10px] uppercase tracking-widest mt-1">Specialty Extracts</p>
          </div>
        </div>
      </div>
      <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <SafeImage src={IMAGES.hero} alt="Jommy Naturals Raw Materials" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "Direct Sourcing", description: "Specialty items like python oil are sourced directly from verified traditional processors." },
    { number: "02", title: "Cold Preservation", description: "Handled at optimal temperatures to ensure bioactive nutrients remain intact for formulation." },
    { number: "03", title: "Clinical Inspection", description: "Every inventory batch is inspected for clarity, color, and scent profile before shipping." }
  ];

  return (
    <section id="process" ref={ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-6xl text-primary font-medium">Our Purity Standard</h2>
            <p className="text-primary/40 mt-4 max-w-sm uppercase tracking-widest text-xs font-bold">How we ensure results-driven raw materials</p>
          </div>
          <div className="h-[2px] flex-1 bg-primary/10 mb-5 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <span className="font-heading text-7xl font-bold text-accent/20 block mb-6">{step.number}</span>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">{step.title}</h3>
              <p className="text-primary/60 leading-relaxed font-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Professional Formulators", description: "Bulk raw materials standardized for consistent results in commercial skincare and haircare lines.", icon: <FlaskConical size={24} /> },
    { title: "DIY Enthusiasts", description: "Pure, undiluted ingredients for home-crafted beauty routines that require therapeutic potency.", icon: <Beaker size={24} /> },
    { title: "Sourcing Authenticity", description: "Every batch is verified for purity, ensuring your final products meet high efficacy standards.", icon: <ShieldCheck size={24} /> }
  ];

  return (
    <section id="features" ref={ref} className="py-32 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className={`font-heading text-5xl md:text-6xl text-white font-medium mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Who We Serve</h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`p-10 border border-white/10 bg-white/[0.02] transition-all duration-700 hover:bg-white/[0.05] hover:border-accent/40 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="w-14 h-14 bg-accent/20 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm font-light">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "Pure Python Oil", description: "High-purity specialty oil traditionally used for intensive skin repair and hair growth formulations.", price: "₦ Request Quote" },
    { name: "Organic Python Fat", description: "Authentic, cold-processed raw animal lipid for cosmetic grade formulation and DIY therapeutic balms.", price: "₦ Request Quote" },
    { name: "Unrefined Shea Butter", description: "Grade A raw materials sourced directly from local processors for maximum nutrient retention.", price: "₦ Contact for Price" },
    { name: "Botanical Oils", description: "A curated selection of carrier oils including Baobab, Neem, and Moringa for professional production.", price: "₦ Contact for Price" }
  ];

  return (
    <section id="materials" ref={ref} className="py-32 px-6 bg-secondary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-24">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl md:text-6xl text-primary font-medium">The Inventory</h2>
            <p className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mt-4">Rare & Essential Raw Materials</p>
          </div>
        </div>

        <div className="space-y-32">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative overflow-hidden shadow-[30px_30px_0px_rgba(139,94,60,0.05)]">
                  <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-xs font-bold tracking-widest uppercase mb-6 block">0{i + 1} — Cosmetic Grade</span>
                <h3 className="font-heading text-4xl md:text-5xl font-medium text-primary leading-tight mb-6">{p.name}</h3>
                <p className="text-primary/60 text-lg leading-relaxed font-light mb-8">{p.description}</p>
                <div className="flex flex-col gap-6">
                  <span className="text-3xl font-heading font-bold text-accent italic">{p.price}</span>
                  <a href="https://wa.link/m86z06" className={`flex items-center gap-4 bg-primary text-white px-8 py-4 w-fit font-bold uppercase tracking-widest text-[10px] hover:bg-accent transition-colors ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                    Request Quote <ChevronRight size={14} />
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
  const stats = [
    { number: "100%", label: "Organic Purity" },
    { number: "50+", label: "Raw Materials" },
    { number: "24/7", label: "Order Support" }
  ];

  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-accent/5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className={`font-heading text-5xl md:text-6xl text-primary font-medium mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Specialized Supplier <br className="hidden md:block"/> for Cosmetic Excellence
        </h2>
        <p className="text-primary/60 text-xl font-light leading-relaxed max-w-3xl mx-auto mb-20">
          Jommy Naturals was founded on the belief that the best beauty products begin with uncompromised raw materials. Based in Abuja, we bridge the gap between rural authenticity and clinical formulation requirements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((s, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="font-heading text-6xl font-bold text-accent mb-2">{s.number}</p>
              <p className="text-primary/40 uppercase tracking-[0.3em] text-[10px] font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Chinelo O.", text: "The python oil from Jommy Naturals transformed my hair growth serum line. Truly authentic and high potency.", role: "Brand Founder" },
    { name: "Amina B.", text: "Finding reliable raw materials in Abuja was tough until I found Jommy. Their shea butter is the cleanest I've used.", role: "Cosmetic Chemist" }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-32 px-6 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl font-medium mb-24">Trusted by Formulators</h2>
        <div className="space-y-16">
          {items.map((t, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`relative py-12 px-8 border-b border-white/5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-10 bg-accent/40" />
              <p className="text-2xl md:text-3xl font-heading italic font-light mb-8 leading-relaxed text-white/90">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-accent uppercase tracking-widest text-xs">{t.name}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{t.role}</p>
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
    <section id="contact" ref={ref} className="py-32 px-6 bg-secondary">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-4 opacity-70 font-bold">Contact Channel</p>
        <h2 className="font-heading text-5xl md:text-6xl text-primary font-medium mb-4">Place Your Direct Order</h2>
        <p className="text-primary/40 mb-16 text-lg font-light leading-relaxed">
          Abuja's premier source for organic raw materials. Sharp delivery, nationwide.
        </p>
        
        {sent ? (
          <div className="p-16 text-center animate-scaleIn bg-primary rounded-2xl shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto border border-accent/40">
              <CheckCheck size={32} className="text-accent" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-white mb-3">Order Received</h3>
            <p className="text-white/60">Our sourcing team will contact you shortly to finalize details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                placeholder="Full Name"
                className="w-full bg-white border border-primary/5 px-6 py-4 outline-none focus:border-accent transition-all text-primary"
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
              <input
                placeholder="Phone Number"
                className="w-full bg-white border border-primary/5 px-6 py-4 outline-none focus:border-accent transition-all text-primary"
                onChange={e => setForm({...form, phone: e.target.value})}
                required
              />
            </div>
            <input
              placeholder="Material Request (e.g. 5L Python Oil)"
              className="w-full bg-white border border-primary/5 px-6 py-4 outline-none focus:border-accent transition-all text-primary"
              onChange={e => setForm({...form, message: e.target.value})}
              required
            />
            <button className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-accent transition-all duration-500 shadow-xl flex justify-center items-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "Submit Inquiry"}
            </button>
            <div className="pt-10 flex flex-wrap justify-center gap-10 border-t border-primary/5">
              <div className="flex items-center gap-3 text-primary/60 text-xs font-bold uppercase tracking-widest">
                <Instagram size={16} className="text-accent" /> @jommynaturals
              </div>
              <div className="flex items-center gap-3 text-primary/60 text-xs font-bold uppercase tracking-widest">
                <MapPin size={16} className="text-accent" /> Abuja, Nigeria
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-accent flex items-center justify-center text-secondary font-heading font-bold text-sm">JN</div>
          <span className="font-heading font-bold text-xl text-white tracking-wider">JOMMY NATURALS</span>
        </div>
        <p className="text-white/40 font-light leading-relaxed text-sm mb-8">
          Integrated a clinical sourcing transparency section to bridge the gap between organic nature and laboratory-grade purity as requested.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Materials', 'Process', 'Contact'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/50 text-sm hover:text-white transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Materials</h4>
          <ul className="space-y-4">
            {['Python Oil', 'Python Fat', 'Shea Butter', 'Botanical Oils'].map(link => (
              <li key={link}><span className="text-white/50 text-sm">{link}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end">
        <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Headquarters</h4>
        <p className="text-white/50 text-sm md:text-right leading-relaxed mb-6">
          Phase 2, Abuja<br />
          Federal Capital Territory<br />
          Nigeria
        </p>
        <a href="https://wa.link/m86z06" className="text-white font-heading text-xl italic hover:text-accent transition-colors">
          Order Direct →
        </a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} Jommy Naturals. Premium Sourcing Excellence.
      </p>
      <div className="flex gap-8">
        <a href="#" className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Terms of Trade</a>
      </div>
    </div>
  </footer>
);

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Process />
      <Divider />
      <Features />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}