import {LogoIcon, SunIcon} from '@/assets'
import './Header.css'

export function Header() {
    return (
        <header className='header'>
            <LogoIcon className='header-logo' />
            <div className='settings-block'>
                <SunIcon className='theme-icon settings-icon' />
                <div className='language-mode settings-icon'>РУ</div>
            </div>
        </header>
    )
}
