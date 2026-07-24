import {useState} from 'react'
import classNames from 'classnames'
import CheckMarkIcon from '../../../assets/check-mark.svg?react'
import CrossIcon from '../../../assets/cross-icon.svg?react'
import {STATUS_FILTER_VALUES} from '../../../constants/statusFilterValues.ts'
import {Status} from '../../../enums/status.ts'
import type {Character} from '../../../types/Character.ts'
import type {Option} from '../../../types/Option.ts'
import {Input} from '../../../ui-library/input/Input.tsx'
import {Select} from '../../../ui-library/select/Select.tsx'
import {Avatar} from '../../avatar/Avatar.tsx'
import {StatusComponent} from '../../status/StatusComponent.tsx'
import './CharCardEdit.css'

interface CharCardEditProps {
    character: Character
    className?: string
    onChange?: (character: Character) => void
    onSave?: () => void
    onCancel?: () => void
}

export function CharCardEdit({character, className, onChange, onSave, onCancel}: CharCardEditProps) {
    const [name, setName] = useState(character.name)
    const [location, setLocation] = useState(character.location.name)
    const [status, setStatus] = useState<Option<Status> | null>(
        STATUS_FILTER_VALUES.find((item) => item.value === character.status) || null
    )

    const handleNameChange = (value: string): void => {
        setName(value)
        onChange?.({...character, name: value})
    }

    const handleLocationChange = (value: string): void => {
        setLocation(value)
        onChange?.({...character, location: {...character.location, name: value}})
    }

    const handleStatusSelect = (option: Option<Status> | null): void => {
        setStatus(option)
        onChange?.({...character, status: option?.value ?? ''})
    }

    return (
        <div className={classNames('char-card char-card-edit', className)}>
            <Avatar
                src={character.image}
                alt={character.name}
            />

            <div className='char-card-info'>
                <Input
                    placeholder='Введите текст'
                    value={name}
                    onChange={handleNameChange}
                />

                <div className='char-card-info-field-block'>
                    <div className='text-bold-medium'>Gender</div>
                    <div className='text-small'>{character.gender}</div>
                </div>

                <div className='char-card-info-field-block'>
                    <div className='text-bold-medium'>Species</div>
                    <div className='text-small'>{character.species}</div>
                </div>

                <div className='char-card-info-field-block'>
                    <div className='text-bold-medium'>Location</div>
                    <Input
                        placeholder='Введите текст'
                        className='text-small'
                        value={location}
                        onChange={handleLocationChange}
                    />
                </div>

                <div className='char-card-info-field-block'>
                    <div className='text-bold-medium'>Status</div>
                    <Select
                        options={STATUS_FILTER_VALUES}
                        placeholder='Status'
                        renderDecoration={(option) => {
                            return <StatusComponent status={option.value} />
                        }}
                        className='char-card-edit__status'
                        value={status}
                        onSelect={handleStatusSelect}
                        size='small'
                    />
                </div>
            </div>

            <button
                type='button'
                aria-label='Сохранить'
                className='char-card-edit__favorite-button'
                onClick={onSave}
            >
                <CheckMarkIcon />
            </button>
            <button
                type='button'
                aria-label='Отменить'
                className='char-card-edit__edit-button'
                onClick={onCancel}
            >
                <CrossIcon />
            </button>
        </div>
    )
}
