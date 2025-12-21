import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SpinnerComponent } from '../../componentes/Spinner/SpinnerComponent';
import { LoginHook } from './LoginHook';
import styles from './LoginPage.module.css';

export const LoginPage = () => { 
   const {
      formLogin,
      errorsLogin,
      isLoading,
      rememberMe,
      setRememberMe,
      handleInputChange,
      handleSubmit
  } = LoginHook();
  

  return (
    <>
      {isLoading && <SpinnerComponent/>}
      <ToastContainer/>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formLogin.email}
                onChange={(e) => handleInputChange(e)}
                required
              />
              {errorsLogin.email && <label className="label-error">{errorsLogin.email}</label>}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formLogin.password}
                onChange={(e) => handleInputChange(e)}
                required
              />
              {errorsLogin.password && <label className="label-error">{errorsLogin.password}</label>}
            </div>
          </div>
          <button type="submit" className={styles.button}>Iniciar Sesión</button>
          <p className="rememberMe">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
            <label htmlFor="rememberMe">Recordarme</label>
          </p>
          <p className={styles.linkText}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </>
  );
};