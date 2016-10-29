import './SpinningArrow.styl';
import React, { Component } from 'react';

class SpinningArrow extends Component {

  calcRotationFromProps() {
    const { finalDegree } = this.props;
    return {
      transform: `rotate(${finalDegree}rad)`,
      WebkitTransform: `rotate(${finalDegree}rad)`,
    };
  }
  render() {
    const rotation = this.calcRotationFromProps();
    return (
      <div className="spinning-arrow">
        <img style={rotation} className="spinning-arrow-img" src="https://d2bd4hfewq4seu.cloudfront.net/images/arrow_left2.png" />
      </div>
    );
  }
}
export default SpinningArrow;
