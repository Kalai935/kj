import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const ConstellationCanvas = ({ aligned }) => {
    const pointsRef = useRef();
    const count = 400; // Increased star count

    // Generate random positions and Heart positions
    const { positions, heartPositions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const heartPos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Random positions (Cube distribution)
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

            // Heart shape parametric equation
            const t = Math.random() * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            const z = (Math.random() - 0.5) * 5;

            // Scale down and center
            heartPos[i * 3] = x * 0.4;
            heartPos[i * 3 + 1] = y * 0.4;
            heartPos[i * 3 + 2] = z;
        }
        return { positions: pos, heartPositions: heartPos };
    }, []);

    // Create a buffer for the current positions to mutate
    const bufferPositions = useMemo(() => new Float32Array(count * 3), [count]);

    // Initialize buffer with starting positions
    useEffect(() => {
        bufferPositions.set(positions);
    }, [positions, bufferPositions]);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        // Lerp towards target positions
        const target = aligned ? heartPositions : positions;
        const speed = aligned ? 2.5 : 1.5;

        // We iterate through all points and interpolate them
        for (let i = 0; i < count * 3; i++) {
            bufferPositions[i] = THREE.MathUtils.lerp(bufferPositions[i], target[i], delta * speed);
        }

        // Update the geometry attribute
        pointsRef.current.geometry.attributes.position.array.set(bufferPositions);
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotate the whole system slowly for dynamic effect
        if (aligned) {
            pointsRef.current.rotation.y += delta * 0.2;
        } else {
            pointsRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={bufferPositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.6}
                    color="#ffb6c1"
                    transparent
                    opacity={0.9}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {aligned && (
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Text
                        position={[0, -0.5, 0]}
                        fontSize={1.5}
                        color="#ec4899"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Janu & Kalai
                    </Text>
                    <Text
                        position={[0, -2, 0]}
                        fontSize={0.6}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Nov 17, 2023
                    </Text>
                </Float>
            )}
        </group>
    );
};

const Constellation = () => {
    const [aligned, setAligned] = useState(false);

    return (
        <section className="h-screen w-full bg-black relative overflow-hidden flex flex-col items-center justify-center">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-[#1a0510] z-0 opacity-80" />

            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-8 z-20 text-center pointer-events-none">
                <h2 className="text-5xl md:text-6xl font-script text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Our Universe</h2>
                <p className="text-gray-300 mt-2 text-lg">Written in the stars.</p>
            </div>

            {/* Canvas Container */}
            <div className="w-full h-full absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ConstellationCanvas aligned={aligned} />
                    <OrbitControls enableZoom={false} autoRotate={!aligned} autoRotateSpeed={0.5} enablePan={false} />
                </Canvas>
            </div>

            {/* Button */}
            <div className="absolute bottom-16 z-30 text-center">
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAligned(!aligned)}
                    className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-wider hover:bg-white/20 transition-all cursor-pointer shadow-lg text-lg"
                >
                    {aligned ? "Scatter Stars" : "Align Our Stars"}
                </motion.button>
            </div>
        </section>
    );
};

export default Constellation;
