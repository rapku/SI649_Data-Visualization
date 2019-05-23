var data = []; // the variable that holds the data from csv file
var category_colors = {
    "clothing, beauty, & fashion": "#5B7BE9",
    "computers & internet": "#E0D22E",
    "education": "#2CCEF6",
    "food & drink": "#FB7F23",
    "grab bag": "#D63CA3",
    "health & fitness": "#c38014",
    "home & garden": "#E24062",
    "human relations": "#5BB923",
    "law & government": "#555",
    "media & arts": "#B190D0",
    "pets & animals": "#bcc832",
    "religion & philosophy": "#ee7b9c",
    "science & nature": "#f299b3",
    "shopping": "#01d99f",
    "society & culture": "#177d62",
    "sports, hobbies, & recreation": "#a16c2f",
    "technology": "#a2262a",
    "travel & transportation": "#f29a76",
    "work & money": "#88a8b9",
    "writing & language": "#a46067"
}; // JSON object with colors assigned to each category.

var dataset1 = [
{ name: "A", x: 10, y: 20 },
{ name: "B", x: 41, y: 15 },
{ name: "C", x: 23, y: 30 },
{ name: "D", x: 18, y: 37 },
{ name: "E", x: 6, y: 50 }];
var dataset2 = [
{ name: "A", x: 30, y: 14 },
{ name: "B", x: 17, y: 45 },
{ name: "C", x: 11, y: 21 },
{ name: "D", x: 50, y: 16 },
{ name: "E", x: 34, y: 8 }];


$(document).ready(function () {
    loadData();
    loadDataset("dataset1");
});


function loadData() {    
    d3.csv("data/data.csv", function (d) {
        data = d;
        data.forEach(function (item) {
            item.n = parseInt(item.n);
        });
        visualizeBarChart(groupDataByYear());
        visualizeSmallMultipleBarChart(groupDataByCategory());
        visualizePieChart();
        visualizeDonutChart();
        visualizeMap();
        visualizeNodeLinkDiagran();
    });
}

function groupDataByCategory() {    
    var groupedData = d3.nest()
        .key(function (d) { return d.category })
        .entries(data);    
    return groupedData;
}

function groupDataByYear() {   
    var groupedData = d3.nest()
        .key(function (d) { return d.year })
        .rollup(function (v) { return d3.sum(v, function (d) { return d.n; }) })
        .entries(data);    
    return groupedData;
}

function visualizeBarChart(dataitems) {  
    var margin = { top: 20, right: 20, bottom: 30, left: 60 },
        width = 940 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(dataitems.map(function (d) { return d.key; }))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(dataitems, function (d) { return d.value; })])
        .range([height, 0]);

    var tooltip = d3.select("body").append("div").attr("class", "toolTip"); //NEW

    var svg = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".bar")
        .data(dataitems)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#5b717c")
        .attr("x", function (d) { return x(d.key); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .attr('opacity', "0.7")
        .on('mousemove', function(d){
            d3.select(this).attr('opacity', '1');
            tooltip
                .style('left', d3.event.pageX - 50 + 'px')
                .style('top', d3.event.pageY - 70 + 'px')
                .style('display', 'inline-block')
                .html('<b>'+(d.key)+'</b>   : '+(d.value))   ;     
        })
        .on('mouseout', function(d){
            d3.select(this).attr('opacity', '0.7');
            tooltip.style('display', 'none');
        });
        


    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}

function visualizeSmallMultipleBarChart(dataitems) {
   
    var margin = { top: 20, right: 0, bottom: 40, left: 40 },
        width = $("#chart2").width()*0.22 - margin.left - margin.right,
        height = 180 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(dataitems[0].values.map(function (d) { return d.year; }))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.n; })])
        .range([height, 0]);

    // Loop through categories
    dataitems.forEach(function (v, i) {
        var div = d3.select("#chart2").append("div")
            .attr("id", "holder" + v.key)
            .attr("class", "chartholder");
            
        div.append("h6").html(v.key);  
        var svg = div.append("svg")
            .attr("class", "categoryBar")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");        

        svg.selectAll('text')
            .data(v.values)
            .enter()
            .append('text')
            .attr('class', 'text')
            .attr('id', function(d) {return 'text' + d.year;})
            .text(function(d) {return d.n;})
            .attr('x', function(d) {return x(d.year);})
            .attr('y', function(d) {return y(d.n) - 2;})
            .style('display', 'none')

        svg.selectAll(".bar")
            .data(v.values)
            .enter().append("rect")
            .attr("class", "bar") 
            .attr("id", function (d) { return "bar" + d.year; })//NEW
            .attr("fill", function (d) { return category_colors[v.key];})
            .attr("x", function (d) { return x(d.year); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.n); })
            .attr("height", function (d) { return height - y(d.n); })
            .on("mousemove", function (d) { //NEW
                $("[id=text" + d.year + "]").show();
                $("[id=bar" + d.year + "]").addClass("highlight");
                })
            .on("mouseout", function (d) {
                $("[id=text" + d.year + "]").hide();
                $("[id=bar" + d.year +"]").removeClass("highlight");
                })

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));



    });
}


