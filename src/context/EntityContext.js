import { createContext, useMemo, useState } from "react";

export const EntityContext = createContext();

export const EntityContextProvider = ({ children, entityData }) => {
    const [entityState, setEntityState] = useState(entityData);
    
    return (
        <EntityContext.Provider value={{...entityState, setEntityState}}>
            {children}
        </EntityContext.Provider>
    );
};