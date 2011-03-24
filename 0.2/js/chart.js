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
    chart = createChart(chartElementId, typeId); 

    dataTable = null;
    if(data.response){
      dataTable = data.response.getDataTable();
    }
    
    if(!dataTable){
      return false;
    }
    chart.draw(dataTable, chartOptions);
}

/*
 * create a set of default chart options. 
 * @return object
 */
function createDefaultChartOptions(){
 return {width: defaultChartWidth, height: defaultChartHeight, is3D: defaultChartIs3D};
}