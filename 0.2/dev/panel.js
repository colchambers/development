Ext.require([
    '*'
]);

Ext.onReady(function() {
    var html = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, '+
    'porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, '+
    'lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis '+
    'vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>'+
    'Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing '+
    'eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt '+
    'diam nec urna. Curabitur velit. Lorem ipsum dolor sit amet.</p>';
    
    var configs = [{
        title: 'Basic Panel',
        collapsible:true,
        width:400,
        html: html
    }];
    
    Ext.each(configs, function(config) {
        var element = Ext.getBody().createChild({cls: 'panel-container'});
        
        Ext.createWidget('panel', Ext.applyIf(config, {
            renderTo: element,
            bodyPadding: 7
        }));
    });
});


