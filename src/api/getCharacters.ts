import type {Character, Filters} from '@/types'
import {apiClient} from './client.ts'

interface GetCharactersResponse {
    info: {
        count: number
        next: string
        pages: number
        prev: string
    }
    results: Character[]
}

export async function getCharacters(abortSignal: AbortSignal, filters: Filters) {
    return apiClient.get<GetCharactersResponse>('/character', {
        signal: abortSignal,
        params: {
            name: filters.searchName || undefined,
            species: filters.species ?? undefined,
            gender: filters.gender ?? undefined,
            status: filters.status ?? undefined,
        },
    })
}
