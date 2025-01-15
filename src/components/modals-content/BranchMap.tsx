import React, { useEffect } from "react";
// import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IBranch } from "../../types/branch.type";
import "leaflet/dist/leaflet.css";

interface BranchMapProps {
  branch: IBranch;
}

const BranchMap: React.FC<BranchMapProps> = ({ branch }) => {
  useEffect(() => {
    // Fix for default icon issue in Leaflet
    // L.Icon.Default.mergeOptions({
    //   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    //   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    //   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    // });
  }, []);
  if (branch.latitude === undefined || branch.longitude === undefined) {
    return <div>Invalid location data</div>;
  }

  return (
    <MapContainer
      center={[branch.latitude, branch.longitude]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", paddingTop: "10px", paddingBottom: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[branch.latitude, branch.longitude]}>
        <Popup>
          <strong>{branch.name}</strong>
          <br />
          {branch.address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default BranchMap;
