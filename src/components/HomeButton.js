import React from 'react'
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

export const HomeButton = ({map}) => {

    console.log(map)

    return (
        <div className="home-btn">
        <button onClick={()=>  map.flyTo({
                center: [-106.09, 37.57259],
                zoom: 8.5,
            })
    }><FontAwesomeIcon icon={faMapMarkedAlt} /></button>
    </div>
    )
}
