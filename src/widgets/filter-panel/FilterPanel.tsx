import {GENDER_FILTER_VALUES} from '@/constants/genderFilterValues.ts'
import {SPECIES_FILTER_VALUES} from '@/constants/speciesFilterValues.ts'
import {STATUS_FILTER_VALUES} from '@/constants/statusFilterValues.ts'
import {Input, Select} from '@/ui-library'
import {useFilterValues} from '@/widgets/filter-panel/useFilterValues.ts'
import SearchIcon from '../../assets/search-icon.svg?react'
import {StatusComponent} from '../../components/status/StatusComponent.tsx'
import './FilterPanel.css'

export function FilterPanel() {
    const {searchName, setSearchName, species, setSpecies, gender, setGender, status, setStatus} = useFilterValues()

    return (
        <div className='filters'>
            <Input
                placeholder='Filter by name...'
                classNameContainer='filters__element'
                variant='bordered'
                value={searchName}
                renderDecoration={() => {
                    return <SearchIcon style={{paddingTop: 4}} />
                }}
                onChange={setSearchName}
            />

            <Select
                options={SPECIES_FILTER_VALUES}
                placeholder='Species'
                className='filters__element'
                value={species}
                onSelect={setSpecies}
            />

            <Select
                options={GENDER_FILTER_VALUES}
                placeholder='Gender'
                className='filters__element'
                value={gender}
                onSelect={setGender}
            />

            <Select
                options={STATUS_FILTER_VALUES}
                placeholder='Status'
                renderDecoration={(option) => {
                    return <StatusComponent status={option} />
                }}
                className='filters__element'
                value={status}
                onSelect={setStatus}
            />
        </div>
    )
}
