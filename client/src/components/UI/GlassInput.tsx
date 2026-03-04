import React, { forwardRef } from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className = '', icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`glass-input w-full ${icon ? 'pl-12' : ''} ${className}`}
          {...props}
        />
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
