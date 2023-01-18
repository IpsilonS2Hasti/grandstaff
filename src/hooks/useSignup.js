import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, firstName, lastName) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8080/signup', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email, 
                password: password, 
                firstName: firstName, 
                lastName: lastName
            })
        });
        const json = await response.json();

        if(response.status === 500 || response.status === 422){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.status === 201){
            // Save the user to local storage
            console.log(json.userId);

            // Update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}