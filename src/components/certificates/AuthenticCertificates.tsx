import React from 'react';

// Exact replica of user's Claude Academy Course Completion Badge (Anthropic.png)
export const ClaudeAcademyBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-[#cc6b49] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans ${className}`}>
    {/* Inner Polygon / Badge Shape matching Anthropic.png */}
    <div 
      className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square bg-[#f2cbb4] shadow-2xl flex flex-col items-center justify-center p-6 text-center"
      style={{
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
      }}
    >
      {/* Arching "COURSE COMPLETION BADGE" SVG text */}
      <div className="absolute top-3 inset-x-0 h-16 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 300 70" className="w-48 sm:w-56 overflow-visible">
          <path id="badge-curve" d="M 30,55 A 120,120 0 0,1 270,55" fill="transparent" />
          <text className="fill-[#cc6b49] text-[13px] font-mono font-bold tracking-[0.22em] uppercase">
            <textPath href="#badge-curve" startOffset="50%" textAnchor="middle">
              Course Completion Badge
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Compass Emblem */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#cc6b49] bg-[#f2cbb4] flex items-center justify-center mb-2 mt-4 shadow-sm">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#cc6b49] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#cc6b49] fill-none stroke-[1.8] transform rotate-45">
            <polygon points="12 2 15 12 12 22 9 12 12 2" fill="#cc6b49" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="text-xl sm:text-2xl font-serif font-black text-[#1a1816] tracking-tight leading-[1.1] mb-1">
        AI Fluency:
      </h3>
      <h4 className="text-lg sm:text-xl font-serif font-bold text-[#1a1816] tracking-tight leading-[1.1] mb-4">
        Framework & Foundations
      </h4>

      {/* Presented To */}
      <p className="text-[11px] sm:text-xs text-[#5c3e34] font-serif mb-0.5">Presented to</p>
      <p className="text-sm sm:text-base font-serif font-bold text-[#1a1816]">shreesha poojary</p>
    </div>

    {/* Bottom Bar: Claude Academy & Issued Date */}
    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[11px] sm:text-xs font-medium">
      <div className="flex items-center gap-1.5">
        {/* Claude Starburst */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M12 0L13.5 8.5L22 7L15 12L22 17L13.5 15.5L12 24L10.5 15.5L2 17L9 12L2 7L10.5 8.5L12 0Z" />
        </svg>
        <span className="font-serif font-bold tracking-wide">Claude Academy</span>
      </div>
      <span className="font-mono tracking-wider uppercase text-[10px] text-white/90">
        Issued September 13, 2026
      </span>
    </div>
  </div>
);

// Exact replica of user's Infosys Springboard Certificate (Page 1)
export const InfosysCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-white text-[#1f2937] p-6 sm:p-8 flex flex-col justify-between select-none font-sans border border-slate-200 shadow-xl ${className}`}>
    {/* Header: Infosys Logo */}
    <div className="text-center pt-2">
      <h2 className="text-3xl font-extrabold tracking-tight text-[#007cc3] font-sans inline-block">
        Infosys
      </h2>
      <p className="text-[10px] tracking-widest uppercase text-[#555] font-semibold">
        Navigate your next
      </p>
    </div>

    {/* Document Title with striped barcode flanks */}
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-4 flex items-center gap-0.5 opacity-60">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-0.5 h-3 bg-[#007cc3]" />
        ))}
      </div>
      <h3 className="text-base sm:text-lg font-bold tracking-widest uppercase text-[#007cc3] font-sans">
        COURSE COMPLETION CERTIFICATE
      </h3>
      <div className="h-4 flex items-center gap-0.5 opacity-60">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-0.5 h-3 bg-[#007cc3]" />
        ))}
      </div>
    </div>

    {/* Body Content */}
    <div className="text-center py-2">
      <p className="text-xs text-slate-500 mb-1">The certificate is awarded to</p>
      <h4 className="text-2xl sm:text-3xl font-extrabold text-[#007cc3] mb-2 tracking-tight">
        Shreesha poojary
      </h4>
      <p className="text-xs text-slate-600 mb-1">for successfully completing the course</p>
      <p className="text-base sm:text-lg font-bold text-slate-900 mb-1">
        Introduction to Artificial Intelligence
      </p>
      <p className="text-xs font-semibold text-slate-600">on May 3, 2026</p>
    </div>

    {/* Infosys Springboard Banner */}
    <div className="text-center my-1">
      <div className="inline-flex items-center gap-2 text-xl font-bold">
        <span className="text-[#007cc3] font-sans">Infosys</span>
        <span className="text-slate-400">|</span>
        <span className="text-[#f97316] font-mono">Springbôard</span>
      </div>
      <p className="text-xs text-[#f97316] italic font-serif mt-1">
        Congratulations! You make us proud!
      </p>
    </div>

    {/* Footer: QR Code & Signature */}
    <div className="flex items-end justify-between pt-4 border-t border-slate-100 text-[10px] text-slate-500">
      <div className="flex items-center gap-2.5">
        {/* QR Code representation */}
        <div className="w-12 h-12 border border-slate-300 p-0.5 bg-slate-50 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-3.5 h-3.5 bg-slate-900" />
            <div className="w-3.5 h-3.5 bg-slate-900" />
          </div>
          <div className="text-[7px] text-center font-mono">VERIFY</div>
          <div className="w-3.5 h-3.5 bg-slate-900" />
        </div>
        <div>
          <p className="font-semibold text-slate-700">Issued on: Sunday, May 3, 2026</p>
          <p className="text-[#007cc3] underline font-mono text-[9px]">verify.onwingspan.com</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-serif italic text-base text-slate-800 leading-none">Satheesha B.N.</p>
        <p className="font-bold text-slate-800 text-[10px] mt-1">Satheesha B. Nanjappa</p>
        <p className="text-[9px] text-slate-500">Senior Vice President and Head</p>
        <p className="text-[9px] text-slate-500">Education, Training and Assessment</p>
        <p className="text-[9px] font-semibold text-slate-700">Infosys Limited</p>
      </div>
    </div>
  </div>
);

