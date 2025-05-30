import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './App.css';

function gpsToCartesian(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

function Sphere() {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, '/earth.jpg');
  const radius = 2;

  // Example GPS markers
  const markers = [
    { id: 1, lat: 48.8566, lon: 2.3522, color: 'red' },     // Paris
    { id: 2, lat: 40.7128, lon: -74.006, color: 'blue' },   // New York
    { id: 3, lat: -33.8688, lon: 151.2093, color: 'green' },// Sydney
  ];

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Markers */}
      {markers.map(({ id, lat, lon, color }) => {
        const pos = gpsToCartesian(lat, lon, radius + 0.05); // Slightly above surface
        return (
          <mesh key={id} position={pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
        );
      })}
    </group>
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
