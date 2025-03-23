/* import React, { useState } from 'react';
import './SelectSeat.css';

const seatRows = 6;
const seatCols = ['A', 'B', 'C', 'D', 'E', 'F'];

const SelectSeat = ({ onNext, onPrevious }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = ['2B', '3D', '4A']; // Example occupied seats

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    let updatedSeats = [...selectedSeats];

    if (updatedSeats.includes(seat)) {
      updatedSeats = updatedSeats.filter((s) => s !== seat);
    } else if (updatedSeats.length < 2) {
      updatedSeats.push(seat);
    }

    setSelectedSeats(updatedSeats);
  };

  return (
    <div className="seat-container">
      <h2>Select 2 Seats</h2>
      
      <div className="airplane">
        {Array.from({ length: seatRows }, (_, row) => (
          <div key={row} className="seat-row">
            {seatCols.map((col) => {
              const seat = `${row + 1}${col}`;
              const isSelected = selectedSeats.includes(seat);
              const isOccupied = occupiedSeats.includes(seat);

              return (
                <div 
                  key={seat} 
                  className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="seat-buttons">
        <button onClick={onPrevious}>Previous</button>
        <button onClick={() => onNext(selectedSeats)} disabled={selectedSeats.length < 2}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectSeat;
 */
import React, { useState, useEffect } from "react";
import "./SelectSeat.css";
import { useNavigate, useLocation } from "react-router-dom";


const seatRows = 14;
const seatCols = ["A", "B", "C", "D", "E", "F"];

const SelectSeat = ({ onNext, onPrevious }) => {
  
const location = useLocation();
const passengers = location.state?.passengers || []; // ✅ Ensure passengers exist

/* const [seatNumbers, setSeatNumbers] = useState(
  new Array(passengers.length).fill("")
); */
  const [selectedSeats, setSelectedSeats] = useState([]);
  const occupiedSeats = ["5D", "6E", "10F"]; // Example occupied seats
  const navigate = useNavigate();

const [seatNumbers, setSeatNumbers] = useState(location.state?.seat || []);
    
  
  /* const handleNext = () => {
  // Show success notification
  alert("🎉 Ticket booking successful!");

  // Redirect to the Boarding Pass Page
  navigate("/boarding-pass");
}; */

/* const handleNext = () => {
  const updatedPassengers = passengers.map((p, index) => ({
    ...p,
    seatNumber: seatNumbers[index],
  }));

  navigate("/boarding-pass", { state: { passengers: updatedPassengers } });
}; */

/* const handleNext = () => {
  const updatedPassengers = passengers.map((passenger, index) => ({
    ...passenger,
    seatNumber: seatNumbers[index] || "Not Assigned",
  }));

  navigate("/boarding-pass", { state: { passengers: updatedPassengers } }); // ✅ Pass seat numbers
}; */


/* const handleNext = () => {
  const updatedPassengers = passengers.map((passenger, index) => ({
    ...passenger,
    seatNumber: seatNumbers[index] || "Not Assigned",
  }));

  console.log(updatedPassengers); // ✅ Debug: Check if seat numbers are correctly set

  navigate("/boarding-pass", { state: { passengers: updatedPassengers } }); // ✅ Pass seat numbers
}; */

const handleNext = () => {
  console.log("Before updating passengers:", seatNumbers);

  const updatedPassengers = passengers.map((passenger, index) => ({
    ...passenger,
    seatNumber: seatNumbers[index] || "Not Assigned",
  }));

  console.log("Updated passengers with seats:", updatedPassengers);

  navigate("/boarding-pass", { state: { passengers: updatedPassengers } });
};


/* const handleSeatChange = (index, seat) => {
  setSeatNumbers((prevSeats) => {
    const updatedSeats = [...prevSeats];
    updatedSeats[index] = seat;
    return updatedSeats;
  });

  console.log("Updated Seats:", seatNumbers); // ✅ Debug: Check seat updates
};
 */


/* const handleSeatChange = (index, seat) => {
  setSeatNumbers((prevSeats) => {
    const updatedSeats = [...prevSeats];
    updatedSeats[index] = seat;
    console.log("Updated seatNumbers:", updatedSeats); // ✅ Debugging log
    return updatedSeats;
  });
};
 */
const handleSeatChange = (index, seat) => {
  setSeatNumbers((prevSeats) => {
    const updatedSeats = [...prevSeats];
    updatedSeats[index] = seat;
    console.log("Updated seatNumbers:", updatedSeats); // ✅ Debugging log
    return updatedSeats;
  });
};

useEffect(() => {
  console.log("seatNumbers updated:", seatNumbers);
}, [seatNumbers]);

/* 
  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;

    let updatedSeats = [...selectedSeats];
    if (updatedSeats.includes(seat)) {
      updatedSeats = updatedSeats.filter((s) => s !== seat);
    } else if (updatedSeats.length < 2) {
      updatedSeats.push(seat);
    }
    setSelectedSeats(updatedSeats);
  }; */
  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;
  
    setSelectedSeats((prevSelectedSeats) => {
      let updatedSeats = [...prevSelectedSeats];
  
      if (updatedSeats.includes(seat)) {
        updatedSeats = updatedSeats.filter((s) => s !== seat);
      } else if (updatedSeats.length < passengers.length) {
        updatedSeats.push(seat);
      }
  
      // Ensure seatNumbers updates properly
      setSeatNumbers(updatedSeats); 
  
      return updatedSeats;
    });
  };
  
  return (
    <div className="seat-container">
      <div className="airplane">
        <div className="airplane-body">
          {Array.from({ length: seatRows }, (_, row) => (
            <div key={row} className="seat-row">
              {seatCols.map((col) => {
                const seat = `${row + 1}${col}`;
                const isSelected = selectedSeats.includes(seat);
                const isOccupied = occupiedSeats.includes(seat);

                return (
                  <div
                    key={seat}
                    className={`seat ${isSelected ? "selected" : ""} ${isOccupied ? "occupied" : ""}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="seat-buttons">
        <button className="nav-button" onClick={onPrevious}>Previous</button>
        <button className="nav-button" onClick={() => handleNext(selectedSeats)} disabled={selectedSeats.length < 2}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectSeat;