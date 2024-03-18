import React from 'react'

export default function ColorLoop() {
    const data = [1, 2, 3, 4, 5]; // Example data
    const colors = ["red", "blue", "green", "yellow"];
  return (
    
    <div>
    {data.map((item, index) => {
      const colorIndex = index % colors.length;
      const color = colors[colorIndex];
      return (
        <div key={index} style={{ color: color }}>
          Item: {item}, Color: {color}
        </div>
      );
    })}
  </div>
  )
}
