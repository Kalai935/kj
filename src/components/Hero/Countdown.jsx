import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg min-w-[60px] sm:min-w-[80px] text-center border border-white/40 relative overflow-hidden">
            <motion.span
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-2xl sm:text-4xl font-bold text-red-600 block"
            >
                {value}
            </motion.span>
        </div>
        <span className="text-xs sm:text-sm text-gray-700 mt-1 font-medium tracking-wider uppercase">{label}</span>
    </div>
);

const Countdown = ({ startDate = "2023-02-14" }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date() - +new Date(startDate);
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [startDate]);

    return (
        <div className="flex flex-wrap justify-center items-center mt-8">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
};

export default Countdown;
