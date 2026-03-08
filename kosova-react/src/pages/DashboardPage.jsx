import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

const cityOptions = [
    'Prishtina', 'Prizren', 'Ferizaj', 'Mitrovica',
    'Peja', 'Gjakova', 'Gjilan'
]

function DashboardPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [photos, setPhotos] = useState([])
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' })
    const [form, setForm] = useState({ city_name: '', caption: '' })
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('kosova-user')
        if (!stored) {
            navigate('/login')
            return
        }
        setUser(JSON.parse(stored))
        fetchMyPhotos()
    }, [navigate])

    const fetchMyPhotos = async () => {
        try {
            const token = localStorage.getItem('kosova-token');
            const res = await fetch('/api/photos?user=me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const data = await res.json()
            if (data.success) setPhotos(data.data)
        } catch { /* silent */ }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploadStatus({ type: '', message: '' })

        if (!form.city_name) {
            setUploadStatus({ type: 'error', message: 'Zgjidhni qytetin.' })
            return
        }
        if (!selectedFile) {
            setUploadStatus({ type: 'error', message: 'Zgjidhni një foto.' })
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('city_name', form.city_name)
        formData.append('caption', form.caption)
        formData.append('image', selectedFile)

        try {
            const token = localStorage.getItem('kosova-token');
            const res = await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            })
            const data = await res.json()
            if (data.success) {
                setUploadStatus({ type: 'success', message: 'Foto u ngarkua me sukses! 🎉' })
                setForm({ city_name: '', caption: '' })
                setSelectedFile(null)
                setPreviewUrl(null)
                fetchMyPhotos()
            } else {
                setUploadStatus({ type: 'error', message: data.errors?.join(', ') || data.error || 'Gabim.' })
            }
        } catch {
            setUploadStatus({ type: 'error', message: 'Nuk mund të lidhet me serverin.' })
        }
        setUploading(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('kosova-user')
        localStorage.removeItem('kosova-token')
        navigate('/')
    }

    if (!user) return null

    return (
        <>
            <Helmet>
                <title>Dashboard — Kosova Travel</title>
                <meta name="description" content="Paneli juaj i Kosova Travel. Ngarkoni foto të qyteteve të Kosovës." />
            </Helmet>

            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <h1>Mirësevini, {user.name}! 👋</h1>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Ngarkoni foto nga qytetet e Kosovës
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="dashboard-grid">
                        {/* Upload Form */}
                        <FadeInSection>
                            <div className="upload-card">
                                <h2>📷 Ngarko Foto</h2>
                                <form onSubmit={handleUpload}>
                                    <div className="form-group">
                                        <label>Qyteti *</label>
                                        <select
                                            name="city_name"
                                            value={form.city_name}
                                            onChange={(e) => setForm(prev => ({ ...prev, city_name: e.target.value }))}
                                        >
                                            <option value="">Zgjidhni qytetin...</option>
                                            {cityOptions.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Përshkrimi (opsional)</label>
                                        <input
                                            type="text"
                                            name="caption"
                                            value={form.caption}
                                            onChange={(e) => setForm(prev => ({ ...prev, caption: e.target.value }))}
                                            placeholder="Shkruani përshkrim të shkurtër..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Foto *</label>
                                        <div className="file-upload-area">
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp,image/gif"
                                                onChange={handleFileChange}
                                                id="photo-input"
                                            />
                                            <label htmlFor="photo-input" className="file-upload-label">
                                                {selectedFile ? (
                                                    <span>📎 {selectedFile.name}</span>
                                                ) : (
                                                    <span>📁 Klikoni për të zgjedhur foton</span>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {previewUrl && (
                                        <div className="upload-preview">
                                            <img src={previewUrl} alt="Preview" />
                                        </div>
                                    )}

                                    {uploadStatus.message && (
                                        <div className={`form-message ${uploadStatus.type}`}>
                                            {uploadStatus.message}
                                        </div>
                                    )}

                                    <button type="submit" className="btn-primary btn-full" disabled={uploading}>
                                        {uploading ? 'Duke u ngarkuar...' : '⬆️ Ngarko Foton'}
                                    </button>
                                </form>
                            </div>
                        </FadeInSection>

                        {/* User Info */}
                        <FadeInSection delay={0.15}>
                            <div className="user-info-card">
                                <div className="user-avatar">👤</div>
                                <h3>{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                                <div className="user-stat">
                                    <span className="stat-number">{photos.length}</span>
                                    <span>Foto të ngarkuara</span>
                                </div>
                                <button onClick={handleLogout} className="btn-logout">
                                    🚪 Dilni
                                </button>
                            </div>
                        </FadeInSection>
                    </div>

                    {/* User's Photos */}
                    {photos.length > 0 && (
                        <FadeInSection>
                            <div className="my-photos-section">
                                <h2>Fotot e Mia</h2>
                                <div className="photos-grid">
                                    {photos.map(photo => (
                                        <div key={photo.id} className="photo-card">
                                            <div className="photo-image">
                                                <img
                                                    src={'/' + photo.image_path}
                                                    alt={photo.caption || photo.city_name}
                                                    loading="lazy"
                                                />
                                                <span className="photo-city-badge">{photo.city_name}</span>
                                            </div>
                                            {photo.caption && (
                                                <div className="photo-caption">
                                                    <p>{photo.caption}</p>
                                                </div>
                                            )}
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

export default DashboardPage
