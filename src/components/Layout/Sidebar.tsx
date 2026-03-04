import React from 'react';
import { Github, Twitter, Mail, Globe } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 glass border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Real-time Weather
              </li>
              <li className="flex items-center gap-3 text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                14-Day Forecast
              </li>
              <li className="flex items-center gap-3 text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Historical Data
              </li>
              <li className="flex items-center gap-3 text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Marine Weather
              </li>
            </ul>

            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://weatherstack.com/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Globe size={18} />
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-200"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              &copy; 2026 WeatherStack Pro. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
