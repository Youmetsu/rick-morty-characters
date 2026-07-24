import {useState} from 'react'
import type {Character} from '../../types/Character.ts'
import {CharCardEdit} from './char-card-edit/CharCardEdit.tsx'
import {CharCardView} from './char-card-view/CharCardView.tsx'
import './CharCard.css'

interface CharCardProps {
    character: Character
    className?: string
    onSave?: (character: Character) => void
    onFavoriteClick?: () => void
}

export function CharCard({character, className, onSave, onFavoriteClick}: CharCardProps) {
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
        <CharCardView
            character={character}
            className={className}
            onEditClick={handleEdit}
            onFavoriteClick={onFavoriteClick}
        />
    ) : (
        <CharCardEdit
            character={draft}
            className={className}
            onChange={setDraft}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    )
}