// Exact replica of user's IBM Coursera Certificate (Page 3)
export const IBMCourseraCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-[#fdfdfd] text-[#1c1c1c] p-6 sm:p-8 flex flex-col justify-between select-none font-serif border border-slate-300 shadow-xl ${className}`}>
    {/* Top Bar: IBM striped logo & Certificate label */}
    <div className="flex items-start justify-between border-b border-slate-200 pb-3">
      <div>
        <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#054ada] font-mono leading-none">
          IBM
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-sans font-bold tracking-widest text-slate-500 uppercase">COURSE</p>
        <p className="text-[11px] font-sans font-bold tracking-widest text-slate-500 uppercase">CERTIFICATE</p>
      </div>
    </div>

    {/* Body */}
    <div className="py-4">
      <p className="text-xs text-slate-400 font-sans mb-3">Oct 28, 2025</p>
      <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 mb-2">
        Shreesha T Poojary
      </h3>
      <p className="text-xs text-slate-500 font-sans mb-2">has successfully completed</p>
      <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-2">
        Introduction to Software Engineering
      </h4>
      <p className="text-xs text-slate-600 font-sans max-w-md">
        an online course authorized by IBM and offered through Coursera
      </p>
    </div>

    {/* Seal / Coursera Badge */}
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center">
      <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-400 flex flex-col items-center justify-center p-2 text-center bg-white shadow-sm">
        <span className="text-[7px] uppercase tracking-widest font-sans font-bold text-slate-400">EDUCATION FOR EVERYONE</span>
        <span className="text-xs font-sans font-black text-[#0056D2] my-0.5">coursera</span>
        <span className="text-[7px] uppercase tracking-widest font-sans font-bold text-slate-400">COURSE CERTIFICATE</span>
      </div>
    </div>

    {/* Signatures & Verification */}
    <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-3 border-t border-slate-200 gap-4 text-[9px] font-sans text-slate-500">
      <div>
        <p className="font-serif italic text-sm text-slate-800 leading-none">Lin Joyner</p>
        <p className="text-[9px] font-semibold text-slate-700 mt-1">Lin Joyner, Senior Instructional Designer & Content Developer</p>
        <p className="text-[9px]">Rav Ahuja, Global Program Director</p>
      </div>

      <div className="text-right">
        <p className="font-bold text-slate-700">Verify at:</p>
        <a 
          href="https://coursera.org/verify/5RASXFWL0OFN" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#0056D2] underline font-mono text-[9px] font-medium"
        >
          coursera.org/verify/5RASXFWL0OFN
        </a>
      </div>
    </div>
  </div>
);

