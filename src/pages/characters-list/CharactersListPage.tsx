import {useState} from 'react'
import RimLogo from '../../assets/rim-logo.svg?react'
import SearchIcon from '../../assets/search-icon.svg?react'
import {CharCard} from '../../components/char-card/CharCard.tsx'
import {StatusComponent} from '../../components/status/StatusComponent.tsx'
import {SPECIES_FILTER_VALUES} from '../../constants/speciesFilterValues.ts'
import {STATUS_FILTER_VALUES} from '../../constants/statusFilterValues.ts'
import {Species} from '../../enums/species.ts'
import {Status} from '../../enums/status.ts'
import type {Character} from '../../types/Character.ts'
import type {Option} from '../../types/Option.ts'
import {Input} from '../../ui-library/input/Input.tsx'
import {Select} from '../../ui-library/select/Select.tsx'
import './CharactersListPage.css'

const testCharacters: Character[] = [
    {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            // ...
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
    },
    {
        id: 361,
        name: 'Toxic Rick',
        status: 'Dead',
        species: 'Humanoid',
        type: "Rick's Toxic Side",
        gender: 'Male',
        origin: {
            name: 'Alien Spa',
            url: 'https://rickandmortyapi.com/api/location/64',
        },
        location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/27'],
        url: 'https://rickandmortyapi.com/api/character/361',
        created: '2018-01-10T18:20:41.703Z',
    },
]

export function CharactersListPage() {
    const [species, setSpecies] = useState<Option<Species> | null>(null)
    const [status, setStatus] = useState<Option<Status> | null>(null)
    const [formString, setFormString] = useState<string>('Rick Sanchez')
    const [searchName, setSearchName] = useState<string>('')
    const [characters, setCharacters] = useState(testCharacters)

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

    const handleSaveCard = (character: Character): void => {
        setCharacters((prevState) => prevState.map((item) => (item.id === character.id ? character : item)))
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
                    classNameContainer='text-test-element'
                    value={formString}
                    onChange={handleFormStringChange}
                />

                <Input
                    label='Вариант для панели фильтров'
                    placeholder='Filter by name...'
                    classNameContainer='text-test-element'
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
                    classNameContainer='text-test-element'
                    variant='bordered'
                    value={'Some character'}
                    renderDecoration={() => {
                        return <SearchIcon style={{paddingTop: 4}} />
                    }}
                />
            </div>

            <div className='character-list-test'>
                <div className='character-list-test__card-info'>Карточка</div>
                <CharCard
                    character={characters[0]}
                    className='character-list-test__card'
                    onSave={handleSaveCard}
                />
                <div className='character-list-test__card-info'>Карточка в режиме редактирования</div>
                <CharCard
                    character={characters[1]}
                    className='character-list-test__card'
                />
            </div>
        </div>
    )
}
