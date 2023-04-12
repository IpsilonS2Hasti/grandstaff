import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState('Empty');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        console.log(url);
        setLoading(true);
        axios.get(url, {
            headers: {'Authorization': 'Bearer ' + (user != null ? user.token : '0')}
        }).then(res => {
            setData(res.data);
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [url]);

    return{ data, loading, error };
}

export default useFetch;