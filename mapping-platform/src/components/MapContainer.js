import React, { useEffect } from 'react';
import Leaflet from 'leaflet';
import datos from './datos.js';

const accessToken = 'pk.eyJ1IjoibGVvbmFyZG92YXEiLCJhIjoiY2s5MXZ0dGM2MDIyMTNmbWtnem5rZG44bCJ9.j2qDwrJT0mdcjLFq6gjBNQ';
const uri = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
const license = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const generateMap = () => {
  return Leaflet.map('mapid').setView([-34.6131516, -58.3772316], 13);
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

const generateText = hospital => (
  `
    ${hospital.properties.NOMBRE ? `<b>${hospital.properties.NOMBRE}</b>` : ''}<br/>
    ${hospital.properties.TIPO_ESPEC ? `<p><b>Especialidad:</b> ${hospital.properties.TIPO_ESPEC}</p>` : ''}
    ${hospital.properties.DIRECTOR ? `<p><b>Director:</b> ${hospital.properties.DIRECTOR}</p> `: ''}
    ${hospital.properties.TELEFONO ? `<p><b>Teléfono:</b> ${hospital.properties.TELEFONO}</p>` : ''}
    ${hospital.properties.GUARDIA ? `<p><b>Guardia:</b> ${hospital.properties.GUARDIA}</p> `: ''}
    ${hospital.properties.DOM_NORMA ? `<p><b>Dirección:</b> ${hospital.properties.DOM_NORMA}, ${hospital.properties.COD_POSTAL}</p>` : ''}
    ${hospital.properties.FAX ? `<p><b>Fax:</b> ${hospital.properties.FAX}</p>` : ''}
    ${hospital.properties.WEB ? `<p><b>Web:</b> ${hospital.properties.WEB}</p>` : ''}
  `
)

const generateMarksFromData = (data, map) => {
  data.map(
    hospital => {
      return Leaflet.marker(hospital.geometry.coordinates.reverse())
        .addTo(map)
        .bindPopup(generateText(hospital))
    }
  )
}

const MapComponent = () => {
  const styles = {
    map: {
      height: '75vh',
      width: '100%'
    }
  }
  useEffect(() => {
    const map = generateMap();
    settingLayerMap(map);
    generateMarksFromData(datos.features, map)
  })

  return (
    <div style={styles.map} id="mapid"></div>
  );
}

export default MapComponent;
