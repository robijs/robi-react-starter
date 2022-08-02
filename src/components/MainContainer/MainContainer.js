import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../../Routes'
import './MainContainer.css'

export default function MainContainer({ title }) {
    
    return (
        <div className="maincontainer">
            <h2 className='title'>{title || 'test'}</h2>
            <Routes>
                {routes.map(({ path, title, main }) => <Route key={path} path={path} element={main(title)} />)}
            </Routes>
        </div>
    );
}