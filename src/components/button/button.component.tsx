'use client'

import React, { ComponentProps, PropsWithChildren } from 'react';
import classNames from 'classnames';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';

type ButtonProps = ComponentProps<"button"> & {
  children: PropsWithChildren;
  color?: "primary" | "secondary";
  variant?: "solid" | "ghost";
  loading?: boolean;
  className?: string;
};

const colorClasses = {
  primary: {
    solid: 'bg-primary hover:bg-primary/80 text-white',
    ghost: 'border-2 border-primary hover:bg-primary/80 hover:text-white text-primary',
  },
  secondary: {
    solid: 'bg-secondary hover:bg-secondary/80 text-white',
    ghost: 'border-2 border-secondary hover:bg-secondary/80 hover:text-white text-secondary',
  },
};

const Button: React.FC<ButtonProps> = ({ variant = "solid", color = 'primary', children, className, loading, ...props }) => {
  const variantClass = colorClasses[color][variant];

  return (
    <button
      className={classNames(
        className ?? "",
        'flex items-center justify-center px-4 h-10 rounded-xl font-vazirmatn cursor-pointer transition-all active:scale-95',
        variantClass,
        {
          'opacity-50 !cursor-not-allowed active:scale-100': props.disabled,
          'flex gap-3 items-center !cursor-not-allowed active:scale-100': loading,
        }
      )}
      {...props}
    >
      {loading ? "در حال پردازش..." : children}
      {loading && (
        <SpinnerIcon />
      )}
    </button>
  );
};

export default Button;