import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

const filters = ['Të gjitha', 'Prishtina', 'Prizren', 'Ferizaj', 'Mitrovica', 'Peja', 'Gjakova', 'Gjilan', 'Natyra']

const images = [
    { src: '/images/prishtina.jpg', title: 'Prishtina', subtitle: 'Kryeqyteti i Kosovës', category: 'Prishtina' },
    { src: '/images/prizren.jpg', title: 'Prizren', subtitle: 'Qyteti Historik', category: 'Prizren' },
    { src: '/images/prizren1.jpg', title: 'Prizren', subtitle: 'Pamje nga Kalaja', category: 'Prizren' },
    { src: '/images/ferii.jpg', title: 'Ferizaj', subtitle: 'Qendra e Qytetit', category: 'Ferizaj' },
    { src: '/images/ferizaj1.jpg', title: 'Ferizaj', subtitle: 'Pamje e Qytetit', category: 'Ferizaj' },
    { src: '/images/mitrovica.png', title: 'Mitrovica', subtitle: 'Qyteti në Veri', category: 'Mitrovica' },
    { src: '/images/mitrovica1.jpg', title: 'Mitrovica', subtitle: 'Pamje e Qytetit', category: 'Mitrovica' },
    { src: '/images/peja.jpg', title: 'Peja', subtitle: 'Porta e Alpeve Shqiptare', category: 'Peja' },
    { src: '/images/gjakova.jpg', title: 'Gjakova', subtitle: 'Çarshia e Madhe', category: 'Gjakova' },
    { src: '/images/gjilan.jpg', title: 'Gjilan', subtitle: 'Qyteti Lindor', category: 'Gjilan' },
    { src: '/images/kosova.jpg', title: 'Kosova', subtitle: 'Bukuritë Natyrore', category: 'Natyra' },
    { src: '/images/kosova2.png', title: 'Kosova', subtitle: 'Panoramë', category: 'Natyra' },
]

function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState('Të gjitha')
    const [userPhotos, setUserPhotos] = useState([])

    useEffect(() => {
        fetch('/api/photos')
            .then(res => res.json())
            .then(data => {
                if (data.success) setUserPhotos(data.data)
            })
            .catch(() => { })
    }, [])

    const filteredImages = activeFilter === 'Të gjitha'
        ? images
        : images.filter(img => img.category === activeFilter)

    const filteredUserPhotos = activeFilter === 'Të gjitha'
        ? userPhotos
        : userPhotos.filter(p => p.city_name === activeFilter)

    return (
        <>
            <Helmet>
                <title>Galeria — Foto nga Kosova | Kosova Travel</title>
                <meta name="description" content="Shikoni pamjet më të bukura nga qytetet dhe natyra e Kosovës. Galeria fotografike e Prishtinës, Prizrenit, Pejës, Gjakovës dhe më shumë." />
                <meta name="keywords" content="Galeria, Foto Kosova, Peizazhe, Qytete" />

                <meta property="og:title" content="Galeria — Foto nga Kosova" />
                <meta property="og:description" content="Pamjet më të bukura nga qytetet dhe natyra e Kosovës." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://explore-ks.vercel.app/og-image.png" />
                <meta property="og:url" content="https://explore-ks.vercel.app/gallery" />

                <meta name="twitter:card" content="summary_large_image" />

                <link rel="canonical" href="https://explore-ks.vercel.app/gallery" />
            </Helmet>
            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h2>Galeria</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Pamjet më të bukura nga qytetet dhe natyrën e Kosovës.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="gallery-filters">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                className={activeFilter === filter ? 'active' : ''}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid">
                        {filteredImages.map((img, i) => (
                            <div key={i} className="gallery-item">
                                <img src={img.src} alt={img.title} loading="lazy" />
                                <div className="overlay">
                                    <div>
                                        <h4>{img.title}</h4>
                                        <span>{img.subtitle}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* User-uploaded photos */}
                    {filteredUserPhotos.length > 0 && (
                        <FadeInSection>
                            <div className="user-gallery-section">
                                <h3>📸 Foto nga Përdoruesit</h3>
                                <div className="gallery-grid">
                                    {filteredUserPhotos.map(photo => (
                                        <div key={photo.id} className="gallery-item">
                                            <img
                                                src={'/' + photo.image_path}
                                                alt={photo.caption || photo.city_name}
                                                loading="lazy"
                                            />
                                            <div className="overlay">
                                                <div>
                                                    <h4>{photo.city_name}</h4>
                                                    <span>{photo.caption || `Nga ${photo.user_name}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInSection>
                    )}
                </div>
            </section>
        </>
    )
}

export default GalleryPage
