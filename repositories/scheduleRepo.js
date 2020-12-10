const db = require('../connection');


module.exports.getSchedules = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM schedule WHERE DATE_FORMAT(date,'%d %b %y')", function(err, result, fields) {
            if (err) {
                reject(err);
            }
            resolve(result);
          });
    });
}