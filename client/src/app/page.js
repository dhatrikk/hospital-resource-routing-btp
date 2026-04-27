"use client";

import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import { useState } from "react";

export default function Home() {
  const [searchData, setSearchData] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [bookingStatus, setBookingStatus] = useState(null); // null, "pending", "confirmed", "failed"
  const [bookingDetails, setBookingDetails] = useState(null);

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-100 to-gray-200">
      
      {/* Sidebar */}
      <div className="w-[28%] p-2">
        <div className="h-full rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/40 p-3 overflow-hidden">
          <Sidebar
            setSearchData={setSearchData}
            hospitals={hospitals}
            setHospitals={setHospitals}
            selectedHospital={selectedHospital}
            setSelectedHospital={setSelectedHospital}
            bookingStatus={bookingStatus}
            setBookingStatus={setBookingStatus}
            bookingDetails={bookingDetails}
            setBookingDetails={setBookingDetails}
          />
        </div>
      </div>

      {/* Map */}
      <div className="w-[72%] p-2 pl-0">
        <div className="h-full rounded-2xl overflow-hidden shadow-xl">
          <MapView 
            searchData={searchData} 
            hospitals={hospitals} 
            selectedHospital={selectedHospital}
            setSelectedHospital={setSelectedHospital}
          />
        </div>
      </div>
    </div>
  );
}