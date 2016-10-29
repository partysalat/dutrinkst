import React, { Component } from 'react';
import _ from 'lodash';
import SpinningArrow from './SpinningArrow/SpinningArrow';
import {calcCentralizedEvent,calcDistance} from './distanceService';
import './index.styl';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTouchMove = _.throttle(this.handleTouchMove, 50, { trailing: false });
    this.state = {
      started: false,
      lastDistance: 0,
      finalDegree: 0,
      lastTouch: { left: 0, top: 0 },
    };
  }

  touchStart(e) {
    this.setState({
      started: true,
      lastTouch: calcCentralizedEvent(this.refs.swiping,e.targetTouches[0].clientX, e.targetTouches[0].clientY),
    });
  }

  touchEnd() {
    this.setState({
      started: false,
      finalDegree: this.state.finalDegree + this.state.lastDistance * 10,
    });
  }


  handleTouchMove(x, y) {
    const newTouch = calcCentralizedEvent(this.refs.swiping,x,y);
    const distance = calcDistance(newTouch,this.state.lastTouch);
    this.setState({
      lastDistance: distance,
      lastTouch: newTouch,
      finalDegree: this.state.finalDegree + distance,
    });
  }


  touchMove(e) {
    this.handleTouchMove(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
    e.nativeEvent.preventDefault();
  }

  touchCancel(e) {
    // console.log(e)
  }

  render() {
    return (
      <div>
        <h1 className="headline">_du trinkst!</h1>
        <div
          ref="swiping"
          className={['app', this.state.started ? '' : 'touch-up paused'].join(' ')}
          onTouchCancel={this.touchCancel}
          onTouchEnd={this.touchEnd.bind(this)}
          onTouchMove={this.touchMove.bind(this)}
          onTouchStart={this.touchStart.bind(this)}
        >
          <SpinningArrow
            finalDegree={this.state.finalDegree}
          />

        </div>
      </div>
    );
  }
}
export default App;
