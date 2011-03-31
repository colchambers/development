/*
 * refactored from embeddable chart. Defines basic chart functions. Needs refactoring to a class. 
 */
function Visualisation_Chart(elementId, typeId){
    
    this.chart = null;
    this.elementId = elementId;
    this.data = null;
    this.options = null;
    this.typeId = typeId;
    
    /*
     * Create a default chartOptions object. Draw a chart using chartOptions and data objects
     * @return string
     */
    this.initialise = initialise;
    function initialise() {
        this.draw();
    }
    
    this.createChart = createChart;
    function createChart(elementId, typeId){
        return eval('new google.visualization.'+chartTypes[parseInt(this.typeId)].method+'(document.getElementById(elementId))');
    }
    
    this.draw = draw;
    function draw() {
    
        if(!this.chart){
            // Create and draw the visualization.
            this.chart = this.createChart(this.elementId, this.typeId); //new google.visualization.PieChart(document.getElementById('chart_div'))
        }
        this.chart.draw(this.data, this.options);
    }
    
    /*
     * create a set of default chart options. 
     * @return object
     */
    this.createDefaultOptions = createDefaultOptions;
    function createDefaultOptions(){
        return {width: defaultChartWidth, height: defaultChartHeight, is3D: defaultChartIs3D};
    }
    
    
    /*
     * Set data object
     * @return object
     */
     this.getData = getData;
     function getData(){
         return this.data;
     }
     
    /*
     * Set data object
     * @param object data
     * @return void
     */
     this.setData = setData;
     function setData(data){
         this.data = data;
     }
     
     /*
     * Set data object
     * @return object
     */
     this.getOptions = getOptions;
     function getOptions(){
         return this.options;
     }
     
    /*
     * Set data object
     * @param object data
     * @return void
     */
     this.setOptions = setOptions;
     function setOptions(options){
         this.options = options;
     }
}

function VisualisationType (type, title, method){
    
    this.type = type;
    this.title = title;
    this.method = method
}