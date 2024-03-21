import React, { useState, useEffect } from "react";

const FetchData = ({ pin, setPinData, setFetchDataError }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchData = async () => {
    if (!pin || pin.length !== 6) {
      return;
    }

    setIsFetching(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      const data = await res.json();
      if (data && data.length > 0 && data[0]?.PostOffice) {
        setPinData(data[0]?.PostOffice);
        setFetchDataError(null);
      } else {
        throw new Error("No data found for the provided pincode");
      }
    } catch (err) {
      console.error(err);
      setFetchDataError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setFetchDataError(null);
  }, [pin, setFetchDataError]);

  return <div style={styles.buttonGroup}>{/* No button JSX code */}</div>;
};

const styles = {
  buttonGroup: { marginBottom: "20px" },
};

export default FetchData;
