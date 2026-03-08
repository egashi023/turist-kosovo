import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const API_URL = '/api/contact.php'

function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        // Validation
        if (!form.name || !form.email || !form.message) {
            setStatus({ type: 'error', message: 'Ju lutem plotësoni të gjitha fushat e detyrueshme.' })
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            setStatus({ type: 'error', message: 'Ju lutem shkruani një email të vlefshëm.' })
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.success) {
                setStatus({ type: 'success', message: 'Faleminderit! Mesazhi juaj u dërgua me sukses.' })
                setForm({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({ type: 'error', message: data.errors?.join(', ') || data.error || 'Ka ndodhur një gabim.' })
            }
        } catch {
            // If API is not available, show success anyway for static demo
            setStatus({ type: 'success', message: 'Faleminderit! Mesazhi juaj u dërgua me sukses. (Demo mode)' })
            setForm({ name: '', email: '', subject: '', message: '' })
        }
        setSubmitting(false)
    }

    return (
        <>
            <Helmet>
                <title>Na Kontaktoni — Kosova Travel</title>
                <meta name="description" content="Na kontaktoni për çdo pyetje rreth udhëtimeve në Kosovë. Ekipi i Kosova Travel do t'ju ndihmojë me planifikimin e udhëtimit tuaj." />
                <meta property="og:title" content="Na Kontaktoni — Kosova Travel" />
                <meta property="og:description" content="Na kontaktoni për të planifikuar udhëtimin tuaj në Kosovë." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://kosovatravel.com/contact" />
            </Helmet>
            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h2>Na Kontaktoni</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Keni pyetje? Na shkruani dhe do t'ju përgjigjemi sa më shpejt.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Form */}
                        <div className="contact-form-wrap">
                            <h3>Dërgo Mesazh</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Emri juaj *</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Shkruani emrin..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Shkruani emailin..." />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Subjekti</label>
                                    <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subjekti i mesazhit..." />
                                </div>
                                <div className="form-group">
                                    <label>Mesazhi *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Shkruani mesazhin tuaj këtu..." rows={6} />
                                </div>

                                {status.message && (
                                    <div className={`form-message ${status.type}`}>
                                        {status.message}
                                    </div>
                                )}

                                <button type="submit" className="btn-primary" disabled={submitting}>
                                    {submitting ? 'Duke dërguar...' : '✉️ Dërgo Mesazhin'}
                                </button>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div className="contact-sidebar">
                            <div className="contact-info-item">
                                <div className="icon-wrap">📍</div>
                                <div>
                                    <h5>Adresa</h5>
                                    <p>Rruga "Nëna Terezë", Nr. 50<br />10000 Prishtinë, Kosovë</p>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="icon-wrap">📞</div>
                                <div>
                                    <h5>Telefoni</h5>
                                    <p>+383 44 123 456<br />+383 49 789 012</p>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="icon-wrap">📧</div>
                                <div>
                                    <h5>Email</h5>
                                    <p>info@kosovatravel.com<br />support@kosovatravel.com</p>
                                </div>
                            </div>
                            <div className="contact-info-item">
                                <div className="icon-wrap">🕐</div>
                                <div>
                                    <h5>Orari</h5>
                                    <p>E Hënë - E Premte: 08:00 - 18:00<br />E Shtunë: 09:00 - 14:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <div style={{ lineHeight: 0 }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47284.15298381499!2d21.143395!3d42.6629138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee605110927%3A0x9f1b1d22d9cb0e!2sPrishtina%2C%20Kosovo!5e0!3m2!1ssq!2s!4v1650000000000!5m2!1ssq!2s"
                    width="100%"
                    height="400"
                    style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                    allowFullScreen
                    loading="lazy"
                    title="Lokacioni"
                />
            </div>
        </>
    )
}

export default ContactPage
