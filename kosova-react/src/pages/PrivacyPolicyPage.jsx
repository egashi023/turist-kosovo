import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

function PrivacyPolicyPage() {
    return (
        <>
            <Helmet>
                <title>Politika e Privatësisë — Kosova Travel</title>
                <meta name="description" content="Politika e privatësisë e Kosova Travel. Mësoni si i mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale." />
                <meta property="og:title" content="Politika e Privatësisë — Kosova Travel" />
                <meta property="og:description" content="Politika e privatësisë e Kosova Travel." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://kosovatravel.com/privacy-policy" />
            </Helmet>

            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h1>Politika e Privatësisë</h1>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Si i mbledhim dhe mbrojmë të dhënat tuaja.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="policy-content">
                        <FadeInSection>
                            <h2>1. Mbledhja e të Dhënave</h2>
                            <p>
                                Kosova Travel mbledh informata personale vetëm kur ju na i jepni vullnetarisht
                                përmes formularëve të kontaktit ose regjistrimit. Të dhënat që mund të mbledhim përfshijnë:
                            </p>
                            <ul>
                                <li>Emrin dhe mbiemrin</li>
                                <li>Adresën e emailit</li>
                                <li>Mesazhet që na dërgoni përmes formularit të kontaktit</li>
                                <li>Të dhëna teknike si adresa IP, lloji i shfletuesit, dhe kohëzgjatja e vizitës</li>
                            </ul>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>2. Përdorimi i Cookies</h2>
                            <p>
                                Faqja jonë përdor cookies për të përmirësuar përvojën tuaj të shfletimit. Cookies janë
                                skedarë të vegjël teksti që ruhen në pajisjen tuaj. Ne përdorim:
                            </p>
                            <ul>
                                <li><strong>Cookies funksionale:</strong> Për të ruajtur preferencat tuaja (p.sh. dark mode)</li>
                                <li><strong>Cookies analitike:</strong> Për të kuptuar si përdoret faqja jonë</li>
                            </ul>
                            <p>Ju mund t'i çaktivizoni cookies nga cilësimet e shfletuesit tuaj.</p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>3. Analitika</h2>
                            <p>
                                Ne mund të përdorim shërbime analitike (si Google Analytics) për të analizuar trafikun
                                e faqes. Këto shërbime mbledhin të dhëna anonime për përdorimin e faqes.
                                Asnjë e dhënë personale nuk ndahet me palë të treta pa pëlqimin tuaj.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>4. Mbrojtja e të Dhënave</h2>
                            <p>
                                Ne marrim masa të arsyeshme teknike dhe organizative për të mbrojtur të dhënat tuaja
                                personale nga humbja, keqpërdorimi ose aksesi i paautorizuar.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>5. Fshirja e të Dhënave</h2>
                            <p>
                                Ju keni të drejtë të kërkoni fshirjen e të dhënave tuaja personale në çdo kohë.
                                Për të kërkuar fshirjen, na kontaktoni në:
                            </p>
                            <p><strong>📧 privacy@kosovatravel.com</strong></p>
                            <p>
                                Do të përpunojmë kërkesën tuaj brenda 30 ditëve pune dhe do t'ju konfirmojmë
                                fshirjen e të dhënave.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>6. Kontakti</h2>
                            <p>
                                Nëse keni pyetje rreth politikës sonë të privatësisë, na kontaktoni:
                            </p>
                            <ul>
                                <li>📧 Email: <strong>info@kosovatravel.com</strong></li>
                                <li>📞 Telefon: <strong>+383 44 123 456</strong></li>
                                <li>📍 Adresa: Rruga "Nëna Terezë", Nr. 50, 10000 Prishtinë, Kosovë</li>
                            </ul>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>7. Ndryshimet</h2>
                            <p>
                                Kjo politikë mund të përditësohet herë pas here. Ndryshimet do të publikohen në këtë faqe
                                me datën e përditësimit.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>
                                <em>Përditësuar së fundmi: Shkurt 2026</em>
                            </p>
                        </FadeInSection>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicyPage
