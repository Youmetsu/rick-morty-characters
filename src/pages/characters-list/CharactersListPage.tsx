import {RimLogo} from '@/assets'
import {CharacterCard, FilterPanel} from '@/widgets'
import {useFilterValues} from '@/widgets/filter-panel/useFilterValues.ts'
import {useCharacters} from './useCharacters.ts'
import './CharactersListPage.css'

export function CharactersListPage() {
    const {filters, setSearchName, setSpecies, setGender, setStatus} = useFilterValues()
    const {characters, handleSaveCard} = useCharacters({filters})

    return (
        <div className='character-list-page'>
            <RimLogo />

            <FilterPanel
                filters={filters}
                onSetSearchName={setSearchName}
                onSetSpecies={setSpecies}
                onSetGender={setGender}
                onSetStatus={setStatus}
            />

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
