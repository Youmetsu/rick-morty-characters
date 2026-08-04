import {useState} from 'react'
import type {Character} from '../../types/Character.ts'
import {CharacterCardEdit} from './character-card-edit/CharacterCardEdit.tsx'
import {CharacterCardView} from './character-card-view/CharacterCardView.tsx'
import './CharacterCard.css'

interface CharCardProps {
    character: Character
    className?: string
    onSave?: (character: Character) => void
    onFavoriteClick?: () => void
}

export function CharacterCard({character, className, onSave, onFavoriteClick}: CharCardProps) {
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [draft, setDraft] = useState<Character>(character)

    const handleEdit = () => {
        setDraft(character)
        setMode('edit')
    }

    const handleCancel = () => {
        setDraft(character)
        setMode('view')
    }

    const handleSave = () => {
        onSave?.(draft)
        setMode('view')
    }

    return mode === 'view' ? (
        <CharacterCardView
            character={character}
            className={className}
            onEditClick={handleEdit}
            onFavoriteClick={onFavoriteClick}
        />
    ) : (
        <CharacterCardEdit
            character={draft}
            className={className}
            onChange={setDraft}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    )
}
