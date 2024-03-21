import React, { useState, useEffect } from "react";

const LazyLoadedCard = ({ postOffices, onSelect, pin }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setShowCard(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowCard(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, [pin]);
  const LazyCard = React.lazy(() => import("./Cards"));
  const loaderStyle = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 9s linear infinite",
  };
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
      <style>{keyframesStyle}</style>
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
      {showCard && (
        <React.Suspense fallback={<div></div>}>
          <LazyCard postOffices={postOffices} onSelect={onSelect} />
        </React.Suspense>
      )}
    </div>
  );
};

export default LazyLoadedCard;
