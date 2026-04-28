import { getRequests } from "../../store";
import { useEffect, useState } from "react";

export default function UserRequests() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(getRequests());
  }, []);
  return (
    <div className="mt-4 space-y-2 overflow-y-auto">
      {data.map((r, i) => (
        <div
          key={i}
          className="p-3 rounded-xl bg-linear-to-r from-yellow-50 to-yellow-100 border border-yellow-300 shadow-sm"
        >
          <p className="font-semibold">{r.hospitalName}</p>
          <p className="text-sm">
            Status: <span className="font-medium">{r.status}</span>
          </p>
        </div>
      ))}
    </div>
  );
}