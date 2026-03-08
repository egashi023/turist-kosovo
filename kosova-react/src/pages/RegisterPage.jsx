import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setStatus({ type: 'error', message: 'Plotësoni të gjitha fushat.' })
            return
        }
        if (form.password.length < 6) {
            setStatus({ type: 'error', message: 'Fjalëkalimi duhet të ketë së paku 6 karaktere.' })
            return
        }
        if (form.password !== form.confirmPassword) {
            setStatus({ type: 'error', message: 'Fjalëkalimet nuk përputhen.' })
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth.php?action=register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.success) {
                setStatus({ type: 'success', message: 'Regjistrimi u krye me sukses! Po ju ridrejtojmë...' })
                setTimeout(() => navigate('/login'), 1500)
            } else {
                setStatus({ type: 'error', message: data.errors?.join(', ') || data.error || 'Gabim gjatë regjistrimit.' })
            }
        } catch {
            setStatus({ type: 'error', message: 'Nuk mund të lidhet me serverin. Sigurohuni që XAMPP është i ndezur.' })
        }
        setSubmitting(false)
    }

    return (
        <>
            <Helmet>
                <title>Regjistrohuni — Kosova Travel</title>
                <meta name="description" content="Krijoni llogari të re për të ngarkuar foto të qyteteve të Kosovës në Kosova Travel." />
            </Helmet>

            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <span className="auth-icon">✨</span>
                        <h1>Regjistrohuni</h1>
                        <p>Krijoni llogarinë tuaj në Kosova Travel</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Emri i plotë</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Emri juaj..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="email@shembull.com"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Fjalëkalimi</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Mimimum 6 karaktere"
                                />
                            </div>
                            <div className="form-group">
                                <label>Konfirmo fjalëkalimin</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Përsëritni fjalëkalimin"
                                />
                            </div>
                        </div>

                        {status.message && (
                            <div className={`form-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn-primary btn-full" disabled={submitting}>
                            {submitting ? 'Duke u regjistruar...' : '📝 Regjistrohuni'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Keni llogari? <Link to="/login">Kyçuni këtu</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
