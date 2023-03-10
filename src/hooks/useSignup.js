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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
        }).catch(err => {
            setIsLoading(false);
            setError(err);
          });
        const json = await response.json();

        //EITHER THEN LOGIN THE USER OR HAVE DENKO MAKE SIGN UP RETURN TOKEN AND UID

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok){
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Update the auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}