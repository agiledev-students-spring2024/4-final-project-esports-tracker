import "./Discover.css"
import TabSwitcher from "../Feed/TabSwitcher"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css"

const Discover = () => {
  // sample markers set by user
  const markers = [
    {
      geocode: [40.7309, -73.9965],
      popUp: "childrens park",
    },
    {
      geocode: [40.73075, -73.9985],
      popUp: "dog park",
    },
    {
      geocode: [40.7304, -73.9976],
      popUp: "dog park",
    },
  ]

  const customIcon = new Icon({
    iconUrl: require("./pin.png"),
    iconSize: [36, 36],
  })

  return (
    <>
      <div className="discover">
        <TabSwitcher
          firstTab={{ name: "Feed", path: "/feed" }}
          secondTab={{ name: "Discover", path: "/discover" }}
        />
        <MapContainer center={[40.7308, -73.9975]} zoom={16.5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, i) => (
            <Marker position={marker.geocode} icon={customIcon} key={i}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export default Discover
