var ctx = document.getElementById('chart').getContext('2d');

var labels, datapoints, scores;

var myScore = document.getElementById("hidden").value



//Graph shitt

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
  var thresholdValue = myScore;
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
          borderColor: '#fff',
          color:'#fff',
          backgroundColor: '#fff',
          data: thresholdHighArray,
          
        }]
      };
    
    var config = {
        type: 'line',
        data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
                display: true,
                text: 'Comparison with Lee et al. promoters',
                color: '#fff',
                padding: {
                  top: 10,
                  bottom: 30
                },
                font: {
                  size: 20,
                  family: "'Poppins','sans-serif'",
                  weight: 'normal'
                }
            },
            legend:{
              labels:{
                color:'#fff',
                font:{
                  family:"'Poppins', sans-serif"
                }
              }
            },
          },
          scales: {
            y: {
                title:{
                  display: true,
                  text:"-49 to 10 Scores",
                  color:'#fff',
                  font:{
                    size:14,
                    family:"'Poppins', sans-serif"
                  }
                },
                ticks: {
                    color: '#fff',
                    font:{
                      family:"'Poppins', sans-serif"
                    }
                },
            },
            x: {
                title:{
                  display: true,
                  text:"Promoters",
                  color:'#fff',
                  font:{
                    size:14,
                    family:"'Poppins', sans-serif"
                  }
                },
                ticks:{
                    color: '#fff',
                    font:{
                      family:"'Poppins', sans-serif"
                    }
                },
              }
          }
        }
      };

    var myChart = new Chart(
        ctx,
        config
    );
}

//for histogram
function makeHistogram(x){
  var trace = {
    x: x,
    type: 'histogram',
      marker: {
        color: '#fff',
    }
  };

  var layout = {
    title: {
      text:"EPD Promoters Comparison",
      xref:"paper",
      font: {
        family: "'Poppins','sans-serif'",
        color: '#fff',
        size: 20
      }
    },
    bargap: 0.01,
    plot_bgcolor:"rgba(22, 33, 62, 1);",
    paper_bgcolor:"rgba(22, 33, 62, 1);",
    annotations:[
      {text: 'Your Promoter',
        font:{
          color:'rgba(233, 69, 96, 1)',
          family:"'Poppins', sans-serif",
          size: 15
        },
      arrowcolor:'rgba(233, 69, 96, 1)',
      x: myScore,
      y: 30},
    ],
    xaxis:{
      title:{
        text: 'Promoter Scores',
        font:{
          family:"'Poppins',sans-serif",
          color:'#fff',
          size: 14
        }
      },
      tickfont:{
        family:"'Poppins', sans-serif"
      },
      color:'#fff',
    },
    yaxis:{
      color:'#fff',
      tickfont:{
        family:"'Poppins', sans-serif"
      },
    }
  }

  var data1 = [trace];
  Plotly.newPlot('chart1', data1, layout, {displayModeBar: false, responsive: true});
}



