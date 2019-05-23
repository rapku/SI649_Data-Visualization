var datehold = [];
    success = 0;
    trials = 0;
    successrate = [];
    data = [];
    cleaned = new Object

    xOffset=20;
    yOffset=60;
    format = d3.timeFormat("%d-%m-%Y");
    mode = 'uniform'
    width =1120;
    height = 200;
    cellSize = 20;

var weights = data.map(function (dayweek) {
    return dayweek.births;
    });


$(document).ready(function () { 
    load_dataset();
    make_cal_skeleton();
    make_line_skeleton();
    draw_guessline();
    inputTextListener();
    // make_grid();
    // wireButtonClickEvents();
});


///---------- Data management ----------///

// Makes a number of dates (uniform)
function load_dataset(){
    d3.csv('data/processed.csv', function(d){
        data = d;
        data.forEach(function(row){
            row.month = parseInt(row.month);
            row.day = parseInt(row.day)
            row.births = parseInt(row.births)
        });
    })
}

function generator_uniform(number){
    datehold = []
    start = new Date(2017, 0, 1)
    end = new Date(2018, 0, 1)
    while (datehold.length != number){
        var y = format(d3.timeDay(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))))
        datehold.push(y)
    }
}

// function whole_random(min, max){
// 	return Math.floor(Math.random()*(max-min+1) + min)
// }

// function generator_real(number){
//     datehold = []
//     var cumul_weights = []
//     var weights = data.map(function (dayweek) {
//         return dayweek.births;
//         });

// 	weights.reduce(function(a,b,i) { return cumul_weights.push(a+b); },0)

// 	var maxval = cumul_weights.slice(-1)[0]
	
// 	while (datehold.length != number){
// 	    var r = whole_random(0, maxval)
// 	    var sum = 0
// 	    for (i in data)

// 	    var item = format(d3.timeDay(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))))
//         datehold.push(y)

//     datehold = weighted.map(function (item){
//         return format(new Date(2017, item.month-1, item.day))
//     })
// }

function generator_real(number){
    datehold = []
    var weights = data.map(function (dayweek) {
        return dayweek.births;
        });


    while (datehold.length != number){
        var chosen = math.pickRandom(data, weights)
        var y = format(new Date(2017, chosen.month-1, chosen.day))
        datehold.push(y)
    }
}

function reset(){
    success = 0;
    trials = 0;

    d3.selectAll('.day')
    .transition()
    .style('fill', null)
    .attr('data-value', 0)
    .duration(100);

    d3.select('.line_vis svg .canvas .line').remove()
}

// Change between datasets
function model_switcher(model){
    if (model != mode){
        reset()

        switch(model) {
            case 'uniform':
                mode = 'uniform'
                console.log('Switched to uniform distribution')
                break;
            case 'real':
                mode = 'real'
                console.log('Switched to real distribution')
                break;

        }
    }
}

// Actually run the generator algorithm for the dataset chosen
function generator_switcher(){
    if (mode == 'uniform'){
        generator_uniform(document.getElementById('numgen').value)
    }
    else{
        generator_real(document.getElementById('numgen').value)
    }
}


///---------- SVG ----------///

//Builds the skeleton for the calendar view
function make_cal_skeleton(){
    //Taken from https://bl.ocks.org/alansmithy/6fd2625d3ba2b6c9ad48 >> Converted to D3 v4, with changes for generating 1 year for presentation


    // Year (2017 >> Jan 1 is Sunday, NOT leap year)
    var cal = d3.select(".cal_vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "calendar")
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    var rects = cal.append("g")
                .attr("id","listofdays")
                .selectAll(".day")
                .data(function(d) { return d3.timeDays(new Date(2017, 0, 1), new Date(2018, 0, 1)); })
                .enter()
                .append("rect")
                .attr("id",function(d) {
                    return "_"+format(d);
                    //return toolDate(d.date)+":\n"+d.value+" dead or missing";
                })
                .attr("class", "day")
                .attr("data-value", 0)
                .attr("width", cellSize)
                .attr("height", cellSize)
                .attr("x", function(d) {
                    return xOffset+(d3.timeWeek.count(d3.timeYear(d), d) * cellSize);
                })
                .attr("y", function(d) { return(d.getDay() * cellSize); })
                .datum(format);

    //create day labels
    var days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    
    var dayLabels = cal.append("g").attr("id","dayLabels")
    
    days.forEach(function(d,i){
        dayLabels.append("text")
        .attr("class","dayLabel")
        .attr("x",0)
        .attr("y",function(d) { return(i * cellSize)+5; })
        .attr("dy","0.9em")
        .text(d)
    });

    cal.append("g")
        .attr("id","monthOutlines")
        .selectAll(".month")
        .data(function(d) {return d3.timeMonths(new Date(2017, 0, 1), new Date(2018, 0, 1))})
        .enter()
        .append("path")
        .attr("class", "month")
        .attr("transform","translate("+(xOffset)+","+0+")")
        .attr("d", monthPath); 

    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        for(var i =0; i < month.length; i++){
          x = 8 + (8.8*i);
          x = x+ "em";
          cal.append("text")
           .attr("class", month[i])
           .style("text-anchor", "end")
           .attr("dy", "-.4em")
           .attr("dx", x)
           .text(month[i])};

}

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0)
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

