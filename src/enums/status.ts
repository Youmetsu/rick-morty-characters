export const Status = {
    ALIVE: 'Alive',
    DEAD: 'Dead',
    UNKNOWN: 'Unknown',
} as const

export type Status = (typeof Status)[keyof typeof Status]
