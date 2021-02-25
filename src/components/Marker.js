import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import projects from '../data/landlines.json'
import './marker.css'
import Sidebar from './Sidebar';

const Marker = ({ map }) => {

    // const [targetProject, setTargetProject] = useState('')
    
    const [state, setstate] = useState({title: '', artist: '', description: '', images: ''})
    
    

    // Assign each Landlines project with a unique ID
    // This will be used to link mapbox points with sidebar 
    projects.features.forEach(function(project, i){
        project.properties.id = i;
    });

    function addMarkers() {
        projects.features.forEach(function(marker) {
            const el = document.createElement('div');
            el.id = "marker-" + marker.properties.id;
            el.className = 'marker';            

            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

            el.addEventListener('click', function(e){
            flyToProject(marker)
            })
        });
        }

  

    // Use Mapbox GL JS's `flyTo` to move the camera smoothly
    // a given center point.
    function flyToProject(currentFeature) {
        map.flyTo({
            center: [currentFeature.geometry.coordinates[0], currentFeature.geometry.coordinates[1]],
            zoom: 12,
            speed: 1,
            padding: ({ left: 500}) //Push center to the left 500px
        });


        
        setstate(currentFeature.properties)

    // Open Sidebar
    const sidebar = document.querySelector('#sidebar')
    sidebar.classList.add("open");
    }


    if(map){
        map.on('load', () => {
            addMarkers()
        });
    }
  
    return (
        <div>
            <Sidebar state={state} map={map}/>
        </div>
    )
}

export default Marker

        
         