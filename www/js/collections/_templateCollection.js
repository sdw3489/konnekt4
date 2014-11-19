define([
  'underscore',
  'backbone',
  'models/_templateModel',
  'utils/utils'
], function(_, Backbone, _templateModel, Utils){

  var _templateCollection = Backbone.Collection.extend({
      url: '',
      model: _templateModel,
      initialize : function(models, options) { }

  });

  return _templateCollection;

});