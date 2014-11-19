define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var _templateModel = Backbone.Model.extend({

      idAttribute: '_id',

      defaults: { },
      initialize: function(){ }

    });

    return _templateModel;

});
