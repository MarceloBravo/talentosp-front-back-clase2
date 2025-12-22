import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useHttp } from '../../../hooks/useHttp';


const useGridUsersPage = () => {
    const { loading, data, request } = useHttp();
    const [ usersList, setUsersList ] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const navigate = useNavigate();

    const loadData = async () => {
        try{
            await request('/api/users');
        }catch(error){
            alert(error.message);
            console.log(error);
        }
        }

    useEffect(()=> {
        loadData();
        // eslint-disable-next-line
    },[])
    
    useEffect(()=> {
        console.log('Listado de usuarios',data);
        setUsersList(data?.data ?? []);
    }, [data])


    const handleEditarClick = (id) => {
        navigate(`/usuarios/${id}`);
    }

    const handleEliminarClick = async (user) => {
        try{
        const respuesta = window.confirm(`¿Deseas eliminar el usuario ${user.username}?`);
        if (respuesta) {
            await request(`/api/users/${user.id}`, 'DELETE');
            alert('Usuario eliminado correctamente');
            loadData();
        }

        }catch(error){
        alert(error.message);
        console.log(error);
        }
    }

    const handleBuscarClick = async () => {
        try{
        await request(`/api/users?search=${searchText}`);
        }catch(error){
        alert(error.message);
        console.log(error);
        }
    }

    const handlerInputBuscarChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleBuscarInputonKeyDown = (e) => {
        if(e.key === "Enter") {
        handleBuscarClick();
        }
    }

    const handleNuevoClick = () => {
        navigate('/usuarios/nuevo');
    }
    
    return {
        loading,
        usersList,
        searchText,
        handleEditarClick,
        handleEliminarClick,
        handleBuscarClick,
        handlerInputBuscarChange,
        handleBuscarInputonKeyDown,
        handleNuevoClick
    }
}

export default useGridUsersPage