import type {Gender, Species, Status} from '@/enums'

export interface Filters {
    searchName: string
    species: Species | null
    gender: Gender | null
    status: Status | null
}
