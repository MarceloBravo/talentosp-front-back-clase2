import { createContext, useState, useEffect } from 'react';
import { injectStore } from '../axios/axiosInstace'; // Importamos la función desde lainstancia de axios
import { getRefreshTokenFromCookie, saveRefreshToken } from '../utils/refreshToken';
import { jwtDecode } from 'jwt-decode';
import instance from '../axios/axiosInstace';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userSession, setUserSession] = useState({
        isLoggedIn: false,
        user: null,
        accessToken: null,
    });



    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);

        try{
            const response = await instance.post('/api/login', credentials);
            if(response?.data?.data?.access_token){
                const payload = jwtDecode(response.data.data.access_token);

                setUserSession({
                    isLoggedIn: true,
                    user: payload.user,
                    accessToken: response.data.data.access_token,
                });

                saveRefreshToken(response.data.data.refresh_token); // Guarda el refresh-token en cookie

            }else{
                setError('Usuario y o contraseña no válidos.');
            }
        }catch(error){
            setError(error.response?.data?.message || 'Error al autenticar al usuario');
        }finally{
            setIsLoading(false);
        }
        
    };

    const logout = async () => {
        setUserSession({
            isLoggedIn: false,
            user: null,
            accessToken: null,
        });
        const refreshToken = getRefreshTokenFromCookie();
        if(!refreshToken){
            return;
        }
        await instance.post('/api/logout', {refreshToken});
    };

  useEffect(() => {
    // Inyectamos las funciones que el interceptor de Axios necesita
    injectStore({
      setUserSession,
      logout, // Pasamos también el logout por si el refresh token falla
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userSession, setUserSession, login, logout, isLoading, error}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;