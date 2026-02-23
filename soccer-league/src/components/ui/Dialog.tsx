import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import './Dialog.css';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
}

export function Dialog({ isOpen, onClose, title, children, footer }: DialogProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div
                className="dialog-content"
                onClick={e => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <div className="dialog-header">
                    <h2 id="dialog-title" className="dialog-title">{title}</h2>
                    <button className="dialog-close" onClick={onClose} aria-label="Close dialog">
                        <X size={20} />
                    </button>
                </div>

                <div className="dialog-body">
                    {children}
                </div>

                {footer && (
                    <div className="dialog-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
