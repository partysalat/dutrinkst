const Confidence = require('confidence');

const store = new Confidence.Store();
store.load(require('./config'));

module.exports.get = (path, currentState) => {
  const stage = process.env.IS_OFFLINE ? 'offline' : currentState;
  return store.get(path, { stage });
};
