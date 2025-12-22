import MenuComponent from '../../../componentes/Menu/MenuComponent';
import { SpinnerComponent } from '../../../componentes/Spinner/SpinnerComponent';
import styles from './FormUsersPage.module.css';
import { useFormUsersPage } from './useFormUsersPage';

export const FormUsersPage = () => {
  const {
    id,
    NUEVO,
    loading,
    form,
    formErrors,
    handleInputChange,
    handleSubmit,
    handleBtnEliminar,
    handleBtnCancelar
  } = useFormUsersPage();



  return (
    <>
      {loading && <SpinnerComponent/>}
      <MenuComponent />
      <div>
        <h2>Mantenedor de usuarios</h2>
        <form className={styles.formUsuarios} onSubmit={handleSubmit}>
            
            <div className={styles.formGroup}>
                <label htmlFor="username">Nombre de usuario</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="text"
                    className={styles.inputField} 
                    id='username' 
                    name='username' 
                    placeholder='Nombre de usuario' 
                    maxLength="20"
                    required
                    value={form.username}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.username && <span className='label-error'>{formErrors.username}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="text"
                    className={styles.inputField} 
                    id='nombre' 
                    name='nombre' 
                    placeholder='Nombre' 
                    maxLength="20"
                    required
                    value={form.nombre}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.nombre && <span className='label-error'>{formErrors.nombre}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="apellido">Apellido</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="text"
                    className={styles.inputField} 
                    id='apellido' 
                    name='apellido' 
                    placeholder='Apellido' 
                    maxLength="20"
                    required
                    value={form.apellido}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.apellido && <span className='label-error'>{formErrors.apellido}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="email"
                    className={styles.inputField} 
                    id='email' 
                    name='email' 
                    placeholder='Nombre de usuario' 
                    maxLength="255"
                    required
                    value={form.email}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.email && <span className='label-error'>{formErrors.email}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="rol">Rol</label>
                <div className={styles.fieldContainer}>
                  <select  
                    className={styles.inputField} 
                    id='rol' 
                    name='rol' 
                    required
                    value={form.rol}
                    onChange={e => handleInputChange(e)}
                    >
                      <option value="" disabled>Seleccione un rol</option>
                      <option value="admin">admin</option>
                      <option value="user">administrativo</option>
                      <option value="guest">invitado</option>
                  </select>
                  {formErrors.rol && <span className='label-error'>{formErrors.rol}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="password">Contraseña</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="password"
                    className={styles.inputField} 
                    id='password' 
                    name='password' 
                    placeholder='Contraseña' 
                    maxLength="20"
                    required={id === '' || id === NUEVO}
                    value={form.password}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.password && <span className='label-error'>{formErrors.password}</span>}
                </div>
              </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="confirm_password">Confirmar contraseña</label>
                <div className={styles.fieldContainer}>
                  <input 
                    type="password"
                    className={styles.inputField} 
                    id='confirm_password' 
                    name='confirm_password' 
                    placeholder='Confirmación de contraseña' 
                    maxLength="20"
                    required={id === '' || id === NUEVO}
                    value={form.confirm_password}
                    onChange={e => handleInputChange(e)}
                    >
                  </input>
                  {formErrors.confirm_password && <span className='label-error'>{formErrors.confirm_password}</span>}
                </div>
    
              </div>
              <hr/>
              <div className={styles.buttonContent}>
                <button type="submit" className={styles.btnSuccess}>Grabar</button>
                <button type="button" className={styles.btnDelete + ` ${id === '' || id === NUEVO ? styles.btnDisabled : ''}`} onClick={handleBtnEliminar} disabled={id === '' || id === NUEVO}>Eliminar</button>
                <button type="button" className={styles.btnCancel} onClick={handleBtnCancelar}>Salir</button>
              </div>
        </form>
      </div>
    </>
  )
}