import React from 'react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_25%,transparent_50%)] animate-shimmer"></div>
      <div className="container mx-auto flex items-center justify-center">
        <div className="bg-black/30 px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/10">
          <Logo />
        </div>
      </div>
    </header>
  );
}