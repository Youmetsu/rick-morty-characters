import type {Gender, Status} from '@/enums'
import type {CharLocation} from './CharLocation.ts'

export interface Character {
    id: number
    name: string
    /**
     * Статус персонажа ('Alive', 'Dead' or 'Unknown').
     */
    status: Status
    /**
     * Видовая принадлежность персонажа.
     */
    species: string
    /**
     * Тип или подвид персонажа.
     */
    type: string
    /**
     * Пол персонажа ('Female', 'Male', 'Genderless' or 'Unknown').
     */
    gender: Gender
    /**
     * Название и ссылка на место рождения персонажа.
     */
    origin: CharLocation
    /**
     * Название и ссылка на последнее известное местоположение.
     */
    location: CharLocation
    /**
     * Ссылка на изображение персонажа. Все изображения имеют размер 300x300 пикселей. Большинство из них портреты, так как они предназначены для использования в качестве аватаров.
     */
    image: string
    /**
     * Список эпизодов в которых появлялся персонаж
     */
    episode: string[]
    /**
     * Ссылка на собственный URL-адрес персонажа.
     */
    url: string
    /**
     * Время добавления персонажа в базу данных.
     */
    created: string
}
