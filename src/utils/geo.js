export function gpsToCartesian(lat, lon, radius) {

    const phi   = (90-lat)*(Math.PI/180);
    const theta = (lon+180)*(Math.PI/180);
  
    const x = -(radius * Math.sin(phi)*Math.cos(theta));
    const z = (radius * Math.sin(phi)*Math.sin(theta));
    const y = (radius * Math.cos(phi));
  
    return [x, y, z];
}