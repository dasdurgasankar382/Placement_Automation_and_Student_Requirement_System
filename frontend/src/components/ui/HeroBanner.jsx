import React from "react";
import { Link } from "react-router-dom";

/**
 * Universal Hero Banner Component
 * Replicates the purple "Hello Katie!" banner from the design reference.
 * 
 * @param {string} title - Main greeting text (e.g., "Hello Katie!")
 * @param {string} subtitle - Description text
 * @param {string} buttonText - Text for the Call to Action button
 * @param {string} buttonLink - Link for the CTA button
 * @param {React.ReactNode} illustration - Optional SVG or image for the right side
 */
const HeroBanner = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  illustration 
}) => {
  return (
    <div className="relative bg-brand-purple rounded-3xl p-8 sm:p-10 overflow-hidden shadow-xl shadow-brand-purple/20 flex items-center justify-between isolate">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl z-[-1]" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-brand-purple-hover/50 blur-3xl z-[-1]" />

      <div className="max-w-xl z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {title}
        </h2>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
          {subtitle}
        </p>
        
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="inline-block bg-white/20 hover:bg-white text-white hover:text-brand-purple transition-all duration-300 font-semibold px-6 py-2.5 rounded-xl backdrop-blur-sm border border-white/20 hover:shadow-lg"
          >
            {buttonText}
          </Link>
        )}
      </div>

      {/* Right Side Illustration */}
      {illustration && (
        <div className="hidden lg:block absolute right-12 bottom-0 h-[120%] z-10 select-none pointer-events-none">
           {/* If an illustration is provided, render it here. */}
           {illustration}
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