////////////////////////////////////////////////////
// ANIMATIONS
////////////////////////////////////////////////////

function triggerPositionTransformation() {
   d3.select('#positionRectangle')
    .transition()
    .attr('x', 150)
}

function resetPositionRectangle() {
   d3.select('#positionRectangle')
    .transition()
    .attr('x', 50) 
}

function triggerSizeTransformation() {
   d3.select('#sizeRectangle')
    .transition()
    .attr('x', 150)
    .attr('width', 100)
    .attr('height', 100)
}

function resetSizeRectangle() {
   d3.select('#sizeRectangle')
    .transition()
    .attr('x', 50)
    .attr('width', 50)
    .attr('height', 50)
}

function triggerOpacityTransformation() {
   d3.select('#opacityRectangle')
    .transition()
    .attr('x', 150)
    .attr('width', 100)
    .attr('height', 100)
    .attr('opacity', 0.6)      
}

function resetOpacityRectangle() {
   d3.select('#opacityRectangle')
    .transition()
    .attr('x', 50)
    .attr('width', 50)
    .attr('height', 50)
    .attr('opacity', 1)          
}

function triggerColorTransformation() {
   d3.select('#colorRectangle')
    .transition()
    .attr('x', 150)
    .attr('width', 100)
    .attr('height', 100)
    .attr('opacity', 0.6)
    .attr('fill', 'red')    
}

function resetColorRectangle() {
   d3.select('#colorRectangle')
    .transition()
    .attr('x', 50)
    .attr('width', 50)
    .attr('height', 50)
    .attr('opacity', 1)
    .attr('fill', 'black')    
}

function triggerDelayTransformation() {
   d3.select('#delayRectangle')
    .transition()
    .delay(500)
    .attr('x', 150)
    
    .transition()
    .delay(500)
    .attr('width', 100)
    .attr('height', 100)
    
    .transition()
    .delay(500)
    .attr('opacity', 0.6)
    
    .transition()
    .delay(500)
    .attr('fill', 'red') 
}

function resetDelayRectangle() {
   d3.select('#delayRectangle')
    .transition()
    .delay(500)
    .attr('fill', 'black')

    .transition()
    .delay(500)
    .attr('opacity', 1)


    .transition()
    .delay(500)
    .attr('width', 50)
    .attr('height', 50)

    .transition()
    .delay(500)
    .attr('x', 50)     
}

function triggerDurationTransformation() {
   d3.select('#durationRectangle')
    .transition()
    .delay(500)
    .attr('x', 150)
    
    .transition()
    .delay(500)
    .attr('width', 100)
    .attr('height', 100)
    
    .transition()
    .delay(500)
    .attr('opacity', 0.6)
    
    .transition()
    .delay(500)
    .attr('fill', 'red') 

    .duration(2500)  
}

function resetDurationRectangle() {
   d3.select('#durationRectangle')
    .transition()
    .delay(500)
    .attr('fill', 'black')

    .transition()
    .delay(500)
    .attr('opacity', 1)


    .transition()
    .delay(500)
    .attr('width', 50)
    .attr('height', 50)

    .transition()
    .delay(500)
    .attr('x', 50)

    .duration(2500)  
}


/////////////////////////////////////////////////////
// CHART LEVEL ANIMATIONS
/////////////////////////////////////////////////////

function loadDataset(ds) {
    var dataset = null;
    switch (ds) {
        case "dataset1":
            dataset = dataset1;
            break;
        case "dataset2":
            dataset = dataset2;
            break;
    }
    drawBarChart(dataset);
    drawScatterPlot(dataset);
    drawLineGraph(dataset);
}


function drawBarChart(ds) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = $("#divBarTransition").width() - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(["A", "B", "C", "D", "E"])
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, 50])
        .range([250, 0]);   

    if (d3.select("#barTransition").select('g').empty() === true) {    
    var svg = d3.select("#barTransition")
    svg.select('g')
    .remove()
    

    var svg = d3.select("#barTransition")
            .append('g')
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    bars = svg.selectAll(".bar")
            .data(ds)
    
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", "#5b717c")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr('height', 0)
        .attr('y', height)
        .transition()
        .delay(500)
        .attr("y", function (d) { return y(d.y); })
        .attr("height", function (d) { return height - y(d.y); })



    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    } else {
    
    var svg = d3.select("#barTransition")

    bars = svg.selectAll(".bar")
        .data(ds)
        .transition()
        .attr("y", function(d) {return y(d.y)})
        .attr("height", function(d) { return height - y(d.y); })
        .duration(500)

    }
}

