import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import * as d3 from 'd3';
import * as actions from '../../store/actions';
import 'rc-slider/assets/index.css';
import './CoinChart.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class CoinChart extends Component {
  state = {
    chartParameters: [
    ],
    data: [],
  }

  componentDidMount() {
    const { coinDetails: data } = this.props;
    console.log(data.length);
    // margins and dimensions
    const calcWidth = document.getElementById('coinChart').offsetWidth;

    const margin = {
      top: 10, right: 0, bottom: 30, left: 60,
    };
    const width = calcWidth - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom - 40;

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
      .tickFormat(d => `${d}EUR`)
      .ticks(4);
    const yAxisGroup = g.append('g')
      .attr('class', 'y-axis')
      .call(yAxisCall);

    // x scale
    const x = d3.scaleTime()
      .domain([
        new Date(d3.min(data, d => d.time * 1000)),
        new Date(d3.max(data, d => d.time * 1000)),
      ])
      .range([0, width]);

    const xAxisCall = d3.axisBottom(x);
    if (window.matchMedia('(max-width:660px)').matches) {
      xAxisCall.ticks(3);
    }

    const xAxisGroup = g.append('g')
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
      .attr('x2', width)
      .attr('stroke-dasharray', '10,10');

    focus.append('circle')
      .attr('class', 'hover-circle')
      .attr('r', 3);

    focus.append('text')
      .attr('x', -80)
      .attr('y', -10)
      .attr('stroke-width', 0)
      .attr('fill', '#4DD9E8')
      .attr('dy', '.31em');

    g.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
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
      focus.select('text').text(`${d.close} EUR`);
      focus.select('.x-hover-line').attr('y2', height - y(d.close));
      focus.select('.y-hover-line').attr('x2', -x(d.time * 1000));
    }

    this.setState({ chartParameters: [x, y, svg, line, xAxisGroup, yAxisGroup] });
  }

  componentWillUnmount() {
    this.props.deleteCoinDetails();
  }

  updateChart = (data, x, y, svg, line, xAxisGroup, yAxisGroup) => {
    const t = d3.transition().duration(2000);
    // Scale the range of the data again
    y.domain([
      d3.min(data, d => d.close),
      d3.max(data, d => d.close)]);

    x.domain([
      new Date(d3.min(data, d => d.time * 1000)),
      new Date(d3.max(data, d => d.time * 1000)),
    ]);

    svg.select('.chart-line')
      .transition(t)
      .attr('d', line(data));

    const yAxisCall = d3.axisLeft(y)
      .tickFormat(d => `${d}EUR`)
      .ticks(4);

    const xAxisCall = d3.axisBottom(x)
      .ticks(5);
    if (window.matchMedia('(max-width:660px)').matches) {
      xAxisCall.ticks(3);
    }

    xAxisGroup.transition(t).call(xAxisCall);
    yAxisGroup.transition(t).call(yAxisCall);
  }

  rangeHandler = (value) => {
    this.updateChart(this.props.coinDetails.slice(value[0], value[1]), ...this.state.chartParameters);
  }

  render() {
    return (
      <div className="test">
        <div id="coinChart" />
        <Range
          onAfterChange={this.rangeHandler}
          tipFormatter={value => `${d3.timeFormat('%d/%m/%Y')(new Date(this.props.coinDetails[value].time * 1000))}`}
          min={0}
          max={1000}
          defaultValue={[0, 1000]}
        />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  coinDetails: state.coinDetails,
});

export default connect(mapStateToProps, actions)(CoinChart);
