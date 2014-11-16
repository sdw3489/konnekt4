define( [
  'jquery',
  'underscore',
  'backbone',
  // 'router',
  'views/baseView',
  'bootstrap'
], function($, _, Backbone, BaseView){
  var App = function() {
    new BaseView();
    // Router.initialize();
  };

  return App;
});