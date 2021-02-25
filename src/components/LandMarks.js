import React from 'react'
import LandmarksData from '../data/map.json'
import mapboxgl from 'mapbox-gl';
import './LandMarks.css'


const LandMarks = ({ map }) => {

    if(map){
        LandmarksData.features.forEach((landmark) =>{
            const coord = [landmark.geometry.coordinates[0], landmark.geometry.coordinates[1]]
            const popup = new mapboxgl.Popup()
               

            popup.setHTML(
                landmark.properties.images ?

                `
                <div class="pins">
               
                <div class="pb-container">
                <img src="http://richardsaxton.org/websites/m12_landlines/landmarks/${landmark.properties.images}">
                </div>
                              
                <h3>${landmark.properties.name}</h3>
                </div>
                
                `               

                :

                `

                <div class="pins">
                <h3>${landmark.properties.name}</h3>
                </div>
                
                ` )    

            var el = document.createElement('div');
            el.id = 'pin-marker';

            map.on('mouseenter', 'LandmarksData', function (e) {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';
                 
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
                });
                 
                map.on('mouseleave', 'places', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
                });

            const marker = new mapboxgl.Marker(el)
            marker.setPopup(popup)
            marker.setLngLat(coord)
            marker.addTo(map)
        })
    }
    

    return (
        <div>
           
        </div>
    )
}

export default LandMarks
