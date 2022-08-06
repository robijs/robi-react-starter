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
import Sidebar from './components/Sidebar'
import { app, lists, routes } from './config'
import './App.css'

export default function App() {
    const { pathname } = useLocation();
    const [pagetitle, setPageTitle] = useState(routes.find(route => route.path === pathname).title);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.fonts.load("1em bootstrap-icons").then(() => {
            setLoaded(true);
        });
    });

    useEffect(() => {
        setPageTitle(routes.find(route => route.path === pathname).title);
    }, [pathname]);

    const { name, title, localhost, localport, proxyport } = app;
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
        },
        components: {
            // Name of the component
            MuiButtonBase: {
                defaultProps: {
                    // The props to apply
                    // https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
                    disableRipple: true, // No more ripple, on the whole application!
                },
            },
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
            <AppContainer>
                <Sidebar appname={title || name} pathname={pathname} />
                <MainContainer title={pagetitle} lists={lists} />
            </AppContainer>
        </ThemeProvider>
    );
}