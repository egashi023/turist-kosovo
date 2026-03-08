import { useInView } from '../hooks/useAnimations'

function FadeInSection({ children, direction = 'up', delay = 0, className = '' }) {
    const [ref, isInView] = useInView()

    const directionStyles = {
        up: 'translateY(40px)',
        down: 'translateY(-40px)',
        left: 'translateX(-40px)',
        right: 'translateX(40px)',
        none: 'none',
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : directionStyles[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    )
}

export default FadeInSection
