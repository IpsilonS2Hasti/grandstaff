import { useState } from "react";

export const useSignup = () => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(null);

    const signup = async (email, password, firstName, lastName, type) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://grandstaff.herokuapp.com/api/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                type: type
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

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}