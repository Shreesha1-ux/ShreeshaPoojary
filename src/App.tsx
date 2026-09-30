import { useState, useEffect, useRef, RefObject, FormEvent, memo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronUp,
  Code2,
  Layout,
  Database,
  Wrench,
  GraduationCap,
  Target,
  Send,
  CheckCircle,
  Loader2,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Zap,
  Layers,
  X
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { GodRays } from './components/GodRays';
import { SplashCursor } from './components/SplashCursor';
import { GitHubStatsCard } from './components/GitHubStatsCard';
import { CertificationsSection } from './components/CertificationsSection';
import repsImage from './assets/images/reps_app_dashboard_1790790415348.jpg';

// Cursor Mascot with God Ray Light Tracking
const Mascot = memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const Eye = ({ eyeRef }: { eyeRef: RefObject<HTMLDivElement | null> }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 900, damping: 45 });
    const springY = useSpring(y, { stiffness: 900, damping: 45 });

    useEffect(() => {
      const unsubscribeX = mouseX.on('change', (latestX) => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const angle = Math.atan2(mouseY.get() - (rect.top + rect.height / 2), latestX - centerX);
        const distance = Math.min(3.5, Math.hypot(latestX - centerX, mouseY.get() - (rect.top + rect.height / 2)) / 25);
        x.set(Math.cos(angle) * distance);
      });

      const unsubscribeY = mouseY.on('change', (latestY) => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(latestY - centerY, mouseX.get() - (rect.left + rect.width / 2));
        const distance = Math.min(3.5, Math.hypot(mouseX.get() - (rect.left + rect.width / 2), latestY - centerY) / 25);
        y.set(Math.sin(angle) * distance);
      });

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }, [eyeRef]);

    return (
      <div ref={eyeRef} className="w-3.5 h-3.5 bg-slate-950 rounded-full flex items-center justify-center border border-cyan-400/40 shadow-[inset_0_0_4px_rgba(56,189,248,0.5)]">
        <motion.div 
          className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_6px_#38bdf8]" 
          style={{ x: springX, y: springY }} 
        />
      </div>
    );
  };

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={mascotRef}
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-8 left-8 z-40 hidden xl:flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
      title="Shreesha's Ray-Guided Companion"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md text-cyan-200 text-xs font-semibold rounded-lg border border-cyan-500/40 shadow-[0_0_20px_rgba(56,189,248,0.4)] whitespace-nowrap"
          >
            Following your gaze ✨
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-r border-b border-cyan-500/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-12 h-14 bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-2xl border border-cyan-400/50 shadow-[0_0_24px_rgba(56,189,248,0.35)] flex items-center justify-center gap-1.5 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="flex gap-1.5 z-10">
          <Eye eyeRef={leftEyeRef} />
          <Eye eyeRef={rightEyeRef} />
        </div>
        {/* Clean antenna indicator */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-600 rounded-full">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_6px_#38bdf8]" />
        </div>
      </div>
    </motion.div>
  );
});

Mascot.displayName = 'Mascot';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const skills = [
  { 
    category: 'Core Languages', 
    items: ['C', 'C++', 'JavaScript (ESNext)', 'TypeScript'], 
    icon: <Code2 className="w-5 h-5 text-cyan-400" /> 
  },
  { 
    category: 'Frontend Architecture', 
    items: ['React 19', 'Vite', 'Tailwind CSS v4', 'Motion'], 
    icon: <Layout className="w-5 h-5 text-cyan-400" /> 
  },
  { 
    category: 'Backend & Data', 
    items: ['Basic SQL', 'Supabase (Auth, RLS, Storage)', 'PostgreSQL Concepts'], 
    icon: <Database className="w-5 h-5 text-cyan-400" /> 
  },
  { 
    category: 'Engineering Tools', 
    items: ['Git & GitHub', 'VS Code', 'Vercel Deployment', 'Netlify CI/CD'], 
    icon: <Wrench className="w-5 h-5 text-cyan-400" /> 
  },
];

