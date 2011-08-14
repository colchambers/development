/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require('Ext.slider.*');

Ext.onReady(function(){

/*    Ext.create('Ext.slider.Single', {
        renderTo: 'custom-tip-slider',
        hideLabel: true,
        width: 214,
        increment: 10,
        minValue: 0,
        maxValue: 100,
        tipText: function(thumb){
            return Ext.String.format('<b>{0}% complete</b>', thumb.value);
        }
    });*/

    Ext.create('Ext.slider.Single', {
        renderTo: 'custom-slider',
        hideLabel: true,
        width: 214,
        increment: 10,
        minValue: 0,
        maxValue: 100
    });
    
    Ext.create('Ext.slider.Multi', {
        renderTo: 'multi-slider-horizontal',
        hideLabel: true,
        width: 214,
        minValue: 0,
        maxValue: 100,
        values: [10, 50, 90]
    });
    
    Ext.create('Ext.slider.Multi', {
        renderTo: 'multi-slider-vertical',
        hideLabel: true,
        vertical: true,
        height: 214,
        minValue: 0,
        maxValue: 100,
        values: [10, 50, 90]
    });
});


jQuery(document).ready(function($) {
    console.log('jquery ready');
    /*
    $mySlider = $( "#slider-range" );
    $mySlider.slider({
        // range: true,//don't set range
        min: 0,
        max: 1000,
        orientation: "vertical",
    	//range: true,
        values: [ 75, 125, 175, 225 ],
        slide: function( evt, ui ) {
            a = [];
            for(var i=0; i<ui.values.length; i++) {
                a.push(ui.values[i]);
            }
            $( "#amount" ).val( "$" + a.join(" - " + "$") );
        }
    });
    $( "#amount" ).val(
        ["$" + $mySlider.slider("values", 0),
        "$" + $mySlider.slider("values", 1),
        "$" + $mySlider.slider("values", 2),
        "$" + $mySlider.slider("values", 3)].join(" - ")
    );*/

    //return;
	$( "#slider-range" ).slider({
		//orientation: "vertical",
		range: true,
		values: [ 17, 67 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
});
    
    
