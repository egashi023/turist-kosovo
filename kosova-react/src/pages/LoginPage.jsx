import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function LoginPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ type: '', message: '' })

        if (!form.email || !form.password) {
            setStatus({ type: 'error', message: 'Plotësoni të gjitha fushat.' })
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/auth.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem('kosova-user', JSON.stringify(data.user))
                navigate('/dashboard')
            } else {
                setStatus({ type: 'error', message: data.errors?.join(', ') || data.error || 'Gabim gjatë kyçjes.' })
            }
        } catch {
            setStatus({ type: 'error', message: 'Nuk mund të lidhet me serverin. Sigurohuni që XAMPP është i ndezur.' })
        }
        setSubmitting(false)
    }

    return (
        <>
            <Helmet>
                <title>Kyçu — Kosova Travel</title>
                <meta name="description" content="Kyçuni në llogarinë tuaj për të ngarkuar foto të qyteteve të Kosovës." />
            </Helmet>

            <div className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <span className="auth-icon">🔐</span>
                        <h1>Kyçu</h1>
                        <p>Mirësevini përsëri në Kosova Travel</p>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <label>Fjalëkalimi</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Shkruani fjalëkalimin..."
                            />
                        </div>

                        {status.message && (
                            <div className={`form-message ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn-primary btn-full" disabled={submitting}>
                            {submitting ? 'Duke u kyçur...' : '🔓 Kyçu'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Nuk keni llogari? <Link to="/register">Regjistrohuni këtu</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