// Exact replica of user's Commonwealth Bank Forage Certificate (Page 8)
export const CommonwealthBankCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-white text-[#111] p-6 sm:p-8 flex flex-col justify-between select-none font-sans border border-slate-200 shadow-xl ${className}`}>
    {/* Top Header: Commonwealth Bank Diamond + Forage */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        {/* CBA Yellow Diamond */}
        <div className="w-8 h-8 bg-[#ffcc00] transform rotate-45 flex items-center justify-center rounded-sm shadow-sm">
          <div className="w-3.5 h-3.5 bg-black/80 transform rotate-45 rounded-[1px]" />
        </div>
        <div className="leading-tight ml-2">
          <p className="font-bold text-xs text-slate-900">Commonwealth</p>
          <p className="font-bold text-xs text-slate-900">Bank</p>
        </div>
      </div>

      {/* Forage Header */}
      <div className="text-right">
        <div className="flex items-center gap-1 justify-end font-extrabold text-base text-[#111]">
          <span className="text-[#3b82f6]">✦</span>
          <span>Forage</span>
        </div>
        <p className="text-[9px] text-slate-500 font-medium">Inspiring and empowering future professionals</p>
      </div>
    </div>

    {/* Body */}
    <div className="py-3">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111] mb-1 tracking-tight">
        Shreesha Poojary
      </h3>
      <h4 className="text-xl sm:text-2xl font-bold text-[#111] mb-2 tracking-tight">
        Software Engineering Job Simulation
      </h4>
      <p className="text-sm font-semibold text-slate-700">Certificate of Completion</p>
      <p className="text-xs text-slate-500 mb-3">September 6th, 2026</p>

      {/* Task Checklist from document */}
      <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <p className="text-[11px] font-semibold text-slate-700 mb-1">Over September 2026, Shreesha Poojary completed practical tasks in:</p>
        <p>• Modify an Existing .NET Backend</p>
        <p>• Modify an Existing React/Redux Frontend</p>
        <p>• Modify the Client's Requests</p>
        <p>• Cover Your Code & Create a Pull Request</p>
      </div>
    </div>

    {/* Footer: Tom Brunskill Signature & Codes */}
    <div className="flex items-end justify-between pt-3 border-t border-slate-100 text-[9px] text-slate-500">
      <div>
        <p className="font-mono text-[8px] text-slate-400">
          Enrolment Code: 6a9d0a3271585ae064b8e466
        </p>
        <p className="font-mono text-[8px] text-slate-400">
          User Code: 6900cfbd2c063a7227db5d93
        </p>
      </div>

      <div className="text-right">
        <p className="font-serif italic text-base text-slate-800 leading-none">Tom Brunskill</p>
        <p className="font-bold text-slate-800 text-[10px] mt-1">Tom Brunskill</p>
        <p className="text-[9px] text-slate-500">Co-Founder of Forage</p>
      </div>
    </div>
  </div>
);

