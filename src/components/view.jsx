import React, { useState, useRef } from "react";
import SelectionDemo from "./orgchart";

const ZoomableView = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const scaleChange = delta > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(0.1, scale * scaleChange), 5);

    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const newPosition = {
      x: position.x - (cursorX - position.x) * (scaleChange - 1),
      y: position.y - (cursorY - position.y) * (scaleChange - 1),
    };

    setScale(newScale);
    setPosition(newPosition);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full h-96 overflow-hidden border border-gray-300 rounded-lg relative">
      <div
        ref={containerRef}
        className="w-full h-full relative cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="p-4 bg-white">
            <SelectionDemo />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
        <div>Zoom: {Math.round(scale * 100)}%</div>
        <div className="text-sm text-gray-500">
          Drag to pan • Scroll to zoom
        </div>
      </div>
    </div>
  );
};

export default ZoomableView;
