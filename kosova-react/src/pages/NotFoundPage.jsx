import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>404 — Faqja nuk u gjet | Kosova Travel</title>
                <meta name="description" content="Faqja që kërkuat nuk ekziston. Kthehuni në faqen kryesore të Kosova Travel." />
            </Helmet>

            <div className="not-found-page">
                <div className="not-found-content">
                    <span className="not-found-icon">🗺️</span>
                    <h1>404</h1>
                    <h2>Faqja nuk u gjet</h2>
                    <p>
                        Duket se keni humbur rrugën! Faqja që kërkuat nuk ekziston
                        ose është zhvendosur.
                    </p>
                    <Link to="/" className="btn-primary">
                        ← Kthehu në Faqen Kryesore
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage
