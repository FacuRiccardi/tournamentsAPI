require('dotenv').config();
const { SECRET, EXPIRES, ROUNDS } = process.env;

module.exports = {
    secret: SECRET,
    expires: EXPIRES,
    rounds: ROUNDS
};