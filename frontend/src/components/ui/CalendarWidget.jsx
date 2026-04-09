import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Modern Clean Calendar Widget
 * Mirrors the exact styling of the calendar shown in the design reference.
 */
const CalendarWidget = () => {
  const [currentDate] = useState(new Date(2020, 2, 1)); // Hardcoded March 2020 to match mockup for visual verification

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  
  // Dummy data generation just to build out the grid (mockup representation)
  // Usually this would be dynamically generated via simple date math.
  const days = [
    { num: "", inactive: true }, { num: "", inactive: true }, { num: "", inactive: true }, { num: "", inactive: true }, { num: "", inactive: true }, { num: "", inactive: true }, { num: 1, inactive: false },
    { num: 2, inactive: false }, { num: 3, inactive: false }, { num: 4, inactive: false }, { num: 5, inactive: false, dot: "red-yellow" }, { num: 6, inactive: false }, { num: 7, inactive: false }, { num: 8, inactive: false },
    { num: 9, inactive: false }, { num: 10, inactive: false, dot: "blue" }, { num: 11, inactive: false }, { num: 12, inactive: false }, { num: 13, inactive: false, selected: true, dot: "multi" }, { num: 14, inactive: false }, { num: 15, inactive: false },
    { num: 16, inactive: false }, { num: 17, inactive: false }, { num: 18, inactive: false }, { num: 19, inactive: false }, { num: 20, inactive: false }, { num: 21, inactive: false }, { num: 22, inactive: false },
    { num: 23, inactive: false, dot: "yellow" }, { num: 24, inactive: false }, { num: 25, inactive: false, dot: "red" }, { num: 26, inactive: false }, { num: 27, inactive: false }, { num: 28, inactive: false }, { num: 29, inactive: false },
    { num: 30, inactive: false }, { num: 31, inactive: false },
  ];

  return (
    <div className="bg-bg-light-component dark:bg-bg-dark-component rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-800 lg:col-span-1">
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">March 2020</h3>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-[10px] font-bold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-4">
        {days.map((day, idx) => (
          <div key={idx} className="relative flex justify-center items-center h-10 w-full group cursor-pointer">
            
            {/* The Date Number */}
            {day.num && (
              <span 
                className={`z-10 font-medium ${
                  day.selected 
                    ? "text-brand-purple font-bold text-lg" 
                    : "text-slate-600 dark:text-slate-300 text-sm group-hover:text-brand-purple"
                }`}
              >
                {day.num}
              </span>
            )}

            {/* Selection highlight ring */}
            {day.selected && (
              <div className="absolute h-10 w-10 border-2 border-brand-purple/20 bg-brand-purple/5 rounded-full z-0 pointer-events-none" />
            )}

            {/* Event Dots Underneath */}
            {day.dot && (
              <div className="absolute bottom-1 flex gap-1 z-10">
                {day.dot.includes('red') && <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>}
                {day.dot.includes('yellow') && <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>}
                {day.dot.includes('blue') && <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>}
                {day.dot.includes('multi') && (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-highlight"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
