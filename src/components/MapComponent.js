import React, { useEffect, useState } from 'react';
import Leaflet from 'leaflet';

const accessToken = process.env.REACT_APP_OSM_API_KEY;
const uri = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const license = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const generateMap = () => {
  return Leaflet.map('mapid').setView([-34.6131516, -58.3772316], 12);
}

const settingLayerMap = map => {
  Leaflet.tileLayer(uri, {
      attribution: license,
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: accessToken
  }).addTo(map);
}

const generateText = hospital => {
  const { name, type, address, addressNumber, phone, website, postalCode } = hospital;

  return (
    `
      ${name ? `<b>${name}</b>` : ''}<br/>
      ${type ? `<p><b>Especialidad:</b> ${type}</p>` : ''}
      ${phone ? `<p><b>Teléfono:</b> ${phone}</p>` : ''}
      ${address ? `<p><b>Dirección:</b> ${address} ${addressNumber}, ${postalCode}</p>` : ''}
      ${website ? `<p><b>Web:</b> ${website}</p>` : ''}
    `
  )
}

const generateMarksFromData = (data, map) => {
  data.map(
    hospital => {
      return Leaflet.marker(hospital.coordinate)
        .addTo(map)
        .bindPopup(generateText(hospital))
    }
  )
}

const MapComponent = (props) => {
  const styles = {
    map: {
      height: '75vh',
      width: '100%'
    }
  }

  const [map, setMap] = useState(null);

  const { data } = props;

  useEffect(() => {
    if (!map) {
      const mapa = generateMap();
      setMap(mapa);
      settingLayerMap(mapa);
    }
  }, [map])

  useEffect(() => {
    if (data) {
      generateMarksFromData(data, map)
    }
  }, [data, map])

  return (
    <div style={styles.map} id="mapid"></div>
  );
}

MapComponent.defaultProps = {
  data: null
}

export default MapComponent;
