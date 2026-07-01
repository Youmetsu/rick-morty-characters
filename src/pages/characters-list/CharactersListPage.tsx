import {LoadingComponent} from '../../components/loading/LoadingComponent.tsx'
import RimLogo from '../../assets/rim-logo.svg?react'
import './CharactersListPage.css'

export function CharactersListPage() {
    return (
        <div className='character-list-page'>
            <RimLogo />
            <LoadingComponent text={'Loading...'} />
        </div>
    )
}
