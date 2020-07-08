import React, { useEffect, useState } from 'react';
import {
  Map,
  TileLayer,
  Popup,
  Marker,
  Rectangle,
  CircleMarker,
  Polygon
} from 'react-leaflet'
import { getPolygonCenter } from '../../utils/utils.js'

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
        checked={true}
      />

  )
}

const generateDefaultPopupFunction = (necessity) => {
  return (
    <Popup>
      <b>{necessity.name}</b><br/>
      <p><b>Tipo: </b>{necessity.type.name}</p>
      <p><b>Categoría: </b>{necessity.category.name}</p>
      <p><b>Descripción: </b>{necessity.description}</p>
    </Popup>
  )
}


const MapComponent = (props) => {
  const styles = {
    map: {
      height: '60vh',
      width: '100%'
    }
  }

  const [dataObject, setDataObject] = useState(null)
  const [matrixCoord, setMatrixCoord] = useState([])

  const { data, generatePopupFunction, onClickMapHandler } = props;

  useEffect(() => {
    if (data) {
      Promise.resolve(data)
        .then(res => {
          setDataObject(res)
        })
    }
  }, [data])


  const onClickMap = (event) => {
    const { latlng, originalEvent } = event
    setMatrixCoord([])
    const coords = Object.values(latlng)
    const onFlyMarker = { location: { type: 'select', coordinates: coords } }

    if (originalEvent.ctrlKey && matrixCoord.length > 0) {
      if (typeof(matrixCoord[0]) === 'number') {
        const fstCoords = [matrixCoord[0], matrixCoord[1]]
        matrixCoord.splice(0,2)
        matrixCoord.push(fstCoords)
        setMatrixCoord(matrixCoord)
      }
      matrixCoord.push(coords)
      setMatrixCoord(matrixCoord)
      onClickMapHandler(matrixCoord)
    } else {
      setMatrixCoord(coords)
      onClickMapHandler(coords)
    }
    setDataObject([onFlyMarker])
  }


  const calculateCenter = (dataObject) => {
    const data = dataObject ? dataObject[0] : null

    if (data && (data.location.type === 'marker' || data.location.type === 'circle' || data.location.type === 'select')) {
      return data.location.coordinates
    } else if (data) {
      return getPolygonCenter(data.location.coordinates)
    } else {
      return mapCenter
    }
  }


  const center = calculateCenter(dataObject)

  return (
    <Map
      style={styles.map}
      center={center}
      zoom={12}
      id="mapid"
      tap={true}
      animate={true}
      onClick={onClickMap}
    >
        {settingLayerMap(dataObject)}
        { dataObject ?
          dataObject.map(
            data => {
              const { location } = data

              return  location.type === 'marker' ?
                <Marker position={location.coordinates}>
                  {generatePopupFunction(data)}
                </Marker> :

                location.type === 'rectangle' ?
                  <Rectangle
                    bounds={location.coordinates}
                    color={location.properties.color}
                  >
                    {generatePopupFunction(data)}
                  </Rectangle> :

                location.type === 'select' ?
                  <Marker
                    draggable={true}
                    position={location.coordinates}
                  /> :

                  location.type === 'circle' ?
                  <CircleMarker
                    center={location.coordinates}
                    color={location.properties.color}
                    radius={location.properties.radius}
                  >
                    {generatePopupFunction(data)}
                  </CircleMarker> :

                  location.type === 'polygon' ?
                    <Polygon
                      positions={location.coordinates}
                      color={location.properties.color}
                    >
                      {generatePopupFunction(data)}
                    </Polygon> : null
            }
          ) : null
        }
    </Map>
    )
}
MapComponent.defaultProps = {
  data: null,
  generatePopupFunction: generateDefaultPopupFunction
}

export default MapComponent;
