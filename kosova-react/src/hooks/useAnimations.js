import { useEffect, useState, useRef } from 'react'

/**
 * Hook to detect if an element is visible in viewport
 */
export function useInView(options = {}) {
    const ref = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true)
                observer.unobserve(entry.target)
            }
        }, { threshold: 0.15, ...options })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return [ref, isInView]
}

/**
 * Hook for animated counting
 */
export function useCountUp(target, duration = 2000, isActive = true) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isActive) return
        let start = 0
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [target, duration, isActive])

    return count
}

/**
 * Hook for dark mode with localStorage persistence
 */
export function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('kosova-dark-mode')
        return saved ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('kosova-dark-mode', JSON.stringify(isDark))
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }, [isDark])

    return [isDark, () => setIsDark(prev => !prev)]
}
