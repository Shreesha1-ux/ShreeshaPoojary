import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ExternalLink, 
  Building2, 
  Calendar, 
  Search, 
  X, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

import {
  ClaudeAcademyBadge,
  InfosysCertificate,
  IBMCourseraCertificate,
  CommonwealthBankCertificate,
  MastercardCybersecurityCertificate,
  AmazonSpringpodCertificate,
  GoogleAmbassadorCertificate,
  MITEForgeQuestCertificate,
  SQLUsingAICertificate,
} from './certificates/AuthenticCertificates';

export interface CertificateDoc {
  id: string;
  title: string;
  issuer: string;
  issuerCategory: 'Cloud & AI' | 'Software Engineering' | 'Industry Simulation' | 'Institution & Competitions';
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  description: string;
  renderComponent: (className?: string) => React.ReactNode;
}

export const CERTIFICATE_DOCS: CertificateDoc[] = [
  {
    id: 'anthropic-badge',
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Claude Academy / Anthropic',
    issuerCategory: 'Cloud & AI',
    issueDate: 'September 13, 2026',
    skills: ['Agentic AI', 'LLM Architectures', 'Cognitive Frameworks', 'Prompt Engineering'],
    description: 'Course Completion Badge presented to shreesha poojary covering fundamental AI fluency, framework orchestration, and foundation models.',
    renderComponent: (className) => <ClaudeAcademyBadge className={className} />,
  },
  {
    id: 'ibm-coursera',
    title: 'Introduction to Software Engineering',
    issuer: 'IBM (authorized on Coursera)',
    issuerCategory: 'Software Engineering',
    issueDate: 'October 28, 2025',
    credentialId: '5RASXFWL0OFN',
    verificationUrl: 'https://coursera.org/verify/5RASXFWL0OFN',
    skills: ['Software Architecture', 'SDLC', 'Design Patterns', 'Unit Testing', 'Quality Assurance'],
    description: 'Authorized by IBM and offered through Coursera, verifying comprehensive software lifecycle methods, development practices, and architecture.',
    renderComponent: (className) => <IBMCourseraCertificate className={className} />,
  },
  {
    id: 'cba-forage',
    title: 'Software Engineering Job Simulation',
    issuer: 'Commonwealth Bank (via Forage)',
    issuerCategory: 'Industry Simulation',
    issueDate: 'September 6th, 2026',
    credentialId: '6a9d0a3271585ae064b8e466',
    skills: ['.NET Backend', 'React / Redux', 'Client Requests', 'Code Coverage', 'Pull Requests'],
    description: 'Practical simulation tasks modifying .NET backends and React/Redux frontend components, writing unit tests, and submitting Git pull requests.',
    renderComponent: (className) => <CommonwealthBankCertificate className={className} />,
  },
  {
    id: 'infosys-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    issuerCategory: 'Cloud & AI',
    issueDate: 'May 3, 2026',
    verificationUrl: 'https://verify.onwingspan.com',
    skills: ['Artificial Intelligence', 'Machine Learning Basics', 'Heuristics', 'Data Ethics'],
    description: 'Course Completion Certificate from Infosys Springboard for successfully completing the Introduction to Artificial Intelligence program.',
    renderComponent: (className) => <InfosysCertificate className={className} />,
  },
  {
    id: 'mastercard-forage',
    title: 'Cybersecurity Job Simulation',
    issuer: 'Mastercard (via Forage)',
    issuerCategory: 'Industry Simulation',
    issueDate: 'September 10th, 2026',
    credentialId: '6aa28acd39befb14b58d4f70',
    skills: ['Phishing Simulations', 'Risk Mitigation', 'Enterprise Security', 'Pattern Interpretation'],
    description: 'Designed corporate phishing security simulations and interpreted results to build comprehensive threat mitigation roadmaps for enterprise stakeholders.',
    renderComponent: (className) => <MastercardCybersecurityCertificate className={className} />,
  },
  {
    id: 'amazon-springpod',
    title: 'Digital Skills: Data Analysis & Storytelling',
    issuer: 'Amazon & Springpod',
    issuerCategory: 'Cloud & AI',
    issueDate: '05/09/2026',
    credentialId: 'nola81p8ad1t',
    skills: ['Data Analysis', 'Storytelling with Data', 'Business Metrics', 'Insight Visualization'],
    description: 'Completed Springpod experience in partnership with Amazon focusing on synthesizing large-scale data and articulating compelling narratives for leadership.',
    renderComponent: (className) => <AmazonSpringpodCertificate className={className} />,
  },
  {
    id: 'google-ambassador',
    title: 'Google Student Campus Ambassador — Game Night Edition',
    issuer: 'Google',
    issuerCategory: 'Institution & Competitions',
    issueDate: '25/04/2026',
    skills: ['Creativity & Innovation', 'Campus Leadership', 'Technical Collaboration'],
    description: 'Actively participated in Game Night organized under the Google Student Campus Ambassador Program, showcasing exceptional creativity skills.',
    renderComponent: (className) => <GoogleAmbassadorCertificate className={className} />,
  },
  {
    id: 'sql-ai-workshop',
    title: 'SQL Using AI Workshop',
    issuer: 'AI For Techies',
    issuerCategory: 'Software Engineering',
    issueDate: 'October 12th, 2025',
    skills: ['SQL Preprocessing', 'AI Automation', 'Data Analysis', 'Query Optimization'],
    description: 'Completed 3-hours intensive workshop on extracting and analyzing business insights, automating repetitive data tasks, and optimizing SQL pipelines.',
    renderComponent: (className) => <SQLUsingAICertificate className={className} />,
  },
  {
    id: 'mite-forgequest',
    title: 'Forge Quest — Computer Science & Engineering',
    issuer: 'MITE & Computer Society of India',
    issuerCategory: 'Institution & Competitions',
    issueDate: '25th October 2025',
    skills: ['Problem Solving', 'Algorithm Design', 'CSI Hackathon'],
    description: 'Certificate of participation in Forge Quest technical event organized by the Department of Computer Science & Engineering at MITE with CSI.',
    renderComponent: (className) => <MITEForgeQuestCertificate className={className} />,
  },
];

