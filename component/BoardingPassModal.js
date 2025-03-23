import React from "react";
import "./BoardingPassModal.css"; // Add styles for modal
import { QRCodeCanvas } from "qrcode.react"; 



const BoardingPassModal = ({ isOpen, onClose, passenger }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-header">Boarding Pass Issued <br /><span>(Final Approval Pending)</span></h2>

        <div className="boarding-details">
          <p><strong>Passenger:</strong> {passenger.firstName} {passenger.lastName}</p>
          <p><strong>Seat Number:</strong> {passenger.seatNumber || "Not Assigned"}</p>
          <p><strong>Flight:</strong> {passenger.flightNumber || "N/A"}</p>
          <p><strong>Gate:</strong> {passenger.gate || "N/A"}</p>
          <p><strong>Boarding Time:</strong> {passenger.boardingTime || "N/A"}</p>
          <p><strong>PNR:</strong> {passenger.pnr || "N/A"}</p>
        </div>

        <div className="qr-code">
        <QRCodeCanvas value={passenger.qrCodeData || "https://example.com/boarding-pass"} size={100} />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="print-btn" onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default BoardingPassModal;
