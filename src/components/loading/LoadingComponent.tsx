import {LoadingBigIcon, LoadingSmallIcon} from '@/assets'
import './LoadingComponent.css'

interface LoadingComponentProps {
    size?: 'large' | 'small'
    text?: string
}

export function LoadingComponent({size = 'large', text}: LoadingComponentProps) {
    return (
        <div className='loader-container'>
            {size === 'large' ? (
                <LoadingBigIcon className='loader-image' />
            ) : (
                <LoadingSmallIcon className='loader-image' />
            )}
            {text && <div>{text}</div>}
        </div>
    )
}
