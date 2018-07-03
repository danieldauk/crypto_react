import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import './MarketCapPie.css';

class MarketCapPie extends Component {
  componentDidMount() {
    const { totalMarketCap, currentMarketCap } = this.props;

    const data = [
      {
        value: totalMarketCap,
        color: '#2066A3',
      },
      {
        value: currentMarketCap,
        color: '#4DD9E8',
      },
    ];

    // dimensions

    const width = 200;
    const height = 200;
    const radius = width / 2;

    // arc generator
    const arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(radius / 2);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    // appending svg
    const svg = d3.select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // appending group
    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', d => d.data.color);
  }

  render() {
    return (
      <div id="pie-chart" />
    );
  }
}

const mapStateToProps = state => ({
  totalMarketCap: state.totalMarketCap,
});

export default connect(mapStateToProps)(MarketCapPie);
