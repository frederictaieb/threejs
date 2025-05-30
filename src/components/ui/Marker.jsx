import React, { useRef } from 'react';
import { gpsToCartesian } from '../../utils/geo';
import { useState } from 'react';

export function Marker(props) {
    const lat = props.lat;
    const lon = props.lon;
    const radius = props.radius;
    const color = props.color;

    const pos = gpsToCartesian(lat, lon, radius + 0.01);

    return (
      <mesh position={pos}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    );
}
