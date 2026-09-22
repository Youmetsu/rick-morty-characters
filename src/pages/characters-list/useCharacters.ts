import {useEffect, useState} from 'react'
import {toast} from 'react-hot-toast'
import {getCharacters} from '@/api/getCharacters.ts'
import type {Character} from '@/types/Character.ts'

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([])

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchData() {
            try {
                const data = await getCharacters(abortController.signal)
                if (data) {
                    setCharacters(data.results)
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    console.error('Unknown error', error)
                }
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