// Exact replica of user's Mastercard Forage Cybersecurity Certificate (Page 6)
export const MastercardCybersecurityCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-white text-[#111] p-6 sm:p-8 flex flex-col justify-between select-none font-sans border border-slate-200 shadow-xl ${className}`}>
    {/* Header: Mastercard circles + Forage */}
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center -space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#eb001b]" />
          <div className="w-7 h-7 rounded-full bg-[#f79e1b] opacity-90" />
        </div>
        <p className="text-[10px] font-bold lowercase text-slate-700 mt-1">mastercard</p>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1 justify-end font-extrabold text-base text-[#111]">
          <span className="text-[#3b82f6]">✦</span>
          <span>Forage</span>
        </div>
        <p className="text-[9px] text-slate-500">Inspiring and empowering future professionals</p>
      </div>
    </div>

    {/* Body */}
    <div className="py-3">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111] mb-1 tracking-tight">
        Shreesha Poojary
      </h3>
      <h4 className="text-xl sm:text-2xl font-bold text-[#111] mb-2 tracking-tight">
        Cybersecurity Job Simulation
      </h4>
      <p className="text-sm font-semibold text-slate-700">Certificate of Completion</p>
      <p className="text-xs text-slate-500 mb-3">September 10th, 2026</p>

      <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <p className="text-[11px] font-semibold text-slate-700 mb-1">Over September 2026, Shreesha Poojary completed practical tasks in:</p>
        <p>• Design a phishing email simulation</p>
        <p>• Interpret phishing simulation results & build threat mitigation</p>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-end justify-between pt-3 border-t border-slate-100 text-[9px] text-slate-500">
      <div>
        <p className="font-mono text-[8px] text-slate-400">
          Enrolment Code: 6aa28acd39befb14b58d4f70
        </p>
        <p className="font-mono text-[8px] text-slate-400">
          User Code: 6900cfbd2c063a7227db5d93
        </p>
      </div>

      <div className="text-right">
        <p className="font-serif italic text-base text-slate-800 leading-none">Tom Brunskill</p>
        <p className="font-bold text-slate-800 text-[10px] mt-1">Tom Brunskill</p>
        <p className="text-[9px] text-slate-500">Co-Founder of Forage</p>
      </div>
    </div>
  </div>
);

