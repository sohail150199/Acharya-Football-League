const db = require('../connection');

module.exports.getCoaches = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM coach", function(err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result);
          });
    });
}