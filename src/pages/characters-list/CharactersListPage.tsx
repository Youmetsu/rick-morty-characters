import {RetryIcon, RimLogo} from '@/assets'
import {LoadingComponent} from '@/components'
import {useIntersectionObserver} from '@/hooks'
import {CharacterCard, FilterPanel} from '@/widgets'
import {useFilterValues} from '@/widgets/filter-panel/useFilterValues.ts'
import {useCharacters} from './useCharacters.ts'
import './CharactersListPage.css'

export function CharactersListPage() {
    const {filters, setSearchName, setSpecies, setGender, setStatus} = useFilterValues()
    const {canLoadMore, characters, handleSaveCard, hasError, hasMore, isLoading, loadMore, handleRetry} =
        useCharacters({filters})
    const {ref} = useIntersectionObserver(loadMore, {enabled: canLoadMore})

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
            {hasMore && (
                <div
                    ref={ref}
                    style={{height: 1}}
                />
            )}
            {isLoading && <LoadingComponent />}
            {hasError && !isLoading && (
                <button
                    type='button'
                    aria-label='Retry'
                    className='retry-button'
                    onClick={handleRetry}
                >
                    <RetryIcon />
                </button>
            )}
        </div>
    )
}
