'use client'

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { z } from 'zod';

import Button from '@/components/button/button.component';
import Input from '@/components/input/Input.component';

import styles from '@/styles/auth.module.scss';
import PhoneIcon from '@/assets/icons/PhoneIcon';

const phoneSchema = z
  .string()
  .regex(/^09\d{9}$/, 'شماره تلفن باید ۱۱ رقم باشد و با ۰۹ شروع شود');

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validation = phoneSchema.safeParse(phone);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const data = await response.json();
      const user = data.results[0];

      localStorage.setItem('user', JSON.stringify({ results: [user] }));
      document.cookie = `user=${encodeURIComponent(JSON.stringify({ results: [user] }))}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
      document.cookie = 'justLoggedIn=1; path=/; max-age=6';

      router.push('/dashboard');
    } catch (err) {
      setError('خطایی در دریافت اطلاعات رخ داد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <h2 className={styles.formTitle}>
          ورود به حساب کاربری
        </h2>
        <Input
          label="شماره تلفن"
          type="text"
          placeholder="۰۹xxxxxxxxx"
          value={phone}
          setValue={setPhone}
          color="primary"
          variant="outline"
          error={error ?? null}
          setError={setError}
          maxLength={11}
          disabled={isLoading}
          autoComplete="on"
          
          icon={<PhoneIcon className={styles.phoneIcon} />}
        />
        <p className={styles.formDescription}>
          لطفا شماره موبایل خود را به صورت صحیح وارد کنید
          <span>
            برای مثال: 09121112233
          </span>
        </p>
        <Button className={styles.submitButton} type="submit" color="primary" loading={isLoading}>
          ورود
        </Button>
      </form>
      <div aria-hidden className={styles.gradientCircleAnimate + " " + styles.animateTransformYX}></div>
    </div>
  );
};

export default AuthPage;