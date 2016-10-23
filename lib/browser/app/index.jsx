import React, {Component} from 'react';
import ProgressArc from './ProgressArc';
import SpinningArrow from './SpinningArrow';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {percentComplete: 0.3};
    this.togglePercent = this.togglePercent.bind(this);
  }

  togglePercent() {
    const percentage = this.state.percentComplete === 0.3 ? 0.7 : 0.3;
    this.setState({percentComplete: percentage});
  }

  render() {
    return (
      <div>
        <span>Fooo</span>
        <a href="#" onClick={this.togglePercent}>Toggle Arc</a>
        <ProgressArc
          height={300}
          width={300}
          innerRadius={100}
          outerRadius={110}
          id="d3-arc"
          duration={2000}
          backgroundColor="#e6e6e6"
          foregroundColor="#00ff00"
          percentComplete={this.state.percentComplete}
        />
        <SpinningArrow
          height={300}
          width={300}
          radius={100}
          id="d3-arc-1"
          duration={2000}
          arrowColor="#e6e6e6"
          percentComplete={this.state.percentComplete}
        />

      </div>
    );
  }
}
export default App;
