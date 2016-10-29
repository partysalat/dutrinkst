import './index.styl'
import React, {Component} from 'react';
import SpinningArrow from './SpinningArrow/SpinningArrow';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalDegree: 0,
      initialDegree: 0,
      lastDegree: 0
    };
  }

  touchStart(e) {
    //console.log(e)
    let eventCentralized = this.calcCentralizedEvent(e);
    this.setState({
      //initialDegree: this.state.initialDegree - this.calcRad(eventCentralized)
      initialDegree: this.state.finalDegree
    })
    console.log(this.state)
  }

  touchEnd(e) {
    //console.log(e)
    this.setState({lastDegree: this.state.finalDegree})
  }

  calcRad(eventCentralized) {
    let MAX = 0.01;
    let divisor = eventCentralized.left > 0 ? Math.max(eventCentralized.left, MAX) : Math.min(eventCentralized.left, -MAX);
    let calculatedRad = Math.atan(eventCentralized.top / divisor);
    if (eventCentralized.left > 0) {
      calculatedRad += Math.PI;
    }
    return calculatedRad;
  }

  calcCentralizedEvent(e) {
    let target = this.refs.swiping;
    let targetRect = target.getBoundingClientRect();
    let touchPointX = e.targetTouches[0].clientX;
    let touchPointY = e.targetTouches[0].clientY;
    return {
      left: touchPointX - (targetRect.left + targetRect.width * 0.5),
      top: (targetRect.top + targetRect.height * 0.5) - touchPointY,
    };
  }

  touchMove(e) {
    let eventCentralized = this.calcCentralizedEvent(e);
    this.setState({
      //initialDegree:this.state.finalDegree,
      finalDegree: -(this.state.initialDegree - this.calcRad(eventCentralized))
    })
    console.log(e.nativeEvent.preventDefault())

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
          className="app"
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
