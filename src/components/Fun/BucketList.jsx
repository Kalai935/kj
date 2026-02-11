import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, Plus, Pin } from 'lucide-react';

const initialItems = [
    { id: 1, text: "Watch the Northern Lights", completed: false, emoji: "🌌", color: "bg-yellow-100", rotate: -2 },
    { id: 2, text: "Learn to cook a new cuisine together", completed: false, emoji: "👨‍🍳", color: "bg-green-100", rotate: 3 },
    { id: 3, text: "Go hot air ballooning", completed: false, emoji: "🎈", color: "bg-blue-100", rotate: -1 },
    { id: 4, text: "Build a blanket fort", completed: true, emoji: "🏰", color: "bg-pink-100", rotate: 4 },
    { id: 5, text: "Adopt a pet", completed: false, emoji: "🐶", color: "bg-orange-100", rotate: -3 },
    { id: 6, text: "Visit Japan during Cherry Blossom season", completed: false, emoji: "🌸", color: "bg-red-100", rotate: 2 },
    { id: 7, text: "Write a book together", completed: false, emoji: "📖", color: "bg-purple-100", rotate: -4 },
    { id: 8, text: "Have a picnic under the stars", completed: true, emoji: "🧺", color: "bg-teal-100", rotate: 1 },
];

const StickyNote = ({ item, onToggle }) => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
            initial={{ rotate: item.rotate, scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className={`relative w-64 h-64 p-6 m-4 shadow-lg ${item.color} flex flex-col items-center justify-center text-center cursor-grab transform transition-shadow hover:shadow-2xl`}
            onClick={() => onToggle(item.id)}
        >
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-600"></div>
                <div className="w-1 h-3 bg-gray-400 mx-auto opacity-50"></div>
            </div>

            {/* Tape for variety (optional, sticking with pins for now for consistency) */}

            <div className="text-4xl mb-4 filter drop-shadow-sm">{item.emoji}</div>
            <p className="font-handwriting text-2xl text-gray-800 leading-tight flex-1 flex items-center justify-center">
                {item.text}
            </p>

            {/* Completed Stamp */}
            {item.completed && (
                <motion.div
                    initial={{ scale: 2, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: -20 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="border-4 border-green-600 text-green-600 px-4 py-2 text-3xl font-black uppercase opacity-70 transform -rotate-12 mask-image-grunge">
                        COMPLETED
                    </div>
                </motion.div>
            )}

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Check className={`text-green-600 ${item.completed ? 'opacity-100' : 'opacity-20'}`} />
            </div>
        </motion.div>
    );
};

const BucketList = () => {
    const [items, setItems] = useState(initialItems);

    const toggleItem = (id) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newCompleted = !item.completed;
                if (newCompleted) {
                    confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { y: 0.7 },
                        colors: ['#388E3C', '#81C784'] // Green confetti
                    });
                }
                return { ...item, completed: newCompleted };
            }
            return item;
        }));
    };

    return (
        <section className="py-24 px-4 min-h-screen relative bg-amber-50 overflow-hidden">
            {/* Corkboard texture background */}
            <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundColor: '#fef3c7'
            }}></div>

            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="inline-block bg-white p-4 shadow-xl transform rotate-1 border-2 border-gray-100"
                >
                    <h2 className="text-4xl md:text-6xl font-script text-gray-800 mb-2">Our Dream Board</h2>
                    <p className="text-gray-500 font-handwriting text-xl">Manifesting our future together ✨</p>
                </motion.div>
            </div>

            <div className="flex flex-wrap justify-center items-start max-w-7xl mx-auto gap-4 relative z-10 perspective-1000 min-h-[600px]">
                {items.map((item) => (
                    <StickyNote key={item.id} item={item} onToggle={toggleItem} />
                ))}

                {/* Add New Button Placeholder */}
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="relative w-64 h-64 p-6 m-4 shadow-md bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer opacity-70 hover:opacity-100 transition-all"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                        <Plus size={32} />
                    </div>
                    <p className="font-handwriting text-xl text-gray-500">Add a new dream...</p>
                </motion.div>
            </div>

            {/* Completion Status */}
            <div className="absolute bottom-10 right-10 z-20 hidden md:block">
                <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 transform -rotate-3">
                    <p className="font-bold text-gray-600">Dreams Realized</p>
                    <p className="text-3xl text-rose-500 font-black">{items.filter(i => i.completed).length} / {items.length}</p>
                </div>
            </div>
        </section>
    );
};

export default BucketList;
