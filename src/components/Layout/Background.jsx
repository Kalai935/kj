import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeartShape = new THREE.Shape();
HeartShape.moveTo(0.25, 0.25);
HeartShape.bezierCurveTo(0.25, 0.25, 0.20, 0, 0, 0);
HeartShape.bezierCurveTo(-0.30, 0, -0.30, 0.35, -0.30, 0.35);
HeartShape.bezierCurveTo(-0.30, 0.55, -0.10, 0.77, 0.25, 0.95);
HeartShape.bezierCurveTo(0.60, 0.77, 0.80, 0.55, 0.80, 0.35);
HeartShape.bezierCurveTo(0.80, 0.35, 0.80, 0, 0.50, 0);
HeartShape.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);

const FloatingHearts = ({ count = 50 }) => {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -0.5 + Math.random();
            const yFactor = -0.5 + Math.random();
            const zFactor = -0.5 + Math.random();
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const geometry = new THREE.ExtrudeGeometry(HeartShape, extrudeSettings);


    return (
        <instancedMesh ref={mesh} args={[geometry, null, count]}>
            <meshPhongMaterial color="#ffb6c1" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const Background = () => {
    return (
        <div className="fixed inset-0 min-h-screen -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingHearts />
            </Canvas>
        </div>
    )
}

export default Background;
