export const Gender = {
    FEMALE: 'Female',
    MALE: 'Male',
    GENDERLESS: 'Genderless',
    UNKNOWN: 'Unknown',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]
