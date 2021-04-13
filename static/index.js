var ctx = document.getElementById('chart').getContext('2d');

var labels, datapoints, scores;

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//for line graph of promoter scores
d3.csv('static/fixed_promoters.csv', function(promoters){
    labels = promoters.map(function(d) {return d.promoter_name});
    datapoints = promoters.map(function(d) {return d.score});
    makeChart(labels, datapoints);
});


//for histogram of all promoters in EPD
d3.csv('static/histogram-data.csv', function(promoters){
  scores = promoters.map(function(d) {return d.score});
  makeHistogram(scores);
});

// get the data
d3.csv("static/histogram-data.csv", function(data) {
  console.log(data);

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.score }), d3.max(data, function(d) { return +d.score })])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.score; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(50)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "rgba(233, 69, 96, 1)")

});

function makeChart(labels, datapoints){
    var data = {
        labels: labels,
        datasets: [{
          label: 'Promoter Score',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: datapoints,
        }]
      };
    
    var config = {
        type: 'line',
        data,
        options: {}
      };
    
    var myChart = new Chart(
        ctx,
        config
    );
}

//
function makeHistogram(x){
  var trace = {
    x: x,
    type: 'histogram',
      marker: {
        color: 'rgb(242, 141, 158)',
    }
  };

  var layout = {
    title: {
      text:'Frequency Distribution',
      font: {
        color: 'rgba(233, 69, 96, 1)'
      }},
    bargap: 0.01,
    plot_bgcolor:"rgba(22, 33, 62, 1);",
    paper_bgcolor:" rgba(22, 33, 62, 1);",
    colorway:"#ffffff"
  }

  var data1 = [trace];
  Plotly.newPlot('chart1', data1, layout, {displayModeBar: false, responsive: true});
}



