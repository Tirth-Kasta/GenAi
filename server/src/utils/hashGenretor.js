const bcrypt = require('bcrypt');
const hash = async (str) => {
    try {
        const hashPassword = await bcrypt.hash(str, 10)
        if (hashPassword) {
            return hashPassword
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = hash;