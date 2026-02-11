import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';

const SecretMessage = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [clearedPercentage, setClearedPercentage] = useState(0);

    // Initialize the foggy canvas
    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Handle High DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        // Scale context to match
        ctx.resetTransform(); // Reset any previous transforms
        ctx.scale(dpr, dpr);

        // Styling for CSS size
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Fill with "fog"
        ctx.fillStyle = 'rgba(200, 210, 220, 0.95)'; // Bluish-white fog
        ctx.fillRect(0, 0, width, height);

        // Add condensation texture
        for (let i = 0; i < 500; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.25})`;
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5 + 1, 0, Math.PI * 2);
            ctx.fill();
        }

        setClearedPercentage(0);
        setIsRevealed(false);
    };

    useEffect(() => {
        initCanvas();

        // Robust resize handling
        const observer = new ResizeObserver(() => {
            initCanvas();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const wipeFog = (x, y) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // We need to account for DPR when erasing if we didn't scale the context coordinates
        // But since we scaled the context with ctx.scale(dpr, dpr), logical coords (x,y) should work.

        ctx.globalCompositeOperation = 'destination-out';

        // Create a soft brush effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(0.5, 'rgba(0,0,0,0.5)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();

        // Restore composite operation (important for future draws if any)
        ctx.globalCompositeOperation = 'source-over';

        checkRevealProgress();
    };

    const handleMouseMove = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        wipeFog(x, y);
    };

    const handleTouchMove = (e) => {
        if (!canvasRef.current) return;
        // Prevent scrolling while wiping
        // e.preventDefault(); // React synthetic events might not support this directly here, handled in CSS touch-action
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        wipeFog(x, y);
    };

    const checkRevealProgress = () => {
        setClearedPercentage(prev => {
            const newVal = Math.min(prev + 0.3, 100); // Slower progress calculation
            if (newVal > 50 && !isRevealed) {
                setIsRevealed(true);
            }
            return newVal;
        });
    };

    return (
        <section className="py-20 px-4 min-h-[60vh] flex flex-col items-center justify-center bg-gray-900 border-t border-b border-gray-800 relative overflow-hidden">

            <div className="text-center mb-8 relative z-10">
                <h2 className="text-4xl md:text-5xl font-script text-rose-500 mb-4 drop-shadow-md">Secret Message</h2>
                <p className="text-gray-400">The window is foggy... wipe it to see what's written.</p>
            </div>

            <div
                ref={containerRef}
                className="relative w-full max-w-2xl h-80 bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700/50"
            >
                {/* The Hidden Message (Underneath) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-8 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-rose-400 font-Handwriting text-2xl mb-4 italic">To my favorite person,</p>
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            ALWAYS & FOREVER
                        </h3>
                        <p className="text-rose-400 font-Handwriting text-xl text-right">- Kalai</p>
                    </motion.div>

                    {/* Decorative Hearts behind text */}
                    <Sparkles className="absolute top-10 left-10 text-yellow-500 opacity-50 animate-pulse" size={32} />
                    <Sparkles className="absolute bottom-10 right-10 text-pink-500 opacity-50 animate-pulse" size={32} />
                </div>

                {/* The Foggy Canvas (Overlay) */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-none"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    style={{ touchAction: 'none' }}
                />

                {/* Instruction Tooltip (Fades out when User interacts) */}
                {clearedPercentage < 5 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full animate-bounce">
                            👆 Wipe me!
                        </div>
                    </div>
                )}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initCanvas}
                className="mt-8 flex items-center gap-2 px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
            >
                <RefreshCw size={18} />
                Fog it up again
            </motion.button>
        </section>
    );
};

export default SecretMessage;
