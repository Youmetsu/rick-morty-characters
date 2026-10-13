import type {AxiosResponse} from 'axios'
import type {Character, Filters, Paginated} from '@/types'
import {apiClient} from './client.ts'

interface GetCharactersParams {
    filters: Filters
    page: number
    signal: AbortSignal
}

export async function getCharacters({
    filters,
    page,
    signal,
}: GetCharactersParams): Promise<AxiosResponse<Paginated<Character>>> {
    return apiClient.get<Paginated<Character>>('/character', {
        signal,
        params: {
            name: filters.searchName || undefined,
            species: filters.species ?? undefined,
            gender: filters.gender ?? undefined,
            status: filters.status ?? undefined,
            page,
        },
    })
}
