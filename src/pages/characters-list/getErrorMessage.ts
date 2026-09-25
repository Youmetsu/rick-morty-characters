import axios from 'axios'

export function getErrorMessage(error: unknown): string {
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
