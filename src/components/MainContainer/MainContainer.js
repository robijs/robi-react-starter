import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../config'
import Settings from '../../pages/Settings'
import './MainContainer.css'

export default function MainContainer({ title }) {
    
    return (
        <div className="maincontainer">
            <h2 className='title'>{title || 'test'}</h2>
            <Routes>
                {routes.filter(r => r.nav !== false).map(({ path, main }) => <Route key={path} path={path} element={main()} />)}
                <Route key="/Settings" path="/Settings" element={<Settings />} />
            </Routes>
        </div>
    );
}