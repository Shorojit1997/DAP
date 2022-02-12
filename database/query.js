
const connection = require('./Database');
const _query = (q, ar = []) => {
    return new Promise((resolve, reject) => {
        if (!ar.length) {
            connection.query(q, (error, result, field) => {
                if (result) {
                    resolve(result);
                }
                else if (error) {
                    reject(error);
                }
            })
        }
        else {
            connection.query(q, ar, (error, result, field) => {
                if (result) {
                    resolve(result);
                }
                else if (error) {
                    reject(error);
                }
            })
        }
    })
}

module.exports = _query;