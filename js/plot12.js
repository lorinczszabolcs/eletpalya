function loadJSON(callback, filename) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

(function() {
  var d3 = Plotly.d3;

  // Plot1
  var WIDTH_IN_PERCENT_OF_PARENT = 98,
      HEIGHT_IN_PERCENT_OF_PARENT = 70;

  var gd3 = d3.select('#plot12')
      .style({
        width: WIDTH_IN_PERCENT_OF_PARENT + '%',
        height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh'
      });

  var gd = gd3.node();

  loadJSON(function(response) {
    var actualJSON = JSON.parse(response);
    var dictionary = {};
    for (elem in actualJSON)
    {
      dictionary[elem] = actualJSON[elem];
    }
    var data = Object.keys(dictionary).map(function(key){
      return dictionary[key];
    });

    console.log(data);

    var layout =
    {
      title: "<b class='text-center'>Tanulmányok csoportosítása lakhely szerint</b>",
      "font":
      {
        "color": 'rgb(255, 255, 255)',
      },
      "titlefont":
      {
        "size": 20,
        "color": 'rgb(238, 238, 238)',
      },
      "paper_bgcolor": 'rgb(34, 34, 34)',
      "plot_bgcolor": 'rgb(34, 34, 34)',
      "legend":
      {
        "bgcolor": 'rgb(34, 34, 34)',
        "font":
        {
          "color": 'rgb(238, 238, 238)',
        }
      },
      "xaxis":
      {
        "tickfont":
        {
          "color": 'rgb(238, 238, 238)',
        }
      },
      "yaxis":
      {
        "tickfont":
        {
          "color": 'rgb(238, 238, 238)',
        }
      },
      margin:
      {
        "l": 130,
        "r": 80,
        "t": 100,
        "b": 110,
        "pad": 0,
        "autoexpand": true,
      }
    };

    Plotly.plot(gd, data, layout);
  }, '../eletpalya/data/live_stud_heatmap.json');
  //}, '../data/live_stud_heatmap.json');

  window.onresize = function() {
    Plotly.Plots.resize(gd);
  };
})();
