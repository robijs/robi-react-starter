import React from 'react'
import { Outlet } from 'react-router-dom'
import SubBar from '../../components/SubBar/SubBar'
import routes from './routes'
import './Settings.css'

export default function Settings({ title }) {
    return (
        <div className="Settings">
            <SubBar parentpath='Settings' routes={routes} />
            <div className='right-ctr'>
                <Outlet />
            </div>
        </div>
    );
}