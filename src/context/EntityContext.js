import { createContext, useMemo } from "react";

export const EntityContext = createContext();

export const EntityContextProvider = ({ children, entityData }) => {

    return (
        <EntityContext.Provider value={entityData}>
            {children}
        </EntityContext.Provider>
    );
};