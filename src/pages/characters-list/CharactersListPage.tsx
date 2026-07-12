import {useState} from 'react'
import RimLogo from '../../assets/rim-logo.svg?react'
import {StatusComponent} from '../../components/status/StatusComponent.tsx'
import {SPECIES_FILTER_VALUES} from '../../constants/speciesFilterValues.ts'
import {STATUS_FILTER_VALUES} from '../../constants/statusFilterValues.ts'
import {Species} from '../../enums/species.ts'
import {Status} from '../../enums/status.ts'
import type {Option} from '../../types/Option.ts'
import {Select} from '../../ui-library/select/Select.tsx'
import './CharactersListPage.css'

export function CharactersListPage() {
    const [species, setSpecies] = useState<Option<Species> | null>(null)
    const [status, setStatus] = useState<Option<Status> | null>(null)

    const handleSpeciesSelect = (option: Option<Species> | null): void => {
        setSpecies(option)
    }

    const handleStatusSelect = (option: Option<Status> | null): void => {
        setStatus(option)
    }

    return (
        <div className='character-list-page'>
            <RimLogo />

            <div className='filters-block'>
                <Select
                    options={SPECIES_FILTER_VALUES}
                    placeholder='Species'
                    className='filter-element'
                    value={species}
                    onSelect={handleSpeciesSelect}
                />

                <Select
                    options={STATUS_FILTER_VALUES}
                    placeholder='Status'
                    renderDecoration={(option) => {
                        return <StatusComponent status={option.value} />
                    }}
                    className='filter-element'
                    value={status}
                    onSelect={handleStatusSelect}
                    size='small'
                />
            </div>
        </div>
    )
}
