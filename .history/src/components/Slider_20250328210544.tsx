"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  backgroundColor: string;
}

const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      title: "We've got your company covered",
      description: "We service every product we sell from the day you buy our products till the service life is over.",
      image: "/safety.jpg", // Replace with your actual image path
      buttonText: "See Our Products",
      backgroundColor: "bg-red-600"
    },
    {
      title: "Quality Precision Instruments",
      description: "Advanced measurement tools for professional and industrial applications.",
      image: "/lab_equipment.jpg", // Replace with your actual image path
      buttonText: "Explore Catalog",
      backgroundColor: "bg-blue-600"
    },
    {
      title: "Reliable Technical Support",
      description: "Expert maintenance and calibration services for all our equipment.",
      image: "/images/hero-slide-3.jpg", // Replace with your actual image path
      buttonText: "Contact Support",
      backgroundColor: "bg-green-600"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              quality={90}
              priority={index === currentSlide}
              className="brightness-50" // Darken image for better text visibility
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-xl space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
              <p className="text-lg md:text-xl mt-4">{slide.description}</p>
              <button className="mt-6 px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 rounded-full p-2 z-20 hover:bg-white/50 transition"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 rounded-full p-2 z-20 hover:bg-white/50 transition"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;