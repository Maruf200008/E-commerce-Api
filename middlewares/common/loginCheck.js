const jwt = require('jsonwebtoken');

const loginCheck = async (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if(cookies) {
        const token = cookies[process.env.COOKIE_NAME]
        const decode = jwt.verify(token, process.env.JWT_SECRICT);
        req.user = decode;
        next()
    }else {
        res.status(500).json({
            error : {
                common : {
                    message : "Authorization Faild!!"
                }
            }
        })

    }

}

module.exports = {
    loginCheck
}