function color_boxes(time_delay){
    datehold.forEach(function(date){
        date_id = '_'+date
        tagloc = document.getElementById(date_id)

        if (document.getElementById(date_id).dataset.value == 0){
            d3.select('#'+date_id)
            .transition()
            .style('fill', 'red')
            .style('opacity', 0.4)
            .duration(time_delay);
        }
        else {
            d3.select('#'+date_id)
            .transition()
            .style('fill', 'green')
            .style('opacity', 1)
            .duration(time_delay);       
        };

        tagloc.dataset.value++; 
    })
}


// From https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function multi_trial(number, delay, sqdelay){
    draw_calcline()
    setTimeout(function(){
        console.log(number, success, trials)

        d3.selectAll('.day')
        .transition()
        .style('fill', null)
        .attr('data-value', 0)
        .duration(delay*.3);

        generator_switcher();

        if (hasDuplicates(datehold) == true){success++};

        trials++;

        successrate.push({'trials':trials, 'val':success/trials*100})

        setTimeout(color_boxes(sqdelay), delay*.3)
        setTimeout(draw_line(), delay*.3);

        if (--number) {multi_trial(number, delay, sqdelay)}
    }, delay)
    
}



///---------- Line graph ----------///
function make_line_skeleton(){
    var margin = {top: 30, right: 20, bottom: 50, left: 30},
        width = 500;
        height = 300;
        adjwidth = width  - margin.left - margin.right;
        adjheight = height - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([0,500])
        .range([0, adjwidth])
    
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([adjheight, 0]);

    var line = d3.line()

    var svg = d3.select('.line_vis')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('class', 'canvas')
        .attr('transform', 'translate(' + margin.left +',' + margin.top + ')');

    xaxis = svg.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + adjheight + ")")
        .call(d3.axisBottom(x));   

    //Labels
    svg.append('text')
        .attr("transform",
            "translate(" + (adjwidth/2) + " ," + 
                           (adjheight + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("Trials"); 

    svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (adjheight / 2))
          .attr("dy", "0.7em")
          .style("text-anchor", "middle")
          .text("% success");      

    yaxis = svg.append("g")
        .call(d3.axisLeft(y));
}

function draw_guessline(){
    
    var svg = d3.select('.line_vis svg .canvas')

    var guessline = svg.append("g")
        .append('line')
        .attr('class', 'guessline')
        .attr('x1', 0)
        .attr('x2', adjwidth)
        .attr('stroke-width', 2)
        .attr('stroke', 'red')
        .transition()
        .attr('y1', adjheight*(1-parseInt($('#numguess').val())/100))
        .attr('y2', adjheight*(1-parseInt($('#numguess').val())/100))

        ;
}

function draw_calcline(){
    var svg = d3.select('.line_vis svg .canvas')

    var generate

    if (parseInt($('#numgen').val()) > 365){generate = 365}
    else {generate = parseInt($('#numgen').val())};

    var answer = math.permutations(365, generate)/math.pow(365, generate);

    if ($('.calcline').length){
        d3.selectAll('.calcline')
        .transition()
        .attr('y1', adjheight*(answer))
        .attr('y2', adjheight*(answer))
        .duration(500)
    }
    else {
        var calcline = svg.append("g")
        .append('line')
        .attr('class', 'calcline')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', adjheight*(answer))
        .attr('y2', adjheight*(answer))
        .attr('stroke-width', 2)
        .attr('stroke', 'grey')
        .attr('opacity', 0.5)
        .transition()
        .attr('x2', adjwidth)
        .duration(10)
    }
        
}

function draw_line(){
    var margin = {top: 30, right: 20, bottom: 50, left: 30},
        width = 500;
        height = 300;
        adjwidth = width  - margin.left - margin.right;
        adjheight = height - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .domain([0,500])
        .range([0, adjwidth])
    
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([adjheight, 0]);

    var svg = d3.select('.line_vis svg .canvas')

    var clean = svg.select('.line').remove()

    var line = d3.line()
        .x(function (d,i){return x(i);})
        .y(function(d){return y(d.val);})

    var path = svg.append("path")
        .datum(successrate)
        .attr("class", "line")
        .attr("d", line);

    var totalLength = path.node().getTotalLength()

    ;

    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
        .duration(0) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0);


}



///---------- Events ----------///
// Need to track when the 2 text boxes change
function inputTextListener(){
    console.log('Loaded')
    
    // Taken from https://stackoverflow.com/questions/41578153/prevent-html-input-type-number-from-ever-being-empty
    var numInputs = document.querySelectorAll('input[type=number]')

    numInputs.forEach(function (input) {
      input.addEventListener('change', function (e) {
        if (e.target.value == '') {
          e.target.value = 1
        }
      })
    })

    $('#numguess')
        .on('input', function(){
            reset()
            if ($('.guessline').length){
                d3.selectAll('.guessline')
                .transition()
                .attr('y1', adjheight*(1-parseInt($(this).val())/100))
                .attr('y2', adjheight*(1-parseInt($(this).val())/100))
                .duration(500)
            }
            else { 
                draw_guessline()
            }
        })

    $('#numgen')
        .on('input', function(){
            reset()

            var generate

            if (parseInt($(this).val()) > 365){generate = 365}
                else {generate = parseInt($(this).val())};

            var answer = math.permutations(365, generate)/math.pow(365, generate);
            
            if ($('.calcline').length){
                d3.selectAll('.calcline')
                .transition()
                .attr('y1', adjheight*(answer))
                .attr('y2', adjheight*(answer))
                .duration(500)
            }
        })

}