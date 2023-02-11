// external import
const crypto = require('crypto');

// internat import 
const User = require('../model/People');

const passwordResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString("hex")
    User.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    User.passwordResetExpires = Date.now() + 30 * 60 * 1000 // 10 munites 
   
    return resetToken
    
}

module.exports = passwordResetToken;