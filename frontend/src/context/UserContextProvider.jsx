import { useState, useEffect } from 'react';
import userContext from './userContext';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ loading state

    useEffect(() => {
        verifyUser();
    }, []);

    const verifyUser = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(`${apiUrl}/auth/verify`, {
                method: "GET",
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok && result.user) {
                setUser(result.user);
            } else {
                setUser(null); // user not logged in
                // ✅ don't show toast here
            }
        } catch (error) {
            setUser(null);
            // ✅ don't show toast here
        } finally {
            setLoading(false);
        }
    };


    return (
        <userContext.Provider value={{ user, setUser, loading }}>
            {children}
        </userContext.Provider>
    )
};

export default UserContextProvider;