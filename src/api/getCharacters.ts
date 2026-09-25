import axios from 'axios'
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

function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) {
            return 'Network error. Please check your connection.'
        }

        switch (error.response.status) {
            case 404:
                return 'Characters not found.'
            case 500:
                return 'Server error. Please try again later.'
            default:
                return `Something went wrong (${error.response.status} ${error.message}).`
        }
    }

    return 'An unexpected error occurred.'
}

export async function getCharacters(abortSignal: AbortSignal): Promise<GetCharactersResponse | undefined> {
    try {
        const response = await apiClient.get<GetCharactersResponse>('/character', {signal: abortSignal})
        return response.data
    } catch (error) {
        if (axios.isCancel(error)) {
            return
        }
        throw new Error(getErrorMessage(error), {cause: error})
    }
}
