import {useState} from 'react'
import RimLogo from '../../assets/rim-logo.svg?react'
import SearchIcon from '../../assets/search-icon.svg?react'
import {StatusComponent} from '../../components/status/StatusComponent.tsx'
import {SPECIES_FILTER_VALUES} from '../../constants/speciesFilterValues.ts'
import {STATUS_FILTER_VALUES} from '../../constants/statusFilterValues.ts'
import {Species} from '../../enums/species.ts'
import {Status} from '../../enums/status.ts'
import type {Option} from '../../types/Option.ts'
import {Input} from '../../ui-library/input/Input.tsx'
import {Select} from '../../ui-library/select/Select.tsx'
import './CharactersListPage.css'

export function CharactersListPage() {
    const [species, setSpecies] = useState<Option<Species> | null>(null)
    const [status, setStatus] = useState<Option<Status> | null>(null)
    const [formString, setFormString] = useState<string>('Rick Sanchez')
    const [searchName, setSearchName] = useState<string>('')

    const handleSpeciesSelect = (option: Option<Species> | null): void => {
        setSpecies(option)
    }

    const handleStatusSelect = (option: Option<Status> | null): void => {
        setStatus(option)
    }

    const handleFormStringChange = (value: string): void => {
        setFormString(value)
    }

    const handleSearchNameChange = (value: string): void => {
        setSearchName(value)
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

            <div className='inputs-test'>
                <Input
                    label='Вариант для формы'
                    placeholder='Введите текст'
                    className='text-test-element'
                    value={formString}
                    onChange={handleFormStringChange}
                />

                <Input
                    label='Вариант для панели фильтров'
                    placeholder='Filter by name...'
                    className='text-test-element'
                    variant='bordered'
                    value={searchName}
                    renderDecoration={() => {
                        return <SearchIcon style={{paddingTop: 4}} />
                    }}
                    onChange={handleSearchNameChange}
                />

                <Input
                    label='Кнопка очищения поля'
                    placeholder='Filter by name...'
                    className='text-test-element'
                    variant='bordered'
                    value={'Some character'}
                    renderDecoration={() => {
                        return <SearchIcon style={{paddingTop: 4}} />
                    }}
                />
            </div>
        </div>
    )
}
