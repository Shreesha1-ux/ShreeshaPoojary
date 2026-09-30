import React, { memo } from 'react';

export const GodRays: React.FC = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Celestial Slate & Whitish Ice Blue Ambient Gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 85% 15%, rgba(147, 197, 253, 0.45) 0%, rgba(96, 165, 250, 0.35) 25%, rgba(30, 58, 138, 0.4) 55%, rgba(11, 19, 43, 0.9) 80%, #060913 100%),
            #060913
          `
        }}
      />

      {/* 2. Soft Whitish-Blue Crisp Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(224, 242, 254, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(224, 242, 254, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.6) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Subtle frost accent at the top-right */}
      <div 
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(240, 249, 255, 0.18) 0%, rgba(186, 230, 253, 0.12) 40%, transparent 75%)'
        }}
      />

      {/* Soft Vignette along edges for optimal reading contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(6, 9, 19, 0.6) 100%)'
        }}
      />
    </div>
  );
});

GodRays.displayName = 'GodRays';
