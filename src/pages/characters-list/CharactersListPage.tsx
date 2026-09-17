import {useState} from 'react'
import {RimLogo} from '@/assets'
import {testCharacters} from '@/mocks/testCharactersMock.ts'
import type {Character} from '@/types/Character.ts'
import {FilterPanel} from '@/widgets/filter-panel/FilterPanel.tsx'
import {CharacterCard} from '../../widgets/character-card/CharacterCard.tsx'
import './CharactersListPage.css'

export function CharactersListPage() {
    const [characters, setCharacters] = useState(testCharacters)

    const handleSaveCard = (character: Character): void => {
        setCharacters((prevState) => prevState.map((item) => (item.id === character.id ? character : item)))
    }

    return (
        <div className='character-list-page'>
            <RimLogo />

            <FilterPanel />

            <div className='character-list-test'>
                <div className='character-list-test__card-info'>Карточка</div>
                <CharacterCard
                    character={characters[0]}
                    className='character-list-test__card'
                    onSave={handleSaveCard}
                />
                <div className='character-list-test__card-info'>Карточка в режиме редактирования</div>
                <CharacterCard
                    character={characters[1]}
                    className='character-list-test__card'
                />
            </div>
        </div>
    )
}
