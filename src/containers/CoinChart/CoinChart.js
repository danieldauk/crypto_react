import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import * as actions from '../../store/actions';

import './CoinChart.css';

class CoinChart extends Component {
  componentDidMount() {
    const { coinDetails: data } = this.props;

    // margins and dimensions
    const margin = {
      top: 10, right: 10, bottom: 30, left: 50,
    };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // appending svg and chart group
    const svg = d3.select('#coinChart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // y scale
    const y = d3.scaleLinear()
      .domain([
        d3.min(data, d => d.close),
        d3.max(data, d => d.close)])
      .range([height, 0]);

    const yAxisCall = d3.axisLeft(y)
      .tickFormat(d => `$${d}`)
      .ticks(4);
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxisCall);

    // x scale
    const x = d3.scaleTime()
      .domain([
        new Date(d3.min(data, d => d.time * 1000)),
        new Date(d3.max(data, d => d.time * 1000)),
      ])
      .range([0, width - 80]);

    const xAxisCall = d3.axisBottom(x);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxisCall);

    // line
    const line = d3.line()
      .x(d => x(new Date(d.time * 1000)))
      .y(d => y(d.close));

    const t = d3.transition().duration(2000);

    g.append('path')
      .attr('class', 'chart-line')
      .attr('fill', 'none')
      .attr('stroke', 'rgb(212, 217, 227)')
      .attr('stroke-width', '2px')
      .attr('transform', 'translate(2)')
      .attr('d', line(data))
      .attr('stroke-dasharray', '2000')
      .attr('stroke-dashoffset', 2000)
      .transition(t)
      .attr('stroke-dashoffset', 0);


    // tooltip
    const focus = g.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke-dasharray', '10,10');

    focus.append('line')
      .attr('class', 'y-hover-line hover-line')
      .attr('x1', 0)
      .attr('x2', width - 80)
      .attr('stroke-dasharray', '10,10');

    focus.append('circle')
      .attr('class', 'hover-circle')
      .attr('r', 3);

    focus.append('text')
      .attr('x', 15)
      .attr('stroke-width', 0)
      .attr('fill', '#4DD9E8')
      .attr('dy', '.31em');

    g.append('rect')
      .attr('class', 'overlay')
      .attr('width', width - 80)
      .attr('height', height)
      .attr('fill', 'transparent')
      .on('mouseover', () => { focus.style('display', null); })
      .on('mouseout', () => { focus.style('display', 'none'); })
      .on('mousemove', mousemove);

    const bisectDate = d3.bisector(d => d.time * 1000).left;
    function mousemove() {
      let x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.time * 1000 > d1.time * 1000 - x0 ? d1 : d0;
      focus.attr('transform', `translate(${x(d.time * 1000)},${y(d.close)})`);
      focus.select('text').text(`${d.close} $`);
      focus.select('.x-hover-line').attr('y2', height - y(d.close));
      focus.select('.y-hover-line').attr('x2', -x(d.time * 1000));
    }
  }

  componentWillUnmount() {
    this.props.deleteCoinDetails();
  }

  render() {
    return (
      <div id="coinChart" />
    );
  }
}

const mapStateToProps = state => ({
  coinDetails: state.coinDetails,
});

export default connect(mapStateToProps, actions)(CoinChart);
