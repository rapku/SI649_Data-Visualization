var dataset;
var length_data
var eventSelector
var reference = {'H_AB':['H', 'AB'],
                 'HR_G':['HR', 'G'],
                 'R_G':['R','G'],
                 'BB_G':['BB', 'G'],
                 'SO_G':['SO','G']
                }

var time = [1875, 2017] 

// select specific column of data
// value corresponds to value stored in button (see html)
var dataSelection = 0;

// constants defined here
var HITS_PER_AB = 0;
var HOME_RUNS_PER_GAME = 1;
var RUNS_PER_GAME = 2;
var WALKS_PER_GAME = 3;
var STRIKE_OUTS_PER_GAME = 4;
var OBP = 5;

//Events to look out for
var Change1 = 0
var Change2 = 1
var Strike = 2
var Roids = 3

// chart properties
var margin = {
        top: 80,
        right: 20,
        bottom: 50,
        left: 100
    },

width = 1000 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// button click activities
function wireButtonClickEvents() 
{
    d3.selectAll("#buttonClass .button").on("click", function () {
        dataSelection = d3.select(this).attr("data-val");
        console.log(dataSelection);
        if (dataSelection == HITS_PER_AB)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "H_AB", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Hits/AB (1871-2017)",
                "Year",
                "Yearly Average of Hits/AB",
                time
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "H_AB", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for Hits/AB",
                "Year",
                "Yearly Average of Hits/AB",
                time
                );
        }
        else if (dataSelection == HOME_RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "HR_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Homeruns/Game (1871-2017)",
                "Year",
                "Yearly Average of Homeruns/Game",
                time
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "HR_G", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for Homeruns/Game",
                "Year",
                "Yearly Average of Homeruns/Game",
                time
                )
        }
        else if (dataSelection == RUNS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "R_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Runs/Game (1871-2017)",
                "Year",
                "Yearly Average of Runs/Game",
                time
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "R_G", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for Runs/Game",
                "Year",
                "Yearly Average of Runs/Game",
                time
                )
        }
        else if (dataSelection == WALKS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "BB_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Walks/Game (1871-2017)",
                "Year",
                "Yearly Average of Walks/Game",
                time
                );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "BB_G", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for Walks/Game",
                "Year",
                "Yearly Average of Walks/Game",
                time
                )
        }
        else if (dataSelection == STRIKE_OUTS_PER_GAME)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "SO_G", 
                "#interactive", 
                "#005a7d",
                "Yearly Average of Strike-outs/Game (1871-2017)",
                "Year",
                "Yearly Average of Strike/Game",
                time
            );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "SO_G", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for Strike-outs/Game",
                "Year",
                "Yearly Average of Strike/Game",
                time
            )
        }
        else if (dataSelection == OBP)
        {
            d3.select("#buttonClass .current").classed("current", false);
            d3.select(this).classed("current", true);
            $("#interactive").empty();
            $("#variance").empty();
            drawLineGraphInteractive(
                dataset, 
                "Year", 
                "OBP", 
                "#interactive", 
                "#005a7d",
                "Yearly Average On-Base Percentage (1871-2017)",
                "Year",
                "Yearly Average OBP",
                time
            );
            drawBarGraphInteractive(
                dataset, 
                "Year", 
                "OBP", 
                "#interactive", 
                "#005a7d",
                "Variance comparison for On-Base Percentage",
                "Year",
                "Yearly Average OBP",
                time
            )
        }
    });
}

function eventButtons() 
{
    d3.selectAll("#event_selector .button").on("click", function () {
        eventSelector = d3.select(this).attr("data-val");
        console.log(eventSelector);
        if (eventSelector == Change1)
        {
          if (!d3.select(this).classed("selected")) {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)

            d3.select("#event_selector .selected").classed("selected", false);
            d3.select(this).classed("selected", true);
            time = [1920, 1930]

            variance_mod(time)
          }

          else {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)
            d3.select(this).classed("selected", false);
          }
        }

        else if (eventSelector == Change2)
        {
          if (!d3.select(this).classed("selected")) {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)

            d3.select("#event_selector .selected").classed("selected", false);
            d3.select(this).classed("selected", true);
            time = [1941, 1945]

            variance_mod(time)
          }

          else {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)
            d3.select(this).classed("selected", false);
          }
        }

        else if (eventSelector == Strike)
        {
         if (!d3.select(this).classed("selected")) {
           d3.selectAll('.bar')
            .attr('opacity', 0.4)

            d3.select("#event_selector .selected").classed("selected", false);
            d3.select(this).classed("selected", true);
            time = [1963,1968]

            variance_mod(time)    
          }

          else {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)
            d3.select(this).classed("selected", false);
          }    
        }

        else if (eventSelector == Roids)
        {
           if (!d3.select(this).classed("selected")) {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)

            d3.select("#event_selector .selected").classed("selected", false);
            d3.select(this).classed("selected", true);
            time = [1985, 2002]

            variance_mod(time)
          }
         
         else {
            d3.selectAll('.bar')
              .attr('opacity', 0.4)
            d3.select(this).classed("selected", false);
          }    

        }
    });


}

