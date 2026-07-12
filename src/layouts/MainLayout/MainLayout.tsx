import {Outlet} from 'react-router'
import {Footer} from '../Footer/Footer.tsx'
import {Header} from '../Header/Header.tsx'
import './MainLayout.css'

export function MainLayout() {
    return (
        <div className='main-layout'>
            <Header />
            <main className='main-block'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
