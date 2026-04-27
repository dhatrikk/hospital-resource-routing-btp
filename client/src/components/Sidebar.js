import SearchForm from "./SearchForm";
import HospitalList from "./HospitalList";

export default function Sidebar({ setSearchData, hospitals, setHospitals, selectedHospital, setSelectedHospital }) {
  return (
    <div className="flex flex-col h-full">

      {/* Top section (fixed) */}
      <div>
        <h1 className="text-2xl font-bold mb-4">🚑 Hospital Finder</h1>

        <SearchForm
          setSearchData={setSearchData}
          setHospitals={setHospitals}
        />
      </div>

      {/* Scrollable results */}
      <div className="mt-2 flex-1 overflow-y-auto pr-1 space-y-3">
        <HospitalList 
          hospitals={hospitals} 
          selectedHospital={selectedHospital}
          setSelectedHospital={setSelectedHospital}
        />
      </div>

    </div>
  );
}