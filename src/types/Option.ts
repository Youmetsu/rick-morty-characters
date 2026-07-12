import type {ReactNode} from 'react'

export interface Option<T extends ReactNode = string> {
    id: number
    value: T
}
