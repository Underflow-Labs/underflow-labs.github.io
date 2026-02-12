import { useState, useEffect, useCallback } from 'react';
import { BrandMark } from '../ui/BrandMark';
import './Preloader.css';

interface PreloaderProps {
    onEnter: () => void;
}

export function Preloader({ onEnter }: PreloaderProps) {
    const [isExiting, setIsExiting] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const handleEnter = useCallback(() => {
        if (isExiting) return;
        setIsExiting(true);
        setTimeout(onEnter, 800);
    }, [isExiting, onEnter]);

    useEffect(() => {
        const readyTimer = setTimeout(() => setIsReady(true), 100);
        // Auto-dismiss after animations complete (~3.5s)
        const autoTimer = setTimeout(handleEnter, 3500);
        return () => {
            clearTimeout(readyTimer);
            clearTimeout(autoTimer);
        };
    }, [handleEnter]);

    return (
        <div className={`ag-preloader-root ${isExiting ? 'exit' : ''} ${isReady ? 'ready' : ''}`}>
            <div className="ag-noise-overlay" />
            <div className="ag-preloader-content">
                <div className="ag-preloader-logo-wrapper">
                    <BrandMark />
                </div>

                <div className="ag-preloader-branding">
                    <h2 className="ag-preloader-title">Underflow Labs<sup>&reg;</sup></h2>
                    <p className="ag-preloader-subtitle font-mono">Senior-led Software Studio</p>
                </div>

                <button
                    className="ag-preloader-enter-btn font-mono"
                    onClick={handleEnter}
                    aria-label="Entrar al sitio"
                >
                    [ ENTER ]
                </button>
            </div>
        </div>
    );
}
