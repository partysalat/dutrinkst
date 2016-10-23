import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3';
class ProgressArc extends Component {
  componentDidMount() {
    this.drawArc()
  }

  componentDidUpdate() {
    //this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.createArrowHead(context);
    this.setArrow(context);
    //this.setForeground(context);
    //this.updatePercent(context);
  }

  setContext() {
    const {height, width, id} = this.props;
    return d3.select(this.refs.arrow).append('svg')
      .attr('height', height)
      .attr('width', width)
      .attr('id', id)
    //.append('g')
    //.attr('transform', `translate(${height / 2}, ${width / 2})`);
  }

  createArrowHead(context) {
    var marker = context.append("defs").append("marker");
      marker.attr({
        "id": "arrow",
        "viewBox": "0 -5 10 10",
        "refX": 5,
        "refY": 0,
        "markerWidth": 4,
        "markerHeight": 4,
        "orient": "auto"
      });
    return marker.append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead");
  }

  setArrow(context) {
    var {width, height} = this.props;
    var margin = 5;
    let arrow =  context.append('line')
      arrow.attr({
        "class": "arrow",
        "marker-end": "url(#arrow)",
        "x1": width * 0.5,
        "y1": height * 0.5,
        "x2": margin + Math.random() * (width - margin * 2),
        "y2": margin + Math.random() * (height - margin * 2)
      });
    /*    .append("path")
     .attr("d", "M0,-5L10,0L0,5")
     .attr("class","arrowHead");*/
  }

  arc() {
    return d3.arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(0)
  }

  render() {
    return (
      <div ref="arrow"/>
    );
  }

  displayName: 'Arrow';
  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    radius: PropTypes.number,
    arrowColor: PropTypes.string,
    percentComplete: PropTypes.number
  }
}

export default ProgressArc;
