"use client";
import { useState } from "react";
const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className="relative w-full max-w-[800px] mx-auto overflow-hidden rounded-lg shadow-md">
      <div
        className="flex transition-transform duration-300 ease-in-out h-[400px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0">
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 -translate-y-1/2 left-2.5 bg-black/50 text-white border-none px-4 py-2.5 cursor-pointer text-base rounded z-10 transition-colors duration-200 hover:bg-black/80"
      >
        ← Previous
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 -translate-y-1/2 right-2.5 bg-black/50 text-white border-none px-4 py-2.5 cursor-pointer text-base rounded z-10 transition-colors duration-200 hover:bg-black/80"
      >
        Next →
      </button>
    </div>
  );
};
export default Slider;