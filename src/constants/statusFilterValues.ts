import {Status} from '../enums/status.ts'
import type {Option} from '../types/Option.ts'

export const STATUS_FILTER_VALUES: Option<Status>[] = [
    {
        id: 1,
        value: Status.ALIVE,
    },
    {
        id: 2,
        value: Status.DEAD,
    },
    {
        id: 3,
        value: Status.UNKNOWN,
    },
]
