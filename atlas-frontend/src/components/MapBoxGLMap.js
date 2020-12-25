import '../Map.css'
import mapboxgl from "mapbox-gl";
import React, { useState, useEffect } from "react";

const MapboxGLMap = ({countries}) => {
    const mapContainer = React.createRef();
  
    useEffect(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamFjb2JrYWdvbiIsImEiOiJja2owZHM4NGUxbTN1MnJtd25pbHh5a2YwIn0.Ipv-6ntDnJw4WUD9ly3gcw";
      
        const map = new mapboxgl.Map({
         container: "map",
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: [5, 46],
          zoom: 2,
        });
  
        map.on("load", () => {
          // setMap(map);
           map.resize();
          map.addLayer(
            {
              id: "country-boundaries",
              source: {
                type: "vector",
                url: "mapbox://mapbox.country-boundaries-v1",
              },
              "source-layer": "country_boundaries",
              type: "fill",
              paint: {
                "fill-color": "#d2361e",
                "fill-opacity": 0.4,
              },
            },
            "country-label"
          );
          map.setFilter("country-boundaries", countries);
        });
  
      
    });
  
  
    return (
    <div>
    {
    <div id="map"></div>
    }
  </div>
    )};
  
  export default MapboxGLMap;
  