import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './App.css';

function Sphere() {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, '/earth.jpg');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function App() {
  return (
    <div className="canvas-container">
      <Canvas
        style={{ background: 'black' }}
        camera={{ position: [0, 0, 4.7], fov: 60 }}
      >

        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <pointLight position={[0, -5, 10]} intensity={2} />
        <Sphere />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
