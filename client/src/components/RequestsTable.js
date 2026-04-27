"use client";

import { useState } from "react";

export default function RequestsTable({ requests }) {
  const [data, setData] = useState(requests);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null); // "accept" | "reject"
  const [docName, setDocName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [reason, setReason] = useState("");

  const openModal = (index, type) => {
    setSelected(index);
    setMode(type);
  };

  const handleAccept = () => {
    const updated = [...data];
    updated[selected] = {
      ...updated[selected],
      docName,
      roomNo,
      status: "Accepted",
    };
    setData(updated);
    closeModal();
  };

  const handleReject = () => {
    const updated = [...data];
    updated[selected] = {
      ...updated[selected],
      status: "Rejected",
      reason,
    };
    setData(updated);
    closeModal();
  };

  const closeModal = () => {
    setSelected(null);
    setMode(null);
    setDocName("");
    setRoomNo("");
    setReason("");
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-white/30 overflow-hidden">

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="p-3">S.No</th>
            <th className="p-3">Patient Type</th>
            <th className="p-3">Doctor</th>
            <th className="p-3">Room</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r, i) => (
            <tr
              key={i}
              className="border-t hover:bg-blue-50 transition"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{r.service}</td>
              <td className="p-3">{r.docName || "-"}</td>
              <td className="p-3">{r.roomNo || "-"}</td>

              <td className="p-3 flex gap-2">
                {r.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => openModal(i, "accept")}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => openModal(i, "reject")}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      r.status === "Accepted"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {r.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {mode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[300px] shadow-xl">

            {mode === "accept" ? (
              <>
                <h2 className="font-semibold mb-3">Assign Details</h2>

                <input
                  placeholder="Doctor Name"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />

                <input
                  placeholder="Room No"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                />

                <button
                  onClick={handleAccept}
                  className="w-full bg-green-600 text-white p-2 rounded"
                >
                  Confirm
                </button>
              </>
            ) : (
              <>
                <h2 className="font-semibold mb-3">Reason for Rejection</h2>

                <input
                  placeholder="Enter reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                />

                <button
                  onClick={handleReject}
                  className="w-full bg-red-600 text-white p-2 rounded"
                >
                  Submit
                </button>
              </>
            )}

            <button
              onClick={closeModal}
              className="mt-3 text-sm text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}