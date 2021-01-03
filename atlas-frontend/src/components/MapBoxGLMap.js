import '../Map.css'
import mapboxgl from "mapbox-gl";
import React, { useState, useEffect } from "react";


const MapboxGLMap = ({countries}) => {
  const [countryNames, newNames] = useState(["name_en"])
    const mapContainer = React.createRef();
  
    useEffect(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamFjb2JrYWdvbiIsImEiOiJja2owZHM4NGUxbTN1MnJtd25pbHh5a2YwIn0.Ipv-6ntDnJw4WUD9ly3gcw";
      let firstPart = ["in", "iso_3166_1_alpha_3"]
        const map = new mapboxgl.Map({
         container: "map",
          style: "mapbox://styles/jacobkagon/ckjak6kt589rb19p228nwrycv", // stylesheet location
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
                "fill-color": "#780000",
                "fill-opacity": 0.4,
              },
            },
            "country-label"
          );
          map.setFilter("country-boundaries", firstPart.concat(countries));
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
  