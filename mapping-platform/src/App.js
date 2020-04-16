import React from 'react';
import './App.css';
import MapComponent from './components/MapContainer.js'

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-primary bg-primary">
        <h2>Mapping Platform</h2>
      </nav>
      <div className="container-fluid">
        <div className="flex-column">
          <form className="form-inline d-flex justify-content-center">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          <br/>
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
