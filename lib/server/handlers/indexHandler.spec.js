import { describe, beforeEach, afterEach } from 'ava-spec';
import sinon from 'sinon';
import templateService from './../../../lib/server/services/templateService';
import indexHandler from '../../../lib/server/handlers/indexHandler';

describe('indexHandler.dutrinkst', (it) => {
  const ANY_STAGE = 'ANY_STAGE';
  const ANY_HTML = 'ANY_HTML';
  let callback;
  beforeEach(() => {
    sinon.stub(templateService, 'renderHtml').returns(ANY_HTML);
    callback = sinon.spy();
    indexHandler.dutrinkst({ stage: ANY_STAGE }, {}, callback);
  });

  afterEach(() => {
    templateService.renderHtml.restore();
  });

  it('calls templateService.renderHtml', (t) => {
    t.truthy(templateService.renderHtml.calledWith(ANY_STAGE));
  });

  it('calls callback with rendered HTML', (t) => {
    t.true(callback.calledWith(null, ANY_HTML), 'calls callback with rendered HTML');
  });
});

