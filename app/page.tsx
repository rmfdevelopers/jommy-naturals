'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  Truck, 
  FlaskConical, 
  Users, 
  Package, 
  CheckCircle, 
  Phone, 
  Instagram, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  ImageOff,
  Menu,
  X,
  Mail
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: airy
// Depth Treatment: textured
// Divider Style: D-RULE
// Typography Personality: refined

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
  }, []);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#1a2e26] to-[#2D4A3E] ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function JommyNaturals() {
  const brand = {
    name: "Jommy Naturals",
    tagline: "The Purest Foundations for Your Beauty Formulations",
    description: "Your trusted partner for premium, ethically-sourced cosmetic raw materials and ingredients in the heart of Abuja.",
    industry: "beauty",
    region: "nigeria",
    currency: "₦"
  };

  const contact = {
    whatsapp: "wa.link/m86z06",
    instagram: "@jommy_naturals",
    email: "",
    address: "Wuru village 2, opposite rockview pharmacy wuru street, kuje Abuja"
  };

  const products = [
    { name: "Unrefined Shea Butter", description: "Grade A, cold-pressed shea butter sourced from local organic farms.", price: "₦4,500", image: "https://images.unsplash.com/photo-1765964492963-b0aa8c172431?q=80&w=1080" },
    { name: "Organic Rosehip Oil", description: "Premium carrier oil rich in Vitamins A and C for skin regeneration.", price: "₦12,000", image: "https://images.unsplash.com/photo-1638131163449-70059e10de6a?q=80&w=1080" },
    { name: "Hyaluronic Acid Powder", description: "High molecular weight cosmetic grade powder for deep hydration.", price: "₦8,500", image: "https://images.unsplash.com/photo-1640731000635-77c167dd9420?q=80&w=1080" },
    { name: "Pure Vegetable Glycerin", description: "99.7% pure USP grade humectant for hair and skin care products.", price: "₦3,200", image: "https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=1080" }
  ];

  const features = [
    { title: "Ethically Sourced", description: "Every ingredient is vetted for purity and sustainable harvesting practices.", icon: <Leaf size={24} /> },
    { title: "Nationwide Delivery", description: "Fast and secure shipping from Kuje to every corner of Nigeria.", icon: <Truck size={24} /> },
    { title: "Formulator Support", description: "Professional grade materials suitable for both home crafters and industries.", icon: <FlaskConical size={24} /> }
  ];

  const testimonials = [
    { name: "Amina K.", text: "The consistency of their Shea butter is unmatched in Abuja. My lotions have never felt better.", role: "Skincare Brand Owner" },
    { name: "Chidimma E.", text: "Fast delivery and the packaging keeps the ingredients sterile. Jommy is my go-to for oils.", role: "DIY Formulator" },
    { name: "Tunde O.", text: "Professional service and high-grade powders. They understand the science of ingredients.", role: "Product Chemist" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1564594303425-2be2aa4f34f9?q=80&w=1080",
    "https://images.unsplash.com/photo-1765964492963-b0aa8c172431?q=80&w=1080",
    "https://images.unsplash.com/photo-1638131163449-70059e10de6a?q=80&w=1080",
    "https://images.unsplash.com/photo-1640731000635-77c167dd9420?q=80&w=1080",
    "https://images.unsplash.com/photo-1748543668646-e81cda0890f3?q=80&w=1080"
  ];

  const typedText = useTypewriter(brand.tagline);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const hrReveal = useScrollReveal();
  const prReveal = useScrollReveal();
  const feReveal = useScrollReveal();
  const abReveal = useScrollReveal();
  const glReveal = useScrollReveal();
  const teReveal = useScrollReveal();
  const ctReveal = useScrollReveal();

  return (
    <main className="bg-[var(--primary)] text-white">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 border-2 border-[var(--accent)] flex items-center justify-center font-heading font-bold text-xl group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
              JN
            </div>
            <span className="font-heading text-2xl font-black tracking-tight hidden sm:block">JOMMY</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Materials', 'Roots', 'Feedback', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium tracking-widest uppercase hover:text-[var(--accent)] transition-colors opacity-70 hover:opacity-100">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Get Started
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[110] bg-[var(--primary)] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-8">
          <span className="font-heading text-2xl font-black">JN</span>
          <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 h-full -mt-20">
          {['Materials', 'Roots', 'Feedback', 'Contact'].map((item) => (
            <a key={item} onClick={() => setIsMenuOpen(false)} href={`#${item.toLowerCase()}`} className="text-4xl font-heading font-bold">
              {item}
            </a>
          ))}
          <a onClick={() => setIsMenuOpen(false)} href="#contact" className="bg-[var(--accent)] text-black px-12 py-4 rounded-full font-bold text-lg">
            Shop Materials
          </a>
        </div>
      </div>

      {/* HERO (HR-D) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--primary)]/30 rounded-full blur-[120px] pointer-events-none animate-float" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter">
            {typedText}<span className="text-[var(--accent)] animate-pulse">_</span>
          </h1>
          
          <div className={`mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10 transition-all duration-1000 ${hrReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} ref={hrReveal.ref}>
            <p className="text-white/40 text-lg max-w-sm leading-relaxed font-light">
              Modern apothecary sourcing for the next generation of cosmetic formulators. Sharp delivery across Abuja.
            </p>
            <div className="flex gap-4">
              <a href="#materials" className="bg-[var(--accent)] text-black px-10 py-5 font-black text-lg transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,197,160,0.3)] shrink-0">
                Shop Materials
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
        <span className="text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
          Raw Essentials
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
      </div>

      {/* PRODUCTS (P-ASYMMETRIC) */}
      <section id="materials" ref={prReveal.ref} className={`py-28 px-6 bg-[var(--secondary)] transition-all duration-700 ${prReveal.isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-[var(--primary)] max-w-sm">Pure Bases</h2>
            <p className="text-[var(--primary)]/40 max-w-xs text-right hidden md:block">High-purity cosmetic ingredients for your next masterpiece.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 group relative rounded-3xl overflow-hidden shadow-2xl h-[480px]">
              <SafeImage src={products[0].image} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <h3 className="font-heading text-4xl font-bold text-white">{products[0].name}</h3>
                <p className="text-white/60 mt-3 text-lg max-w-sm leading-relaxed">{products[0].description}</p>
                <div className="flex items-center justify-between mt-8">
                  <span className="text-[var(--accent)] font-black text-3xl">{products[0].price}</span>
                  <a href="#contact" className="bg-[var(--accent)] text-black px-8 py-3 rounded-full font-black hover:bg-white transition-colors">Enquire Now</a>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {products.slice(1, 3).map((p, i) => (
                <div key={i} className="group relative rounded-3xl overflow-hidden shadow-xl h-full min-h-[228px]">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
                  <div className="absolute bottom-0 p-6 w-full">
                    <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[var(--accent)] font-black text-xl">{p.price}</span>
                      <a href="#contact" className="text-sm font-bold text-white/60 hover:text-[var(--accent)] transition-colors underline decoration-[var(--accent)]/30 underline-offset-4">Select</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES (F-ICON-GRID) */}
      <section ref={feReveal.ref} className="py-28 px-6 bg-[var(--primary)] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-4">The Jommy Standard</h2>
            <p className="text-white/40 tracking-[0.1em] uppercase text-sm">Why formulators choose our raw materials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`text-center transition-all duration-1000 ${feReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="w-20 h-20 rounded-full border border-[var(--accent)]/30 flex items-center justify-center mx-auto mb-8 text-[var(--accent)] animate-float">
                  {f.icon}
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/40 leading-relaxed max-w-[280px] mx-auto">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (V3 Horizontal Split) */}
      <section id="roots" ref={abReveal.ref} className="py-28 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20">
          <div className={`transition-all duration-1000 ${abReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <p className="text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase mb-6 font-bold">Our Roots</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] leading-[0.95] mb-8">Bridging Nature & Lab</h2>
            <p className="text-[var(--primary)]/60 text-xl leading-relaxed mb-12 font-light">
              Located in Kuje, Abuja, Jommy Naturals was founded on the belief that high-quality skincare starts with the purest raw materials. We bridge the gap between nature's harvest and your cosmetic lab.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-[var(--primary)]/10">
              {[
                { n: '1k+', l: 'Clients' },
                { n: '200+', l: 'Organic' },
                { n: '100%', l: 'Purity' }
              ].map((s, i) => (
                <div key={i}>
                  <p className="font-heading text-4xl font-bold text-[var(--primary)]">{s.n}</p>
                  <p className="text-[var(--primary)]/40 text-[10px] uppercase tracking-widest font-bold mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${abReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src={gallery[0]} alt="Jommy Naturals Lab" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* GALLERY (V7 Masonry) */}
      <section ref={glReveal.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white mb-16">Inside the Apothecary</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((src, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`break-inside-avoid group relative rounded-2xl overflow-hidden transition-all duration-700 ${glReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <SafeImage src={src} alt={`Apothecary ${i}`} width={600} height={400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-mono text-xs tracking-widest uppercase">Pure Formulation</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (T-MASONRY) */}
      <section id="feedback" ref={teReveal.ref} className="py-28 px-6 bg-[var(--accent)]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-16">Formulator Feedback</h2>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className="break-inside-avoid bg-white/5 p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-[var(--accent)]/20 transition-all duration-500">
                <p className="text-white/80 text-xl leading-relaxed italic mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold font-heading text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-white/40 text-xs mt-0.5 uppercase tracking-tighter">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (C1) */}
      <section id="contact" ref={ctReveal.ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[var(--accent)]/5 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start relative z-10">
          <div className={`transition-all duration-1000 ${ctReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-6xl font-black text-white mb-8">Start Your Formulation</h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12">
              Ready to elevate your beauty brand? Connect with us for pricing catalogs and nationwide delivery details.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-1">WhatsApp</p>
                  <a href={`https://${contact.whatsapp}`} className="text-white text-lg hover:text-[var(--accent)] transition-colors">Click to Chat</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-1">Instagram</p>
                  <p className="text-white text-lg">{contact.instagram}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-1">Studio</p>
                  <p className="text-white text-lg leading-relaxed max-w-xs">{contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${ctReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md">
                <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/40">
                  <CheckCheck size={40} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent</h3>
                <p className="text-white/50 text-lg">One of our ingredient specialists will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                <h3 className="font-heading text-3xl font-bold text-white mb-10">Send Inquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/10"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/10"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/10"
                />
                <textarea
                  rows={4}
                  placeholder="Tell us what you're looking for..."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/10 resize-none"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[var(--accent)] text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : <>Send Message <ArrowRight size={20} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 border border-[var(--accent)] flex items-center justify-center font-heading font-bold text-sm">JN</div>
              <span className="font-heading text-xl font-bold tracking-tight">JOMMY NATURALS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed italic">&ldquo;{brand.tagline}&rdquo;</p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                <Phone size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 flex-1">
            <div>
              <h4 className="font-heading text-lg font-bold mb-6 text-white">Materials</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Shea Butter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrier Oils</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Actives</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Humectants</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Our Roots</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sourcing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ethics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kuje Studio</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-heading text-lg font-bold mb-6 text-white">Formulator HQ</h4>
              <p className="text-sm text-white/40 leading-relaxed">
                Wuru Village 2, Kuje, Abuja. <br /> 
                Open Mon - Sat 9am to 6pm.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">&copy; {new Date().getFullYear()} Jommy Naturals Limited</p>
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Pure Foundations for Pure Beauty</p>
        </div>
      </footer>
    </main>
  );
}