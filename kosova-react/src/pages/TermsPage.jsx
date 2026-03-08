import { Helmet } from 'react-helmet-async'
import FadeInSection from '../components/FadeInSection'

function TermsPage() {
    return (
        <>
            <Helmet>
                <title>Kushtet e Përdorimit — Kosova Travel</title>
                <meta name="description" content="Kushtet dhe rregullat e përdorimit të platformës Kosova Travel. Informohuni mbi të drejtat dhe detyrimet tuaja si përdorues." />
                <meta property="og:title" content="Kushtet e Përdorimit — Kosova Travel" />
                <meta property="og:description" content="Rregullat dhe kushtet e përdorimit të faqes Kosova Travel." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://explore-ks.vercel.app/og-image.png" />
                <link rel="canonical" href="https://explore-ks.vercel.app/terms" />
            </Helmet>

            <div className="page-banner">
                <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <h1>Kushtet e Përdorimit</h1>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px' }}>
                        Rregullat dhe kushtet për vizitorët tanë.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="policy-content">
                        <FadeInSection>
                            <h2>1. Pranimi i Kushteve</h2>
                            <p>
                                Duke hyrë dhe përdorur faqen tonë, ju pranoni të jeni të lidhur me këto kushte të përdorimit.
                                Nëse nuk jeni dakord me ndonjë pjesë të këtyre kushteve, ju lutem mos e përdorni faqen tonë.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>2. Përdorimi i Shërbimit</h2>
                            <p>
                                Ju pranoni ta përdorni këtë faqe vetëm për qëllime të ligjshme dhe në një mënyrë që nuk shkel
                                të drejtat e askujt tjetër. Ju nuk duhet:
                            </p>
                            <ul>
                                <li>Të ngarkoni përmbajtje fyese ose të paligjshme.</li>
                                <li>Të ndërhyni në sigurinë e faqes.</li>
                                <li>Të mbledhni të dhëna të përdoruesve pa leje.</li>
                            </ul>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>3. Pronësia Intelektuale</h2>
                            <p>
                                E gjithë përmbajtja e publikuar në Kosova Travel (tekste, foto, logo, dizajn) është pronë e
                                Kosova Travel ose e bashkëpunëtorëve tanë dhe mbrohet nga ligjet e autorit.
                                Riprodhimi pa leje paraprake është i ndaluar.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>4. Llogaritë e Përdoruesve</h2>
                            <p>
                                Nëse krijoni një llogari, ju jeni përgjegjës për ruajtjen e konfidencialitetit të fjalëkalimit tuaj.
                                Ne kemi të drejtë të mbyllim llogaritë që shkelin rregullat tona.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>5. Kufizimi i Përgjegjësisë</h2>
                            <p>
                                Kosova Travel nuk mban përgjegjësi për ndonjë dëm indirekt që pason nga përdorimi i kësaj faqeje.
                                Informatat rreth destinacioneve mund të ndryshojnë dhe ne rekomandojmë gjithmonë verifikimin
                                e fundit para udhëtimit.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>6. Ligji i Zbatueshëm</h2>
                            <p>
                                Këto kushte rregullohen nga ligjet e Republikës së Kosovës. Çdo mosmarrëveshje do të
                                zgjidhet në gjykatat kompetente të Kosovës.
                            </p>
                        </FadeInSection>

                        <FadeInSection>
                            <h2>7. Ndryshimet në Kushte</h2>
                            <p>
                                Ne rezervojmë të drejtën për të ndryshuar këto kushte në çdo kohë. Ndryshimet do të hyjnë
                                në fuqi menjëherë pas publikimit të tyre në këtë faqe.
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

export default TermsPage
