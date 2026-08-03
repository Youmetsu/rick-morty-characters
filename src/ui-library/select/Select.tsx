import {type KeyboardEvent, type ReactElement, type ReactNode, useMemo, useRef, useState} from 'react'
import classNames from 'classnames'
import {FocusTrap} from 'focus-trap-react'
import ArrowDown from '../../assets/arrow-full-down.svg?react'
import './Select.css'

interface SelectProps<T extends ReactNode> {
    options: T[]
    value?: T | null
    size?: 'large' | 'small'
    placeholder?: string
    renderDecoration?: (option: T) => ReactElement
    className?: string
    onSelect?: (option: T | null) => void
    dataTestIds?: {
        button: string
        options: string
    }
}

export function Select<T extends ReactNode>({
    options,
    size = 'large',
    placeholder,
    renderDecoration,
    className,
    value,
    onSelect,
    dataTestIds,
}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false)
    const [isKeyboardNav, setIsKeyboardNav] = useState(false)
    const optionRefs = useRef<(HTMLLIElement | null)[]>([])
    const optionsListRef = useRef<HTMLUListElement | null>(null)

    // Хак для обновления initialFocus в focus-trap-react
    // focus-trap-react читает focusTrapOptions только один раз — в конструкторе,
    // поэтому initialFocus должна быть стабильной функцией (никогда не пересоздаваться),
    // которая находит выбранную опцию, запрашивая живой DOM в момент фактического вызова
    // — а не замыкается на value/options из того рендера, который случайно оказался первым.
    const getInitialFocusElement = useMemo(
        () => () => {
            const container = optionsListRef.current
            if (!container) {
                return false
            }

            return (
                container.querySelector<HTMLLIElement>('[role="option"][aria-selected="true"]') ??
                container.querySelector<HTMLLIElement>('[role="option"]') ??
                false
            )
        },
        []
    )

    const handleButtonKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter') {
            event.preventDefault()
            setIsKeyboardNav(true)
            setIsOpen(true)
        }
    }

    const handleKeyDown = (event: KeyboardEvent, option: T | null, index: number) => {
        switch (event.key) {
            case 'Enter':
            case ' ': {
                event.preventDefault()
                onSelect?.(option)
                setIsOpen(false)
                break
            }
            case 'ArrowDown': {
                event.preventDefault()
                setIsKeyboardNav(true)
                optionRefs.current[(index + 1) % options.length]?.focus()
                break
            }
            case 'ArrowUp': {
                event.preventDefault()
                setIsKeyboardNav(true)
                optionRefs.current[(index - 1 + options.length) % options.length]?.focus()
                break
            }
        }
    }

    const handleSelectValue = (option: T | null) => {
        onSelect?.(option)
        setIsOpen(false)
    }

    return (
        <FocusTrap
            active={isOpen}
            focusTrapOptions={{
                initialFocus: getInitialFocusElement,
                returnFocusOnDeactivate: false,
                escapeDeactivates: true,
                clickOutsideDeactivates: true,
                onDeactivate: () => setIsOpen(false),
            }}
        >
            <div
                className={classNames('select-container', className, {
                    select_large: size === 'large',
                    select_small: size === 'small',
                })}
            >
                <button
                    type='button'
                    tabIndex={isOpen ? -1 : 0}
                    data-testid={dataTestIds?.button}
                    className={classNames('select-button', {
                        select_large: size === 'large',
                        select_small: size === 'small',
                    })}
                    onClick={() => {
                        setIsKeyboardNav(false)
                        setIsOpen((prevState) => !prevState)
                    }}
                    onKeyDown={handleButtonKeyDown}
                >
                    <div
                        className={classNames('select-button_text', {
                            'select-button_text_large': size === 'large',
                            'select-button_text_small': size === 'small',
                            'text-small': size === 'small',
                        })}
                    >
                        {value ?? placeholder}
                        {value && renderDecoration?.(value)}
                    </div>
                    <ArrowDown
                        className={classNames({
                            'select-arrow-icon_large': size === 'large',
                            'select-arrow-icon_small': size === 'small',
                            'select-arrow-icon_closed': isOpen,
                        })}
                    />
                </button>
                {isOpen && (
                    <ul
                        ref={optionsListRef}
                        className={classNames('select-options', {
                            'select-options_large': size === 'large',
                            'select-options_small': size === 'small',
                            'select-options_keyboard-nav': isKeyboardNav,
                        })}
                        role='listbox'
                        data-testid={dataTestIds?.options}
                    >
                        {options.map((option, index) => (
                            <li
                                key={String(option)}
                                ref={(el) => {
                                    optionRefs.current[index] = el
                                }}
                                className={classNames('select-option', {
                                    'select-option__selected': option === value,
                                    'text-select-large': size === 'large',
                                    'text-small': size === 'small',
                                })}
                                role='option'
                                aria-selected={option === value}
                                tabIndex={0}
                                onClick={() => handleSelectValue(option)}
                                onKeyDown={(event) => handleKeyDown(event, option, index)}
                                onMouseMove={(event) => {
                                    setIsKeyboardNav(false)
                                    event.currentTarget.focus()
                                }}
                            >
                                <div>{option}</div>
                                {renderDecoration && renderDecoration(option)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </FocusTrap>
    )
}
