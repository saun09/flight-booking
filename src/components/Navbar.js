import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
  return (
    <nav>
      <Link to="/search-flight">Search Flight</Link> 
      <Link to="/passenger-details">Passenger Details</Link>
      <Link to="/seat-selection">Seat Selection</Link>
      <Link to="/boarding-pass">Boarding Pass</Link>
      <Link to="/conclusion">Conclusion</Link>
    </nav>
  );
};

export default Navbar;


