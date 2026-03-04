import React from 'react';
import { Cloud, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-secondary/20 border border-secondary/30">
                <Cloud className="w-6 h-6 text-secondary-light" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">WeatherStack Pro</h1>
                <p className="text-xs text-slate-400 hidden sm:block">Professional Weather Intelligence</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://weatherstack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors hidden sm:block"
            >
              Powered by Weatherstack
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
