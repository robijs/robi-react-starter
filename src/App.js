import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sp } from '@pnp/sp'
import { Web } from '@pnp/sp/webs'
import '@pnp/sp/webs'
import '@pnp/sp/files'
import '@pnp/sp/items'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import './App.css'
import AppContainer from './components/AppContainer/AppContainer'
import MainContainer from './components/MainContainer/MainContainer'
import Sidebar from './components/Sidebar/Sidebar'
import routes from './Routes'

export default function App() {
    const { pathname } = useLocation();
    const [ title, setTitle ] = useState(routes.find(route => route.path === pathname).title);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        document.fonts.load("1em bootstrap-icons").then(() => {
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        setTitle(routes.find(route => route.path === pathname).title);
    }, [ pathname ]);
    
    const appName = 'App';
    const localhost = 'http://localhost';
    const localPort = '3000';
    const proxyPort = '8081';
    const baseUrl = window.location.origin === `${localhost}:${localPort}` ? `${localhost}:${proxyPort}/sites/${appName}` : window.location.href.split('/SiteAssets/')[0];

    Web(baseUrl);

    sp.setup({
        sp: {
            headers: {
                Accept: 'application/json; odata=verbose',
            },
            baseUrl
        },
    });

    return (
        loaded &&
        <AppContainer>
            <Sidebar pathname={pathname} />
            <MainContainer title={title} />
        </AppContainer>
    );
}