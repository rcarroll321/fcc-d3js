//Data for Chart Two: Expected Grade
const chartTwoData = [
  {
    grade: 'A',
    value: 8,
  },
  {
    grade: 'B',
    value: 2,
  },
  {
    grade: 'C',
    value: 1,
  },
  {
    grade: 'D',
    value: 0,
  },
  {
    grade: 'F',
    value: 0,
  },
]

// Code for Chart Two

/*
Required Changes from chart1.js
svgContainer = #chart-two
interest = grade
data = chart2
*/

const svg2 = d3.select('.svg2')

const margin2 = 80
const width2 = 1000 - 2 * margin2
const height2 = 600 - 2 * margin2

const chart2 = svg2
  .append('g')
  .attr('transform', `translate(${margin}, ${margin})`)

const xScale2 = d3
  .scaleBand()
  .range([0, width2])
  .domain(chartTwoData.map(s => s.grade))
  .padding(0.4)

const yScale2 = d3
  .scaleLinear()
  .range([height2, 0])
  .domain([0, 10])

// vertical grid lines
// const makeXLines = () => d3.axisBottom()
//   .scale(xScale)

const makeYLines2 = () => d3.axisLeft().scale(yScale)

chart2
  .append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

chart2.append('g').call(d3.axisLeft(yScale))

// vertical grid lines
// chart.append('g')
//   .attr('class', 'grid')
//   .attr('transform', `translate(0, ${height})`)
//   .call(makeXLines()
//     .tickSize(-height, 0, 0)
//     .tickFormat('')
//   )

chart2
  .append('g')
  .attr('class', 'grid')
  .call(
    makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
  )

const barGroups2 = chart2
  .selectAll()
  .data(chartTwoData)
  .enter()
  .append('g')

barGroups2
  .append('rect')
  .attr('class', 'bar')
  .attr('x', g => xScale(g.grade))
  .attr('y', g => yScale(g.value))
  .attr('height', g => height - yScale(g.value))
  .attr('width', xScale.bandwidth())
  .on('mouseenter', function(actual, i) {
    d3.selectAll('.value').attr('opacity', 0)

    d3.select(this)
      .transition()
      .duration(300)
      .attr('opacity', 0.6)
      .attr('x', a => xScale(a.grade) - 5)
      .attr('width', xScale.bandwidth() + 10)

    const y = yScale(actual.value)

    line = chart2
      .append('line')
      .attr('id', 'limit')
      .attr('x1', 0)
      .attr('y1', y)
      .attr('x2', width)
      .attr('y2', y)

    barGroups2
      .append('text')
      .attr('class', 'divergence')
      .attr('x', a => xScale(a.grade) + xScale.bandwidth() / 2)
      .attr('y', a => yScale(a.value) + 30)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .text((a, idx) => {
        const divergence = a.value - actual.value

        let text = ''
        if (divergence > 0) text += '+'
        text += `${divergence}`

        return idx !== i ? text : ''
      })
  })
  .on('mouseleave', function() {
    d3.selectAll('.value').attr('opacity', 1)

    d3.select(this)
      .transition()
      .duration(300)
      .attr('opacity', 1)
      .attr('x', a => xScale(a.grade))
      .attr('width', xScale.bandwidth())

    chart2.selectAll('#limit').remove()
    chart2.selectAll('.divergence').remove()
  })

barGroups
  .append('text')
  .attr('class', 'value')
  .attr('x', a => xScale(a.grade) + xScale.bandwidth() / 2)
  .attr('y', a => yScale(a.value) + 30)
  .attr('text-anchor', 'middle')
  .text(a => `${a.value}`)

svg2
  .append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('# of Respondents')

svg2
  .append('text')
  .attr('class', 'label')
  .attr('x', width / 2 + margin)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'middle')
  .text('Interest Level')

svg2
  .append('text')
  .attr('class', 'title')
  .attr('x', width / 2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('My expected grade in this class is...')

svg2
  .append('text')
  .attr('class', 'source')
  .attr('x', width - margin / 2)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'start')
  .text('Source: Krusty Klown College, 2018')
