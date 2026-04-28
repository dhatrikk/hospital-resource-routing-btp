"use client";

import { addRequest, getRequests } from "../../store";
import { useState, useEffect } from "react";

export default function HospitalList({
  hospitals,
  setSelectedHospital,
  selectedHospital,
}) {
  const [bookedIndex, setBookedIndex] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("Pending");
  const [bookingDetails, setBookingDetails] = useState(null);

  // Poll for updates
  useEffect(() => {
    if (bookedIndex === null) return;

    const interval = setInterval(() => {
      const data = getRequests();
      const myRequest = data.filter(
        (r) => r.hospitalName === hospitals[bookedIndex]?.name
      )[0];
      console.log("Polling:", myRequest);
      if (!myRequest) return;

      // update details
      setBookingDetails(myRequest);

      if (myRequest.status !== "bookingStatus") {
        setBookingStatus(myRequest.status);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [bookedIndex, hospitals]);

  // Booking
  const handleBook = (hospital, index) => {
    const time = new Date().toLocaleTimeString();

    addRequest({
      hospitalName: hospital.name,
      service: "Beds",
      requestTime: time,
      responseTime: "",
      status: "Pending",
      docName: "",
      roomNo: "",
      reason: "",
    });

    setBookedIndex(index);
    setBookingStatus("Pending");
    setBookingDetails(null);
  };

  return (
    <div className="space-y-3">
      {hospitals.map((h, index) => {
        // show only selected after booking
        if (bookedIndex !== null && bookedIndex !== index) return null;

        const isBooked = bookedIndex === index;

        return (
          <div
            key={index}
            onClick={() => setSelectedHospital(index)}
            className={`p-4 rounded-xl border transition ${
              isBooked
                ? "bg-yellow-50 border-yellow-400 shadow-md"
                : "bg-white border-gray-100"
            }`}
          >
            <h2 className="font-semibold">{h.name}</h2>

            {/* BEFORE BOOK */}
            {!isBooked && (
              <>
                <p>Available: {h.available}</p>
                <p>Distance: {Math.round(h.distance)} m</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 prevents map click conflict
                    handleBook(h, index);
                  }}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded"
                >
                  Book Appointment
                </button>
              </>
            )}

            {/* AFTER BOOK */}
            {isBooked && (
              <div className="mt-2 text-yellow-700">
                <p className="font-semibold">
                  {bookingStatus === "Accepted"
                    ? "✅ Accepted"
                    : bookingStatus === "Rejected"
                    ? "❌ Rejected"
                    : "⏳ Waiting for Confirmation..."}
                </p>

                <p className="text-sm">Service: Beds</p>
                <p className="text-sm">
                  Requested at: {bookingDetails?.requestTime}
                </p>

                {bookingStatus === "Accepted" && (
                  <>
                    <p className="text-sm">
                      Doctor: {bookingDetails?.docName}
                    </p>
                    <p className="text-sm">
                      Room: {bookingDetails?.roomNo}
                    </p>
                    <p className="text-sm text-gray-500">
                      Response: {bookingDetails?.responseTime}
                    </p>
                  </>
                )}

                {bookingStatus === "Rejected" && (
                  <>
                    <p className="text-sm">
                      Reason: {bookingDetails?.reason}
                    </p>
                    <p className="text-sm text-gray-500">
                      Response: {bookingDetails?.responseTime}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}