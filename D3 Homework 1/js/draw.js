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

$(document).ready(function () {
    loadData();
});


function loadData() {
    //code for Q1 goes here
   d3.csv('data/data.csv', function(d) {
   	data = d;
    visualizeBarChart(groupDataByYear());
    visualizeSmallMultipleBarChart(groupDataByCategory());
   	data.forEach(function(item){
   		item.n = parseInt(item.n);
   	});
   });
}

function groupDataByCategory() {
     //code for Q2 goes here
     var groupedData = d3.nest()
        .key(function(d){return d.category})
        .entries(data);
     return groupedData
}

function groupDataByYear() {
    //code for Q3 goes here
    var groupedData = d3.nest()
      .key(function(d){return d.year})
      .rollup(function(v){return d3.sum(v, function(d){return d.n})})
      .entries(data);
    return groupedData
}


function visualizeBarChart(dataitems) {
    // code for Q4 goes here
    var margin = {top:20, right:20, bottom:30, left:60},
        width = 940 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // code for Q5 goes here
    var x = d3.scaleBand()
        .domain(dataitems.map(function(d){return d.key}))
        .range([0, width])
        .padding(0.1);

    // code for Q6 goes here
    var y = d3.scaleLinear()
        .domain([0, d3.max(dataitems, function(d){return d.value})])
        .range([height, 0]);


    // code for Q7 goes here
    var svg = d3.select('#chart1').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // code for Q8 goes here
    svg.selectAll(".bar")
        .data(dataitems)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#E0D22E")
        .attr("x", function (d) { return x(d.key); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    svg.append("g")
    .call(d3.axisLeft(y));
    // code for Q9 goes here

    
}

function visualizeSmallMultipleBarChart(dataitems) {

       // code for Q12 goes here
    var margin = { top: 0, right: 10, bottom: 40, left: 40 },
    width = 280 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom
       // code for Q13 goes here
    var x = d3.scaleBand()
    .domain(dataitems[0].values.map(function (d) { return d.year; }))
    .range([0, width])
    .padding(0.1);

       // code for Q14 goes here
	  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.n; })])
    .range([height, 0]); 
	   // code for Q15 goes here
	   dataitems.forEach(function (v, i) {
     // code for Q16 goes here
     var div = d3.select("#chart2").append("div")
      .attr("id", "holder" + v.key)
      .attr("class", "chartholder");

     // code for Q17 goes here
     div.append("h6").html(v.key);
	   
	   // code for Q1888 goes here
	   var svg = div.append("svg")
      .attr("class", "categoryBar")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," +
      margin.top + ")");
	   // code for Q19 goes here
    svg.selectAll(".bar")
      .data(v.values)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", function (d) { return category_colors[v.key] })
      .attr("x", function (d) { return x(d.year); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.n); })
      .attr("height", function (d) { return height - y(d.n); })
	   // code for Q20 goes here
	   svg.append("g")
      .call(d3.axisLeft(y).ticks(5));
	   // code for Q21 goes here
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    })
}




