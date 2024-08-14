import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import GlobalStyles from '@/components/GlobalStyles';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {AppProvider } from '@/store/AppContext.jsx'

import theme from '@/Theme';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <GlobalStyles>
                <ThemeProvider theme={theme}>
                    <AppProvider>
                        <App />
                    </AppProvider>
                </ThemeProvider>
            </GlobalStyles>
        </StyledEngineProvider>
    </React.StrictMode>
);
