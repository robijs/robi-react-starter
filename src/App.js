import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sp } from '@pnp/sp'
import { Web } from '@pnp/sp/webs'
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

    if (window.location.origin === 'http://localhost:3000') {
        Web('http://localhost:8081/sites/DART');

        sp.setup({
            sp: {
                headers: {
                    Accept: 'application/json; odata=verbose',
                },
                baseUrl: 'http://localhost:8081/sites/DART', // SP rest proxy site
            },
        });
    } else {
        let baseUrl = window.location.href.split('/SiteAssets/')[0];

        Web(baseUrl);

        sp.setup({
            sp: {
                headers: {
                    Accept: 'application/json; odata=verbose',
                },
                baseUrl,
            },
        });
    }

    return (
        loaded &&
        <AppContainer>
            <Sidebar pathname={pathname} />
            <MainContainer title={title} />
        </AppContainer>
    );
}