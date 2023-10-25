import { type ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: (...arg: any) => any;
    name?: string;
    type?: 'submit' | 'button';
    variant?:
        | 'is-white'
        | 'is-light'
        | 'is-dark'
        | 'is-black'
        | 'is-text'
        | 'is-ghost'
        | 'is-primary'
        | 'is-link'
        | 'is-info'
        | 'is-success'
        | 'is-warning'
        | 'is-danger';
    value?: string;
    isLight?: boolean;
}

export default function Button({
    className,
    children,
    isLight,
    name,
    onClick,
    type = 'button',
    variant,
    value
}: ButtonProps) {
    const buttonClassName = clsx(
        'button',
        variant,
        isLight && 'is-light',
        className
    );

    return (
        <button
            className={buttonClassName}
            type={type}
            name={name}
            value={value}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
