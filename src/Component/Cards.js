import React, { useState } from "react";

const Card = ({ postOffices, onSelect }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (office, index) => {
    if (onSelect) {
      onSelect(office);
    }
    setSelectedCard(index);
  };

  const numCardsPerRow = 4; 
  const cardWidth = `calc(${100 / numCardsPerRow}% - 20px)`; 

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
