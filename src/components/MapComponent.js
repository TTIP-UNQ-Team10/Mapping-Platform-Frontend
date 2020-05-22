import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const accessToken = process.env.REACT_APP_OSM_API_KEY;
const uri = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const license = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [-34.6131516, -58.3772316]

const settingLayerMap = (hospitalData) => {
  return (
      <TileLayer
        id={'mapbox/streets-v11'}
        url={uri}
        attribution={license}
        accessToken={accessToken}
        tileSize={512}
        maxZoom={18}
        zoomOffset={-1}
      />

  )
}

const generateText = hospital => {
  const { name, type, address, addressNumber, phone, website, postalCode } = hospital
  return (
    <Popup>
      <b>{name ? name: ''}</b><br/>
      {type ? <p><b>Especialidad:</b> {type}</p> : ''}
      {phone ? <p><b>Teléfono:</b> {phone}</p> : ''}
      {address ? <p><b>Dirección:</b> {address} {addressNumber}, {postalCode}</p> : ''}
      {website ? <p><b>Web:</b> {website}</p> : ''}
    </Popup>
  )
}

const MapComponent = (props) => {
  const styles = {
    map: {
      height: '60vh',
      width: '60%'
    }
  }

  const [hospitalData, setHospitalData] = useState(null)

  const { data } = props;

  useEffect(() => {
    if (data) {
      Promise.resolve(data)
        .then(res => {
          setHospitalData(res)
        })
    }
  }, [data])

  return (
    <Map center={mapCenter} zoom={12} id="mapid" style={styles.map}>
        {settingLayerMap(hospitalData)}
        { hospitalData ?
          hospitalData.map(
            hospital => {
              return (
                <Marker position={hospital.coordinate}>
                  {generateText(hospital)}
                </Marker>
              )
            }
          ) : null
        }
    </Map>
    )
}
MapComponent.defaultProps = {
  data: null
}

export default MapComponent;
