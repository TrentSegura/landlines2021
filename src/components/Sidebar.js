import './Sidebar.css'
import { Slideshow } from './Slideshow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ state, map }) => {

    function closeSidebar(){
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.remove("open");

    //     map.flyTo({
    //         padding: ({ right: 500}) //Push center to the right 400px
    // })
    }

    return (
        <div>
            <div className='sidebar sidebar-open' id='sidebar'>
                <button id="exit-card" onClick={closeSidebar}>
                    <FontAwesomeIcon icon={ faTimes } color="#fff" />
                </button>
                <Slideshow images={state.images} alt={state.title}/>
                <div className="project-container">
                    <h2 className="project-title">{state.title}</h2>
                    <h3 className="project-author">{state.artist}</h3>
                    <div className="project-description-container">
                        <p className="project-description">
                        {state.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
