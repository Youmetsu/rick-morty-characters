import './Avatar.css'

interface AvatarProps {
    src: string
    alt?: string
}

export function Avatar({src, alt}: AvatarProps) {
    return (
        <div className='avatar-container'>
            <img
                src={src}
                alt={alt}
                className='avatar-image'
            />
        </div>
    )
}
