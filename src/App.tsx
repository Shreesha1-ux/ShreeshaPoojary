/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, RefObject } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Moon, 
  Sun, 
  ExternalLink, 
  ChevronUp,
  Code2,
  Layout,
  Database,
  Wrench,
  GraduationCap,
  Target,
  User,
  Send
} from 'lucide-react';

// Cursor Mascot Component
const Mascot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getEyeStyle = (eyeRef: RefObject<HTMLDivElement | null>) => {
    if (!eyeRef.current) return {};
    const rect = eyeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const distance = Math.min(4, Math.hypot(mousePos.x - centerX, mousePos.y - centerY) / 20);
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    return { transform: `translate(${x}px, ${y}px)` };
  };

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={mascotRef}
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-24 left-6 z-40 hidden lg:flex flex-col items-center gap-2 pointer-events-auto cursor-help"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg shadow-xl whitespace-nowrap"
          >
            Hello there! 👋
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-12 h-14 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center gap-2 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-400 opacity-50" />
        
        {/* Eyes */}
        <div className="flex gap-2 z-10">
          <div ref={leftEyeRef} className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full transition-transform duration-75 ease-out" style={getEyeStyle(leftEyeRef)} />
          </div>
          <div ref={rightEyeRef} className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full transition-transform duration-75 ease-out" style={getEyeStyle(rightEyeRef)} />
          </div>
        </div>
        
        {/* Antenna */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-600 rounded-full">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    { category: 'Languages', items: ['C', 'C++'], icon: <Code2 className="w-5 h-5" /> },
    { category: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'], icon: <Layout className="w-5 h-5" /> },
    { category: 'Backend / Database', items: ['Basic SQL', 'Supabase (Learning)'], icon: <Database className="w-5 h-5" /> },
    { category: 'Tools', items: ['VS Code', 'Git', 'GitHub'], icon: <Wrench className="w-5 h-5" /> },
  ];

  const projects = [
    {
      title: 'Reps',
      shortDesc: 'A competitive habit-tracking platform designed to build consistency through accountability and competition.',
      fullDesc: 'Most people fail to stay consistent not because of lack of motivation, but due to lack of accountability. Reps solves this by turning habits into a competitive system. Users can follow others, compete, build streaks, and stay accountable by sharing real progress. It is not just tracking, it is proving consistency.',
      tech: ['React (Vite)', 'Tailwind CSS', 'Supabase (Auth, Database, Storage)', 'React Router', 'Lucide Icons'],
      github: 'https://github.com/Shreesha1-ux/reps.git',
      live: 'https://repsmvp.netlify.app',
      image: 'https://picsum.photos/seed/fitness-streak/800/600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'} transition-colors duration-500`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Mascot />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${activeSection !== 'home' ? 'backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#home" 
            className="text-xl font-bold tracking-tighter hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shreesha.dev
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  activeSection === link.href.substring(1) ? 'text-blue-600' : 'text-zinc-500 dark:text-zinc-400 hover:text-blue-600'
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
        {/* Professional Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        {/* Background Accents */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-bold tracking-[0.2em] uppercase bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open for Collaboration
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-8 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            Shreesha <br className="hidden md:block" /> Poojary
          </h1>
          
          <div className="flex flex-col items-center gap-6 mb-12">
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold tracking-tight">
              Software Development Engineer | Web Developer
            </p>
            <div className="h-px w-12 bg-zinc-200 dark:border-zinc-800" />
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
              CSE student at MITE passionate about building scalable web applications and mastering full-stack development.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a
              href="#projects"
              className="group px-10 py-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-bold text-lg shadow-2xl shadow-zinc-950/20 dark:shadow-white/10 flex items-center gap-2"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore My Work
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ExternalLink className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-10 py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8 flex items-center gap-4">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <User className="w-6 h-6" />
                </div>
                About Me
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl leading-relaxed text-zinc-800 dark:text-zinc-300 mb-10">
                I’m a Computer Science student at Mangalore Institute of Technology & Engineering, currently in my first year. 
                I’m focused on becoming a Software Development Engineer and enjoy building real-world projects while exploring 
                modern web technologies. I believe in learning by building and improving through consistency.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-blue-500/30 transition-colors group">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">Education</h4>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">B.E. in Computer Science and Engineering</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">MITE, Moodbidri (1st Year, 2nd Sem)</p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 hover:border-blue-500/30 transition-colors group">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">Goal</h4>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">Software Development Engineer (SDE)</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Full-stack Aspirant</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skills.map((skill) => (
                <motion.div 
                  key={skill.category} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-xl hover:shadow-blue-600/5 transition-all"
                >
                  <div className="mb-6 p-3 w-fit rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-4">{skill.category}</h3>
                  <ul className="space-y-3">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-zinc-500 dark:text-zinc-400">A selection of my recent work and experiments.</p>
            </div>
            <motion.a 
              href="https://github.com/Shreesha1-ux" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold flex items-center gap-2 group"
              whileHover={{ x: 5 }}
            >
              View all on GitHub <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 gap-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`group relative grid lg:grid-cols-12 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:col-span-7 relative overflow-hidden rounded-[2.5rem] aspect-video bg-zinc-100 dark:bg-zinc-800 shadow-2xl">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-5xl font-bold mb-6">{project.title}</h3>
                    <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">{project.shortDesc}</p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                      {project.fullDesc}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-8">
                      <motion.a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-bold text-lg hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Github className="w-6 h-6" /> Code
                      </motion.a>
                      <motion.a 
                        href={project.live} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 font-bold text-lg hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ExternalLink className="w-6 h-6" /> Live Demo
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Let's Build Something Great</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 text-left" 
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
              <textarea
                rows={5}
                placeholder="Your message here..."
                className="w-full px-6 py-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none placeholder:text-zinc-600"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="mt-4 w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold tracking-tighter mb-3">Shreesha.dev</p>
            <p className="text-zinc-500">© {new Date().getFullYear()} Shreesha Poojary. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="w-5 h-5" />, href: "https://github.com/Shreesha1-ux" },
              { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/shreesha-poojary-8739b4361/" },
              { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/PoojaryShr72532" },
              { icon: <Mail className="w-5 h-5" />, href: "mailto:Shreeshapoojar100@gmail.com" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:text-blue-600 transition-colors"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/resume.pdf"
            className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-5 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
