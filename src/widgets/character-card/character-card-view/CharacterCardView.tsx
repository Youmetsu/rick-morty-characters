import classNames from 'classnames'
import FavoriteIcon from '../../../assets/favorite-outline.svg?react'
import EditIcon from '../../../assets/pencil.svg?react'
import {Avatar} from '../../../components/avatar/Avatar.tsx'
import {StatusComponent} from '../../../components/status/StatusComponent.tsx'
import {STATUS_FILTER_VALUES} from '../../../constants/statusFilterValues.ts'
import {Status} from '../../../enums/status.ts'
import type {Character} from '../../../types/Character.ts'
import './CharacterCardView.css'

interface CharCardViewProps {
    character: Character
    className?: string
    onEditClick?: () => void
    onFavoriteClick?: () => void
}

export function CharacterCardView({character, className, onEditClick, onFavoriteClick}: CharCardViewProps) {
    const status = STATUS_FILTER_VALUES.find((item) => item === character.status) ?? Status.UNKNOWN

    return (
        <div className={classNames('character-card character-card-view', className)}>
            <Avatar
                src={character.image}
                alt={character.name}
            />

            <div className='character-card__info'>
                <a
                    href={`character/${character.id}`}
                    className='character-card-view__link field-underline text-bold-large text-wrapper'
                >
                    {character.name}
                </a>

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
                    <div className='text-small field-underline text-wrapper'>{character.location.name}</div>
                </div>

                <div className='character-card__info-field-block'>
                    <div className='text-bold-medium'>Status</div>
                    <div className='character-card-view__status-block'>
                        <div className='text-small field-bordered'>{character.status}</div>
                        <StatusComponent
                            status={status}
                            className='character-card-view__status-indicator'
                        />
                    </div>
                </div>
            </div>

            <button
                type='button'
                aria-label='Редактировать'
                className='character-card-view__edit-button'
                onClick={onEditClick}
            >
                <EditIcon />
            </button>
            <button
                type='button'
                aria-label='Добавить в избранное'
                className='character-card-view__favorite-button'
                onClick={onFavoriteClick}
            >
                <FavoriteIcon />
            </button>
        </div>
    )
}