export const CertificationsSection: React.FC = memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertificateDoc | null>(null);
  
  // Horizontal Carousel scroll ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse wheel-to-horizontal-scroll & drag-to-scroll implementation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Convert mouse wheel (vertical delta) into smooth horizontal scroll when hovering over certificates
    const handleWheel = (e: WheelEvent) => {
      // If user is already scrolling horizontally (e.g. shift key or trackpad), let browser handle it
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Check boundary conditions: if at very start and scrolling up, or very end and scrolling down, allow page scroll
      const isAtStart = container.scrollLeft <= 5 && e.deltaY < 0;
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 5 && e.deltaY > 0;

      if (!isAtStart && !isAtEnd) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY * 1.5,
          behavior: 'auto', // immediate response for wheel feel
        });
      }
    };

    // Click and drag to scroll
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const handleMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking buttons or links
      if ((e.target as HTMLElement).closest('button, a')) return;
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollStart = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.6; // Scroll speed multiplier
      container.scrollLeft = scrollStart - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      if (container) {
        container.style.cursor = 'grab';
        container.style.removeProperty('user-select');
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.style.cursor = 'grab';

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const categories = ['All', 'Cloud & AI', 'Software Engineering', 'Industry Simulation', 'Institution & Competitions'];

  const filteredCerts = CERTIFICATE_DOCS.filter((cert) => {
    const matchesCategory = activeCategory === 'All' || cert.issuerCategory === activeCategory;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -440, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 440, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="py-28 px-6 md:px-12 border-t border-sky-400/20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-300 mb-3">
              <Award className="w-4 h-4 text-sky-300" />
              <span>Verified Industry Documents & Certificates</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Certifications & Showcase
            </h2>
            <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
              Authentic credential documents and job simulations from IBM, Anthropic, Commonwealth Bank, Google, and Infosys.
            </p>
          </div>

          {/* Interactive Scroll Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-sky-400/20 hover:border-sky-300/40 transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Scroll left"
              title="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-sky-400/20 hover:border-sky-300/40 transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Scroll right"
              title="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-sky-400/15">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-300 text-slate-950 font-bold shadow-[0_0_16px_rgba(186,230,253,0.5)]'
                    : 'text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificate or skill..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 text-xs text-slate-200 placeholder-slate-400 rounded-xl border border-sky-400/20 focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-300 transition-all font-mono"
            />
          </div>
        </div>

        {/* Scrollable Horizontal Certificate Carousel: Wheel & Drag Enabled */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar select-none"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0 w-[340px] sm:w-[410px] md:w-[440px] ray-card rounded-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:border-sky-300/40 hover:-translate-y-1.5"
            >
              {/* Document Vector Render Box */}
              <div 
                className="relative aspect-[16/11] bg-black overflow-hidden border-b border-sky-400/20 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Scaled preview of the authentic certificate */}
                <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105 pointer-events-none">
                  {cert.renderComponent('w-full h-full')}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-xl bg-slate-950/90 text-white font-bold text-xs border border-sky-300 flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
                    Inspect Full Certificate
                  </span>
                </div>

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-950/90 text-sky-200 border border-sky-400/30 backdrop-blur-md">
                    {cert.issuerCategory}
                  </span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-300 mb-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="font-semibold">{cert.issuer}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedCert(cert)}
                    className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors leading-snug mb-2 cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div>
                  {/* Skills Pill Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] bg-sky-950/50 text-sky-200 border border-sky-400/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[11px] text-slate-400 bg-slate-900 border border-slate-800">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Card Bottom Info */}
                  <div className="pt-3 border-t border-sky-400/15 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cert.issueDate}</span>
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="text-sky-300 group-hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-sky-400/15 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse shadow-[0_0_8px_rgba(186,230,253,0.8)]" />
            <span>Hover and use your mouse wheel or drag to scroll seamlessly from side to side</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-sky-300/80">
            <span>Arrow buttons, trackpad, and click-to-expand supported</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal: Inspect Full Authentic Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-slate-900 border border-sky-400/30 rounded-3xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
            >
              {/* Top Modal Controls */}
              <div className="p-4 px-6 bg-slate-950 border-b border-sky-400/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950 text-sky-200 border border-sky-400/30">
                    {selectedCert.issuerCategory}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedCert.issueDate}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Document Renderer */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#03060c] flex items-center justify-center min-h-[380px]">
                <div className="w-full max-w-2xl aspect-[16/11] rounded-xl overflow-hidden shadow-2xl border border-sky-400/30">
                  {selectedCert.renderComponent('w-full h-full')}
                </div>
              </div>

              {/* Document Metadata Details */}
              <div className="p-6 bg-slate-900 border-t border-sky-400/20">
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedCert.title}
                </h3>
                <p className="text-sm font-semibold text-sky-300 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{selectedCert.issuer}</span>
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {selectedCert.description}
                </p>

                {/* Skills verified */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-950/80 text-sky-200 border border-sky-400/25 flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3 h-3 text-sky-300" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  {selectedCert.credentialId && (
                    <span className="font-mono text-slate-400">
                      Credential ID: <strong className="text-slate-200">{selectedCert.credentialId}</strong>
                    </span>
                  )}

                  <div className="flex items-center gap-3 ml-auto">
                    {selectedCert.verificationUrl && (
                      <a
                        href={selectedCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="figma-glow-button px-4 py-2 rounded-xl text-xs flex items-center gap-2"
                      >
                        <span>Verify Online</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

CertificationsSection.displayName = 'CertificationsSection';
