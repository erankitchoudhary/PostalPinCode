import React, { useState, useEffect } from "react";

const Card = ({ postOffices, onSelect }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [numCardsPerRow, setNumCardsPerRow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setNumCardsPerRow(2); // Adjust the number of cards per row for smaller screens
      } else {
        setNumCardsPerRow(4);
      }
    };

    handleResize(); // Call it once to set initial state
    window.addEventListener("resize", handleResize); // Add event listener for window resize

    return () => window.removeEventListener("resize", handleResize); // Clean up event listener
  }, []);

  const handleCardClick = (office, index) => {
    if (onSelect) {
      onSelect(office);
    }
    setSelectedCard(index);
  };

  const cardWidth = `calc(${100 / numCardsPerRow}% - 20px)`; // Calculate card width based on the number of cards per row

  const styles = {
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    card: {
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      margin: "10px",
      cursor: "pointer",
      transition: "box-shadow 0.3s ease",
      width: cardWidth,
      boxSizing: "border-box",
    },
    cardTitle: {
      fontSize: "1rem",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.cardContainer}>
      {postOffices && postOffices.length > 0 ? (
        postOffices.map((office, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: selectedCard === index ? "#cceeff" : "#f0f0f0",
            }}
            onClick={() => handleCardClick(office, index)}
          >
            <h3 style={styles.cardTitle}>Area: {office.Name}</h3>
            <p style={styles.cardText}>Pincode: {office.Pincode}</p>
            <p style={styles.cardText}>District: {office.District}</p>
            <p style={styles.cardText}>Division: {office.Division}</p>
            <p style={styles.cardText}>Block: {office.Block}</p>
            <p style={styles.cardText}>State: {office.State}</p>
            <p style={styles.cardText}>Country: {office.Country}</p>
          </div>
        ))
      ) : (
        <p>No post offices found</p>
      )}
    </div>
  );
};

export default Card;
