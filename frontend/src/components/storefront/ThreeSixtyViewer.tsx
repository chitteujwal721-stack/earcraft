import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface ThreeSixtyViewerProps {
  images: string[];
}

export const ThreeSixtyViewer: React.FC<ThreeSixtyViewerProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  if (!images || images.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 15) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative w-full h-80 rounded-2xl overflow-hidden bg-[#F6F7F9] border border-[#E5E7EB] select-none cursor-grab active:cursor-grabbing flex items-center justify-center p-4"
    >
      <img
        src={images[currentIndex]}
        alt={`360 view frame ${currentIndex + 1}`}
        className="h-full object-contain pointer-events-none"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#E5E7EB] text-xs text-[#6D5EF6] font-semibold flex items-center gap-2 pointer-events-none luxury-shadow">
        <RotateCw className="w-4 h-4 text-[#6D5EF6]" />
        <span className="font-display">Drag left or right for 360° Studio Inspection</span>
      </div>
    </div>
  );
};
