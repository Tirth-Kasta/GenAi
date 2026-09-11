var jwt = require('jsonwebtoken');
const generateToken = async (data, expire) => {
    try {
        const token = await jwt.sign(
            data,
            process.env.JWT_SECRET,
            { expiresIn: expire }
        )
        return token
    } catch (error) {
        console.log(error);
    }
}

module.exports = generateToken;