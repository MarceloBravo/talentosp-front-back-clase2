import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import styles from './MenuComponent.module.css';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';
import { toast, ToastContainer } from 'react-toastify';

const MenuComponent = () => {
    const navigate = useNavigate();
    const { logout, isLoading, error } = useContext(AuthContext);


    const handleLogoutClic = async () => {
        try{
            await logout();
            navigate('/login');
        }catch(error){
            toast.error(error.message);
        }
    }

    if(error)toast.error(error.message);

  return (
    <>
        {isLoading && <SpinnerComponent/>}
        <ToastContainer/>
        <header className={styles.header}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>Home</li>
                <li className={styles.menuItem}>Usuarios</li>
            </ul>
            <button className={styles.logout} type='button' onClick={handleLogoutClic}>Cerrar session</button>
        </header>
    </>
  )
}

export default MenuComponent