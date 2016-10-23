'use strict';
import {renderHtml} from "../services/templateService"

module.exports.dutrinkst = (event, context, cb) => {

  cb(null, renderHtml(event.stage));
};
