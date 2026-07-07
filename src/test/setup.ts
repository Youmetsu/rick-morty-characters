import {cleanup} from '@testing-library/react'
import {afterEach} from 'vitest'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    cleanup()
})

// jsdom не считает layout, getClientRects() всегда пустой -> tabbable из focus-trap-react
// решает, что фокусируемых узлов нет, и падает с "must have at least one tabbable node".
Element.prototype.getClientRects = () => {
    return [{width: 1, height: 1}] as unknown as DOMRectList
}
