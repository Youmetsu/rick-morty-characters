import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import {MainLayout} from './layouts/MainLayout/MainLayout.tsx'
import {CharacterInfoPage} from './pages/character-info/CharacterInfoPage.tsx'
import {CharactersListPage} from './pages/characters-list/CharactersListPage.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route
                        path='/'
                        element={<CharactersListPage />}
                    />
                    <Route
                        path='/character/:id'
                        element={<CharacterInfoPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
