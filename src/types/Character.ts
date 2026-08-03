import type {Gender} from '../enums/gender.ts'
import {Status} from '../enums/status.ts'
import type {CharLocation} from './CharLocation.ts'

export interface Character {
    id: number // The id of the character.
    name: string // The name of the character.
    status: Status // The status of the character ('Alive', 'Dead' or 'Unknown').
    species: string // The species of the character.
    type: string // The type or subspecies of the character.
    gender: Gender // The gender of the character ('Female', 'Male', 'Genderless' or 'Unknown').
    origin: CharLocation // Name and link to the character's origin location.
    location: CharLocation // Name and link to the character's last known location endpoint.
    image: string // Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
    episode: string[] // List of episodes in which this character appeared.
    url: string // Link to the character's own URL endpoint.
    created: string // Time at which the character was created in the database.
}
