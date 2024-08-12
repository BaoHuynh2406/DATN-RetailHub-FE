// src/store/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [menuSelected, setMenuSelected] = useState(null);

    return <AppContext.Provider value={{ menuSelected, setMenuSelected }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
