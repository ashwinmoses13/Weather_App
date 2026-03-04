import React from 'react';
import { TABS } from '../../utils/constants';
import { Thermometer, Calendar, History, Waves, LucideIcon } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  thermometer: Thermometer,
  calendar: Calendar,
  history: History,
  waves: Waves,
};

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 p-2 glass rounded-2xl">
      {TABS.map((tab) => {
        const Icon = iconMap[tab.icon];
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isActive
                ? 'bg-secondary/20 text-secondary-light border border-secondary/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
