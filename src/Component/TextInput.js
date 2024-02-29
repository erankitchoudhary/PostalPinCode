import React, { useState } from "react";

const TextInput = ({ label, type, value, onChange, placeholder, required, pattern }) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (required && !inputValue) {
      setError(`${label} is required.`);
    } else if (pattern && !RegExp(pattern).test(inputValue)) {
      setError(`Invalid ${label}.`);
    } else {
      setError("");
    }
    onChange(e);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default TextInput;

const styles = {
  container: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  label: {
    width: "20%",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  input: {
    width: "60%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    boxSizing: "border-box",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "4px",
  },
};
