import React, { Component } from 'react';
import './SpinningArrow.styl';

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
        <img role="presentation" style={rotation} className="spinning-arrow-img" src="https://d2bd4hfewq4seu.cloudfront.net/images/arrow_left2.png" />
      </div>
    );
  }
}

SpinningArrow.propTypes = {
  finalDegree: React.PropTypes.string,
};
export default SpinningArrow;
