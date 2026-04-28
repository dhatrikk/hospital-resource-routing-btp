"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({ searchData, hospitals, selectedHospital, setSelectedHospital}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  // Initialize map ONLY once
  useEffect(() => {
    if (mapInstance.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.4, 23.2],
      zoom: 10,
    });
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapInstance.current || !searchData) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // User marker
    const userMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([searchData.lng, searchData.lat])
      .addTo(mapInstance.current);

    markersRef.current.push(userMarker);

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([searchData.lng, searchData.lat]);

    // Hospital markers
    hospitals.forEach((h, i) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([h.longitude, h.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<b>${h.name}</b><br/>Available: ${h.available}`
          )
        )
        .addTo(mapInstance.current);

      markersRef.current.push(marker);
      bounds.extend([h.longitude, h.latitude]);
    });

    mapInstance.current.fitBounds(bounds, { padding: 50 });

  }, [searchData, hospitals]);

  useEffect(() => {
    if (!mapInstance.current || selectedHospital === null || !searchData) return;
  
    const h = hospitals[selectedHospital];
  
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${searchData.lng},${searchData.lat};${h.longitude},${h.latitude}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const route = {
          type: "Feature",
          geometry: data.routes[0].geometry,
        };
  
        // 🔥 remove old route
        if (mapInstance.current.getLayer("route")) {
          mapInstance.current.removeLayer("route");
          mapInstance.current.removeSource("route");
        }
  
        // 🔥 add new route
        mapInstance.current.addSource("route", {
          type: "geojson",
          data: route,
        });
  
        mapInstance.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-width": 5,
            "line-color": "#2563eb",
          },
        });
      });
  
  }, [selectedHospital]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
}