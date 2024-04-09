"use client";
import React, { useEffect, useRef, useState } from 'react';

function MarkerImage({ imageUrl, markerCoordinates }) {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Draw marker if coordinates are available
      if (markerCoordinates && imageLoaded) {
        drawMarker(ctx, markerCoordinates.x, markerCoordinates.y);
      }
    };
    // Set the imageLoaded state when the image is loaded
    image.onload = () => setImageLoaded(true);
  }, [imageUrl, markerCoordinates, imageLoaded]);

  // Function to draw the marker
  const drawMarker = (ctx, x, y) => {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <canvas ref={canvasRef} />;
}

export default MarkerImage;
