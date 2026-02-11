import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Expand, RotateCw } from 'lucide-react';

const photos = [
    {
        id: 1,
        url: 'https://lh3.googleusercontent.com/d/17nvYYnbG_ZdqZdLZTNgxZow6oppinmF0',
        caption: 'Our First Meet',
        date: 'The Beginning',
        description: 'Where it all started. The coffee was cold, but the conversation was fire.'
    },
    {
        id: 2,
        url: 'https://lh3.googleusercontent.com/d/1nLaNFgTIgDyFJcftBMAfgjfX_xtb1HbY',
        caption: 'Our First Date',
        date: 'November 2023',
        description: 'Walking hand in hand in Anna Nagar Tower , as the sun dipped slowly.'
    },
    {
        id: 3,
        url: 'https://lh3.googleusercontent.com/d/1n9pVMZ2NjC3gSpjlv54PMhVPH13xPtSp',
        caption: 'We came back',
        date: 'Reassurance',
        description: 'Just us after getting to know we cant be without each other'
    },
    {
        id: 4,
        url: 'https://lh3.googleusercontent.com/d/1FaeJ1lIiw5RSvtN_yjqTXzQe0qbyS0qh',
        caption: 'Made more love than usual',
        date: 'Celebrating Us',
        description: 'Another breakdown gone, forever to go.'
    }
];

const Polariod = ({ photo, onClick, index }) => {
    // Generate random but deterministic random values based on index
    const randomRotate = (index % 2 === 0 ? 1 : -1) * ((index * 7) % 15 + 2);
    const randomX = ((index * 13) % 40) - 20;
    const randomY = ((index * 17) % 40) - 20;

    return (
        <motion.div
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grab" }}
            whileDrag={{ scale: 1.15, cursor: "grabbing", zIndex: 100 }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotate: randomRotate, x: randomX, y: randomY, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white p-3 pb-10 shadow-xl rounded-sm absolute md:relative w-64 md:w-72 transform transition-shadow hover:shadow-2xl"
            style={{
                rotate: randomRotate,
                // Enable absolute positioning on mobile for a 'pile' look, grid on desktop
                // We'll use CSS classes to handle layout but inline styles for rotation
            }}
            onClick={() => onClick(photo)}
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/30 rotate-1 shadow-sm backdrop-blur-sm border border-white/40 z-10" />

            <div className="aspect-[4/5] overflow-hidden mb-3 bg-gray-100 shadow-inner">
                <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover pointer-events-none" // prevent drag on img
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="font-Handwriting text-2xl text-center text-gray-800 rotate-1">
                {photo.caption}
            </div>
            <p className="text-xs text-gray-400 text-center font-sans mt-1">{photo.date}</p>
        </motion.div>
    );
};

const Modal = ({ photo, onClose }) => {
    const [liked, setLiked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                layoutId={`photo-${photo.id}`}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 100 }}
                className="bg-white p-4 sm:p-6 rounded-lg max-w-4xl w-full shadow-2xl relative flex flex-col md:flex-row gap-8 items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors z-50" onClick={onClose}>
                    <X size={28} />
                </button>

                <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-100 rounded shadow-inner overflow-hidden border-8 border-white transform -rotate-2">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-4">
                    <div>
                        <h3 className="font-script text-5xl text-rose-500 mb-2">{photo.caption}</h3>
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">{photo.date}</p>
                    </div>

                    <div className="h-0.5 w-20 bg-rose-200"></div>

                    <p className="text-gray-600 leading-relaxed text-lg font-body italic">
                        "{photo.description}"
                    </p>

                    <div className="pt-6">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full border-2 transition-all font-bold text-lg ${liked ? 'bg-rose-500 border-rose-500 text-white shadow-lg scale-105' : 'border-gray-300 text-gray-500 hover:border-rose-300 hover:text-rose-500'}`}
                        >
                            <Heart className={liked ? "fill-current" : ""} size={24} />
                            {liked ? "Cherished!" : "Mark as Favorite"}
                        </button>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

const PolaroidGallery = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section className="py-24 px-4 min-h-screen relative bg-stone-100 overflow-hidden">
            {/* Wood Texture Background */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM32 63c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm57-13c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl font-script text-gray-800 mb-4 drop-shadow-sm">Our Memories</h2>
                <p className="text-gray-500 text-xl font-handwriting transform -rotate-1">Captured moments on the table of love.</p>
            </div>

            {/* Gallery Grid/Pile */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-7xl mx-auto py-10 perspective-1000 min-h-[600px] relative">
                {photos.map((photo, index) => (
                    <Polariod
                        key={photo.id}
                        index={index}
                        photo={photo}
                        onClick={setSelectedPhoto}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedPhoto && <Modal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default PolaroidGallery;
