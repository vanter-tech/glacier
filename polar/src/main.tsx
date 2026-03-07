import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import './core/i18n.ts';
import {ThemeProvider} from "./core/ThemeProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <App/>
            </Suspense>
        </ThemeProvider>
    </StrictMode>,
)