$(document).ready(function () 
{
    loadData();
    listener();
});

function loadData() 
{
    d3.csv('data/data_movingave.csv', function(data) 
    {
        dataset =  data
        data.forEach(function(d) {
            d.Year = parseInt(d.Year)

            d.H = parseFloat(d.H)
            d.HR = parseFloat(d.HR)
            d.AB = parseFloat(d.AB)
            d.R = parseFloat(d.R)
            d.G = parseFloat(d.G)
            d.BB = parseFloat(d.BB)
            d.SO = parseFloat(d.SO)
            d.HBP = parseFloat(d.HBP)
            d.SF = parseFloat(d.SF)

            d.BB_G = parseFloat(d.BB_G)
            d.H_AB = parseFloat(d.H_AB)
            d.HR_G = parseFloat(d.HR_G)
            d.R_G = parseFloat(d.R_G)
            d.SO_G = parseFloat(d.SO_G)
            d.OBP = parseFloat(d.OBP)
        })
        
        length_data = dataset.length

        drawLineGraph(
            data, 
            "Year", 
            "HR_G", 
            "#HR_G", 
            "#003f5c",
            "Yearly Average of Homeruns/Game (1871-2017)",
            "Year",
            "Yearly Average of Homeruns/Game",
            [1920, 2017],
            "Change of physical make of ball: 1920 onwards"
            )
        drawLineGraph(
            data, 
            "Year", 
            "H_AB", 
            "#H_AB", 
            "#003f5c",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB",
            [1920, 2017],
            "Change of physical make of ball: 1920 onwards"
            )
        drawLineGraph(
            data, 
            "Year", 
            "BB_G", 
            "#W_G", 
            "#2f4b7c",
            "Yearly Average of Walks/Game (1871-2017)",
            "Year",
            "Yearly Average of Walks/Game",
            [1963, 1968],
            ""
            )
        drawLineGraph(
            data, 
            "Year", 
            "SO_G", 
            "#SO_G", 
            "#2f4b7c",
            "Yearly Average of Strike-outs/Game (1871-2017)",
            "Year",
            "Yearly Average of Strike/Game",
            [1963, 1968],
            ""
            )
        drawLineGraph(
            data, 
            "Year", 
            "HR_G", 
            "#HR_G_STEROIDS", 
            "#665191",
            "Yearly Average of Homeruns/Game (1871-2017)",
            "Year",
            "Yearly Average of Homeruns/Game",
            [1985, 2002],
            "Steroids"
            )
        
        drawLineGraph(
            data, 
            "Year", 
            "R_G", 
            "#R_G_STEROIDS", 
            "#665191",
            "Yearly Average of Runs/Game (1871-2017)",
            "Year",
            "Yearly Average of Runs/Game",
            [1985, 2002],
            "Steroids"
            )
        drawLineGraphInteractive(
            data, 
            "Year", 
            "H_AB", 
            "#interactive", 
            "#005a7d",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB",
            time
            )
        drawBarGraphInteractive(
            data, 
            "Year", 
            "H_AB", 
            "#variance", 
            "#005a7d",
            "Yearly Average of Hits/AB (1871-2017)",
            "Year",
            "Yearly Average of Hits/AB",
            time
            )
        wireButtonClickEvents();
        eventButtons();
    })
}

