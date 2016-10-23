import React, {Component} from 'react';
import SpinningArrow from './SpinningArrow/SpinningArrow';
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
        <SpinningArrow
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

      </div>
    );
  }
}
export default App;
