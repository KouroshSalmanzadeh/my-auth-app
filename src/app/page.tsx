// app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function RootEntry() {
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem('user');

    if (!raw) {
      router.replace('/auth');
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const user = parsed?.results ? parsed.results[0] : parsed;

      const isValid =
        user && (user.name?.first || user.email || user.phone || user.picture?.large);

      if (isValid) {
        router.replace('/dashboard');
      } else {
        localStorage.removeItem('user');
        router.replace('/auth');
      }
    } catch (err) {
      localStorage.removeItem('user');
      router.replace('/auth');
    }
  }, [router]);

  return (
    <LoadingSpinner text='در حال بررسی وضعیت ورود...' />
  );
}
