'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  FlaskConical, 
  Leaf, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  CheckCheck, 
  Loader2, 
  Award, 
  Gem, 
  Users, 
  ImageOff,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
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
      <div className={`flex items-center justify-center bg-primary/10 ${className}`}>
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

export default function JommyNaturals() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Jommy Naturals",
    tagline: "Purity in Every Drop, Potency in Every Batch.",
    description: "Abuja's premier niche supplier of authentic, high-potency organic raw materials for high-end skincare and cosmetic formulations.",
    industry: "Organic Beauty Supply"
  };

  const contact = {
    whatsapp: "https://wa.link/m86z06",
    instagram: "@jommy_naturals",
    email: "",
    address: "Abuja, Nigeria"
  };

  const products = [
    { name: "Pure Python Oil", description: "Highly sought-after for its deep penetrative properties and traditional skin-repairing benefits.", price: "₦ Request Quote", src: "https://picsum.photos/seed/beauty2/800/1000" },
    { name: "Organic Python Fat", description: "Ultra-rich texture ideal for luxury balms and intensive moisture formulations.", price: "₦ Request Quote", src: "https://picsum.photos/seed/beauty3/800/1000" },
    { name: "Cold-Pressed Shea Butter", description: "Unrefined, raw grade-A butter sourced from the heart of Nigeria.", price: "₦ Request Quote", src: "https://picsum.photos/seed/beauty4/800/1000" },
    { name: "Raw Cocoa Butter Blocks", description: "Deeply aromatic and rich in antioxidants, perfect for chocolate-based cosmetic ranges.", price: "₦ Request Quote", src: "https://picsum.photos/seed/beauty5/800/1000" }
  ];

  const features = [
    { title: "Unmatched Authenticity", description: "Every batch of our python oil and fats is verified for purity and concentration.", icon: <Shield className="text-accent" /> },
    { title: "Formulator Grade", description: "Raw materials processed specifically to maintain bio-active potency for skincare.", icon: <FlaskConical className="text-accent" /> },
    { title: "Ethical Sourcing", description: "We partner directly with niche collectors to ensure a traceable and sustainable supply chain.", icon: <Leaf className="text-accent" /> }
  ];

  const stats = [
    { number: '100%', label: 'Organic Purity', icon: <Award /> },
    { number: '12+', label: 'Rare Materials', icon: <Gem /> },
    { number: '250+', label: 'Formulators Served', icon: <Users /> }
  ];

  const processSteps = [
    { number: "01", title: "Ethical Collection", description: "We source our rare fats and oils from verified traditional niche suppliers across West Africa." },
    { number: "02", title: "Cold-Refining", description: "Materials are processed using low-heat methods to preserve the integrity of the bio-actives." },
    { number: "03", title: "Purity Testing", description: "Each batch undergoes rigorous quality checks before being packaged for our clients." }
  ];

  const testimonials = [
    { name: "Folake Adenuga", role: "Lead Chemist, Aura Skin", text: "The consistency of the Python oil from Jommy Naturals is unmatched. My repair balms have never been more effective." },
    { name: "Emeka Okafor", role: "Artisanal Soap Maker", text: "Finally, a supplier in Abuja that understands the importance of sourcing transparency. Highly recommended." }
  ];

  // SECTION REVEALS
  const heroReveal = useScrollReveal(0.05);
  const featuresReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary shadow-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-accent flex items-center justify-center font-heading text-xl font-bold text-accent group-hover:bg-accent group-hover:text-primary transition-all">
              JN
            </div>
            <span className={`font-heading text-xl font-bold tracking-widest uppercase ${scrolled ? 'text-white' : 'text-white md:text-primary'}`}>
              Jommy Naturals
            </span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {['Catalog', 'Sourcing', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm font-medium tracking-widest uppercase transition-colors ${scrolled ? 'text-white/70 hover:text-accent' : 'text-primary/70 hover:text-primary'}`}>
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Inquire via WhatsApp
            </a>
          </div>
          <button className={`md:hidden ${scrolled ? 'text-white' : 'text-primary'}`} onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 h-full -mt-20">
          {['Catalog', 'Sourcing', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="font-heading text-4xl text-white font-light tracking-widest">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest">
            Inquire Now
          </a>
        </div>
      </div>

      {/* HERO - HR-C Pattern */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-secondary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-24 pt-32">
          <h1 className={`font-heading text-6xl md:text-[5.5rem] font-black text-primary leading-[0.9] tracking-tight transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            The Source of Exceptional Beauty.
          </h1>
          <p className={`text-primary/60 mt-10 text-xl max-w-md leading-relaxed transition-all duration-1000 delay-300 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Supplying Abuja&apos;s finest skincare formulators with the purest organic raw materials—from rare Python oils to Grade-A Shea.
          </p>
          <div className={`flex gap-4 mt-12 transition-all duration-1000 delay-500 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#contact" className="bg-primary text-white px-10 py-5 font-bold hover:bg-accent transition-all duration-300 rounded-full shadow-lg">
              Inquire via WhatsApp
            </a>
          </div>
          <div className={`mt-20 flex gap-12 border-t border-primary/10 pt-10 transition-all duration-1000 delay-700 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.slice(0, 2).map((s, i) => (
              <div key={i}>
                <p className="font-heading text-4xl font-bold text-primary">{s.number}</p>
                <p className="text-primary/40 text-xs uppercase tracking-[0.2em] mt-1 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src="https://picsum.photos/seed/jommynat/1000/1200" alt="Jommy Naturals Raw Materials" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent hidden md:block" />
        </div>
      </section>

      {/* D-RULE DIVIDER */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
          {brand.tagline}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      {/* FEATURES - F-ICON-GRID */}
      <section ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white">Why Formulators Trust Us</h2>
            <p className="text-white/40 mt-4 font-mono tracking-widest uppercase">The Jommy Naturals Standard</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {React.cloneElement(f.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - THE SOURCING CHAIN */}
      <section id="sourcing" ref={processReveal.ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-primary mb-4 text-center">The Sourcing Chain</h2>
          <p className="text-primary/40 text-center mb-20 uppercase tracking-widest font-mono text-sm">Transparency from Earth to Lab</p>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/10 hidden md:block -translate-y-1/2 z-0" />
            {processSteps.map((step, i) => (
              <div 
                key={i} 
                className={`relative z-10 flex flex-col items-center text-center transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-accent font-heading text-3xl font-bold mb-8 shadow-xl">
                  {step.number}
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-primary/60 leading-relaxed text-sm px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-STAGGER Pattern */}
      <section id="catalog" ref={productsReveal.ref} className="py-28 px-6 bg-secondary overflow-hidden border-t border-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24">
            <h2 className="font-heading text-6xl font-black text-primary leading-none">Raw Material Catalog</h2>
            <p className="text-primary/40 mt-4 text-xl">The Purest Ingredients for Your Formulation</p>
          </div>
          <div className="space-y-40">
            {products.map((p, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-2xl group">
                    <SafeImage src={p.src} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-accent/10 rounded-full blur-[80px] -z-10`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-accent text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
                    Collection Item 0{i + 1}
                  </span>
                  <h3 className="font-heading text-4xl md:text-6xl font-black text-primary leading-tight mb-6">{p.name}</h3>
                  <p className="text-primary/50 text-xl leading-relaxed mb-10">{p.description}</p>
                  <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                    <span className="text-3xl font-heading font-bold text-primary italic">{p.price}</span>
                    <a href="#contact" className="group flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-accent transition-all">
                      Secure Batch <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION with Counter Stats */}
      <section ref={aboutReveal.ref} className="py-32 px-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black leading-none mb-10">Abuja&apos;s Niche Organic Authority</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-12">
              Jommy Naturals was founded on the belief that luxury skincare begins with the integrity of the raw material. 
              We bridge the gap between rural sourcing and urban formulation, providing high-purity ingredients that large-scale vendors simply cannot match.
            </p>
            <p className="text-accent font-bold tracking-widest uppercase text-sm italic">Sharp delivery across Abuja and nationwide.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {stats.map((s, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-8 p-10 bg-white/5 rounded-[2rem] border border-white/10 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                  {React.cloneElement(s.icon as React.ReactElement, { size: 36 })}
                </div>
                <div>
                  <p className="text-5xl font-black text-white">{s.number}</p>
                  <p className="text-white/40 uppercase tracking-[0.2em] font-bold text-sm mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-MASONRY */}
      <section ref={testimonialsReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-primary text-center mb-20">Trust from the Industry</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid bg-white p-12 rounded-[2.5rem] border border-primary/5 shadow-sm transition-all duration-1000 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex gap-1 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-accent/40" />)}
                </div>
                <p className="text-primary/80 text-2xl font-heading leading-relaxed mb-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-primary/5 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-heading text-xl font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">{t.name}</p>
                    <p className="text-primary/40 text-sm font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C2 Pattern (Diagonal split) */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32 min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,40%_100%,0_100%)] hidden md:block" />
        <div className="absolute inset-0 bg-primary md:hidden opacity-95" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-7xl md:text-[8rem] font-black text-white leading-[0.8] mb-10">Secure Your Batch</h2>
            <p className="text-white/60 text-2xl max-w-sm font-light">The purest organic raw materials, sourced specifically for your luxury formulations.</p>
            <div className="mt-16 space-y-6">
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-accent hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center"><Phone size={20} /></div>
                <span className="text-xl font-bold">Contact on WhatsApp</span>
              </a>
              <div className="flex items-center gap-4 text-white/50">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"><MapPin size={20} /></div>
                <span className="text-xl">{contact.address}</span>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-xl ml-auto transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {sent ? (
              <div className="bg-white p-12 rounded-[2.5rem] text-center shadow-2xl animate-scaleIn">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8 border border-accent/20">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-4xl font-bold text-primary mb-4">Request Sent</h3>
                <p className="text-primary/60 text-lg">Our sourcing specialist will contact you shortly to discuss your requirements.</p>
              </div>
            ) : (
              <form onSubmit={handleForm} className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <h3 className="font-heading text-3xl font-bold text-primary mb-10">Wholesale Inquiry</h3>
                <div className="space-y-5">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="w-full bg-secondary border border-primary/5 rounded-2xl px-6 py-5 text-primary placeholder-primary/30 focus:border-accent outline-none transition-all"
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="w-full bg-secondary border border-primary/5 rounded-2xl px-6 py-5 text-primary placeholder-primary/30 focus:border-accent outline-none transition-all"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                  <textarea 
                    rows={4} 
                    placeholder="Material Requirements (e.g. 5L Python Oil)" 
                    required 
                    className="w-full bg-secondary border border-primary/5 rounded-2xl px-6 py-5 text-primary placeholder-primary/30 focus:border-accent outline-none transition-all resize-none"
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-10 bg-primary text-white py-6 rounded-2xl font-bold text-lg hover:bg-accent transition-all flex justify-center items-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Request Sourcing <ChevronRight size={20} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary py-20 px-6 border-t border-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border-2 border-accent flex items-center justify-center font-heading text-xl font-bold text-accent">JN</div>
              <span className="font-heading text-2xl font-bold text-primary tracking-widest uppercase">Jommy Naturals</span>
            </div>
            <p className="text-primary/50 max-w-sm text-lg leading-relaxed mb-10">
              {brand.description}
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href={contact.whatsapp} className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Catalog', 'Sourcing', 'Contact'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-primary/60 hover:text-accent transition-colors font-medium">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-8">Contact</h4>
            <div className="space-y-4 text-primary/60 font-medium">
              <p>Abuja, Nigeria</p>
              <p>Supply Division</p>
              <p className="text-accent font-bold">@jommy_naturals</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-primary/40 text-sm font-medium">
            © {new Date().getFullYear()} Jommy Naturals. High-Potency Organic Sourcing.
          </p>
          <p className="text-primary/40 text-xs tracking-widest uppercase font-bold">
            Built for Formulators
          </p>
        </div>
      </footer>
    </main>
  );
}