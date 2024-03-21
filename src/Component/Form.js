import React, { useState, useEffect, useRef } from "react";
import "./FormCss.css"; // Assuming you have CSS for styling form elements
import TextInput from "./TextInput";
import LazyLoadedCard from "./LazyLoadedCard";

const MyForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [pinData, setPinData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchDataError, setFetchDataError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardLoaded, setIsCardLoaded] = useState(false);

  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (pin && pin.length === 6) {
      setIsLoading(true);
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(fetchData, 5000); // Adjust the delay as needed
    }
  }, [pin]);

  const fetchData = async () => {
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
      setIsLoading(false);
    }
  };

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
      setFormSubmitted(false);
      window.alert("Please fill in all the required fields.");
      return;
    }
    const formData = {
      name,
      mobile,
      email,
      Address: selectedCard,
      pin,
    };
    console.log("Form submitted with payload:", formData);
    const addressString = Object.entries(formData.Address)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    window.alert(
      `Form submitted successfully!\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nAddress:\n${addressString}\nPIN: ${formData.pin}`,
    );
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="formHeader">
          <h2>POSTAL PIN CODE INFORMATION</h2>
          <img
            src="https://th.bing.com/th/id/R.9b902ce8e29f8c0cea66bce367fb6cb4?rik=NuNiEACVdOAPYQ&riu=http%3a%2f%2fegov.eletsonline.com%2fwp-content%2fuploads%2f2012%2f04%2findia-post-logo.jpg&ehk=%2bPBpWSELC%2bqQkYNFj%2blzwBqci0dYX7v5nyjZSJdz%2fTU%3d&risl=&pid=ImgRaw&r=0"
            style={{ width: "300px" }}
            alt="India Post Logo"
          />
        </div>

        <div className="inputGroup">
          <TextInput
            label="Name:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`input form-control ${formSubmitted && !name ? "error" : ""}`}
            labelStyle="label"
          />
          {formSubmitted && !name && (
            <p className="errorText text-danger">Name is required.</p>
          )}
        </div>

        <div className="inputGroup">
          <TextInput
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
            className={`input form-control ${formSubmitted && (!email || !isValidEmail(email)) ? "error" : ""}`}
            labelStyle="label"
          />
          {formSubmitted && !email && (
            <p className="errorText text-danger">Email is required.</p>
          )}
          {formSubmitted && email && !isValidEmail(email) && (
            <p className="errorText text-danger">
              Enter a valid email address.
            </p>
          )}
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
            className={`input form-control ${formSubmitted && (!mobile || !isValidMobile(mobile)) ? "error" : ""}`}
            labelStyle="label"
          />
          {formSubmitted && !mobile && (
            <p className="errorText text-danger">Mobile Number is required.</p>
          )}
          {formSubmitted && mobile && !isValidMobile(mobile) && (
            <p className="errorText text-danger">
              Mobile Number should be of 10 digits.
            </p>
          )}
        </div>

        <div className="inputGroup">
          <TextInput
            label="Enter PIN:"
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            pattern="[0-9]{6}"
            className={`input form-control ${formSubmitted && !pin ? "error" : ""}`}
            labelStyle="label"
          />
          {formSubmitted && !pin && (
            <p className="errorText text-danger">Enter PIN is required.</p>
          )}
        </div>

        {isLoading ? (
          <div className="loader"></div>
        ) : pin && pin.length === 6 ? (
          <div className="cardSection">
            <LazyLoadedCard
              pin={pin}
              postOffices={pinData}
              onSelect={(card) => {
                setSelectedCard(card);
                setIsCardLoaded(true);
              }}
            />
          </div>
        ) : null}

        <button
          type="submit"
          className={`submitButton btn btn-primary ${formSubmitted ? "disabled" : ""}`}
          disabled={formSubmitted}
        >
          Submit
        </button>

        {formSubmitted && (
          <p className="successText text-success">
            Form submitted successfully!
          </p>
        )}

        {!isCardLoaded && fetchDataError && (
          <p className="errorText text-danger">{fetchDataError}</p>
        )}
      </form>
    </div>
  );
};

export default MyForm;
