const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {

    // middleware untuk generate token
    createToken : (dataUser) => {
        const token = jwt.sign({...dataUser}, process.env.SECRET_KEY_TOKEN, {
            expiresIn: '3h'
        });
        return token;
    },
    
    verifyToken: (req, res, next) => {
        const bearerToken = req.headers.authorization // kalo sukses = token / gagal = undefined
        if(!bearerToken){
            res.status(401).json({
                message: "Unauthorized"
            })
        }
        try {
            console.log(bearerToken);
            const token = bearerToken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
            if(decoded){
                next()
            }
        }
        catch(error){
            console.log(error);
            res.status(401).json({
                message: "Invalid signature"
            })
        }
    }
}