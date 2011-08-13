Ext.require([
    '*'
]);

Ext.onReady(function() {
    var html = '<p>Meet John. John isn\'t taking the best care of his body. His work hard '+
    'play hard lsfestyle makes him prone to weight gain.</p>'+
    '<p>See if you can help him by balancing his work, rest and play. You need to use the sliders '+
    ' to adjust the hours he spends on each activity. Each activity may gain or lose energy per hour. You need to </p>';
    
    var configs = [{
        title: 'Help',
        collapsible:true,
        width:250,
        html: html,
        collapsed: true
    }];
    
    Ext.each(configs, function(config) {
        var element = Ext.get('panel-place-holder').createChild({cls: 'panel-container floating-panel'});
        
        var panel = Ext.createWidget('panel', Ext.applyIf(config, {
            renderTo: element,
            bodyPadding: 7
        }));
    });
});


