/*
 * refactored from embeddable chart. Defines basic chart functions. Needs refactoring to a class. 
 */
function Visualisation_Chart(){
    
    var chart = null;
    
    /*
     * Create a default chartOptions object. Draw a chart using chartOptions and data objects
     * @return string
     */
    this.initialise = initialise;
    function initialise() {
        this.draw(visualisationType);
    }
    
    this.createChart = createChart;
    function createChart(elementId, typeId){
        return eval('new google.visualization.'+chartTypes[parseInt(typeId)].method+'(document.getElementById(elementId))');
    }
    
    this.draw = draw;
    function draw(typeId) {
    
        if(!chart){
            // Create and draw the visualization.
            chart = this.createChart(chartElementId, typeId); //new google.visualization.PieChart(document.getElementById('chart_div'))
        }
        chart.draw(data, chartOptions);
    }
    
    /*
     * create a set of default chart options. 
     * @return object
     */
    this.createDefaultOptions = createDefaultOptions;
    function createDefaultOptions(){
        return {width: defaultChartWidth, height: defaultChartHeight, is3D: defaultChartIs3D};
    }
}

function VisualisationType (type, title, method){
    
    this.type = type;
    this.title = title;
    this.method = method
}