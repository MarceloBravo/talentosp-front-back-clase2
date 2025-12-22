import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHttp } from '../../../hooks/useHttp';

export const useFormUsersPage = () => {
  const { loading, error, data, request } = useHttp();
  const params = useParams();
  const id = params.id ?? '';
  const navigate = useNavigate();
  const [ form, setForm ] = useState({
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
    confirm_password: ''
  });
  const [ formErrors, setFormErrors ] = useState({
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
    confirm_password: ''
  }); 
  const NUEVO = 'nuevo';


  useEffect(()=> {
    if(id.trim().length > 0 && id !== NUEVO){
      const buscarUsuario = async ()=> {
        try{
          const response = await request('/api/users/'+id)
          if(response.data.length === 0) return navigate('/usuarios');
          delete response.data[0].created_at;
          response.data[0].password = ''
          response.data[0].confirm_password = ''
          setForm(response.data[0])
        }catch(error){
          alert(error.message)
        }
      }

      buscarUsuario();
    }
    // eslint-disable-next-line
  },[id])

 


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(value.trim().length === 0){
        if(
          
          ( (id === '' || id === NUEVO) && ['password', 'confirm_password'].includes(name) ) || 
          !['password', 'confirm_password'].includes(name)
        ){
            setFormErrors({...formErrors, [name]: 'El campo no puede estar vacío'});
        }else{
          setFormErrors({...formErrors, [name]: ''});
        }

        }else if(name === 'password') {
            if(
              (value === form.confirm_password && form.confirm_password.trim().length > 0) || 
              ((id === '' || id === NUEVO) && ['password', 'confirm_password'].includes(name) && value.length === 0)
            ){
                setFormErrors({...formErrors, password: '', confirm_password: ''})
            }else{
                setFormErrors({...formErrors, [name]: value !== form.confirm_password ?'La contraseña y la confirmación de contraseña no son iguales' : ''})       
            }
            
        }else if(name === 'confirm_password'){
            if(value === form.password && form.password.trim().length > 0){
                setFormErrors({...formErrors, password: '', confirm_password: ''})
            }else{
                setFormErrors({...formErrors, [name]: value !== form.password ? 'La contraseña y la confirmación de contraseña no son iguales' : ''})
            }
        }else{
            setFormErrors({...formErrors, [name]: ''});
        }

        setForm({...form,[name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validaDatos()){
      alert('Datos incompletos o no válidos');
      return;
    }
    try{
      if(id === '' || id === NUEVO){
        await crearNuevoUsuario();
      }else{
        await actualizarUsuario();
      }
      navigate('/usuarios')
    }catch(error){
      alert(error.message)
    }
  }
  
  const crearNuevoUsuario = async () => {
    await request('/api/users', 'POST', form)
    alert('Usuario creado correctamente')
  }

  const actualizarUsuario = async () => {
    await request('/api/users/' + id, 'PUT', form)
    alert('Usuario actualizado correctamente')
  }

  const handleBtnEliminar = async () => {
    const resp = window.confirm("¿Desea eliminar el usuario");
    if(resp){
      try{
        await request('/api/users/' + id, 'DELETE')
        alert('Usuario eliminado exitosamente')
        navigate('/usuarios')        
      }catch(error){
        alert(error.message);
      }
    }
  }


  const handleBtnCancelar = () => {
    navigate('/usuarios')
  }


  const validaDatos = () => {
    if(
      form.username.trim().length === 0 ||
      form.username.length > 20 || 
      form.nombre.trim().length === 0 || 
      form.nombre.length > 20 ||
      form.apellido.trim().length === 0 || 
      form.apellido.length > 20 ||
      form.email.trim().length === 0 ||
      form.email.length > 255 ||
      form.rol === ''
    ){
      return false;
    }

    if(
      (id ==='' || id === NUEVO) && 
      (
        form.password.length === 0 || 
        form.password.length > 20 || 
        form.confirm_password.length === 0 || 
        form.confirm_password.length > 20
      )
    ){
      return false;
    }
    return true;
  }

  return {
    id,
    NUEVO,
    loading,
    error,
    data,
    form,
    formErrors,
    handleInputChange,
    handleSubmit,
    handleBtnEliminar,
    handleBtnCancelar
  }
}