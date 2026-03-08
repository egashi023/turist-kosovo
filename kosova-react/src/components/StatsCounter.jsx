import { useInView, useCountUp } from '../hooks/useAnimations'

const stats = [
    { icon: '🏙️', value: 38, suffix: '+', label: 'Komuna' },
    { icon: '👥', value: 1800000, suffix: '', label: 'Banorë', format: true },
    { icon: '⛰️', value: 10, suffix: '+', label: 'Parqe Natyrore' },
    { icon: '🏛️', value: 1500, suffix: '+', label: 'Monumente Historike' },
]

function StatItem({ icon, value, suffix, label, format, isActive }) {
    const count = useCountUp(value, 2200, isActive)
    const display = format ? count.toLocaleString() : count

    return (
        <div className="stat-item">
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{display}{suffix}</div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

function StatsCounter() {
    const [ref, isInView] = useInView()

    return (
        <div className="stats-section" ref={ref}>
            <div className="container">
                <div className="stats-grid">
                    {stats.map(stat => (
                        <StatItem key={stat.label} {...stat} isActive={isInView} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatsCounter
