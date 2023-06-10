const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cachingMiddleware = (req, res, next) => {
  const key = req.url;
  getAsync(key).then((result) => {
    if (result !== null) {
      logger.info(`Cache hit: ${key}`);
      res.send(JSON.parse(result));
    } else {
      logger.info(`Cache miss: ${key}`);
      res.sendResponse = res.send;
      res.send = (body) => {
        setAsync(key, JSON.stringify(body), 'EX', 60);
        res.sendResponse(body);
      };
      next();
    }
  }).catch(next);
};

module.exports = {
  cachingMiddleware,
};