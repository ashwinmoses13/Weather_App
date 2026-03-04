import React from 'react';
import { Settings, Thermometer } from 'lucide-react';
import { UNITS, LANGUAGES } from '../../utils/constants';
import { Units } from '../../types/weather';

interface FilterBarProps {
  units: Units;
  onUnitsChange: (units: Units) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  units,
  onUnitsChange,
  language,
  onLanguageChange,
}) => {
  return (
    <div className="glass-card p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </div>

        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-3">
          <Thermometer className="w-4 h-4 text-slate-400" />
          <select
            value={units}
            onChange={(e) => onUnitsChange(e.target.value as Units)}
            className="glass-input py-2 px-3 text-sm cursor-pointer"
          >
            {UNITS.map((u) => (
              <option key={u.code} value={u.code} className="bg-primary">
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">Language:</span>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="glass-input py-2 px-3 text-sm cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-primary">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
