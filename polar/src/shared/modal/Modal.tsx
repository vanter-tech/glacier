import {type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    title: string;
    onClose: () => void;
    body: ReactNode;
    footer?: ReactNode;
}

export default function Modal({ title, onClose, body, footer }: ModalProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

            <div
                onClick={onClose}
                className="absolute inset-0 bg-smoky/50 backdrop-blur-sm animate-fade-in transition-opacity"
            />

            <div className="relative w-full max-w-2xl bg-white dark:bg-gh-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] animate-scale-up border border-smoky/10 dark:border-gh-border">

                <div className="px-6 py-4 border-b border-smoky/10 dark:border-gh-border flex justify-between items-center bg-isabelline/50 dark:bg-gh-bg/50">
                    <h2 className="text-xl font-bold text-smoky dark:text-gh-text">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-smoky/50 hover:text-smoky dark:text-gh-muted dark:hover:text-gh-text transition-colors text-xl font-mono"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    {body}
                </div>

                {footer && (
                    <div className="px-6 py-4 border-t border-smoky/10 dark:border-gh-border bg-isabelline/50 dark:bg-gh-bg/50 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}