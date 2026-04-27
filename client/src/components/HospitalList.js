export default function HospitalList({
  hospitals,
  selectedHospital,
  setSelectedHospital,
  bookingStatus,
  setBookingStatus,
  bookingDetails,
  setBookingDetails
}) {
  return (
    <div className="space-y-3">
      {hospitals.map((h, index) => {
        const isSelected = selectedHospital === index;

        return (
          <div
            key={index}
            onClick={() => setSelectedHospital(index)}
            className={`p-2 rounded-xl cursor-pointer transition border 
              ${isSelected 
                ? "bg-blue-50 border-blue-400 shadow-lg scale-[1.0]" 
                : "bg-white hover:shadow-md border-gray-100"
              }`}
          >
            <h2 className="font-semibold text-gray-800">
              {index + 1}. {h.name}
            </h2>

            <p className="text-sm text-gray-600">
              Available: <span className="text-green-600">{h.available}</span>
            </p>

            <p className="text-sm text-gray-500">
              Distance: {Math.round(h.distance)} m
            </p>

            {/* Expanded Section */}
            {isSelected && (
              <div className="mt-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition">
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}