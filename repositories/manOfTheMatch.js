const db = require('../connection');

module.exports.getmanOfTheMatch = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT players.* FROM motf,players where motf.usn=players.usn", function(err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result);
          });
    });
}