import { useState, useEffect } from 'react';
import { BrandMark } from '../ui/BrandMark';
import './Preloader.css';

interface PreloaderProps {
    onEnter: () => void;
}

export function Preloader({ onEnter }: PreloaderProps) {
    const [isExiting, setIsExiting] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Small delay to ensure entry animations play smoothly
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleEnter = () => {
        setIsExiting(true);
        // Wait for exit animation duration before unmounting
        setTimeout(onEnter, 800);
    };

    return (
        <div className={`ag-preloader-root ${isExiting ? 'exit' : ''} ${isReady ? 'ready' : ''}`}>
            <div className="ag-preloader-content">
                <div className="ag-preloader-logo-wrapper">
                    <BrandMark />
                </div>

                <div className="ag-preloader-branding">
                    <h2 className="ag-preloader-title">Underflow Labs</h2>
                    <p className="ag-preloader-subtitle font-mono">Senior-led Software Studio</p>
                </div>

                <button
                    className="ag-preloader-enter-btn font-mono"
                    onClick={handleEnter}
                    aria-label="Enter website"
                >
                    [ ENTER ]
                </button>
            </div>
        </div>
    );
}
