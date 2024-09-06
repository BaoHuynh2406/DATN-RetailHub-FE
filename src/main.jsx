import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyles from '@/components/GlobalStyles';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import App from '@/App.jsx';
import theme from '@/Theme';
import { store } from '@/redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StyledEngineProvider injectFirst>
        <GlobalStyles>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </GlobalStyles>
    </StyledEngineProvider>,
);
