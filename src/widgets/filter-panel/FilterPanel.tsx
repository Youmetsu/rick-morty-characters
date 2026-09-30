import {SearchIcon} from '@/assets'
import {StatusComponent} from '@/components'
import {GENDER_FILTER_VALUES, SPECIES_FILTER_VALUES, STATUS_FILTER_VALUES} from '@/constants'
import type {Gender, Species, Status} from '@/enums'
import type {Filters} from '@/types'
import {Input, Select} from '@/ui-components'
import './FilterPanel.css'

interface FilterPanelProps {
    filters: Filters
    onSetSearchName: (value: string) => void
    onSetSpecies: (value: Species | null) => void
    onSetGender: (value: Gender | null) => void
    onSetStatus: (value: Status | null) => void
}

export function FilterPanel({filters, onSetSearchName, onSetSpecies, onSetGender, onSetStatus}: FilterPanelProps) {
    return (
        <div className='filters'>
            <Input
                placeholder='Filter by name...'
                classNameContainer='filters__element'
                variant='bordered'
                value={filters.searchName}
                renderDecoration={() => {
                    return <SearchIcon style={{paddingTop: 4}} />
                }}
                onChange={onSetSearchName}
            />

            <Select
                options={SPECIES_FILTER_VALUES}
                placeholder='Species'
                className='filters__element'
                value={filters.species}
                onSelect={onSetSpecies}
            />

            <Select
                options={GENDER_FILTER_VALUES}
                placeholder='Gender'
                className='filters__element'
                value={filters.gender}
                onSelect={onSetGender}
            />

            <Select
                options={STATUS_FILTER_VALUES}
                placeholder='Status'
                renderDecoration={(option) => {
                    return <StatusComponent status={option} />
                }}
                className='filters__element'
                value={filters.status}
                onSelect={onSetStatus}
            />
        </div>
    )
}
