import { describe, beforeEach, afterEach } from 'ava-spec';
import sinon from 'sinon';
import templateService from './../../../lib/server/services/templateService';
import { dutrinkst } from '../../../lib/server/handlers/indexHandler';

describe('indexHandler.dutrinkst', (it) => {
  const
    ANY_STAGE = 'ANY_STAGE',
    ANY_HTML = 'ANY_HTML';

  beforeEach((t) => {
    sinon.stub(templateService, 'renderHtml').returns(ANY_HTML);
    t.context.cb = sinon.spy();
    dutrinkst({ stage: ANY_STAGE }, {}, t.context.cb);
  });

  afterEach(() => {
    templateService.renderHtml.restore();
  });

  it('calls templateService.renderHtml', (t) => {
    t.truthy(templateService.renderHtml.calledWith(ANY_STAGE));
  });

  it('calls callback with rendered HTML', (t) => {
    t.true(t.context.cb.calledWith(null, ANY_HTML), 'calls callback with rendered HTML');
  });
});

