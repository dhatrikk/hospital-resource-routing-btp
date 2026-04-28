"use client";

import { useEffect, useState } from "react";
import HospitalNavbar from "../../../components/HospitalNavbar";
import RequestsTable from "../../../components/RequestsTable";
import {getRequests} from "../../../../store";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getRequests());
  },[]);

  return (
    <div className="h-screen bg-gray-100">
      <HospitalNavbar />

      <div className="p-6">
        <RequestsTable requests={requests} />
      </div>
    </div>
  );
}