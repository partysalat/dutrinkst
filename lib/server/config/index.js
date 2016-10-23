var Confidence = require('confidence');

var store = new Confidence.Store();
store.load(require("./config"));

module.exports.get = (path, stage)=> {
  stage = process.env.IS_OFFLINE ? "offline" : stage;
  return store.get(path, {stage: stage});
};