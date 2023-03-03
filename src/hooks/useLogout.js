
export const useLogout = () => {

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

    }

    return {logout};
};