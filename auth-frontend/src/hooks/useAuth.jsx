import { useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    return {
        isAuthenticated,
        user,
        isLoading,
    }
}

export default useAuth