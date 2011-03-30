/*
 * refactored from embeddable chart. Defines basic chart functions. Needs refactoring to a class. 
 */

/*
 * Create a default chartOptions object. Draw a chart using chartOptions and data objects
 * @return string
 */
function initialiseChart() {
    drawVisualization(visualisationType);
}

function createChart(elementId, typeId){
    return eval('new google.visualization.'+chartTypes[parseInt(typeId)].method+'(document.getElementById(elementId))');
}

function drawVisualization(typeId) {

    // Create and draw the visualization.
    chart = createChart(chartElementId, typeId); //new google.visualization.PieChart(document.getElementById('chart_div'))
  
    chart.draw(data, chartOptions);
}

function updateVisualization(typeId) {
    chart.draw(data, chartOptions);
}
      
/*
 * create a set of default chart options. 
 * @return object
 */
function createDefaultChartOptions(){
    return {width: defaultChartWidth, height: defaultChartHeight, is3D: defaultChartIs3D};
}