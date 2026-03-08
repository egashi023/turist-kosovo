import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CitySlider from '../components/CitySlider'
import FadeInSection from '../components/FadeInSection'
import Testimonials from '../components/Testimonials'
import StatsCounter from '../components/StatsCounter'

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Kosova Travel Guide",
    "description": "Udhërrëfyesi juaj i plotë për të zbuluar qytetet, natyrën dhe kulturën e Kosovës. Vizitoni Prishtinën, Prizrenin, Pejën, Gjakovën dhe më shumë.",
    "url": "https://kosovatravel.com",
    "image": "https://kosovatravel.com/images/prishtina.jpg",
    "inLanguage": "sq",
    "about": {
        "@type": "Country",
        "name": "Kosova",
        "alternateName": "Kosovo"
    }
}

const cities = [
    {
        name: 'Prishtina',
        region: 'Kosovë',
        image: '/images/prishtina.jpg',
        population: '500,000+',
        attractions: 'Sheshi i Prishtinës, Biblioteka Kombëtare, Parku i Gërmisë',
        emoji: '🏛️',
    },
    {
        name: 'Prizren',
        region: 'Kosovë',
        image: '/images/prizren.jpg',
        population: '300,000',
        attractions: 'Kalaja e Prizrenit, Shadërvani, Xhamia e Sinan Pashës',
        emoji: '🏰',
    },
    {
        name: 'Ferizaj',
        region: 'Kosovë',
        image: '/images/ferii.jpg',
        population: '180,000',
        attractions: 'Parku i Lirisë, Gryka e Kaçanikut, Sheshi i Qytetit',
        emoji: '🌿',
    },
    {
        name: 'Mitrovica',
        region: 'Kosovë',
        image: '/images/mitrovica.png',
        population: '200,000',
        attractions: 'Ura e Ibrit, Kalaja e Vushtrrisë, Liqeni i Gazivodës',
        emoji: '🌊',
    },
    {
        name: 'Peja',
        region: 'Kosovë',
        image: '/images/peja.jpg',
        population: '170,000',
        attractions: 'Gryka e Rugovës, Patrikanaja e Pejës, Liqenat e Kuqishtes',
        emoji: '🏔️',
    },
    {
        name: 'Gjakova',
        region: 'Kosovë',
        image: '/images/gjakova.jpg',
        population: '150,000',
        attractions: 'Çarshia e Madhe, Xhamia e Hadumit, Ura e Terzive',
        emoji: '🕌',
    },
    {
        name: 'Gjilan',
        region: 'Kosovë',
        image: '/images/gjilan.jpg',
        population: '130,000',
        attractions: 'Sheshi i Gjilanit, Parku i Qytetit, Kodra e Dëshmorëve',
        emoji: '🌄',
    },
]

function HomePage() {
    return (
        <>
            <Helmet>
                <title>Kosova Travel — Zbuloni Bukuritë e Kosovës</title>
                <meta name="description" content="Zbuloni qytetet, natyrën dhe kulturën e Kosovës. Udhërrëfyes turistik për Prishtinën, Prizrenin, Pejën, Gjakovën, Gjilanin dhe më shumë." />
                <meta name="keywords" content="Kosova, Turizmi, Prishtina, Prizren, Rugova, Gjakova, Peja, Udhëtim, Ballkan" />

                {/* Facebook / OG */}
                <meta property="og:title" content="Kosova Travel — Zbuloni Bukuritë e Kosovës" />
                <meta property="og:description" content="Udhërrëfyesi juaj i plotë për të zbuluar qytetet dhe natyrën e Kosovës. Vizitoni vendin me mikpritjen më të madhe në Ballkan." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://explore-ks.vercel.app/og-image.png" />
                <meta property="og:url" content="https://explore-ks.vercel.app" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Kosova Travel — Zbuloni Bukuritë e Kosovës" />
                <meta name="twitter:description" content="Udhërrëfyesi i plotë për turizmin në Kosovë." />
                <meta name="twitter:image" content="https://explore-ks.vercel.app/og-image.png" />

                <link rel="canonical" href="https://explore-ks.vercel.app/" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

                {/* Search Console / Bing */}
                <meta name="google-site-verification" content="PLACEHOLDER_GOOGLE_VERIFICATION" />
                <meta name="msvalidate.01" content="PLACEHOLDER_BING_VERIFICATION" />
            </Helmet>
            <CitySlider />

            {/* Stats Section */}
            <StatsCounter />

            {/* Cities Grid */}
            <section className="section">
                <div className="container">
                    <FadeInSection>
                        <div className="section-heading" style={{ textAlign: 'center' }}>
                            <h2>Zbuloni Qytetet e Kosovës</h2>
                            <p>Kultura, historia dhe atraksionet më të bukura në Kosovë.</p>
                        </div>
                    </FadeInSection>

                    <div className="cities-grid">
                        {cities.map((city, i) => (
                            <FadeInSection key={city.name} delay={i * 0.15} direction="up">
                                <div className="city-card">
                                    <div className="card-image">
                                        <img src={city.image} alt={city.name} loading="lazy" />
                                        <div className="card-emoji">{city.emoji}</div>
                                    </div>
                                    <div className="card-content">
                                        <h4>{city.name}</h4>
                                        <span className="card-region">{city.region}</span>
                                        <p>Banorë: {city.population}</p>
                                        <p className="card-attractions">{city.attractions}</p>
                                        <Link to="/destinations" className="card-link">
                                            Lexo më shumë <span className="arrow">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* CTA */}
            <div className="cta-section">
                <div className="container">
                    <FadeInSection>
                        <h3>Planifikoni Udhëtimin Tuaj</h3>
                        <p>Na kontaktoni për mundësi të veçanta udhëtimi në Kosovë.</p>
                        <Link to="/contact" className="btn-white">Na Kontaktoni</Link>
                    </FadeInSection>
                </div>
            </div>
        </>
    )
}

export default HomePage
