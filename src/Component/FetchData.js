import React, { useState } from "react";

const FetchData = ({ pin, setPinData, setFetchDataError }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchData = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      if (data[0]?.PostOffice) {
        setPinData(data[0]?.PostOffice);
        setFetchDataError(null);
      } else {
        throw new Error("No data found for the provided pincode");
      }
    } catch (err) {
      console.error(err);
      setFetchDataError("Failed to fetch data. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div style={styles.buttonGroup}>
      <button
        type="button"
        onClick={handleFetchData}
        disabled={isFetching}
        style={styles.fetchButton}
      >
        {isFetching ? "Fetching Data..." : "Click Here to Get PinCode Information"}
      </button>
    </div>
  );
};

const styles = {
  buttonGroup: { marginBottom: "20px" },
  fetchButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default FetchData;