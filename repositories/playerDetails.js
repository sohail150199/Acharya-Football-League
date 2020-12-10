const db = require("../connection");

module.exports.getPlayers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM players", function(err, result, fields) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports.getTeamPlayers = teamID => {
  return new Promise((resolve, reject) => {
      db.query("SELECT * FROM players WHERE team_id=" + teamID,function(err, result, fields){
          if(err){
              reject(err);
          }else{
              resolve(result);
          }
      })
  });
};
