import { type ReactNode } from 'react';

interface SelectProps {
    children: ReactNode;
    label: string;
}

export default function Select({ children, label }: SelectProps) {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <div className="select">
                    <select>{children}</select>
                </div>
            </div>
        </div>
    );
}
