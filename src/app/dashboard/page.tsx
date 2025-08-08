// app/dashboard/page.tsx
'use client'

import React, { useCallback, useEffect, useState } from 'react';


import AvatarCard from '@/components/avatar-card/AcatarCard.component';
import StatCard from '@/components/stat-card/StatCard.component';
import RecentActivity from '@/components/recent-activity/RecentActivity.component';
import Button from '@/components/button/button.component';
import Notification from '@/components/notification/Notification.component';

import { RandomUser } from '@/types/user';

import styles from "@/styles/dashboard.module.scss";

import LogoutIcon from '@/assets/icons/LogoutIcon';

import HandleLogout from '@/utils/HandleLogout';

import { useRouter } from 'next/dist/client/components/navigation';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

export default function DashboardPage() {

    const router = useRouter();
    const [user, setUser] = useState<RandomUser | null>(null);
    const [loading, setLoading] = useState(true);

    const HandleLogoutFunc = useCallback(() => {
        HandleLogout();
        router.replace('/auth');
    }, [router]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user');
            if (!raw) {
                router.push('/auth');
                return;
            }
            const parsed = JSON.parse(raw);
            const user = parsed.results ? parsed.results[0] : parsed;
            setUser(user);
        } catch (e) {
            console.error(e);
            router.push('/auth');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) return <LoadingSpinner />;
    if (!user) return null;

    // sample activities
    const activities = [
        { id: '1', title: 'خرید اشتراک', time: '2 ساعت پیش', meta: 'پرداخت موفق' },
        { id: '2', title: 'بروزرسانی پروفایل', time: '1 روز پیش', meta: 'عکس پروفایل اضافه شد' },
        { id: '3', title: 'درخواست پشتیبانی', time: '3 روز پیش', meta: 'پاسخ دریافت شد' },
    ];

    return (
        <div className={styles.dashboard}>
            <Notification />
            <div className={styles.containerSection}>
                {/* header */}
                <div className={styles.headerContent}>
                    <div>
                        <h1 className={styles.headerTitle}>{user.name.first} به داشبورد خوش آمدی</h1>
                        <p className={styles.headerSubtitle}>خلاصه‌ای از وضعیت اکانت و فعالیت‌های اخیر</p>
                    </div>
                    <div>
                        <Button variant="ghost" color="primary" onClick={HandleLogoutFunc}>
                            خروج
                            <LogoutIcon />
                        </Button>
                    </div>
                </div>

                {/* grid */}
                <div className={styles.gridSection}>
                    {/* right sidebar */}
                    <aside className={styles.rightSidebar}>
                        <AvatarCard user={user} />
                        <div className={styles.info}>
                            <h4 className={styles.title}>اطلاعات تماس</h4>
                            <p>تلفن: {user.phone}</p>
                            <p>موبایل: {user.cell}</p>
                            <p>تولد: {new Date(user.dob.date).toLocaleDateString()}</p>
                        </div>
                    </aside>

                    {/* main content */}
                    <section className={styles.mainContent}>
                        <div className={styles.stats}>
                            <StatCard title="درآمد ماه" value="8,240 $" delta="+12%" />
                            <StatCard title="تیکت‌های باز" value={5} delta="-2%" />
                            <StatCard title="نمره رضایت" value="4.8/5" delta="+0.6%" />
                        </div>

                        <div className={styles.panels}>
                            <RecentActivity activities={activities} />
                            <div className={styles.quickPanel}>
                                <h4>پنل سریع</h4>
                                <p>یک پیام خوش‌آمدگویی زیبا و متحرک که حس زنده بودن داشبورد رو تقویت می‌کنه.</p>

                                <div className={styles.firstContainerPanel}>
                                    <div className={styles.lastContainerPanel}>
                                        <h5>سلام {user.name.first}!</h5>
                                        <p>از اینکه اینجا هستی خوشحالیم — چند پیشنهاد برایت داریم:</p>
                                        <ul>
                                            <li>• تکمیل پروفایل</li>
                                            <li>• بررسی آخرین تیکت‌ها</li>
                                            <li>• دانلود گزارش‌ها</li>
                                        </ul>
                                        <div className={styles.buttonContainer}>
                                            <Button color="primary">شروع کن</Button>
                                            <Button variant="ghost" color="primary">راهنما</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* footer cards */}
                        <div className={styles.otherInfoBox}>
                            <div>
                                <h5>موقعیت</h5>
                                <p>{user.location.city}, {user.location.country}</p>
                            </div>
                            <div>
                                <h5>نام کاربری</h5>
                                <p>{user.login?.username ?? '—'}</p>
                            </div>
                            <div>
                                <h5>ثبت‌نام</h5>
                                <p>از {new Date(user.registered.date).getFullYear()}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
