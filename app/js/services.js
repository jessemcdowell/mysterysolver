'use strict';

angular.module('mysterysolver.services', [])
    .service('navigation', function($location) {
        var storage = null;

        return { 
            navigate: function(path, data) {
                storage = {
                    path: path,
                    data: data
                };
                $location.path(path);
            },
            
            getNavigationData: function() {
                if ((storage == null) || (storage.path != $location.path())) {
                    throw 'navigated without passing data';
                }

                var data = storage.data;
                storage = null;
                return data;
            }
        };
    });
  
