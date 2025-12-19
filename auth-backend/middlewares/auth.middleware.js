const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Acceso denegado. Token requerido.'
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRETS, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Token inválido o expirado.'
            });
        }

        req.user = decoded.user; // Agregar el usuario decodificado a req
        next();
    });
}

module.exports = authenticateToken;