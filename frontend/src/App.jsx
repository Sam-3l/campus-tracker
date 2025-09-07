import React from "react";
import Layout from "./components/Layout";
import MapView from "./components/MapView";
import DeviceList from "./components/DeviceList";

export default function App() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">12</h2>
          <p className="text-gray-500">Devices Online</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">3</h2>
          <p className="text-gray-500">Offline</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">45</h2>
          <p className="text-gray-500">Total Devices</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white shadow rounded-xl p-4">
          <MapView />
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <DeviceList />
        </div>
      </div>
    </Layout>
  );
}
