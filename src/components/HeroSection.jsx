import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Reliable image sources with fallbacks
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
            fallback: "https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
            fallback: "https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
            fallback: "https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
        },
        {
            id: 4,
            image: "https://media.istockphoto.com/id/1270641180/photo/portrait-of-young-woman-in-neon-light-on-dark-backgound-the-human-emotions-black-friday-cyber.jpg?s=1024x1024&w=is&k=20&c=ugl7kEwprdmrimoRARHoBfQrnYrLw9an2bwtqFSxk6U=",
            fallback: "https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
        },
        {
            id: 5,
            image: "https://plus.unsplash.com/premium_photo-1721893171616-ac33fcb70908?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            fallback: "https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
        }
    ];

    // Auto-scroll to current slide
    useEffect(() => {
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.scrollTo({
                left: currentSlide * window.innerWidth,
                behavior: 'smooth'
            });
        }
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="w-full max-w-full mx-auto px-12 py-8 relative">

            {/* Carousel Container */}
            <div className="relative carousel w-full rounded-xl h-64 md:h-96  overflow-hidden">

                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        id={`slide-${slide.id}`}
                        className="carousel-item relative w-full"
                    >
                        <img
                            src={slide.image}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = slide.fallback;
                            }}
                            className="w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows - Always Visible */}
            <div className="absolute top-1/2 left-12 right-12 flex justify-between transform -translate-y-1/2">
                <button
                    onClick={prevSlide}
                    className="btn btn-circle bg-white/30 hover:bg-white/50 text-black border-none shadow-lg rounded-l-none"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="btn btn-circle bg-white/30 hover:bg-white/50 text-black border-none shadow-lg rounded-r-none"
                >
                    ❯
                </button>
            </div>

            {/* Round Indicators - Always Visible */}
            <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 flex gap-2 ">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;