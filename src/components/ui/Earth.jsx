import React, { useRef } from 'react';
import * as THREE from 'three';
import {useFrame, useLoader } from '@react-three/fiber';
import '../../App.css';
import { gpsToCartesian } from '../../utils/geo';
import { Marker } from './Marker';

export function Earth() {
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, '/earth.jpg');
    const radius = 2;
  
    // Example GPS markers
    const markers = [
      //{ id: 1, lat: 48.8566, lon: 2.3522, color: 'red' },     // Paris
      { id: 2, lat: 40.7128, lon: -74.006, color: 'red' },   // New York
      { id: 3, lat: -33.8688, lon: 151.2093, color: 'red' },// Sydney
    ];

    const pos = gpsToCartesian(40.7128, -74.006, radius + 0.01);
    const color = 'red';
  
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

        <mesh position={pos}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>

        <Marker lat={40.7128} lon={-74.006} radius={2} color={'red'}/>
        <Marker lat={48.8566} lon={2.3522} radius={2} color={'red'}/>
 
      </group>
    );
  }