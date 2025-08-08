'use client'

import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import CloseOutlineIcon from '@/assets/icons/CloseOutlineIcon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'secondary';
  error: string | null;
  setError: (error: string | null) => void;
  label?: string;
  value: string;
  setValue: (value: string) => void;
  icon?: React.ReactNode;
}

const colorClasses = {
  primary: {
    solid: 'bg-primary/5 border-primary text-primary focus:ring-primary/50 focus:bg-transparent',
    outline: 'border-primary text-primary focus:ring-primary/50',
  },
  secondary: {
    solid: 'bg-secondary/5 border-secondary text-secondary focus:ring-secondary/50 focus:bg-transparent',
    outline: 'border-secondary text-secondary focus:ring-secondary/50',
  },
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outline', color = 'primary', error, setError, value, setValue, ...props }, ref) => {
    const variantClass = colorClasses[color][variant];

    const clearInput = () => {
      setError?.(null);
      setValue?.('');
    };

    return (
      <div className="flex flex-col mb-4">
        {props.label && <label className={`mb-2 text-sm font-medium text-${color}`}>{props.label}</label>}
        <div className={classNames(
          `relative text-${color}`,
          { 'text-red-500': error },
        )}>
          {props.icon ?? ""}
          <input
            ref={ref}
            dir='rtl'
            className={classNames(
              'w-full p-2 border-2 rounded-xl font-vazirmatn outline-none transition-all duration-200',
              variantClass,
              {
                'border-red-500 focus:ring-red-500/50 text-red-500': error,
                'opacity-50 cursor-not-allowed': props.disabled,
                'focus:ring-2 focus:border-transparent': !props.disabled,
                'pr-8': props.icon,
              },
              props.className
            )}
            disabled={props.disabled}
            value={value}
            onChange={(e) => setValue?.(e.target.value)}
            {...props}
          />
          {value && <CloseOutlineIcon className={`absolute inset-y-0 my-auto left-2 hover:opacity-70 transition-opacity cursor-pointer ${error ? 'text-red-500' : `text-${color}`}`} onClick={() => clearInput()} />}
        </div>
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;