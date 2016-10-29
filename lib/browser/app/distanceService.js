/* eslint-disable no-mixed-operators*/
function calcCentralizedEvent(centerElement, touchPointX, touchPointY) {
  const target = centerElement;
  const targetRect = target.getBoundingClientRect();
  return {
    left: touchPointX - (targetRect.left + targetRect.width * 0.5),
    top: (targetRect.top + targetRect.height * 0.5) - touchPointY,
  };
}

function normalize(a) {
  const abs = Math.sqrt(a.left * a.left + a.top * a.top);
  return {
    left: a.left / abs,
    top: a.top / abs,
  };
}

function calcNormalizedDistance(aVector, bVector) {
  const a = normalize(aVector);
  const b = normalize(bVector);
  return Math.sqrt(
    (a.left - b.left) * (a.left - b.left) +
    (a.top - b.top) * (a.top - b.top)
  );
}

function getQuadrant(centralizedTouch) {
  if (centralizedTouch.left > 0 && centralizedTouch.top > 0) {
    return 1;
  }
  if (centralizedTouch.left < 0 && centralizedTouch.top > 0) {
    return 2;
  }
  if (centralizedTouch.left < 0 && centralizedTouch.top < 0) {
    return 3;
  }
  return 4;
}

function getDirection(newTouch, lastTouch) {
  if (Math.abs(newTouch.left - lastTouch.left) > Math.abs(newTouch.top - lastTouch.top)) {
    return newTouch.left > lastTouch.left ? 'right' : 'left';
  }
  return newTouch.top > lastTouch.top ? 'up' : 'down';
}


function getSign(direction, quadrant) {
  let signArr;
  if ((direction === 'right')) {
    signArr = [1, 1, -1, -1];
  } else if ((direction === 'left')) {
    signArr = [-1, -1, 1, 1];
  } else if ((direction === 'up')) {
    signArr = [-1, 1, 1, -1];
  } else if ((direction === 'down')) {
    signArr = [1, -1, -1, 1];
  }
  return signArr[quadrant - 1];
}
/* eslint-enable no-mixed-operators*/
function calcDistance(newTouch, lastTouch) {
  const distance = calcNormalizedDistance(newTouch, lastTouch);
  const quadrant = getQuadrant(newTouch);
  const direction = getDirection(newTouch, lastTouch);
  const sign = getSign(direction, quadrant);
  return distance * sign;
}

export { calcDistance, calcCentralizedEvent };
