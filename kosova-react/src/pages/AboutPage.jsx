import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'
import StatsCounter from '../components/StatsCounter'

const infoCards = [
    { icon: '📍', title: '7 Rajone', desc: 'Kosova ka shtatë rajone me qytete të bukura dhe natyra të mrekullueshme.' },
    { icon: '👥', title: '1.8 Milion Banorë', desc: 'Populli i Kosovës është i njohur për mikpritjen dhe dashamirësinë.' },
    { icon: '🏛️', title: 'Trashëgimi e Pasur', desc: 'Monumente historike, kala, xhami dhe kisha që dëshmojnë historinë e gjatë.' },
]

const timeline = [
    { year: '2008', event: 'Shpallja e Pavarësisë', desc: 'Kosova shpalli pavarësinë nga Serbia më 17 shkurt 2008.' },
    { year: '2010', event: 'Njohja Ndërkombëtare', desc: 'Mbi 100 shtete e njohin pavarësinë e Kosovës.' },
    { year: '2020', event: 'Zhvillimi i Turizmit', desc: 'Kosova bëhet destinacion gjithnjë e më i popullarizuar.' },
    { year: '2025', event: 'E Ardhmja', desc: 'Investime të mëdha në infrastrukturë dhe turizëm.' },
]

function AboutPage() {
    return (
        <>
            <Helmet>
                <title>Rreth Kosovës — Kosova Travel</title>
                <meta name="description" content="Mësoni për Kosovën — historinë, kulturën, qytetet dhe natyrën e bukur. Zbuloni pse Kosova është destinacioni ideal për udhëtarët." />
                <meta property="og:title" content="Rreth Kosovës — Kosova Travel" />
                <meta property="og:description" content="Historia, kultura dhe qytetet e Kosovës. Zbuloni vendin tonë të bukur." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://kosovatravel.com/about" />
            </Helmet>
            {/* Hero */}
            <div className="page-banner about-hero" style={{
                backgroundImage: 'url(/images/kosova2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                minHeight: '450px',
            }}>
                <div className="page-banner-overlay" />
                <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <FadeInSection direction="up">
                        <p className="hero-subtitle">Zbulo Kosovën</p>
                        <h2>Mirësevini në Kosovë</h2>
                        <p>Njihni bukuritë natyrore, qytetet historike dhe kulturën e pasur të vendit tonë.</p>
                        <Link to="/destinations" className="btn-primary" style={{ marginTop: '20px' }}>Zbulo më shumë</Link>
                    </FadeInSection>
                </div>
            </div>

            {/* Info Cards */}
            <div className="container">
                <div className="info-cards">
                    {infoCards.map((card, i) => (
                        <FadeInSection key={card.title} delay={i * 0.15}>
                            <div className="info-card">
                                <div className="icon">{card.icon}</div>
                                <h4>{card.title}</h4>
                                <p>{card.desc}</p>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <StatsCounter />

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <FadeInSection>
                        <div className="section-heading" style={{ textAlign: 'center' }}>
                            <h2>Historia e Kosovës</h2>
                            <p>Momente kyçe në historinë moderne të Kosovës</p>
                        </div>
                    </FadeInSection>

                    <div className="timeline">
                        {timeline.map((item, i) => (
                            <FadeInSection key={item.year} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
                                <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        <span className="timeline-year">{item.year}</span>
                                        <h4>{item.event}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Text */}
            <section className="section" style={{ background: 'var(--bg-alt)' }}>
                <div className="container">
                    <FadeInSection>
                        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                            <h2 style={{ marginBottom: '30px' }}>Qytetet dhe Vendet e Kosovës</h2>
                            <p className="about-paragraph">
                                Kosova është një vend i vogël në zemër të Ballkanit, por me një histori shumë të pasur dhe kulturë të veçantë.
                                Ajo është e njohur për trashëgiminë e saj kulturore, monumentet historike, natyrën e bukur dhe mikpritjen tradicionale të popullit të saj.
                            </p>
                            <p className="about-paragraph">
                                Qytetet e Kosovës, si Prishtina, Prizreni, Ferizaj dhe Mitrovica, ofrojnë përvoja të ndryshme për vizitorët.
                                Prishtina është qendra politike dhe kulturore e vendit, Prizreni njihet për arkitekturën historike,
                                ndërsa qytetet tjera dallohen për traditat, kuzhinën dhe jetën e gjallë urbane.
                            </p>
                            <p className="about-paragraph">
                                Me zhvillimin e vazhdueshëm të turizmit, Kosova synon të promovojë vlerat e saj kulturore dhe natyrore,
                                duke u bërë një destinacion gjithnjë e më i rëndësishëm për vizitorët nga e gjithë bota.
                            </p>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* CTA */}
            <div className="cta-section">
                <div className="container">
                    <FadeInSection>
                        <h3>Gati për të zbuluar Kosovën?</h3>
                        <p>Planifikoni udhëtimin tuaj sot dhe përjetoni bukurinë e Kosovës.</p>
                        <Link to="/contact" className="btn-white">Na Kontaktoni</Link>
                    </FadeInSection>
                </div>
            </div>
        </>
    )
}

export default AboutPage
