'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ThickIcon from '@/assets/icons/ThickIcon';
import CloseOutlineIcon from '@/assets/icons/CloseOutlineIcon';

const readCookie = (name: string) => {
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const Notification = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const exitDelay = 300;

  useEffect(() => {
    if (!readCookie('justLoggedIn')) return;
    
    setIsMounted(true);
    eraseCookie('justLoggedIn');
    
    requestAnimationFrame(() => setIsEntered(true));
  }, []);

  const handleClose = () => {
    setIsEntered(false);
    setTimeout(() => setIsMounted(false), exitDelay);
  };

  if (!isMounted) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className={classNames(
          'pointer-events-auto inline-flex items-center gap-3 rounded-2xl p-3 shadow-lg border overflow-hidden',
          'bg-emerald-50 border-gray-200 text-gray-800',
          'transform transition-all duration-300 ease-out',
          isEntered 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-3 scale-95'
        )}
        role="status"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-300">
            <ThickIcon className="text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <div className="font-medium">ورود شما با موفقیت انجام شد</div>
            <div className="text-xs opacity-70">خوش آمدید! حالا می‌توانید از داشبورد استفاده کنید.</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="بستن"
          className="p-1 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <CloseOutlineIcon />
        </button>
      </div>
    </div>
  );
};

export default Notification;