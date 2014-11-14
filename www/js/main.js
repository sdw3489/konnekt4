'use strict';

  /**
    * RequireJS config and shim
    * @see http://requirejs.org/docs/api.html#config
    *
    * Also a good read to explain RequireJS dependency management
    * @link http://aaronhardy.com/javascript/javascript-architecture-requirejs-dependency-management/
      *
    */

requirejs.config({
  // enforceDefine to catch load failures in IE
  // @see http://requirejs.org/docs/api.html#ieloadfail
  // @see http://requirejs.org/docs/api.html#config-enforceDefine
  // See below for load require() | define() comment with this option
  //enforceDefine: true,

    // @see http://requirejs.org/docs/api.html#pathsfallbacks
  paths: {
    'jquery': 'libs/jquery.min',
    'backbone': 'libs/backbone.min',
    'underscore': 'libs/underscore.min',
    'bootstrap': 'libs/bootstrap.min',
    'text': 'libs/text',
    'templates': '../templates'
  },

  // @see http://requirejs.org/docs/api.html#config-shim
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'bootstrap':  ["jquery"]
  }
});



require([
  // Load our app module and pass it to our definition function
  'jquery',
  'underscore',
  'backbone',
  'views/_templateView',
  'bootstrap'
], function($, _, Backbone, _templateView){
    // Pass in our Router module and call it's initialize function
    new _templateView();
    // Router.initialize();
});
