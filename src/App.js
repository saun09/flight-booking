/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchFlight from './components/SearchFlight';
import PassengerDetails from './components/PassengerDetails';
import SeatSelection from './components/SelectSeat';
import BoardingPass from './components/BoardingPass';
import Conclusion from './components/Conclusion';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/search-flight" element={<SearchFlight />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/boarding-pass" element={<BoardingPass />} />
        <Route path="/conclusion" element={<Conclusion />} />
        
      </Routes>
    </Router>
  );
}

export default App;