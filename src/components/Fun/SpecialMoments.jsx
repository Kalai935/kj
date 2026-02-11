import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Play, Heart } from 'lucide-react';

const moments = [
    { id: 1, type: 'image', url: 'https://lh3.googleusercontent.com/d/1U_nsyLMXzi004BNO7-cGABNnjH1rWKHV', caption: 'Sweet Memories' },
    { id: 2, type: 'image', url: 'https://lh3.googleusercontent.com/d/1r8aJWnNdSZ5XfQ5Ldt8BTHiaA0QRCvGb', caption: 'Together Forever' },
    { id: 3, type: 'image', url: 'https://lh3.googleusercontent.com/d/1dpnc6fjtb0xvkhBUwIPVqezBOkZ7RmWJ', caption: 'Pure Joy' },
    { id: 4, type: 'image', url: 'https://lh3.googleusercontent.com/d/15WZ7yo9HtIprWcbmCZ2Dbs3BTAWWpI2L', caption: 'Cozy moments' },
    { id: 5, type: 'image', url: 'https://lh3.googleusercontent.com/d/15er1KfY_ZA83S57Stb01gNvgOdlqzrrn', caption: 'Adventure Time' },
    { id: 6, type: 'image', url: 'https://lh3.googleusercontent.com/d/1V-lDFSzrq87nKSOboYHsgcuYJxLuXHTm', caption: 'Best Friends & Lovers' },
];

const FloatingImage = ({ item, index, onClick }) => {
    // Randomize initial positions slightly for organic feel
    const randomX = useRef(Math.random() * 40 - 20).current;

    // Parallax effect based on scroll
    const { scrollYProgress } = useScroll();
    // Alternating directons for a "drifting" feel
    const y = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? -150 : 150)]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? 5 : -5)]);

    return (
        <motion.div
            layoutId={`media-${item.id}`}
            style={{
                y,
                rotate,
                x: randomX,
            }}
            whileHover={{ scale: 1.1, zIndex: 10, rotate: 0, transition: { duration: 0.3 } }}
            className="relative cursor-pointer group"
            onClick={() => onClick(item)}
        >
            <div className="bg-white p-2 md:p-3 rounded-lg shadow-xl transform transition-transform duration-500 hover:shadow-2xl hover:rotate-0">
                {item.type === 'video' ? (
                    <div className="relative aspect-[3/4] overflow-hidden rounded bg-gray-100">
                        <video src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" muted loop playsInline />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="text-white fill-white opacity-80 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                ) : (
                    <div className="aspect-[3/4] overflow-hidden rounded bg-gray-100">
                        <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                )}

                <div className="mt-3 text-center">
                    <p className="font-Handwriting text-gray-600 text-lg group-hover:text-rose-500 transition-colors">{item.caption}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Lightbox = ({ item, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={onClose}
        >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors" onClick={onClose}>
                <X size={40} />
            </button>

            <motion.div
                layoutId={`media-${item.id}`}
                className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {item.type === 'video' ? (
                    <video src={item.url} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" controls autoPlay />
                ) : (
                    <img
                        src={item.url}
                        alt={item.caption}
                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        referrerPolicy="no-referrer"
                    />
                )}

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-center"
                >
                    <h3 className="text-white font-header text-3xl md:text-4xl mb-2">{item.caption}</h3>
                    <p className="text-gray-400 font-light flex items-center justify-center gap-2">
                        <Heart size={16} className="text-rose-500 fill-rose-500" />
                        Forever cherished
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const SpecialMoments = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section className="py-24 px-4 min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 overflow-hidden relative">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-20 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-40 right-10 w-64 h-64 bg-purple-300 rounded-full blur-3xl mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-64 h-64 bg-yellow-300 rounded-full blur-3xl mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="text-center mb-20 relative z-10">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-script text-rose-500 mb-6 drop-shadow-sm"
                >
                    Memory Cloud
                </motion.h2>
                <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto">
                    Drifting through our most beautiful moments together.
                </p>
            </div>

            {/* Masonry-style Grid with offsets for organic feel */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 px-4 md:px-12 pb-20">
                {moments.map((item, index) => (
                    <div key={item.id} className={`${index % 2 !== 0 ? 'md:mt-20' : ''}`}>
                        <FloatingImage item={item} index={index} onClick={setSelectedItem} />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default SpecialMoments;
