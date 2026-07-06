import Logo from '../../assets/logo.svg?react'
import Sun from '../../assets/sun.svg?react'
import './Header.css'

export function Header() {
    return (
        <header className='header'>
            <Logo className='header-logo' />
            <div className='settings-block'>
                <Sun className='theme-icon settings-icon' />
                <div className='language-mode settings-icon'>РУ</div>
            </div>
        </header>
    )
}