function drawLineGraph(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel,
    time,
    verticalLineLabel
    ) 
{  
  
    var div = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("position", "absolute")
            
    var convert = d3.format(".2f")
    
    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    var xScale = d3.scaleLinear()
                   .domain([minX, maxX]) 
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0]);

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr("transform", "translate(0, " + height + ")")
                     .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(12));

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));
    
    // add line
    var lineGen = d3.line(dataset)
                    .x(function(d) { return xScale(d[xAttr]); })
                    .y(function(d) { return yScale(d[yAttr]); });

    // add vertical line
    var vertical_line_start = chart.append("line")
                     .attr("class", "start")
                     .attr("x1", xScale(time[0]))
                     .attr("y1", 10)
                     .attr("x2", xScale(time[0]))
                     .attr("y2", height)
                     .style("stroke-width", 2)
                     .style("stroke", "red")
                     .style("fill", "none")
                     .style("stroke-dasharray", ("3, 3"));

    var vertical_line_end = chart.append("line")
                     .attr("class", "end")
                     .attr("x1", xScale(time[1]))
                     .attr("y1", 10)
                     .attr("x2", xScale(time[1]))
                     .attr("y2", height)
                     .style("stroke-width", 2)
                     .style("stroke", "red")
                     .style("fill", "none")
                     .style("stroke-dasharray", ("3, 3"));

    
    chart.append('svg:path')
         .attr('d', lineGen(dataset))
         .attr('stroke', color)
         .attr('stroke-width', 3)
         .attr('fill', 'none');

    chart.selectAll(".dataPoint")
       .data(dataset)
       .enter().append("circle")
       .attr("class", "dataPoint")
       .attr("fill", "#fff")
       .attr("cx", function(d, i) { return xScale(d[xAttr]) })
       .attr("cy", function(d) { return yScale(d[yAttr]) })
       .attr("r", 20)
       .attr("opacity", "0")
       .on("mouseover", function(d) {
           d3.select(this).attr("opacity", "0");
           div.style("left", (d3.event.pageX) - 30 +  "px")
                  .style("top", (d3.event.pageY) + 20 +"px")
                  .style("display", "inline-block")
                  .html("<b>Year: "+d[xAttr]+"<br>"+ "Val: "+convert(d[yAttr]));
       })
       .on("mouseout", function(d) {
           d3.select(this).attr("opacity", "0");
           div.style("display", "none");
       })
  
    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);
    
    // vertical line title
    chart.append("text")
         .attr("x", (xScale(time[0]) + xScale(time[1]))/2)             
         .attr("y", 30)
         .attr("text-anchor", "middle")  
         .style("font-size", "12px")
         .style("font-weight", "bold") 
         .text(verticalLineLabel);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);  
}

// the last visualization
function drawLineGraphInteractive(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel,
    time
    ) 
{  
  
    var div = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("position", "absolute")
            
    var convert = d3.format(".2f")
    
    height = 300; 

    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    console.log(minX)
    console.log(maxX)
    console.log(time)
    
    var xScale = d3.scaleLinear()
                   .domain([minX, maxX]) 
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0]);

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr("transform", "translate(0, " + height + ")")
                     .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(12));

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));
    
    var vertical_line = chart.append("line")
                     .attr("class", "startyear")
                     .attr("x1", xScale(time[0]))
                     .attr("y1", 10)
                     .attr("x2", xScale(time[0]))
                     .attr("y2", height)
                     .style("stroke-width", 2)
                     .style("stroke", "green")
                     .style("fill", "none")
                     .style("stroke-dasharray", ("3, 3"));;

    var vertical_line2 = chart.append("line")
                                      .attr("class", "endyear")
                                      .attr("x1", xScale(time[1]))
                                      .attr("y1", 10)
                                      .attr("x2", xScale(time[1]))
                                      .attr("y2", height)
                                      .style("stroke-width", 2)
                                      .style("stroke", "green")
                                      .style("fill", "none")
                                      .style("stroke-dasharray", ("3, 3"));;

    // add line
    var lineGen = d3.line(dataset)
                    .x(function(d) { return xScale(d[xAttr]); })
                    .y(function(d) { return yScale(d[yAttr]); });
    
    chart.append('svg:path')
         .attr('d', lineGen(dataset))
         .attr('stroke', color)
         .attr('stroke-width', 3)
         .attr('fill', 'none');

    chart.selectAll(".dataPoint")
       .data(dataset)
       .enter().append("circle")
       .attr("class", "dataPoint")
       .attr("fill", "#fff")
       .attr("cx", function(d, i) { return xScale(d[xAttr]) })
       .attr("cy", function(d) { return yScale(d[yAttr]) })
       .attr("r", 20)
       .attr("opacity", "0")
       .on("mouseover", function(d) {
           d3.select(this).attr("opacity", "0");
           div.style("left", (d3.event.pageX) - 30 +  "px")
                  .style("top", (d3.event.pageY) + 20 +"px")
                  .style("display", "inline-block")
                  .html("<b>Year: "+d[xAttr]+"<br>"+ "Val: "+convert(d[yAttr]));
       })
       .on("mouseout", function(d) {
           d3.select(this).attr("opacity", "0");
           div.style("display", "none");
       })

    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);   
}

