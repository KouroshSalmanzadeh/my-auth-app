import React from 'react'

type Props = {
    text?: string;
}

export default function LoadingSpinner({ text = "لطفا منتظر بمانید ..." }:Props) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
            <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full animate-spin border-4 border-t-primary border-r-transparent"></div>
                {text && <div className="text-sm opacity-80">{text}</div>}
            </div>
        </div>
    )
}
