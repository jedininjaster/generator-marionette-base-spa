/*
 * App module definition
 */

define(function(require){
    'use strict';

    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),

        SharedLoader = require('modules/shared/shared.loader'),

        Header = require('global/regions/header/controller.header'),
        Dialog = require('global/regions/region.dialog');

    return Marionette.Application.extend({
        start: function( options ){
            // Instantiate the Module Loader component
            var loader = new SharedLoader({
                moduleConfig: options.moduleConfig
            });

            // Define App Regions
            this.addRegions({
                headerRegion: '#header-region',
                contentRegion: '#main-region'
                // dialogRegion: Dialog.extend({
                //     el: '#dialog-region'
                // })
            });

            // Require all other modules
            require(loader.getPaths(), function( /* arguments */ ){
                var promises = [];
                var defaultRoute;

                // Loop through the implicitly defined arguments array that require populates
                for(var i = 0; i < arguments.length; i++){
                    promises.push( arguments[i].deferred ); // And push the module's deferred object to the promises array
                
                    // console.log(arguments[i].Router);
                    // if(i == 0) defaultRoute = arguments[i];
                }

                /* App.Router {
                        controller: {
                            default: function(){ App.trigger ( default )}
                        },

                        appRoutes: {
                            "(/)" : "default"
                        }
                    }

                    Backbone.history.route()
                */

                // When all promises in the array are resolved, then start the global router
                $.when.apply($, promises).done(function(){
                    console.log('[GLOBAL] History started');

                    // console.log(defaultRoute);

                    Backbone.history.start({ pushState: true, root: '/' });

                    // console.log(App.getCurrentRoute());

                    // if(App.getCurrentRoute() == "") defaultRoute.Router.controller.default();
                });
            });

            console.log('[GLOBAL] App started');
        },

        // Adds the global router's navigate function to the App prototype
        navigate: function( route, options ) {
            options || (options = {});

            Backbone.history.navigate(route, options);
        },

        // Adds the global router's URL fragment function to the App prototype
        getCurrentRoute: function() {
            return Backbone.history.fragment;
        }
    });
});