// Time is an array/list
function average_calc(A, B, time){
  var factor_a = 0;
  var factor_b = 0;

  for (var i = 0; i < length_data; i++) {
    if (dataset[i]['Year'] >= time[0] && dataset[i]['Year'] <= time[1]){
      factor_a += dataset[i][A]
      factor_b += dataset[i][B]

    }
  }
  return factor_a/factor_b
}

function OBP_calc(time){
  var total_H = 0;
  var total_AB = 0;
  var total_HBP = 0;
  var total_SF = 0;
  var total_BB = 0

  for (var i = 0; i < length_data; i++) {
    if (dataset[i]['Year'] >= time[0] && dataset[i]['Year'] <= time[1]){
      total_H += dataset[i]['H']
      total_AB += dataset[i]['AB']
      total_HBP += dataset[i]['HBP']
      total_SF += dataset[i]['SF']
      total_BB += dataset[i]['BB']
    }
  }
  return (total_H + total_HBP + total_BB)/(total_AB + total_BB + total_HBP + total_SF)
}

function drawBarGraphInteractive(
    dataset, 
    xAttr, 
    yAttr, 
    chartID, 
    color,
    chartTitle,
    xLabel,
    yLabel,
    time
    ) 
{   
    if (yAttr == 'OBP'){average = OBP_calc(time)}
      else {average = average_calc(reference[yAttr][0], reference[yAttr][1], time)}

    height = 300; 
    
    console.log(average)
    minX = d3.min(dataset, function(d) {return d[xAttr]})
    maxX = d3.max(dataset, function(d) {return d[xAttr]})

    minY = d3.min(dataset, function(d) {return d[yAttr]})
    maxY = d3.max(dataset, function(d) {return d[yAttr]})
    
    
    var xScale = d3.scaleBand()
                   .domain(_.range(minX, maxX+1)) 
                   .range([0, width]);
    
    var xRef = d3.scaleLinear()
               .domain([minX, maxX]) 
               .range([0, width]);

    var yScale = d3.scaleLinear()
                   .domain([minY, maxY])
                   .range([height, 0]);

    var chart = d3.select(chartID).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
    
    var xAxis = chart.append("g")
                     .attr('id', 'AXIS')
                     .attr("transform", "translate(0, " + yScale(average) + ")")
                     .call(d3.axisBottom(xScale))
                     // .selectAll("text")
                     //  .attr("transform", "rotate(-90)")
                     //  .attr("dy", "0.3em")
                     //  .attr("y", 0)
                     //  .attr("dx", "-2em") 
                     //  .attr("font-size", "0.8em");
    var refAxis = chart.append("g")
                 .attr('id', 'refAxis')
                 .attr("transform", "translate(0, " + height + ")")
                 .call(d3.axisBottom(xRef).tickFormat(d3.format("d")).ticks(12));



    d3.selectAll('#AXIS .tick').remove()

    var yAxis = chart.append("g")
                     .call(d3.axisLeft(yScale));


    //Draw bars
    // chart.selectAll(".bar")
    //         .data(dataset)
    //         .enter()
    //         .append("rect")
    //         .attr("class", "bar") 
    //         .attr("id", function (d) { return "bar" + d.Year; })//NEW
    //         .attr("x", function (d) { return xScale(d[xAttr]); })
    //         .attr("width", xScale.bandwidth()-2)
    //         .attr("y", function (d) { return yScale(d[yAttr]); })
    //         .attr("height", function (d) { return height - yScale(d[yAttr]); })
    
    var vertical_line = chart.append("line")
                     .attr("class", "startyear")
                     .attr("x1", xRef(time[0]))
                     .attr("y1", 10)
                     .attr("x2", xRef(time[0]))
                     .attr("y2", height)
                     .style("stroke-width", 2)
                     .style("stroke", "green")
                     .style("fill", "none")
                     .style("stroke-dasharray", ("3, 3"));;

    var vertical_line2 = chart.append("line")
                                      .attr("class", "endyear")
                                      .attr("x1", xRef(time[1]))
                                      .attr("y1", 10)
                                      .attr("x2", xRef(time[1]))
                                      .attr("y2", height)
                                      .style("stroke-width", 2)
                                      .style("stroke", "green")
                                      .style("fill", "none")
                                      .style("stroke-dasharray", ("3, 3"));;

    //Draw bars
    chart.selectAll(".bar")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar") 
            .attr("id", function (d) { return "bar" + d.Year; })//NEW
            .attr("x", function (d) { return xScale(d[xAttr]); })
            .attr("width", xScale.bandwidth()-2)
            .attr('opacity', 0.4)
            .attr("y", function (d) {
              if (d[yAttr] - average <= 0){return yScale(average);}
              else {return yScale(d[yAttr])}
              })
            .attr("height", function (d) {
              if (d[yAttr] - average <= 0){return yScale(d[yAttr]) - yScale(average);}
              else {return Math.abs(yScale(d[yAttr]) - yScale(average))}
              })
            .attr("fill", function (d) {
              if (d[yAttr] - average <= 0){return 'blue';}
              else {return 'red'}
              })
    

    // Chart title
    chart.append("text")
         .attr("x", (width / 2))             
         .attr("y", 0 - (margin.top / 5))
         .attr("text-anchor", "middle")  
         .style("font-size", "25px")
         .style("font-weight", "bold") 
         .text(chartTitle);

    // x axis label
    chart.append("text")
         .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 40) + ")")
         .style("text-anchor", "middle")
         .text(xLabel);

    // y axis label
    chart.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -50)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text(yLabel);   
}