// Exact replica of user's Amazon Springpod Data Analysis Certificate (Page 4)
export const AmazonSpringpodCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-[#fafaf9] text-[#1a1a1a] p-6 sm:p-8 flex flex-col justify-between select-none font-sans border border-slate-200 shadow-xl ${className}`}>
    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
      <span>Issued: 05/09/2026</span>
      <span>Certificate ID: nola81p8ad1t</span>
    </div>

    <div className="py-3">
      <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">CERTIFICATE OF ACHIEVEMENT</p>
      <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Shreesha Poojary
      </h3>
      <p className="text-xs text-slate-600 mb-1">has completed this Springpod experience:</p>
      <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
        Digital Skills: Data Analysis & Storytelling
      </h4>
      <p className="text-sm font-semibold text-slate-700">in partnership with Amazon</p>
    </div>

    {/* Logos: Springpod & Amazon */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-[#0ea5e9]">Springpod</span>
        <span className="text-xs">🚀</span>
      </div>
      <div className="text-2xl font-black tracking-tight text-slate-900">
        amazon<span className="text-[#f97316]"> smile</span>
      </div>
    </div>
  </div>
);

// Exact replica of user's Google Student Campus Ambassador Certificate (Page 4)
export const GoogleAmbassadorCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-white text-[#202124] p-6 sm:p-8 flex flex-col justify-between select-none font-sans border border-slate-200 shadow-xl ${className}`}>
    {/* Google Top Header */}
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-slate-700">Google Student</p>
        <p className="text-[9px] text-slate-500">Ambassador Program</p>
      </div>
    </div>

    {/* Body */}
    <div className="text-center py-2">
      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Certificate of Participation</p>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Game Night Edition</h3>
      <p className="text-xs text-slate-500 mb-2">This is to certify that</p>
      <h4 className="text-2xl font-bold text-slate-900 mb-2">Shreesha Kumar T Poojary</h4>
      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
        Actively participated in Game Night organized under the Google Student Campus Ambassador Program and showcased exceptional creativity skills.
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-end justify-between pt-3 border-t border-slate-100 text-xs">
      <div>
        <p className="font-bold text-slate-900 font-mono">25/04/2026</p>
        <p className="text-[10px] text-slate-500">Date</p>
      </div>
      <div className="text-right">
        <p className="font-serif italic text-base text-slate-800">Karanth</p>
        <p className="text-[10px] text-slate-500">Signature</p>
      </div>
    </div>
  </div>
);

// Exact replica of user's MITE Forge Quest Certificate (WhatsApp Image 1)
export const MITEForgeQuestCertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-[#030d1a] text-cyan-200 p-6 sm:p-8 flex flex-col justify-between select-none font-mono border-2 border-cyan-400/60 shadow-2xl ${className}`}>
    <div className="text-center border-b border-cyan-500/30 pb-2">
      <p className="text-xs font-bold text-white tracking-wider">Mangalore Institute of Technology & Engineering</p>
      <p className="text-[9px] text-slate-400">Accredited by NAAC with A+ Grade | NIRF 151-300</p>
    </div>

    <div className="text-center py-3">
      <h3 className="text-3xl sm:text-4xl font-black text-white tracking-widest mb-1 drop-shadow-[0_0_12px_#38bdf8]">
        FORGE QUEST
      </h3>
      <p className="text-xs uppercase text-cyan-300 tracking-widest font-bold mb-2">Certificate of Participation</p>
      <p className="text-xs text-slate-400 mb-1">This is to certify that</p>
      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide font-sans">
        Shreesha Kumar T Poojary
      </h4>
      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
        has actively participated in the Forge Quest event organized by the Department of Computer Science & Engineering, MITE on 25th October 2025.
      </p>
    </div>

    <div className="flex items-end justify-between pt-2 border-t border-cyan-500/30 text-[10px] text-slate-400">
      <div>
        <p className="font-bold text-white">Mr. Shreejith K B</p>
        <p>CSI Coordinator</p>
      </div>
      <div className="text-center font-bold text-white">
        <span>CORE · CSI · IIC</span>
      </div>
      <div className="text-right">
        <p className="font-bold text-white">Dr. Ravinarayana B</p>
        <p>Head of Department, CSE</p>
      </div>
    </div>
  </div>
);

// Exact replica of user's SQL Using AI Workshop Certificate (WhatsApp Image 2)
export const SQLUsingAICertificate: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between select-none font-sans border-4 border-[#f97316] shadow-xl ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-[#10b981] flex items-center justify-center font-bold text-[#10b981] text-xs">
          AI
        </div>
        <span className="font-bold text-base text-slate-900">AI For Techies</span>
      </div>

      <div className="bg-[#f97316] text-white px-3 py-1 rounded text-right text-[11px] font-bold uppercase tracking-wider">
        SQL USING AI WORKSHOP
      </div>
    </div>

    <div className="py-2">
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
        Certificate
      </h3>
      <p className="text-xs text-slate-500 mb-2">of Completion Awarded to</p>
      <h4 className="text-2xl font-extrabold text-slate-900 mb-2">
        SHREESHA KUMAR T POOJARY
      </h4>
      <p className="text-xs text-slate-700 leading-snug">
        FOR COMPLETING 3-HOURS SQL USING AI WORKSHOP CONDUCTED BY AI FOR TECHIES
      </p>

      <div className="mt-3 text-[10px] text-slate-600 space-y-0.5 border-t border-slate-100 pt-2">
        <p>• Extract and analyze data for business insights</p>
        <p>• Use SQL to preprocess and query data for data analysis</p>
        <p>• Automate repetitive data-related tasks and workflows</p>
      </div>
    </div>

    <div className="flex items-end justify-between pt-2 border-t border-slate-200 text-xs">
      <div>
        <p className="font-serif italic text-base text-slate-800">Aditya</p>
        <p className="font-bold text-slate-800 text-[10px]">Aditya Kachave</p>
        <p className="text-[9px] text-slate-500">Co-Founder</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-900 text-[10px]">Issued on:</p>
        <p className="text-xs font-mono font-semibold">October 12th, 2025</p>
      </div>
    </div>
  </div>
);
