import { useReducer, useState } from "react";

export const useLogin = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://grandstaff.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).catch(err => {
            setIsLoading(false);
            setError(err);
          });
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.message);
        }

        if(response.ok){
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
}