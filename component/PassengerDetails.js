import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './PassengerDetails.css';
import { useLocation } from "react-router-dom";

const PassengerDetails = ({ onNext, onPrevious }) => {
   

    const location = useLocation();
    const [passengers, setPassengers] = useState(location.state?.passengers || [
        { firstName: '', lastName: '', email: '', image: null },
        { firstName: '', lastName: '', email: '', image: null }
    ]);
    

  const [webcamOpen, setWebcamOpen] = useState(false);
  const webcamRef = useRef(null);

  const navigate = useNavigate();
  
const handlePrevious = () => {
    if (isFormComplete) {
      navigate('search-flight');
    }
  };
/*   const handleNext = () => {
    if (isFormComplete) {
      navigate('/seat-selection');
    }
  }; */

  const handleNext = () => {
    if (isFormComplete) {
      navigate("/seat-selection", { state: { passengers } }); // ✅ Go to seat selection next
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const captureImage = (index) => {
    const imageSrc = webcamRef.current.getScreenshot();
    const updatedPassengers = [...passengers];
    updatedPassengers[index].image = imageSrc;
    setPassengers(updatedPassengers);
    setWebcamOpen(false);
  };

  const isFormComplete = passengers.every(
    (p) => p.firstName && p.lastName && p.email && p.image
  );

  return (
    <div className="form-container">
    <div className="passenger-form">
      <h2>Enter Details</h2>
      
      {passengers.map((passenger, index) => (
        <div key={index}>
          <h3>Person {index + 1}</h3>
          <input 
            type="text" 
            placeholder="First Name" 
            value={passenger.firstName} 
            onChange={(e) => handleInputChange(index, 'firstName', e.target.value)} 
            required
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={passenger.lastName} 
            onChange={(e) => handleInputChange(index, 'lastName', e.target.value)} 
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={passenger.email} 
            onChange={(e) => handleInputChange(index, 'email', e.target.value)} 
            required
          />

          <div className="webcam-container">
            <p>Capture your face from different angles:</p>
            {passenger.image ? (
              <img src={passenger.image} alt="Captured" className="webcam-preview" />
            ) : (
              <div className="webcam-preview">No Image</div>
            )}
            <button onClick={() => setWebcamOpen(index)}>WEBCAM</button>
          </div>

          {webcamOpen === index && (
            <div>
              <Webcam ref={webcamRef} screenshotFormat="image/png" />
              <button onClick={() => captureImage(index)}>Capture</button>
            </div>
          )}
        </div>
      ))}

      <div className="passenger-buttons">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        

      </div>
    </div>
    </div>
  );
};

export default PassengerDetails;
