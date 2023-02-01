import { useEffect } from "react";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => { // Complex state that you manipulate with actions
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { // Dispatch fn is passed an object which is then run through the reducer fn which based on it augments the state
        user: null
    });

    useEffect(() => { // When the AuthContextProvider first mounts get user token from browser
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) dispatch({ type: 'LOGIN', payload: user });
    }, []);

    console.log('AuthContext state:', state); // !!DON'T FORGET TO DELETE!!

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};