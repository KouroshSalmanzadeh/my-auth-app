'use client'

import React from 'react';

type Activity = { id: string; title: string; time: string; meta?: string };

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="rounded-xl p-4 shadow bg-white/50">
      <h4 className="font-semibold mb-3">فعالیت‌های اخیر</h4>
      <ul className="space-y-3">
        {activities.map(a => (
          <li key={a.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors">
            <div>
              <div className="text-sm font-medium">{a.title}</div>
              <div className="text-xs opacity-60">{a.meta}</div>
            </div>
            <div className="text-xs opacity-70">{a.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
