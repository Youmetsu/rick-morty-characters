import LoadingBig from '../../assets/loading-big.svg?react'
import LoadingSmall from '../../assets/loading-small.svg?react'
import './LoadingComponent.css'

interface LoadingComponentProps {
    size?: 'large' | 'small'
    text?: string
}

export function LoadingComponent({size = 'large', text}: LoadingComponentProps) {
    return (
        <div className='loader-container'>
            {size === 'large' ? <LoadingBig className='loader-image' /> : <LoadingSmall className='loader-image' />}
            {text && <div>{text}</div>}
        </div>
    )
}
