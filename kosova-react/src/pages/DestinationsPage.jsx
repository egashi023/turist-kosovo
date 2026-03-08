import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

const API_URL = '/api/cities.php'

const fallbackCities = [
    {
        id: 1, name: 'Prishtina', region: 'Kosovë Qendrore', population: '500,000+',
        description: 'Prishtina, kryeqyteti i Kosovës, është qendra politike, kulturore dhe ekonomike e vendit. Me një popullatë të re dhe dinamike, qyteti ofron një përzierje unike të arkitekturës moderne dhe trashëgimisë historike.',
        image: '/images/prishtina.jpg',
        attractions: 'Sheshi i Prishtinës, Biblioteka Kombëtare, Parku i Gërmisë, Ulpiana Antike, Pazari i Vjetër',
        sub_cities: 'Prishtina, Podujeva, Fushë Kosova, Lipjani, Obiliqi, Drenasi',
        best_season: 'Maj - Shtator', badge: 'Kryeqyteti'
    },
    {
        id: 2, name: 'Prizren', region: 'Kosovë Jugperëndimore', population: '300,000',
        description: 'Prizreni është ndoshta qyteti më pittoresk në Kosovë. Me kalajën e tij madhështore, urat historike dhe arkitekturën unike osmane, Prizreni është zemra kulturore e vendit.',
        image: '/images/prizren.jpg',
        attractions: 'Kalaja e Prizrenit, Lidhja e Prizrenit, Shadërvani, Xhamia e Sinan Pashës, Lumi Bistrica',
        sub_cities: 'Prizren, Suharekë, Dragash, Mamushë',
        best_season: 'Qershor - Gusht', badge: 'Historike'
    },
    {
        id: 3, name: 'Ferizaj', region: 'Kosovë Jugore', population: '180,000',
        description: 'Ferizaj dallohet për pozitën e tij strategjike, historinë e pasur dhe natyrën e bukur përreth, veçanërisht Grykën e Kaçanikut.',
        image: '/images/ferii.jpg',
        attractions: 'Parku i Lirisë, Qendra e Ferizajt, Gryka e Kaçanikut, Sheshi i Qytetit',
        sub_cities: 'Ferizaj, Shtime, Kaçanik',
        best_season: 'Pranverë dhe Vjeshtë', badge: 'Moderne'
    },
    {
        id: 4, name: 'Mitrovica', region: 'Kosovë Veriore', population: '200,000',
        description: 'Mitrovica shtrihet në veri të Kosovës dhe njihet si një qytet me histori të pasur industriale dhe kulturore.',
        image: '/images/mitrovica.png',
        attractions: 'Ura e Ibrit, Kalaja e Vushtrrisë, Liqeni i Gazivodës, Qendra e Mitrovicës',
        sub_cities: 'Mitrovicë, Vushtrri, Skenderaj, Leposaviq',
        best_season: 'Korrik - Shtator', badge: 'Unike'
    },
    {
        id: 5, name: 'Peja', region: 'Kosovë Perëndimore', population: '170,000',
        description: 'Peja është porta e Alpeve Shqiptare dhe një nga qytetet më të bukura të Kosovës. Gryka e Rugovës, Patrikanaja e Pejës dhe liqenat e mrekullueshme e bëjnë këtë qytet destinacionin kryesor për dashamirësit e natyrës.',
        image: '/images/peja.jpg',
        attractions: 'Gryka e Rugovës, Patrikanaja e Pejës, Liqenat e Kuqishtes, Bjeshkët e Nemuna',
        sub_cities: 'Pejë, Istog, Klinë, Deçan',
        best_season: 'Qershor - Shtator', badge: 'Natyrore'
    },
    {
        id: 6, name: 'Gjakova', region: 'Kosovë Jugperëndimore', population: '150,000',
        description: 'Gjakova është qytet me trashëgimi të pasur kulturore dhe historike. Çarshia e Madhe, një nga pazaret më të mëdha në Ballkan, dhe Xhamia e Hadumit janë simbole të këtij qyteti të bukur.',
        image: '/images/gjakova.jpg',
        attractions: 'Çarshia e Madhe, Xhamia e Hadumit, Ura e Terzive, Kisha e Shën Pjetrit',
        sub_cities: 'Gjakovë, Rahovec, Malishevë',
        best_season: 'Maj - Tetor', badge: 'Kulturore'
    },
    {
        id: 7, name: 'Gjilan', region: 'Kosovë Lindore', population: '130,000',
        description: 'Gjilani ndodhet në lindje të Kosovës dhe është qendër e rëndësishme ekonomike dhe arsimore. Qyteti ofron natyrë të bukur, parqe moderne dhe një atmosferë të këndshme për vizitorët.',
        image: '/images/gjilan.jpg',
        attractions: 'Sheshi i Gjilanit, Parku i Qytetit, Kodra e Dëshmorëve, Liqeni i Livoçit',
        sub_cities: 'Gjilan, Kamenicë, Viti, Novobërdë',
        best_season: 'Pranverë dhe Vjeshtë', badge: 'Dinamike'
    },
]

