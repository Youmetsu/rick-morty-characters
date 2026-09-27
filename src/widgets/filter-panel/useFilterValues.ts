import {useState} from 'react'
import type {Gender, Species, Status} from '@/enums'
import type {Filters} from '@/types'

const INITIAL_FILTERS: Filters = {
    searchName: '',
    species: null,
    gender: null,
    status: null,
}

export function useFilterValues() {
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

    const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prevState) => ({...prevState, [key]: value}))
    }

    return {
        filters,
        setSearchName: (searchName: string) => setFilter('searchName', searchName),
        setSpecies: (species: Species | null) => setFilter('species', species),
        setGender: (gender: Gender | null) => setFilter('gender', gender),
        setStatus: (status: Status | null) => setFilter('status', status),
    }
}
