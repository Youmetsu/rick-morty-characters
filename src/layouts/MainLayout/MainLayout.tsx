import {Outlet} from 'react-router'
import {Toaster} from 'react-hot-toast'
import {ErrorBoundary} from '@/components'
import {Footer} from '../Footer/Footer.tsx'
import {Header} from '../Header/Header.tsx'
import './MainLayout.css'

export function MainLayout() {
    return (
        <div className='main-layout'>
            <Header />
            <main className='main-block'>
                <ErrorBoundary fallback={<p>Something went wrong on this page.</p>}>
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
            <Toaster
                position='bottom-right'
                containerClassName='toast'
            />
        </div>
    )
}
