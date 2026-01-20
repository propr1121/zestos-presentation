import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  MessageSquare,
  Smartphone,
  Globe,
  Settings,
  TrendingUp,
  Zap,
  Users,
  Layout,
  Database,
  ArrowRight
} from 'lucide-react';

const Logo = ({ allCaps = false }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
      <img
        src="/emblem.png"
        alt="ZestOS"
        className="w-full h-full object-contain"
      />
    </div>
    <span className={`text-xl md:text-2xl font-bold tracking-tight text-white ${allCaps ? 'uppercase' : ''}`}>
      Zest<span className="text-accent">OS</span>
    </span>
  </div>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'cover',
      title: 'Innovation & Artificial Intelligence',
      subtitle: 'for the Real Estate Industry',
      tagline: 'ZestOS Case & Vision',
      bgImage: 'cover_villa.png'
    },
    {
      type: 'problem',
      title: 'The Real Estate Paradox',
      points: [
        { title: 'Data Silos', desc: 'Listing data is trapped in static CRMs, disconnected from real-time conversations.' },
        { title: 'Human Bottleneck', desc: 'Agents spend 60% of their time on repetitive queries instead of closing deals.' },
        { title: 'Manual Service', desc: 'Customers expect 24/7 responses.' }
      ],
      bgImage: 'agent_pain.png'
    },
    {
      type: 'comparison',
      title: 'The Shift in Intelligence',
      old: {
        title: 'The Old Way',
        points: ['Static CRM Folders', 'Manual Lead Entry', 'Disconnected Messaging', 'Fragmented Customer Profiles']
      },
      new: {
        title: 'The ZestOS Way',
        points: ['Living Data Intelligence', 'Autonomous Lead Capture', 'Unified WhatsApp AI', 'Integrated Client Knowledge']
      }
    },
    {
      type: 'roadmap',
      title: 'Growth Roadmap',
      phases: [
        { phase: '01', name: 'Foundation', timeline: 'Phase 1: Foundation', desc: 'WhatsApp native AI assistant & web widget. 24/7 customer self-service.' },
        { phase: '02', name: 'Smart CRM Lite', timeline: 'Phase 2: Growth', desc: 'Add agents, manage listings, and gain AI-driven insights into leads.' },
        { phase: '03', name: 'Living Ecosystem', timeline: 'Phase 3: Scale', desc: 'Full Operating System. Portal pushes and API stack.' }
      ]
    },
    {
      type: 'feature',
      title: 'Step 1: The Intelligence Layer',
      subtitle: 'ZestOS Lite Foundation',
      points: [
        'WhatsApp Assistant for Agents',
        'Customer Self-Service Interface',
        '24/7 Embeddable Web Chatbot',
        'Property Listing Integration'
      ]
    },
    {
      type: 'split',
      title: 'Two Channels, One Brain',
      left: {
        title: 'The Agent Side',
        desc: 'Internal WhatsApp bot to query listings, schedule viewings, and manage client data on the go.'
      },
      right: {
        title: 'The Customer Side',
        desc: 'A dedicated assistant for buyers to browse properties, book viewings, and get instant answers.'
      }
    },
    {
      type: 'grid',
      title: 'ZestOS Core Architecture',
      items: [
        { icon: <Database />, title: 'Listing Sync', desc: 'Deep integration with your CRM or manual listing manager.' },
        { icon: <MessageSquare />, title: 'LLM Engine', desc: 'Custom trained on your agency context and property specifics.' },
        { icon: <Smartphone />, title: 'Multi-Channel', desc: 'Seamlessly delivered via WhatsApp, Web, and Mobile.' },
        { icon: <Settings />, title: 'Admin Dash', desc: 'Simple control center to manage brand, context, and leads.' }
      ]
    },
    {
      type: 'mockup',
      title: 'The WhatsApp Experience',
      desc: 'Native, intuitive, and extremely fast.\nNo additional app to download.',
      image: 'whatsapp_mockup.png'
    },
    {
      type: 'feature_highlight',
      title: 'Intelligent Web Agent',
      desc: 'Not just a chatbot. A sales-ready assistant that understands property value and location context.',
      points: ['Custom UI Styling', 'Deep CRM Integration', 'Lead Qualification', 'Instant Scheduling']
    },
    {
      type: 'grid',
      title: 'The Agency Command Center',
      items: [
        { icon: <Layout />, title: 'Brand Setup', desc: 'Configure your company identity and tone of voice.' },
        { icon: <Zap />, title: 'Embed Codes', desc: 'One-click widget deployment for your website.' },
        { icon: <Users />, title: 'Context Engine', desc: 'Upload PDFs and docs to train your personal AI.' },
        { icon: <Database />, title: 'Lead Manager', desc: 'View all autonomous conversations in one place.' }
      ]
    },
    {
      type: 'pricing',
      title: 'Built for Scale',
      tiers: [
        { name: 'Lite', price: '€449/mo', features: ['AI WhatsApp Agent', 'Web Widget', 'Listing Sync'] },
        { name: 'Growth', price: 'TBC', features: ['Phase 2 CRM Features', 'Multi-Agent Support', 'Advanced Analytics'] },
        { name: 'Enterprise', price: 'TBC', features: ['Full Real Estate OS', 'Portal Integrations', 'Custom API access'] }
      ]
    },
    {
      type: 'partner',
      title: 'Founding Partner Opportunity',
      benefits: [
        'Influence the product roadmap',
        'Special founding member pricing',
        'Priority feature deployment',
        'Dedicated success manager'
      ],
      price: '€6,500 One-time Setup + €299/mo'
    },
    {
      type: 'quote',
      text: '"The next decade of real estate will be defined by those who turn static data into living intelligence."',
      author: 'ZestOS Vision'
    },
    {
      type: 'cta',
      title: 'Transform Your Agency',
      subtitle: 'Starting here, in Lagos, Algarve.',
      text: 'Schedule a demo to see ZestOS in action.'
    }
  ];

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="h-screen w-screen bg-black text-white relative flex flex-col overflow-hidden select-none">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full z-50 flex gap-1 px-4 py-6">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= currentSlide ? 'bg-accent shadow-[0_0_8px_rgba(165,241,78,0.5)]' : 'bg-white/10'}`}
          />
        ))}
      </div>

      {/* Main Content Area - Constrained to prevent overflow */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex-1 flex max-h-[calc(100vh-128px)]"
          >
            {renderSlide(slide)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer - Standardized height and positioning */}
      <footer className="h-32 px-12 pb-8 flex justify-between items-center z-50 border-t border-white/5 bg-black/90 backdrop-blur-xl">
        <Logo />
        <div className="flex gap-8 items-center">
          <span className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">{String(currentSlide + 1).padStart(2, '0')} — {String(slides.length).padStart(2, '0')}</span>
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full border border-white/5 hover:bg-white/5 transition-all active:scale-90"
            >
              <ChevronLeft size={20} className="opacity-40" />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all active:scale-90 group"
            >
              <ChevronRight size={20} className="text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const renderSlide = (slide) => {
  switch (slide.type) {
    case 'cover':
      return (
        <div className="flex-1 relative flex items-center p-12 md:p-16">
          <div className="absolute inset-0 opacity-75">
            <img src={slide.bgImage} className="w-full h-full object-cover brightness-110" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/20" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                {slide.title.split('&').map((part, i) => (
                  <span key={i} className="block">
                    {part}
                    {i === 0 && <span className="text-accent">&</span>}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/70 mb-8">{slide.subtitle}</p>
              <p className="text-sm md:text-base font-bold tracking-[0.5em] uppercase opacity-30">{slide.tagline}</p>
            </motion.div>
          </div>
        </div>
      );

    case 'problem':
      return (
        <div className="flex-1 flex max-h-full">
          <div className="w-1/2 p-12 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight">{slide.title}</h2>
            <div className="space-y-6">
              {slide.points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="group"
                >
                  <h3 className="text-lg md:text-xl font-bold text-accent mb-1">{pt.title}</h3>
                  <p className="text-sm md:text-base text-white/50 group-hover:text-white/90 transition-colors leading-relaxed">{pt.desc}</p>
                  <div className="mt-4 h-px w-full bg-white/15 group-last:hidden" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-1/2 relative h-full">
            <img src={slide.bgImage} className="w-full h-full object-cover grayscale brightness-[0.65] contrast-110" alt="Problem" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/20 to-black" />
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col pt-24">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-center">{slide.title}</h2>
            <div className="flex gap-8 h-[340px]">
              <div className="flex-1 bg-white/[0.04] rounded-[32px] p-8 md:p-10 border border-white/[0.12]">
                <h3 className="text-xs font-bold mb-8 opacity-50 uppercase tracking-[0.3em]">{slide.old.title}</h3>
                <ul className="space-y-4">
                  {slide.old.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/50 truncate text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-accent/5 rounded-[32px] p-8 md:p-10 border border-accent/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                  <Zap className="text-accent animate-pulse" size={24} />
                </div>
                <h3 className="text-xs font-bold mb-8 text-accent uppercase tracking-[0.3em] font-mono">{slide.new.title}</h3>
                <ul className="space-y-4">
                  {slide.new.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg md:text-xl font-medium tracking-tight">
                      <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 'roadmap':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col pt-12">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-center sm:text-left">Growth Roadmap</h2>
            <div className="grid grid-cols-3 gap-8">
              {slide.phases.map((ph, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white/[0.05] border border-white/[0.12] rounded-[32px] p-10 md:p-12 flex flex-col h-full hover:border-accent/30 transition-colors"
                >
                  <div className="text-accent font-black text-5xl md:text-6xl mb-5 opacity-40">{ph.phase}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{ph.name}</h3>
                  <div className="text-white/30 font-mono text-xs tracking-[0.2em] uppercase mb-5">{ph.timeline}</div>
                  <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6 flex-1">{ph.desc}</p>
                  <div className="h-1 w-8 bg-accent/30 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'grid':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col pt-24">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-10">
              {slide.items.map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.07] border border-white/[0.1] group-hover:border-accent/40 group-hover:bg-accent/10 flex items-center justify-center text-white/50 group-hover:text-accent flex-shrink-0 transition-all">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-sm md:text-base text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'mockup':
      return (
        <div className="flex-1 flex max-h-full">
          <div className="w-1/2 p-12 md:p-16 flex flex-col pt-24">
            <div className="max-w-xl">
              <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.8]">{slide.title}</h2>
              <p className="text-xl md:text-3xl font-medium text-white/50 leading-relaxed whitespace-pre-line">{slide.desc}</p>
            </div>
          </div>
          <div className="w-1/2 relative h-full">
            <img src={slide.image} className="w-full h-full object-cover" alt="WhatsApp Experience" />
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/20 to-transparent" />
          </div>
        </div>
      );

    case 'feature':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter leading-tight">{slide.title}</h2>
            <p className="text-xl md:text-2xl text-accent font-bold mb-10 uppercase tracking-widest">{slide.subtitle}</p>
            <div className="grid grid-cols-2 gap-8">
              {slide.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/[0.03] p-6 rounded-2xl border border-white/[0.05]">
                  <CheckCircle2 className="text-accent" size={24} />
                  <span className="text-lg font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="flex-1 flex">
          <div className="w-1/2 p-12 md:p-16 flex flex-col justify-center border-r border-white/5 bg-accent/[0.02]">
            <div className="max-w-sm ml-auto">
              <Smartphone className="text-accent mb-6" size={48} />
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">{slide.left.title}</h3>
              <p className="text-lg text-white/40 leading-relaxed">{slide.left.desc}</p>
            </div>
          </div>
          <div className="w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white/[0.01]">
            <div className="max-w-sm mr-auto">
              <Users className="text-accent mb-6" size={48} />
              <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">{slide.right.title}</h3>
              <p className="text-lg text-white/40 leading-relaxed">{slide.right.desc}</p>
            </div>
          </div>
        </div>
      );

    case 'feature_highlight':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">{slide.title}</h2>
            <p className="text-xl md:text-2xl text-white/40 mb-12 leading-relaxed">{slide.desc}</p>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {slide.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(165,241,78,1)]" />
                  <span className="text-lg font-bold tracking-tight">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-center">{slide.title}</h2>
          <div className="flex gap-6 max-w-6xl mx-auto w-full">
            {slide.tiers.map((tier, i) => (
              <div key={i} className={`flex-1 rounded-3xl p-8 flex flex-col ${i === 0 ? 'bg-accent/10 border-accent/20 border-2' : 'bg-white/[0.03] border border-white/[0.05]'}`}>
                <h3 className="text-xs font-bold mb-2 uppercase tracking-[0.2em] opacity-40">{tier.name}</h3>
                <div className="text-4xl font-black mb-8">{tier.price}</div>
                <div className="space-y-3 mb-10 flex-1">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent" />
                      <span className="text-xs font-medium text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${i === 0 ? 'bg-accent text-black hover:scale-105' : 'bg-white/5 hover:bg-white/10'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'partner':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-4xl bg-gradient-to-br from-white/[0.05] to-transparent p-12 rounded-[48px] border border-white/[0.1] mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-x-12 mb-10">
              <div className="space-y-4">
                {slide.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-accent" />
                    <span className="text-lg font-medium tracking-tight whitespace-nowrap">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-end">
                <div className="text-sm font-bold uppercase tracking-widest opacity-30 mb-2">Initial Commitment</div>
                <div className="text-4xl md:text-5xl font-black text-accent">{slide.price.split(' Setup')[0]}</div>
                <div className="text-sm font-bold opacity-30 mt-2">+ {slide.price.split('+ ')[1]}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'quote':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <p className="text-4xl md:text-6xl font-black mb-12 italic tracking-tighter leading-tight">
                {slide.text}
              </p>
              <div className="h-1 w-24 bg-accent mx-auto mb-6" />
              <p className="text-xl font-bold uppercase tracking-[0.4em] opacity-40">{slide.author}</p>
            </motion.div>
          </div>
        </div>
      );

    case 'cta':
      return (
        <div className="flex-1 relative flex flex-col items-center justify-center text-center p-12 md:p-16">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">{slide.title}</h2>
              <p className="text-2xl md:text-3xl font-medium text-white/50 mb-12">{slide.subtitle}</p>
              <button className="px-10 py-5 bg-accent text-black rounded-full text-xl md:text-2xl font-black flex items-center gap-4 hover:scale-110 transition-transform active:scale-95 shadow-[0_0_30px_rgba(165,241,78,0.3)]">
                JOIN THE REVOLUTION <ArrowRight size={28} strokeWidth={3} />
              </button>
            </motion.div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">{slide.title}</h2>
          <p className="text-lg md:text-2xl text-white/40">{slide.desc || 'Coming soon...'}</p>
        </div>
      );
  }
};

export default App;
