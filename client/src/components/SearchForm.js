"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchNearestHospitals } from "../services/api";

export default function SearchForm({ setSearchData, setHospitals }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced autocomplete
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query) return;

      fetchSuggestions(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchSuggestions = async (text) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );

      setSuggestions(res.data.features);
    } catch (err) {
      console.error(err);
    }
  };

  // When user selects suggestion
  const handleSelect = async (place) => {
    const [lng, lat] = place.center;

    setQuery(place.place_name);
    setSuggestions([]);

    await handleSearch(lat, lng);
  };

  // Live location
  const handleLiveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setQuery("Current Location");
        setSuggestions([]);

        await handleSearch(lat, lng);
      },
      () => alert("Location permission denied")
    );
  };

  // Search handler
  const handleSearch = async (lat, lng) => {
    setLoading(true);
    try {
      setSearchData({ lat, lng, service });
      // const data = await fetchNearestHospitals(lat, lng, service);
      // setHospitals(data);
      setHospitals(getDummyHospitals(lat, lng));
    } catch (err) {
      console.error(err);
      alert("Error fetching hospitals");
    } finally {
      setLoading(false);
    }

    console.log("Searched for:", { lat, lng, service });
  };

  return (
    <div ref={containerRef} className="mb-4 relative">
      {/* Input */}
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute bg-white w-full border rounded mt-1 shadow z-10">
          {/* Live Location Option */}
          <div
            onClick={handleLiveLocation}
            className="p-2 hover:bg-gray-100 cursor-pointer font-medium"
          >
            📍 Live Location
          </div>

          {/* Suggestions */}
          {suggestions.map((place) => (
            <div
              key={place.id}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {place.place_name}
            </div>
          ))}
        </div>
      )}

      {/* Service */}
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full p-3 text-md rounded-xl border border-gray-200 mt-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="" disabled>
          Select Service
        </option>
        <option value="beds">Beds</option>
        <option value="icu">ICU Beds</option>
        <option value="cardiologist">Cardiologist</option>
        <option value="stroke">Stroke</option>
        <option value="ot">Operation Theater</option>
      </select>

      {/* Manual Search Button (fallback) */}
      <button
        disabled={loading}
        className="w-full mt-3 bg-linear-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
      >
        {loading ? "Searching..." : "Find Nearest"}
      </button>
    </div>
  );
}

const getDummyHospitals = (lat, lng) => {
  return [
    {
      name: "City Hospital",
      latitude: lat + 0.01,
      longitude: lng + 0.01,
      available: 12,
      distance: 500,
    },
    {
      name: "Apollo Care",
      latitude: lat - 0.008,
      longitude: lng + 0.012,
      available: 8,
      distance: 900,
    },
    {
      name: "Medico Center",
      latitude: lat + 0.015,
      longitude: lng - 0.01,
      available: 5,
      distance: 1300,
    },
  ];
};