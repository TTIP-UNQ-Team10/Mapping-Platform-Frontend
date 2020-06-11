import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup, Polygon, Circle, Rectangle } from 'react-leaflet'

const accessToken = process.env.REACT_APP_OSM_API_KEY;
const uri = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const license = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapCenter = [-34.6131516, -58.3772316]

const settingLayerMap = (dataObject) => {
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

const generateDefaultPopupFunction = () => {
  return (
    <Popup>
      <b>Título</b><br/>
      <p><b>item:</b>1</p>
      <p><b>item::</b>2</p>
      <p><b>item:</b>3</p>
      <p><b>item:</b>4</p>
    </Popup>
  )
}

const generateMapping = (data, generatePopupFunction, key) => {
  switch (data.location.type) {
    case "marker":
      return (<Marker key={key} position={data.location.coordinates}>
              {generatePopupFunction(data)}
            </Marker>)
    case "polygon":
      return (<Polygon key={key} positions={data.location.coordinates}>
              {generatePopupFunction(data)}
            </Polygon>)
    case "circle":
      return (<Circle 
              key={key}
              center={data.location.coordinates} 
              fillColor={data.location.properties.fillColor}
              radius={data.location.properties.radius}
            >
              {generatePopupFunction(data)}
            </Circle>)
    case "rectangle":
      return (<Rectangle key={key} bounds={data.location.coordinates} color={data.location.properties.color}>
              {generatePopupFunction(data)}
            </Rectangle>)
    default:
      return null
  }
}


const MapComponent = (props) => {
  const styles = {
    map: {
      height: '60vh',
      width: '60%'
    }
  }

  const [dataObject, setDataObject] = useState(null)

  const { data, generatePopupFunction } = props;

  useEffect(() => {
    if (data) {
      Promise.resolve(data)
        .then(res => {
          setDataObject(res)
        })
    }
  }, [data])

  return (
    <Map center={mapCenter} zoom={12} id="mapid" style={styles.map}>
        {settingLayerMap(dataObject)}
        { dataObject ?
          dataObject.map(
            (data, i) => generateMapping(data, generatePopupFunction, i)) : null
        }
    </Map>
    )
}
MapComponent.defaultProps = {
  data: null,
  generatePopupFunction: generateDefaultPopupFunction
}

export default MapComponent;
