import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {getCharacters} from '@/api'
import {useDebouncedValue} from '@/hooks'
import type {Character, Filters} from '@/types'
import {getErrorMessage} from './getErrorMessage.ts'

interface UseCharactersParams {
    filters: Filters
}

const DEBOUNCE_DELAY_MS = 300

export function useCharacters({filters}: UseCharactersParams) {
    const [characters, setCharacters] = useState<Character[]>([])
    const debouncedFilters = useDebouncedValue(filters, DEBOUNCE_DELAY_MS)

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchData() {
            try {
                const response = await getCharacters(abortController.signal, debouncedFilters)
                setCharacters(response.data.results)
            } catch (error) {
                if (axios.isCancel(error)) {
                    return
                }
                toast.error(getErrorMessage(error))
            }
        }

        fetchData()

        return () => {
            abortController.abort()
        }
    }, [debouncedFilters])

    const handleSaveCard = (character: Character): void => {
        setCharacters((prevState) => prevState.map((item) => (item.id === character.id ? character : item)))
    }

    return {
        characters,
        handleSaveCard,
    }
}
