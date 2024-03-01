import React, { useState, useEffect } from "react";

const LazyLoadedCard = ({ postOffices, onSelect, pin }) => {
  // State to manage loading state of the card
  const [isLoading, setIsLoading] = useState(true);
  // State to manage whether to show the card or not
  const [showCard, setShowCard] = useState(false);

  // Effect to handle loading and showing the card based on the pin
  useEffect(() => {
    // Set loading to true and hide the card initially
    setIsLoading(true);
    setShowCard(false);

    // Simulate loading time with a timeout
    const timer = setTimeout(() => {
      // After timeout, set loading to false and show the card
      setIsLoading(false);
      setShowCard(true);
    }, 9000); // Simulate 9 seconds of loading time

    // Clean up the timer when the component unmounts or when the pin changes
    return () => clearTimeout(timer);
  }, [pin]); // Dependency array with pin as dependency

  // Lazy load the actual card component
  const LazyCard = React.lazy(() => import("./Cards"));

  // Styling for the loader animation
  const loaderStyle = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 9s linear infinite", // Animation for loader
  };

  // CSS keyframes for the loader animation
  const keyframesStyle = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div>
      {/* Inject CSS keyframes for loader animation */}
      <style>{keyframesStyle}</style>
      {/* Show loader if isLoading is true */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <div style={loaderStyle}></div>
        </div>
      )}
      {/* Show lazy loaded card if showCard is true */}
      {showCard && (
        <React.Suspense fallback={<div></div>}>
          {/* Lazy load the actual card component */}
          <LazyCard postOffices={postOffices} onSelect={onSelect} />
        </React.Suspense>
      )}
    </div>
  );
};

export default LazyLoadedCard;
