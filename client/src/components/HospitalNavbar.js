"use client";

export default function HospitalNavbar() {
  const hospitalName =
    typeof window !== "undefined"
      ? localStorage.getItem("hospitalName")
      : "";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/hospital/login";
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="font-semibold text-lg">
        {hospitalName || "Hospital"}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}