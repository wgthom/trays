import type { ReactNode, HTMLAttributes } from 'react';
import './Card.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'elevated' | 'outline' | 'flat';
}

export function Card({ children, variant = 'elevated', className = '', ...props }: CardProps) {
    return (
        <div className={`card card-${variant} ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`card-header ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={`card-title ${className}`.trim()} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`card-content ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`card-footer ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}
