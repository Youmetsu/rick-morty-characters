import classNames from 'classnames'
import FavoriteIcon from '../../../assets/favorite-outline.svg?react'
import EditIcon from '../../../assets/pencil.svg?react'
import {STATUS_FILTER_VALUES} from '../../../constants/statusFilterValues.ts'
import {Status} from '../../../enums/status.ts'
import type {Character} from '../../../types/Character.ts'
import {Avatar} from '../../avatar/Avatar.tsx'
import {StatusComponent} from '../../status/StatusComponent.tsx'
import './CharCardView.css'

interface CharCardViewProps {
    character: Character
    className?: string
    onEditClick?: () => void
    onFavoriteClick?: () => void
}

export function CharCardView({character, className, onEditClick, onFavoriteClick}: CharCardViewProps) {
    const status = STATUS_FILTER_VALUES.find((item) => item.value === character.status)?.value ?? Status.UNKNOWN

    return (
        <div className={classNames('char-card char-card-view', className)}>
            <Avatar
                src={character.image}
                alt={character.name}
            />

            <div className='char-card-info'>
                <div className='field-underline text-bold-large text-wrapper'>{character.name}</div>

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
                    <div className='text-small field-underline text-wrapper'>{character.location.name}</div>
                </div>

                <div className='char-card-info-field-block'>
                    <div className='text-bold-medium'>Status</div>
                    <div className='char-card-status-block'>
                        <div className='text-small field-bordered'>{character.status}</div>
                        <StatusComponent
                            status={status}
                            className='char-card-status-indicator'
                        />
                    </div>
                </div>
            </div>

            <button
                type='button'
                aria-label='Редактировать'
                className='char-card-view__edit-button'
                onClick={onEditClick}
            >
                <EditIcon />
            </button>
            <button
                type='button'
                aria-label='Добавить в избранное'
                className='char-card-view__favorite-button'
                onClick={onFavoriteClick}
            >
                <FavoriteIcon />
            </button>
        </div>
    )
}
