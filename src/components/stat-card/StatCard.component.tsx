'use client'

import React from 'react';

type Props = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function StatCard({ title, value, delta, icon, className = '' }: Props) {
  return (
    <div className={`rounded-xl p-4 shadow transition-transform hover:translate-y-[-6px] bg-gradient-to-bl from-secondary/50 to-transparent ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm opacity-70">{title}</div>
          <div className="text-2xl font-bold mt-1">{value}</div>
        </div>
        {icon && <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/5">{icon}</div>}
      </div>
      {delta && <div className="mt-2 text-sm text-success/80">{delta}</div>}
    </div>
  );
}
