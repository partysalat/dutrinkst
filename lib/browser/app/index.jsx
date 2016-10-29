import './index.styl'
import React, {Component} from 'react';
import SpinningArrow from './SpinningArrow/SpinningArrow';
import _ from "lodash"

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTouchMove = _.throttle(this.handleTouchMove, 50, {trailing: false});
    this.state = {
      started: false,
      lastDistance: 0,
      finalDegree: 0,
      lastTouch: {left: 0, top: 0}
    };
  }

  touchStart(e) {
    this.setState({
      started: true,
      lastTouch: this.calcCentralizedEvent(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    });
  }

  touchEnd() {
    this.setState({
      //initialDegree:this.state.finalDegree,
      started: false,
      finalDegree: this.state.finalDegree + this.state.lastDistance * 10
    });
  }


  calcCentralizedEvent(touchPointX, touchPointY) {
    let target = this.refs.swiping;
    let targetRect = target.getBoundingClientRect();
    return {
      left: touchPointX - (targetRect.left + targetRect.width * 0.5),
      top: (targetRect.top + targetRect.height * 0.5) - touchPointY,
    };
  }

  calcDistance(a, b) {
    return Math.sqrt((a.left - b.left) * (a.left - b.left) + (a.top - b.top) * (a.top - b.top));
  }

  normalize(a) {
    let abs = Math.sqrt(a.left * a.left + a.top * a.top);
    return {
      left: a.left / abs,
      top: a.top / abs
    }
  }

  getQuadrant(touch) {
    if (touch.left > 0 && touch.top > 0) {
      return 1
    }
    if (touch.left < 0 && touch.top > 0) {
      return 2
    }
    if (touch.left < 0 && touch.top < 0) {
      return 3
    }
    return 4
  }

  getDirection(newTouch, lastTouch) {
    if (Math.abs(newTouch.left - lastTouch.left) > Math.abs(newTouch.top - lastTouch.top)) {
      return newTouch.left > lastTouch.left ? "right" : "left";
    } else {
      return newTouch.top > lastTouch.top ? "up" : "down";
    }
  }

  handleTouchMove(x, y) {
    let newTouch = this.calcCentralizedEvent(x, y);
    let lastTouch = this.state.lastTouch;
    let distance = this.calcDistance(this.normalize(newTouch), this.normalize(this.state.lastTouch));
    let quadrant = this.getQuadrant(newTouch);
    let direction = this.getDirection(newTouch, lastTouch);
    let sign = this.getSign(direction, quadrant);
    this.setState({
      lastDistance: sign * distance,
      lastTouch: newTouch,
      finalDegree: this.state.finalDegree + sign * distance
    });
  }

  getSign(direction, quadrant) {
    var sign = 0;
    var signArr;
    if ((direction === "right")) {
      switch (quadrant) {
        case 1:
          sign = 1;
          break;
        case 2:
          sign = 1;
          break;
        case 3:
          sign = -1;
          break;
        case 4:
          sign = -1;
          break;
      }
    } else if ((direction === "left")) {
      switch (quadrant) {
        case 1:
          sign = -1;
          break;
        case 2:
          sign = -1;
          break;
        case 3:
          sign = 1;
          break;
        case 4:
          sign = 1;
          break;
      }
    } else if ((direction === "up")) {
      switch (quadrant) {
        case 1:
          sign = -1;
          break;
        case 2:
          sign = 1;
          break;
        case 3:
          sign = 1;
          break;
        case 4:
          sign = -1;
          break;
      }
    } else if ((direction === "down")) {
      switch (quadrant) {
        case 1:
          sign = 1;
          break;
        case 2:
          sign = -1;
          break;
        case 3:
          sign = -1;
          break;
        case 4:
          sign = 1;
          break;
      }
    }
    return sign;
  }

  touchMove(e) {
    this.handleTouchMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    e.nativeEvent.preventDefault();

  }

  touchCancel(e) {
    //console.log(e)
  }

  render() {
    return (
      <div>
        <h1>DU TRINKST!</h1>
        <div
          ref="swiping"
          className={["app", this.state.started ? "" : "touch-up paused"].join(" ")}
          onTouchCancel={this.touchCancel}
          onTouchEnd={this.touchEnd.bind(this)}
          onTouchMove={this.touchMove.bind(this)}
          onTouchStart={this.touchStart.bind(this)}>
          <SpinningArrow
            finalDegree={this.state.finalDegree}
          />

        </div>
      </div>
    );
  }
}
export default App;
