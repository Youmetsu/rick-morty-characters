import {useId, useRef} from 'react'
import classNames from 'classnames'
import type {ChangeEvent, ReactElement} from 'react'
import CrossIcon from '../../assets/cross-icon.svg?react'
import './Input.css'

interface InputProps {
    value?: string
    label?: string
    variant?: 'underlined' | 'bordered'
    placeholder?: string
    renderDecoration?: () => ReactElement
    className?: string
    classNameContainer?: string
    onChange?: (value: string) => void
    dataTestIds?: {
        label: string
        inputContainer: string
        input: string
        crossIcon: string
    }
}

export function Input({
    value,
    label,
    variant = 'underlined',
    placeholder,
    renderDecoration,
    className,
    classNameContainer,
    onChange,
    dataTestIds,
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const inputId = useId()

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(e.currentTarget.value)
    }

    const handleClear = (): void => {
        inputRef.current?.focus()
        onChange?.('')
    }

    return (
        <div className={classNames('input', classNameContainer)}>
            {label && (
                <label
                    htmlFor={inputId}
                    className='input__label'
                    data-testid={dataTestIds?.label}
                >
                    {label}
                </label>
            )}
            <div
                className={classNames('input__container', {
                    'input__container--underlined': variant === 'underlined',
                    'input__container--bordered': variant === 'bordered',
                })}
                data-testid={dataTestIds?.inputContainer}
            >
                {renderDecoration && <div className='input__decoration'>{renderDecoration()}</div>}
                <input
                    ref={inputRef}
                    type='text'
                    id={inputId}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={handleChange}
                    className={classNames('input__field', className, {
                        'input__field--underlined': variant === 'underlined',
                        'text-bold-large': variant === 'underlined',
                        'input__field--bordered': variant === 'bordered',
                    })}
                    data-testid={dataTestIds?.input}
                />
                {value && (
                    <button
                        type='button'
                        aria-label='Очистить поле'
                        className={classNames('input__clear-icon', {
                            'input__clear-icon--underlined': variant === 'underlined',
                            'input__clear-icon--bordered': variant === 'bordered',
                        })}
                        onClick={handleClear}
                        data-testid={dataTestIds?.crossIcon}
                    >
                        <CrossIcon aria-hidden='true' />
                    </button>
                )}
            </div>
        </div>
    )
}
