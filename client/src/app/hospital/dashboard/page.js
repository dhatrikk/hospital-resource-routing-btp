"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import HospitalNavbar from "../../../components/HospitalNavbar";
import RequestsTable from "../../../components/RequestsTable";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  // useEffect(() => {
  //   const fetchRequests = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       window.location.href = "/hospital/login";
  //       return;
  //     }

  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/hospital/requests`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setRequests(res.data);
  //     } catch {
  //       alert("Session expired");
  //     }
  //   };

  //   fetchRequests();
  // }, []);

	useEffect(() => {
		const dummyData = [
			{ patientName: "Rahul1", service: "Beds", status: "Pending" },
			{ patientName: "Amit2", service: "ICU", status: "Pending" },
			{ patientName: "Neha3", service: "Cardiologist", status: "Pending" },
		];
	
		setRequests(dummyData);
	}, []);

  return (
    <div className="h-screen bg-gray-100">
      <HospitalNavbar />

      <div className="p-6">
        <RequestsTable requests={requests} />
      </div>
    </div>
  );
}