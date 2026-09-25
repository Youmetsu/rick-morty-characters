import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {getCharacters} from '@/api'
import type {Character} from '@/types'
import {getErrorMessage} from './getErrorMessage.ts'

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([])

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchData() {
            try {
                const response = await getCharacters(abortController.signal)
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
    }, [])

    const handleSaveCard = (character: Character): void => {
        setCharacters((prevState) => prevState.map((item) => (item.id === character.id ? character : item)))
    }

    return {
        characters,
        handleSaveCard,
    }
}
