import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export const LoginHook = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [ formLogin, setFormLogin ] = useState({email: '', password: ''});
  const [ errorsLogin, setErrorsLogin ] = useState({email: '', password: ''});
  const { login, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if(e.target.value.trim().length === 0){
      setErrorsLogin({...errorsLogin, [e.target.name]: 'Este campo es requerido'});
    }else{
      setErrorsLogin({...errorsLogin, [e.target.name]: ''});
    }
    setFormLogin({...formLogin, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await login(formLogin)
        if(error){
          throw new Error(error);
        }
        navigate('/home');      
    }catch(error){
      toast.error(error.message);
      console.log(error);
    }
  };

  

  return {
      formLogin,
      errorsLogin,
      isLoading,
      error,
      rememberMe,
      setRememberMe,
      handleInputChange,
      handleSubmit
  }
}