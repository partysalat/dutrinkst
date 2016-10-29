import templateService from '../services/templateService';

function dutrinkst(event, context, cb) {
  cb(null, templateService.renderHtml(event.stage));
}

export default { dutrinkst };
