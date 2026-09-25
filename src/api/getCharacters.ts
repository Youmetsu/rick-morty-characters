import type {Character} from '@/types'
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

export async function getCharacters(abortSignal: AbortSignal) {
    return apiClient.get<GetCharactersResponse>('/character', {signal: abortSignal})
}
