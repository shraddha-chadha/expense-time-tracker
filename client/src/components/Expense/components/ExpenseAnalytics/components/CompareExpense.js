import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import * as d3 from 'd3';
import '../../../../../styles.css';

const selector = '#compare-expenses-chart';
const response = [
  {
    "month": "Jan",
    "year1": 987,
    "year2": 567
  },
  {
    "month": "Feb",
    "year1": 398,
    "year2": 678
  },
  {
    "month": "March",
    "year1": 345,
    "year2": 564
  },
  {
    "month": "April",
    "year1": 321,
    "year2": 455
  },
  {
    "month": "May",
    "year1": 432,
    "year2": 790
  },
  {
    "month": "June",
    "year1": 789,
    "year2": 456
  },
  {
    "month": "July",
    "year1": 345,
    "year2": 322
  },
  {
    "month": "August",
    "year1": 300,
    "year2": 343
  },
  {
    "month": "September",
    "year1": 345,
    "year2": 355
  },
  {
    "month": "October",
    "year1": 345,
    "year2": 567
  },
  {
    "month": "November",
    "year1": 790,
    "year2": 654
  },
  {
    "month": "December",
    "year1": 900,
    "year2": 600
  }
];

const styles = {
  chartSvg: {
    marginLeft: '50%',
    transform: 'translate(-50%)'
  }
}
const useStyles = makeStyles(theme => ({
}));

const drawChart = () => {
  document.getElementById('compare-expenses-chart')
  let container = d3.select(selector),
    width = 520,
    height = 400,
    margin = { top: 30, right: 20, bottom: 30, left: 50 },
    barPadding = .2,
    axisTicks = { qty: 12, outerSize: 0, dateFormat: '%m' };

  let svg = container
    .append("svg")
    .attr("className","chartSvg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("margin-left", "-50%");

  let xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
  let xScale1 = d3.scaleBand();
  let yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
  let xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
  let yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

  xScale0.domain(response.map(d => d.month));
  xScale1.domain(['year1', 'year2']).range([0, xScale0.bandwidth()]);
  yScale.domain([0, d3.max(response, d => d.year1 > d.year2 ? d.year1 : d.year2)])

  let month = svg.selectAll(".month")
    .data(response)
    .enter().append("g")
    .attr("className", "month")
    .attr("transform", d => `translate(${xScale0(d.month)},0)`);

  /* Add year1 bars */
  month.selectAll(".bar.year1")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("className", "bar-year1")
    .style("fill", "#3F51B5")
    .attr("x", d => xScale1('year1'))
    .attr("y", d => yScale(d.year1))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.year1)
    });

  /* Add year2 bars */
  month.selectAll(".bar.year2")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("className", "bar-year2")
    .style("fill", "#9FA8DA")
    .attr("x", d => xScale1('year2'))
    .attr("y", d => yScale(d.year2))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.year2)
    });

  // Add the X Axis
  svg.append("g")
    .attr("className", "x-axis")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    
  // Add the Y Axis
  svg.append("g")
    .attr("className", "y-axis")
    .call(yAxis);

}
export default function CompareExpense(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {drawChart()}
    </div>
  );
}