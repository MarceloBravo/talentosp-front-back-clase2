const cnn = require('../db/connection');
const bcrypt = require('bcrypt');

class UsersModel{
    constructor(){
        this.db = cnn;
    }

    async getUsersAll(){
        const result = await cnn.query('SELECT id, username, nombre, apellido, rol, email, created_at FROM users');
        return result[0];
    }

    async getUserById(id){
        const result = await cnn.query('SELECT id, username, nombre, apellido, rol, email, created_at FROM users WHERE id = ?', [id]);        
        return result[0];
    }

    async createUser(data){
        const {username, nombre, apellido, rol, email, password} = data;
        const hashedPassword = await bcrypt.hash(password, 10); // Hashear la contraseña
        const result = await cnn.query('INSERT INTO users (username, nombre, apellido, rol, email, password) VALUES (?, ?, ?, ?, ?, ?)'
            , [username, nombre, apellido, rol, email, hashedPassword]);
        return result[0];
    }

    async updateUser(id, data){
        const {username, nombre, apellido, rol, email, password} = data;
    
        // Actualizar usuario
        const result = await cnn.query('UPDATE users SET username = ?, nombre = ?, apellido = ?, rol = ?, email = ? WHERE id = ?'
            , [username, nombre, apellido, rol, email, id]);
        
        // Actualizar password             
        if(password && password.trim().length > 0 && result.affectedRows === 1){
            const hashedPassword = await bcrypt.hash(password, 10); // Hashear la nueva contraseña
            await cnn.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
            return await this.getUserById(id)
        }
        return result[0];
    }

    async deleteUser(id){
        const result = await cnn.query('DELETE FROM users WHERE id = ?', [id]);
        return result[0];
    }

    async login(email){
        const [result] = await cnn.query('SELECT * FROM users WHERE email = ?', [email]);
        return result[0];
    }

    async refreshToken(id, refreshToken){
        const [result] = await cnn.query('SELECT * FROM users WHERE id = ? AND refresh_token = ?', [id, refreshToken]);
        return result[0];
    }

    async updateRefreshToken(id, refreshToken){
        const result = await cnn.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, id]);
        return result[0];
    }
}

module.exports = UsersModel;