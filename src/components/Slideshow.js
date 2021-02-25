import React, { useState } from 'react'
import './slideshow.css'

export const Slideshow = ({ images }) => {

    const [current, setCurrent] = useState(0)
    const length = images.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    const imgSrc = 'http://richardsaxton.org/websites/m12_landlines/' + images

    if(!Array.isArray(images) || images.length <= 0){
        return (
            <div className="image-container">
                <img src={imgSrc} alt="landlines" className="image"/>
            </div>
        )
    };

    return (
        <section className='carousel'>
            {images.map((image, index) => {

                const imgSrc = 'http://richardsaxton.org/websites/m12_landlines/' + image

                return (
                    <div className={ index === current ? 'carousel__item carousel__item--visible img-container' : 'carousel__item img-container'} key={index}>
                        {index === current && (<img src={imgSrc} alt="landlines" className='image'/>)}
                    </div>
                )
            })}
            <div className="carousel__actions">
                <button id="carousel__actions--prev" onClick={prevSlide}>⟵</button>
                <button id="carousel__actions--next" onClick={nextSlide}>⟶</button>
            </div>
        </section>
    )
}
