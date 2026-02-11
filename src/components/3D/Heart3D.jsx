import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedHeart = () => {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // Heart Shape Geometry
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    // Center it
    geometry.center();

    useFrame((state, delta) => {
        mesh.current.rotation.y += delta * 0.5;
        if (active) {
            mesh.current.rotation.z += delta * 2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh
                ref={mesh}
                geometry={geometry}
                scale={hovered ? 0.3 : 0.25}
                onClick={() => setActive(!active)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                rotation={[Math.PI, 0, 0]} // Flip heart right side up if needed? Extrude shape draws inverted usually in standard coords? Let's check visually.
            >
                <meshStandardMaterial
                    color={hovered ? "#ff1744" : "#e91e63"}
                    roughness={0.3}
                    metalness={0.2}
                    emissive={active ? "#ff0000" : "#000000"}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
};

const Heart3D = () => {
    return (
        <section className="py-20 h-[60vh] w-full bg-gray-900 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="text-center">
                    <h2 className="text-4xl font-script text-white/50 mb-2">My Heart</h2>
                    <p className="text-gray-500 text-sm">Click to make it race</p>
                </div>
            </div>

            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <AnimatedHeart />

                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </section>
    );
};

export default Heart3D;
