import get from "lodash/get"
var config = {
  offline: {
    assets:{
      baseUrl: "http://localhost:9211"
    }
  },
  dev: {
    assets:{
      baseUrl: "https://d2bd4hfewq4seu.cloudfront.net"
    }
  }
};

module.exports.get = function (path, stage) {
  stage = process.env.IS_OFFLINE ? "offline" : stage;
  return get(config[stage], path);
};