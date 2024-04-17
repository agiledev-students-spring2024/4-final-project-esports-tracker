import { useState, useEffect } from "react"
import "./Discover.css"
import TabSwitcher from "../Feed/TabSwitcher"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css"
import welcomeImage from './welcome.png';

const Discover = () => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        // TODO: retrieve data based on the user's id 
        const response = await fetch("http://localhost:3001/discover/1")
        if (!response.ok) {
          throw new Error("Failed to fetch markers")
        }
        const data = await response.json()
        setMarkers(data)
      } catch (error) {
        console.error("Error fetching markers:", error)
      }
    }
    fetchData()
  }, [])

  const customIcon = new Icon({
    iconUrl: require("./pin.png"),
    iconSize: [36, 36],
  })

  return (
    <>
       <div className="top_header">
      <div className='header'>
      <img src={welcomeImage} alt="Welcome" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', margin: 'auto 0', position: 'absolute', position: 'absolute',  top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
    </div>
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

      <h2 className="discoverPets">Discover other pets nearby!</h2>

 

    </>
  )
}

export default Discover
