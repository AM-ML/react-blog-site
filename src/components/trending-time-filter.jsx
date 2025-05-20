import React, { useState, useEffect } from "react";
import "../css/components/trending-time-filter.css";

const TrendingTimeFilter = ({ onSelectPeriod, initialPeriod = "week" }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  
  const periods = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" }
  ];
  
  // Set initial period value
  useEffect(() => {
    setSelectedPeriod(initialPeriod);
  }, [initialPeriod]);
  
  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    onSelectPeriod(period);
  };
  
  return (
    <div className="trending-time-filter">
      <p className="trending-time-filter-label">Trending for:</p>
      <div className="trending-time-filter-options">
        {periods.map((period) => (
          <button
            key={period.id}
            className={`trending-time-btn ${selectedPeriod === period.id ? "active" : ""}`}
            onClick={() => handlePeriodSelect(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTimeFilter; 