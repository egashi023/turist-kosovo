import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
    { city: 'Prishtina', image: '/images/prishtina.jpg' },
    { city: 'Prizren', image: '/images/prizren.jpg' },
    { city: 'Ferizaj', image: '/images/ferii.jpg' },
    { city: 'Mitrovica', image: '/images/mitrovica.png' },
    { city: 'Peja', image: '/images/peja.jpg' },
    { city: 'Gjakova', image: '/images/gjakova.jpg' },
    { city: 'Gjilan', image: '/images/gjilan.jpg' },
]

function CitySlider() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="hero-slider">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`hero-slide ${i === current ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="hero-content">
                        <h4>Zbuloni Bukuritë e Qyteteve të Kosovës:</h4>
                        <h1>{slide.city}</h1>
                        <Link to="/destinations" className="btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
                            Eksploro Qytetin
                        </Link>
                    </div>
                </div>
            ))}
            <div className="hero-controls">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={i === current ? 'active' : ''}
                        onClick={() => setCurrent(i)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CitySlider
