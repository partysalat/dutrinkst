'use strict';
var templateService = require("./lib/server/services/templateService");
// Your first function handler

module.exports.dutrinkst = (event, context, cb) => {
  cb(null, templateService.renderHtml());
  //cb(null, {event,context});
};

// You can add more handlers here, and reference them in serverless.yml