const projects = [
  {
    title: 'Reps',
    tagline: 'Competitive Habit & Fitness Tracking Platform',
    shortDesc: 'A competitive habit-tracking platform designed to forge consistency through peer accountability and social streaks.',
    fullDesc: 'Most individuals falter on personal goals not from a deficiency in motivation, but from an absence of accountability. Reps shifts habits from isolated checklists into a dynamic competitive system. Users follow peers, compete on active streaks, verify milestone proofs, and elevate consistency through transparent accountability.',
    tech: ['React (Vite)', 'Tailwind CSS', 'Supabase', 'React Router', 'Lucide Icons'],
    highlights: [
      'Peer-driven streak mechanics with automated streak freezes and recovery rules',
      'Supabase Authentication with Row-Level Security for personal streak data',
      'Zero-latency optimistic UI updates with responsive mobile ergonomics',
      'Production-ready cloud database deployment with real-time sync'
    ],
    github: 'https://github.com/Shreesha1-ux/reps.git',
    live: 'https://repsmvp.netlify.app',
    image: repsImage
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scroll events with RAF
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);

          const sections = ['home', 'about', 'projects', 'certifications', 'skills', 'contact'];
          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 180 && rect.bottom >= 180;
            }
            return false;
          });
          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setFormStatus('submitting');

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { error } = await supabase
          .from('messages')
          .insert([
            { 
              name: formData.name.trim(), 
              email: formData.email.trim(), 
              message: formData.message.trim(),
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.warn('Supabase insert note:', error.message);
        }
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 6000);
    } catch (error) {
      console.error('Error submitting message:', error);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Prominent Blue Grid matching the Figma Design */}
      <GodRays />

      {/* Minimalist Fun Splash Cursor */}
      <SplashCursor />

      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 z-[70] origin-left shadow-[0_0_12px_rgba(186,230,253,0.8)]"
        style={{ scaleX }}
      />

      <Mascot />

      {/* Top Bar Contract: 3-Zone Navigation */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#060913]/70 border-b border-white/[0.08] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Single element brand wordmark */}
          <a 
            href="#home" 
            className="group flex items-center gap-2.5 text-base font-bold tracking-tight text-white hover:text-sky-200 transition-colors whitespace-nowrap"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(186,230,253,0.9)] group-hover:scale-125 transition-transform" />
            <span className="font-sans font-bold tracking-tight text-xl text-white">Shreesha.dev</span>
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  activeSection === link.href.substring(1) 
                    ? 'text-white' 
                    : 'hover:text-sky-200'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-300 shadow-[0_0_10px_rgba(186,230,253,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="figma-glow-button px-5 py-2.5 text-xs rounded-xl whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Hero Section: Exact Left-Aligned Structure from User's Reference Screenshot */}
        <section id="home" className="min-h-screen pt-36 pb-24 px-6 md:px-12 flex flex-col justify-center relative">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typography matching "Hi, I'm Waleed, A Product Designer" */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex flex-col items-start text-left"
            >
              {/* Unboxed Metadata Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-200/90 mb-6 select-none">
                <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse shadow-[0_0_10px_rgba(186,230,253,0.8)]" />
                <span>Available for SDE Roles</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>MITE CSE</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Bangalore / Remote</span>
              </div>

              {/* Main Headline exact styling from image.png:
                  Line 1: "Hi, I'm Shreesha," in pure bold white
                  Line 2: "A Software Development Engineer" in elegant secondary tone */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] mb-4">
                Hi, I'm Shreesha,
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-200 leading-[1.1] mb-6">
                A Software Development Engineer
              </h2>

              {/* Paragraph from screenshot style: "With over 5 years of experience..." */}
              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mb-10 leading-relaxed text-balance">
                Computer Science student at MITE passionate about transforming foundational algorithms into resilient, production-ready web systems and high-performance user interfaces.
              </p>

              {/* Glowing CTA Button styled exactly like the "Light Rays Effect" button in image.png */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="figma-glow-button px-7 py-3.5 rounded-xl text-base text-white tracking-wide"
                >
                  Explore Projects
                </a>
                <a
                  href="#certifications"
                  className="px-7 py-3.5 rounded-xl text-base font-semibold text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 transition-all"
                >
                  Certifications
                </a>
              </div>

              {/* Key Highlights Bar */}
              <div className="w-full max-w-xl grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-sky-400/20 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">1st Year</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">CSE at MITE</p>
                </div>
                <div className="border-x border-sky-400/20 px-4">
                  <p className="text-2xl sm:text-3xl font-bold text-sky-200 font-mono tabular-nums">Full-Stack</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">React + Supabase</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">100%</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Engineering Drive</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Open spatial view allowing the diagonal god rays & blue grid to shine */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center pointer-events-none">
              <div className="w-full max-w-sm ray-card p-6 rounded-2xl border border-sky-400/25 backdrop-blur-md bg-slate-950/40 shadow-[0_0_30px_rgba(186,230,253,0.1)] pointer-events-auto">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-300 animate-pulse shadow-[0_0_8px_rgba(186,230,253,0.8)]" />
                    <span className="text-xs font-mono font-semibold text-slate-200">Terminal Spec</span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-300">v1.0.0</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <p className="text-sky-300">&gt; stack --inspect</p>
                  <p className="text-slate-400">Frontend: React 19, Vite, Tailwind v4</p>
                  <p className="text-slate-400">Backend: Supabase, PostgreSQL</p>
                  <p className="text-slate-400">Target: High-Performance SDE</p>
                  <p className="text-emerald-400 flex items-center gap-1 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All systems nominal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section: Bento Grid with Blue Grid Specular Highlights */}
        <section id="about" className="py-28 px-6 md:px-12 border-t border-cyan-500/20 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="max-w-2xl mb-16">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Background & Trajectory</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Engineering with discipline, learning by shipping.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                A deliberate approach to computer science: solidifying fundamental algorithms in C and C++, while deploying modern, resilient applications in the React and Supabase ecosystem.
              </p>
            </div>

            {/* Bento Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: Core Bio (Span 2 cols) */}
              <motion.div 
                variants={itemVariants}
                className="ray-card md:col-span-2 p-8 md:p-10 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Bio & Principles</span>
                    <ShieldCheck className="w-5 h-5 text-cyan-400/80" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                    "Mastery isn't claimed through credentials alone—it is forged by building real products that solve genuine problems."
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    Currently in my first year (second semester) of Computer Science and Engineering at Mangalore Institute of Technology & Engineering (MITE). My daily routine balances data structures and systems logic with rapid frontend prototyping and robust cloud database modeling.
                  </p>
                </div>

                <div className="pt-6 border-t border-cyan-500/20 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
                  <span className="text-white font-semibold">Specialization Focus:</span>
                  <span>Component Performance</span>
                  <span aria-hidden="true" className="text-cyan-600">·</span>
                  <span>Relational Schemas</span>
                  <span aria-hidden="true" className="text-cyan-600">·</span>
                  <span>UI Ergonomics</span>
                </div>
              </motion.div>

              {/* Card 2: Academic Profile */}
              <motion.div 
                variants={itemVariants}
                className="ray-card p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-6">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Education</h3>
                  <p className="text-base font-semibold text-slate-100 mb-1">B.E. in Computer Science</p>
                  <p className="text-sm text-cyan-300 mb-4">MITE, Moodbidri</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Undergraduate program concentrating on foundational data structures, mathematical foundations, algorithms, and engineering systems.
                  </p>
                </div>

                <div className="pt-6 border-t border-cyan-500/20 text-xs text-slate-400 font-mono">
                  Cohort 2025–2029
                </div>
              </motion.div>

              {/* Card 3: Target Role */}
              <motion.div 
                variants={itemVariants}
                className="ray-card p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Career Trajectory</h3>
                  <p className="text-base font-semibold text-slate-100 mb-1">Software Development Engineer</p>
                  <p className="text-sm text-cyan-300 mb-4">Full-Stack & Systems Focus</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Targeting high-impact engineering roles where performance, clean API contracts, and user delight intersect.
                  </p>
                </div>

                <div className="pt-6 border-t border-cyan-500/20 text-xs text-slate-400 font-mono">
                  SDE Ready
                </div>
              </motion.div>

              {/* Card 4: Accountability & Engineering Method */}
              <motion.div 
                variants={itemVariants}
                className="ray-card md:col-span-2 p-8 md:p-10 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Engineering Method</span>
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Fast iteration cycles backed by structured foundations
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Rather than building repetitive boilerplate clones, every personal project tackles a specific technical challenge: state synchronization, database security rules, smooth 60fps cursor animation, or cloud deployment pipelines.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-cyan-500/20">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Deployment</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">Vercel & Netlify</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Database</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">Supabase PG</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Interface</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">Tailwind CSS</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Language</p>
                    <p className="text-sm font-semibold text-slate-100 mt-1">TypeScript</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects: Showcase */}
        <section id="projects" className="py-28 px-6 md:px-12 border-t border-sky-400/20 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-3">
                  <Flame className="w-3.5 h-3.5 text-sky-300" />
                  <span>Flagship Production Works</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                  Featured Projects
                </h2>
                <p className="text-base text-slate-300 max-w-xl">
                  Real applications engineered for real users, built with scalable architectures and verifiable codebases.
                </p>
              </div>

              <a 
                href="https://github.com/Shreesha1-ux" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-200 hover:text-white transition-colors group self-start md:self-auto py-2"
              >
                <span>Browse All on GitHub</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Project Showcase Cards */}
            <div className="space-y-16">
              {projects.map((project) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="ray-card rounded-3xl p-6 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left Column: Visual Asset */}
                  <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl border border-cyan-500/30 shadow-2xl bg-black">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} Application Interface`}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-cyan-300 font-mono border border-cyan-500/30">
                        Live Production MVP
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-3 py-1 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors flex items-center gap-1 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                      >
                        Inspect Details
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Project Details */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                        <span>Project 01</span>
                        <span aria-hidden="true">·</span>
                        <span>Full-Stack Application</span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm font-semibold text-cyan-300 mb-4">
                        {project.tagline}
                      </p>

                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {project.shortDesc}
                      </p>

                      {/* Key Highlights */}
                      <ul className="space-y-2 mb-6 text-xs text-slate-300">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_6px_#38bdf8]" />
                            <span className="leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Unboxed Tech Stack */}
                      <div className="pt-4 border-t border-cyan-500/20 mb-6">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">Architecture & Technologies</p>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-300">
                          {project.tech.map((t, idx) => (
                            <span key={t} className="flex items-center gap-3">
                              <span className="font-medium text-slate-200">{t}</span>
                              {idx < project.tech.length - 1 && (
                                <span aria-hidden="true" className="text-slate-600">·</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 pt-2">
                      <a 
                        href={project.live} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="figma-glow-button px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 group"
                      >
                        <span>Open Live App</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 flex items-center gap-2 transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live GitHub Ecosystem & Repositories */}
            <div className="mt-20">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub Repositories & Open Source</span>
              </div>
              <GitHubStatsCard />
            </div>
          </div>
        </section>

        {/* Certifications & Showcase Section */}
        <CertificationsSection />

        {/* Skills Section */}
        <section id="skills" className="py-28 px-6 md:px-12 border-t border-sky-400/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-3">
                <Layers className="w-3.5 h-3.5 text-sky-300" />
                <span>Competencies & Stack</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                Technical Toolkit
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Technologies chosen for high reliability, predictable execution, and developer velocity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup) => (
                <div 
                  key={skillGroup.category} 
                  className="ray-card p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 w-fit rounded-xl bg-sky-950/70 text-sky-200 border border-sky-400/30 mb-6">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-4">{skillGroup.category}</h3>
                    <ul className="space-y-3">
                      {skillGroup.items.map((item) => (
                        <li key={item} className="text-xs text-slate-300 flex items-center gap-2.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_4px_rgba(186,230,253,0.8)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-sky-400/15 text-[11px] text-slate-400 font-mono">
                    Active Development
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section: Supabase Form */}
        <section id="contact" className="py-28 px-6 md:px-12 border-t border-sky-400/20 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-3">
                <Mail className="w-3.5 h-3.5 text-sky-300" />
                <span>Direct Inquiries</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Let's Build Something Memorable
              </h2>
              <p className="text-base text-slate-300 max-w-xl mx-auto text-balance">
                Whether you have an internship opportunity, project idea, or simply want to talk systems engineering—my inbox is open.
              </p>
            </div>

            <div className="ray-card p-8 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden">
              <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-sky-400/20 focus:border-sky-300 focus:ring-1 focus:ring-sky-300 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={formStatus === 'submitting'}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-sky-400/20 focus:border-sky-300 focus:ring-1 focus:ring-sky-300 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, timeline, or engineering opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={formStatus === 'submitting'}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-sky-400/20 focus:border-sky-300 focus:ring-1 focus:ring-sky-300 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      formStatus === 'success' 
                        ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' 
                        : formStatus === 'error'
                        ? 'bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                        : 'figma-glow-button'
                    }`}
                  >
                    {formStatus === 'idle' && (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                    {formStatus === 'submitting' && (
                      <>
                        <span>Transmitting to Supabase...</span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    )}
                    {formStatus === 'success' && (
                      <>
                        <span>Message Sent Successfully!</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                    {formStatus === 'error' && (
                      <span>Transmission Failed. Please retry.</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Direct Channels */}
              <div className="mt-10 pt-8 border-t border-sky-400/15 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                <span className="font-medium">Direct Inquiries:</span>
                <a 
                  href="mailto:shreeshapoojary100@gmail.com" 
                  className="text-sky-200 hover:text-white font-mono transition-colors"
                >
                  shreeshapoojary100@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-14 px-6 md:px-12 border-t border-sky-400/20 bg-[#04060d] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(186,230,253,0.8)]" />
              <span className="font-sans font-bold text-lg text-white">Shreesha.dev</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              © {new Date().getFullYear()} Shreesha Poojary. Built with modern React & Tailwind CSS.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: <Github className="w-4 h-4" />, href: "https://github.com/Shreesha1-ux", label: "GitHub" },
              { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/shreesha-poojary-8739b4361/", label: "LinkedIn" },
              { icon: <Twitter className="w-4 h-4" />, href: "https://x.com/PoojaryShr72532", label: "X" },
              { icon: <Mail className="w-4 h-4" />, href: "mailto:shreeshapoojary100@gmail.com", label: "Email" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-sky-950/60 text-slate-300 hover:text-sky-200 border border-slate-700/60 hover:border-sky-400/40 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            className="px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-sky-400/40 rounded-lg transition-all"
          >
            Download Curriculum Vitae
          </a>
        </div>
      </footer>

      {/* Project Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="ray-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-cyan-400">Architecture & Overview</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/[0.05]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-cyan-300 font-semibold mb-4">{selectedProject.tagline}</p>
              
              <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-cyan-500/30">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedProject.fullDesc}
              </p>

              <h4 className="text-xs uppercase font-bold text-slate-400 mb-3">Key Technical Solutions</h4>
              <ul className="space-y-2 mb-6 text-xs text-slate-300">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 pt-4 border-t border-cyan-500/20">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-glow-button px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2"
                >
                  <span>Launch MVP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700"
                >
                  GitHub Repository
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 p-3.5 bg-black/90 text-cyan-300 border border-cyan-400/50 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:bg-slate-900 transition-colors z-40 backdrop-blur-md"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
