import classNames from 'classnames'
import CheckMarkIcon from '../../../assets/check-mark.svg?react'
import CrossIcon from '../../../assets/cross-icon.svg?react'
import {Avatar} from '../../../components/avatar/Avatar.tsx'
import {StatusComponent} from '../../../components/status/StatusComponent.tsx'
import {STATUS_FILTER_VALUES} from '../../../constants/statusFilterValues.ts'
import type {Status} from '../../../enums/status.ts'
import type {Character} from '../../../types/Character.ts'
import {Input} from '../../../ui-library/input/Input.tsx'
import {Select} from '../../../ui-library/select/Select.tsx'
import './CharacterCardEdit.css'

interface CharacterCardEditProps {
    character: Character
    className?: string
    onChange: (character: Character) => void
    onSave: () => void
    onCancel: () => void
}

export function CharacterCardEdit({character, className, onChange, onSave, onCancel}: CharacterCardEditProps) {
    const handleNameChange = (value: string): void => {
        onChange({...character, name: value})
    }

    const handleLocationChange = (value: string): void => {
        onChange({...character, location: {...character.location, name: value}})
    }

    const handleStatusSelect = (status: Status | null): void => {
        if (status) {
            onChange({...character, status})
        }
    }

    return (
        <div className={classNames('character-card character-card-edit', className)}>
            <Avatar
                src={character.image}
                alt={character.name}
            />

            <div className='character-card__info'>
                <Input
                    placeholder='Введите текст'
                    value={character.name}
                    onChange={handleNameChange}
                />

                <div className='character-card__info-field-block'>
                    <div className='text-bold-medium'>Gender</div>
                    <div className='text-small'>{character.gender}</div>
                </div>

                <div className='character-card__info-field-block'>
                    <div className='text-bold-medium'>Species</div>
                    <div className='text-small'>{character.species}</div>
                </div>

                <div className='character-card__info-field-block'>
                    <div className='text-bold-medium'>Location</div>
                    <Input
                        placeholder='Введите текст'
                        className='text-small'
                        value={character.location.name}
                        onChange={handleLocationChange}
                    />
                </div>

                <div className='character-card__info-field-block'>
                    <div className='text-bold-medium'>Status</div>
                    <Select
                        options={STATUS_FILTER_VALUES}
                        placeholder='Status'
                        renderDecoration={(option) => {
                            return <StatusComponent status={option} />
                        }}
                        className='character-card-edit__status'
                        value={character.status}
                        onSelect={handleStatusSelect}
                        size='small'
                    />
                </div>
            </div>

            <button
                type='button'
                aria-label='Сохранить'
                className='character-card-edit__save-button'
                onClick={onSave}
            >
                <CheckMarkIcon />
            </button>
            <button
                type='button'
                aria-label='Отменить'
                className='character-card-edit__cancel-button'
                onClick={onCancel}
            >
                <CrossIcon />
            </button>
        </div>
    )
}
