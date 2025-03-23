
import React, { useState, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./BoardingPass.css";
import BoardingPassModal from "./BoardingPassModal"; 


const BoardingPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passengers = location.state?.passengers || []; // ✅ Passengers with seat numbers
  

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
const [matchResult, setMatchResult] = useState(null);


  // ------------- Added state for modal visibility and selected passenger
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    // ------------- Function to handle opening modal with passenger details
    const handleBoardingPassClick = (passenger) => {
      setSelectedPassenger(passenger);
      setIsModalOpen(true);
    };
  
  // ------------- New state variables for check-in and verification -------------
  const [checkInStarted, setCheckInStarted] = useState(false);
  const [verificationStarted, setVerificationStarted] = useState(false);
  
   // ------------- Function to handle Check-In process -------------
   const handleCheckIn = () => {
    setCheckInStarted(true);
    console.log("Check-in started:", checkInStarted);

  };

    // ------------- Function to start camera -------------
    const startCamera = async () => {
      setCameraOpen(true);
      setMatchResult(null);
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        alert("Error accessing the camera. Please check permissions.");
      }
    };
  
    // ------------- Function to capture image and "match" face -------------
    const captureAndVerifyFace = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
  
        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Simulating AI face recognition (Random match or not)
        const isMatch = Math.random() > 0.5; // 50% chance of match
        setMatchResult(isMatch ? "✅ Matched Faces" : "❌ Face Not Recognized");
  
        // Stop camera stream
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setCameraOpen(false);
      }
    };



    // ------------- Function to handle passenger verification -------------
    const handleVerifyPassenger = () => {
      setVerificationStarted(true);
      alert("Camera opened for Face Recognition. Please stand in front of the camera.");
      
      // Simulating AI detection process
      setTimeout(() => {
        alert("Boarding pass approved! Now, repeat for your friend.");
        setVerificationStarted(false);
      }, 3000); // Simulating AI verification time
    };
  /* return (
    <div className="boarding-pass-page">
      <h2>Collect Your Boarding Pass</h2>

      <div className="passenger-list">
        {passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <div key={index} className="passenger-card">
              <p>{passenger.firstName} {passenger.lastName}</p>
              <p>Seat: {passenger.seatNumber || "Not Assigned"}</p>
              <button className="boarding-btn">Boarding Pass</button>
            </div>
          ))
        ) : (
          <p>No passengers found.</p>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={() => navigate("/seat-selection")}>Previous</button>
        <button onClick={() => alert("Check-in successful!")}>Check In</button>
      </div>
    </div>
  ); */

  return (
    <div className="boarding-pass-page">
      <h2 className="boarding-pass-title">Collect Your Boarding Pass</h2>


      <div className="passenger-list">
        {passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <div key={index} className="passenger-card">
              <p>{passenger.firstName} {passenger.lastName}</p>
              <p>Seat: {passenger.seatNumber || "Not Assigned"}</p>
              
              {/* ------------- Updated button to open modal */}
              {/* <button className="boarding-btn" onClick={() => handleBoardingPassClick(passenger)}>
                Boarding Pass
              </button> */}
               <button className="boarding-btn" onClick={() => handleBoardingPassClick(passenger)}>
                Boarding Pass
              </button>

              {!cameraOpen && (
                <button className="verify-btn" onClick={() => startCamera()}>
                  Verify Passenger
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No passengers found.</p>
        )}
      </div>
     <div className="navigation-buttons">
        <button onClick={() => navigate("/seat-selection")}>Previous</button>
   <button onClick={() => navigate("/conclusion")}>Next</button>



       {/*  {!checkInStarted ? (
          <button onClick={handleCheckIn}>Check In</button>
        ) : (
          <>
            {!cameraOpen && checkInStarted && (
              <button onClick={startCamera}>Verify Passenger</button>
            )}
          </>
        )} */}
      </div>

      

      {/* ------------- Camera and Face Matching UI ------------- */}
      {cameraOpen && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay className="camera-feed"></video>
          <button onClick={captureAndVerifyFace}>Capture & Verify</button>
        </div>
      )}

      {/* ------------- Display Match Result ------------- */}
      {matchResult && <p className="match-result">{matchResult}</p>}

      {/* ------------- Hidden Canvas for Capturing Image ------------- */}
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>

      {isModalOpen && selectedPassenger && (
        <BoardingPassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          passenger={selectedPassenger}
        />
      )}
    </div>
  );
};

export default BoardingPass;
