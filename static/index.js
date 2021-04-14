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



function makeChart(labels, datapoints){
  var thresholdValue = 5;
  var thresholdHighArray = new Array(18).fill(thresholdValue);
    var data = {
        labels: labels,
        datasets: [{
          label: 'Promoter Score',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          color: 'rgba(233, 69, 96, 1)',
          data: datapoints,
        },{
          label: 'Your Promoter',
          borderColor: '#000',
          color:'#000',
          backgroundColor: '#000',
          data: thresholdHighArray,
          
        }]
      };
    
    var config = {
        type: 'line',
        data,
        options: {
          plugins: {
            responsive: true,
            title: {
                display: true,
                text: 'Scores of Standard Promoters',
                padding: {
                  top: 10,
                  bottom: 30
                },
                font: {
                  size: 20,
                  family: "'Poppins','sans-serif'"
                }
            },
          },
        }
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
        family: "'Poppins','sans-serif'",
        color: '#6c757d',
        size: 20
      }
    },
    bargap: 0.01,
    plot_bgcolor:"rgba(22, 33, 62, 1);",
    paper_bgcolor:" rgba(22, 33, 62, 1);",
    annotations:[
      {text: 'Your Promoter',
      x: 7.56,
      y: 100},
    ]
  }

  var data1 = [trace];
  Plotly.newPlot('chart1', data1, layout, {displayModeBar: false, responsive: true});
}



