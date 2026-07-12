import {Species} from '../enums/species.ts'
import type {Option} from '../types/Option.ts'

export const SPECIES_FILTER_VALUES: Option<Species>[] = [
    {id: 1, value: Species.HUMAN},
    {id: 2, value: Species.ALIEN},
    {id: 3, value: Species.HUMANOID},
    {id: 4, value: Species.BEN},
    {id: 5, value: Species.ROBOT},
]
