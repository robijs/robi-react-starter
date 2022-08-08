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
import AppContainer from './components/AppContainer'
import MainContainer from './components/MainContainer'
import Sidebar from './components/SideBar'
import CommandPalette from './components/ComandPalette/CommandPalette'
import { app, lists, routes } from './config'
import './App.css'

export default function App() {
    const { pathname } = useLocation();
    const [pagetitle, setPageTitle] = useState(routes.find(route => route.path === pathname)?.title);
    const [loaded, setLoaded] = useState(false);
    const [isDimmed, setIsDimmed] = useState(false);

    useEffect(() => {
        document.fonts.load("1em bootstrap-icons").then(() => {
            setLoaded(true);
        });
    });

    useEffect(() => {
        setPageTitle(routes.find(route => route.path === pathname)?.title);
    }, [pathname]);

    const { name, site, title, localhost, localport, proxyport } = app;
    const baseUrl = window.location.origin === `${localhost}:${localport}` ? `${localhost}:${proxyport}/sites/${site || name}` : window.location.href.split('/SiteAssets/')[0];

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
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            }
        },
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(',')
        }
    });

    return (
        loaded &&
        <ThemeProvider theme={theme}>
            <AppContainer isDimmed={isDimmed}>
                <Sidebar appname={title || name} pathname={pathname} />
                <MainContainer title={pagetitle} lists={lists} />
            </AppContainer>
            {process.env.NODE_ENV === 'development' && <CommandPalette setIsDimmed={setIsDimmed} />}
        </ThemeProvider>
    );
}