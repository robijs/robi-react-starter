import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { sp } from '@pnp/sp'
import { Web } from '@pnp/sp/webs'
import '@pnp/sp/webs'
import '@pnp/sp/files'
import '@pnp/sp/items'
import '@pnp/sp/lists'
import '@pnp/sp/fields'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AppContainer from './components/AppContainer/AppContainer'
import MainContainer from './components/MainContainer/MainContainer'
import Sidebar from './components/Sidebar/Sidebar'
import { app, lists, routes } from './config'
import './App.css'

export default function App() {
    const { pathname } = useLocation();
    const [ title, setTitle ] = useState(routes.find(route => route.path === pathname).title);
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        document.fonts.load("1em bootstrap-icons").then(() => {
            setLoaded(true);
        });
    });

    useEffect(() => {
        setTitle(routes.find(route => route.path === pathname).title);
    }, [ pathname ]);
    
    const { name, localhost, localport, proxyport } = app;
    const baseUrl = window.location.origin === `${localhost}:${localport}` ? `${localhost}:${proxyport}/sites/${name}` : window.location.href.split('/SiteAssets/')[0];

    Web(baseUrl);

    sp.setup({
        sp: {
            headers: {
                Accept: 'application/json; odata=verbose',
            },
            baseUrl
        },
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#6A5ACD',
                light: '#6A5ACD'
            },
        }
    });

    return (
        loaded &&
        <ThemeProvider theme={theme}>
             <AppContainer>
                <Sidebar appname={name} pathname={pathname} />
                <MainContainer title={title} lists={lists} />
            </AppContainer>
        </ThemeProvider>
    );
}