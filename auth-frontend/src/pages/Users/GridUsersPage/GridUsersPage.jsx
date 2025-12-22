import MenuComponent from '../../../componentes/Menu/MenuComponent'
import { SpinnerComponent } from '../../../componentes/Spinner/SpinnerComponent';
import useGridUsersPage from './useGridUsersPage';
import styles from './GridUsersPage.module.css';


export const GridUsersPage = () => {
  const {
        loading,
        usersList,
        searchText,
        handleEditarClick,
        handleEliminarClick,
        handleBuscarClick,
        handlerInputBuscarChange,
        handleBuscarInputonKeyDown,
        handleNuevoClick
    } = useGridUsersPage();
  
  return (
    <>
      {loading && <SpinnerComponent/>}
      <MenuComponent />
      <div className={styles.gridUserPage}>
        <h2>Mantenedor de usuarios</h2>
        <div className={styles.toolbar}>
          <button className={styles.btnNuevo} onClick={handleNuevoClick}>Nuevo</button>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Buscar" value={searchText} onChange={(e) => handlerInputBuscarChange(e)} onKeyDown={handleBuscarInputonKeyDown}/>
            <button className={styles.btnBuscar} onClick={handleBuscarClick}>Buscar</button>
          </div>
        </div>
        <div className={styles.gridTontainer}>
          <table className={styles.gridTable}>
            <thead className={styles.gridHead}>
              <tr>
                <th>Nombre de usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className={styles.gridBody}>
              {usersList && usersList.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button className={styles.btnEditar} title='Editar' onClick={() => handleEditarClick(user.id)}>🖊️</button>
                    <button className={styles.btnEliminar} title='Eliminar' onClick={() => handleEliminarClick(user)}>✖️</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}