import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
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
  ArrowRight,
  Palette,
  UserCheck,
  Calendar,
  Download
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
      subtitle: 'From static data storage to living, intelligent automation.',
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
      subtitle: 'Three phases to transform your agency with intelligent automation.',
      phases: [
        { phase: '01', name: 'AI Intelligence', timeline: 'Phase 1: Foundation', desc: 'WhatsApp native AI assistant & web widget. 24/7 customer self-service.' },
        { phase: '02', name: 'Smart CRM Lite', timeline: 'Phase 2: Growth', desc: 'Add agents, manage listings, and gain AI-driven insights into leads.' },
        { phase: '03', name: 'Living Ecosystem', timeline: 'Phase 3: Scale', desc: 'Full Operating System. Portal pushes and API stack.' }
      ]
    },
    {
      type: 'feature',
      title: 'Phase 1: The Intelligence Layer',
      subtitle: 'ZestOS Foundation',
      description: 'AI-powered assistant deployed across WhatsApp and web empowering your team & customers.',
      points: [
        'WhatsApp Assistant for Agents',
        'Customer WhatsApp Agent',
        '24/7 Embeddable Web Chatbot',
        'Property Listing Integration'
      ]
    },
    {
      type: 'split',
      title: 'Two Channels, One Brain',
      subtitle: 'Your personal AI assistant works 24/7 for both your team and your customers.',
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
      subtitle: 'The foundation powering intelligent automation across your agency.',
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
      points: [
        { icon: <Palette />, text: 'Custom UI Styling' },
        { icon: <Database />, text: 'Deep CRM Integration' },
        { icon: <UserCheck />, text: 'Lead Qualification' },
        { icon: <Calendar />, text: 'Instant Scheduling' }
      ]
    },
    {
      type: 'grid',
      title: 'The Agency Command Center',
      subtitle: 'Your control hub for managing AI behavior, branding, and lead intelligence.',
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
      subtitle: 'Start with Foundation today. Growth and Scale phases coming soon with expanded capabilities.',
      tiers: [
        { name: 'Foundation', price: '€999/mo', features: ['AI WhatsApp Agent', 'Web Widget', 'Listing Sync'] },
        { name: 'Growth', price: 'TBC', features: ['Phase 2 CRM Features', 'Multi-Agent Support', 'Advanced Analytics'] },
        { name: 'Scale', price: 'TBC', features: ['Full Real Estate OS', 'Portal Integrations', 'Custom API access'] }
      ]
    },
    {
      type: 'partner',
      title: 'Founding Partner Opportunity',
      subtitle: 'Join us in shaping the future of real estate intelligence.',
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
      subtitle: 'Embrace Your Data.',
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

  const exportToPDF = () => {
    console.log("Download PDF clicked - add PDF file to public folder");
  };

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
            className="flex-1 flex max-h-[calc(100vh-128px)] slide-container"
          >
            {renderSlide(slide, exportToPDF)}
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

const renderSlide = (slide, exportToPDF) => {
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
          <div className="w-full sm:w-3/5 p-6 sm:p-12 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 sm:mb-12 tracking-tighter leading-tight px-4 sm:px-0">{slide.title}</h2>
            <div className="space-y-6">
              {slide.points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="group"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-accent mb-2">{pt.title}</h3>
                  <p className="text-base md:text-lg text-white/50 group-hover:text-white/90 transition-colors leading-relaxed">{pt.desc}</p>
                  <div className="mt-4 h-px w-full bg-white/15 group-last:hidden" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-2/5 relative h-full">
            <img src={slide.bgImage} className="w-full h-full object-cover grayscale brightness-[0.65] contrast-110" alt="Problem" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/20 to-black" />
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-center px-4 sm:px-0">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/50 text-center mb-12 max-w-4xl mx-auto leading-relaxed">{slide.subtitle}</p>
            )}
            <div className="flex gap-8 h-[340px]">
              <div className="flex-1 bg-white/[0.04] rounded-[32px] p-8 md:p-10 border border-white/[0.12]">
                <h3 className="text-xs font-bold mb-8 opacity-50 uppercase tracking-[0.3em]">{slide.old.title}</h3>
                <ul className="space-y-4">
                  {slide.old.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/50 truncate text-base">
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
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-center sm:text-left px-4 sm:px-0">Growth Roadmap</h2>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/50 mb-8 leading-relaxed max-w-4xl text-center sm:text-left">{slide.subtitle}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 overflow-y-auto sm:overflow-visible pr-2 sm:pr-0 pb-8 sm:pb-0">
              {slide.phases.map((ph, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white/[0.05] border border-white/[0.12] rounded-[32px] p-8 md:p-12 flex flex-col h-full hover:border-accent/30 transition-colors"
                >
                  <div className="text-accent font-black text-4xl md:text-6xl mb-4 md:mb-5 opacity-40">{ph.phase}</div>
                  <h3 className="text-xl md:text-3xl font-bold mb-2">{ph.name}</h3>
                  <div className="text-white/30 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 md:mb-5">{ph.timeline}</div>
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
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter px-4 sm:px-0">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/50 mb-16 leading-relaxed max-w-4xl">{slide.subtitle}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 overflow-y-auto sm:overflow-visible pr-2 sm:pr-0 pb-8 sm:pb-0">
              {slide.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-5 sm:gap-8 group cursor-pointer text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto sm:mx-0 rounded-2xl bg-white/[0.1] border border-white/[0.15] group-hover:border-accent/40 group-hover:bg-accent/10 flex items-center justify-center text-white/60 group-hover:text-accent flex-shrink-0 transition-all duration-300">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm md:text-lg text-white/50 group-hover:text-white/70 leading-relaxed transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'mockup':
      return (
        <div className="flex-1 flex flex-col sm:flex-row max-h-full overflow-hidden sm:overflow-visible">
          <div className="w-full sm:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-10 tracking-tighter leading-[0.9] sm:leading-[0.8]">{slide.title}</h2>
              <p className="text-lg sm:text-xl md:text-3xl font-medium text-white/50 leading-relaxed whitespace-pre-line">{slide.desc}</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 relative h-48 sm:h-full overflow-hidden">
            <img src={slide.image} className="w-full h-full object-cover" alt="WhatsApp Experience" />
            <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/20 to-transparent sm:block hidden" />
            <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-black to-transparent sm:hidden block" />
          </div>
        </div>
      );

    case 'feature':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight text-center px-4 sm:px-0">{slide.title}</h2>
            {slide.description && (
              <p className="text-lg md:text-xl text-white/50 mb-8 leading-relaxed max-w-4xl">{slide.description}</p>
            )}
            <p className="text-xl md:text-2xl text-accent font-bold mb-10 uppercase tracking-widest">{slide.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 overflow-y-auto sm:overflow-visible px-4 sm:px-0">
              {slide.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-4 sm:gap-5 bg-white/[0.06] p-6 sm:p-8 rounded-2xl border border-white/[0.12] hover:border-accent/30 hover:bg-white/[0.08] transition-all cursor-pointer group">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} sm:size={28} />
                  <span className="text-lg sm:text-xl font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'split':
      return (
        <div className="flex-1 flex flex-col overflow-y-auto sm:overflow-visible pr-2 sm:pr-0 pb-8 sm:pb-0">
          <div className="px-8 sm:px-12 md:px-16 pt-24 sm:pt-32 pb-8 sm:pb-12">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-center">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-white/50 text-center mt-4 sm:mt-6 max-w-4xl mx-auto leading-relaxed">{slide.subtitle}</p>
            )}
          </div>
          <div className="flex-1 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/5 bg-accent/[0.02] hover:bg-accent/[0.04] transition-all duration-300 group cursor-pointer">
              <div className="max-w-sm mx-auto sm:ml-auto sm:mr-0 text-center sm:text-right">
                <Smartphone className="text-accent mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:ml-auto" size={40} />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 tracking-tighter group-hover:text-accent transition-colors">{slide.left.title}</h3>
                <p className="text-lg sm:text-xl text-white/40 group-hover:text-white/60 leading-relaxed transition-colors">{slide.left.desc}</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group cursor-pointer">
              <div className="max-w-sm mx-auto sm:mr-auto sm:ml-0 text-center sm:text-left">
                <Users className="text-accent mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mr-auto" size={40} />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-4 tracking-tighter group-hover:text-accent transition-colors">{slide.right.title}</h3>
                <p className="text-lg sm:text-xl text-white/40 group-hover:text-white/60 leading-relaxed transition-colors">{slide.right.desc}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'feature_highlight':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-24 sm:pt-32">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center sm:text-left">{slide.title}</h2>
            <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed max-w-4xl">{slide.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 overflow-y-auto sm:overflow-visible pb-8 sm:pb-0 px-4 sm:px-0">
              {slide.points.map((pt, i) => (
                <div key={i} className="flex items-center gap-4 sm:gap-5 bg-white/[0.04] p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.06] transition-all cursor-pointer group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(165,241,78,0.4)] transition-all duration-300">
                    {React.cloneElement(pt.icon, { size: 18, className: "text-accent" })}
                  </div>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300">{pt.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-24 sm:pt-32">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed text-center max-w-4xl mx-auto">{slide.subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full overflow-y-auto sm:overflow-visible pb-8 sm:pb-0 pr-2 sm:pr-0 px-4 sm:px-0">
              {slide.tiers.map((tier, i) => (
                <div key={i} className={`flex-1 rounded-3xl p-6 sm:p-8 flex flex-col ${i === 0 ? 'bg-accent/10 border-accent/20 border-2 scale-100 sm:scale-105 z-10' : 'bg-white/[0.03] border border-white/[0.05]'}`}>
                  <h3 className="text-[10px] font-bold mb-2 uppercase tracking-[0.2em] opacity-40">{tier.name}</h3>
                  <div className="text-3xl sm:text-4xl font-black mb-1 sm:mb-2">{tier.price}</div>
                  <div className="text-xs font-bold text-accent mb-6 sm:mb-8">{i === 0 ? 'AI Intelligence' : i === 1 ? 'CRM Lite' : 'Living Ecosystem'}</div>
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-accent" />
                        <span className="text-xs sm:text-sm font-medium text-white/60">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${i === 0 ? 'bg-accent text-black hover:scale-105 active:scale-95' : 'bg-white/5 hover:bg-white/10'}`}>
                    {i === 0 ? 'Today' : i === 1 ? 'Next' : 'Future'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'partner':
      return (
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-24 sm:pt-32">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter text-center">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-white/50 mb-12 leading-relaxed text-center max-w-4xl mx-auto">{slide.subtitle}</p>
            )}
            <div className="max-w-4xl bg-gradient-to-br from-white/[0.05] to-transparent p-8 sm:p-12 rounded-[32px] sm:rounded-[48px] border border-white/[0.1] mx-auto overflow-hidden">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 sm:gap-x-12">
                <div className="space-y-3 sm:space-y-4">
                  {slide.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <TrendingUp size={18} className="text-accent" />
                      <span className="text-base sm:text-lg font-medium tracking-tight whitespace-nowrap">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center items-center sm:items-end border-t sm:border-t-0 border-white/10 pt-6 sm:pt-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-2 sm:mb-3 text-center sm:text-right">Initial Commitment</div>
                  <div className="text-4xl md:text-5xl font-black text-accent mb-1">€6,500</div>
                  <div className="text-xs sm:text-sm font-bold text-accent/60 mb-2 sm:mb-4">One-time Setup</div>
                  <div className="text-xs sm:text-sm font-bold opacity-30">+ €299/mo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'quote':
      return (
        <div className="flex-1 p-12 md:p-16 flex flex-col items-center text-center">
          <div className="max-w-6xl mx-auto w-full pt-24">
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
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full pt-16 sm:pt-24 text-center">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />
            </div>
            <div className="relative z-10">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="px-4">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">{slide.title}</h2>
                <p className="text-base sm:text-lg md:text-xl text-white/50 mb-10 sm:mb-12 leading-relaxed max-w-4xl mx-auto">{slide.subtitle}</p>
                <a
                  href="/ZestOS-Presentation.pdf"
                  download="ZestOS-Presentation.pdf"
                  className="inline-flex px-8 py-4 sm:px-10 sm:py-5 bg-black text-white border-2 border-white/20 rounded-full text-lg sm:text-xl md:text-2xl font-black items-center gap-3 sm:gap-4 hover:scale-110 hover:border-accent transition-all active:scale-95 shadow-[0_0_30px_rgba(165,241,78,0.2)] mx-auto cursor-pointer no-underline"
                >
                  Download PDF <Download className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                </a>
              </motion.div>
            </div>
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
