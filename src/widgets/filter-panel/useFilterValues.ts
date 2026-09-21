import {useState} from 'react'
import type {Gender, Species, Status} from '@/enums'

export const useFilterValues = () => {
    const [searchName, setSearchName] = useState<string>('')
    const [species, setSpecies] = useState<Species | null>(null)
    const [gender, setGender] = useState<Gender | null>(null)
    const [status, setStatus] = useState<Status | null>(null)

    return {
        searchName,
        setSearchName,
        species,
        setSpecies,
        gender,
        setGender,
        status,
        setStatus,
    }
}
