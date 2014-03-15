'use strict';

var locationMock = {
    new: function() {
        var mock = {
            _currentPath: null
        };

        mock.path = function(newPath) {
            if (newPath != null)
                this._currentPath = newPath;
            return this._currentPath;
        };

        return mock;
    }
};