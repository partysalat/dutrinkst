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
        <img
          role="presentation"
          style={rotation}
          className={['spinning-arrow--img', this.props.started ? '' : 'spinning-arrow--img-touch-up'].join(' ')}
          src="https://d2bd4hfewq4seu.cloudfront.net/images/arrow_left2.png"
        />
      </div>
    );
  }
}

SpinningArrow.propTypes = {
  finalDegree: React.PropTypes.number,
  started: React.PropTypes.bool,
};
export default SpinningArrow;
