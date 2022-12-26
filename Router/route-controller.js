const getData = (req, res) => {
  res.send(`Getting Id: ${req.params.id} Logged in as: ${req.user.name}`);
};

module.exports = { getData };
