import React from "react";
import MapView from "./components/MapView";
import DeviceList from "./components/DeviceList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
      <h1 className="my-3">Campus Tracker Dashboard</h1>
      <div className="row">
        <div className="col-md-4"><DeviceList /></div>
        <div className="col-md-8"><MapView /></div>
      </div>
    </div>
  );
}

export default App;