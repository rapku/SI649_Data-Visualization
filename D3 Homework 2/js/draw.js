var INIT = 'winpercent'
var data = [];
var all_prompt = 1;
   chocolate = 0;
   fruity = 0;
   caramel = 0;
   peanutyalmondy = 0;
   nougat = 0;
   crispedricewafer = 0;
   hard = 0;
   bar = 0;
   pluribus = 0;
var dataset = null

// filter is >= the set value (checking a box sets it to 1), all assumes show all, filter checks indicate I want to see items that must have this characteristic

$(document).ready(function () {
    console.log(INIT);
    loadData(); 
    wireButtonClickEvents();
    wireButtonFilter();
});

d3.selectAll(".myCheckbox").on("change",update);
  update()

// Loads the CSV file 
function loadData() {
   var INIT = 'winpercent'
   d3.csv('data/candy-data.csv', function(d) {
    data = d;
    data.forEach(function (candy) {
        candy.chocolate = parseInt(candy.chocolate);
        candy.fruity = parseInt(candy.fruity);
        candy.caramel = parseInt(candy.caramel);
        candy.peanutyalmondy = parseInt(candy.peanutyalmondy);
        candy.nougat = parseInt(candy.nougat);
        candy.crispedricewafer = parseInt(candy.crispedricewafer);
        candy.hard = parseInt(candy.hard);
        candy.bar = parseInt(candy.bar);
        candy.pluribus = parseInt(candy.pluribus);
        });
    data = datafilter(data).sort((a, b) => b.winpercent - a.winpercent);
    var ds = loadDataset('winpercent')
    initBarChart(ds);
    });
}

function datafilter() {
    // Use checkboxes to filter data first before drawing
    var new_data = data.filter(function (d) {
        return d.chocolate >= chocolate
        && d.fruity >= fruity
        && d.caramel >= caramel
        && d.peanutyalmondy >= peanutyalmondy
        && d.nougat >= nougat
        && d.crispedricewafer >= crispedricewafer
        && d.hard >= hard
        && d.bar >= bar
        && d.pluribus >= pluribus
        });
    return new_data;
}

function loadDataset(caseword) {
    var dataset = null
    switch (caseword) {
        case "winpercent":
            dataset = datafilter(data).sort((a, b) => b.winpercent - a.winpercent);break;
        case "pricepercent":
            dataset = datafilter(data).sort((a, b) => b.pricepercent - a.pricepercent);break;
        case "sugarpercent":
            dataset = datafilter(data).sort((a, b) => b.sugarpercent - a.sugarpercent);break;
    };
    return dataset
}

//BAR CHART
function initBarChart(new_data) {  
    var margin = { top: 20, right: 20, bottom: 150, left: 60 },
        width = 1500 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(new_data.map(function (d) {return d.competitorname;}))
        .range([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    var svg = d3.select("#barchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    bars = svg.selectAll(".bar")
        .data(new_data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "#5b717c")
        .attr("x", function (d) { return x(d.competitorname); })
        .attr("width", x.bandwidth())
        .attr('height', 0)
        .attr('y', height)
        .transition()
        .delay(100)
        .attr("y", function (d) { return y(d.winpercent); })
        .attr("height", function (d) { return height - y(d.winpercent); })

        // .on('mousemove', function(d){
        //     d3.select(this).attr('opacity', '1');
        //     tooltip
        //         .style('left', d3.event.pageX - 50 + 'px')
        //         .style('top', d3.event.pageY - 70 + 'px')
        //         .style('display', 'inline-block')
        //         .html('<b>'+(d.key)+'</b>   : '+(d.value))   ;     
        // })
        // .on('mouseout', function(d){
        //     d3.select(this).attr('opacity', '0.7');
        //     tooltip.style('display', 'none');
        // });
        

    //X axis
    xaxis = svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("y", 10)
            .attr('x', 3)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");

    //Y axis
    yaxis = svg.append("g")
            .call(d3.axisLeft(y));

}


function updateBar(newd){
    var margin = { top: 20, right: 20, bottom: 150, left: 60 },
        width = 1500 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var svg = d3.select("#barchart")
    var transition = svg.transition().duration(1000)

    var x = d3.scaleBand()
        .domain(newd.map(function (d) {return d.competitorname;}))
        .range([0, width])
        .padding(0.1);

    d3.selectAll(".bar")
        .transition()
        .attr("x", function (d) {return x(d.competitorname)})
        .duration(1000)

    transition.select('.xaxis')
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 10)
        .attr('x', function (d) {return x(d.competitorname)})
        .attr("dy", ".35em")
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");
}


$('.check').on('change', function(){
        this.value = this.checked ? 1 : 0;
    });

function wireButtonFilter() {
    d3.select("#boxlist #all_sel")
        .on("click", function () {
           chocolate = 0;
           fruity = 0;
           caramel = 0;
           peanutyalmondy = 0;
           nougat = 0;
           crispedricewafer = 0;
           hard = 0;
           bar = 0;
           pluribus = 0;
            $(".current").removeClass("current");
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });


    d3.select("#boxlist #chocolate")
        .on("click", function () {
            chocolate = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #fruity")
        .on("click", function () {
            fruity = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #caramel")
        .on("click", function () {
            caramel = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #peanutyalmondy")
        .on("click", function () {
            peanutyalmondy = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #nougat")
        .on("click", function () {
            nougat = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #crispedricewafer")
        .on("click", function () {
            crispedricewafer = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #hard")
        .on("click", function () {
            hard = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #bar")
        .on("click", function () {
            bar = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });

    d3.select("#boxlist #pluribus")
        .on("click", function () {
            pluribus = d3.select(this).attr("data-val");
            document.getElementById('all_sel').classList.remove('current');
            d3.select(this).classed("current", true);
            x = loadDataset(INIT);
            updateBar(x)
        });
}


function wireButtonClickEvents() {
    d3.selectAll("#buttonlist .button")
        .on("click", function () {
            INIT = d3.select(this).attr("data-val");
            d3.select("#buttonlist .current").classed("current", false);
            d3.select(this).classed("current", true);
            x = loadDataset(INIT)
            updateBar(x)
    });
}
