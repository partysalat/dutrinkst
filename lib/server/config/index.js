import Confidence from 'confidence';
import config from './config';

const store = new Confidence.Store();

store.load(config);

function getConfig(path, currentState) {
  const stage = process.env.IS_OFFLINE ? 'offline' : currentState;
  return store.get(path, { stage });
}
export default { getConfig };
