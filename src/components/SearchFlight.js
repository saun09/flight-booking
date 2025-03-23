/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchFlight = () => {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    time: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (formData.destination && formData.date && formData.time) {
      navigate('/passenger-details');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div>
      <h1>Search Flight</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchFlight; */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchFlight.css"; 

const airports = [
  { code: "DEL", name: "New Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "HYD", name: "Hyderabad" },
  { code: "BLR", name: "Bengaluru" },
  { code: "MAA", name: "Chennai" },
  { code: "CCU", name: "Kolkata" },
];

const flights = [
  { from: "DEL", to: "BOM", name: "SpiceJet", number: "SG-101", time: "20:08", duration: "2hr 15min", arrival: "22:08", price: 7350, logo: "/logos/spicejet.png" },
  { from: "DEL", to: "BOM", name: "IndiGo", number: "6E-245", time: "21:08", duration: "2hr 15min", arrival: "23:08", price: 7650, logo: "/logos/indigo.png" },
  { from: "DEL", to: "BOM", name: "Akasa Air", number: "QP-432", time: "14:08", duration: "2hr 15min", arrival: "16:08", price: 8180, logo: "/logos/akasa.png" },
  { from: "DEL", to: "BOM", name: "Vistara", number: "UK-786", time: "17:08", duration: "2hr 15min", arrival: "19:08", price: 8350, logo: "/logos/vistara.png" },
  { from: "BLR", to: "HYD", name: "Air India", number: "AI-302", time: "15:30", duration: "1hr 40min", arrival: "17:10", price: 5900, logo: "/logos/airindia.png" },
];

const SearchFlight = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [availableFlights, setAvailableFlights] = useState([]);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const swapLocations = () => {
    setFormData({ ...formData, from: formData.to, to: formData.from });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.from && formData.to && formData.date) {
      const matchedFlights = flights.filter(
        (flight) => flight.from === formData.from && flight.to === formData.to
      );
      setAvailableFlights(matchedFlights);
    } else {
      alert("Please fill in all fields");
    }
  };
  
  
  const handleSelectFlight = (flight) => {
    navigate("/passenger-details", { state: { flight, formData } }); // 👈 Pass flight & form data
  };

  return (
    <div className="search-flight-container">
      <h1>Search Flight</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <select name="from" value={formData.from} onChange={handleChange} className="dropdown">
            <option value="">From</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
          
          <button type="button" onClick={swapLocations} className="swap-button">⇆</button>
          
          <select name="to" value={formData.to} onChange={handleChange} className="dropdown">
            <option value="">To</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.name}
              </option>
            ))}
          </select>
        </div>
        
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="date-picker" />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {availableFlights.length > 0 && (
        <div className="flights-container">
          <h2 className= "searchTitle"> Available Flights</h2>
          {availableFlights.map((flight, index) => (
            <div key={index} className="flight-card">
              <img src={flight.logo} alt={flight.name} className="airline-logo" />
              <div className="flight-info">
                <strong>{flight.name}</strong> {flight.from} ---- ({flight.duration}) ---- {flight.to} ₹{flight.price}
              </div>
              <button className="select-button" onClick={() => handleSelectFlight(flight)}>
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFlight;