function DestinationsPage() {
    const [cities, setCities] = useState(fallbackCities)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data.length > 0) {
                    setCities(data.data.map(c => ({ ...c, image: '/' + c.image })))
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.attractions.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <Helmet>
                <title>Destinacionet — Qytetet e Kosovës | Kosova Travel</title>
                <meta name="description" content="Eksploroni të gjitha destinacionet turistike në Kosovë — Prishtina, Prizreni, Peja, Gjakova, Gjilani dhe më shumë. Atraksionet dhe informatat kryesore." />
                <meta property="og:title" content="Destinacionet — Qytetet e Kosovës" />
                <meta property="og:description" content="Eksploroni çdo qytet, monument dhe bukuri natyrore të Kosovës." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://kosovatravel.com/destinations" />
            </Helmet>
            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <FadeInSection>
                        <h2>Destinacionet</h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '25px' }}>
                            Zbuloni çdo qytet, çdo monument dhe çdo bukuri natyrore të Kosovës.
                        </p>
                        {/* Search */}
                        <div className="search-bar">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Kërko destinacionin... (p.sh. Prizren, Kalaja, Natyrë)"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </FadeInSection>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading ? (
                        <div className="loading"><div className="loading-spinner" /></div>
                    ) : filtered.length === 0 ? (
                        <FadeInSection>
                            <div className="no-results">
                                <span className="no-results-icon">🔍</span>
                                <h3>Nuk u gjet asnjë destinacion</h3>
                                <p>Provoni me një kërkim tjetër.</p>
                            </div>
                        </FadeInSection>
                    ) : (
                        filtered.map((city, i) => (
                            <FadeInSection key={city.id || i} delay={i * 0.1}>
                                <div className="destination-card">
                                    <div className={`card-row ${i % 2 === 1 ? 'reverse' : ''}`}>
                                        <div className="dest-image">
                                            <img src={city.image} alt={city.name} loading="lazy" />
                                            {city.badge && <div className="badge">{city.badge}</div>}
                                        </div>
                                        <div className="dest-content">
                                            <h3>{city.name}</h3>
                                            <div className="dest-meta">
                                                <span>👥 {city.population} banorë</span>
                                                <span>📍 {city.region}</span>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '18px', fontSize: '15px' }}>
                                                {city.description}
                                            </p>
                                            <div className="dest-details">
                                                <div className="detail-item">
                                                    <h5>⭐ Vendet Turistike</h5>
                                                    <p>{city.attractions}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <h5>🏙️ Qytetet Kryesore</h5>
                                                    <p>{city.sub_cities}</p>
                                                </div>
                                                {city.best_season && (
                                                    <div className="detail-item">
                                                        <h5>☀️ Koha më e mirë</h5>
                                                        <p>{city.best_season}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))
                    )}
                </div>
            </section>

            <div className="cta-section">
                <div className="container">
                    <FadeInSection>
                        <h3>Planifikoni Udhëtimin Tuaj</h3>
                        <p>Na kontaktoni për të organizuar një udhëtim në çdo destinacion.</p>
                        <Link to="/contact" className="btn-white">Na Kontaktoni</Link>
                    </FadeInSection>
                </div>
            </div>
        </>
    )
}

export default DestinationsPage
