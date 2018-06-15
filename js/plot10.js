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

  var gd3 = d3.select('#plot10')
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
      title: "<b class='text-center'>Szakterületek csoportosítása tanulmányok szerint<br>(normalizálva)</b>",
      "titlefont":
      {
        "size": 20,
        "color": 'rgb(238, 238, 238)',
      },
      barmode: 'stack',
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
        tickformat: '%',
        range: [0,1],
        "tickfont":
        {
          "color": 'rgb(238, 238, 238)'
        }
      }
    };

    Plotly.plot(gd, data, layout);
  }, '../eletpalya/data/stud_work_normalized.json');
  //}, '../data/stud_work_normalized.json');

  window.onresize = function() {
    Plotly.Plots.resize(gd);
  };
})();
