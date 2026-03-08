import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

const faqs = [
    {
        q: 'Si mund ta rezervoj një udhëtim?',
        a: 'Mund të na kontaktoni përmes formularit të kontaktit ose emailit info@kosovatravel.com. Ekipi ynë do t\'ju ndihmojë me planifikimin e udhëtimit.',
    },
    {
        q: 'A ofron Kosova Travel guida turistike?',
        a: 'Po! Ne ofrojmë guida profesionale për të gjitha destinacionet kryesore në Kosovë, duke përfshirë ture individuale dhe grupore.',
    },
    {
        q: 'Cilat janë mënyrat e pagesës?',
        a: 'Pranojmë pagesa me kartë krediti, transfer bankar, dhe pagesa në dorë. Detajet e pagesës do t\'i merrni pas konfirmimit të rezervimit.',
    },
    {
        q: 'A mund ta anuloj rezervimin?',
        a: 'Po, anulimi është i mundshëm deri 48 orë para datës së udhëtimit. Për anulime, na kontaktoni sa më shpejt.',
    },
    {
        q: 'Si mund t\'i fshij të dhënat e mia personale?',
        a: 'Dërgoni një email në privacy@kosovatravel.com me kërkesën tuaj dhe do ta përpunojmë brenda 30 ditëve pune.',
    },
]

function SupportPage() {
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <>
            <Helmet>
                <title>Ndihmë & Mbështetje — Kosova Travel</title>
                <meta name="description" content="Keni nevojë për ndihmë? Gjeni përgjigje në pyetjet e shpeshta ose na kontaktoni direkt. Ekipi i Kosova Travel është këtu për ju." />
                <meta property="og:title" content="Ndihmë & Mbështetje — Kosova Travel" />
                <meta property="og:description" content="Qendra e ndihmës së Kosova Travel. FAQ dhe kontakt." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://kosovatravel.com/support" />
            </Helmet>

            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h1>Ndihmë & Mbështetje</h1>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Jemi këtu për t'ju ndihmuar. Gjeni përgjigje ose na kontaktoni.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="support-grid">
                        {/* Contact Cards */}
                        <FadeInSection>
                            <div className="support-contact-cards">
                                <div className="support-card">
                                    <div className="support-card-icon">📧</div>
                                    <h3>Email</h3>
                                    <p>Dërgoni email në çdo kohë</p>
                                    <a href="mailto:support@kosovatravel.com" className="support-link">
                                        support@kosovatravel.com
                                    </a>
                                </div>
                                <div className="support-card">
                                    <div className="support-card-icon">📞</div>
                                    <h3>Telefon</h3>
                                    <p>E Hënë - E Premte, 08:00 - 18:00</p>
                                    <a href="tel:+38344123456" className="support-link">
                                        +383 44 123 456
                                    </a>
                                </div>
                                <div className="support-card">
                                    <div className="support-card-icon">💬</div>
                                    <h3>Live Chat</h3>
                                    <p>Bisedoni me ekipin tonë</p>
                                    <span className="support-link">Së shpejti</span>
                                </div>
                            </div>
                        </FadeInSection>

                        {/* FAQ */}
                        <FadeInSection>
                            <div className="faq-section">
                                <h2>Pyetjet e Shpeshta (FAQ)</h2>
                                <div className="faq-list">
                                    {faqs.map((faq, i) => (
                                        <div
                                            key={i}
                                            className={`faq-item ${openFaq === i ? 'open' : ''}`}
                                        >
                                            <button
                                                className="faq-question"
                                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            >
                                                <span>{faq.q}</span>
                                                <span className="faq-toggle">
                                                    {openFaq === i ? '−' : '+'}
                                                </span>
                                            </button>
                                            {openFaq === i && (
                                                <div className="faq-answer">
                                                    <p>{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SupportPage
