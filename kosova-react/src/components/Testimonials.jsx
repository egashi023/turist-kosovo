import { useState, useEffect } from 'react'
import FadeInSection from './FadeInSection'

const testimonials = [
    {
        name: 'Anna M.',
        location: 'Gjermani',
        avatar: '👩‍💼',
        rating: 5,
        text: 'Kosova më surprizoi me bukurinë e saj! Prizreni ishte magjik, dhe njerëzit ishin shumë mikpritës. Do të kthehem patjetër!',
    },
    {
        name: 'Marco B.',
        location: 'Itali',
        avatar: '👨‍💻',
        rating: 5,
        text: 'Një përvojë e mrekullueshme! Natyra e Kosovës, veçanërisht Bjeshkët e Nemuna, janë thjesht fantastike. Udhëtim i paharrueshëm.',
    },
    {
        name: 'Sophie L.',
        location: 'Francë',
        avatar: '👩‍🎨',
        rating: 4,
        text: 'Kam vizituar shumë vende në Ballkan, por Kosova ka diçka të veçantë. Kultura, ushqimi dhe historia — të gjitha janë perfekte.',
    },
    {
        name: 'James W.',
        location: 'SHBA',
        avatar: '🧔',
        rating: 5,
        text: 'Prishtina ka energji të jashtëzakonshme! Kafenitë, muzeumet dhe jeta e natës — gjithçka ishte e shkëlqyer.',
    },
]

function Testimonials() {
    const [active, setActive] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActive(prev => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const t = testimonials[active]

    return (
        <FadeInSection>
            <div className="testimonials-section">
                <div className="container">
                    <div className="section-heading" style={{ textAlign: 'center' }}>
                        <h2>Çfarë Thonë Vizitorët</h2>
                        <p>Përvojat e turistëve nga e gjithë bota</p>
                    </div>

                    <div className="testimonial-card">
                        <div className="testimonial-quote">"</div>
                        <p className="testimonial-text">{t.text}</p>
                        <div className="testimonial-stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < t.rating ? 'star filled' : 'star'}>★</span>
                            ))}
                        </div>
                        <div className="testimonial-author">
                            <span className="testimonial-avatar">{t.avatar}</span>
                            <div>
                                <h5>{t.name}</h5>
                                <span>{t.location}</span>
                            </div>
                        </div>

                        <div className="testimonial-nav">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={i === active ? 'active' : ''}
                                    onClick={() => setActive(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </FadeInSection>
    )
}

export default Testimonials
