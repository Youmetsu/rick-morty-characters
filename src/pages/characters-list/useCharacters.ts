import {useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {getCharacters} from '@/api'
import {useDebouncedValue} from '@/hooks'
import type {Character, Filters} from '@/types'
import {getErrorMessage} from './getErrorMessage.ts'

interface UseCharactersParams {
    filters: Filters
}

const DEBOUNCE_DELAY_MS = 400

export function useCharacters({filters}: UseCharactersParams) {
    const [characters, setCharacters] = useState<Character[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [retryKey, setRetryKey] = useState(0)
    const debouncedFilters = useDebouncedValue(filters, DEBOUNCE_DELAY_MS)
    const [prevDebouncedFilters, setPrevDebouncedFilters] = useState(debouncedFilters)

    if (prevDebouncedFilters !== debouncedFilters) {
        setPrevDebouncedFilters(debouncedFilters)
        setPage(1)
        setCharacters([])
    }

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchData() {
            setIsLoading(true)
            setHasError(false)
            try {
                const response = await getCharacters({filters: debouncedFilters, page, signal: abortController.signal})
                setCharacters((prev) => {
                    return page === 1 ? response.data.results : [...prev, ...response.data.results]
                })
                setHasMore(Boolean(response.data.info.next))
            } catch (error) {
                if (axios.isCancel(error)) {
                    return
                }

                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    if (page === 1) {
                        setCharacters([])
                    }
                    setHasMore(false)
                    return
                }

                setHasError(true)
                toast.error(getErrorMessage(error))
            } finally {
                if (!abortController.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            abortController.abort()
        }
    }, [debouncedFilters, page, retryKey])

    const canLoadMore = hasMore && !isLoading && !hasError

    const loadMore = useCallback(() => {
        if (canLoadMore) {
            setPage((prev) => prev + 1)
        }
    }, [canLoadMore])

    const handleRetry = useCallback(() => {
        setRetryKey((prev) => prev + 1)
    }, [])

    const handleSaveCard = (character: Character): void => {
        setCharacters((prevState) => prevState.map((item) => (item.id === character.id ? character : item)))
    }

    return {
        canLoadMore,
        characters,
        handleSaveCard,
        hasError,
        hasMore,
        isLoading,
        loadMore,
        handleRetry,
    }
}
