import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h4>Kosova Travel</h4>
                        <p>Zbuloni bukuritë natyrore dhe kulturore të Kosovës me ne.</p>
                    </div>
                    <div>
                        <h4>Linqet</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/destinations">Destinations</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Mbështetja</h4>
                        <ul>
                            <li><Link to="/support">Ndihmë & FAQ</Link></li>
                            <li><Link to="/privacy-policy">Politika e Privatësisë</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Kontakti</h4>
                        <p>📧 info@kosovatravel.com</p>
                        <p>📞 +383 44 123 456</p>
                        <p>📍 Prishtinë, Kosovë</p>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>Copyright © 2026 <a href="#">Kosova Travel</a> Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
