import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, ...props }, ref) => {
        return (
            <div className="input-wrapper">
                {label && <label className="input-label" htmlFor={props.id}>{label}</label>}
                <input
                    ref={ref}
                    className={`input-field ${error ? 'input-error' : ''} ${className}`.trim()}
                    {...props}
                />
                {error && <span className="input-message-error">{error}</span>}
            </div>
        );
    }
);
Input.displayName = 'Input';