function drawScatterPlot(ds) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = $("#divScatterTransition").width() - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([0, 50])
        .range([0, 250]); 
       
    var y = d3.scaleLinear()
        .domain([0, 50])
        .range([250, 0]);      

    if (d3.select("#scatterTransition").select('g').empty() === true) {
    var svg = d3.select("#scatterTransition")
            .append('g')
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    var dots = svg.selectAll(".dot")
       .data(ds);

    dots
        .enter()
            .append('circle')
            .attr('r', 2)
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .attr('class','dot')
            .attr("cy", function(d){ return y(d.y); })
            .attr("cx", function(d){ return x(d.x); })

    } else {
    var svg = d3.select("#scatterTransition")

    dotmove = svg.selectAll(".dot")
        .data(ds)
        .transition()
        .attr("cy", function(d){ return y(d.y); })
        .attr("cx", function(d){ return x(d.x); })
        .duration(500)
    }
}

function drawLineGraph(ds) {
    var x = d3.scaleBand()
        .domain(["A", "B", "C", "D", "E"])
        .range([0, $("#divLineTransition").width()])
        .padding(0.1);
    var y = d3.scaleLinear()
        .domain([0, 60])
        .range([300, 0]);


    var svg = d3.select('#lineTransition')
    svg.select('.line').remove()

    var line = d3.line()
    .x(function (d, i){return x(d.name);})
    .y(function(d){return y(d.y);})

    var path = svg.append("path")
        .datum(ds) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("d", line);
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)

    var totalLength = path.node().getTotalLength()

    ;

    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
        .duration(1000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0);
}


//////////////////////////////////////////////////////////////
// Other chart types
//////////////////////////////////////////////////////////////


function visualizePieChart() {
var width = $("#divPie").width(),
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .domain(["A", "B", "C", "D", "E"])
    .range(["#7b6888", "#6b486b", "#a05d56", "#d0743c",
    "#ff8c00"]);

var svg = d3.select("#divPie").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height /
    2 + ")");   

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.x; });
var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var g = svg.selectAll(".arc")
    .data(pie(dataset1))
    .enter().append("g")
    .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.name);
    });

g.append("text")
    .attr("transform", function (d) { return "translate(" +
    labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function (d) {
    return d.data.name;
    });

}

function visualizeDonutChart() {
var width = $("#divDonut").width(),
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .domain(["A", "B", "C", "D", "E"])
    .range(["#7b6888", "#6b486b", "#a05d56", "#d0743c",
    "#ff8c00"]);

var svg = d3.select("#divDonut").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height /
    2 + ")");   

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius/2);
var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.x; });
var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var g = svg.selectAll(".arc")
    .data(pie(dataset1))
    .enter().append("g")
    .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.name);
    });

g.append("text")
    .attr("transform", function (d) { return "translate(" +
    labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .text(function (d) {
    return d.data.name;
    });   
}

function visualizeMap() {
var width = $("#divMap").width(),
height = 600;
var svg = d3.select("#divMap").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath();



d3.json("https://d3js.org/us-10m.v1.json", function (error, us)
{
    if (error) throw error;
    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);
    
    var tooltip = d3.select('.tooltip')

    svg.selectAll('path')
        .data(IdToState)
        .enter()
        .on('mousemove', function(d){
            d3.select(this).attr('opacity', '1');
            tooltip
                // .style('left', d3.event.pageX - 50 + 'px')
                // .style('top', d3.event.pageY - 70 + 'px')
                .style('display', 'inline-block')
                .html('<b>'+(d.id)+'</b>') 
                })
            .on('mouseout', function(d){
                d3.select(this).attr('opacity', '0.7');
                    tooltip.style('display', 'none');
                });
})



}

function visualizeNodeLinkDiagran() {
    var graph = {
        "nodes": [
            { "id": "1", "group": 1 },
            { "id": "2", "group": 1 },
            { "id": "3", "group": 1 },
            { "id": "4", "group": 1 },
            { "id": "5", "group": 1 }        
        ],
        "links": [
            { "source": "1", "target": "2", "value": 1 },
            { "source": "2", "target": "4", "value": 1 },
            { "source": "4", "target": "3", "value": 1 },
            { "source": "4", "target": "5", "value": 1 }
        ]
    };
    var width = $("#divGraph").width(),
        height = 600;

    var svg = d3.select("#divGraph").append("svg")
        .attr("width", width)
        .attr("height", height);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
        .style("stroke", "#aaa")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 2)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .text(function (d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("r", 16)
            .style("fill", "#efefef")
            .style("stroke", "#424242")
            .style("stroke-width", "1px")
            .attr("cx", function (d) { return d.x + 5; })
            .attr("cy", function (d) { return d.y - 3; });

        label
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .style("font-size", "10px").style("fill", "#333");
    }

    function dragstarted(d) {
        if (!d3.event.active)
            simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;

    }

    function dragended(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        if (!d3.event.active)
            simulation.alphaTarget(0);

    }
}


    
