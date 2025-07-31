"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  MapContainerProps,
  MarkerProps,
  TileLayerProps,
} from "react-leaflet";
import type { Map as LeafletMap, Marker as LeafletMarker, LeafletEvent, LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
if (typeof window !== "undefined" && L) {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

interface MapsPickerProps {
  value?: { lat: number; lng: number };
  onChange?: (loc: { lat: number; lng: number; city?: string; district?: string; address?: string }) => void;
  className?: string;
}

export function MapsPicker({ value, onChange, className }: MapsPickerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number }>(value || { lat: -6.3, lng: 106.8 });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  // Update parent on position change
  useEffect(() => {
    if (onChange) {
      onChange({ lat: position.lat, lng: position.lng, city, district, address: selectedAddress });
    }
    // eslint-disable-next-line
  }, [position, city, district, selectedAddress]);

  // Reverse geocode on marker move
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&zoom=18&addressdetails=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSelectedAddress(data.display_name || "");
        setCity(
          data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            ""
        );
        setDistrict(
          data.address?.suburb ||
            data.address?.district ||
            data.address?.state_district ||
            ""
        );
        setLoading(false);
      });
  }, [position]);

  // Search address
  const handleSearch = async (q: string) => {
    setSearch(q);
    if (q.length < 3) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        q
      )}&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSearchResults(data);
    setLoading(false);
  };

  // Select search result
  const handleSelectResult = (result: any) => {
    setPosition({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) });
    setSearch(result.display_name); // diubah agar input langsung terisi alamat yang dipilih
    setSearchResults([]);
    setSelectedAddress(result.display_name);
    setCity(
      result.address?.city ||
        result.address?.town ||
        result.address?.village ||
        result.address?.county ||
        ""
    );
    setDistrict(
      result.address?.suburb ||
        result.address?.district ||
        result.address?.state_district ||
        ""
    );
    if (mapRef.current) {
      mapRef.current.setView([parseFloat(result.lat), parseFloat(result.lon)], 16);
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200); // agar map resize setelah render
    }
  };

  // Marker drag event
  function DraggableMarker() {
    return (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e: LeafletEvent) => {
            const marker = e.target as LeafletMarker;
            const pos = marker.getLatLng();
            setPosition({ lat: pos.lat, lng: pos.lng });
          },
        }}
      />
    );
  }

  return (
    <div className={`w-full ${className || ""}`}> 
      <div className="mb-2 relative">
        <input
          type="text"
          className="w-full border-2 border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-600 text-base"
          placeholder="Cari alamat atau lokasi..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 z-[9999] bg-white border border-green-200 rounded-lg shadow-lg mt-1 w-full max-h-56 overflow-y-auto">
            {searchResults.map((result, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm"
                onClick={() => handleSelectResult(result)}
              >
                {result.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="rounded-2xl overflow-hidden border-2 border-green-300 shadow-lg"
        style={{ height: 320 }}
      >
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: 320, width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
        </MapContainer>
      </div>
      <div className="mt-3 text-sm text-green-800 font-medium">
        {loading ? (
          <span>Memuat alamat...</span>
        ) : selectedAddress ? (
          <>
            <span className="block">Alamat: {selectedAddress}</span>
            <span className="block">
              Kota/Area: <b>{city}</b>{" "}
              {district && <span className="ml-1">({district})</span>}
            </span>
          </>
        ) : (
          <span>Pilih lokasi pada peta atau cari alamat di atas.</span>
        )}
      </div>
    </div>
  );
}

export default MapsPicker;