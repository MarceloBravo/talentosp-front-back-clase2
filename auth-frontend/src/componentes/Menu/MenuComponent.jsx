import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import styles from './MenuComponent.module.css';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';

const MenuComponent = () => {
    const navigate = useNavigate();
    const { logout, isLoading, error } = useContext(AuthContext);


    const handleLogoutClic = async () => {
        try{
            await logout();
            navigate('/login');
        }catch(error){
            alert(error.message);
        }
    }

    if(error)alert(error.message);

  return (
    <>
        {isLoading && <SpinnerComponent/>}
        <header className={styles.header}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}><Link to="/">Home</Link></li>
                <li className={styles.menuItem}><Link to="/usuarios">Usuarios</Link></li>
            </ul>
            <button className={styles.logout} type='button' onClick={handleLogoutClic}>Cerrar session</button>
        </header>
    </>
  )
}

export default MenuComponent