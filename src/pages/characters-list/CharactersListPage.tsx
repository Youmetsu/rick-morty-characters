import {RimLogo} from '@/assets'
import {useCharacters} from '@/pages/characters-list/useCharacters.ts'
import {CharacterCard, FilterPanel} from '@/widgets'
import './CharactersListPage.css'

export function CharactersListPage() {
    const {characters, handleSaveCard} = useCharacters()

    return (
        <div className='character-list-page'>
            <RimLogo />

            <FilterPanel />

            <div className='characters'>
                {characters.map((item) => {
                    return (
                        <CharacterCard
                            key={item.id}
                            character={item}
                            onSave={handleSaveCard}
                        />
                    )
                })}
            </div>
        </div>
    )
}
