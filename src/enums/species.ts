export const Species = {
    HUMAN: 'Human',
    ALIEN: 'Alien',
    HUMANOID: 'Humanoid',
    BEN: 'Ben',
    ROBOT: 'Robot',
} as const

export type Species = (typeof Species)[keyof typeof Species]
