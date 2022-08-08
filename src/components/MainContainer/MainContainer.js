import classNames from 'classnames'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { routes } from '../../config'
import Settings from '../../pages/Settings'
import SettingsRoutes from '../../pages/Settings/routes.js'
import './MainContainer.css'

export default function MainContainer({ title }) {
    const { pathname } = useLocation();
    
    return (
        <div className={classNames('maincontainer', { 'no-padding': pathname.includes('/Settings') })}>
            {!pathname.includes('/Settings') ? <h2 className='title'>{title || ''}</h2> : ''}
            <Routes>
                {routes.filter(r => r.nav !== false).map(({ path, main }) => <Route key={path} path={path} element={main()} />)}
                <Route path="/Settings" element={<Settings />}>
                {
                    SettingsRoutes
                        .filter(r => r.nav !== false)
                        .map(({ path, title, main }, index) => {
                            return index === 0 ? <Route key={path} index element={main(title)} /> : <Route key={path} path={path} element={main(title)} />
                        })
                }
                </Route>
            </Routes>
        </div>
    );
}