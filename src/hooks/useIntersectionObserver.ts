import {useEffect, useRef} from 'react'

interface UseIntersectionObserverOptions {
    enabled?: boolean
    rootMargin?: string
    threshold?: number
}

export function useIntersectionObserver(
    onIntersect: () => void,
    {enabled = true, rootMargin, threshold}: UseIntersectionObserverOptions = {}
) {
    const ref = useRef<HTMLDivElement>(null)
    const onIntersectRef = useRef(onIntersect)

    useEffect(() => {
        onIntersectRef.current = onIntersect
    }, [onIntersect])

    useEffect(() => {
        const element = ref.current
        if (!enabled || !element) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onIntersectRef.current()
                }
            },
            {rootMargin, threshold}
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [enabled, rootMargin, threshold])

    return {ref}
}
