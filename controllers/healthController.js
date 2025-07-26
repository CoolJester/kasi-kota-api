exports.getHealthStatus = (req, res) => {
  console.log('The healthCheck called');
  res.json({ status: 'OK', message: 'API is healthy 🚀' });
};

exports.getPing = (req, res) => {
  console.log('The Ping called');
  res.json('Pong');
};
