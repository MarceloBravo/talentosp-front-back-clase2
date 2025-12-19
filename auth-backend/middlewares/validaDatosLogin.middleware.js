function validaDatosLogin(req, res, next) {
    const { email, password, host } = req.body;

    if (
        !email || 
        !password || 
        !host || 
        email.trim().length === 0 || 
        password.trim().length === 0 || 
        host.trim().length === 0
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Email, el password y el host son requeridos y no pueden estar vacíos.'
        });
    }

    next();
}

module.exports = validaDatosLogin;