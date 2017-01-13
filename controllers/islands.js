const Island = require('../models/island');

function islandsIndex(req, res){
  Island.find((err, islands) => {
    if (err) return res.sendStatus(500);
    console.log(islands)
    return res.status(200).json(islands);
  });
}

module.exports = {
  index: islandsIndex
};
