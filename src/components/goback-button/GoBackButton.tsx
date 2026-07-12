import {useNavigate} from 'react-router'
import ArrowLeft from '../../assets/arrow-back-24px.svg?react'
import './GoBackButton.css'

export function GoBackButton() {
    const navigate = useNavigate()

    return (
        <button
            className='goback-button'
            onClick={() => navigate(-1)}
        >
            <ArrowLeft className='arrow-left' />
            Go back
        </button>
    )
}
