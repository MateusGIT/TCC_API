const services = require('../services');
const error = 'Invalid Data';

function get(req, res) {
  const name = req.params.name;

  if(!name) {
    res.status(422);
    res.send(error);
  }

  return services.company.search(name).then((result) => {
    res.send({
      res: result
    })
  });
}

module.exports = {
  get
} 