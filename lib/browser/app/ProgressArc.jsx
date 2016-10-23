import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3';
class ProgressArc extends Component {
  componentDidMount() {
    this.drawArc()
  }
  oldVal = 0;
  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
    this.updatePercent(context);
  }

  redrawArc() {
    const context = d3.select(`#${this.props.id}`);
    context.remove();
    this.drawArc();
    this.oldVal = this.props.percentComplete;
  }

  setContext() {
    const {height, width, id} = this.props;
    return d3.select(this.refs.arc).append('svg')
      .attr('height', height)
      .attr('width', width)
      .attr('id', id)
      .append('g')
      .attr('transform', `translate(${height / 2}, ${width / 2})`);
  }

  setBackground(context) {
    return context.append('path')
      .datum({endAngle: this.tau})
      .style('fill', this.props.backgroundColor)
      .attr('d', this.arc());
  }

  setForeground(context) {
    return context.append('path')
      .datum({endAngle: this.tau * this.oldVal}) // <- (instead of tau * our percentage)
      .style('fill', this.props.foregroundColor)
      .attr('d', this.arc());
  }
  updatePercent(context) {
    return this.setForeground(context).transition()
      .duration(this.props.duration)
      .call(this.arcTween, this.tau * this.props.percentComplete, this.arc());
  }
  arcTween(transition, newAngle, arc) {
    transition.attrTween('d', (d) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      const newArc = d;
      return (t) => {
        newArc.endAngle = interpolate(t);
        return arc(newArc);
      };
    });
  }
  tau = Math.PI * 2;

  arc() {
    return d3.arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(0)
  }

  render() {
    return (
      <div ref="arc"/>
    );
  }

  displayName: 'ProgressArc';
  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    percentComplete: PropTypes.number
  }
}

export default ProgressArc;
