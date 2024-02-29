import React, { useState, useMemo } from "react";
import "./FormCss.css";

import TextInput from "./TextInput";
import FetchData from "./FetchData";
import Card from "./Cards";

const MyForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [pinData, setPinData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchDataError, setFetchDataError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !mobile ||
      !email ||
      !selectedCard ||
      pin.length !== 6 ||
      !isValidEmail(email) ||
      !isValidMobile(mobile)
    ) {
      window.alert("Form validation failed: Incomplete or invalid form data");
      return;
    }
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the data?"
    );
    if (!isConfirmed) {
      return;
    }
    const formData = {
      name,
      mobile,
      email,
      Address: selectedCard,
      pin,
    };
    window.alert(
      `Form submitted successfully! Form Data: ${JSON.stringify(formData)}`
    );
    console.log("Form submitted with payload:", formData);
    setFormSubmitted(true);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
    return emailRegex.test(email);
  };
  const isValidMobile = (mobile) => {
    const mobileRegex = /^[1-9][0-9]{9}$/;
    return mobileRegex.test(mobile);
  };

  // useMemo for memoizing pinData related components
  const memoizedCardComponent = useMemo(() => {
    return (
      pinData?.length > 0 && (
        <Card postOffices={pinData} onSelect={setSelectedCard} />
      )
    );
  }, [pinData]);

  // useMemo for memoizing form submission message
  const memoizedSubmissionMessage = useMemo(() => {
    return (
      formSubmitted && <p className="errorText">Form submitted successfully!</p>
    );
  }, [formSubmitted]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="formHeader">
          <h2>POSTAL PIN CODE INFORMATION</h2>
         <img  src="https://th.bing.com/th/id/R.9b902ce8e29f8c0cea66bce367fb6cb4?rik=NuNiEACVdOAPYQ&riu=http%3a%2f%2fegov.eletsonline.com%2fwp-content%2fuploads%2f2012%2f04%2findia-post-logo.jpg&ehk=%2bPBpWSELC%2bqQkYNFj%2blzwBqci0dYX7v5nyjZSJdz%2fTU%3d&risl=&pid=ImgRaw&r=0" style={{width:"300px"}}/>
        </div>

        <div className="inputGroup">
          <TextInput
            label="Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
            labelStyle="label"
          />
        </div>

        <div className="inputGroup">
          <TextInput
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
            className="input"
            labelStyle="label"
          />
        </div>

        <div className="inputGroup">
          <TextInput
            label="Mobile Number:"
            type="text"
            value={mobile}
            onChange={(e) => {
              const trimmedValue = e.target.value.trim();
              if (trimmedValue.length <= 10) {
                setMobile(trimmedValue);
              }
            }}
            required
            pattern="[1-9][0-9]{9}"
            className="input"
            labelStyle="label"
          />
        </div>

        <div className="inputGroup">
          <TextInput
            label="Enter PIN:"
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            pattern="[0-9]{6}"
            className="input"
            labelStyle="label"
          />
        </div>

        <FetchData
          pin={pin}
          setPinData={setPinData}
          setFetchDataError={setFetchDataError}
        />

        <div className="cardSection">{memoizedCardComponent}</div>

        <button type="submit" className="submitButton">
          Submit
        </button>

        {memoizedSubmissionMessage}

        {fetchDataError && <p className="errorText">{fetchDataError}</p>}
      </form>
    </div>
  );
};

export default MyForm;
