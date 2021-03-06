define(function(require){
	'use strict';

	var Marionette = require('marionette'),
		Sub1View = require('./views/itemview.sub1');

	return Marionette.Controller.extend({
		initialize: function(){
            App.vent.on('route:module:example1:sub1', function(){
                App.mainRegion.show(new Sub1View());
            });
		}
	});
});