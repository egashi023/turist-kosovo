import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDarkMode } from '../hooks/useAnimations'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
]

function Header() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isDark, toggleDark] = useDarkMode()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
        // Check auth on route change
        const stored = localStorage.getItem('kosova-user')
        setUser(stored ? JSON.parse(stored) : null)
    }, [location.pathname])

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    <span className="logo-icon">🏔️</span> Kosova
                </Link>
                <nav className={menuOpen ? 'open' : ''}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="header-actions">
                    {user ? (
                        <Link to="/dashboard" className="header-user-btn" title={user.name}>
                            👤 {user.name.split(' ')[0]}
                        </Link>
                    ) : (
                        <Link to="/login" className="header-login-btn">
                            🔐 Kyçu
                        </Link>
                    )}
                    <button
                        className="theme-toggle"
                        onClick={toggleDark}
                        aria-label="Toggle dark mode"
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
