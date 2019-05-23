var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
    // TODO implement this based on what we did in class
    // "married": "#5B7BE9",
    // "own children in household": "#E0D22E",
    // "has healthcare coverage": "#2CCEF6",
    // "bachelor's degree or more": "#FB7F23",
    // "employed": "#D63CA3",
    // "self-employed": "#C38014",
    // "primarily pub. trans. to work*": "#E24062",
    // "personal income above nat. med.": "#5BB923",
    // "below poverty line": "#555555",
    // "veteran": "#B190D0",
    // "born outside US": "#BCC832",
    // "cog. or phys. difficulty": "#EE7B9C",
    // "hearing or vis. difficulty": "#F299B3",
    // "widowed": "#01D99F"

    'married':            ["married", "#5B7BE9"],
    'children':           ["own children in household", "#E0D22E"],
    'healthcare':         ["has healthcare coverage", "#2CCEF6"],
    'college':            ["bachelor's degree or more", "#FB7F23"],
    'employed':           ["employed", "#D63CA3"],
    'selfemp':            ["self-employed", "#C38014"],
    'publictrans':        ["primarily pub. trans. to work*", "#E24062"],
    'income_moremed':     ["personal income above nat. med.", "#5BB923"],
    'inpoverty':          ["below poverty line", "#555555"],
    'isveteran':          ["veteran", "#B190D0"],
    'bornoutus':          ["born outside US", "#BCC832"],
    'diffmovecog':        ["cog. or phys. difficulty", "#EE7B9C"],
    'diffhearvis':        ["hearing or vis. difficulty", "#F299B3"],
    'widowed':            ["widowed", "#01D99F"]
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file 
function loadData() {
    // load the demographics.csv file    
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
   d3.csv('data/demographics.csv', function(d) {
    data = d;
    visualizeSquareChart(findDataItem())
    });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to 
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values


    //HINT: uncomment and COMPLETE the below lines of code
    var item = data.filter(function (d) {
        return d.sex === USER_SEX && d.racesimp === USER_RACESIMP && d.agegrp === USER_AGEGRP;
        });
    if (item.length == 1) {
       return item[0];
    }
    return null;
}

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(item) {
    // visualize the square plot per attribute in the category_color variable
    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 150 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom

    var rectWidth = 12;

    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var fields = d3.keys(category_colors)
    
    fields.forEach(function (a) {
    var mindata = item[a]

    var div = d3.select("#chart1")
        .attr("style", "width: 800px");  

    var div = d3.select("#chart1")
        .append("div")
        .attr("id", "holder" + a)
        .attr("class", "chartholder")
        .attr("style", "width: 134px")


    div.append("h6").html(category_colors[a][0])


    var svg = div.append("svg")
      .attr("class", "squareloc")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," +
      margin.top + ")");

    var rects = svg.selectAll("rect")
        .data(d3.range(100).reverse())
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
                     return rectWidth * (i %10);
        })
        .attr("y", function (d, i) {
                     return rectWidth * Math.floor(i / 10);
        }) 
        .attr("height", rectWidth)
        .attr("width", rectWidth)
        .attr("stroke", "white")
        .attr('fill', function(d,i) {
                    if(i>=100-mindata) {
                        return category_colors[a][1];}
                    else{return '#d3d3d3';}
                });
        });



    // Update the count div whose id is "n" with item.total    
    d3.selectAll("#n").html(Number(item.total).toLocaleString('en'));


}




//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value. 
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())
        // TODO: find the data item and invoke the visualization function
    });
    // RACE
    d3.selectAll("#racesimp .button").on("click", function () {
        USER_RACESIMP = d3.select(this).attr("data-val");
        d3.select("#racesimp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())

    });
    //AGEGROUP
    d3.selectAll("#agegrp .button").on("click", function () {
        USER_AGEGRP = d3.select(this).attr("data-val");
        d3.select("#agegrp .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())

    });
}