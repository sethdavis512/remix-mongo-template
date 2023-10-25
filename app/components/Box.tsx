import clsx from 'clsx';
import { type ReactNode } from 'react';

interface BoxProps {
    children: ReactNode;
    className: string;
}

export default function Box({ children, className }: BoxProps) {
    const boxClassName = clsx('box', className);

    return <div className={boxClassName}>{children}</div>;
}