function variance_mod(time){
    var constant_to_y = {0: 'H_AB',
                         1: 'HR_G',
                         2: 'R_G',
                         3: 'BB_G',
                         4: 'SO_G',
                         5: 'OBP'
                        };
    
    attribute = constant_to_y[dataSelection]

    if (attribute == 'OBP'){average = OBP_calc(time)}
      else {average = average_calc(reference[attribute][0], reference[attribute][1], time)}
    
    console.log(average)

    minY = d3.min(dataset, function(d) {return d[attribute]})
    maxY = d3.max(dataset, function(d) {return d[attribute]})

    var yScale = d3.scaleLinear()
               .domain([minY, maxY])
               .range([height, 0]);

    var xRef = d3.scaleLinear()
               .domain([1875, 2017])
               .range([0, width]);

        d3.selectAll('.startyear').transition().attr('x1', xRef(time[0] - .5)).attr('x2', xRef(time[0] - .5 ))
        d3.selectAll('.endyear').transition().attr('x1', xRef(time[1])).attr('x2', xRef(time[1]))

    d3.select('#AXIS')
      .transition()
      .attr('transform', 'translate(0,'+ yScale(average) + ')')

    d3.selectAll('.bar')
      .transition()
      .attr("y", function (d) {
        if (d[attribute] - average <= 0){return yScale(average);}
        else {return yScale(d[attribute])}
        })
      .attr("height", function (d) {
        if (d[attribute] - average <= 0){return yScale(d[attribute]) - yScale(average);}
        else {return Math.abs(yScale(d[attribute]) - yScale(average))}
        })
      .attr("fill", function (d) {
        if (d[attribute] - average <= 0){return 'blue';}
        else {return 'red'}
        })

    d3.selectAll('.bar')
      .attr('opacity', 0.4)
    
    _.range(time[0], time[1]+1).forEach(function (d){
      d3.select('#bar'+d)
        .attr('opacity', 1)
      })
}

function listener(){
  console.log('Listener loaded')
  var numInputs = document.querySelectorAll('input[type=number]')
  var _changeInterval = null

    numInputs.forEach(function (input) {
      input.addEventListener('change', function (d) {
        if (d.target.value == '') {
          d.target.value = 1871
        }
      })
    })

    $('#yearA')
        .keyup(function() {
          clearInterval(_changeInterval)
          _changeInterval = setInterval(function() {
            clearInterval(_changeInterval);
            time[0] = parseInt($('#yearA').val());
            variance_mod(time);
            }, 800);
        })

    $('#yearB')
        .keyup(function() {
          clearInterval(_changeInterval)
          _changeInterval = setInterval(function() {
            clearInterval(_changeInterval);
            time[1] = parseInt($('#yearB').val());
            variance_mod(time);
            }, 800);
        })
}
