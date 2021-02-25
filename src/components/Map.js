import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import LandMarks from './LandMarks';

import landLines from './Landlines'
import landLinesThin from './LandlinesThin'
import { HomeButton } from './HomeButton';




if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

mapboxgl.accessToken = 'pk.eyJ1IjoibTEyLXRyZW50IiwiYSI6ImNrNDNuejljbjA0NzMzZW15eGk4OWMwdTEifQ.8rs6af8i7F8oeHDpbD_zQw';


const Map = () => {

    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null)

    var bounds = [
        [-110.113384, 35.747004], // Southwest coordinates
        [-102.113384, 39.747004] // Northeast coordinates
      ]
    
    useEffect(() => {
        const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/m12-trent/ckg9xlrw62gxc19lc9hbaylmf',
        center: [-106.09, 37.57259],
        zoom: 8.5,
        minZoom: 1,
        maxZoom: 13,
        attributionControl: false,
        maxBounds: bounds,
        maxPitch: 0
    });

        map.scrollZoom.disable();
        // map.dragRotate.disable();
        const nav = new mapboxgl.NavigationControl({showCompass: false});
        map.addControl(nav, 'bottom-right');


        // Load the Lines in Landlines
        map.on('load', () => {

            // Thick White Lines (Aka the Landlines)
            map.addSource('landlines', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': landLines
                        }
                    }    
                });
                map.addLayer({
                    'id': 'lines',
                    'type': 'line',
                    'source': 'landlines',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                        },
                    'paint': {
                        'line-color': '#fff',
                        'line-opacity': 0.6,
                        'line-width': 1.5
                     }
                });

                // Thin white lines
                map.addSource('landlines-thin', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': landLinesThin
                            }
                        }    
                    });
                map.addLayer({
                    'id': 'lines-thin',
                    'type': 'line',
                    'source': 'landlines-thin',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                        },
                    'paint': {
                        'line-color': '#f9dec2',
                    'line-opacity': 0.3,
                    'line-width': 1
                        }
                    });
        })
    
    setMap(map)

    // clean up on unmount
    return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <div>
            <div className="Mapoverlay" id='site-title'>
                <h1>Landlines |</h1>
                <h2> M12 Studio</h2>
            </div>
            <div className='map-container' ref={mapContainerRef}>
                <HomeButton map={map} />
                <LandMarks map={map} />
                <Marker map={map}/>
            </div>
        </div>
    )
}

export default Map
