import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import d3tip from 'd3-tip';
import './MarketCapPie.css';

class MarketCapPie extends Component {
  componentDidMount() {
    const tip = d3tip(d3)
      .attr('class', 'd3-tip')
      .html(d => `
      <span><strong>Market Cap: </strong>${d3.format(',.11r')(d.value)} EUR</span></br>
      <span><strong>Global Market Cap: </strong>${((d.value * 100) / totalMarketCap).toFixed(2)}%</span>
      `);
    const { totalMarketCap, currentMarketCap } = this.props;

    const data = [
      {
        value: totalMarketCap - currentMarketCap,
        color: '#2066A3',
      },
      {
        value: currentMarketCap,
        color: '#4DD9E8',
      },
    ];

    // dimensions

    const width = 160;
    const height = 160;
    const radius = width / 2;

    // arc generator
    const arc = d3.arc()
      .outerRadius(radius - 2)
      .innerRadius(radius - 22);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    // appending svg
    const svg = d3.select('.pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // appending group
    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc')
      .on('mouseover', tip.hide);

    // append tooltip
    svg.select('.arc:last-child').on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    g.append('path')
      .style('fill', d => d.data.color)
      .transition().delay((d, i) => i * 500)
      .duration(500)
      .attrTween('d', (d) => {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

    g.call(tip);
  }

  // TODO: add tooltip
  render() {
    return (
      <div>
        <div className="pie-chart" />
        <h3 className="pie-chart__title">
          Market Cap
        </h3>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  totalMarketCap: state.totalMarketCap,
});

export default connect(mapStateToProps)(MarketCapPie);
