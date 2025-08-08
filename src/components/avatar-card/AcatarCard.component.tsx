'use client'

import React from 'react';
import Button from '@/components/button/button.component';
import { RandomUser } from '@/types/user';
import Image from 'next/image';

type Props = {
  user: RandomUser;
};

export default function AvatarCard({ user }: Props) {
  return (
    <div
      className="rounded-2xl p-5 shadow bg-gradient-to-tr from-secondary/50 to-primary/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-offset-2 ring-primary/30">
          <Image width={80} height={80} src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{user.name.first} {user.name.last}</h3>
          <p className="text-sm opacity-80">{user.location.city}, {user.location.state}</p>
          <p className="text-xs mt-1 opacity-60">{user.email}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button color="primary" onClick={() => alert('در حال حاضر امکان این درخواست وجود ندارد')}>ویرایش اطلاعات</Button>
        <Button color="secondary" variant="ghost" onClick={() => alert('در حال حاضر امکان این درخواست وجود ندارد')}>نمایش پروفایل</Button>
      </div>
    </div>
  );
}
