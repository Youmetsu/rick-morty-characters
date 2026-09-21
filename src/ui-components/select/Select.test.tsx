import {useState} from 'react'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {Select} from './Select'

const options = ['value 1', 'value 2', 'value 3']

const placeholder = 'Выбери значение'

const testIds = {button: 'select-button', options: 'select-options'}

function ControlledSelect() {
    const [value, setValue] = useState<string | null>(null)
    return (
        <Select
            options={options}
            placeholder={placeholder}
            value={value}
            onSelect={setValue}
            dataTestIds={testIds}
        />
    )
}

describe('Select', () => {
    it('Отображается placeholder по умолчанию', () => {
        render(
            <Select
                options={options}
                placeholder={placeholder}
                dataTestIds={testIds}
            />
        )
        expect(screen.getByTestId(testIds.button)).toHaveTextContent(placeholder)
    })

    it('Отображается установленное значение', () => {
        render(
            <Select
                options={options}
                placeholder={placeholder}
                value={options[0]}
                dataTestIds={testIds}
            />
        )
        expect(screen.getByTestId(testIds.button)).toHaveTextContent('value 1')
    })

    it('Отображается placeholder после удаления значения', () => {
        const {rerender} = render(
            <Select
                options={options}
                placeholder={placeholder}
                value={options[0]}
                dataTestIds={testIds}
            />
        )
        expect(screen.getByTestId(testIds.button)).toHaveTextContent('value 1')

        rerender(
            <Select
                options={options}
                placeholder={placeholder}
                value={null}
                dataTestIds={testIds}
            />
        )
        expect(screen.getByTestId(testIds.button)).toHaveTextContent(placeholder)
    })

    it('Переключает отображаемое значение при выборе разных опций', async () => {
        const user = userEvent.setup()
        render(<ControlledSelect />)
        const button = screen.getByTestId(testIds.button)

        await user.click(button)
        await user.click(within(screen.getByTestId(testIds.options)).getByText('value 1'))
        expect(button).toHaveTextContent('value 1')

        await user.click(button)
        await user.click(within(screen.getByTestId(testIds.options)).getByText('value 2'))
        expect(button).toHaveTextContent('value 2')
    })

    it('Добавляет переданный className к контейнеру', () => {
        const {container} = render(
            <Select
                options={options}
                className='test-class'
            />
        )
        expect(container.querySelector('.select-container')).toHaveClass('test-class')
    })

    it('По умолчанию использует size large', () => {
        render(
            <Select
                options={options}
                dataTestIds={testIds}
            />
        )
        expect(screen.getByTestId(testIds.button)).toHaveClass('select_large')
    })

    it('Меняет размер на small через проп size', () => {
        render(
            <Select
                options={options}
                size='small'
                dataTestIds={testIds}
            />
        )
        const button = screen.getByTestId(testIds.button)
        expect(button).toHaveClass('select_small')
        expect(button).not.toHaveClass('select_large')
    })

    it('Рендерит кастомный элемент рядом с выбранным значением', () => {
        render(
            <Select
                options={options}
                value={options[0]}
                dataTestIds={testIds}
                renderDecoration={(option) => <div data-testid={`deco-${option}`}>deco</div>}
            />
        )
        expect(within(screen.getByTestId(testIds.button)).getByTestId('deco-value 1')).toBeInTheDocument()
    })

    it('Рендерит кастомный элемент для каждой опции в открытом списке', async () => {
        const user = userEvent.setup()
        render(
            <Select
                options={options}
                dataTestIds={testIds}
                renderDecoration={(option) => <div data-testid={`test-elem-${option}`}>test-elem</div>}
            />
        )
        await user.click(screen.getByTestId(testIds.button))
        const listbox = screen.getByTestId(testIds.options)
        for (const option of options) {
            expect(within(listbox).getByTestId(`test-elem-${option}`)).toBeInTheDocument()
        }
    })

    it('Вызывает onSelect с выбранной опцией', async () => {
        const user = userEvent.setup()
        const onSelect = vi.fn()
        render(
            <Select
                options={options}
                onSelect={onSelect}
                dataTestIds={testIds}
            />
        )

        await user.click(screen.getByTestId(testIds.button))
        await user.click(within(screen.getByTestId(testIds.options)).getByText('value 2'))
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenNthCalledWith(1, options[1])

        await user.click(screen.getByTestId(testIds.button))
        await user.click(within(screen.getByTestId(testIds.options)).getByText('value 3'))
        expect(onSelect).toHaveBeenCalledTimes(2)
        expect(onSelect).toHaveBeenNthCalledWith(2, options[2])
    })
})
