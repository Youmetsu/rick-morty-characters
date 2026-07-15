import {useState} from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it} from 'vitest'
import {Input} from './Input.tsx'

const testIds = {
    label: 'input-label',
    inputContainer: 'input-container',
    input: 'input',
    crossIcon: 'input-cross-icon',
}

const placeholder = 'Placeholder'

function ControlledInput() {
    const [value, setValue] = useState('')

    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={setValue}
            dataTestIds={testIds}
        />
    )
}

describe('Input', () => {
    it('По умолчанию label отсутствует', () => {
        render(<Input dataTestIds={testIds} />)

        expect(screen.queryByTestId(testIds.label)).not.toBeInTheDocument()
    })

    it('Отображается label сверху', () => {
        render(
            <Input
                dataTestIds={testIds}
                label='test'
            />
        )

        expect(screen.queryByTestId(testIds.label)).toBeInTheDocument()
    })

    it('Отображается placeholder', () => {
        render(
            <Input
                dataTestIds={testIds}
                placeholder={placeholder}
            />
        )

        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
    })

    it('Отображается переданное значение', () => {
        render(
            <Input
                dataTestIds={testIds}
                value='test value'
            />
        )

        expect(screen.getByTestId(testIds.input)).toHaveValue('test value')
    })

    it('Отображается крестик для очистки после добавления текста', () => {
        render(
            <Input
                dataTestIds={testIds}
                value='test'
            />
        )

        expect(screen.queryByTestId(testIds.crossIcon)).toBeInTheDocument()
    })

    it('Значение input изменяется', async () => {
        const user = userEvent.setup()

        render(<ControlledInput />)

        const input = screen.getByPlaceholderText(placeholder)

        await user.type(input, 'test')

        expect(input).toHaveValue('test')
    })

    it('Поле очищается при нажатии на крестик', async () => {
        const user = userEvent.setup()

        render(<ControlledInput />)

        const input = screen.getByPlaceholderText(placeholder)

        await user.type(input, 'test')

        expect(screen.getByTestId(testIds.crossIcon)).toBeInTheDocument()

        await user.click(screen.getByTestId(testIds.crossIcon))

        expect(input).toHaveValue('')
        expect(screen.queryByTestId(testIds.crossIcon)).not.toBeInTheDocument()
    })

    it('Отображается по умолчанию вариант type=underline', () => {
        render(<Input dataTestIds={testIds} />)

        expect(screen.getByTestId(testIds.inputContainer)).toHaveClass('input__container--underlined')
        expect(screen.getByTestId(testIds.input)).toHaveClass('input__field--underlined')

        expect(screen.getByTestId(testIds.inputContainer)).not.toHaveClass('input__container--bordered')
        expect(screen.getByTestId(testIds.input)).not.toHaveClass('input__field--bordered')
    })

    it('Отображается вариант type=bordered', () => {
        render(
            <Input
                dataTestIds={testIds}
                variant='bordered'
            />
        )

        expect(screen.getByTestId(testIds.inputContainer)).toHaveClass('input__container--bordered')
        expect(screen.getByTestId(testIds.input)).toHaveClass('input__field--bordered')

        expect(screen.getByTestId(testIds.inputContainer)).not.toHaveClass('input__container--underlined')
        expect(screen.getByTestId(testIds.input)).not.toHaveClass('input__field--underlined')
    })

    it('По умолчанию кастомный элемент (decoration) отсутствует', () => {
        render(<Input dataTestIds={testIds} />)

        expect(screen.queryByTestId('decoration')).not.toBeInTheDocument()
    })

    it('Отображается кастомный элемент (decoration), если передан renderDecoration', () => {
        render(
            <Input
                dataTestIds={testIds}
                renderDecoration={() => <span data-testid='decoration'>icon</span>}
            />
        )

        expect(screen.getByTestId('decoration')).toBeInTheDocument()
    })

    it('Применяется кастомный className к корневому элементу', () => {
        const {container} = render(
            <Input
                dataTestIds={testIds}
                className='custom-class'
            />
        )

        expect(container.firstChild).toHaveClass('custom-class')
    })
})
