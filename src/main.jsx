import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyles from '@/components/GlobalStyles';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';

import rootReducer from '@/redux';
import App from '@/App.jsx';
import theme from '@/Theme';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <GlobalStyles>
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </ThemeProvider>
            </GlobalStyles>
        </StyledEngineProvider>
    </React.StrictMode>,
);
