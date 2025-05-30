import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './App.css';
import { Earth } from './components/ui/earth';


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
        <Earth />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;

